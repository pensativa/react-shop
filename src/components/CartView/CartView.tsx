import React from 'react'
import { cartReducer, removeItem, increment, decrement } from '../../redux/reducers/cartview'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Link } from "react-router-dom"

import './cartview.css'
import Box from '@mui/material/Box'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ButtonCustom from '../SmallComponents/ButtonCustom'
import AddIcon from "@mui/icons-material/Add"
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule"
import { Stack } from '@mui/material'
import { styled } from "@mui/material/styles";

const LinkAsButton = styled(Link)({
  display: "inline-block",
  color: "#fff",
  backgroundColor: "#1A1F16",
  padding: "8px",
  borderRadius: "9px",
  transition: "0.3s",
  textDecoration: 'none',
  "&:hover": {
    backgroundColor: "#12805D",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "#12805D",
    boxShadow: "none",
  },
});

const CartView = () => {
  const products = useAppSelector(state=>state.cartReducer)
  const dispatch = useAppDispatch()

  return (
    <div className="cart">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={0.5}
      >
        <h1 className="cart__title">Check your Bag Items</h1>
        {products.length > 0 ? (
          <LinkAsButton to="/order">Confirm the order</LinkAsButton>
        ) : (
          <LinkAsButton to="/shop">Start shopping</LinkAsButton>
        )}
      </Stack>
      {products.map((item) => (
        <Box key={item.id} className="cart__item">
          <img src={`${item.images}`} width="200" />
          <div>
            <IconButton
              className="cartpreview__del"
              aria-label="delete"
              size="large"
              color="error"
              onClick={() => {
                dispatch(removeItem(item.id));
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            <p className="cartview__title">{item.title}</p>
            <p className="cartview__price">
              <ButtonCustom
                aria="Minus item"
                icon={<HorizontalRuleIcon />}
                func={() => dispatch(decrement(item))}
              />
              <span className="cartview__count">{item.count}</span>
              <ButtonCustom
                aria="Plus item"
                icon={<AddIcon />}
                func={() => dispatch(increment(item))}
              /> items for <AttachMoneyIcon /> {item.price * item.count}
            </p>
            {item.count > 1 ? (
              <p className="cartview__price-one">
                <AttachMoneyIcon fontSize="small" /> {item.price} for one
              </p>
            ) : null}
          </div>
        </Box>
      ))}
    </div>
  );
}

export default CartView