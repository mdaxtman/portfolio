import React, { Component } from "react";
import styles from "./index.css";
import Prompt from "./components/prompt";
import UserInput from "./components/user-input";
import Output from "./components/output";
import History from "./components/history";


export default class App extends Component {
  handleUserInputFinish = () => {
    console.log("finished");
  }

  render() {
    return (
      <div className={styles.main}>
        <History />
        <div className={styles.inputLine}>
          <Prompt />
          <UserInput
            input={["hello, how are you doing today?", "hello", "hello, doing good?"]}
            wordsPerMinute={120}
          />
        </div>
        <Output />
      </div>
    );
  }
}
