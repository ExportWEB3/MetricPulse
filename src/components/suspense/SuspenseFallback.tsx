import { TextUIComponent } from "../../utilities/UI/texts.ui";

export function SuspenseFallback() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Animated Logo/Icon */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg animate-spin" 
               style={{ animationDuration: '3s' }}>
          </div>
          <div className="absolute inset-2 bg-slate-900 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-linear-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <TextUIComponent
            type="h5"
            text="MetricPulse"
            className=""
          />
          <TextUIComponent
            type="p"
            text="Almost Ready..."
            className="text-gray-400!"
          />
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-linear-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"
            style={{
              animation: 'slideInfinite 2s infinite'
            }}
          ></div>
        </div>

        <style>{`
          @keyframes slideInfinite {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
