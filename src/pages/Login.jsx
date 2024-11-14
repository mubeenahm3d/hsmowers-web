import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../authentication/firebase";
import Info from "../components/modals/Info";
import LoadingButton from "../components/LoadingButton";
import BackdropWrapper from "../components/modals/BackdropWrapper";
import { alertActions } from "../store/alertSlice";
import { useDispatch } from "react-redux";
import logo from "../assets/MowerLogo.png";
import ForgotPass from "../components/modals/ForgotPass";
import { Link } from "react-router-dom";
import loginImg from "../assets/login-logo.png";
import SignInWithoutEmail from "../authentication/SignInWithoutEmail";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [forgotPassBackdrop, setForgotPassBackdrop] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  let { from } = location.state || { from: "/select-area" };

  function inputChangeHandler(event) {
    setInputs((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      if (user.emailVerified) {
        const userDocRef = doc(db, "userInfo", user.uid); 
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().serviceArea) {
          navigate(`/p/${userDoc.data().userName}`); 
        } else {
          navigate("/select-area"); 
        }
      } else {
        await sendEmailVerification(user);
        dispatch(
          alertActions.setAlert({
            title: "Email not Verified",
            messageType: "warning",
          })
        );
        setBackdrop(true);
      }
    } catch (e) {
      console.log("Failed to login", JSON.stringify(e));
      dispatch(
        alertActions.setAlert({
          title: JSON.parse(JSON.stringify(e)).code,
          messageType: "warning",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledLogin>
      <BackdropWrapper
        backdropHandler={() => setForgotPassBackdrop((current) => !current)}
        element={
          <ForgotPass
            backdropHandler={() => setForgotPassBackdrop((current) => !current)}
          />
        }
        smallSize={true}
        open={forgotPassBackdrop}
      />
      <BackdropWrapper
        backdropHandler={() => setBackdrop(false)}
        element={
          <Info
            heading="Email Verification"
            msg="Email verification link has been sent to your email, please verify and login."
            backdropHandler={() => setBackdrop(false)}
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
            <h3>Login</h3>
            {/* <p>
              Don't have an account?{"  "}
              <Link className="link" to="/signup" state={{ from }}>
                Signup
              </Link>
            </p> */}
          </div>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={inputs.email}
              onChange={inputChangeHandler}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={inputs.password}
              onChange={inputChangeHandler}
              minLength={8}
              required
            />
            <LoadingButton loading={loading} type="submit" title="Login" />
            <span
              className="link forgot-pass"
              onClick={() => setForgotPassBackdrop(true)}
            >
              Forgot password?
            </span>
          </form>
          <SignInWithoutEmail />
        </div>
      </div>
    </StyledLogin>
  );
}

const StyledLogin = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  overflow: hidden;
  position: relative;
  width: 100%;
  .left {
    flex-basis: 50%;
    img {
      width: 100%;
      height: auto;
    }
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
      margin-bottom: 1rem;
    }
    .logo {
      width: 100px;
    }
    .register-form {
      width: 70%;
      background: linear-gradient(
        rgb(255, 255, 255, 0.9),
        rgb(255, 255, 255, 0.1) 95%
      );
      padding: 5% 0;
      border-radius: var(--radius-20);
      form {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        width: 70%;
        margin: 5% auto auto;
        input,
        button {
          margin: 15px auto;
          width: 100%;
        }
      }
    }
  }
  @media (max-width: 1000px) {
    .left {
      display: none;
    }
    .right {
      flex-basis: 100%;
    }
  }
`;
