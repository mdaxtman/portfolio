import React, { Component } from "react";

import History from "./components/history/history";
import Output from "./components/output/output";
import Prompt from "./components/prompt/prompt";
import routine from "./routine";
import styles from "./app.css";
import UserInput from "./components/user-input/user-input";

const cleanString = (str) => {
  const rgx = new RegExp(`_$`, "g");
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
        history: this.state.history.concat([
          <div>{cleanString(this.promptText.textContent)}</div>
        ]),
        output: this.state.currentRoutine.output
      });

      return;
    }

    const nextState = {
      history: this.state.history.concat([<div>{cleanString(this.promptText.textContent)}</div>]),
      input: null
    };

    const { history, prompt } = this.state.currentRoutine;

    if (history) {
      nextState.history.push(history);
    }

    if (prompt) {
      nextState.prompt = prompt;
    }

    const { delay = 0 } = this.state.currentRoutine;
    nextState.input = null;

    this.setState(nextState, () => {
      window.setTimeout(() => this.dequeFromRoutineAndSetCurrentInput(), delay);
    });
  }

  render() {
    const {
      output, input, history, prompt
    } = this.state;

    return (
      <div className={styles.main}>
        <History text={history} />
        {
          !output ?
            <div
              className={styles.inputLine}
              ref={(element) => { this.promptText = element; }}
            >
              <Prompt currentPath={prompt} />
              <UserInput
                onInputFinish={this.handleUserInputFinish}
                input={input}
                wordsPerMinute={120}
              />
            </div>
            :
            null
        }
        <Output
          returnValue={output}
          rootRef={(element) => { this.outputText = element; }}
        />
      </div>
    );
  }
}
