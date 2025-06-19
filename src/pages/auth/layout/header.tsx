import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import LogoHeader from "@/assets/ynov_logo_black.webp"

export default function Header() {
  const navigate = useNavigate();
  return (
    <nav className="px-6 py-4 flex justify-between items-center bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
          <img height={80} width={80} src={LogoHeader} alt="YNetwork_Logo" />
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#features" className="text-gray-600 hover:text-ynov-primary transition-colors">Features</a>
        <a href="#about" className="text-gray-600 hover:text-ynov-primary transition-colors">About</a>
        <a href="#community" className="text-gray-600 hover:text-ynov-primary transition-colors">Community</a>
        <a href="/contact" className="text-gray-600 hover:text-ynov-primary transition-colors">Contact</a>
      </div>
      <div className="flex space-x-3">
        <Link to="/sign-in">
          <Button variant="ghost" className="text-gray-600 hover:text-ynov-primary">
            Sign In
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button variant="default">
            Join Now
          </Button>
        </Link>
      </div>
    </nav>
  );
}
