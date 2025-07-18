import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Contact - Fermi",
  description: "Contact Fermi for support, feedback, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-[45vh] w-full flex items-center pt-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/55 dark:from-white/15 dark:to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/40 rounded-full animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
          ></div>
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
        {/* Animated Lines */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-pulse"
            style={{ animationDelay: "2s", animationDuration: "4s" }}
          ></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-4xl">
            {/* Elegant two-line heading */}
            <h1 className="text-4xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-[2500ms] ease-in-out">
              Contact Us
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary/80 via-primary to-foreground bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-[2500ms] ease-in-out delay-200">
              Have questions, feedback, or want to collaborate?
            </h2>
            {/* Decorative accent line */}
            <div className="w-32 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-transparent rounded-full animate-in slide-in-from-left-8 duration-1000 delay-400 mb-4"></div>
            {/* Enhanced subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground animate-in slide-in-from-bottom-6 duration-1000 delay-500 leading-relaxed max-w-3xl">
              Reach out to the Fermi team below. We value your input and look
              forward to connecting with you.
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Contact Form Section */}
          <section className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
              Send Us a Message
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form Card */}
              <div className="relative p-6 border border-border rounded-lg bg-card shadow-xl overflow-hidden">
                {/* Subtle Animated Atom SVG */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20 blur-sm select-none z-0">
                  <svg
                    width="220"
                    height="120"
                    viewBox="0 0 320 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin-slow"
                  >
                    <ellipse
                      cx="160"
                      cy="90"
                      rx="80"
                      ry="30"
                      stroke="url(#grad1)"
                      strokeWidth="1.5"
                    />
                    <ellipse
                      cx="160"
                      cy="90"
                      rx="30"
                      ry="80"
                      stroke="url(#grad2)"
                      strokeWidth="1.5"
                      transform="rotate(30 160 90)"
                    />
                    <ellipse
                      cx="160"
                      cy="90"
                      rx="30"
                      ry="80"
                      stroke="url(#grad3)"
                      strokeWidth="1.5"
                      transform="rotate(-30 160 90)"
                    />
                    <circle cx="160" cy="90" r="6" fill="url(#grad4)" />
                    <defs>
                      <linearGradient
                        id="grad1"
                        x1="80"
                        y1="90"
                        x2="240"
                        y2="90"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#a5b4fc" />
                        <stop offset="1" stopColor="#818cf8" />
                      </linearGradient>
                      <linearGradient
                        id="grad2"
                        x1="120"
                        y1="90"
                        x2="200"
                        y2="90"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#f472b6" />
                        <stop offset="1" stopColor="#818cf8" />
                      </linearGradient>
                      <linearGradient
                        id="grad3"
                        x1="120"
                        y1="90"
                        x2="200"
                        y2="90"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#34d399" />
                        <stop offset="1" stopColor="#818cf8" />
                      </linearGradient>
                      <radialGradient
                        id="grad4"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientTransform="translate(160 90) scale(6)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#818cf8" />
                        <stop offset="1" stopColor="#a5b4fc" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
                <form className="relative z-10 space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-foreground mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-primary/20 rounded bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm text-sm transition-all duration-200"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-foreground mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-primary/20 rounded bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm text-sm transition-all duration-200"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-foreground mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-3 py-2 border border-primary/20 rounded bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm text-sm transition-all duration-200 resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold rounded hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              {/* Contact Info Card */}
              <div className="p-6 border border-border rounded-lg bg-card flex flex-col justify-center shadow-xl">
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                  Contact Information
                </h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">Email:</span>{" "}
                    <a
                      href="mailto:support@fermi.com"
                      className="underline text-primary hover:text-primary/80 transition-colors"
                    >
                      support@fermi.com
                    </a>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      Address:
                    </span>{" "}
                    123 Science Ave, Quantum City, 12345
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      Business Hours:
                    </span>{" "}
                    Mon - Fri, 9:00am - 6:00pm (UTC)
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors text-sm"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
