import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

const Preload = () => {
  const [query, setQuery] = React.useState('loading')

  setTimeout(() => {
    setQuery('fail');
  }, 3000);

  return (
    <div style={{width:'100%', height:'80vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      { query === 'fail' ? (
          <h2>Sorry! We can't found any product</h2>
        ) : (
          <CircularProgress color="inherit" />
        ) 
      }
    </div>
  )
}

export default Preload