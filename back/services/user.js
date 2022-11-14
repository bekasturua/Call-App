import axios from "axios";

export async function getUsers() {
  const res = await axios.get(process.env.FIREBASE_URL + "users.json");
  return res.data;
}
