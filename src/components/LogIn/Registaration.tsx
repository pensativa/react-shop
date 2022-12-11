import React, { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks";
import { createUser, login } from "../../redux/reducers/users";

import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  PersonAddAlt1,
} from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import ButtonCustom from "../SmallComponents/ButtonCustom";

const Registaration = () => {
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
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: `${name}`,
      email: `${email}`,
      password: `${password}`,
      role: "custumer",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    };
    dispatch(createUser(data));
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
  };

  return (
    <form className="login" onSubmit={(e) => onSubmit(e)}>
      <p style={{ fontSize: "1.5em" }}>Or create new account</p>
      <FormControl variant="standard">
        <InputLabel htmlFor="user-name">Your Name</InputLabel>
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
        <InputLabel htmlFor="user-email">Your Email</InputLabel>
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
        <InputLabel htmlFor="user_password">Password</InputLabel>
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
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <ButtonCustom
        aria="Login button"
        text="Registrate"
        icon={<PersonAddAlt1 />}
        type="submit"
      />
    </form>
  );
};

export default Registaration;
