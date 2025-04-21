'use client'; 

import React, { useState, useRef, useEffect } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function HomePage() {
  const disableRightClick = (e) => {
    e.preventDefault();
  };

  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05; // Set the desired volume (0.0 to 1.0)
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.muted = false;
        audioRef.current.play();
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">
      {/* Audio Player */}
      <audio ref={audioRef} loop>
        <source src="/audio/music.mp3" type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>

      {/* Context Menu */}
      <Sheet>
        <SheetTrigger className="absolute top-4 left-4 z-10">
          <Menu className="w-6 h-6 text-white" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-800 text-white outline-none">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Menu</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>

      {/* Fullscreen Video Container */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          onContextMenu={disableRightClick}
        >
          <source src="/videos/static2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Text Over the Video */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-3xl font-bold bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
          <h1>Your Text Here</h1>
          <p>This is some additional text</p>
        </div>
      </div>

      {/* Mute Icon at the Bottom of the Page */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <img 
          src={isMuted ? "/images/mute-32.png" : "/images/unmute-32.png"} 
          alt="Mute/Unmute Icon" 
          className="w-10 h-10 cursor-pointer" 
          onClick={toggleMute}
        />
      </div>
    </main>
  );
}
