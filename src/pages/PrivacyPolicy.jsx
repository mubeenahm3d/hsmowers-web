import React from 'react'
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <Main>
        <div className="content">
          <h4>Privacy Policy for HighSchoolMowers</h4>

          <h5>Introduction</h5>
          <p>
            High School Mowers ("we," "us," or "our") is committed to protecting
            your privacy. This Privacy Policy explains how we collect, use, and
            disclose information about you when you use our website, mobile
            applications, or other services (collectively, the "Services").
          </p>

          <h5>Information We Collect</h5>
          <p>
            We may collect the following types of information from you: Personal
            Information: This includes information that can be used to identify
            you, such as your name, email address, phone number, postal address,
            and any other details you provide when creating an account or
            interacting with our Services. Usage Data: This includes information
            about how you interact with our Services, such as the pages you
            visit, the features you use, and the time you spend on our platform.
            Device Information: This includes details about your device, such as
            your IP address, browser type, operating system, and other technical
            information.
          </p>

          <h5>How We Collect Information</h5>
          <p>
            We collect information from you in the following ways: When You
            Provide It: We collect information directly from you when you sign
            up, contact us, book services, or otherwise use our Services.
            Automatically: We may automatically collect certain information when
            you interact with our Services through technologies like cookies,
            web beacons, and similar tracking mechanisms.
          </p>

          <h5>How We Use Your Information</h5>
          <p>
            We may use your information for the following purposes: To provide
            and manage the Services, including connecting users with mowing
            service providers. To personalize your experience and enhance our
            Services. To communicate with you about updates, offers, or other
            information related to our Services. To monitor and analyze usage
            trends to improve our platform. To comply with legal and regulatory
            obligations.
          </p>

          <h5>Disclosure of Your Information</h5>
          <p>
            We may share your information in the following ways: To help us
            operate, improve, and provide our Services. To offer complementary
            services or products that may interest you. If required to comply
            with applicable laws or respond to valid legal requests.
          </p>

          <h5>Your Rights</h5>
          <p>
            Depending on your jurisdiction, you may have rights regarding your
            personal information, such as: The right to access, update, or
            delete your information. The right to restrict or object to certain
            data processing activities.
          </p>

          <h5>Cookies and Tracking Technologies</h5>
          <p>
            We use cookies and similar technologies to collect information about
            your usage patterns on our platform. You can control your cookie
            preferences through your browser settings.
          </p>

          <h5>Security</h5>
          <p>
            We take reasonable measures to protect your information against
            unauthorized access, misuse, or disclosure. However, no method of
            data transmission or storage can be guaranteed as 100% secure.
          </p>

          <h5>Changes to This Privacy Policy</h5>
          <p>
            We may modify this Privacy Policy from time to time. If we make
            material changes, we will notify you by updating this page or
            providing additional notice via our Services.
          </p>

          <h5>Contact Us</h5>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at admin@highschoolmowers.com.
          </p>
        </div>
      </Main>
      <Footer />
    </>
  );
}

const Main = styled.div`
  max-width: 800px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: var(--s-radius);
  margin: var(--section-margin) auto;
  min-height: var(--section-height);

  .content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    flex-direction: column;
    padding: 20px;
    h4 {
      font-weight: bold;
    }
    h5 {
      font-weight: 600;
    }
    p {
      color: var(--text-light-color);
    }
  }
`;
