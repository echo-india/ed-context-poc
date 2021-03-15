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
    }, 1000);
  });

function App() {
  const classes = useStyles();

  //const [state, dispatch] = useReducer(reducer, initialState);

  const [state, dispatch] = useState(initialState);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ data1: 2, data2: 3 });

  const [childData, setChildData] = useState({ data: "", loading: true });

  useEffect(async () => {
    //setLoading(true);

    const datafrompromise = await myPromise(22);

    setData((prev) => {
      return { ...prev, data2: datafrompromise };
    });

    setLoading(false);
    const dataforchild = await myPromise(datafrompromise + 45);

    setChildData({ data: dataforchild, loading: false });
  }, []);

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
          Pass data between react sibling components
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
                <Input_one />
                <Input_two />
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
          {state.testText}
        </Typography>
      </Toolbar>
    </Container>
  );
}

export default App;
