import { useRef } from "react";
import { useDashboard } from "../../hooks/useDashboard.hooks";
import { TextUIComponent } from "../../../utilities/UI/texts.ui";
import { IconUIComponent } from "../../../utilities/UI/icon.ui";

interface SidebarComponentProps {
  mode: "demo" | "real";
}

export function SidebarComponent({ mode }: SidebarComponentProps) {
  const { metrics, uploadCSV, isLoading } = useDashboard();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && mode === "real") {
      uploadCSV(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (mode === "real") {
      fileInputRef.current?.click();
    }
  };

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: "ri-dashboard-line",
    },
    {
      id: "revenue",
      label: "Revenue",
      icon: "ri-money-dollar-circle-line",
    },
    {
      id: "users",
      label: "Users",
      icon: "ri-user-line",
    },
    {
      id: "products",
      label: "Products",
      icon: "ri-box-3-line",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "ri-bar-chart-line",
    },
    {
      id: "insights",
      label: "AI Insights",
      icon: "ri-lightbulb-line",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
      {/* Mode Indicator */}
      <div className={`p-3 rounded-lg mb-6 ${
        mode === "demo" ? "bg-blue-50 border border-blue-200" : "bg-green-50 border border-green-200"
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <IconUIComponent
            icon={mode === "demo" ? "ri-sparkling-line" : "ri-database-line"}
            className={`text-lg ${mode === "demo" ? "text-blue-600" : "text-green-600"}`}
          />
          <TextUIComponent
            type="h6"
            text={mode === "demo" ? "Demo Mode" : "Real Mode"}
            className={mode === "demo" ? "text-blue-900" : "text-green-900"}
          />
        </div>
        <TextUIComponent
          type="p"
          text={mode === "demo" ? "No data saved" : "Data synced to server"}
          className="text-xs text-gray-600"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="mb-6">
        <TextUIComponent
          type="p"
          text="Menu"
          className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3"
        />
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition text-sm font-medium">
                <IconUIComponent
                  icon={item.icon}
                  className="text-lg text-gray-500"
                />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* CSV Upload for Real Mode */}
      {mode === "real" && (
        <div className="mb-6 pb-6 border-t border-gray-200 pt-6">
          <TextUIComponent
            type="p"
            text="Import Data"
            className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3"
          />
          <button
            onClick={triggerFileInput}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition font-medium text-sm"
          >
            <IconUIComponent icon="ri-upload-cloud-2-line" className="text-lg" />
            <span>{isLoading ? "Uploading..." : "Upload CSV"}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="hidden"
            disabled={isLoading}
          />
          <TextUIComponent
            type="p"
            text="Upload a CSV file to update your metrics"
            className="text-xs text-gray-500 mt-2"
          />
        </div>
      )}

      {/* Data Info */}
      {metrics && (
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <TextUIComponent
            type="p"
            text="Data Period"
            className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2"
          />
          <TextUIComponent
            type="p"
            text={`${new Date(metrics.timePeriod.startDate).toLocaleDateString()} - ${new Date(metrics.timePeriod.endDate).toLocaleDateString()}`}
            className="text-sm text-gray-700 font-medium"
          />
          <TextUIComponent
            type="p"
            text={`Type: ${metrics.timePeriod.type}`}
            className="text-xs text-gray-600 mt-1 capitalize"
          />
        </div>
      )}

      {/* Demo Mode Info */}
      {mode === "demo" && (
        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <TextUIComponent
            type="p"
            text="Demo Tip"
            className="text-xs font-semibold text-yellow-900 mb-1"
          />
          <TextUIComponent
            type="p"
            text="This is sample data. Refresh the page to see new data. Sign up to save your metrics."
            className="text-xs text-yellow-800"
          />
        </div>
      )}
    </div>
  );
}