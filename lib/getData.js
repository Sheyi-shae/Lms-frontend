import axios from "axios";

export async function getData(endpoint) {
  try {
    console.log('your endpoint', endpoint)
    const res = await axios.get(

      `${endpoint}`,
      { withCredentials: true });
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}