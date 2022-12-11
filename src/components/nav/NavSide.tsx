import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers, login, logOut } from "../../redux/reducers/users";

import Menu from '../Menu/MenuNav'
import IconButton from '@mui/material/IconButton'

import './navside.css'
import { SxProps, Box } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from "@mui/icons-material/Logout"

const NavSide = () => {
  const [open, setOpen] = React.useState(false)
  const toggleMenu = () => {
    setOpen((prev) => !prev)
  }
  
  const styles: SxProps = {
    width: 'auto',
    fontSize: '0.8em',
    height: 'calc(100vh - 4em)'
  };

  const dispatch = useAppDispatch()
  const token = localStorage.getItem('token')
  const user = useAppSelector(state=>state.usersReducer.currentUser)
  const logOutUser = () => {
    dispatch(logOut())
  }
  useEffect(()=>{
    dispatch(fetchUsers())
    if (token) {dispatch(login(token))}
  }, [])
  
  return (
    <div>
      {open ? (
        <Box className="main-nav" sx={styles}>
          <IconButton aria-label="menu" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <Menu />
          {user ? (
            <IconButton
              className="main-nav__logout"
              color="error"
              aria-label="LogOut"
              onClick={logOutUser}
            >
              <LogoutIcon />
            </IconButton>
          ) : null}
        </Box>
      ) : (
        <Box className="main-nav">
          <IconButton aria-label="menu" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <Menu />
          {user ? (
            <IconButton
              className="main-nav__logout"
              color="error"
              aria-label="LogOut"
              onClick={logOutUser}
            >
              <LogoutIcon />
            </IconButton>
          ) : null}
        </Box>
      )}
    </div>
  );
}

export default NavSide