import axios from "axios";

const firebaseApi = axios.create({
  // Dev
  // baseURL: "https://us-central1-break-bread-web-app.cloudfunctions.net",
  // PROD
  //   baseURL: "https://us-central1-break-bread-prod.cloudfunctions.net",
  baseURL:
    "http://localhost:5001/hs-mowers-cb290/us-central1",
  // EMULATOR DEV
  // baseURL: "http://127.0.0.1:5001/break-bread-web-app/us-central1"
  // EMULATOR PROD
  // baseURL: "http://127.0.0.1:5001/break-bread-prod/us-central1",
});

export default firebaseApi;
