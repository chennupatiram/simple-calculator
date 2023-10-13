import React, { Component } from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from './components/KeypadComponent';
import * as math from 'mathjs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    };
  }

  onClick = (button) => {
    if (button === "=") {
      this.calculate();
    } else if (button === "CE") {
      this.backspace();
    } else {
      this.setState((prevState) => ({
        result: prevState.result + button
      }));
    }
  };

  calculate = () => {
    try {
      const result = math.evaluate(this.state.result);
      if (isNaN(result)) {
        this.setState({ result: "Invalid Input" });
      } else {
        this.setState({ result: result.toString() });
      }
    } catch (e) {
      this.setState({ result: "Error" });
    }
  };



  backspace = () => {
    this.setState((prevState) => ({
      result: prevState.result.slice(0, -1)
    }));
  };

  render() {
    return (
      <div>
        <div className="calculator-body">
          <h1>  Simple Calculator </h1>
          <ResultComponent result={this.state.result} />
          <KeyPadComponent onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

export default App;
