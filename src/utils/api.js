import axios from "axios";

const api = axios.create({
  baseURL:
    "https://clear-slate-api-docker-image-619153853237.us-central1.run.app",
  headers: {
    access_token: "cs-f459ec27-c75e-0f2f-bd71-dc2618a91c0f",  // Replace 'apiKey' with 'access_token'
  },
});

export default api;