import { ArrowRight, BarChart3, Zap, Brain, Upload, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LandingComponent() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-blue-400" />
          <span className="text-xl font-bold">MetricPulse</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="px-6 py-2 text-blue-400 hover:text-blue-300 transition">
            Login
          </button>
          <button onClick={() => navigate('/signup')} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
        
        <h1 className="text-6xl font-bold mb-4 relative z-10">
          AI-Powered SaaS Metrics Dashboard
        </h1>
        <p className="text-xl text-gray-400 mb-8 relative z-10 max-w-2xl mx-auto">
          Upload your metrics, get intelligent insights powered by AI. Understand your business at a glance.
        </p>
        
        <div className="flex gap-4 justify-center relative z-10 mb-16">
          <button onClick={() => navigate('/signup')} className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded text-lg font-semibold transition">
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => navigate('/dashboard/demo')} className="px-8 py-3 border border-slate-700 hover:border-slate-600 rounded text-lg font-semibold transition">
            Try Demo
          </button>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto relative z-10">
          <div>
            <div className="text-3xl font-bold text-blue-400">10K+</div>
            <div className="text-sm text-gray-400">Metrics Tracked</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">50+</div>
            <div className="text-sm text-gray-400">Happy Teams</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">99.9%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-16 bg-slate-900/50">
        <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded p-6">
            <Upload className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Easy CSV Upload</h3>
            <p className="text-gray-400 text-sm">Upload your SaaS metrics in seconds. Supports MRR, users, churn, revenue and more.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded p-6">
            <Brain className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
            <p className="text-gray-400 text-sm">Get actionable insights instantly. Our AI analyzes your metrics and identifies trends.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded p-6">
            <BarChart3 className="w-8 h-8 text-cyan-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Beautiful Charts</h3>
            <p className="text-gray-400 text-sm">Visualize your data with stunning, interactive charts. Track growth at a glance.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded p-6">
            <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-gray-400 text-sm">Monitor your metrics in real-time. Get alerts when something changes significantly.</p>
          </div>

          {/* Feature 5 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded p-6">
            <Zap className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">Powered by cutting-edge technology. Load your dashboard in milliseconds.</p>
          </div>

          {/* Feature 6 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded p-6">
            <div className="w-8 h-8 text-red-400 mb-3 flex items-center justify-center">
              <div className="text-lg font-bold">🔒</div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-400 text-sm">Your data is encrypted and secure. We never share your metrics with anyone.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">1</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Sign Up & Create Account</h3>
                <p className="text-gray-400">Create a free MetricPulse account in seconds. No credit card required.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold">2</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Upload Your CSV File</h3>
                <p className="text-gray-400">Export your metrics as CSV and upload them to MetricPulse. We support all major formats.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-600 text-white font-bold">3</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Get AI Insights</h3>
                <p className="text-gray-400">Our AI analyzes your metrics and generates actionable insights in real-time.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white font-bold">4</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Take Action</h3>
                <p className="text-gray-400">Use the insights to make data-driven decisions for your business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-t border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to transform your metrics?</h2>
          <p className="text-lg text-gray-400 mb-8">Start tracking and analyzing your SaaS metrics today with AI-powered insights.</p>
          
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate('/signup')} className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded text-lg font-semibold transition">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/dashboard/demo')} className="px-8 py-3 border border-slate-700 hover:border-slate-600 rounded text-lg font-semibold transition">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-slate-800 text-center text-gray-500 text-sm">
        <p>© 2025 MetricPulse. All rights reserved. Built with ❤️ for SaaS founders.</p>
      </footer>
    </div>
  );
}
