import React, { Component } from "react";

export default class SearchBands extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmitValue}>
        <label>
          Search artist:
          <input
            type="text"
            value={this.props.value}
            onChange={this.props.onChangeValue}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
