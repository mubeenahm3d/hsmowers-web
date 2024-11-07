import React from 'react'
import styled from "styled-components";
import Img1 from '../assets/people.jpg'
import Img2 from '../assets/customer.jpg'
import Img3 from '../assets/win.jpg'
import Img4 from "../assets/hire.jpg";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>
      <Navbar/>

      <AboutContainer>
        <h2>About Us</h2>

        <div className="info-container">
          <div className="content-container">
            <h3>
              <span>Empowering</span> Local Youth,<br/> <span>Serving</span> the
              Community
            </h3>
            <p>
              Our mission is simple: to connect local high school students with
              neighbors who need their lawns mowed. We believe in the power of
              community and the importance of teaching young people
              responsibility while providing a convenient service for
              homeowners. By hiring a local student, you're not just getting a
              fresh-cut lawn; you're supporting the next generation and keeping
              resources within your neighborhood.
            </p>
          </div>

          <div className="image-container">
            <img src={Img1} alt="" />
          </div>
        </div>

        <div className="info-container">
          <div className="content-container">
            <h3>
              Find, Filter, and <span>Hire with Ease</span>{" "}
            </h3>
            <p>
              Our platform allows you to quickly and easily browse through a
              list of high school students ready to help you with lawn care.
              There is no cost or sign-up required to view available helpers.
              You can filter by availability, proximity, and even ratings from
              previous jobs, ensuring you find the right fit. Once you’ve found
              the ideal helper, simply reach out to them directly through our
              platform to schedule a time that works for you.
            </p>
          </div>

          <div className="image-container">
            <img src={Img4} alt="" />
          </div>
        </div>

        <div className="info-container">
          <div className="content-container">
            <h3>
              Convenient, <span>Reliable,</span> and Local
            </h3>
            <p>
              We understand that finding reliable help can be a hassle, and
              that's why we’ve created a curated list of local students who are
              eager to work and learn. Every student on our platform is
              committed to providing great service, and we make it easy to
              connect. With no cost or barriers to viewing helpers, transparent
              pricing, and a focus on supporting local youth, we’re the trusted
              choice for lawn care in your neighborhood.
            </p>
          </div>

          <div className="image-container">
            <img src={Img2} alt="" />
          </div>
        </div>

        <div className="info-container">
          <div className="content-container">
            <h3>
              A <span>Win-Win</span> for Everyone
            </h3>
            <p>
              For the students, mowing lawns isn’t just about making money—it’s
              about learning responsibility, building a work ethic, and
              contributing to the community. For homeowners, it’s about getting
              a reliable service from motivated helpers who are part of the
              neighborhood. We’re proud to foster these connections and create a
              win-win situation for everyone involved.
            </p>
          </div>

          <div className="image-container">
            <img src={Img3} alt="" />
          </div>
        </div>
      </AboutContainer>

      <Footer />
    </>
  );
}

const AboutContainer = styled.div`
  min-height: var(--section-height);
  width: var(--section-width);
  margin: var(--section-margin) auto;
  h2 {
    text-align: center;
    margin-bottom: var(--heading-margin);
  }

  .info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: var(--section-margin);

    .content-container {
      h3 {
        text-align: center;
        font-weight: 600;
        span {
          color: var(--primary-color);
          font-size: var(--m-heading);
        }
      }
      p {
        text-align: center;
        /* max-width: 47ch; */
      }
    }

    .image-container {
      img {
        width: 100%;
        height: auto;
        max-width: 500px;
        border-radius: var(--l-radius);
      }
    }
  }

  //For Tablet

  @media (min-width: 600px) {
    .info-container {
      flex-wrap: nowrap;
      &:nth-child(odd) {
        flex-direction: row-reverse;
      }
      .content-container {
        h3 {
          text-align: start;
        }
        p {
          text-align: start;
          max-width: 50ch;
        }
      }
    }
  }

  //For Laptop

  @media (min-width: 1024px) {
    .info-container {
      flex-wrap: nowrap;
      &:nth-child(odd) {
        flex-direction: row-reverse;
      }
      .content-container {
        h3 {
          text-align: start;
        }
        p {
          text-align: start;
          max-width: 50ch;
        }
      }
    }
  }
`;
