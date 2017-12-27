import React, { Component } from "react";
import noop from "lodash/noop";
import includes from "lodash/includes";
import PropTypes from "prop-types";

class UserInput extends Component {
  static propTypes = {
    onInputFinish: PropTypes.func,
    input: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    wordsPerMinute: PropTypes.number
  }

  static defaultProps = {
    onInputFinish: noop,
    input: "",
    wordsPerMinute: 100
  }

  constructor(props) {
    super(props);

    this.state = {
      currentInputString: "",
      stringGoal: "",
      mutationsArray: []
    };
  }

  componentDidMount() {
    this.setStringMutationGoal(this.props);
    this.setComponentInterval(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input !== this.props.input) {
      this.setStringMutationGoal(nextProps);
      this.setComponentInterval(nextProps);
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  setComponentInterval(props) {
    if (!props.input) {
      return;
    }
    const wordsPerMinute = props.wordsPerMinute || this.props.wordsPerMinute;

    // assume average word length is 5 characters
    const charactersPerMinute = wordsPerMinute * 5;

    // number of characters in one minute divided by number of milliseconds in a minute
    this.charactersPerMillisecond = charactersPerMinute / (60 * 1000);

    this.interval = window.setInterval(this.intervalCallback, 1 / this.charactersPerMillisecond);
  }

  setStringMutationGoal = (props = this.props) => {
    if (Array.isArray(props.input)) {
      const { mutationsArray } = this.state;
      const arr = mutationsArray.length ?
        mutationsArray.slice() :
        props.input.slice();

      if (!this.isCurrentStringMutableToNext(arr)) {
        arr.splice(1, 0, "");
      }

      this.setState({
        stringGoal: arr.shift(),
        mutationsArray: arr.slice()
      });

      return;
    }

    if (!props.input) {
      this.setState({
        currentInputString: "",
        stringGoal: ""
      });

      return;
    }

    this.setState({
      stringGoal: props.input
    });
  }

  handleInputFinish() {
    this.clearInterval();
    this.props.onInputFinish();
  }

  intervalCallback = () => {
    const { mutationsArray, stringGoal, currentInputString } = this.state;

    if (currentInputString.length === stringGoal.length) {
      if (mutationsArray.length) {
        this.setStringMutationGoal();

        return;
      }

      this.handleInputFinish();

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
      return includes(stringOne, stringTwo) || includes(stringTwo, stringOne);
    }

    return true;
  }

  clearInterval() {
    window.clearInterval(this.interval);
  }

  render() {
    return (<div>{this.state.currentInputString}_</div>);
  }
}

export default UserInput;
