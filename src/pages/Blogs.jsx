import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import sanityClient from "../sanityconfig/sanityClient";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { styled } from "styled-components";
import Footer from "../components/Footer";

const BlogCard = styled(Card)`
  margin: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensure full viewport height
`;

const MainContent = styled.div`
  flex: 1; // Allow main content to expand and push footer down
  padding: 20px;
  display: flex;
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  min-height: 75vh;
`;

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    sanityClient
      .fetch(`*[_type == "blog"]{title, description, slug}`)
      .then((data) => {
        setBlogs(data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  return (
    <Container>
      <Navbar />
      <MainContent>
        {loading ? (
          <CircularProgress color="primary" /> // Show loader while loading
        ) : (
          <Grid container spacing={2}>
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.slug.current}>
                <BlogCard>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {blog.description.length > 100
                        ? `${blog.description.substring(0, 100)}...`
                        : blog.description}
                    </Typography>
                    <Link
                      to={`/blog/${blog.slug.current}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button size="small">Read More</button>
                    </Link>
                  </CardContent>
                </BlogCard>
              </Grid>
            ))}
          </Grid>
        )}
      </MainContent>
      <Footer />
    </Container>
  );
}

export default Blogs;
