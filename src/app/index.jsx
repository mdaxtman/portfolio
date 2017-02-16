import React, { Component } from "react";
import styles from "./index.css";
import Prompt from "./components/Prompt";
import UserInput from "./components/UserInput";
import Output from "./components/Output";
import History from "./components/History";


export default class App extends Component {
	handleUserInputFinish = () => {

	}
    render () {
        return (
            <div className={styles.main}>
        		<History />
            	<div className={styles.inputLine}>
                	<Prompt />
                	<UserInput
                		onInputFinish={this.handleUserInputFinish}
                		input={["hello. world", "hello", "hello, world!"]}
                		msPerCharacter={200}
                	/>
                </div>
                <Output />
            </div>
        );
    }
}
