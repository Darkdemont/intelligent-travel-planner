import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { ArrowRight, Star, Users, MapPin, Sparkles, Volume2, VolumeX } from "lucide-react";

const dotPatternSvg =
  "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

const Hero = ({ 
  darkMode, 
  videoSrc = "/video.webm",           // your public/video.webm
  posterSrc = "/assets/image.jpeg"    // optional poster
}) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-emerald-50 to-teal-50"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20" />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundImage: `url(${dotPatternSvg})` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content – bring to front */}
          <div className="relative z-20 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-6 animate-pulse">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                AI-Powered Travel Planning
              </span>
            </div>

            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Discover
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {" "}Sri Lanka{" "}
              </span>
              Like Never Before
            </h1>

            <p
              className={`text-lg md:text-xl mb-8 leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Experience personalized inbound tourism with our intelligent travel planning system.
              Let AI craft your perfect Sri Lankan adventure while optimizing costs and maximizing experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Create Custom Trip with AI</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 ${
                  darkMode
                    ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                    : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>Browse Travel Packages</span>
              </button>
            </div>

            {/* Stats – ensure on top */}
            <div className="grid grid-cols-3 gap-6 relative z-20">
              <div className="text-center">
                <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>25K+</div>
                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>50+</div>
                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Travel Packages</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>4.9★</div>
                <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content — Video (keep frame size, zoom video to fill) */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-[4/3]">
                <video
                  ref={videoRef}
                  // absolute + object-cover + scale = zoom/crop to remove letterbox
                  className="absolute inset-0 w-full h-full object-cover object-center scale-[1.3] will-change-transform"
                  playsInline
                  autoPlay
                  muted={muted}
                  loop
                  poster={posterSrc}
                >
                  <source src={videoSrc} type="video/webm" />
                  {/* Optional MP4 fallback if you add one later:
                  <source src="/videos/sri-lanka-hero.mp4" type="video/mp4" /> */}
                </video>

                {/* Mute / Unmute 
                <button
                  onClick={toggleMute}
                  className="absolute bottom-3 right-3 z-30 bg-black/60 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm"
                  aria-label={muted ? "Unmute video" : "Mute video"}
                >
                  {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>*/}
                
                {/* Overlay title */}
                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                  <div className="text-center text-white drop-shadow">
                    <MapPin className="w-14 h-14 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold">Sri Lanka Awaits</h3>
                    <p className="text-emerald-100">Your AI-crafted journey begins here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards – bring to very front */}
            <div className="absolute -top-4 -left-4 z-30 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-float">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>4.9 Rating</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 z-30 bg-emerald-500 text-white rounded-lg shadow-lg p-4 animate-float-delayed">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">50K+ Travelers</span>
              </div>
            </div>

            {/* Glow behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  darkMode: PropTypes.bool,
  videoSrc: PropTypes.string,
  posterSrc: PropTypes.string,
};

export default Hero;
