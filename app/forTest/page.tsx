"use client";
// https://blog.logrocket.com/export-react-components-as-images-html2canvas/
// https://codesandbox.io/p/sandbox/html2canvas-ts-2s21e?file=%2Fsrc%2FApp.tsx%3A379%2C29
// https://stackblitz.com/edit/react-dn9lr7?file=src%2Futils%2FexportAsImage.js,src%2FApp.js
// https://dev.to/lico/react-download-html-element-as-an-image-file-53ok
const Page = () => {
  return (
    <div>
      <div
        style={{
          padding: "20px",
          backgroundColor: "lightblue",
          textAlign: "center",
        }}
      >
        <h1>Capture this Element</h1>
        <p>This content will be captured as an image.</p>
        <img src="https://placehold.co/600x400" alt="Image" />
      </div>
    </div>
  );
};

export default Page;
