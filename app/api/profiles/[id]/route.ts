import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Profile from "@/models/Profile"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await dbConnect();
    const profile = await Profile.findById(id).lean();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const cleanProfile = {
      ...(profile as any),
      _id: (profile as any)._id.toString()
    };

    return NextResponse.json(cleanProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
