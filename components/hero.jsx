"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const HeroSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (videoElement) {
        if (scrollPosition > scrollThreshold) {
          videoElement.classList.add("scrolled");
        } else {
          videoElement.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-40 pb-20 px-4 bg-yellow-200">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl md:text-8xl lg:text-[90px] pb-6 gradient-title">
          Where Intelligent Accounting <br /> Meets Financial Clarity
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Track, analyze, and understand your finances with AI-powered insights
          built on professional accounting workflows.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="https://www.youtube.com">
            <Button size="lg" variant="outline" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={videoRef} className="hero-image">
            <video
            src="/herovideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-lg shadow-2xl border mx-auto w-full h-auto"
            />
          </div>
      </div>
      </div>
    </section>
  );
};

export default HeroSection;
