"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import type { Profile } from "@/types/profile";

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/profiles");
        const data = await response.json();
        if (response.ok) {
          setProfiles(data);
        }
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.education.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-700 text-center md:text-left"></h1>
          <a
            href="/add-profile"
            className="bg-orange-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-orange-700 transition text-center text-sm md:text-base"
          >
            + Add Profile
          </a>
        </div>

        <div className="mb-6 md:mb-8">
          <input
            type="text"
            placeholder="Search profiles by name or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
          />
        </div>

        {loading ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-gray-600">Loading profiles...</p>
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-gray-600">No profiles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile._id} profile={profile} />
            ))}
          </div>
        )}

        <section className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            About TAPAI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500 rounded-lg mx-auto mb-4"></div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                Expert Talent
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Discover talented professionals across design, research, and
                product management.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-500 rounded-lg mx-auto mb-4"></div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                Proven Track Record
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                View case studies and projects that showcase real-world impact
                and results.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-500 rounded-lg mx-auto mb-4"></div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                Easy Connection
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Connect directly with professionals and explore collaboration
                opportunities.
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold mb-4">TAPMI Bengaluru</h3>
              <p className="text-gray-300 text-sm md:text-base mb-4">
                A constituent of MAHE, Manipal - Leading business school
                committed to excellence in management education and research.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">L</span>
                </div>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">I</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    About TAPMI
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Faculty
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Research
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Alumni
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-sm md:text-base text-gray-300">
                <p>TAPMI Campus</p>
                <p>Manipal Academy of Higher Education</p>
                <p>Bengaluru, Karnataka</p>
                <p className="mt-4">
                  <span className="font-semibold">Email:</span>
                  <br />
                  info@tapmi.edu.in
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 TAPMI Bengaluru. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm transition"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm transition"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm transition"
              >
                Accreditation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
