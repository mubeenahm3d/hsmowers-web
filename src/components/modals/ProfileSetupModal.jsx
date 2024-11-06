import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneInput from "react-phone-input-2";
import styled from "styled-components";
import { Avatar, } from "@mui/material";
import LoadingButton from "../LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { auth, db } from "../../authentication/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import uploadImg from "../../utils/uploadImg";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";

export default function ProfileSetupModal({ backdropHandler, heading }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const currentUser = auth?.currentUser;

  const [stepNum, setStepNum] = useState(1);

  const [form, setForm] = useState({
    displayName: userInfo?.displayName || "",
    userName: userInfo?.userName || "",
    phoneNumber: userInfo?.phoneNumber || "",
    zipCode: userInfo?.zipCode || "",
    grade: userInfo?.grade || 9,
    description: userInfo?.description || "",
    schoolName: userInfo?.schoolName || "",
    profileImg: userInfo?.photoURL || "",
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

  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onChangeHandler(e) {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  }

  async function getImgURL() {
    try {
      const photoURL = await uploadImg(
        { name: form.userName, data: form.photoURL },
        "profilePics"
      );

      await updateProfile(currentUser, {
        photoURL,
      });
      return photoURL;
    } catch (e) {
      console.log("err while uploading profile pic", e);
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    let photoURL = userInfo?.photoURL;
    
    try {
      if (stepNum < 4) {
        setStepNum((current) => current + 1);
        return;
      }
      setSubmitLoading(true);
      if (form.photoURL && form.photoURL.substring(0, 5) !== "https") {
        photoURL = await getImgURL(form.photoURL);
        console.log("photo url", photoURL);
      }
      const userInfo = {
        ...form,
        email: currentUser?.email,
        uid: currentUser?.uid,
        photoURL,
        createdAt: serverTimestamp(),
      };
      console.log("userInfo", userInfo, photoURL);
      await setDoc(doc(db, "userInfo", currentUser?.uid), userInfo);

      dispatch(userActions.setUserInfo(userInfo));
      dispatch(userActions.setUserImage(photoURL));

      // navigate(`/profile-page/${form.userName}`);
     setTimeout(() => {
       navigate("/login");
       
     }, 5000);
    } catch (err) {
      console.log("error while saving user info", err);
    } 
    // finally {
    //   setSubmitLoading(false);
    // }
  }
  function backBtnHandler(e) {
    e.preventDefault();
    setStepNum((current) => current - 1);
  }

  function renderSteps() {
    switch (stepNum) {
      case 1:
        return <Step1 form={form} onChangeHandler={onChangeHandler} />;
      case 2:
        return <Step2 form={form} onChangeHandler={onChangeHandler} />;
      case 3:
        return <Step3 form={form} onChangeHandler={onChangeHandler} />;
      case 4:
        return <Step4 form={form} onChangeHandler={onChangeHandler} />;
      default:
        return <Step1 form={form} onChangeHandler={onChangeHandler} />;
    }
  }

  return (
    <>
      <div className="heading">
        <h4>{heading}</h4>
        <button className="icon" onClick={() => backdropHandler(false)}>
          <CloseIcon htmlColor="var(--primary-color)" fontSize="large" />
        </button>
      </div>

      <StyledProfileSetup>
        <div className="content">
          <h4>Create your business page</h4>
          <form onSubmit={submitHandler}>
            {renderSteps()}
            <div className="btns">
              <button
                disabled={stepNum === 1}
                onClick={backBtnHandler}
                className="back-btn"
              >
                <ArrowBackIcon fontSize="small" /> Back
              </button>

              <LoadingButton
                loading={submitLoading}
                type="submit"
                title={"Next"}
              />

             
            </div>
          </form>
          <div className="progress">
            <div className={`step ${stepNum > 0 ? "active" : ""}`} />
            <div className={`step ${stepNum > 1 ? "active" : ""}`} />
            <div className={`step ${stepNum > 2 ? "active" : ""}`} />
            <div className={`step ${stepNum > 3 ? "active" : ""}`} />
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
          min={0.5}
          step={0.5}
          max={20}
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
        <label htmlFor="fullName">Enter Your Zip Code</label>
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
        />
      </div>
    </StyledStep>
  );
}

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
