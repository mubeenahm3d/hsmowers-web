import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneInput from "react-phone-input-2";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import LoadingButton from "../LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { auth, db } from "../../authentication/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import uploadImg from "../../utils/uploadImg";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  // signInWithRedirect,
} from "firebase/auth";
import { alertActions } from "../../store/alertSlice";
import { Link } from "react-router-dom";
import BackdropWrapper from "./BackdropWrapper";
import { useLocation } from "react-router";
import SignInWithoutEmail from "../../authentication/SignInWithoutEmail";
import Info from "./Info";

export default function ProfileSetupModal({ backdropHandler, heading }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  const [stepNum, setStepNum] = useState(1);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    displayName: userInfo?.displayName || "",
    userName: userInfo?.userName || "",
    phoneNumber: userInfo?.phoneNumber || "",
    // zipCode: userInfo?.zipCode || "",
    address: userInfo?.address || "",
    grade: userInfo?.grade || 9,
    description: userInfo?.description || "",
    schoolName: userInfo?.schoolName || "",
    photoURL: userInfo?.photoURL || "",
    services: userInfo?.services || [],
    serviceDistance: userInfo?.serviceDistance || 0.5,
  });

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      setForm((currentForm) => ({
        ...currentForm,
        ...userInfo,
      }));
    }
  }, [userInfo]);

