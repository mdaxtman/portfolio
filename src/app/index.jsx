import React, { Component } from "react";
import pick from "lodash/pick";
import { findDOMNode } from "react-dom";

import History from "./components/history/history";
import Output from "./components/output/output";
import Prompt from "./components/prompt/prompt";
import routine from "./components/routine/routine";
import styles from "./index.css";
import UserInput from "./components/user-input/user-input";

const cleanString = (str) => {
  const rgx = new RegExp(`${String.fromCharCode(160)}|_$`, "g");
  return str.trim().replace(rgx, "");
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      script: routine(),
      currentRoutine: {
        input: ""
      },
      history: []
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.dequeFromRoutineAndSetCurrentInput();
    }, 750);
  }

  dequeFromRoutineAndSetCurrentInput() {
    const script = this.state.script.slice();
    const currentRoutine = script.shift();
    const input =
      Array.isArray(currentRoutine.input) ?
        currentRoutine.input.slice()
        :
        currentRoutine.input;

    this.setState({
      script,
      currentRoutine,
      input
    });
  }

  handleUserInputFinish = () => {
    const nextState = pick(this.state.currentRoutine, "prompt", "output");
    nextState.input = null;
    nextState.history = this.state.history.concat([
      cleanString(this.promptText.textContent),
      this.outputText.innerText
    ]);

    this.setState(nextState);
  }

  render() {
    return (
      <div className={styles.main}>
        <History history={this.state.history} />
        <div
          className={styles.inputLine}
          ref={(element) => { this.promptText = element; }}
        >
          <Prompt currentPath={this.state.prompt} />
          <UserInput
            onInputFinish={this.handleUserInputFinish}
            input={this.state.input}
            wordsPerMinute={60}
          />
        </div>
        <Output ref={(element) => { this.outputText = findDOMNode(element); }} />
      </div>
    );
  }
}
