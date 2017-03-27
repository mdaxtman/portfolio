import React, { Component, PropTypes } from "react";

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInputString: "",
      stringGoal: ""
    };
  }

  componentDidMount() {
    this.setStringMutationGoal();
    const { wordsPerMinute } = this.props;
    const charactersPerMinute = wordsPerMinute * 5;
    const charactersPerMillisecond = charactersPerMinute / (60 * 1000);

    this.timeout = window.setInterval(this.setInputInterval, 1 / charactersPerMillisecond);
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  setStringMutationGoal = () => {
    if (Array.isArray(this.props.input)) {
      const { mutationsArray } = this.state;

      const localArray = mutationsArray ?
        mutationsArray.slice() :
        this.props.input.slice();

      if (!this.isCurrentStringMutableToNext(localArray)) {
        localArray.splice(1, 0, "");
      }

      this.setState({
        stringGoal: localArray.shift(),
        mutationsArray: localArray.slice()
      });

      return;
    }

    this.setState({
      stringGoal: this.props.input
    });
  }

  setInputInterval = () => {
    const { mutationsArray, stringGoal, currentInputString } = this.state;

    if (currentInputString.length === stringGoal.length) {
      if (mutationsArray.length) {
        this.setStringMutationGoal();

        return;
      }

      this.clearInterval();

      return;
    }

    const sliceTo = currentInputString.length > stringGoal.length ?
      currentInputString.slice(0, -1)
      :
      stringGoal.slice(0, currentInputString.length + 1);

    this.setState({
      currentInputString: sliceTo
    });
  }

  isCurrentStringMutableToNext([stringOne, stringTwo]) {
    if (typeof stringOne === "string" && typeof stringTwo === "string") {
      return stringOne.includes(stringTwo) || stringTwo.includes(stringOne);
    }

    return true;
  }

  clearInterval() {
    window.clearInterval(this.timeout);
  }

  render() {
    return (<div>{this.state.currentInputString}_</div>);
  }
}

UserInput.propTypes = {
  onInputFinish: PropTypes.func,
  input: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  wordsPerMinute: PropTypes.number
};

export default UserInput;
