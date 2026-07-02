import axios from "axios";

const BASE_URL = "https://remotive.com/api/remote-jobs";

export async function fetchJobs() {
  const response = await axios.get(BASE_URL);
  return response.data.jobs;
}