import React from 'react'

import InputLabel from '@mui/material/InputLabel'
import { styled } from '@mui/material/styles'

const MainLabel = styled(InputLabel)({
    color: 'rgba(26, 31, 22, 0.5)',
    '&:focus': {
        color: 'rgba(26, 31, 22, 0.8)',
    },
});

const LabelCustom = (props: {text: string, id: string}) => {
  return (
    <MainLabel id={props.id}>{props.text}</MainLabel>
  )
}

export default LabelCustom