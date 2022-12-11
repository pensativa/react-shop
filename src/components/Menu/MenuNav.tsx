import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

import "./menunav.css";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import CodeIcon from "@mui/icons-material/Code";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Store from "@mui/icons-material/Store";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const MenuNav = () => {
  const products = useAppSelector((state) => state.cartReducer);
  let num: number = products.length;

  return (
    <MenuList className="menu">
      <MenuItem className="menu__item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "menu__link active" : "menu__link"
          }
          to="/"
        >
          <CodeIcon /> Home page
        </NavLink>
      </MenuItem>
      <MenuItem className="menu__item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "menu__link active" : "menu__link"
          }
          to="/profile"
        >
          <AccountBoxIcon /> Profile
        </NavLink>
      </MenuItem>
      <MenuItem className="menu__item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "menu__link active" : "menu__link"
          }
          to="/shop"
        >
          <Store /> Store
        </NavLink>
      </MenuItem>
      <MenuItem className="menu__item">
        {num > 0 && <span className="menu__item-num">{num}</span>}
        <NavLink
          className={({ isActive }) =>
            isActive ? "menu__link active" : "menu__link"
          }
          to="/cart"
        >
          <LocalMallIcon /> Cart
        </NavLink>
      </MenuItem>
    </MenuList>
  );
};

export default MenuNav;
