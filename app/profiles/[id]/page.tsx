"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import type { Profile } from "@/types/profile";

export default function ProfileDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ id }) => setId(id));
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profiles/${id}`);
        const data = await response.json();
        if (response.ok) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-gray-600">Profile not found</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-4 md:px-8 py-6 relative h-[240px] md:h-[280px] flex flex-col justify-between">
          <div className="flex items-start">
            <Link
              href="/"
              className="text-white flex items-center hover:underline"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H14a1 1 0 100-2H9.414l1.293-1.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-sm">Back to Profiles</span>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-4 space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center text-white">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span className="text-sm">Email</span>
              </div>

              <div className="flex items-center text-white">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span className="text-sm">Phone</span>
              </div>
            </div>
            <button className="flex items-center justify-center bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition w-full sm:w-auto">
              <span className="mr-2">📥</span> Download My Resume
            </button>
          </div>

          <div className="text-center absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2">
            <Image
              src={profile.avatar || "/placeholder.svg"}
              alt={profile.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-white mx-auto shadow-lg md:w-[140px] md:h-[140px]"
            />
          </div>
        </div>
        <div className="bg-white px-4 md:px-8 pt-16 md:pt-20 pb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {profile.name}
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-1">MCA</p>

          <button className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-4 md:px-6 py-2 rounded-full text-sm hover:from-orange-600 hover:to-orange-500 transition mt-4 flex items-center mx-auto">
            ▶ Watch my Visual Resume Now
          </button>
        </div>{" "}
        <div className="bg-white px-4 md:px-8 py-6">
          <div className="hidden md:flex justify-between items-center text-sm text-gray-600 py-4 px-8 border-2 border-gray-300 rounded-full bg-white">
            <span className="font-medium">
              Core Skills & Technical Proficiencies
            </span>
            <span className="font-medium">
              Professional Journey & Internship Roles
            </span>
            <span className="font-medium">Case Insights & Key Projects</span>
            <span className="font-medium">Learning & Academic Milestones</span>
            <span className="font-medium">
              Endorsements from Mentors & Peers
            </span>
          </div>
          <div className="md:hidden border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              Professional Portfolio
            </h2>
          </div>
        </div>
        <div className="px-4 md:px-8 py-8">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <p className="text-gray-700 leading-relaxed text-sm md:text-base px-4">
              {profile.name} is a {profile.bio.toLowerCase()} with expertise in{" "}
              {profile.skills.slice(0, 3).join(", ")}. {profile.experience} They
              have completed comprehensive case studies and research projects,
              including work on market analysis and strategic planning. Their
              academic background at TAPMI has provided them with strong
              analytical and leadership skills, making them well-equipped for
              challenging business environments.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
            <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors">
              <svg
                className="w-7 h-7 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1.05-.84 1.89-1.87 1.89-1.03 0-1.87-.84-1.87-1.89 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72H11.41c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z" />
              </svg>
            </div>

            <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors">
              <svg
                className="w-7 h-7 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z" />
              </svg>
            </div>

            <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors">
              <svg
                className="w-7 h-7 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z" />
              </svg>
            </div>

            <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors">
              <svg
                className="w-7 h-7 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z" />
              </svg>
            </div>

            <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors">
              <svg
                className="w-7 h-7 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.14,7.5A2.86,2.86 0 0,1 22,10.36V14.14A2.86,2.86 0 0,1 19.14,17H12C12,17.39 12.32,17.96 12.71,17.96H17V19.64A2.86,2.86 0 0,1 14.14,22.5H9.86A2.86,2.86 0 0,1 7,19.64V15.89C7,14.31 8.28,13.04 9.86,13.04H15.11C16.69,13.04 17.96,11.76 17.96,10.18V4.93C17.96,3.35 16.69,2.07 15.11,2.07H8.89C7.31,2.07 6.04,3.35 6.04,4.93V7.5H19.14M9.75,3.32A0.68,0.68 0 0,1 10.43,4A0.68,0.68 0 0,1 9.75,4.68A0.68,0.68 0 0,1 9.07,4A0.68,0.68 0 0,1 9.75,3.32M2.86,9.5A2.86,2.86 0 0,0 0,12.36V16.14A2.86,2.86 0 0,0 2.86,19H10C10,18.61 9.68,18.04 9.29,18.04H5V16.36C5,14.78 6.28,13.5 7.86,13.5H2.86V9.5M14.25,19.32A0.68,0.68 0 0,1 13.57,20A0.68,0.68 0 0,1 14.25,20.68A0.68,0.68 0 0,1 14.93,20A0.68,0.68 0 0,1 14.25,19.32Z" />
              </svg>
            </div>

            <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors">
              <svg
                className="w-7 h-7 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12,1.85C11.73,1.85 11.45,1.92 11.22,2.05L3.78,6.35C3.32,6.61 3,7.12 3,7.66V16.34C3,16.88 3.32,17.39 3.78,17.65L11.22,21.95C11.45,22.08 11.73,22.15 12,22.15C12.27,22.15 12.55,22.08 12.78,21.95L20.22,17.65C20.68,17.39 21,16.88 21,16.34V7.66C21,7.12 20.68,6.61 20.22,6.35L12.78,2.05C12.55,1.92 12.27,1.85 12,1.85M12,3.79L18.5,7.66V16.34L12,20.21L5.5,16.34V7.66L12,3.79Z" />
              </svg>
            </div>

            <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors">
              <svg
                className="w-7 h-7 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4.07C15.36,4.07 18.24,6.5 18.93,9.64C16.15,9.64 13.87,9.64 12.93,9.64C12.93,8.17 12.93,6.97 12.93,4.64C12.64,4.36 12.32,4.07 12,4.07M11.07,4.64V9.64C8.13,9.64 5.85,9.64 5.07,9.64C5.76,6.5 8.64,4.07 12,4.07C11.68,4.07 11.36,4.36 11.07,4.64M5.07,10.36H11.07V19.93C8.64,19.93 5.76,17.5 5.07,14.36C5.07,13.1 5.07,11.62 5.07,10.36M12.93,10.36H18.93C18.93,11.62 18.93,13.1 18.93,14.36C18.24,17.5 15.36,19.93 12,19.93C12.32,19.93 12.64,19.64 12.93,19.36V10.36Z" />
              </svg>
            </div>

            <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors">
              <svg
                className="w-7 h-7 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2.6,10.59L8.38,4.8L10.07,6.5C9.83,7.35 10.22,8.28 11,8.73V14.27C10.4,14.61 10,15.26 10,16A2,2 0 0,0 12,18A2,2 0 0,0 14,16C14,15.26 13.6,14.61 13,14.27V9.41L15.07,11.5C15,11.65 15,11.82 15,12A2,2 0 0,0 17,14A2,2 0 0,0 19,12A2,2 0 0,0 17,10C16.82,10 16.65,10 16.5,10.07L13.93,7.5C14.19,6.57 13.71,5.55 12.78,5.16C12.35,5 11.9,5 11.5,5.16C10.94,5.4 10.5,5.95 10.41,6.62L8.34,4.56C8.22,4.44 8.06,4.37 7.89,4.37C7.72,4.37 7.56,4.44 7.44,4.56L2.6,9.4C2.37,9.63 2.37,10 2.6,10.22L7.44,15.06C7.56,15.19 7.72,15.25 7.89,15.25C8.06,15.25 8.22,15.19 8.34,15.06L10.22,13.18L7.9,10.87L2.6,10.59Z" />
              </svg>
            </div>
          </div>

          <div className="mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-left">
                Case Insights & Key Projects
              </h2>
              <div className="bg-gray-100 rounded-full p-1 flex mx-auto md:mx-0 w-fit">
                <button className="px-3 md:px-4 py-2 bg-white text-gray-700 rounded-full text-xs md:text-sm font-medium shadow-sm transition-all">
                  Case Studies
                </button>
                <button className="px-3 md:px-4 py-2 text-gray-500 text-xs md:text-sm font-medium transition-all hover:text-gray-700">
                  Projects
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center relative">
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">
                          OC
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">⚙️</div>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                    ONGC Case Study
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    Strategic analysis of India's largest oil and gas
                    exploration company
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="h-40 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center relative">
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-cyan-600 font-bold text-sm">
                          JJ
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">💧</div>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                    Jal Jeevan Mission Case Study
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    Impact assessment of rural water supply program
                    implementation
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="h-40 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center relative">
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-sm">
                          FT
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">📱</div>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                    FinTech Case Study
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    Digital payment solutions and financial inclusion analysis
                  </p>
                </div>
              </div>
            </div>
          </div>

          {profile.videoUrl && (
            <div className="mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
                Visual Resume
              </h2>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={profile.videoUrl}
                    title="Visual Resume"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="py-8 md:py-12 px-4 md:px-8 bg-zinc-100">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-center px-6 md:px-8 py-8 md:py-12 rounded-3xl shadow-lg">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8">
              Connect with {profile.name}
            </h2>
            <div className="flex justify-center">
              <button className="bg-white text-orange-600 font-medium px-4 md:px-6 py-2 rounded-full hover:bg-orange-50 transition shadow-lg text-xs md:text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download My Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 px-4 md:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center py-4 px-8 border-2 border-gray-300 rounded-full bg-white">
            <div className="flex items-center text-gray-600 hover:text-gray-800 transition cursor-pointer">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-sm">Email</span>
            </div>

            <div className="flex items-center text-gray-600 hover:text-gray-800 transition cursor-pointer">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-sm">Phone</span>
            </div>

            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition cursor-pointer">
              <svg
                className="w-4 h-4 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition cursor-pointer">
              <svg
                className="w-4 h-4 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
