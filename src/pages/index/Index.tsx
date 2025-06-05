import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MessageCircle, Sparkles, Globe, BookOpen, Calendar, Trophy, Play, CheckCircle } from "lucide-react";
import { Link } from "react-router";
import LogoHeader from "@/assets/ynov_logo_black.webp"
import LogoFooter from "@/assets/ynov_logo.webp"

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center">
            <img height={80} width={80} src={LogoHeader} alt="YNetwork_Logo" />
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-ynov-primary transition-colors">Features</a>
          <a href="#about" className="text-gray-600 hover:text-ynov-primary transition-colors">About</a>
          <a href="#community" className="text-gray-600 hover:text-ynov-primary transition-colors">Community</a>
          <a href="#contact" className="text-gray-600 hover:text-ynov-primary transition-colors">Contact</a>
        </div>
        <div className="flex space-x-3">
          <Link to="/sign-in">
            <Button variant="ghost" className="text-gray-600 hover:text-ynov-primary">
              Sign In
            </Button>
          </Link>
          <Link to="/sign-in">
            <Button className="bg-gradient-to-r from-ynov-primary to-ynov-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 animate-[float_4s_ease-in-out_infinite_reverse]"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              Free Admission - Join Today!
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-800">Connect & Learn with</span>
              <br />
              <span className="bg-gradient-to-r from-ynov-primary to-ynov-secondary bg-clip-text text-transparent">
                YnovNetwork
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              The premier social platform designed exclusively for Ynov Campus Maroc students.
              Connect, collaborate, and grow together in our innovative learning community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/sign-in">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Join Network
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">1200+</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">50+</div>
                <div className="text-sm text-gray-600">Study Groups</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">160K+</div>
                <div className="text-sm text-gray-600">Connections Made</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Mockup */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-ynov-primary to-ynov-secondary rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Study Group</div>
                    <div className="text-sm text-gray-600">Software Engineering</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-600">AM</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-3 py-2 flex-1">
                      <div className="text-sm text-gray-700">Anyone up for a React study session?</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-green-600">SB</span>
                    </div>
                    <div className="bg-ynov-primary text-white rounded-lg px-3 py-2 flex-1">
                      <div className="text-sm">Count me in! 📚</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500">5 members online</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-bounce-in">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-xs font-medium text-gray-700">12 new messages</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 animate-[bounce-in_0.8s_ease_0.2s_both]">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-ynov-primary" />
                <span className="text-xs font-medium text-gray-700">Event Tomorrow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Powerful Features for Student Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="px-6 py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-800">
                Join a Thriving Learning Community
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with like-minded students, share knowledge, and build lasting friendships that extend beyond the classroom.
              </p>

              <div className="space-y-4">
                {[
                  "Create and join study groups for any subject",
                  "Share resources and collaborate on projects",
                  "Get help from peers and mentors",
                  "Participate in campus events and activities"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/sign-up">
                <Button size="lg" className="bg-gradient-to-r from-ynov-primary to-ynov-secondary text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Start Connecting Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Active Study Groups</h3>
                    <span className="text-sm text-gray-500">Today</span>
                  </div>

                  {[
                    { name: "React Development", members: 24, subject: "Computer Science", color: "bg-blue-100 text-blue-600" },
                    { name: "Marketing Strategy", members: 18, subject: "Business", color: "bg-green-100 text-green-600" },
                    { name: "UX/UI Design", members: 31, subject: "Design", color: "bg-purple-100 text-purple-600" }
                  ].map((group, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className={`w-12 h-12 ${group.color} rounded-xl flex items-center justify-center font-semibold`}>
                        {group.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{group.name}</div>
                        <div className="text-sm text-gray-600">{group.subject} • {group.members} members</div>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-ynov-primary to-ynov-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Student Experience?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of students who are already building connections and achieving success together.
          </p>
          <Link to="/sign-up">
            <Button size="lg" className="bg-white text-ynov-primary hover:bg-gray-100 px-10 py-4 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Get Started Free
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  <img height={100} width={100} src={LogoFooter} alt="YNetwork_Logo" />
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting students, empowering futures.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Features</div>
                <div>Community</div>
                <div>Events</div>
                <div>Groups</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Campus Locations</div>
                <div>Student Portal</div>
                <div>Newsletter</div>
                <div>Social Media</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 YnovNetwork. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;