import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles/index";

//Material UI components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

//Material UI Icons
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

// Import Context
import { AppContext, HubContext } from "../App";

const useStyles = makeStyles({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: "8px",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

export default function Input_one() {
  const classes = useStyles();

  const { hubData, setHubData } = useContext(HubContext);
  
  const handleChange = (e) => {
    
  let val = e.target.value;

    setHubData((prev) => {
      return { ...prev, currHub: val };
    });
  };

  console.log("rendered list");

  return (
    <React.Fragment>
      <br />
     
      {hubData.loading ? (
        "...Loading"
      ) : (
        <div>
         
          <select onChange={handleChange} defaultValue={hubData.currHub}>
            {hubData.loading
              ? "...Loading hubs"
              : hubData.data.map((hub, i) => (
                  <option key ={i} value={hub.organizationId}>
                    {i}::{hub.name}
                  </option>
                ))}
          </select>
        </div>
      )}
     
    </React.Fragment>
  );
}
