import React from 'react'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const MainButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#1A1F16",
  padding: "8px",
  borderRadius: "9px",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#12805D",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "#12805D",
    boxShadow: "none",
  },
  "& > span.MuiButton-startIcon": {
    margin: "0 5px",
  },
});

const ButtonCustom = (Props: {
  aria: string;
  text?: string;
  icon?: any;
  type?: 'button' | 'submit';
  func?: () => void;
}) => {
  return (
    <MainButton
      variant="contained"
      aria-label={Props.aria}
      startIcon={Props.icon}
      type={Props.type}
      onClick={Props.func}
    >
      {Props.text}
    </MainButton>
  );
};

export default ButtonCustom