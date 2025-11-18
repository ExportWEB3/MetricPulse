import { useState } from "react";
import { ButtonUIComponent } from "../../../utilities/UI/button.ui";
import { useHttpFetcher } from "../../hooks/custom.hooks";
import { useContext } from "react";
import { DashboardContext } from "../../../contexts/dashboard/dashboard.context";
import { TextUIComponent } from "../../../utilities/UI/texts.ui";

export function DeleteMetricsButton() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { fetchIt } = useHttpFetcher();
  const { dashboardDispatch } = useContext(DashboardContext);

  const handleDeleteMetrics = async () => {
    try {
      setIsDeleting(true);
      setShowConfirm(false);

      await fetchIt({
        apiEndPoint: "del/metrics",
        httpMethod: "delete",
        reqData: {},
        isSuccessNotification: {
          notificationState: true,
          notificationText: "All metrics deleted successfully!"
        },
        buttonLoadingSetter: setIsDeleting,
      });

      // Clear metrics from dashboard state
      dashboardDispatch({ 
        type: "SET_METRICS", 
        payload: null
      });

      dashboardDispatch({ 
        type: "SET_INSIGHTS", 
        payload: null
      });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to delete metrics";
      
      dashboardDispatch({
        type: "SET_ERROR",
        payload: errorMessage,
      });
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="w-full space-y-2!">
      {showConfirm && (
        <div className="w-full bg-red-500/20 border border-red-500/50 rounded-lg p-3! space-y-2!">
          <TextUIComponent 
          type="h6"
          text="Are you sure? This will permanently delete all your metrics."
          className="text-red-500!"
          />
          <div className="flex gap-2! justify-end">
            <ButtonUIComponent
              type="button"
              text="Cancel"
              onClick={() => setShowConfirm(false)}
              isDisable={isDeleting}
              className="bg-gray-600 hover:bg-gray-700 text-white text-xs font-medium w-30 h-10 rounded transition"
            />
            <ButtonUIComponent
              type="button"
              text={isDeleting ? "Deleting..." : "Confirm Delete"}
              onClick={handleDeleteMetrics}
              isDisable={isDeleting}
              className={`${
                isDeleting
                  ? "bg-red-700 cursor-not-allowed opacity-75"
                  : "bg-red-600 hover:bg-red-700"
              } text-white w-30 h-10 sm:w-40 rounded transition`}
            />
          </div>
        </div>
      )}

      <ButtonUIComponent
        type="button"
        text={isDeleting ? "Deleting..." : "Delete All Metrics"}
        onClick={() => setShowConfirm(true)}
        isDisable={isDeleting || showConfirm}
        className={`w-full ${
          isDeleting || showConfirm
            ? "bg-red-700 cursor-not-allowed opacity-75"
            : "bg-red-600 hover:bg-red-700"
        } text-white text-sm font-medium py-2! rounded-lg transition-all duration-200`}
      />
    </div>
  );
}
