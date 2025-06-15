import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LogoFooter from "@/assets/ynov_logo.webp"

export default function Header() {
    return (
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
                    © 2024 YNetwork. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
