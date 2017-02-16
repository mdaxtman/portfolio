import React, { Component, PropTypes } from "react";

export default class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mutationsArray: null,
            currentInputString: "",
            stringGoal: ""
        };
    }

    componentDidMount() {
        this.setStringMutationGoal();
        this.timeout = window.setInterval(this.setInputInterval, this.props.msPerCharacter);
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    clearInterval() {
        window.clearInterval(this.timeout);
    }

    setStringMutationGoal = () => {
        if (Array.isArray(this.props.input)) {
            const { mutationsArray } = this.state;

            const input =  mutationsArray ?
                this.state.mutationsArray.slice() :
                this.props.input.slice();
            this.setState({
                stringGoal: input.shift(),
                mutationsArray: input.slice()
            });

            return;
        }

        this.setState({
            stringGoal: this.props.input
        });
    }

    setInputInterval = () => {
        const { mutationsArray, stringGoal, index, currentInputString } = this.state;

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
            stringGoal.slice(0, currentInputString.length + 1)

        this.setState({
            currentInputString: sliceTo,
        });
    }

    render() {
        return (<div>{this.state.currentInputString}</div>);
    }
};
