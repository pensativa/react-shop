import React from 'react'
import { createBrowserHistory } from "history"

import { Stack, Button, Box } from "@mui/material"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { styled } from "@mui/material/styles"

const SuccessBox = styled(Box)({
  display: "flex",
  color: "#12805D",
  fontSize: "2em",
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
  height: '80vh'
});

const Order = () => {
  let history = createBrowserHistory();

  function handleClick() {
    history.back();
  }
  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={0.5}
      >
        <h1 className="cart__title">Order</h1>
        <Button
          variant="text"
          color="success"
          startIcon={<ArrowBackIosIcon />}
          onClick={handleClick}
        >
          Back
        </Button>
      </Stack>
      <SuccessBox>
        <p>
          <CheckBoxIcon fontSize='large' />
          Thank you for the order. We will call you back soon.
        </p>
      </SuccessBox>
    </div>
  );
}

export default Order