import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
// import PrivateRoute from "./authentication/PrivateRoute";
import { getFunctions, httpsCallable } from "firebase/functions";
import AlertBar from "./components/modals/AlertBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { userActions } from "./store/userSlice";
import { auth, db } from "./authentication/firebase";
import AuthLoader from "./components/AuthLoader";
import { useParams } from "react-router";
import Upgrade from "./pages/Upgrade";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";

import PaymentResponse from "./pages/PaymentResponse";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import GetStarted from "./pages/GetStarted";
import LandingPage from "./pages/LandingPage";
import ProfileSetup from "./pages/ProfileSetup";
import About from "./pages/About";
import ConsentResponse from "./pages/ConsentResponse";
import ProfilePage from "./pages/ProfilePage";
import Map from "./components/Map";
import FindMowers from "./components/FindMowers";
import Page404 from "./components/Page404";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermOfService from "./pages/TermOfService";
import firebaseApi from "./utils/firebaseApi";
import WelcomeEmail from "./utils/WelcomeEmail";
import { fetchSubscription } from "./utils/fetchSubscription";

function App() {
  const [redirectLoading, setRedirectLoading] = useState(true);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("in user auth");
    redirectURLHandler();
  }, [auth]);



//  async function sendWelcomeEmailOnLogin(user) {
//    console.log("Sending welcome email to:", user.email);

//    try {
//      const response = await firebaseApi.post("/sendWelcomeEmailOnLogin", {
//        email: user.email,
//      });
//      const data = response.data; 
//      console.log("Result:", data);

//      if (data.success) {
//        console.log("Welcome email sent successfully");
//      } else {
//        console.log("Failed to send email", data.error);
//      }
//    } catch (error) {
//      console.error("Error triggering welcome email:", error);
//    }
//  }






  // const fetchSubscription = async (uid) => {
  //   const subsRef = collection(db, "customers", uid, "subscriptions");
  //   const subsQuery = query(
  //     subsRef,
  //     where("status", "in", ["trialing", "active", "past_due", "unpaid"])
  //   );
  //   try {
  //     const subscriptionDocs = await getDocs(subsQuery);
  //     if (subscriptionDocs.docs.length > 0) {
  //       let endDate;
  //       let subscription;
  //       subscriptionDocs.docs?.forEach((doc, index) => {
  //         console.log("doc", index, doc.data());
  //         if (!endDate || endDate < doc.data().current_period_end) {
  //           endDate = doc.data().current_period_end;
  //           subscription = doc.data();
  //         }
  //       });
  //       console.log("subscriptions", subscription);
  //       return subscription;
  //     }
  //   } catch (e) {
  //     console.log("error fetching subscription", e);
  //   }
  // };

  const fetchUserInfo = async (uid) => {
    try {
      const userInfo = await getDoc(doc(db, "userInfo", uid));
      console.log("Color from db",userInfo.data());
      return userInfo.data();
    } catch (e) {
      console.log("error while fetching user info", e);
    }
  };

  async function setUserInfo(currentUser) {
    const subscription = await fetchSubscription(currentUser.uid);
    const userInfo = await fetchUserInfo(currentUser.uid);
    const localUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("firebase userInfo", userInfo, "local userInfo", localUserInfo);
    if (!userInfo && localUserInfo && Object.keys(localUserInfo)?.length > 0) {
      console.log("saving in firebase");
    
      const newUserInfo = {
        uid: currentUser.uid,
        email: currentUser.email,
        createdAt: serverTimestamp(),
        ...localUserInfo,
      };
      console.log("new Data", newUserInfo);
      dispatch(
        userActions.setCurrentUser({
          ...currentUser,
          subscription,
          userInfo: newUserInfo,
        })
      );
       dispatch(
         userActions.updateThemeAndColors({
           selectedTheme: newUserInfo.selectedTheme,
           primaryColor: newUserInfo.primaryColor,
           secondaryColor: newUserInfo.secondaryColor,
           themeId: newUserInfo.themeId,
         })
       );

      try {
        await setDoc(doc(db, "userInfo", currentUser.uid), newUserInfo);
        localStorage.removeItem("userInfo");
      } catch (error) {
        console.error("Error saving user info:", error);
      }
    } else {
      console.log("saving in redux");
      dispatch(
        userActions.setCurrentUser({
          ...currentUser,
          subscription,
          userInfo,
        })
      );
    }
  }

  async function redirectURLHandler() {
    try {
      const result = await getRedirectResult(auth);
      console.log("redirect result", result);

      if (result?.user) {
        setUserInfo(result.user);
        let { from } = location.state || { from: { pathname: "/" } };
        navigate(from);
      } else {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log("User is logged in:", user.email); 
            setUserInfo(user);
            // sendWelcomeEmailOnLogin(user); 
            // WelcomeEmail(user);
          } else {
            console.log("No user logged in");
          }
        });
      }
    } catch (error) {
      console.error("Error while redirecting Google URL", error);
    } finally {
      setRedirectLoading(false);
    }
  }

  return redirectLoading ? (
    <AuthLoader />
  ) : (
    <div className="App">
      <AlertBar alertStates={alert} />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/select-area" element={<Map />} />
        <Route path="/page-not-found" element={<Page404 />} />
        <Route path="/find-mowers" element={<FindMowers />} />
        <Route path="/consent-response" element={<ConsentResponse />} />
        <Route path="/p/:username" element={<ProfilePageRoute />} />
        <Route path="/login" element={<Login />} />
         {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/payment-successful" element={<PaymentResponse />} />
        <Route path="/payment-cancelled" element={<PaymentResponse />} />
        <Route path="/subscription-detail" element={<SubscriptionDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermOfService/>} />
        <Route path="*" element={<Navigate to="/page-not-found" />} />
      </Routes>
    </div>
  );
}


function ProfilePageRoute() {
  const { username } = useParams();

  if (!username || username === "undefined") {

    return <Navigate to="/page-not-found" />;
  }
  return <ProfilePage username={username} />;
}

export default App;
