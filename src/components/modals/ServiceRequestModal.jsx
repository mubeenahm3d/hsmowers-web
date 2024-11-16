import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { db } from "../../authentication/firebase";
import { alertActions } from "../../store/alertSlice";
import { addDoc, collection } from "firebase/firestore"; 
import { useDispatch } from "react-redux";
import LoadingButton from "../LoadingButton";

export default function ServiceRequestModal({ backdropHandler, heading }) {
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [showEmail, setShowEmail] = useState(true);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showSMS, setShowSMS] = useState(false);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const requestRef = collection(db, "serviceRequests");

    const isActive = (service) =>
      services.some((s) => s === service.toLowerCase().split(" ").join("-"));


    const servicesBtnClicked = (e) => {
      e.preventDefault();
      const { value } = e.target;

      setServices(
        (prevServices) =>
          prevServices.includes(value)
            ? prevServices.filter((service) => service !== value) 
            : [...prevServices, value]
      );
    };

    console.log(services)


    const servicesOptions = [
      "Mowing",
      "Snow Removal",
      "Baby Sitting",
      "Window Cleaning",
      "Edging",
      "Weeding",
      "Leaf Removal",
      "Dog Walking",
    ];

    const handleRequest = async() => {
        setLoading(true)
        if (services.length === 0) {
          setError("Please select at least one service.");
          setLoading(false);
          return;
        }

        if (!address) {
          setError("Address is required.");
          setLoading(false);
          return;
        }

        if (showEmail && !email) {
          setError("Email is required.");
          setLoading(false);
          return;
        }

        if ((showPhoneNumber || showSMS) && !number) {
          setError("Phone number is required.");
          setLoading(false);
          return;
        }

        try {
             await addDoc(requestRef, {
               services:services,
               email: email,
               number: number,
               address:address
             });
             dispatch(
               alertActions.setAlert({
                 messageType: "success",
                 title: "Request sent successfully!",
               })
             );
             setServices([]);
             setEmail("");
             setNumber("");
             setAddress("");
             backdropHandler(false);
        } catch (error) {
              console.log(error);
              dispatch(
                alertActions.setAlert({
                  messageType: "error",
                  title: "Failed to send Request!",
                })
              );
        }
        finally{
            setLoading(false)
        }
    }



  return (
    <>
      <StyledRequest>
        <div className="heading">
          <h4>{heading}</h4>
          <button className="icon" onClick={() => backdropHandler(false)}>
            <CloseIcon htmlColor="var(--primary-color)" fontSize="large" />
          </button>
        </div>

        <div className="content">
          <div className="field">
            <label htmlFor="services">Required Services</label>
            <div className="services-btns">
              {servicesOptions.map((service, index) => (
                <button
                  key={index}
                  className={`gray-btn ${isActive(service) ? "active" : ""}`}
                  value={service.toLowerCase().split(" ").join("-")}
                  onClick={servicesBtnClicked}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <label htmlFor="address">Where do you need the work done?</label>
          <input
            type="text"
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="message">How you'd like to get notified?</label>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="email"
              checked={showEmail}
              onChange={() => setShowEmail((prev) => !prev)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="number"
              checked={showPhoneNumber}
              onChange={() => setShowPhoneNumber((prev) => !prev)}
            />
            <label htmlFor="number">Phone Number</label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="sms"
              checked={showSMS}
              onChange={() => setShowSMS((prev) => !prev)}
            />
            <label htmlFor="sms">SMS</label>
          </div>

          <div className="custom-inputs">
            {showEmail && (
              <>
                <label htmlFor="emailInput">Enter your email</label>
                {/* <br /> */}
                <input
                  type="email"
                  id="emailInput"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginTop: "0.6rem" }}
                />
              </>
            )}
            <br />
            {(showPhoneNumber || showSMS) && (
              <>
                <label htmlFor="numberInput">Enter your Phone Number</label>
                {/* <br /> */}
                <input
                  type="number"
                  id="numberInput"
                  placeholder="Enter your Phone Number"
                  value={number}
                  required
                  onChange={(e) => setNumber(e.target.value)}
                  style={{ marginTop: "0.6rem" }}
                />
              </>
            )}
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <p style={{ color: "var(--primary-color)" }}>
            We'll notify you when mower available in your area.
          </p>

          <LoadingButton
            loading={loading}
            title={"Request"}
            onClick={handleRequest}
          />
        </div>
      </StyledRequest>
    </>
  );
}

const StyledRequest = styled.div`
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    .custom-inputs {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 320px;
      margin-top: -15px;
      input {
        width: 15px;
        max-width: 15px;
      }
    }
    .field {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 1rem;
      .gray-btn {
        border-radius: 50px;
        border: 1px solid var(--gray-color);
        color: var(--gray-color);
        background-color: transparent;
        &:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
      }
      .services-btns {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
        .gray-btn.active {
          background-color: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
      }
    }

    label {
      font-weight: 500;
      text-align: left;
      width: 320px;
    }

    input {
      width: 320px;
      max-width: 320px;
    }

    textarea {
      padding: 10px 6px;
      border-radius: var(--m-radius);
      width: 320px;
      max-width: 320px;
      height: 200px;
      max-height: 200px;
    }
  }
`;
