import React, { Component } from "react";
import pick from "lodash/pick";

import History from "./components/history/history";
import Output from "./components/output/output";
import Prompt from "./components/prompt/prompt";
import routine from "./components/routine/routine";
import styles from "./app.css";
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

    if (!script || !script.length) {
      return;
    }
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
    if (this.state.currentRoutine.output) {
      this.setState({
        output: this.state.currentRoutine.output
      });

      return;
    }

    const nextState = pick(this.state.currentRoutine, "prompt", "history");
    const { delay = 0 } = this.state.currentRoutine;
    nextState.input = null;

    nextState.history = this.state.history.concat([
      <div>{cleanString(this.promptText.textContent)}</div>,
      nextState.history
    ]);

    this.setState(nextState, () => {
      window.setTimeout(() => this.dequeFromRoutineAndSetCurrentInput(), delay);
    });
  }

  render() {
    return (
      <div className={styles.main}>
        <History text={this.state.history} />
        <div
          className={styles.inputLine}
          ref={(element) => { this.promptText = element; }}
        >
          <Prompt currentPath={this.state.prompt} />
          <UserInput
            onInputFinish={this.handleUserInputFinish}
            input={this.state.input}
            wordsPerMinute={120}
          />
        </div>
        <Output
          returnValue={this.state.output}
          rootRef={(element) => { this.outputText = element; }}
        />
      </div>
    );
  }
}
