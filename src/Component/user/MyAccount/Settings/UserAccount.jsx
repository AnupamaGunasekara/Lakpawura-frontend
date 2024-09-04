import React, { useEffect, useState } from "react";
import { Button, message, Spin } from "antd"; // Import Ant Design components
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateAccount.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function UpdateAccount() {
  const base_url = import.meta.env.VITE_APP_BACKEND_URL;
  const cookieValue = Cookies.get("token");
  const userId = jwtDecode(cookieValue).id;
  const id = userId;

  const navigate = useNavigate();
  const [warning, setWarning] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false); // State to manage password change option
  const [values, setValues] = useState({
    email: "",
    name: "",
    address: "",
    mobileno: "",
    birthday: "",
    homeno: "",
    officeno: "",
    password:""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/user/getuserbasicdetails/${userId}`
        );
        const { email, name, address, mobileno, birthday, officeno, homeno } =
          response.data.Data;
        setValues({
          id,
          email,
          name,
          address,
          mobileno,
          homeno,
          birthday,
          officeno,
          password
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (changePassword) {
      if (password === "") {
        setWarning("Enter password!");
        return;
      }
      if (confirmPassword === "") {
        setWarning("Confirm password!");
        return;
      }
      if (password !== confirmPassword) {
        setWarning("Passwords do not match!");
        setPassword("");
        setConfirmPassword("");
        return;
      }
    }

  

    try {
      setLoading(true);
      console.log(values);
      const res = await axios.patch(
        `${base_url}/api/user/updatebasicdetails`,
        values
      );
      if (res.data.Status === "Success") {
        message.success("Updated successfully!"); // Display success message
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Navigate after a short delay
      } else if (res.data.message === "user exist") {
        message.error("Email is already registered!");
        setLoading(false);
      } else {
        message.error("System Error!");
        setLoading(false);
      }
    } catch (error) {
      message.error("Error occurred during update!");
      setLoading(false);
    }
  };


  const handlePasswordChange = async (event) => {
    event.preventDefault();
    console.log("jjjjjjjjjjjjjjjjjjjjjj")

    if (changePassword) {
      if (password === "") {
        setWarning("Enter password!");
        return;
      }
      if (confirmPassword === "") {
        setWarning("Confirm password!");
        return;
      }
      if (password !== confirmPassword) {
        setWarning("Passwords do not match!");
        setPassword("");
        setConfirmPassword("");
        return;
      }
    }

  

    try {
      setLoading(true);
      console.log(values);
      const res = await axios.patch(
        `${base_url}/api/user/updatebasicdetailswithpassword`,
        values
      );
      if (res.data.status) {
        message.success("Updated successfully!"); // Display success message
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Navigate after a short delay
      } else if (res.data.message === "user exist") {
        message.error("Email is already registered!");
        setLoading(false);
      } else {
        message.error("System Error!");
        setLoading(false);
      }
    } catch (error) {
      message.error("Error occurred during update!");
      setLoading(false);
    }


  };

  return (
    <div style={{ marginLeft: "30vw", marginTop: "5vh" }}>
      <form>
        <h2>Update Account</h2>

        <div className="form-group">
          <label className="labels">Email</label>
          <div className="custom_input">
            <input
              required
              className="details-input form-control"
              type="email"
              id="email"
              value={values.email}
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="labels">Name</label>
          <div className="custom_input">
            <input
              required
              className="details-input form-control"
              type="text"
              id="name"
              value={values.name}
              onChange={(e) => {
                setValues({ ...values, name: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="labels">Permanent Address</label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="text"
              id="address"
              value={values.address}
              onChange={(e) => {
                setValues({ ...values, address: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="labels">Mobile No</label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="text"
              id="mobileno"
              value={values.mobileno}
              onChange={(e) => {
                setValues({ ...values, mobileno: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="labels">Office No</label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="text"
              id="mobileno"
              value={values.officeno}
              onChange={(e) => {
                setValues({ ...values, officeno: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="labels">Home No</label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="text"
              id="mobileno"
              value={values.homeno}
              onChange={(e) => {
                setValues({ ...values, homeno: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="labels">Date of Birth</label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="date"
              id="birthday"
              value={values.birthday}
              onChange={(e) => {
                setValues({ ...values, birthday: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={changePassword}
              onChange={() => setChangePassword(!changePassword)}
            />{" "}
            Change Password
          </label>
        </div>

        {changePassword && (
          <>
            <div className="form-group">
              <label className="labels">New Password</label>
              <div className="custom_input">
                <input
                  className="details-input form-control"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setValues({ ...values, password: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="labels">Confirm Password</label>
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
          </>
        )}

        <div style={{ display: "flex" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            onClick={changePassword ? handlePasswordChange : handleSubmit}
          >
            {loading ? <Spin size="small" /> : "Update"}
          </Button>
        </div>

        <br />
        <br />
      </form>
      <br />
      <br />
    </div>
  );
}

export default UpdateAccount;
