import React from 'react'

import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'

const MainInput = styled(OutlinedInput)({
    border: 'none',
    backgroundColor: '#fff',
    color: 'rgba(26, 31, 22, 0.5)',
    padding: '16px',
    borderRadius: '9px',
    transition: '0.3s',
    boxShadow: '0px 4px 16px rgba(26, 31, 22, 0.15)',
    '& .MuiInputBase-input:focus': {
        border: 'none',
        color: 'rgba(26, 31, 22, 0.8)',
        backgroundColor: '#fff',
    },
    '& .MuiInputBase-input:hover': {
      border: 'none',
      color: 'rgba(26, 31, 22, 0.8)',
      backgroundColor: '#fff',
    },
    '& .MuiInputBase-input::before': {
        display: 'none'
    },
    '& .MuiInputBase-input::after': {
        display: 'none'
    },
});

const InputCustom = () => {
  return (
    <MainInput aria-hidden="true"/>
  )
}

export default InputCustom