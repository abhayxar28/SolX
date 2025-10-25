"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black scroll-smooth">
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-16 py-6 bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text">
          SolX
        </h1>

        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </nav>

        <button className="md:hidden text-2xl text-blue-600">☰</button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-6 md:px-20">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
          Power Your Solana Journey with{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text">
            SolX
          </span>
        </h2>

        <p className="mt-5 text-gray-700 text-lg max-w-2xl">
          The ultimate toolkit to send SOL, airdrop tokens, and create your own
          digital assets — all in one place.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/dashboard">
            <button className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-700 text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition shadow-md">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="mt-32 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 md:px-20"
      >
        {[
          {
            title: "Send SOL Instantly",
            desc: "Transfer SOL securely with lightning-fast transactions on the Solana blockchain.",
          },
          {
            title: "Airdrop with Ease",
            desc: "Distribute tokens effortlessly to your community or test wallets.",
          },
          {
            title: "Create Custom Tokens",
            desc: "Build and launch your own SPL tokens with just a few clicks.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="relative p-8 bg-gray-50 rounded-xl border-2 border-gray-200 transition group"
          >
            {/* Gradient border on hover */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent from-blue-600 to-purple-700 bg-none pointer-events-none"
              style={{
                borderImageSlice: 1,
                borderImageSource: "linear-gradient(to right, #2563EB, #8B5CF6)"
              }}
            ></div>

            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text">
              {feature.title}
            </h3>
            <p className="text-gray-700 group-hover:text-gray-900 transition">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section
        id="about"
        className="mt-32 max-w-4xl mx-auto px-6 md:px-20 text-center"
      >
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text">
          About SolX
        </h3>
        <p className="text-gray-700 leading-relaxed">
          SolX is a next-generation Solana toolkit designed to simplify your
          crypto experience. Whether you’re a developer testing tokens or a
          creator building your next big project, SolX provides all the tools
          you need in one sleek interface.
        </p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="mt-32 mb-20 max-w-2xl mx-auto px-6 md:px-20 text-center"
      >
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text">
          Get in Touch
        </h3>
        <p className="text-gray-700 mb-6">
          Have questions or want to collaborate? Reach out to us below.
        </p>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-md bg-gray-50 border border-gray-300 focus:border-blue-500 outline-none placeholder-gray-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-md bg-gray-50 border border-gray-300 focus:border-blue-500 outline-none placeholder-gray-500"
          />
          <textarea
            rows={4}
            placeholder="Your Message"
            className="p-3 rounded-md bg-gray-50 border border-gray-300 focus:border-blue-500 outline-none placeholder-gray-500"
          ></textarea>

          <button className="bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold py-3 rounded-md hover:opacity-90 transition shadow-md">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 border-t border-gray-200">
        © {new Date().getFullYear()} SolX. All rights reserved.
      </footer>
    </div>
  );
}
