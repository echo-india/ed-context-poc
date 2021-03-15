import React, { useContext, useState,useEffect } from "react";
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
  const [currhubData, setCurrhubData] = useState({});
  const [currhub, setCurrhub] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    console.log("here")
    if(!hubData.loading){
        console.log("there")
        setLoading(true)
       // let orgid = e.target.value;
    
        await fetch(`https://develb.metaecho.com/organization/api/v1/org/${hubData.data[0].organizationId}`, {
          headers: {
            Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ4TXBHRkR5RVJScU45L2JiTVBENHo0bC9vY1BnNHM4MDJieFpXQWRJUjUvQkk0dUR6T1JRSHNCVnFRb3RrMUxXeGd4Ym5IQk9DUS9vR0dEZkhTdFVWUElTY0hNVDM3VXErYmxCZmNJVklhU3doRlRUQWpnUDdzSXBiblVxb0RxSWVzVERVYjJidEVKZ05pQmdLcC9MM0R4TWc2KzVQWEJYY081SGNGYWVQSS9FVWU1VGRFTUg4VWNFUE9GOU9uakRBZ0ZPbndiWnQ0d2FzaWN1SjNrelNwMjVLaVBVc29wUjRnMEM4QlkrbjA4UlhnSThEbk83VmJKQ2V5WWQ0V3RWVWlaVTJobisvNUs0L3RNQjhlTWZSLzZsa0lZblIwaG9PbE1PNFBUK29aVVRFMFBsTG0weklPOGxmcGYvV24vdHRQSEkrL1NIaDUrdVFjT2l1ZDVwZG55RWp0WFkwc2JlN21tcEROcGlNek1Yc0NWZWpsMldoNVFyWEUwN2tYbWYiLCJpYXQiOjE2MTQ1NDA0NTEsImV4cCI6MTYxNDYyNjg1MX0.HWBNApCepucLx9W3UyC1AAENb-tQCldRF9TKQ3qNL4E`,
          },
        })
          .then((res) => res.json())
          .then(res => {
            console.log(res);  
            setCurrhubData(res.resultBody.organization)});
    
          setLoading(false)
    }
  }, [])

  const handleChange =  async (e) => {
    setLoading(true)
    setCurrhub(e.target.value)
    let orgid = e.target.value;

    await fetch(`https://develb.metaecho.com/organization/api/v1/org/${orgid}`, {
      headers: {
        Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ4TXBHRkR5RVJScU45L2JiTVBENHo0bC9vY1BnNHM4MDJieFpXQWRJUjUvQkk0dUR6T1JRSHNCVnFRb3RrMUxXeGd4Ym5IQk9DUS9vR0dEZkhTdFVWUElTY0hNVDM3VXErYmxCZmNJVklhU3doRlRUQWpnUDdzSXBiblVxb0RxSWVzVERVYjJidEVKZ05pQmdLcC9MM0R4TWc2KzVQWEJYY081SGNGYWVQSS9FVWU1VGRFTUg4VWNFUE9GOU9uakRBZ0ZPbndiWnQ0d2FzaWN1SjNrelNwMjVLaVBVc29wUjRnMEM4QlkrbjA4UlhnSThEbk83VmJKQ2V5WWQ0V3RWVWlaVTJobisvNUs0L3RNQjhlTWZSLzZsa0lZblIwaG9PbE1PNFBUK29aVVRFMFBsTG0weklPOGxmcGYvV24vdHRQSEkrL1NIaDUrdVFjT2l1ZDVwZG55RWp0WFkwc2JlN21tcEROcGlNek1Yc0NWZWpsMldoNVFyWEUwN2tYbWYiLCJpYXQiOjE2MTQ1NDA0NTEsImV4cCI6MTYxNDYyNjg1MX0.HWBNApCepucLx9W3UyC1AAENb-tQCldRF9TKQ3qNL4E`,
      },
    })
      .then((res) => res.json())
      .then(res => {
        console.log(res);  
        setCurrhubData(res.resultBody.organization)});

      setLoading(false)
  };

  return (
    <React.Fragment>
      Hub::value is {currhub}
      <br />
      {/*  <br/>
                    <br/>
                    {
                        hubData.loading?"...Loading hubs":hubData.data.map(
                            (hub,i) =>  
                            
                             <div>{i}::{hub.organizationId}</div>
                           
                       
                        )
                    }*/}
      {hubData.loading ? (
        "...Loading"
      ) : (
        <select onChange={handleChange} value={currhub}>
          {hubData.loading
            ? "...Loading hubs"
            : hubData.data.map((hub, i) => (
                <option value={hub.organizationId}>
                  {i}::{hub.name}
                </option>
              ))}
        </select>
      )}
      {loading ? "...Loading Hub Details" : <pre>
          <div>{currhubData.name}</div>
          <div>{currhubData.legalName}</div>
          </pre>}
    </React.Fragment>
  );
}
