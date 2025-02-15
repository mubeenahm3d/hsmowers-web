import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upgrade from "./pages/Upgrade";
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
import ContactUs from "./pages/ContactUs";
import RootLayout from "./RootLayout";
import { createBrowserRouter, Navigate } from "react-router";
import ScrollToTop from "./components/ScrollToTop";

// Create the Router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <RootLayout />
      </>
    ),
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/about", element: <About /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/select-area", element: <Map /> },
      { path: "/page-not-found", element: <Page404 /> },
      { path: "/find-mowers", element: <FindMowers /> },
      { path: "/consent-response", element: <ConsentResponse /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/get-started", element: <GetStarted /> },
      { path: "/profile-setup", element: <ProfileSetup /> },
      { path: "/upgrade", element: <Upgrade /> },
      { path: "/blog", element: <Blogs /> },
      { path: "/blog/:slug", element: <BlogDetail /> },
      { path: "/payment-successful", element: <PaymentResponse /> },
      { path: "/payment-cancelled", element: <PaymentResponse /> },
      { path: "/subscription-detail", element: <SubscriptionDetail /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-of-service", element: <TermOfService /> },
      { path: "/p/:username", element: <ProfilePage /> },
      { path: "*", element: <Navigate to="/page-not-found" replace /> },
    ],
  },
]);

export default router;
