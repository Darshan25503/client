import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CSS/ProductDetail.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

const ProductDetail = () => {
  const [value, setValue] = React.useState(4.5);
  const params = useParams();
  const [p, setP] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      console.log(data);
      setP(data?.product);
      getSimilarProducts(p._id, p.category._id);
    } catch (error) {
      console.log(error.message);
    }
  };
  //initial product details

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  //get similar products

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat&display=swap"
          rel="stylesheet"
        />
      </head>
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-3">
            <center>
              <img src={p.photo} alt="" className="image" />
            </center>
          </div>
          <div className="col-md-9">
            <div className="container">
              <p className="pNameD">{p.name}</p>
              <hr />
              <div className="pPrice">
                <span className="text-danger">-80%</span>{" "}
                <span className="RupSym">
                  <sup>&#8377;</sup>
                  {p.price}
                </span>{" "}
              </div>
              <div className="pMrp">
                <s>M.R.P: &#8377;{(p.price * 100) / 20}</s>
              </div>
              <hr />
              <div className="pRating">
                <span className="pR">Ratings</span>
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={value}
                    precision={0.25}
                    readOnly
                  />
                </Stack>
              </div>
              <hr />
              <div className="pSize">
                Size:{" "}
                <select className="form-select mb-3">
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                  <option selected>--Please Select--</option>
                </select>
              </div>

              <div className="btns">
                <button className="addToCart btn btn-sm btn-outline-secondary">
                  Add to Cart <i class="fa-sharp fa-solid fa-cart-plus"></i>
                </button>
                <button className="addToCart btn btn-sm btn-outline-secondary mx-3">
                  Buy Now
                </button>
              </div>
              <hr />
              <div className="pDescription">
                <div className="pR">Description</div>
                <div className="pD">{p.description}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">Similar Products</div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
