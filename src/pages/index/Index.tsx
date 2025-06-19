import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  MessageCircle,
  Sparkles,
  Globe,
  BookOpen,
  Calendar,
  Trophy,
  Play,
  Quote,
} from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Connections",
      description:
        "AI-powered matching with classmates and study partners based on your interests and academic goals.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description:
        "Instant messaging, group chats, and collaborative workspaces for seamless communication.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Calendar,
      title: "Event Management",
      description:
        "Discover and organize campus events, study sessions, and social gatherings in one place.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: BookOpen,
      title: "Study Groups",
      description:
        "Create and join study groups for your courses with integrated scheduling and resource sharing.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description:
        "Gamified learning experience with badges, points, and recognition for academic milestones.",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Globe,
      title: "Global Network",
      description:
        "Connect with students across different campuses and build your professional network early.",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const testimonials = [
    {
      name: "Amina K.",
      role: "Software Engineering Student",
      quote:
        "YnovNetwork helped me find a partner for my final year project. The collaboration tools are amazing!",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Youssef L.",
      role: "Cybersecurity Student",
      quote:
        "The study groups are a lifesaver. I've learned so much from my peers in a way that lectures can't replicate.",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Fatima Z.",
      role: "Digital Creation & Design Student",
      quote:
        "I love sharing my design projects here and getting real feedback from other creatives on campus.",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <div className="bg-background text-foreground">

      <main>
        {/* Hero Section */}
        <section className="relative px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 animate-[float_4s_ease-in-out_infinite_reverse]"></div>

          <div className="relative z-10">
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-20">
              <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl animate-pulse-glow"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary rounded-full filter blur-3xl animate-pulse-glow animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div
                className="space-y-8 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <Badge
                  variant="outline"
                  className="border-primary/50 text-primary font-medium"
                >
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  Exclusively for Ynov Campus
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-800">Connect & Learn with</span>
                  <br />
                  <span className="bg-primary bg-clip-text text-transparent">
                    YNetwork
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  The premier social platform for Ynov students. Connect,
                  collaborate on projects, and grow your professional network in
                  an exclusive community.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/sign-up">
                    <Button
                      size="lg"
                      className="w-full cursor-pointer sm:w-auto bg-gradient-to-r from-primary to-brand-secondary text-white px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Join for Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <a href="#features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="cursor-pointer w-full sm:w-auto px-8 py-4 border-2 border-border text-muted-foreground hover:bg-accent transition-all duration-300"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      See How It Works
                    </Button>
                  </a>
                </div>
              </div>

              <div
                className="relative animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="relative bg-gradient-to-br from-primary/80 to-brand-secondary/80 rounded-3xl p-4 shadow-2xl animate-float-hero">
                  <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 space-y-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-brand-accent to-orange-500 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            Study Group
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Software Engineering
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">New</Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">
                            AM
                          </span>
                        </div>
                        <div className="bg-muted rounded-lg px-3 py-2 flex-1">
                          <div className="text-sm text-foreground">
                            Anyone up for a React study session?
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-green-600 dark:text-green-300">
                            SB
                          </span>
                        </div>
                        <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 flex-1">
                          <div className="text-sm">Count me in! 📚</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        5 members online
                      </span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -top-6 -right-6 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-3 animate-bounce-in"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-foreground">
                      12 new messages
                    </span>
                  </div>
                </div>

                <div
                  className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-3"
                  style={{ animation: "bounce-in 0.8s ease 0.8s both" }}
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-foreground">
                      Event Tomorrow
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-20 relative overflow-hidden bg-muted/30 bg-aurora-soft">
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
                  Everything You Need for Campus Success
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  A powerful toolkit designed to enhance your academic journey
                  and professional growth.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="px-6 py-20 relative overflow-hidden bg-background bg-aurora-soft">
          <div className="relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
                From Students, For Students
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                See how YnovNetwork is transforming the campus experience for
                your peers.
              </p>
              <div className="mt-12 grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className="bg-card border border-border rounded-xl p-6 text-left flex flex-col animate-fade-in-up"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <Quote className="h-8 w-8 text-primary/50 mb-4" />
                    <p className="text-muted-foreground flex-grow">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center mt-6">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 text-center bg-gradient-to-r from-primary to-brand-secondary">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Student Experience?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Create your free account and start connecting today.
            </p>
            <Link to="/sign-up">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white cursor-pointer text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Sign Up for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;