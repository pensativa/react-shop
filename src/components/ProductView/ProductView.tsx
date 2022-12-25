import React from 'react'
import {
  addItem,
  increment,
} from "../../redux/reducers/cartview"
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Link } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import ButtonCustom from '../SmallComponents/ButtonCustom'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import '../CardView/cardview.css'
import Preload from '../SmallComponents/Preload'
import { ProductItem } from '../../types/Product'

const ProductView = (props: {productsArray: ProductItem[]}) => {
  const cartList = useAppSelector(state=>state.cartReducer);
  const dispatch = useAppDispatch()
    
  const addToCart = (el: any) => {
    if (cartList.some((element) => element.id === el.id)) {
      dispatch(increment(el));
    } else {
      dispatch(
        addItem({
          id: el.id,
          title: el.title,
          price: el.price,
          images: el.images[0],
          count: 1,
          cartprice: el.price,
        })
      );
    }
  };

  return (
    <>
      {!props.productsArray.length && <Preload />}
      {props.productsArray.map((item) => (
        <Grid
          className="cartview__item"
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={item.id}
        >
          <Link className="cartview__link" to={`/product/${item.id}`}>
            <img src={`${item.images}`} alt={`${item.title}`} width="150" />
          </Link>
          <p className="cartview__title">{item.title}</p>
          <Link className="cartview__cat" to={`/category/${item.category.id}`}>
            {item.category.name}
          </Link>
          <div className="cartview__footer">
            <p className="cartview__price">
              <AttachMoneyIcon /> {item.price}
            </p>
            <ButtonCustom
              aria={"Add to cart"}
              func={() => addToCart(item)}
              icon={<AddShoppingCartIcon />}
            />
          </div>
        </Grid>
      ))}
    </>
  );
}

export default ProductView