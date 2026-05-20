import { Router } from "express";

//import user from './api/user.js';

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "API is UP",
  });
});

// router.use('/user', user);

export default router;
