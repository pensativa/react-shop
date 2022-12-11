import React from 'react'

import './pagination.css'

const Pagination = ( props: {productsPerPage: number, productsTotal: number, func: any} ) => {
  const pageNumbers: number[] = []

  for (let i: number = 1; i <= Math.ceil(props.productsTotal / props.productsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <ul className="pagination">
        {
          pageNumbers.length > 1 && pageNumbers.map((num) => (
            <li className='pagination__item' key={num} onClick={() => props.func(num)}>{num}</li>
          )) 
        }
      </ul>
    </div>
  )
}

export default Pagination