import React, { Component } from "react";
import styles from "./index.css";
import Prompt from "./components/prompt";

export default class App extends Component {
    render () {
        return (
            <div className={styles.main}>
                <Prompt/>
            </div>
        );
    }
}
