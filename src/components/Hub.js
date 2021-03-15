import React, { useContext, useState, useEffect,useMemo } from "react";
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

 const Input_one = () => {
 

  /*const {
    hubData: { currHub },
  } = useContext(HubContext);*/

  const {
    hubData,
  } = useContext(HubContext);
  const [hubDetail, setHubDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [json, setJson] = useState(false);
  console.log("rendered hub");
  //console.log("rerendered",currHub);

  /*useEffect( () => {
    //setLoading(true);
    fetch(`https://develb.metaecho.com/organization/api/v1/org/${currHub}`, {
      headers: {
        Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ4TXBHRkR5RVJScU45L2JiTVBENHo0bC9vY1BnNHM4MDJieFpXQWRJUjUvQkk0dUR6T1JRSHNCVnFRb3RrMUxXeGd4Ym5IQk9DUS9vR0dEZkhTdFVWUElTY0hNVDM3VXErYmxCZmNJVklhU3doRlRUQWpnUDdzSXBiblVxb0RxSWJlTUZaVnVUYXp3enVpaWNNYjI0WG52eXNZSTAvemVOL1MrYTAzanM1cG5zRVgyQS8yQndLcVpGQkEzczVCb0hUWnlHSmZoY0JJSStOQVptbXd4eUczWTVnUzJiSlZVcGhqTnl6ckN1MUJEZysvOWRJaGFidUg1ZnBjbW1XN2M3cjl5YTBMbEhGdk5BTzVJN2wxbTJ3K09BTUZ3VVlOVTdYM1VQdUkvYiszNW9hQU1FYUwxanprVnUvOFhoclg1RjBSKzZuc0J5QUEvN1pBK3dtOUpVMEZiUnRLQzQ2VzFGQjZ3bTVxaXh4dWJrc1gxYURjbGNDK3grVjV2ZlIwVU0iLCJpYXQiOjE2MTQ2NTc2NzgsImV4cCI6MTYxNDc0NDA3OH0.JjqwLmMD0abUATT43IRmduMTUlYOAHFyC2XdXgFiARI`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setHubDetail(res.resultBody.organization);
      });
  }, [currHub]);*/


  useEffect(() => {
    console.log("effect hub" ,hubData.currHub);
    setLoading(true);
    async function fetchData() {
      
      fetch(`https://develb.metaecho.com/organization/api/v1/org/${hubData.currHub}`, {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ4TXBHRkR5RVJScU45L2JiTVBENHo0bC9vY1BnNHM4MDJieFpXQWRJUjUvQkk0dUR6T1JRSHNCVnFRb3RrMUxXeGd4Ym5IQk9DUS9vR0dEZkhTdFVWUElTY0hNVDM3VXErYmxCZmNJVklhU3doRlRUQWpnUDdzSXBiblVxb0RxSWJlTUZaVnVUYXp3enVpaWNNYjI0WG52eXNZSTAvemVOL1MrYTAzanM1cG5zRVgyQS8yQndLcVpGQkEzczVCb0hUWnlHSmZoY0JJSStOQVptbXd4eUczWTVnUzJiSlZVcGhqTnl6ckN1MUJEZysvOWRJaGFidUg1ZnBjbW1XN2M3cjl5YTBMbEhGdk5BTzVJN2wxbTJ3K09BTUZ3VVlOVTdYM1VQdUkvYiszNW9hQU1FYUwxanprVnUvOFhoclg1RjBSKzZuc0J5QUEvN1pBK3dtOUpVMEZiUnRLQzQ2VzFGQjZ3bTVxaXh4dWJrc1gxYURjbGNDK3grVjV2ZlIwVU0iLCJpYXQiOjE2MTQ2NTc2NzgsImV4cCI6MTYxNDc0NDA3OH0.JjqwLmMD0abUATT43IRmduMTUlYOAHFyC2XdXgFiARI`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          setHubDetail(res.resultBody.organization);
        });
    }
    setTimeout(fetchData,1000);
    //fetchData()
   
    return () => {
        console.log("cleanup hub",hubData.currHub);
    }
  }, [hubData]);

  return (
    <React.Fragment>
      Details
      {loading ? (
        "...Loading details"
      ) : json ? (
        <pre>{JSON.stringify(hubDetail, null, 2)}</pre>
      ) : (
        <div>
          <div>ID: {hubDetail.organizationId}</div>
          <div>Name: {hubDetail.name}</div>
          <div>Legal Name:{hubDetail.legalName}</div>
          <div>Registration Type:{hubDetail.registrationType}</div>
        </div>
      )}
      {!loading && <button onClick={(e) => setJson(!json)}>
        {json ? "Less" : "More"} Detail
      </button>}
    </React.Fragment>
  );
}

export default Input_one