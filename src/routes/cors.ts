import "dotenv/config";
import Cors from "cors";

export const ssCors = Cors({
  credentials: true,
  methods: "GET,HEAD,POST,OPTIONS",
  origin: process.env.CORS_ORIGIN ?? "https://superdnax.com",
  optionsSuccessStatus: 200,
});

export default ssCors;
