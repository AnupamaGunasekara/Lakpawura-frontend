import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import './SignUp.css'
import  axios from "axios";


function SignUp() {
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
    officeno: "",
    homeno: "",
    birthday: "",
    agreeToConditions: "",
    lakpawuraSource: "",
  });

  const navigate = useNavigate();
  

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
      const res = await axios.post(`${base_url}/api/user/register`, values);
      console.log(res.data.message);
      if (res.data.Status === "Success") {
        navigate("/projectsUser");
      } else if (res.data.message == "already registered email") {
        alert("Email is already registered! Please Enter another one");
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
        <h2>Personal Details</h2>

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
        <br></br>
        <label className="lables">Contact Numbers</label>
        <br></br>
        <div className="form-group contact">
          <label className="lables">Mobile</label>
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

        <div className="form-group contact">
          <label className="lables">Office </label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="text"
              id="officeno"
              placeholder=""
              onChange={(e) => {
                setvalues({ ...values, officeno: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group contact">
          <label className="lables">Home</label>
          <div className="custom_input">
            <input
              className="details-input form-control"
              type="text"
              id="homeno"
              placeholder=""
              onChange={(e) => {
                setvalues({ ...values, homeno: e.target.value });
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

        <label className="lables">How do you know Lakpawura</label>
        <br></br>
        <br></br>

        <div className="form-check">
          <input
            type="radio"
            id="friend"
            name="lakpawuraSource"
            value="friend"
            className=" form-check-input"
            onChange={(e) =>
              setvalues({ ...values, lakpawuraSource: e.target.value })
            }
          />
          <label className="form-check-label lables">
            Introduced by a Friend
          </label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            id="family"
            name="lakpawuraSource"
            value="family"
            className="form-check-input"
            onChange={(e) =>
              setvalues({ ...values, lakpawuraSource: e.target.value })
            }
          />
          <label className="form-check-label lables">
            Introduced by a Family Member
          </label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            id="company"
            name="lakpawuraSource"
            value="company"
            className="form-check-input"
            onChange={(e) =>
              setvalues({ ...values, lakpawuraSource: e.target.value })
            }
          />
          <label className="form-check-label lables">
            Introduced by the Company
          </label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            id="socialMedia"
            name="lakpawuraSource"
            value="socialmedia"
            className="form-check-input"
            onChange={(e) =>
              setvalues({ ...values, lakpawuraSource: e.target.value })
            }
          />
          <label className="form-check-label lables">Social Media</label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            id="dprWebsite"
            name="lakpawuraSource"
            value="dprWebsite"
            className="form-check-input"
            onChange={(e) =>
              setvalues({ ...values, lakpawuraSource: e.target.value })
            }
          />
          <label className="form-check-label lables">Lakpawura Website</label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            id="other"
            name="lakpawuraSource"
            className="form-check-input"
            onChange={(e) =>
              setvalues({ ...values, lakpawuraSource: e.target.value })
            }
          />
          <label className="form-check-label lables">Other</label>
        </div>

        <label className="form-check-label lables">
          Are you agree with conditions
        </label>
        <div className="form-check">
          <input
            type="radio"
            id="agree"
            name="Conditions"
            value="yes"
            className="form-check-input"
            onChange={(e) =>
              setvalues({ ...values, agreeToConditions: e.target.value })
            }
          />
          <label className="form-check-label lables">Yes</label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            id="disagree"
            name="Conditions"
            value="no"
            className="form-check-input"
            onChange={(e) =>
              setvalues({ ...values, agreeToConditions: e.target.value })
            }
          />
          <label className="form-check-label lables">No</label>
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

export default SignUp;
