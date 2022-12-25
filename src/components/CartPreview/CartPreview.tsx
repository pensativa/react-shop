import React, { useEffect, useState } from 'react'
import { removeItem } from '../../redux/reducers/cartview'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Link } from 'react-router-dom'

import './cartpreview.css'
import Grid from '@mui/material/Grid'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const CartPreview = () => {
const products = useAppSelector(state=>state.cartReducer)
const dispatch = useAppDispatch()

const [totalPrice, setTotalPrice] = useState(0)

const sumOfProducts = () => {
  let result = 0;
  products.map((item) => {
    result += item.price * item.count;
  });
  setTotalPrice(result);
};

useEffect(() => {
  sumOfProducts()
});

  return (
    <div className="cartpreview">
      <h2 className="cartpreview__title">Bag</h2>
      <Grid className="cartview" container>
        {products.map((item) => (
          <Grid
            className="cartview__item cartview__item--preview"
            item
            xs={0}
            md={6}
            lg={4}
            key={item.id}
          >
            <Link className="cartview__link" to={`/product/${item.id}`}>
              <img src={`${item.images}`} alt={`${item.title}`} width="60" />
            </Link>
            {item.count > 1 ? (
              <div className="menu__item-num">{item.count}</div>
            ) : null}
            <IconButton
              className="cartpreview__del"
              aria-label="delete"
              size="small"
              color="error"
              onClick={() => {
                dispatch(removeItem(item.id));
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>
      {totalPrice > 0 ? (
        <p className="cartpreview__total">
          Total: <AttachMoneyIcon /> {totalPrice}
        </p>
      ) : null}
      {products.length > 0 ? (
        <Link className="cartpreview__button" to="cart">
          <LocalMallIcon /> View Bag
        </Link>
      ) : (
        <h3 style={{ textAlign: "center" }}>Your bag is empty</h3>
      )}
    </div>
  );
}

export default CartPreview