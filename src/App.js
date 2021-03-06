import React, { useReducer, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

//Import immutability-helper
import update from "immutability-helper";

//Material UI components
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";

//Import our Inputs
import Input_one from "./components/Input_one";
import Input_two from "./components/Input_two";
import HubWrapper from "./components/HubWrapper";


//Styles
const useStyles = makeStyles({
  toolbarTitle: {
    flex: 1,
  },
});

// Create context object
export const AppContext = React.createContext();
export const ChildContext = React.createContext();
export const SuperContext = React.createContext();
export const ChildToSuper = React.createContext();

export const OrgContext = React.createContext();
export const HubContext = React.createContext();

// Set up Initial State
const initialState = {
  inputText: "start",
  testText: "Hello world",
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_INPUT":
      return update(state, { inputText: { $set: action.data } });

    default:
      return initialState;
  }
}

const somePromise = new Promise((res, rej) => {
  setTimeout(() => res("done"), 2000);
});

const myPromise = (num) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num);
    }, 1000);
  });

const orgPromise = (num) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("USR16136486231665MW53D0L8I");
    }, 2000);
  });

function App() {
  const classes = useStyles();

  //const [state, dispatch] = useReducer(reducer, initialState);

  const [state, dispatch] = useState(initialState);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ data1: 2, data2: 3 });

  const [orgData, setOrgData] = useState({ name: "" });

  const [childData, setChildData] = useState({ data: "", loading: true });
  const [hubData, setHubData] = useState({ data: {}, currHub:"",loading: true });

  /*useEffect(async () => {
    //setLoading(true);

    const datafrompromise = await myPromise(22);

    setData((prev) => {
      return { ...prev, data2: datafrompromise };
    });

    setLoading(false);
    const dataforchild = await myPromise(datafrompromise + 45);

    setChildData({ data: dataforchild, loading: false });
  }, []);
*/
  useEffect(async () => {
    //setLoading(true);

    const userId = await orgPromise("USR16136486231665MW53D0L8I");

    setOrgData((prev) => {
      return { name: userId };
    });

    setLoading(false);
    const dataforHub = await fetch(
      `https://develb.metaecho.com/organization/api/v1/user/${userId}`,
      {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ4TXBHRkR5RVJScU45L2JiTVBENHo0bC9vY1BnNHM4MDJieFpXQWRJUjUvQkk0dUR6T1JRSHNCVnFRb3RrMUxXeGd4Ym5IQk9DUS9vR0dEZkhTdFVWUElTY0hNVDM3VXErYmxCZmNJVklhU3doRlRUQWpnUDdzSXBiblVxb0RxSWJlTUZaVnVUYXp3enVpaWNNYjI0WG52eXNZSTAvemVOL1MrYTAzanM1cG5zRVgyQS8yQndLcVpGQkEzczVCb0hUWnlHSmZoY0JJSStOQVptbXd4eUczWTVnUzJiSlZVcGhqTnl6ckN1MUJEZysvOWRJaGFidUg1ZnBjbW1XN2M3cjl5YTBMbEhGdk5BTzVJN2wxbTJ3K09BTUZ3VVlOVTdYM1VQdUkvYiszNW9hQU1FYUwxanprVnUvOFhoclg1RjBSKzZuc0J5QUEvN1pBK3dtOUpVMEZiUnRLQzQ2VzFGQjZ3bTVxaXh4dWJrc1gxYURjbGNDK3grVjV2ZlIwVU0iLCJpYXQiOjE2MTQ2NTc2NzgsImV4cCI6MTYxNDc0NDA3OH0.JjqwLmMD0abUATT43IRmduMTUlYOAHFyC2XdXgFiARI`,
        },
      }
    ).then((res) => res.json());

    setHubData({ data: dataforHub.resultBody.organization, 
        currHub:dataforHub.resultBody.organization[2].organizationId, 
        loading: false });
  }, []);

  console.log("rendered app")

  return (
    <Container maxWidth="lg">
      <CssBaseline />

      {/*Title*/}
      <Toolbar>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
         {/* Pass data between react sibling components*/}
        </Typography>
      </Toolbar>

      {/*Inputs*/}
      <Grid container spacing={1}>
        <SuperContext.Provider value={{ data, loading }}>
          <AppContext.Provider value={{ state, dispatch }}>
            <ChildContext.Provider
              value={{ childstate: state.inputText + "child" }}
            >
              <ChildToSuper.Provider value={{ childData }}>
                {/*<Input_one />
                <Input_two />*/}
                <OrgContext.Provider value={{ data, loading }}>
                  <HubContext.Provider
                    value={{ hubData, setHubData }}
                  >
<HubWrapper/>
                  </HubContext.Provider>
                </OrgContext.Provider>
              </ChildToSuper.Provider>
            </ChildContext.Provider>
          </AppContext.Provider>
        </SuperContext.Provider>
      </Grid>

      {/*display testText value*/}
      <Toolbar>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {/*{state.testText}*/}
        </Typography>
      </Toolbar>
    </Container>
  );
}

export default App;
