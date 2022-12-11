import React, { useState, useEffect } from "react";
import { fetchProducts } from "../redux/reducers/products";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import CardView from "../components/CardView/CardView";
import { ProductItem } from "../types/Product";

const Shop = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    setFilterProducts(products);
  }, []);
  const products = useAppSelector((state) => state.productsReducer);
  const [filterProducts, setFilterProducts] = useState(products);

  const searchFunc = (el: string) => {
    if (el.length < 1) {
      setFilterProducts(products);
      setCategory("");
      setSort("");
    } else {
      setFilterProducts(
        filterProducts.filter((item) => {
          return item.title.toLowerCase().indexOf(el.toLowerCase()) > -1;
        })
      );
    }
  };

  const [sort, setSort] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const sortById = () => {
    filterProducts.sort((a, b) => a.id - b.id);
  };
  const sortByName = () => {
    filterProducts.sort((a, b) => (a.title > b.title ? 1 : -1));
  };
  const sortByNameZA = () => {
    filterProducts.sort((a, b) => (a.title < b.title ? 1 : -1));
  };
  const sortByPrice = () => {
    filterProducts.sort((a, b) => a.price - b.price);
  };
  const sortByPriceHight = () => {
    filterProducts.sort((a, b) => b.price - a.price);
  };

  const categories = useAppSelector((state) => state.catReducer);
  const [category, setCategory] = useState("");
  const handleChangeCat = (event: SelectChangeEvent) => {
    if (event.target.value === "") {
      setFilterProducts(products);
    } else {
      setCategory(event.target.value as string);
      sortByCategoryProducts(Number(event.target.value));
    }
  };
  const sortByCategoryProducts = (el: number) => {
    let categoryArray: ProductItem[] = [];
    products.map((item) => {
      if (item.category.id === el) {
        categoryArray.push(item);
      }
    });
    setFilterProducts(categoryArray);
  };

  const [count, setCount] = useState("8");
  const handleChangeCount = (event: SelectChangeEvent) => {
    setCount(event.target.value);
  };

  return (
    <>
      <h1 className="cart__title">Catalog</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "1.5em",
        }}
      >
        <div>
          <TextField
            variant="filled"
            label="Search by title"
            onChange={(e) => searchFunc(e.target.value)}
          />
        </div>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel variant="filled" id="sort-select-label">
              Sort by
            </InputLabel>
            <Select
              variant="filled"
              labelId="sort-select-label"
              id="sort-select"
              value={sort}
              label="Sort by"
              autoWidth
              onChange={handleChange}
            >
              <MenuItem value="" onClick={() => sortById()}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"sortByName"} onClick={() => sortByName()}>
                Title (A-Z)
              </MenuItem>
              <MenuItem value={"sortByNameZA"} onClick={() => sortByNameZA()}>
                Title (Z-A)
              </MenuItem>
              <MenuItem value={"sortByPrice"} onClick={() => sortByPrice()}>
                Price (from low to hight)
              </MenuItem>
              <MenuItem
                value={"sortByPriceHight"}
                onClick={() => sortByPriceHight()}
              >
                Price (from hight to low)
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="category-checkbox-label">Category</InputLabel>
            <Select
              labelId="category-checkbox-label"
              id="category-checkbox"
              input={<FilledInput />}
              value={category}
              label="Category"
              onChange={handleChangeCat}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((el) => (
                <MenuItem key={el.id} value={el.id}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="per-view-label">Per page</InputLabel>
            <Select
              labelId="per-view-label"
              id="demo-simple-select-standard"
              value={count}
              onChange={handleChangeCount}
              label="Per page"
              input={<FilledInput />}
            >
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={32}>32</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <CardView arr={filterProducts} perPage={Number(count)} />
    </>
  );
};

export default Shop;
