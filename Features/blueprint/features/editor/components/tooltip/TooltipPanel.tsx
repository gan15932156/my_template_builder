"use client";
const TooltipPanel = () => {
  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log("click");
        }}
      >
        Click
      </button>
    </div>
  );
};

export default TooltipPanel;
