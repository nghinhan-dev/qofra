import { findingRoutes } from "../routes/finding.mjs";
import { questionRoutes } from "../routes/question.mjs";
import { authRoutes } from "../routes/auth.mjs";

export function useRoutes(app) {
  app.use("/auth", authRoutes);
  app.use("/question", questionRoutes);
  app.use("/finding", findingRoutes);
}
