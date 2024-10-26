import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import Info from "../components/modals/Info";
import LoadingButton from "../components/LoadingButton";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  // signInWithRedirect,
} from "firebase/auth";
import { auth } from "../authentication/firebase";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { alertActions } from "../store/alertSlice";
import { useDispatch } from "react-redux";
import BackdropWrapper from "../components/modals/BackdropWrapper";
import logo from "../assets/logo-black.png";
import { Link } from "react-router-dom";
import loginImg from "../assets/login-img.svg";
import SignInWithoutEmail from "../authentication/SignInWithoutEmail";

export default function Signup() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [backdrop, setBackdrop] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  let { from } = location.state || { from: "/" };

  // const provider = new GoogleAuthProvider();

  function inputChangeHandler(event) {
    setInputs((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      await sendEmailVerification(response.user);
      dispatch(
        alertActions.setAlert({
          title: "Verify Email",
          messageType: "info",
        })
      );
      setBackdrop(true);
    } catch (e) {
      dispatch(
        alertActions.setAlert({
          title: JSON.parse(JSON.stringify(e)).code,
          messageType: "error",
        })
      );
      console.log("Failed to create an account", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledSignup>
      <BackdropWrapper
        backdropHandler={() => {
          setBackdrop(false);
        }}
        element={
          <Info
            heading="Email Verification"
            msg="Email verification link has been sent to your email, please verify and login."
            backdropHandler={() => {
              setBackdrop(false);
              navigate("/login");
            }}
          />
        }
        smallSize={true}
        open={backdrop}
      />
      <div className="left">
        <img src={loginImg} alt="" />
      </div>
      <div className="right">
        <img className="logo" src={logo} alt="" />
        <div className="register-form">
          <div className="heading">
            <h3>Let's get started!</h3>
            <p>
              Already have an account?{"  "}
              <Link className="link" to="/login" state={{from}}>
                Login
              </Link>
            </p>
          </div>
          <form onSubmit={submitHandler}>
            <div className="input">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={inputs.email}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="input">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={inputs.password}
                onChange={inputChangeHandler}
                minLength={8}
                required
              />
            </div>
            <LoadingButton loading={loading} type="submit" title="Signup" />
          </form>
          <SignInWithoutEmail />
        </div>
      </div>
    </StyledSignup>
  );
}

const StyledSignup = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  overflow: hidden;
  position: relative;
  width: 100%;
  .left {
    flex-basis: 50%;
  }
  .right {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    align-items: center;
    justify-content: center;
    .heading {
      h3 {
        margin-bottom: 1rem;
      }
    }

    .link {
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
    }
    .logo {
      width: 200px;
      margin-bottom: 10%;
    }
    .register-form {
      width: 70%;
      background: linear-gradient(
        rgb(255, 255, 255, 0.9),
        rgb(255, 255, 255, 0.1) 95%
      );
      padding: 10% 0;
      border-radius: var(--radius-20);
      form {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        width: 70%;
        margin: 5% auto auto;
        .input,
        button {
          margin: 10px auto;
          width: 100%;
        }
        .input input {
          width: 100%;
        }
        .username {
          p {
            text-align: left;
            height: 1ex;
            color: red;
            margin: 2% 0 0 2%;
          }
        }
      }
    }
  }
  @media (max-width: 1000px) {
    .left{
      display: none;
    }
    .right{
      flex-basis: 100%;
    }
  }
`;
