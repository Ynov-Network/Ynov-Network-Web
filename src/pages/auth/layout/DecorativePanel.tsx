import { Code, Network, Shield, Cpu, Globe, Zap } from "lucide-react";
import Logo from "@/assets/ynov_logo.webp"

export function DecorativePanel() {
  return (
    <div className="relative h-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-700 dark:via-primary-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-lg rotate-45 animate-pulse-glow" />
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />

        {/* Circuit-like lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 600">
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
              </linearGradient>
            </defs>
            <path
              d="M50 100 L150 100 L150 200 L250 200 L250 300 L350 300"
              stroke="url(#circuitGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M100 150 L200 150 L200 250 L300 250 L300 350 L400 350"
              stroke="url(#circuitGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <circle cx="150" cy="100" r="4" fill="rgba(255,255,255,0.8)" className="animate-pulse-glow" />
            <circle cx="250" cy="200" r="4" fill="rgba(255,255,255,0.8)" className="animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
            <circle cx="300" cy="250" r="4" fill="rgba(255,255,255,0.8)" className="animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-white">
        {/* Logo placeholder - replace with actual Ynov logo */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center justify-center mb-4">
            <img height={150} width={150} src={Logo} alt="YNetwork_Logo" />
          </div>
        </div>

        {/* Tech Icons Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col items-center">
            <Code className="w-8 h-8 mb-2 animate-float" />
            <span className="text-xs text-primary-100">Code</span>
          </div>
          <div className="flex flex-col items-center">
            <Network className="w-8 h-8 mb-2 animate-float" style={{ animationDelay: '1s' }} />
            <span className="text-xs text-primary-100">Network</span>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-8 h-8 mb-2 animate-float" style={{ animationDelay: '2s' }} />
            <span className="text-xs text-primary-100">Security</span>
          </div>
          <div className="flex flex-col items-center">
            <Cpu className="w-8 h-8 mb-2 animate-float" style={{ animationDelay: '0.5s' }} />
            <span className="text-xs text-primary-100">AI</span>
          </div>
          <div className="flex flex-col items-center">
            <Globe className="w-8 h-8 mb-2 animate-float" style={{ animationDelay: '1.5s' }} />
            <span className="text-xs text-primary-100">Web</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-8 h-8 mb-2 animate-float" style={{ animationDelay: '2.5s' }} />
            <span className="text-xs text-primary-100">Innovation</span>
          </div>
        </div>

        {/* Main tagline */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-semibold mb-4">
            Innovate. Connect. <span className="text-gradient">Grow.</span>
          </h2>
          <p className="text-primary-100 max-w-sm leading-relaxed">
            Join your campus community and unlock endless possibilities in the world of technology and innovation.
          </p>
        </div>

        {/* Animated data stream visualization */}
        <div className="absolute bottom-10 left-10 right-10">
          <div className="flex items-center justify-center space-x-2 text-primary-200">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}