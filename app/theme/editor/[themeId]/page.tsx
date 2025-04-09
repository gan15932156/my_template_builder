import Editor from "@/Features/theme/components/Editor";

const EditorPage = async ({
  params,
}: {
  params: Promise<{ themeId: string }>;
}) => {
  const themeId = (await params).themeId;
  return <Editor themeId={themeId} />;
};

export default EditorPage;
