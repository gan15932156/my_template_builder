import Dashboard from "@/Features/projectEditor/Dashboard";
import { Suspense } from "react";

const ProjectPage = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};

export default ProjectPage;
