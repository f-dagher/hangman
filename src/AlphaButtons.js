import React, { Component } from "react";

class AlphaButtons extends Component {
  constructor(props) {
    super(props);
    this.handleGenerateButtons = this.handleGenerateButtons.bind(this);
  }

  handleGenerateButtons() {
    this.props.generateButtons;
  }
  render() {
    return (
      <div>
        <p>{this.handleGenerateButtons()}</p>
      </div>
    );
  }
}

export default AlphaButtons;
