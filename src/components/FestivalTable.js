import React from "react";
import "react-table/react-table.css";
import Moment from "react-moment";
import glasto from "../festivals/glasto.json";
import MenuItem from "@material-ui/core/MenuItem";

const FestivalTable = props => {
  const [currentIndex, setIndex] = React.useState(0);

  const getArray = e => {
    setIndex(e.target.value);
  };
  return (
    <div className="main-wrap lineup">
      <div className="center-div">
        <h2>
          {glasto.festival[0].festival}:{" "}
          {glasto.festival[0].stages[currentIndex].name}
        </h2>

        <div>
          {glasto.festival[0].stages.map((stage, i) => (
            <MenuItem key={i} value={i} onClick={getArray}>
              {stage.name}
            </MenuItem>
          ))}
        </div>

        <table className="center-list">
          <tbody>
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Time</th>
              <th>Artist</th>
            </tr>

            {glasto.festival[0].stages[currentIndex].events
              .sort((a, b) => new Date(b.start) - new Date(a.start))
              .map((group, i) => (
                <tr key={i}>
                  <td>
                    <Moment format="ddd">{group.start}</Moment>
                  </td>
                  <td>
                    <Moment format="DD/MM/YYYY">{group.start}</Moment>
                  </td>
                  <td>
                    <Moment format="LT">{group.start}</Moment>
                  </td>
                  <td>
                    {" "}
                    <button
                      value={group.name}
                      onClick={e => {
                        props.handleOpen(e);
                      }}
                    >
                      {group.name}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FestivalTable;
