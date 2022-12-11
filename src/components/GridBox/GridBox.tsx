import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { fetchCategories } from "../../redux/reducers/category";
import { fetchProducts } from "../../redux/reducers/products";
import Main from "../../pages/Main";
import Cart from "../../pages/Cart";
import Shop from "../../pages/Shop";
import Profile from "../../pages/Profile";
import Category from "../../pages/Category";
import Product from "../../pages/Product";
import NavSide from "../nav/NavSide";
import CartPreview from "../CartPreview/CartPreview";
import Grid from "@mui/material/Grid";
import "./gridbox.css";
import Order from "../../pages/Order";

const GridBox = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, []);

  return (
    <BrowserRouter basename="/react-shop">
      <Grid className="gridbox" container alignItems="flex-start">
        <Grid item xs={1}>
          <NavSide />
        </Grid>
        <Grid className="gridbox__page" item xs={8}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product/:name" element={<Product />} />
            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </Grid>
        <Grid item xs={3}>
          <CartPreview />
        </Grid>
      </Grid>
    </BrowserRouter>
  );
};

export default GridBox;
