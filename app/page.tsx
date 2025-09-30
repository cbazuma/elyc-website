"use client"
import React, { useState, useEffect } from 'react';

export default function ELYCWebsite() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
      <style jsx>{`
        @keyframes glow {
          0% { text-shadow: 0 0 20px rgba(34, 197, 94, 0.8); }
          100% { text-shadow: 0 0 30px rgba(34, 197, 94, 1), 0 0 40px rgba(34, 197, 94, 0.8); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .glow-text {
          animation: glow 2s ease-in-out infinite alternate;
        }

        .kamon-custom {
          width: 30vw;
          height: 30vw;
          min-width: 150px;
          min-height: 150px;
          max-width: 300px;
          max-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 3s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.5));
        }

        .kamon {
          width: 80px;
          height: 80px;
          border: 3px solid #22c55e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%);
          animation: pulse 3s ease-in-out infinite;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Kamon Symbol */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="kamon-custom">
          <img 
            src="/kamon.png" 
            alt="ELYC Dragon Kamon" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-40 py-4 transition-all duration-300 ${
          scrollY > 100 ? 'bg-black/98 backdrop-blur-md' : 'bg-black/95 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-500 glow-text">
            ELYC | 東ロンドン８９３
          </div>
          <ul className="hidden md:flex space-x-8">
            <li>
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-green-500 transition-colors font-medium"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-green-500 transition-colors font-medium"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('philosophy')}
                className="text-white hover:text-green-500 transition-colors font-medium"
              >
                Philosophy
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-green-500 transition-colors font-medium"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center text-center relative">
        <div className="absolute inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            EAST LONDON YAKUZA COLLECTIVE
          </h1>
          <div className="text-2xl md:text-3xl text-green-500 mb-8 font-mono">
            東ロンドン８９３
          </div>
          <p className="text-xl md:text-2xl mb-12 text-gray-300">
            Where Tradition Meets Innovation
          </p>
          <button 
            onClick={() => scrollToSection('about')}
            className="inline-block px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
          >
            Join the Movement
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`fade-in ${visibleElements.has('about-text') ? 'visible' : ''}`} id="about-text">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-500">
                A Collective Movement
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  The East London Yakuza Collective is a revolutionary movement born from the heart of London's most diverse and metropolitan landscape. We are not bound by traditional structures or hierarchies of the past, but inspired by the organizational dynamics and brotherhood principles of the yakuza tradition.
                </p>
                <p>
                  In true reflection of London's multicultural spirit, we welcome individuals from all backgrounds, cultures, and walks of life. What unites us is not our origins, but our shared commitment to the values that define our collective.
                </p>
                <p>
                  Anyone can join and become part of this movement, regardless of their background, as long as they embrace our philosophy and contribute to the collective growth of our community.
                </p>
              </div>
            </div>
            <div className={`fade-in ${visibleElements.has('about-visual') ? 'visible' : ''}`} id="about-visual">
              <div className="text-center">
                <div className="text-8xl md:text-9xl font-bold text-green-500/30 mb-4">
                  ８９３
                </div>
                <div className="text-green-500 text-xl font-semibold">
                  Unity • Diversity • Innovation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 text-green-500 fade-in ${visibleElements.has('philosophy-title') ? 'visible' : ''}`} id="philosophy-title">
            Our Philosophy
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`fade-in ${visibleElements.has('values-1') ? 'visible' : ''}`} id="values-1">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-green-500/20 hover:border-green-500/40 transition-colors">
                <ul className="space-y-6">
                  <li className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-xl font-bold text-white mb-2">Giri (義理) - Duty & Loyalty</h4>
                    <p className="text-gray-300">Unwavering commitment to our collective and each other</p>
                  </li>
                  <li className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-xl font-bold text-white mb-2">Ninjo (人情) - Human Compassion</h4>
                    <p className="text-gray-300">Understanding and empathy in all our dealings</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`fade-in ${visibleElements.has('values-2') ? 'visible' : ''}`} id="values-2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-green-500/20 hover:border-green-500/40 transition-colors">
                <ul className="space-y-6">
                  <li className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-xl font-bold text-white mb-2">Makoto (誠) - Sincerity</h4>
                    <p className="text-gray-300">Authenticity and truth in all our actions</p>
                  </li>
                  <li className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-xl font-bold text-white mb-2">Jin (仁) - Benevolence</h4>
                    <p className="text-gray-300">Acting with kindness and moral righteousness</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-green-500 fade-in ${visibleElements.has('contact-title') ? 'visible' : ''}`} id="contact-title">
            Join the Collective
          </h2>
          <p className={`text-xl text-gray-300 mb-12 fade-in ${visibleElements.has('contact-subtitle') ? 'visible' : ''}`} id="contact-subtitle">
            Ready to be part of something bigger? Connect with us.
          </p>
          <div className="flex justify-center gap-12">
            <div className={`text-center fade-in ${visibleElements.has('contact-instagram') ? 'visible' : ''}`} id="contact-instagram">
              <h4 className="text-xl font-bold text-green-500 mb-4">Follow Our Movement</h4>
              <a 
                href="https://www.instagram.com/893collective" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:-translate-y-1 transition-all duration-300"
              >
                @893collective
              </a>
            </div>
            <div className={`text-center fade-in ${visibleElements.has('contact-location') ? 'visible' : ''}`} id="contact-location">
              <h4 className="text-xl font-bold text-green-500 mb-4">Location</h4>
              <p className="text-gray-300 text-lg">East London, UK</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-green-500/30">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            &copy; 2025 East London Yakuza Collective | 東ロンドン８９３ | All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}