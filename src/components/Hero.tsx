"use client";
import React from "react";
import { Boxes } from "./acernity/BoxesCore";
import FormInput from "./FormInput";

export function Hero() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center rounded-lg bg-slate-900 relative overflow-hidden p-6">
      {/* Background Overlay */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />

      {/* Nội dung Hero */}
      <div className="relative z-20 flex flex-col items-center text-center">
        <h1 className="md:text-4xl text-xl text-white">
          Duckilot Web Research
        </h1>
        <p className="text-neutral-300 mt-2">Web searching made easy</p>

        {/* Form Input Lồng Bên Trong */}
        <div className="mt-6 w-full max-w-md">
          <FormInput />
        </div>
      </div>
    </div>
  );
}

export default Hero;
