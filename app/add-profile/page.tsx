"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import type { Profile } from "@/types/profile";

export default function AddProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({
    name: "",
    avatar: "",
    bio: "",
    education: "",
    skills: [],
    experience: "",
    projects: [],
    linkedin: "",
    videoUrl: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, avatar: data.url }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSkillsChange = (value: string) => {
    const skills = value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, skills }));
  };

  const handleProjectsChange = (value: string) => {
    const projects = value
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [title, description] = line.split(":").map((s) => s.trim());
        return {
          title: title || line,
          description: description || "",
          link: "",
        };
      });
    setFormData((prev) => ({ ...prev, projects }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to create profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-orange-700 mb-8">
          Add New Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              {formData.avatar && (
                <img
                  src={formData.avatar}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              {imageUploading && (
                <span className="text-orange-600">Uploading...</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio *
            </label>
            <textarea
              required
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education *
            </label>
            <input
              type="text"
              required
              value={formData.education}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, education: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills (comma-separated) *
            </label>
            <input
              type="text"
              required
              placeholder="React, Node.js, MongoDB"
              onChange={(e) => handleSkillsChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience *
            </label>
            <textarea
              required
              value={formData.experience}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, experience: e.target.value }))
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projects (one per line, format: "Title: Description")
            </label>
            <textarea
              placeholder={`Project 1: Built a web application\nProject 2: Designed mobile UI`}
              onChange={(e) => handleProjectsChange(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn URL (optional)
            </label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, linkedin: e.target.value }))
              }
              placeholder="https://www.linkedin.com/in/yourname"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Resume URL (optional)
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
