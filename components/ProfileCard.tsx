"use client";

import Link from "next/link";
import Image from "next/image";
import type { Profile } from "@/types/profile";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link href={`/profiles/${profile._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="bg-orange-500 h-24"></div>
        <div className="px-6 pb-6 pt-0 flex flex-col items-center">
          <div className="relative -mt-12 mb-4">
            <Image
              src={profile.avatar || "/placeholder.svg"}
              alt={profile.name}
              width={80}
              height={80}
              className="rounded-full border-4 border-white bg-gray-200"
            />
          </div>
          <h3 className="text-lg font-bold text-gray-900 text-center">
            {profile.name}
          </h3>
          <p className="text-sm text-orange-500 font-medium text-center mb-3">
            {profile.education.split(",")[0]}
          </p>
          <p className="text-sm text-gray-600 text-center line-clamp-2">
            {profile.bio}
          </p>
          <div className="flex gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