async function fetchZipCodeFromAddress(address) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === "OK") {
      const result = data.results[0];
      console.log("Full result:", result);

      const addressComponents = result.address_components;
      console.log("Address components:", addressComponents);

      const zipCode = addressComponents.find((component) =>
        component.types.includes("postal_code")
      )?.long_name;

      console.log("Converted zip code:", zipCode);
      return zipCode || "";
    } else {
      console.error("Geocoding API error:", data.status);
      return "";
    }
  } catch (error) {
    console.error("Error fetching zip code:", error);
    return "";
  }
}

  function onChangeHandler(e) {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  }

  async function getImgURL() {
    try {
      const photoURL = await uploadImg(
        { name: form.userName, data: form.photoURL },
        "profilePics"
      );

      return photoURL;
    } catch (e) {
      console.log("err while uploading profile pic", e);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (stepNum === 1) {
      const isAvailable = await checkUserNameAvailability(form.userName);
      if (!isAvailable) {
        setError(
          "Username is already taken. Please choose another."
        );
        return
      }
    }
    if(stepNum === 2 && form.services.length === 0) {
      setError("Please select at least 1 service.")
      return
    } 
    if (stepNum < 5) {
      if (stepNum === 4) {
        const zipCode = await fetchZipCodeFromAddress(form.address);
        console.log("zipCode",zipCode);
        setForm((prev) => ({ ...prev, zipCode }));
      }
      setStepNum((current) => current + 1);
    }
  };

  const checkUserNameAvailability = async (username) => {
    try {
      const customerRef = collection(db, "userInfo");
      const q = query(customerRef, where("userName", "==", username));
      const userSnapshot = await getDocs(q);

      if (userSnapshot.empty) {
        setUserNameErrorMessage("");
        return true;
      } else {
        setUserNameErrorMessage("Username is already taken");
        return false;
      }
    } catch (error) {
      console.error("Error checking username:", error);
      setUserNameErrorMessage("Error checking username availability.");
      return false;
    }
  };

  useEffect(() => {
    if (stepNum === 5) {
      let photoURL = form.photoURL;

      if (photoURL && photoURL.substring(0, 5) !== "https") {
        const saveInfo = async () => {
          try {
            photoURL = await getImgURL(photoURL);
            const userInfo = {
              ...form,
              photoURL: photoURL || "",
            };
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
          } catch (err) {
            console.log("error while saving user info", err);
          }
        };
        saveInfo();
      } else {
        const userInfo = {
          ...form,
          photoURL: photoURL || "",
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
    }
  }, [stepNum]);

  function backBtnHandler(e) {
    e.preventDefault();
    setStepNum((current) => current - 1);
  }

  function renderSteps() {
    switch (stepNum) {
      case 1:
        return (
          <Step1
            form={form}
            onChangeHandler={onChangeHandler}
            
          />
        );
      case 2:
        return <Step2 form={form} onChangeHandler={onChangeHandler} />;
      case 3:
        return <Step3 form={form} onChangeHandler={onChangeHandler} />;
      case 4:
        return <Step4 form={form} onChangeHandler={onChangeHandler} />;
      case 5:
        return <Step5 />;
      default:
        return (
          <Step1
            form={form}
            onChangeHandler={onChangeHandler}
            
          />
        );
    }
  }

  return (
    <>
      <div className="heading">
        <h4>{heading}</h4>
        <button className="icon" onClick={backdropHandler}>
          <CloseIcon htmlColor="var(--primary-color)" fontSize="large" />
        </button>
      </div>

      <StyledProfileSetup>
        <div className="content">
          <h4>Create your business page</h4>
          <form onSubmit={submitHandler}>
            {renderSteps()}
            <div className="btns">
              {stepNum !== 5 && (
                <>
                  <button
                    disabled={stepNum === 1}
                    onClick={backBtnHandler}
                    className="back-btn"
                  >
                    <ArrowBackIcon fontSize="small" /> Back
                  </button>
                  <LoadingButton type="submit" title={"Next"} />
                </>
              )}
            </div>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="progress">
            <div className={`step ${stepNum > 0 ? "active" : ""}`} />
            <div className={`step ${stepNum > 1 ? "active" : ""}`} />
            <div className={`step ${stepNum > 2 ? "active" : ""}`} />
            <div className={`step ${stepNum > 3 ? "active" : ""}`} />
            <div className={`step ${stepNum > 4 ? "active" : ""}`} />
          </div>
        </div>
      </StyledProfileSetup>
    </>
  );
}

function Step1({ form, onChangeHandler }) {
  return (
    <StyledStep>
      <div className="field">
        <label htmlFor="fullName">Full Name</label>
        <input
          type={"text"}
          minLength={3}
          placeholder="Enter Full Name"
          name={"displayName"}
          value={form.displayName}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="userName">Username</label>
        <input
          type={"text"}
          minLength={3}
          placeholder="Enter Username"
          name={"userName"}
          value={form.userName}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="phoneNumber">Phone Number</label>
        <PhoneInput
          country={"us"}
          value={form.phoneNumber}
          onChange={(phone) =>
            onChangeHandler({ target: { name: "phoneNumber", value: phone } })
          }
          onlyCountries={["us"]}
          placeholder="Enter phone number"
          required
        />
      </div>
    </StyledStep>
  );
}

function Step2({ form, onChangeHandler }) {
  const isActive = (service) =>
    form.services.includes(service.toLowerCase().split(" ").join("-"));

  function servicesBtnClicked(e) {
    e.preventDefault();
    const { classList, value } = e.target;
    const serviceValue = value;

    let updatedServices = [...form.services];

    if (classList.contains("active")) {
      updatedServices = updatedServices.filter(
        (service) => service !== serviceValue
      );
      classList.remove("active");
    } else {
      updatedServices.push(serviceValue);
      classList.add("active");
    }
    onChangeHandler({ target: { name: "services", value: updatedServices } });
  }

  const servicesOptions = [
    "Mowing",
    "Snow Removal",
    "Baby Sitting",
    "Window Cleaning",
    "Edging",
    "Weeding",
    "Leaf Removal",
  ];
  return (
    <StyledStep className="step2">
      <div className="field">
        <label htmlFor="services">Select your services</label>
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
      <div className="field">
        <label htmlFor="serviceDistance">Service Distance</label>
        <h5>{form.serviceDistance} Miles</h5>
        <input
          type={"range"}
          min={0.1}
          step={0.1}
          max={5}
          className="range-input"
          name={"serviceDistance"}
          value={form.serviceDistance}
          onChange={onChangeHandler}
        />
      </div>
    </StyledStep>
  );
}

function Step3({ form, onChangeHandler }) {
  const fileSelectedHandler = (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        onChangeHandler({ target: { name: "photoURL", value: reader.result } });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <StyledStep className="step3">
      <div className="field">
        <label htmlFor="photoURL">Profile Picture</label>
        <Avatar src={form.photoURL} sx={{ width: "100px", height: "100px" }} />
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          name="photoURL"
          onChange={(e) => fileSelectedHandler(e)}
          id="img-upload"
        />
        <label htmlFor="img-upload" className="gray-btn">
          Upload Image
        </label>
      </div>
      <div className="field">
        <label htmlFor="userName">School Name</label>
        <input
          type={"text"}
          minLength={3}
          placeholder="Enter School Name"
          name={"schoolName"}
          value={form.schoolName}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="grade">Grade</label>
        <select
          name="grade"
          value={form.grade}
          onChange={onChangeHandler}
          required
        >
          <option value={9}>Fresher</option>
          <option value={10}>Sophomore</option>
          <option value={11}>Junior</option>
          <option value={12}>Senior</option>
        </select>
      </div>
    </StyledStep>
  );
}

function Step4({ form, onChangeHandler }) {
  return (
    <StyledStep className="step4">
      <div className="field">
        <label htmlFor="fullName">Describe your business</label>
        <textarea
          placeholder="Enter Full Name"
          rows={5}
          required
          maxLength={200}
          name={"description"}
          value={form.description}
          onChange={onChangeHandler}
        />
        {/* <label htmlFor="fullName">Enter Your Zip Code</label>
        <input
          type="number"
          placeholder="Enter Zip Code"
          required
          minLength={5}
          value={form.zipCode}
          onChange={(e) =>
            onChangeHandler({
              target: { name: "zipCode", value: e.target.value },
            })
          }
        /> */}

        <label htmlFor="fullName">Enter Your Address</label>
        <input
          type="text"
          placeholder="Enter Address"
          required
          value={form.address}
          onChange={(e) =>
            onChangeHandler({
              target: { name: "address", value: e.target.value },
            })
          }
        />
      </div>
    </StyledStep>
  );
}

function Step5() {
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
    <>
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
        {/* <div className="left">
       <img src={loginImg} alt="" />
     </div> */}
        <div className="right">
          {/* <img className="logo" src={logo} alt="" /> */}
          <div className="register-form">
            {/* <div className="heading">
           <h3>Let's get started!</h3>
           <p>
             Already have an account?{"  "}
             <Link className="link" to="/login" state={{ from }}>
               Login
             </Link>
           </p>
         </div> */}
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
    </>
  );
}

// function Step5() {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/login");
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <Lottie
//           animationData={LoaderAnimation}
//           loop={true}
//           style={{ width: 200, height: 200 }}
//         />
//         <p style={{ marginBottom: "34px" }}>Creating your account</p>
//       </div>
//     </>
//   );
// }

const StyledProfileSetup = styled.section`
  margin-top: var(--section-margin);
  min-height: var(--section-height);
  h3 {
    text-align: center;
  }
  h4 {
    color: var(--text-color);
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* box-shadow: 0px 0px 4px 2px var(--shadow-light); */
    /* max-width: 650px; */
    margin: var(--section-margin) auto;
    border-radius: var(--l-radius);
    /* padding: 30px; */
    h4 {
      margin-bottom: 20px;
    }
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .btns {
        display: flex;

        .back-btn {
          background-color: transparent;
          color: var(--text-light-color);
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }
      }
    }
    .progress {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 30px;
      .step {
        width: 50px;
        height: 6px;
        background-color: gray;
        border-radius: 4px;
        background-color: var(--light-gray-color);
        transition: all 0.2s ease-in-out;
        &.active {
          background-color: var(--primary-color);
        }
      }
    }
  }
`;

const StyledStep = styled.div`
  /* min-height: 370px; */
  display: flex;
  align-items: center;
  flex-direction: column;
  .field {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 1rem;
    label {
      font-weight: 500;
    }
    input,
    select,
    textarea {
      min-width: 240px;
    }
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
      flex-wrap: wrap;
      gap: 10px;
      .gray-btn.active {
        background-color: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }
    }
    .special-label {
      display: none;
    }
  }
  &.step2 {
    .field {
      width: 70%;
      h5 {
        color: var(--text-light-color);
        width: 100%;
        text-align: center;
      }
      .range-input {
        width: 100%;
      }
    }
  }
  &.step3 {
    .field {
      .gray-btn {
        padding: 0px 8px;
        cursor: pointer;
      }
      width: 100%;
    }
  }
  &.step4 {
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

const StyledSignup = styled.section`
  /* height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  overflow: hidden;
  position: relative;
  width: 100%; */
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
    }
    .logo {
      width: 100px;
      /* margin-bottom: 10%; */
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
        margin: auto;
        .input,
        button {
          margin: 10px auto;
          width: 100%;
        }
        .input input {
          /* width: 100%; */
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
    .left {
      display: none;
    }
    .right {
      flex-basis: 100%;
    }
  }
`;
