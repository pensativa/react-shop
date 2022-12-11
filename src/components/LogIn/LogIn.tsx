import React, { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/reducers/users";

import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Login,
} from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import ButtonCustom from "../SmallComponents/ButtonCustom";
import './login.css'

const LogIn = () => {
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

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        { email, password }
      );
      const token = response.data;
      localStorage.setItem("token", token.access_token);
      dispatch(login(token.access_token));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form className="login" onSubmit={(e) => onSubmit(e)}>
      <p style={{ fontSize: "1.5em" }}>Login your account</p>
      <FormControl variant="standard">
        <InputLabel htmlFor="user-login">Your Email</InputLabel>
        <Input
          id="user-login"
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
        <InputLabel htmlFor="user-password">Password</InputLabel>
        <Input
          id="user-password"
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
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <ButtonCustom
        aria="Login button"
        text=" Login"
        icon={<Login />}
        type="submit"
      />
    </form>
  );
};

export default LogIn;
