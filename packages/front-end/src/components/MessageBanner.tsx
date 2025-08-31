import React from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

interface Props {
  type: "success" | "error" | "";
  text: string;
  onClose: () => void;
}

export const MessageBanner: React.FC<Props> = ({ type, text, onClose }) => {
  if (!text) return null;

  const isSuccess = type === "success";

  return (
    <div
      className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
        isSuccess
          ? "bg-green-50 text-green-800 border border-green-200"
          : "bg-red-50 text-red-800 border border-red-200"
      }`}
    >
      {isSuccess ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      <span>{text}</span>
      <button
        onClick={onClose}
        className="ml-auto text-gray-500 hover:text-gray-700"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
