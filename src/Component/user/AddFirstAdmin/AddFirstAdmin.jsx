import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import './SignUp.css'
import  Axios from "axios";


function AddFirstAdmin() {
  const base_url = import.meta.env.VITE_APP_BACKEND_URL;
  useEffect(() => {
    console.log("Cookies:", document.cookie);
  }, []);
  const [warning, setWarning] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setvalues] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    mobileno: "",
    adminid:"",
    birthday: "",
  });

  const navigate = useNavigate();
   Axios.defaults.withCredentials = true;

  //submiting PersonalDetails to backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Password == "") {
      setWarning("Enter password!");
      return;
    }
    if (confirmPassword == "") {
      setWarning("Confirm password!");
      return;
    }

    if (Password !== confirmPassword) {
      setWarning("Passwords do not match!");
      setPassword("");
      setConfirmPassword("");
      setvalues({ ...values, password: "" });
      return;
    }

    try {
      setLoading(true);
      const res = await Axios.post(`${base_url}/api/admin/createfirstadmin`, values);
      console.log(res.data.message);
      if (res.data.Status === "Success") {
        navigate("/projects");
      } else if (res.data.message == "user exist") {
        alert("Already Added the first Admin!");
        setLoading(false);
      } else {
        alert("System Error!");
        setLoading(false);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="form-groups">
      <form onSubmit={handleSubmit}>
        <h2>Create First Admin</h2>

        <div className="form-group">
          <label className="lables">Email</label>
          <div className="custom_input">
            <input
              required
              className="details-input form-control"
              type="email"
              id="email"
              placeholder=""
              onChange={(e) => {
                setvalues({ ...values, email: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="lables">Name</label>
          <div className="custom_input">
            <input
              required
              className="details-input form-control"
              type="text"
              id="name"
              placeholder=""
              onChange={(e) => {
                setvalues({ ...values, name: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="lables">AdminID</label>
          <div className="custom_input">
            <input
              required
              className="details-input form-control"
              type="number"
              id="adminid"
              placeholder=""
              onChange={(e) => {
                setvalues({ ...values, adminid: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="lables">Permanent Address</label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="text"
              id="address"
              placeholder=""
              onChange={(e) => {
                setvalues({ ...values, address: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="">
          <label className="lables">Mobile No</label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="text"
              id="mobileno"
              placeholder=""
              onChange={(e) => {
                setvalues({ ...values, mobileno: e.target.value });
              }}
            />
          </div>
        </div>



        <div className="form-group">
          <label className="lables">Date of birth</label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="date"
              id="birthday"
              placeholder=""
              onChange={(e) => {
                setvalues({ ...values, birthday: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="lables"> New Password</label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="password"
              id="password"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
                setvalues({ ...values, password: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="lables">Confirm Password</label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="password"
              id="password2"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          {warning && <p style={{ color: "red" }}>{warning}</p>}
        </div>



        <div style={{ display: "flex" }}>
          <Button
            type="submit"
            className="signup-Button button-color"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  style={{ marginLeft: "11px", marginRight: "11px" }}
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>

        <br></br>
        <br></br>
      </form>
      <br></br>
      <br></br>
    </div>
  );
}

export default AddFirstAdmin;
