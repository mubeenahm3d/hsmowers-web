import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermOfService() {
  return (
    <>
      <Navbar />
      <Main>
        <div className="content">
          <h4>HighSchoolMowers Terms of Service</h4>
          <p>Effective Date: September 5, 2024</p>

          <h5>1. Introduction</h5>
          <p>
            1.1 Welcome to High School Mowers ("Company", "we", "us", or "our").
            Our website and services are provided subject to the following Terms
            of Service ("Terms").
          </p>

          <h5>2. Acceptance</h5>
          <p>
            2.1 By accessing or using our website or services, you ("User",
            "you", or "your") agree to be bound by these Terms.
          </p>

          <h5>3. Services</h5>
          <p>
            3.1 We provide a platform that connects users with mowing service
            providers, enabling customers to find and book lawn care services in
            their area. The platform includes tools for location-based searches,
            service availability checks, and communication with service
            providers.
          </p>

          <h5>4. User Conduct</h5>
          <p>
            4.1 You agree to: Use our services for lawful purposes only. Not
            post or transmit any harmful, threatening, or harassing content. Not
            infringe on intellectual property rights or privacy rights. Comply
            with applicable laws and regulations.
          </p>

          <h5>5. Intellectual Property</h5>
          <p>
            5.1 All content and materials on our website and services, including
            text, graphics, logos, and software, are owned by us or our
            licensors. Unauthorized use is prohibited.
          </p>

          <h5>6. Termination</h5>
          <p>
            6.1 We reserve the right to terminate or suspend your access to our
            services at any time, without notice, for any reason, including but
            not limited to violation of these Terms.
          </p>

          <h5>7. Limitation of Liability</h5>
          <p>
            7.1 In no event shall we be liable for any damages, including but
            not limited to consequential, incidental, or punitive damages,
            arising from your use of our services.
          </p>

          <h5>8. Governing Law</h5>
          <p>
            8.1 These Terms shall be governed by and construed in accordance
            with the laws of the United States of America.
          </p>

          <h5>9. Changes to Terms</h5>
          <p>
            9.1 We reserve the right to modify these Terms at any time. If
            changes are made, we will update the "Effective Date" and post the
            revised Terms on our website. Continued use of our services
            constitutes acceptance of the updated Terms.
          </p>

          <h5>10. Service Disclaimer</h5>
          <p>
            10.1 High School Mowers acts as a platform connecting users with
            mowing service providers. We do not guarantee the quality,
            availability, or timeliness of services provided by third-party
            providers. By using our services, you acknowledge that any
            agreements or disputes with service providers are independent of us,
            and we are not responsible for any issues arising from these
            interactions.
          </p>

          <h5>11. Contact Us</h5>
          <p>
            11.1 If you have any questions or concerns about these Terms, please
            contact us at admin@highschoolmowers.com. By using our services, you
            acknowledge that you have read, understood, and agree to be bound by
            these Terms.
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
