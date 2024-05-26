import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import ImageSlider from "./ImageSlider";
import ReviewSlider from "./ReviewSlider";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CSS/homepage.css";

const HomePage = () => {
  const [kurti, setKurti] = useState([]);
  const [ethnic, setEthnic] = useState([]);
  const [shirt, setShirt] = useState([]);
  const [tshirt, setTshirt] = useState([]);
  const [kurtiIndex, setKurtiIndex] = useState(0);
  const [ethnicIndex, setEthnicIndex] = useState(0);
  const [shirtIndex, setShirtIndex] = useState(0);
  const [tshirtIndex, setTshirtIndex] = useState(0);

  const handleNext = (category) => {
    switch (category) {
      case "kurti":
        setKurtiIndex(kurtiIndex + 1);
        break;
      case "ethnic":
        setEthnicIndex(ethnicIndex + 1);
        break;
      case "shirt":
        setShirtIndex(shirtIndex + 1);
        break;
      case "tshirt":
        setTshirtIndex(tshirtIndex + 1);
        break;
      default:
        break;
    }
  };

  const handlePrev = (category) => {
    switch (category) {
      case "kurti":
        setKurtiIndex(kurtiIndex - 1);
        break;
      case "ethnic":
        setEthnicIndex(ethnicIndex - 1);
        break;
      case "shirt":
        setShirtIndex(shirtIndex - 1);
        break;
      case "tshirt":
        setTshirtIndex(tshirtIndex - 1);
        break;
      default:
        break;
    }
  };
  const getProducts = async () => {
    try {
      const { data: kurtii } = await axios.get(
        "/api/v1/products/getbycategory/65b201909fdef43813b1a127"
      );
      const { data: ethnici } = await axios.get(
        "/api/v1/products/getbycategory/65b201979fdef43813b1a12b"
      );
      const { data: shirti } = await axios.get(
        "/api/v1/products/getbycategory/65b201ac9fdef43813b1a133"
      );
      const { data: tshirti } = await axios.get(
        "/api/v1/products/getbycategory/65b201b39fdef43813b1a137"
      );
      setKurti(kurtii.products);
      setEthnic(ethnici.products); // Assuming you want to set products for ethnic as well
      setShirt(shirti.products); // Assuming you want to set products for shirts as well
      setTshirt(tshirti.products); // Assuming you want to set products for tshirts as well
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const images = [
    "https://res.cloudinary.com/djmogn92l/image/upload/v1713359873/Black_and_Brown_Modern_Urban_Outfit_Recommendations_Youtube_Thumbnail_ygx3op.png",
    "https://res.cloudinary.com/djmogn92l/image/upload/v1713359872/Black_and_Brown_Modern_Urban_Outfit_Recommendations_Youtube_Thumbnail_3_g0rokk.png",
    "https://res.cloudinary.com/djmogn92l/image/upload/v1713359872/Black_and_Brown_Modern_Urban_Outfit_Recommendations_Youtube_Thumbnail_2_hkkx38.png",
    "https://res.cloudinary.com/djmogn92l/image/upload/v1713359872/Black_and_Brown_Modern_Urban_Outfit_Recommendations_Youtube_Thumbnail_4_vk8ltt.png",
    "https://res.cloudinary.com/djmogn92l/image/upload/v1713359872/Black_and_Brown_Modern_Urban_Outfit_Recommendations_Youtube_Thumbnail_1_vve0aw.png",
  ];

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Layout>
      <div className="mx-3 my-3">
        <ImageSlider images={images} />
      </div>
      <div className="women mx-3 maincat my-3">
        <p className="TT">Women's Zone</p>
        <div className="container">
          <div className="womenKurti">
            <p className="T my-3">Get Exclusive Women's Kurtis</p>
            <div>
              <div className="d-flex pC  ">
                {kurti?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/product/${p.slug}`}
                    className="product-link"
                  >
                    <center>
                      <div className="card m-2 productCard Tcard ">
                        <img
                          src={p.photo}
                          className="card-img-top product-image"
                          alt="Product Image"
                        />
                        <div className="card-body">
                          <p className="text-danger newArrival ">New Arrival</p>
                          {/* <center>
                      <button className="prButton">
                        Add to Cart{" "}
                        <i class="fa-sharp fa-solid fa-cart-plus"></i>
                      </button>
                    </center> */}
                        </div>
                      </div>
                    </center>{" "}
                  </Link>
                ))}
                <div className="B mx-3">
                  <Link className="showMore" to={"/category/women-kurti"}>
                    ShowMore
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="womenEthnic">
            <p className="T my-3">Buy Our Royal Women's Ethnic</p>
            <div className="d-flex pC  ">
              {ethnic?.map((p) => (
                <Link
                  key={p._id}
                  to={`/product/${p.slug}`}
                  className="product-link"
                >
                  <center>
                    <div className="card m-2 productCard Tcard ">
                      <img
                        src={p.photo}
                        className="card-img-top product-image"
                        alt="Product Image"
                      />
                      <div className="card-body">
                        <p className="text-danger newArrival ">New Arrival</p>
                        {/* <center>
                      <button className="prButton">
                        Add to Cart{" "}
                        <i class="fa-sharp fa-solid fa-cart-plus"></i>
                      </button>
                    </center> */}
                      </div>
                    </div>
                  </center>{" "}
                </Link>
              ))}
              <div className="B mx-3">
                <Link className="showMore" to={"/category/women-ethnic"}>
                  ShowMore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="men mx-3 maincat my-3">
        <p className="TT">Men's Zone</p>
        <div className="container">
          <div className="menShirt">
            <p className="T my-3">Explore Men's Shirts</p>
            <div className="d-flex pC">
              {shirt?.map((p) => (
                <Link
                  key={p._id}
                  to={`/product/${p.slug}`}
                  className="product-link"
                >
                  <center>
                    <div className="card m-2 productCard Tcard ">
                      <img
                        src={p.photo}
                        className="card-img-top product-image"
                        alt="Product Image"
                      />
                      <div className="card-body">
                        <p className="text-danger newArrival ">New Arrival</p>
                        {/* <center>
                      <button className="prButton">
                        Add to Cart{" "}
                        <i class="fa-sharp fa-solid fa-cart-plus"></i>
                      </button>
                    </center> */}
                      </div>
                    </div>
                  </center>{" "}
                </Link>
              ))}
              <div className="B mx-3">
                <Link className="showMore" to={"/category/mens-shirt"}>
                  ShowMore
                </Link>
              </div>
            </div>
          </div>
          <div className="menTshirt">
            <p className="T my-3">Try Men's Tshirt</p>
            <div className="d-flex pC  ">
              {tshirt?.map((p) => (
                <Link
                  key={p._id}
                  to={`/product/${p.slug}`}
                  className="product-link"
                >
                  <center>
                    <div className="card m-2 productCard Tcard ">
                      <img
                        src={p.photo}
                        className="card-img-top product-image"
                        alt="Product Image"
                      />
                      <div className="card-body">
                        <p className="text-danger newArrival ">New Arrival</p>
                        {/* <center>
                      <button className="prButton">
                        Add to Cart{" "}
                        <i class="fa-sharp fa-solid fa-cart-plus"></i>
                      </button>
                    </center> */}
                      </div>
                    </div>
                  </center>{" "}
                </Link>
              ))}
              <div className="B mx-3">
                <Link className="showMore" to={"/category/mens-tshirt"}>
                  ShowMore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
