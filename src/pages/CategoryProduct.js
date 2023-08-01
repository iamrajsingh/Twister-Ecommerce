import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import "../styles/CategoryProductStyles.css";
import axios from "axios";
import Layout from '../components/layout/Layout';
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
              {products?.map((p) => (
                 <div className="card m-2" style={{ width: "18rem", background: "white", border: "none"}}>
                 <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "300px"}}>
                   <img
                   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                   className="img-fluid img-thumbnail mt-3"
                   alt={p.name}
                   style={{ height: "auto", width: "150px", border: "none" }}
                 />
                 </div>
                 
                 <div className="card-body">
                   <div style={{height: "80px"}}>
                     <h4 className="card-title">{p.name}</h4>
                   </div>
                   
                   <div className="pt-3 pb-3" style={{height: "80px"}}>
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
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
