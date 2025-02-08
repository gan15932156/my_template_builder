import Dashbaord from "@/Features/blueprint/features/dashboard/components/Dashbaord";
import { Suspense } from "react";
const Page = () => {
  return (
    <Suspense>
      <Dashbaord />;
    </Suspense>
  );
};

export default Page;
