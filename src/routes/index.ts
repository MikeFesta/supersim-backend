import { Router } from "express";
import Cors from "#root/routes/cors.js";
import api from "#root/routes/api.js";

const router = Router();

router.use(Cors);

router.use("/api/v1", api);

export default router;
