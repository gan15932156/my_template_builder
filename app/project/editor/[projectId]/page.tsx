import ProjectEditor from "@/Features/projectEditor/ProjectEditor";

const EditorPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;
  return <ProjectEditor projectId={projectId} />;
};

export default EditorPage;
