import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { catReducer, fetchCategories } from '../../redux/reducers/category';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import './category.css'

const CategoryView = () => {
    const categories = useAppSelector(state=>state.catReducer)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

  return (
    <div>
        <h1 className='catigory__head'>React app shop</h1>
        <Grid className='catigory' container>
        {!categories.length && <div style={{width:'100%', height:'80vh', display:'flex', alignItems:'center', justifyContent:'center'}}><CircularProgress color="inherit" /></div>}
        {
        categories.map((item) => (
        <Grid className='catigory__item' item key={item.id}>
          <Link to={`category/${item.id}`}>
            <img className='catigory__img' src={`${item.image}`} alt={`${item.name}`} width='200' />
          </Link>
          <p className='catigory__title'>{item.name}</p>
        </Grid>
        ))
      }
    </Grid>
    </div>
  )
}

export default CategoryView