import { router as findingRoutes } from "../routes/finding.mjs";
import { router as questionRoutes } from "../routes/question.mjs";

export function useRoutes(app) {
  app.use(findingRoutes);
  app.use(questionRoutes);
}
