import * as React from "react";
import { Shield, Menu, X } from "lucide-react";
import type { CurrentPage } from "../App";
import { YourApp } from "./custombtn";

interface NavbarProps {
  currentPage: CurrentPage;
  setCurrentPage: (page: CurrentPage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "manufacturer", label: "Manufacturer" },
    { id: "consumer", label: "Verify Product" },
    { id: "history", label: "Product History" },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-2xl sticky top-0 z-50 border-b border-teal-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors duration-200"
            >
              <Shield className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                SecureChain
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as CurrentPage)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-teal-400 hover:bg-gray-800/50"
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* Desktop Connect Button */}
            <YourApp/>
          </div>

          {/* Mobile Menu Toggle and Connect Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Connect Button */}
            <YourApp/>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-teal-400 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-gray-900 to-black border-t border-teal-500/20">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id as CurrentPage);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white"
                      : "text-gray-300 hover:text-teal-400 hover:bg-gray-800/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};