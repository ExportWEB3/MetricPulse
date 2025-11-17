import { useState, type ReactNode, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard.hooks";
import { IconUIComponent } from "../../utilities/UI/icon.ui";
import { TextUIComponent, TitleUIComponent } from "../../utilities/UI/texts.ui";

interface DragDropOverlayProps {
  children: ReactNode;
}

export function DragDropOverlay({ children }: DragDropOverlayProps) {
  const { uploadCSV, isLoading } = useDashboard();
  const { mode } = useParams();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const dragCounterRef = useRef(0);

  // Only enable drag and drop in real mode
  if (mode !== "real") {
    return <>{children}</>;
  }

  // Prevent ALL browser drag and drop behavior globally
  useEffect(() => {
    const preventAll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Add listeners at window and document level with capture phase - most aggressive approach
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventType) => {
      window.addEventListener(eventType, preventAll, true);
      document.addEventListener(eventType, preventAll, true);
      if (document.body) {
        document.body.addEventListener(eventType, preventAll, true);
      }
    });

    return () => {
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventType) => {
        window.removeEventListener(eventType, preventAll, true);
        document.removeEventListener(eventType, preventAll, true);
        if (document.body) {
          document.body.removeEventListener(eventType, preventAll, true);
        }
      });
    };
  }, []);

  // Set up native drag listeners on container ref
  useEffect(() => {
    if (!containerRef.current) return;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current++;
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "copy";
      }
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current--;
      if (dragCounterRef.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "copy";
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragging(false);

      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type === "text/csv" || file.name.endsWith(".csv")) {
          setSelectedFile(file);
          // Read first few lines for preview
          const reader = new FileReader();
          reader.onload = (event) => {
            const content = event.target?.result as string;
            const lines = content.split("\n").slice(0, 3).join("\n");
            setFilePreview(lines);
          };
          reader.readAsText(file);
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener("dragenter", handleDragEnter as EventListener, false);
    container.addEventListener("dragleave", handleDragLeave as EventListener, false);
    container.addEventListener("dragover", handleDragOver as EventListener, false);
    container.addEventListener("drop", handleDrop as EventListener, false);

    return () => {
      container.removeEventListener("dragenter", handleDragEnter as EventListener);
      container.removeEventListener("dragleave", handleDragLeave as EventListener);
      container.removeEventListener("dragover", handleDragOver as EventListener);
      container.removeEventListener("drop", handleDrop as EventListener);
    };
  }, []);

  const handleConfirmUpload = () => {
    if (selectedFile) {
      uploadCSV(selectedFile);
      setSelectedFile(null);
      setFilePreview("");
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setFilePreview("");
    dragCounterRef.current = 0;
    setIsDragging(false);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {children}

      {/* Full-screen drag overlay - shown while dragging */}
      {isDragging && !selectedFile && !isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white rounded-2xl shadow-2xl p-12 flex flex-col items-center gap-4 max-w-sm">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-blue-600 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Drop your CSV file</h3>
            <p className="text-sm text-gray-600 text-center">
              Release to upload your metrics data
            </p>
          </div>
        </div>
      )}

      {/* Confirmation modal - shown after file is dropped */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 to-blue-700 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <IconUIComponent icon="ri-file-csv-line" className="text-2xl text-blue-600" />
                </div>
                <div>
                  <TitleUIComponent
                    type="h5"
                    text="Confirm Upload"
                    className="text-white!"
                  />
                  <TextUIComponent
                    type="p"
                    text="Ready to import your data"
                    className="text-blue-100 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* File Info */}
              <div className="space-y-2">
                <TextUIComponent
                  type="p"
                  text="File Details"
                  className="font-semibold text-gray-700"
                />
                <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-gray-900">{selectedFile.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium text-gray-900">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                </div>
              </div>

              {/* Preview */}
              {filePreview && (
                <div className="space-y-2">
                  <TextUIComponent
                    type="p"
                    text="Preview"
                    className="font-semibold text-gray-700"
                  />
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-gray-300 max-h-32 overflow-y-auto">
                    {filePreview}
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <TextUIComponent
                  type="p"
                  text="Your metrics data will be processed and uploaded to the server."
                  className="text-xs text-blue-700"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 p-4 flex gap-3">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <IconUIComponent icon="ri-loader-4-line" className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <IconUIComponent icon="ri-upload-cloud-2-line" />
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
