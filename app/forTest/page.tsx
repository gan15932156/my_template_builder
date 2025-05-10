import { promises as fs } from "fs";
const Page = async () => {
  const file = await fs.readFile(
    process.cwd() + "/app/data/style-properties.json",
    "utf8"
  );
  const data = JSON.parse(file);
  console.log(data);
  return <div>Page</div>;
};

export default Page;
