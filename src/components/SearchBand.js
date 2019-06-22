import React, { Component } from "react";

export default class SearchBands extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmitValue}>
        <label style={{ marginRight: "10px" }}>
          Search artist:
          <input
            style={{ marginLeft: "10px" }}
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
