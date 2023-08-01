import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { FaUserAlt } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
          duration: 4000,
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
 
  return (
    <Layout title={"Login - Twister"}>
      <div className="register">
        <h1>Welcome Back</h1>
        <p>Login to continue</p>
        <form onSubmit={handleSubmit} className=" rounded p-5" style={{background: "rgb(245 248 251)",}}>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputEmail">Email</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1" style={{}}>
                <FaUserAlt />
              </span>
              <input
                type="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Email"
                required
              />
            </div>
            <label htmlFor="exampleInputEmail">Password</label>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1" style={{}}>
                <MdLockOutline />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <button type="submit" className="btn btn-lg btn-primary mt-3" style={{border: "50px"}}>
              Login
            </button>
          </div>

          <div className="mb-3"> 
            <p
            style={{cursor: "pointer !important"}}
              className=" mt-3"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </p> 
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
