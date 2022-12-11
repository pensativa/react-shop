import React from 'react'
import { Stack } from "@mui/material"
import { useAppSelector } from '../redux/hooks'
import { usersReducer } from '../redux/reducers/users'
import LogIn from '../components/LogIn/LogIn'
import ProfileView from '../components/LogIn/ProfileView'
import Registaration from '../components/LogIn/Registaration'

const Profile = () => {
  const user = useAppSelector((state) => state.usersReducer.currentUser);
  
  return (
    <Stack
      alignItems="start"
      justifyContent="space-between"
      direction="row"
      spacing={2}
      style={{ flexWrap: "wrap" }}
    >
      <h1 style={{ width: "100%" }} className="cart__title">
        My profile
      </h1>
      {user ? (
        <ProfileView />
      ) : (
        <>
          <LogIn />
          <Registaration />
        </>
      )}
    </Stack>
  );
}

export default Profile