"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/tapmi-bengaluru-logo2.png"
            alt="TAPMI Bengaluru Campus, a constituent of MAHE, Manipal"
            width={200}
            height={50}
            priority
          />
        </div>

        <div className="flex items-center">
          <Image
            src="/accreditation-logos-combined.png"
            alt="PRME - Principles for Responsible Management Education"
            width={200}
            height={100}
          />
        </div>
      </div>
    </header>
  );
}
