import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDashboard } from "../../hooks/useDashboard.hooks";
import { TextUIComponent, TitleUIComponent } from "../../../utilities/UI/texts.ui";
import { generateMetricCards } from "../../../utilities/metricCards";
import { ChartsDashboard } from "./charts.dashboard";
import { AnalyticsComponent } from "./ai.analytics.dashboard";
import { ButtonUIComponent } from "../../../utilities/UI/button.ui";




export function DashboardComponent() {

  const { mode } = useParams<{ mode: string }>();
  const {
    metrics,
    isLoading,
    error,
    initializeDemoMode,
    fetchRealModeData,
    clearError,
  } = useDashboard();
  
  const initializedRef = useRef(false);

  

  useEffect(() => {
    // Only initialize once
    if (initializedRef.current) return;
    
    // Initialize based on mode from URL
    if (mode === "demo") {
      initializeDemoMode();
      initializedRef.current = true;
    } else {
      // Fetch real data for authenticated users
      fetchRealModeData();
      initializedRef.current = true;
    }
  }, [mode]);

  if (isLoading) {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <TextUIComponent
            type="p"
            text="Loading your dashboard..."
            className="text-gray-600"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 p-8 bg-red-50 border border-red-200 rounded-lg max-w-md">
          <TextUIComponent
            type="h5"
            text="Error Loading Dashboard"
            className="text-red-600"
          />
          <TextUIComponent
            type="p"
            text={error}
            className="text-red-500 text-center"
          />
          <button
            onClick={clearError}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
          >
            Dismiss
          </button>
        </div>
      </section>
    );
  }

  if (!metrics) {
    return (
      <section className="w-full h-screen flex items-center justify-center ">
        <TextUIComponent
          type="p"
          text="No data available"
          className="text-gray-600"
        />
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col lg:flex-row gap-4 p-4 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4!">
     {/* <aside className="w-full lg:w-64 shrink-0">
         <SidebarComponent mode={mode as "demo" | "real"} /> 
      </aside> */}

      <main className="flex-1">
        {/* Dashboard Header - DEMO MODE */}
        {mode === "demo" && (
          <div className="h-18 flex items-center border-b border-slate-700">
            <div className="w-full flex flex-col md:flex-row justify-center md:items-center md:justify-between">
              <div className="w-1/2">
                <TextUIComponent
                  type="h3"
                  text="Demo Dashboard"
                  className="text-gray-900"
                />
                <TextUIComponent
                  type="p"
                  text="Mode: Demo (No Data Saved)"
                  className="text-gray-500!"
                />
              </div>
              {metrics.lastUpdated && (
                <TextUIComponent
                  type="p"
                  text={`Last updated: ${new Date(metrics.lastUpdated).toLocaleString()}`}
                  className="text-gray-400!"
                />
              )}
            </div>
          </div>
        )}

        {/* Dashboard Header - REAL MODE */}
        {mode !== "demo" && (
          <div className="mb-6! pb-6! border-b border-gray-200">
            {/* Custom header for real mode - Style as needed */}
          </div>
        )}

        {/* Summary Metrics Section */}
        <div className="flex-1 py-5!">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {generateMetricCards(metrics).map((card, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-xl rounded-x p-6 border border-slate-700/50 rounded-lg px-5! py-2! space-y-5!">
                <div className="w-full flex justify-between">
                  <div className={`${card.iconBgColor} rounded-md w-fit p-2!`}>
                    <div className={card.iconColor}>
                      {card.icon}
                    </div>
                  </div>
                  <TextUIComponent
                    type="p"
                    text={card.growth.toString()}
                    className={`text-sm font-semibold ${
                      card.growthType === "positive"
                        ? "text-green-600!"
                        : card.growthType === "negative"
                        ? "text-red-600!"
                        : "text-gray-600!"
                    }`}
                  />
                </div>
                
                <div className="flex items-baseline gap-2 flex-col">
                  <TextUIComponent
                    type="p"
                    text={card.type}
                    className="text-gray-600! text-sm font-medium"
                  />
                  <TitleUIComponent
                    type="h3"
                    text={
                      card.format === "currency"
                        ? `$${card.value.toLocaleString()}`
                        : card.value.toString()
                    }
                    className="text-white!"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <ChartsDashboard />

       <AnalyticsComponent />


        {/* Gemini API CTA */}
       <div className="w-full h-20 flex mt-5! items-center border-t border-slate-700">
  <ButtonUIComponent 
  type="button"
  text="Refresh AI Insights"
  className="w-full bg-blue-700 hover:bg-blue-500 text-white text-sm font-medium py-2! rounded-lg transition-all duration-200"  
  />
</div>
      </main>
    </section>
  );
}