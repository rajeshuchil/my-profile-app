import mongoose, { Schema, type Document } from "mongoose"
import type { Profile } from "@/types/profile"

interface ProfileDocument extends Omit<Profile, '_id'>, Document {}

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String },
  description: { type: String, required: true }
}, { _id: false })

const ProfileSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    avatar: {
      type: String,
      required: [true, "Please provide an avatar URL"],
    },
    bio: {
      type: String,
      required: [true, "Please provide a bio"],
    },
    education: {
      type: String,
      required: [true, "Please provide education"],
    },
    skills: {
      type: [String],
      required: [true, "Please provide skills"],
    },
    experience: {
      type: String,
      required: [true, "Please provide experience"],
    },
    projects: {
      type: [ProjectSchema],
      required: [true, "Please provide projects"],
    },
    linkedin: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Profile || mongoose.model<ProfileDocument>("Profile", ProfileSchema)
