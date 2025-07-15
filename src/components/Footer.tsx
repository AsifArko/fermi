"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const hideFooter =
    pathname?.includes("/dashboard/courses/") &&
    pathname?.includes("/lessons/");
  if (hideFooter) return null;

  return (
    <footer className="w-full border-t bg-white dark:bg-gray-950 py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Fermi. All rights reserved.
        </div>
        <nav className="flex gap-6 text-sm">
          <a
            href="/about"
            className="hover:text-primary transition-colors text-gray-600 dark:text-gray-400"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-primary transition-colors text-gray-600 dark:text-gray-400"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="hover:text-primary transition-colors text-gray-600 dark:text-gray-400"
          >
            Privacy Policy
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
