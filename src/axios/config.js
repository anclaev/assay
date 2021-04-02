import axios from "axios";
export default axios.create({
  baseURL: "https://ancla-assay-default-rtdb.firebaseio.com/quizes",
});
