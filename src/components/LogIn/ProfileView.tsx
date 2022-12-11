import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateUser, usersReducer } from "../../redux/reducers/users";

import ButtonCustom from '../SmallComponents/ButtonCustom';
import { Avatar, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  PublishedWithChanges,
} from "@mui/icons-material";
import TuneIcon from "@mui/icons-material/Tune";
import CancelIcon from "@mui/icons-material/Cancel";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const ProfileView = () => {
  const [open, setOpen] = useState(false)
  let user = useAppSelector((state) => state.usersReducer.currentUser);

  if (user === undefined) {
    user = {
      id: 0,
      name: '',
      email: '',
      password: '',
      role: '',
      avatar: '',
    }
  }
  
  const handleShowForm = () => setOpen(!open);
  
  interface State {
    password: string;
    showPassword: boolean;
  }
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState<string>(`${user.email}`);
  const [password, setPassword] = useState<string>(`${user.password}`);
  const [name, setName] = useState<string>(`${user.name}`);
  const [img, setImg] = useState<string>(`${user.avatar}`);
  const dispatch = useAppDispatch();

  const changeData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    if (user) {
      const data = {
        id: user.id,
        name: `${name}`,
        email: `${email}`,
        password: `${password}`,
        role: "customer",
        avatar: `${img}`,
      }
      dispatch(updateUser(data));
    }
  };

  return (
    <div>
      {user ? (
        <>
          <Avatar
            variant="rounded"
            sx={{ width: "120px", height: "120px" }}
            src={`${user.avatar}`}
            alt={`Avator of ${user.name}`}
          />
          <h2>{user.name}</h2>
          {open ? (
            <>
              <form className="login" onSubmit={(e) => changeData(e)}>
                <IconButton
                  color="inherit"
                  aria-label="upload picture"
                  component="label"
                  style={{marginBottom:'1em'}}
                >
                  <input
                    onChange={(e) => setImg(e.target.value)}
                    hidden
                    accept="image/*"
                    type="file"
                  />
                  <AddAPhotoIcon />
                </IconButton>
                <span style={{verticalAlign:"basline"}}>Change photo</span>
                <FormControl variant="standard">
                  <InputLabel htmlFor="user-name">Change Name</InputLabel>
                  <Input
                    id="user-name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="user-email">Change Email</InputLabel>
                  <Input
                    id="user-email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="user_password">
                    Create new password
                  </InputLabel>
                  <Input
                    id="user_password"
                    type={values.showPassword ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      handleChange("password");
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <ButtonCustom
                  aria="Login button"
                  text="Save"
                  icon={<PublishedWithChanges />}
                  type="submit"
                />
                <ButtonCustom
                  aria="Close"
                  icon={<CancelIcon />}
                  func={handleShowForm}
                  text="Close"
                />
              </form>
            </>
          ) : (
            <ButtonCustom
              aria="Change data"
              icon={<TuneIcon />}
              func={handleShowForm}
              text="Change profile data"
            />
          )}
        </>
      ) : null}
    </div>
  );
}

export default ProfileView
