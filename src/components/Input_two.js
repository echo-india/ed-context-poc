import React, { useContext } from 'react';
import {makeStyles} from "@material-ui/core/styles/index";

//Material UI components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

//Material UI Icons
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


//Import Context
import { AppContext, ChildContext, ChildToSuper, SuperContext } from '../App'

const useStyles = makeStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: '8px',
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
});


export default function Input_two() {

    const classes = useStyles();

    const {state, dispatch} = useContext(AppContext);
    const {childstate} = useContext(ChildContext);

    const {data, loading} = useContext(SuperContext);

    const {childData} = useContext(ChildToSuper);

    /*const changeInputValue = (newValue) => {

        dispatch({ type: 'UPDATE_INPUT', data: newValue,});
    };*/

    const changeInputValue = (newValue) => {

       // dispatch({ type: 'UPDATE_INPUT', data: newValue,});

        dispatch((prev) => {
            return {...prev,inputText: newValue}
        })
    };

    return(
        <React.Fragment>

            <Grid item xs={12} md={6}>
                <Paper className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Input two"
                        value={state.inputText}
                        onChange={e => changeInputValue(e.target.value)}
                    />
                    <IconButton className={classes.iconButton} aria-label="search">
                       {/* <SearchIcon />*/}
                    </IconButton>
                    
                </Paper>
            </Grid>
           {/* Original State: :{JSON.stringify(state,null,2) }
            Child State:{JSON.stringify(childstate,null,2) }*/}

          { loading ? <div>...Loading</div>:<div>{data.data2}</div>}
          { childData.loading ? <div>...Loading Child</div>:<div>{childData.data}</div>}
        </React.Fragment>
    )
}


