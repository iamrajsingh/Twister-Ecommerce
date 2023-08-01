import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  // Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, phone, address, password, answer }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
          duration: 4000,
        });
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register - Twister"}>
      <div className="register mt-5" >
        <h1>Create Your Account</h1>
        <form onSubmit={handleSubmit} className=" rounded p-5" style={{background: "rgb(245 248 251)",}}>
          <div className="form-group mt-3" >
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputEmail">Email</label>
            <input
              type="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputName">Phone</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              placeholder="Enter Phone"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputName">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              placeholder="Enter Address"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputName">What is your pet name? </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              placeholder="Enter Answer"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>

            <button type="submit" className="btn btn-primary mt-3">
            Register
          </button>
          </div>
          
        </form>
      </div>
    </Layout>
  );
};

export default Register;
