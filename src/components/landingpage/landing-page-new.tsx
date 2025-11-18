import React, { useState } from 'react';
import { BarChart3, TrendingUp, Upload, Sparkles, Check, ArrowRight, Users, DollarSign, AlertCircle, LineChart, Github, Twitter } from 'lucide-react';

export function LandingComponent() {
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    window.location.href = '/signup';
  };

  const handleTryDemo = () => {
    window.location.href = '/demo/dashboard';
  };

  const features = [
    {
      icon: <Upload className="w-6! h-6!" />,
      title: 'CSV Upload',
      description: 'Upload your metrics data in seconds. No complex API integrations needed.'
    },
    {
      icon: <Sparkles className="w-6! h-6!" />,
      title: 'AI-Powered Insights',
      description: 'Get actionable recommendations based on your metrics trends automatically.'
    },
    {
      icon: <LineChart className="w-6! h-6!" />,
      title: 'Real-Time Charts',
      description: 'Visualize MRR, churn, user growth, and revenue with interactive dashboards.'
    },
    {
      icon: <TrendingUp className="w-6! h-6!" />,
      title: 'Growth Tracking',
      description: 'Monitor month-over-month changes and identify what drives your business.'
    }
  ];

  const metrics = [
    { icon: <DollarSign className="w-5! h-5!" />, label: 'MRR Tracking', color: 'text-green-400!' },
    { icon: <Users className="w-5! h-5!" />, label: 'User Growth', color: 'text-blue-400!' },
    { icon: <AlertCircle className="w-5! h-5!" />, label: 'Churn Analysis', color: 'text-orange-400!' },
    { icon: <TrendingUp className="w-5! h-5!" />, label: 'Revenue Insights', color: 'text-purple-400!' }
  ];

  return (
    <div className="min-h-screen! bg-slate-900! text-white!">
      {/* Navigation */}
      <nav className="border-b! border-slate-800! bg-slate-900/95! backdrop-blur-sm! sticky! top-0! z-50!">
        <div className="max-w-6xl! mx-auto! px-6! py-4! flex! items-center! justify-between!">
          <div className="flex! items-center! gap-2!">
            <div className="bg-blue-500/10! p-2! rounded-lg!">
              <BarChart3 className="w-6! h-6! text-blue-400!" />
            </div>
            <span className="text-xl! font-semibold!">MetricPulse</span>
          </div>
          <div className="flex! items-center! gap-4!">
            <button 
              onClick={handleTryDemo}
              className="text-slate-300! hover:text-white! transition-colors! text-sm!"
            >
              Demo
            </button>
            <button 
              onClick={handleGetStarted}
              className="bg-blue-600! hover:bg-blue-700! px-4! py-2! rounded-lg! transition-colors! text-sm! font-medium!"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl! mx-auto! px-6! pt-20! pb-16!">
        <div className="text-center! max-w-3xl! mx-auto!">
          <div className="inline-flex! items-center! gap-2! bg-blue-500/10! border! border-blue-500/20! rounded-full! px-4! py-2! mb-6!">
            <Sparkles className="w-4! h-4! text-blue-400!" />
            <span className="text-sm! text-blue-400!">AI-powered analytics for SaaS founders</span>
          </div>
          
          <h1 className="text-5xl! md:text-6xl! font-bold! mb-6! leading-tight!">
            Know your metrics,<br />grow your business
          </h1>
          
          <p className="text-xl! text-slate-400! mb-8! leading-relaxed!">
            Upload a CSV and get instant AI insights on your MRR, churn, and growth. 
            No payment processor lock-in. No complex setup.
          </p>

          <div className="flex! flex-col! sm:flex-row! items-center! justify-center! gap-4!">
            <button 
              onClick={handleGetStarted}
              className="bg-blue-600! hover:bg-blue-700! px-8! py-3! rounded-lg! font-medium! transition-colors! flex! items-center! gap-2! w-full! sm:w-auto! justify-center!"
            >
              Start Free
              <ArrowRight className="w-5! h-5!" />
            </button>
            <button 
              onClick={handleTryDemo}
              className="bg-slate-800! hover:bg-slate-700! px-8! py-3! rounded-lg! font-medium! transition-colors! border! border-slate-700! w-full! sm:w-auto!"
            >
              Try Demo
            </button>
          </div>

          <p className="text-sm! text-slate-500! mt-4!">No credit card required</p>
        </div>

        {/* Hero Visual */}
        <div className="mt-16! relative!">
          <div className="bg-slate-800/50! border! border-slate-700! rounded-xl! p-6! backdrop-blur-sm!">
            <div className="flex! items-center! gap-2! mb-4!">
              <div className="w-3! h-3! rounded-full! bg-red-500!"></div>
              <div className="w-3! h-3! rounded-full! bg-yellow-500!"></div>
              <div className="w-3! h-3! rounded-full! bg-green-500!"></div>
            </div>
            <div className="grid! grid-cols-2! md:grid-cols-4! gap-4! mb-6!">
              {metrics.map((metric, i) => (
                <div key={i} className="bg-slate-900/50! border! border-slate-700! rounded-lg! p-4!">
                  <div className={`${metric.color} mb-2!`}>
                    {metric.icon}
                  </div>
                  <p className="text-sm! text-slate-400!">{metric.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-900/50! border! border-slate-700! rounded-lg! p-4! h-48! flex! items-center! justify-center!">
              <svg viewBox="0 0 400 150" className="w-full! h-full!">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline
                  points="20,120 80,100 140,80 200,70 260,50 320,40 380,30"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                />
                <polygon
                  points="20,120 80,100 140,80 200,70 260,50 320,40 380,30 380,140 20,140"
                  fill="url(#gradient)"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl! mx-auto! px-6! py-16!">
        <div className="text-center! mb-12!">
          <h2 className="text-3xl! md:text-4xl! font-bold! mb-4!">Everything you need to track growth</h2>
          <p className="text-slate-400! text-lg!">Simple tools that give you the insights that matter</p>
        </div>

        <div className="grid! md:grid-cols-2! gap-6!">
          {features.map((feature, i) => (
            <div key={i} className="bg-slate-800/30! border! border-slate-700! rounded-xl! p-6! hover:border-slate-600! transition-colors!">
              <div className="bg-blue-500/10! w-12! h-12! rounded-lg! flex! items-center! justify-center! text-blue-400! mb-4!">
                {feature.icon}
              </div>
              <h3 className="text-xl! font-semibold! mb-2!">{feature.title}</h3>
              <p className="text-slate-400! leading-relaxed!">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl! mx-auto! px-6! py-16!">
        <div className="text-center! mb-12!">
          <h2 className="text-3xl! md:text-4xl! font-bold! mb-4!">Get started in minutes</h2>
          <p className="text-slate-400! text-lg!">Three simple steps to understand your business</p>
        </div>

        <div className="grid! md:grid-cols-3! gap-8!">
          <div className="text-center!">
            <div className="bg-blue-500/10! w-16! h-16! rounded-full! flex! items-center! justify-center! text-2xl! font-bold! text-blue-400! mx-auto! mb-4!">
              1
            </div>
            <h3 className="text-xl! font-semibold! mb-2!">Create Account</h3>
            <p className="text-slate-400!">Sign up in seconds, no credit card required</p>
          </div>

          <div className="text-center!">
            <div className="bg-blue-500/10! w-16! h-16! rounded-full! flex! items-center! justify-center! text-2xl! font-bold! text-blue-400! mx-auto! mb-4!">
              2
            </div>
            <h3 className="text-xl! font-semibold! mb-2!">Upload Data</h3>
            <p className="text-slate-400!">Drop your CSV file with your metrics</p>
          </div>

          <div className="text-center!">
            <div className="bg-blue-500/10! w-16! h-16! rounded-full! flex! items-center! justify-center! text-2xl! font-bold! text-blue-400! mx-auto! mb-4!">
              3
            </div>
            <h3 className="text-xl! font-semibold! mb-2!">Get Insights</h3>
            <p className="text-slate-400!">AI analyzes your data and shows what matters</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-6xl! mx-auto! px-6! py-16!">
        <div className="bg-slate-800/30! border! border-slate-700! rounded-xl! p-8! md:p-12!">
          <div className="grid! md:grid-cols-3! gap-8! text-center!">
            <div>
              <div className="text-4xl! font-bold! text-blue-400! mb-2!">2min</div>
              <p className="text-slate-400!">Average setup time</p>
            </div>
            <div>
              <div className="text-4xl! font-bold! text-blue-400! mb-2!">100%</div>
              <p className="text-slate-400!">Free to start</p>
            </div>
            <div>
              <div className="text-4xl! font-bold! text-blue-400! mb-2!">Any</div>
              <p className="text-slate-400!">Payment processor</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl! mx-auto! px-6! py-16!">
        <div className="bg-gradient-to-r! from-blue-600! to-blue-700! rounded-xl! p-8! md:p-12! text-center!">
          <h2 className="text-3xl! md:text-4xl! font-bold! mb-4!">Ready to understand your metrics?</h2>
          <p className="text-blue-100! text-lg! mb-8! max-w-2xl! mx-auto!">
            Join founders who are making data-driven decisions with MetricPulse
          </p>
          <div className="flex! flex-col! sm:flex-row! items-center! justify-center! gap-4!">
            <button 
              onClick={handleGetStarted}
              className="bg-white! text-blue-600! hover:bg-slate-100! px-8! py-3! rounded-lg! font-medium! transition-colors! flex! items-center! gap-2! w-full! sm:w-auto! justify-center!"
            >
              Get Started Free
              <ArrowRight className="w-5! h-5!" />
            </button>
            <button 
              onClick={handleTryDemo}
              className="bg-blue-800! hover:bg-blue-900! px-8! py-3! rounded-lg! font-medium! transition-colors! border! border-blue-500! w-full! sm:w-auto!"
            >
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t! border-slate-800! mt-16!">
        <div className="max-w-6xl! mx-auto! px-6! py-8!">
          <div className="flex! flex-col! md:flex-row! items-center! justify-between! gap-4!">
            <div className="flex! items-center! gap-2!">
              <div className="bg-blue-500/10! p-2! rounded-lg!">
                <BarChart3 className="w-5! h-5! text-blue-400!" />
              </div>
              <span className="font-semibold!">MetricPulse</span>
            </div>
            <p className="text-slate-500! text-sm!">© 2024 MetricPulse. Built for founders who ship fast.</p>
            <div className="flex! items-center! gap-4!">
              <a href="#" className="text-slate-400! hover:text-white! transition-colors!">
                <Twitter className="w-5! h-5!" />
              </a>
              <a href="#" className="text-slate-400! hover:text-white! transition-colors!">
                <Github className="w-5! h-5!" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

