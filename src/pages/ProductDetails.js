import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import "../styles/ProductDetailsStyles.css";
import Layout from "../components/layout/Layout";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div
          className="col-md-5 m-3"
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            height: "400px"
          }}
        >
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="img-fluid img-thumbnail"
            alt={product.name}
            style={{ height: "fit-content", border: "none" }}
          
          />
        </div>
        <div className="col-md-5 product-details-info mt-3" >
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h2>{product.name}</h2>
          <h4 className="mt-5">Description</h4>
          <p>{product.description}</p>
          <h6>
            Price :₹
            {product?.price}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <div style={{marginTop: "50px"}}>
            <button class="btn btn-secondary ">ADD TO CART</button>
          </div>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div
              className="card m-2"
              style={{ width: "18rem", background: "white", border: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="img-fluid img-thumbnail mt-3"
                  alt={p.name}
                  style={{ height: "auto", width: "150px", border: "none" }}
                />
              </div>

              <div className="card-body">
                <div style={{ height: "80px" }}>
                  <h4 className="card-title">{p.name}</h4>
                </div>

                <div className="pt-3 pb-3" style={{ height: "80px" }}>
                  <p className="card-text">
                    {p.description.substring(0, 40)}...
                  </p>
                </div>

                <p className="card-text">₹{p.price}</p>
                <div className="row">
                  <button
                    className="btn btn-primary m-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
