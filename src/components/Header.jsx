import React, { useState } from "react";
import { Cloud, Menu, X, MessageCircle, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./ui/Button.jsx";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Cloud className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-foreground">
              RainWatch
            </h1>
            <p className="text-xs text-muted-foreground">Northern Nigeria</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link className="text-sm font-medium hover:text-primary" to="/">
            Dashboard
          </Link>

          <Link
            to="/chat"
            className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            <MessageCircle className="w-4 h-4" />
            AI Assistant
          </Link>

          <Link to="/signin">
            <Button size="sm" className="gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          </Link>
        </nav>

        {/* Mobile Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
            >
              Dashboard
            </Link>

            <Link
              to="/chat"
              onClick={() => setOpen(false)}
              className="text-sm font-medium flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              AI Assistant
            </Link>

            <Link to="/signin" onClick={() => setOpen(false)}>
              <Button className="w-full gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
