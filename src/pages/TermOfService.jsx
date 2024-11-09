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
          <h4>BREAK BREAD INC. TERMS OF SERVICE</h4>
          <p>Effective Date: September 5, 2024</p>

          <h5>1. Introduction</h5>
          <p>
            1.1 Welcome to Break Bread Inc. ("Company", "we", "us", or "our").
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
            3.1 We provide a platform for recipe suggestion and meal planning
            where users can search recipes and add to their meal plan with a
            built-in calendar and shop the ingredients. It also has ai recipe
            generation, nutrition stats and more.
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
            5.1 All content and materials on our website are owned by us or our
            licensors.
          </p>

          <h5>6. Termination</h5>
          <p>
            6.1 We may terminate or suspend your access to our services at any
            time, without notice, for any reason.
          </p>

          <h5>7. Limitation of Liability</h5>
          <p>
            7.1 In no event shall we be liable for any damages, including
            consequential, incidental, or punitive damages.
          </p>

          <h5>8. Governing Law</h5>
          <p>
            8.1 These Terms shall be governed by and construed in accordance
            with the laws of United States of America.
          </p>

          <h5>9. Changes to Terms</h5>
          <p>
            9.1 We reserve the right to modify these Terms at any time, without
            notice.
          </p>

          <h5>10. Nutrition Information Disclaimer</h5>
          <p>
            10.1 The recipes, meal planning, and nutritional tracking features
            provided by our application are intended for informational and
            educational purposes only. While we strive to offer accurate and
            up-to-date information, we are not licensed nutritionists,
            dietitians, or healthcare professionals. The nutritional content of
            recipes is based on available data and may not be completely
            accurate or applicable to individual dietary needs. This app should
            not be considered a substitute for professional medical or
            nutritional advice. Users are encouraged to consult with a doctor,
            dietitian, or other qualified health professional before making any
            changes to their diet or relying on the information provided by this
            application. By using this app, you agree that we are not
            responsible or liable for any inaccuracies, omissions, or
            health-related consequences that may arise.
          </p>

          <h5>11. Contact Us</h5>
          <p>
            11.1 If you have any questions or concerns, please contact us at
            steven@familyfoodandhealth.com By using our services, you
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
