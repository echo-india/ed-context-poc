import React, { useReducer, useContext, useEffect } from "react";
import HubList from "./HubList";
import Hub from "./Hub";
import { AppContext, HubContext } from "../App";

const HubWrapper = () => {
    const { hubData } = useContext(HubContext);
    console.log("rendered hubwrapper")
    return (
        <>
         Hub:: {hubData.currHub}
        <br/>
        {hubData.loading ? (
            "...Loading"
          ) : 
          (
              <div>
                  <HubList/>
                  <Hub/>
              </div>
          )}
       </>
    )
    }


export default HubWrapper