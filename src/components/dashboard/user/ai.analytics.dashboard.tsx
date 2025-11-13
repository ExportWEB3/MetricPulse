import { Sparkles } from "lucide-react";
import { TextUIComponent } from "../../../utilities/UI/texts.ui";
import { useDashboard } from "../../hooks/useDashboard.hooks";

export function AnalyticsComponent() {
    const {
        metrics,
        isLoading,
      } = useDashboard();
      

      
    return (
        <section>
          {metrics && metrics.aiInsights && metrics.aiInsights.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-3! space-y-3!">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <TextUIComponent
                  type="h4"
                  text="AI Insights"
                  className="text-white text-lg font-semibold"
                />
              </div>

              {isLoading ? (
                <div className="space-y-4!">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-700 rounded w-full mb-1"></div>
                      <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4!">
                  {metrics.aiInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className={`p-4! space-y-2! rounded-lg border ${
                        insight.type === "positive"
                          ? "bg-green-500/10 border-green-500/30"
                          : insight.type === "warning"
                          ? "bg-orange-500/10 border-orange-500/30"
                          : "bg-blue-500/10 border-blue-500/30"
                      }`}
                    >
                      <TextUIComponent
                        type="h6"
                        text={insight.title}
                        className="text-white!"
                      />
                      <TextUIComponent
                        type="p"
                        text={insight.description}
                        className="text-slate-300!"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
    )
}