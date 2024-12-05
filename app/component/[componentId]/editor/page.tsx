import Editor from "@/Features/componentEditor/Editor";

const Page = async ({
  params,
}: {
  params: Promise<{ componentId: string }>;
}) => {
  const componentId = (await params).componentId;
  return <Editor id={componentId} />;
};

export default Page;
