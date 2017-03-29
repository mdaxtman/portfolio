import React, { Component, PropTypes } from "react";
import noop from "lodash/noop";

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInputString: "",
      stringGoal: "",
      mutationsArray: []
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
      const arr = mutationsArray.length ?
        mutationsArray.slice() :
        this.props.input.slice();

      if (!this.isCurrentStringMutableToNext(arr)) {
        arr.splice(1, 0, "");
      }

      this.setState({
        stringGoal: arr.shift(),
        mutationsArray: arr.slice()
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
      this.props.onInputFinish(currentInputString);

      return;
    }

    const nextMutation = currentInputString.length > stringGoal.length ?
      currentInputString.slice(0, -1)
      :
      stringGoal.slice(0, currentInputString.length + 1);

    this.setState({
      currentInputString: nextMutation
    });
  }

  isCurrentStringMutableToNext = ([stringOne, stringTwo]) => {
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

UserInput.defaultProps = {
  onInputFinish: noop
};

UserInput.propTypes = {
  onInputFinish: PropTypes.func,
  input: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  wordsPerMinute: PropTypes.number
};

export default UserInput;
