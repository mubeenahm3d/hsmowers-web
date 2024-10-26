import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../store/userSlice";
// import AuthLoader from "./AuthLoader";
import { auth, db } from "./firebase";
import { Navigate } from "react-router";
import AuthLoader from "../components/AuthLoader";
import { userActions } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";

let emailVerified = false;
function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        emailVerified = true;
        console.log("user", user);

        // Fetch user document from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        console.log("user doc", userDoc.data());
        const { username, supportUrl, followers } = userDoc.data();
        // Dispatch user info to Redux
        dispatch(
          userActions.setCurrentUser({
            displayName: user.displayName,
            username,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            supportUrl,
            followers
          })
        );
      } else {
        emailVerified = false;
      }

      // Once auth check is done, stop the loading
      setLoading(false);
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, [dispatch]);

  // console.log("email verified", emailVerified, loading)
  if (loading) {
    return <AuthLoader />;
  } else {
    if (!emailVerified) {
      return <Navigate to="/login" />;
    }
    return children;
  }
}

export default PrivateRoute;
