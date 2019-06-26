import React from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

var bands = require("../festivals/bands.json");

const FestivalTable = props => {
  const columns = [
    {
      width: 200,
      Header: "Time",
      accessor: "start"
    },
    {
      width: 300,
      Header: "Artist Name",
      accessor: "name"
      /* Cell: ({ cell }) => (
        <button value={cell.name} onClick={props.handleClickGroup}>
          {cell.name}
        </button>
      ) */
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
};

export default FestivalTable;
