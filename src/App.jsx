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
import AlertBar from "./components/modals/AlertBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { userActions } from "./store/userSlice";
import { auth, db } from "./authentication/firebase";
import AuthLoader from "./components/AuthLoader";
import Upgrade from "./pages/Upgrade";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
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

  const fetchSubscription = async (uid) => {
    const subsRef = collection(db, "customers", uid, "subscriptions");
    const subsQuery = query(
      subsRef,
      where("status", "in", ["trialing", "active", "past_due", "unpaid"])
    );
    try {
      const subscriptionDocs = await getDocs(subsQuery);
      if (subscriptionDocs.docs.length > 0) {
        let endDate;
        let subscription;
        subscriptionDocs.docs?.forEach((doc, index) => {
          console.log("doc", index, doc.data());
          if (!endDate || endDate < doc.data().current_period_end) {
            endDate = doc.data().current_period_end;
            subscription = doc.data();
          }
        });
        console.log("subscriptions", subscription);
        return subscription;
      }
    } catch (e) {
      console.log("error fetching subscription", e);
    }
  };

  const fetchUserInfo = async (uid) => {
    try {
      const userInfo = await getDoc(doc(db, "userInfo", uid));
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
        onAuthStateChanged(auth, async (user) => {
          console.log("user", user?.uid);
          user && setUserInfo(user);
        });
      }
    } catch (error) {
      console.error("Error while redirecting Google URL", error);
    } finally {
      setRedirectLoading(false);
    }
  }

  return redirectLoading ? <AuthLoader /> : (
    <div className="App">
      <AlertBar alertStates={alert} />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/select-area" element={<Map />} />
        <Route path="/find-mowers" element={<FindMowers />} />
        <Route path="/consent-response" element={<ConsentResponse />} />
        <Route path="/profile-page/:username" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/payment-successful" element={<PaymentResponse />} />
        <Route path="/payment-cancelled" element={<PaymentResponse />} />
        <Route path="/subscription-detail" element={<SubscriptionDetail />} />
      </Routes>
    </div>
  );
}

export default App;
