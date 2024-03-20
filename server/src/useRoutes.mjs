import { router as findingRoutes } from "../routes/finding.mjs";
import { router as questionRoutes } from "../routes/question.mjs";
import { router as authRoutes } from "../routes/auth.mjs";

export function useRoutes(app) {
  app.use(findingRoutes);
  app.use(questionRoutes);
  app.use(authRoutes);
}
