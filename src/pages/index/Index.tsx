import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MessageCircle, Sparkles, Globe, BookOpen, Calendar, Trophy, Play, CheckCircle } from "lucide-react";
import { Link } from "react-router";
import LogoHeader from "@/assets/ynov_logo_black.webp"
import LogoFooter from "@/assets/ynov_logo.webp"
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <nav className="px-6 py-4 flex justify-between items-center border-b border-border">
          <img src={LogoHeader} alt="Ynov Network Logo" className="h-8" />
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#community" className="text-muted-foreground hover:text-primary transition-colors">Community</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/sign-in">
              <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button className="bg-gradient-to-r from-primary to-brand-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="px-6 py-20 md:py-32 text-center">
          <Badge variant="outline" className="mb-4">
            🚀 Now in Public Beta!
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">
            <span className="text-foreground">Connect & Learn with</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent">
              Ynov Campus Students
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8">
            The exclusive social network for Ynov students. Share projects, find collaborators, and grow your professional network.
          </p>
          <div className="flex justify-center items-center space-x-4">
            <Link to="/sign-up">
              <Button size="lg" className="bg-gradient-to-r from-primary to-brand-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="px-8 py-4 border-2 border-border text-muted-foreground hover:bg-accent transition-all duration-300">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-12 bg-muted/50">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-foreground">1200+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">Study Groups</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">160K+</div>
              <div className="text-sm text-muted-foreground">Connections Made</div>
            </div>
          </div>
        </section>

        {/* Floating Card Section */}
        <section className="px-6 py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                Free Admission - Join Today!
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Connect & Learn with</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-brand-secondary bg-clip-text text-transparent">
                  YnovNetwork
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                The premier social platform designed exclusively for Ynov Campus Maroc students.
                Connect, collaborate, and grow together in our innovative learning community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/sign-in">
                  <Button size="lg" className="bg-gradient-to-r from-brand-accent to-orange-600 text-white px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Join Network
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-4 border-2 border-border text-muted-foreground hover:bg-accent transition-all duration-300">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Hero Image/Mockup */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary to-brand-secondary rounded-3xl p-8 shadow-2xl">
                <div className="bg-background rounded-2xl p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-brand-accent to-orange-500 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Study Group</div>
                      <div className="text-sm text-muted-foreground">Software Engineering</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-600">AM</span>
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2 flex-1">
                        <div className="text-sm text-foreground">Anyone up for a React study session?</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-green-600">SB</span>
                      </div>
                      <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 flex-1">
                        <div className="text-sm">Count me in! 📚</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">5 members online</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-background rounded-lg shadow-lg p-3 animate-bounce-in">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-xs font-medium text-foreground">12 new messages</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-background rounded-lg shadow-lg p-3 animate-[bounce-in_0.8s_ease_0.2s_both]">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-foreground">Event Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-20 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Powerful Features for Student Success
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to connect, collaborate, and excel in your academic journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Smart Connections",
                  description: "AI-powered matching with classmates and study partners based on your interests and academic goals.",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: MessageCircle,
                  title: "Real-time Chat",
                  description: "Instant messaging, group chats, and collaborative workspaces for seamless communication.",
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: Calendar,
                  title: "Event Management",
                  description: "Discover and organize campus events, study sessions, and social gatherings in one place.",
                  color: "from-orange-500 to-orange-600"
                },
                {
                  icon: BookOpen,
                  title: "Study Groups",
                  description: "Create and join study groups for your courses with integrated scheduling and resource sharing.",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  icon: Trophy,
                  title: "Achievement System",
                  description: "Gamified learning experience with badges, points, and recognition for academic milestones.",
                  color: "from-yellow-500 to-yellow-600"
                },
                {
                  icon: Globe,
                  title: "Global Network",
                  description: "Connect with students across different campuses and build your professional network early.",
                  color: "from-indigo-500 to-indigo-600"
                }
              ].map((feature, index) => (
                <div key={index} className="group">
                  <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="px-6 py-20 bg-gradient-to-br from-muted/30 to-blue-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground">
              Join a thriving community
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              of innovators, creators, and collaborators.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="grid grid-cols-2 gap-4 text-left">
                {["Share your projects and get feedback", "Find partners for your next big idea", "Expand your professional network", "Access exclusive resources"].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Student Experience?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">Create your account and start connecting today.</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-brand-secondary text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Sign Up for Free
          </Button>
        </section>
      </main>

      <footer className="px-6 py-12 bg-foreground text-background">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <img src={LogoFooter} alt="Ynov Network Logo" className="h-8 mb-4" />
            <p className="text-muted-foreground text-sm">
              The social network for students of Ynov Campus.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#features" className="block hover:text-primary">Features</a>
              <a href="#about" className="block hover:text-primary">About Us</a>
              <a href="#community" className="block hover:text-primary">Community</a>
              <a href="#contact" className="block hover:text-primary">Contact</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#" className="block hover:text-primary">Guidelines</a>
              <a href="#" className="block hover:text-primary">Leaderboards</a>
              <a href="#" className="block hover:text-primary">Events</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#" className="block hover:text-primary">Privacy Policy</a>
              <a href="#" className="block hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Ynov Network. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;