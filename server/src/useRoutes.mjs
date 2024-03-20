import { findingRoutes } from "../routes/finding.mjs";
import { questionRoutes } from "../routes/question.mjs";
import { authRoutes } from "../routes/auth.mjs";

export function useRoutes(app) {
  app.use(authRoutes);
  app.use(questionRoutes);
  app.use(findingRoutes);
}
