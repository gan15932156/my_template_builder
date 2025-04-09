import Dashboard from "@/Features/theme/components/Dashboard";
import { Suspense } from "react";

const ThemePage = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};

export default ThemePage;
