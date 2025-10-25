"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-16 py-6 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <h1 className="text-2xl md:text-3xl font-bold">SolX</h1>

        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#features" className="hover:text-blue-200 transition">Features</a>
          <a href="#about" className="hover:text-blue-200 transition">About</a>
          <a href="#contact" className="hover:text-blue-200 transition">Contact</a>
        </nav>

        <button className="md:hidden text-2xl text-blue-200">☰</button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-6 md:px-20">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
          Power Your Solana Journey with{" "}
          <span className="bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
            SolX
          </span>
        </h2>

        <p className="mt-5 text-gray-200 text-lg max-w-2xl">
          The ultimate toolkit to send SOL, airdrop tokens, and create your own
          digital assets — all in one place.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition shadow-lg">
              Get Started
            </button>
          </Link>

          <button className="border border-white/30 px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition">
            Learn More
          </button>
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
            className="bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition shadow-md hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">
              {feature.title}
            </h3>
            <p className="text-gray-200">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section
        id="about"
        className="mt-32 max-w-4xl mx-auto px-6 md:px-20 text-center"
      >
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">
          About SolX
        </h3>
        <p className="text-gray-200 leading-relaxed">
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
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">
          Get in Touch
        </h3>
        <p className="text-gray-200 mb-6">
          Have questions or want to collaborate? Reach out to us below.
        </p>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-md bg-white/10 border border-white/20 focus:border-blue-300 outline-none placeholder-gray-300"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-md bg-white/10 border border-white/20 focus:border-blue-300 outline-none placeholder-gray-300"
          />
          <textarea
            rows={4}
            placeholder="Your Message"
            className="p-3 rounded-md bg-white/10 border border-white/20 focus:border-blue-300 outline-none placeholder-gray-300"
          ></textarea>

          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-md hover:opacity-90 transition shadow-lg">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-200 border-t border-white/20">
        © {new Date().getFullYear()} SolX. All rights reserved.
      </footer>
    </div>
  );
}
