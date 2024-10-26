import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "uf4wsnk6", // Your actual Sanity project ID
  dataset: "production", // Your dataset name
  useCdn: true, // Set to false if you need the freshest data
  apiVersion: "2023-10-01", // Use the latest API version
});
