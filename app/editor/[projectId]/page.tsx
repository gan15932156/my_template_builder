import Test from "../../components/Test";
const EditorPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;
  return <Test projectId={projectId} />;
};

export default EditorPage;
