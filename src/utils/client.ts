import axios from "axios";

export const client = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export const rtspClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RSTP_SERVER,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
