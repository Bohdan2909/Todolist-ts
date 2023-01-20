import React from 'react';
import './trash/App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {TodolistsList} from './features/TodolistsList/TodolistsList'
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from './components/ErrorSnackBar/ErrorSnackBar';
import {useSelector} from 'react-redux';
import { RequestStatusType} from './state/appReducer';
import {AppStateType} from './state/store';
type PropsType = {
    demo?: boolean
}
function AppWithRedux({demo=false}:PropsType) {
    const status = useSelector<AppStateType, RequestStatusType>((state) => state.app.status)
    //GUI
    return (
        <div className={'App'}>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todolists
                    </Typography>
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default AppWithRedux;

