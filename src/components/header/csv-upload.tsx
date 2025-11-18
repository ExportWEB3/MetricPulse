import { useRef, useState } from "react";
import { useDashboard } from "../hooks/useDashboard.hooks";
import { IconUIComponent } from "../../utilities/UI/icon.ui";
import { TextUIComponent } from "../../utilities/UI/texts.ui";

export function CSVUploadButton() {
  const { uploadCSV, isLoading } = useDashboard();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      uploadCSV(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      handleFileSelect(file);
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative transition-all duration-200 ${
        isDragging ? "scale-105" : "scale-100"
      }`}
    >
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`flex items-center gap-2 w-30 h-8 md:w-40 md:h-10 justify-center rounded-lg transition-all duration-200 ${
          isDragging
            ? "bg-blue-500 text-white! shadow-lg"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
        } disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        <IconUIComponent
          icon={isLoading ? "ri-loader-4-line" : "ri-upload-cloud-2-line"}
          className={`text-lg text-white! ${isLoading ? "animate-spin" : ""}`}
        />
        <TextUIComponent 
        text={isLoading ? "Uploading..." : "Upload CSV"}
        type="h6"
        className="text-white!"
        />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="hidden"
        disabled={isLoading}
      />

      {/* Drag overlay hint */}
      {isDragging && (
        <div className="absolute inset-0 rounded-lg bg-blue-500 bg-opacity-10 border-2 border-dashed border-blue-500 flex items-center justify-center pointer-events-none">
          <div className="text-xs text-blue-600 font-semibold text-center">
            Drop CSV here
          </div>
        </div>
      )}
    </div>
  );
}
