// src/pages/BlogDetail.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import sanityClient from "../sanityconfig/sanityClient";
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { styled } from "styled-components";
import Footer from "../components/Footer";

const BlogContent = styled(CardContent)`
  padding: 20px;
`;

const BlogCard = styled(Card)`
  margin: 20px 10%;
  flex: 1; // Ensure the card can grow to fill space
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensure full viewport height
`;

const MainContent = styled.div`
  flex: 1; // Allow main content to expand and push footer down
  display: flex;
  flex-direction: column;
  justify-content: center; // Center content vertically
  align-items: center; // Center content horizontally
  min-height: 75vh;
`;

function BlogDetail() {
  const { slug } = useParams(); // Get the blog slug from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "blog" && slug.current == $slug]{
          title, description, body
        }`,
        { slug }
      ) // Use the slug in the query
      .then((data) => {
        if (data.length > 0) {
          console.log("data", data)
          setBlog(data[0]);
        }
      })
      .catch(console.error);
  }, [slug]);

  if (!blog)
    return (
      <Container>
        <Navbar />
        <MainContent>
          <CircularProgress color="primary" />
        </MainContent>
        <Footer />
      </Container>
    ); // Loading state with CircularProgress

  return (
    <Container>
      <Navbar />
      <MainContent>
        <BlogCard>
          <BlogContent>
            <Typography variant="h4" gutterBottom>
              {blog.title}
            </Typography>
            <p variant="body1" dangerouslySetInnerHTML={{__html: blog.description}}>
              {/* {blog.description} */}
            </p>
            <Typography variant="body2" color="textSecondary">
              {blog.body}
            </Typography>
          </BlogContent>
        </BlogCard>
      </MainContent>
      <Footer />
    </Container>
  );
}

export default BlogDetail;
