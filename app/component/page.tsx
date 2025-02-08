import Dashboard from "@/Features/componentEditor/Dashboard";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};

export default Page;
