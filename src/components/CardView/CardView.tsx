import React, { useState } from 'react'
import { useAppSelector } from '../../redux/hooks'

import Grid from '@mui/material/Grid'
import '../CardView/cardview.css'
import Pagination from '../Pagination/Pagination'
import ProductView from '../ProductView/ProductView'
import { ProductItem } from '../../types/Product'

const CardView = (props: {arr: ProductItem[], perPage: number}) => {
    let productTotal: number = props.arr.length;

    const productsPerPage = props.perPage
    const [currentPage, setCurrentPage] = useState(1)

    const lastProductIndex = currentPage * productsPerPage
    const firstProductIndex = lastProductIndex - productsPerPage
    
    let currentProduct = props.arr.slice(firstProductIndex, lastProductIndex);

    const changePage = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <Grid className="cartview" container>
      <ProductView productsArray={currentProduct} />
      <Grid item xs={12}>
        <Pagination
          productsPerPage={productsPerPage}
          productsTotal={productTotal}
          func={changePage}
        />
      </Grid>
    </Grid>
  );
}

export default CardView