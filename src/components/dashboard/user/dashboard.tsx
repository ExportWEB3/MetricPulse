import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDashboard } from "../../hooks/useDashboard.hooks";
import { TextUIComponent, TitleUIComponent } from "../../../utilities/UI/texts.ui";
import { generateMetricCards } from "../../../utilities/metricCards";
import { ChartsDashboard } from "./charts.dashboard";
import { AnalyticsComponent } from "./ai.analytics.dashboard";
import { ButtonUIComponent } from "../../../utilities/UI/button.ui";
import { RefreshInsightsButton } from "./refresh-insights.button";
import { DeleteMetricsButton } from "./delete-metrics.button";
import { nonMetricPages } from "../../../utilities/data";




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
        <div className="flex flex-col justify-center items-center gap-4 border border-slate-700 rounded-lg w-100 h-50">
          <TextUIComponent
            type="h5"
            text="Error Loading Dashboard"
            className="text-red-600"
          />
          <TextUIComponent
            type="p"
            text={error}
            className="text-red-500! text-center"
          />
          <ButtonUIComponent
            onClick={clearError}
            className="w-40 h-10 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
            text="Dismiss"
          />
        </div>
      </section>
    );
  }

  if (!metrics) {
    return (
      <section className="w-full h-screen flex items-center justify-center p-2!">
        <div className="flex flex-col items-center justify-center gap-8 max-w-md">
          {/* Icon */}
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          {/* Title */}
          <TitleUIComponent
            type="h4"
            text="No Data Available Yet"
            className="text-white text-center"
          />

          {/* Description */}
          <TextUIComponent
            type="p"
            text="Start by uploading a CSV file with your metrics data to see your dashboard come to life with insights and analytics."
            className="text-gray-400! text-center"
          />

          {/* Steps */}
          <div className="w-full space-y-4!">
            {nonMetricPages.map((page) => (
              <div className="flex gap-4 p-2! rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">{page.id}</div>
              <div>
                <TextUIComponent type="p" text={page.label} className="text-white!" />
                <TextUIComponent type="p" text={page.desc} className="text-gray-400!" />
              </div>
            </div>
            ))}
          </div>

          {/* Additional Help Text */}
          <TextUIComponent
            type="p"
            text="💡 Tip: Use the Navigation Bar menu to upload your first CSV file"
            className="text-blue-400! text-center"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col lg:flex-row gap-4 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4!">
     {/* <aside className="w-full lg:w-64 shrink-0">
         <SidebarComponent mode={mode as "demo" | "real"} /> 
      </aside> */}

      <main className="flex-1">
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

        <ChartsDashboard metricsData={metrics} />

       <AnalyticsComponent />

       <RefreshInsightsButton />

       <DeleteMetricsButton />
      </main>
    </section>
  );
}