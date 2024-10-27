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
import { collection, getDocs, query, where } from "firebase/firestore";
import PaymentResponse from "./pages/PaymentResponse";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import GetStarted from "./pages/GetStarted";
import LandingPage from "./pages/LandingPage";
import ProfileSetup from "./pages/ProfileSetup";

function App() {
  const [redirectLoading, setRedirectLoading] = useState(true);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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

  async function redirectURLHandler() {
    try {
      const result = await getRedirectResult(auth);
      console.log("redirect result", result);
      if (result?.user) {
        const subscription = fetchSubscription(result.user.uid);
        dispatch(userActions.setCurrentUser({ ...result.user, subscription }));
        let { from } = location.state || { from: { pathname: "/" } };
        navigate(from);
      } else {
        onAuthStateChanged(auth, async (user) => {
          console.log("user", user);
          if (user) {
            const subscription = await fetchSubscription(user.uid);
            dispatch(userActions.setCurrentUser({ ...user, subscription }));
          }
        });
      }
    } catch (error) {
      console.error("error while redirecting google url", error);
    } finally {
      setRedirectLoading(false);
    }
  }

  return (
    <div className="App">
      <AlertBar alertStates={alert} />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<LandingPage/> } />
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
