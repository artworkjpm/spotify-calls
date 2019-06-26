import React from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

var bands = require("../festivals/bands.json");

class FestivalTable extends React.Component {
  constructor() {
    super();
    this.state = {
      //data: makeData()
    };
  }
  render() {
    const columns = [
      {
        width: 400,
        Header: "Time",
        accessor: "start"
      },
      {
        width: 400,
        Header: "Artist Name",
        accessor: "name"
      }
    ];

    return (
      <ReactTable
        data={bands.events}
        columns={columns}
        minRows={0}
        showPagination={false}
      />
    );
  }
}

export default FestivalTable;
