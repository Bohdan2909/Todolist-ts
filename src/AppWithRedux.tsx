import React, {useCallback, useEffect} from 'react';
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
import {initializeAppTC, RequestStatusType} from './state/appReducer';
import {appDispatch, AppStateType} from './state/store';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './features/Login/Login';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import {logoutTC} from './state/authReducer';

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false}: PropsType) {
    const status = useSelector<AppStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = appDispatch()
    //GUI
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])


    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', width: '100%', textAlign: 'center'}}><CircularProgress/>
        </div>
    }
    return (
        <div className={'App'}>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar variant="dense" style={{justifyContent:'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todolists
                    </Typography>
                    {isLoggedIn && <Button onClick={logoutHandler} color={'inherit'}>Log out</Button>}
                </Toolbar>

                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>

            </Container>
        </div>
    );
}

export default AppWithRedux;

