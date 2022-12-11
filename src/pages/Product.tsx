import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";

import { productsReducer } from '../redux/reducers/products'
import {
  cartReducer,
  addItem,
  incrementmore,
} from "../redux/reducers/cartview";
import { useAppSelector, useAppDispatch } from '../redux/hooks'

import { Button, Grid, Stack } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ButtonCustom from '../components/SmallComponents/ButtonCustom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Product = () => {
  const { name } = useParams() as any;
  const dispatch = useAppDispatch();
  const products = useAppSelector(state=>state.productsReducer);
  const currentProduct = products.filter((product) => product.id === Number(name))[0];
  const cartList = useAppSelector((state) => state.cartReducer);

  const addToCart = (el: any) => {
    if (cartList.some((element) => element.id === el.id)) {
      dispatch(
        incrementmore({
          id: el.id,
          title: el.title,
          price: el.price,
          images: el.images[0],
          count: count,
        })
      );
    } else {
      dispatch(
        addItem({
          id: el.id,
          title: el.title,
          price: el.price,
          images: el.images[0],
          count: count,
        })
      );
    }
    setCount(1)
  };

  let [count, setCount] = useState(1)
  const minus = () => {
    if (count > 1) {
      setCount(--count)
    }
  }

  const plus = () => setCount(++count)

  let history = createBrowserHistory();

  function handleClick() {
    history.back();
  }

  return (
    <div>
      <Button
        variant="text"
        color="success"
        startIcon={<ArrowBackIosIcon />}
        onClick={handleClick}
      >
        Back
      </Button>
      {currentProduct && currentProduct.title && (
        <Grid container>
          <Grid item xs={6} key={currentProduct.id}>
            <Grid container>
              {currentProduct.images.map((item, index) => (
                <Grid item key={index} className="cartview__img-item">
                  <img
                    style={{ maxWidth: "100%", height: "auto" }}
                    src={`${item}`}
                    alt=""
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <h1>{currentProduct.title}</h1>
            <Link
              className="cartview__cat"
              to={`/category/${currentProduct.category.id}`}
            >
              {currentProduct.category.name}
            </Link>
            <p className="cartview__price">
              <AttachMoneyIcon /> {currentProduct.price}
            </p>
            <p style={{ marginTop: "4em", marginBottom: "4em" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              laudantium perferendis. Tempore earum doloribus saepe similique
              dolores. Accusamus, in numquam quibusdam illum quasi eaque
              consectetur, eveniet deleniti esse, cupiditate cumque?
            </p>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              spacing={1}
              style={{ marginBottom: "1em" }}
            >
              <ButtonCustom
                aria="Minus item"
                icon={<HorizontalRuleIcon />}
                func={() => minus()}
              />
              <span className="cartview__count">{count}</span>
              <ButtonCustom
                aria="Plus item"
                icon={<AddIcon />}
                func={() => plus()}
              />
            </Stack>
            <ButtonCustom
              text={"Add to cart"}
              aria={"Add to cart"}
              func={() => addToCart(currentProduct)}
              icon={<AddShoppingCartIcon />}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              borderTop: "3px solid rgba(26, 31, 22, 0.5)",
              width: "90%",
              margin: "1em"
            }}
          >
            <h2>Description</h2>
            <p>{currentProduct.description}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              laudantium perferendis. Tempore earum doloribus saepe similique
              dolores. Accusamus, in numquam quibusdam illum quasi eaque
              consectetur, eveniet deleniti esse, cupiditate cumque?
            </p>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Product