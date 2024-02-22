import React from "react";

const Alert = ({ id, timestamp, description, onClick }) => {
  return (
    <div
      className="p-4 bg-yellow-200 border-l-4 border-yellow-500 mb-4 cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">Alert at {timestamp}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 fill-current text-yellow-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 112 0v5a1 1 0 11-2 0V5zm1 10a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="text-sm">{description}</div>
    </div>
  );
};

export default Alert;
