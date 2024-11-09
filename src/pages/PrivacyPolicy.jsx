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
          <h4>Privacy Policy for BREAK BREAD INC</h4>

          <h5>Introduction</h5>
          <p>
            BREAK BREAD INC ("we," "us," or "our") is committed to protecting
            your privacy. This Privacy Policy explains how we collect, use, and
            disclose information about you when you use our website, mobile
            applications, or other services (collectively, the "Services").
          </p>

          <h5>Information We Collect</h5>
          <p>
            We may collect the following types of information from you: Personal
            Information: This includes information that can be used to identify
            you, such as your name, email address, phone number, and postal
            address. Usage Data: This includes information about how you
            interact with our Services, such as the pages you visit, the
            features you use, and the time you spend on our website. Device
            Information: This includes information about your device, such as
            your IP address, browser type, and operating system.
          </p>

          <h5>How We Collect Information</h5>
          <p>
            We collect information from you in the following ways: When you
            provide it: We collect information from you when you create an
            account, contact us, or use our Services. Automatically: We may
            automatically collect information about you when you use our
            Services, such as through cookies, web beacons, and similar
            technologies.
          </p>

          <h5>How We Use Your Information</h5>
          <p>
            We may use your information for the following purposes: To provide
            you with the Services. To personalize your experience on our
            Services. To communicate with you about our Services. To analyze and
            improve our Services. To comply with legal requirements.
          </p>

          <h5>Disclosure of Your Information</h5>
          <p>
            We may disclose your information to: Our service providers, who help
            us provide our Services. Our business partners, who may offer
            complementary products or services. Legal authorities, if required
            by law.
          </p>

          <h5>Your Rights</h5>
          <p>
            You may have certain rights regarding your personal information,
            such as the right to access, correct, or delete your information. If
            you have any questions about your rights, please contact us.
          </p>

          <h5>Cookies and Tracking Technologies</h5>
          <p>
            We use cookies and similar tracking technologies to collect
            information about you and your interactions with our Services. You
            can manage your cookie preferences through your browser settings.
          </p>

          <h5>Security</h5>
          <p>
            We take reasonable measures to protect your personal information
            from unauthorized access, use, or disclosure. However, no method of
            transmission over the internet or electronic storage is completely
            secure.
          </p>

          <h5>Changes to This Privacy Policy</h5>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting a notice on our website.
          </p>

          <h5>Contact Us</h5>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at steven@familyfoodandhealth.com.
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
