import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  ScrollRestoration,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./authentication/firebase";
import { userActions } from "./store/userSlice";
import AlertBar from "./components/modals/AlertBar";
import AuthLoader from "./components/AuthLoader";
import firebaseApi from "./utils/firebaseApi";
import { fetchSubscription } from "./utils/fetchSubscription";
import router from "./router";

// App Component
function App() {
  const [redirectLoading, setRedirectLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    redirectURLHandler();
  }, []);

  async function fetchUserInfo(uid) {
    try {
      const userInfo = await getDoc(doc(db, "userInfo", uid));
      return userInfo.data();
    } catch (e) {
      console.error("Error fetching user info:", e);
    }
  }

  async function setUserInfo(currentUser) {
    const subscription = await fetchSubscription(currentUser.uid);
    const userInfo = await fetchUserInfo(currentUser.uid);
    const localUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo && localUserInfo) {
      const newUserInfo = {
        uid: currentUser.uid,
        email: currentUser.email,
        createdAt: serverTimestamp(),
        ...localUserInfo,
      };
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

      if (result?.user) {
        setUserInfo(result.user);
      } else {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserInfo(user);
          }
        });
      }
    } catch (error) {
      console.error("Error handling redirect:", error);
    } finally {
      setRedirectLoading(false);
    }
  }

  if (redirectLoading) {
    return <AuthLoader />;
  }

  return <RouterProvider router={router} />;
}






export default App;
