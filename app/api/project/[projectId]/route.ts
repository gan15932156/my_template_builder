import db from "@/config/prisma";

const MOCK_PROJECT_DATA = {
  assets: [
    {
      type: "image",
      src: "https://plus.unsplash.com/premium_vector-1682306815902-77894d1fd5c1?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      unitDim: "px",
      height: 0,
      width: 0,
    },
  ],
  styles: [
    {
      selectors: [{ name: "gjs-row", private: 1 }],
      style: {
        display: "table",
        "padding-top": "10px",
        "padding-right": "10px",
        "padding-bottom": "10px",
        "padding-left": "10px",
        width: "100%",
      },
    },
    {
      selectors: [{ name: "gjs-cell", private: 1 }],
      style: { width: "100%", display: "block" },
      mediaText: "(max-width: 768px)",
      atRuleType: "media",
    },
    {
      selectors: ["gjs-cell30"],
      style: { width: "100%", display: "block" },
      mediaText: "(max-width: 768px)",
      atRuleType: "media",
    },
    {
      selectors: ["gjs-cell70"],
      style: { width: "100%", display: "block" },
      mediaText: "(max-width: 768px)",
      atRuleType: "media",
    },
    {
      selectors: [{ name: "gjs-cell", private: 1 }],
      style: { width: "8%", display: "table-cell", height: "75px" },
    },
    { selectors: ["#ikjl"], style: { padding: "10px" } },
    { selectors: ["#if2yh"], style: { color: "black" } },
  ],
  pages: [
    {
      frames: [
        {
          component: {
            type: "wrapper",
            stylable: [
              "background",
              "background-color",
              "background-image",
              "background-repeat",
              "background-attachment",
              "background-position",
              "background-size",
            ],
            components: [
              {
                name: "Row",
                droppable: ".gjs-cell",
                resizable: {
                  tl: 0,
                  tc: 0,
                  tr: 0,
                  cl: 0,
                  cr: 0,
                  bl: 0,
                  br: 0,
                  minDim: 1,
                },
                classes: [{ name: "gjs-row", private: 1 }],
                attributes: { id: "iesh" },
                components: [
                  {
                    name: "Cell",
                    draggable: ".gjs-row",
                    resizable: {
                      tl: 0,
                      tc: 0,
                      tr: 0,
                      cl: 0,
                      cr: 1,
                      bl: 0,
                      br: 0,
                      minDim: 1,
                      bc: 0,
                      currentUnit: 1,
                      step: 0.2,
                    },
                    classes: [{ name: "gjs-cell", private: 1 }],
                    components: [
                      {
                        type: "image",
                        resizable: { ratioDefault: 1 },
                        attributes: {
                          id: "if2yh",
                          src: "https://plus.unsplash.com/premium_vector-1682306815902-77894d1fd5c1?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                type: "text",
                attributes: { id: "ikjl" },
                components: [
                  { type: "textnode", content: "Insert your text here" },
                ],
              },
            ],
            head: { type: "head" },
            docEl: { tagName: "html" },
          },
          id: "KK1l3P6IrfSJ6wsF",
        },
      ],
      type: "main",
      id: "8yiK9MRbxFuAnrcf",
    },
  ],
  symbols: [],
  dataSources: [],
};
export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  if (!(await params).projectId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Fail to load project",
      },
      { status: 404 }
    );
  }
  return Response.json(
    {
      success: true,
      data: MOCK_PROJECT_DATA,
      message: "Success",
    },
    { status: 200 }
  );
}
export async function POST(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  if (!(await params).projectId) {
    return Response.json(
      {
        success: false,
        message: "Fail to save project",
      },
      { status: 404 }
    );
  }
  const body = await request.json();
  // จะสร้าง project โดยใช้ projectId อย่างงั้นหรือ ????? 5555 บ้าหรือเปล่า
  const upsertedProject = await db.project.upsert({
    where: {
      id: (await params).projectId,
    },
    update: {
      data: body,
    },
    create: {
      data: body,
    },
  });

  return Response.json(
    {
      success: true,
      message: "Success",
      data: upsertedProject,
    },
    { status: 200 }
  );
}
