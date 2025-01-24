import EditorPage from "@/Features/blueprint/components/editorPage";

const Page = async ({
  params,
}: {
  params: Promise<{ blueprintId: string }>;
}) => {
  const blueprintId = (await params).blueprintId;
  return <EditorPage blueprintId={blueprintId} />;
};

export default Page;
