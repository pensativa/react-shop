import React, { useState } from "react";
import { productsReducer } from "../redux/reducers/products";
import { catReducer } from "../redux/reducers/category";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import Grid from "@mui/material/Grid";
import ProductView from "../components/ProductView/ProductView";
import Pagination from "../components/Pagination/Pagination";

const Category = () => {
  const { id } = useParams() as any;
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.productsReducer);
  const categories = useAppSelector((state) => state.catReducer);
  const currentCategory = categories.filter((item) => {
    return item.id == id;
  });
  let sortByCategoryProducts = products.filter((item) => {
    return item.category.id == id;
  });
  const [filterProducts, setFilterProducts] = useState(sortByCategoryProducts);
  

  //Search by title function
  const searchFunc = (el: string) => {
    if (el.length < 1) {
      setFilterProducts(sortByCategoryProducts);
      setSort("");
    } else {
      setFilterProducts(
        filterProducts.filter((item) => {
          return item.title.toLowerCase().indexOf(el.toLowerCase()) > -1;
        })
      );
    }
  };

  //Sotring functions
  const [sort, setSort] = useState("");
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

  //Pagination functions
  const [count, setCount] = useState("8");
  const handleChangeCount = (event: SelectChangeEvent) => {
    setCount(event.target.value);
  };
  let productTotal: number = filterProducts.length;
  const productsPerPage = Number(count);
  const [currentPage, setCurrentPage] = useState(1);
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  let currentProduct = filterProducts.slice(
    firstProductIndex,
    lastProductIndex
  );
  const changePage = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Grid className="cartview" container>
        <Grid item xs={12}>
          {currentCategory.map((item) => (
            <h1 className="cart__title" key={item.id}>
              {item.name}
            </h1>
          ))}
        </Grid>
        <Grid item xs={12}>
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
                  <MenuItem
                    value={"sortByNameZA"}
                    onClick={() => sortByNameZA()}
                  >
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
              {currentCategory.map((item) => (
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="category-checkbox-label">Category</InputLabel>
                <Select
                  labelId="category-checkbox-label"
                  id="category-checkbox"
                  input={<FilledInput />}
                  value={item.name}
                  label="Category"
                >
                  <MenuItem value={""}>
                    <Link
                      style={{
                        textDecoration: "none",
                        width: "100%",
                        color: "black",
                      }}
                      to="/shop"
                    >
                      All Products
                    </Link>
                  </MenuItem>
                  {categories.map((el) => (
                    <MenuItem key={el.id} value={el.name}>
                      <Link
                        style={{
                          textDecoration: "none",
                          width: "100%",
                          color: "black",
                        }}
                        to={`/category/${el.id}`}
                      >
                        {el.name}
                      </Link>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              ))}
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
        </Grid>
        <ProductView productsArray={currentProduct} />
        <Grid item xs={12}>
          <Pagination
            productsPerPage={productsPerPage}
            productsTotal={productTotal}
            func={changePage}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Category;
