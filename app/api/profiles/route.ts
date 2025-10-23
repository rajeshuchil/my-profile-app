import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Profile from "@/models/Profile"

export async function GET() {
  try {
    await dbConnect();
    const dbProfiles = await Profile.find({}).sort({ createdAt: -1 }).lean();
    
    const cleanDbProfiles = dbProfiles.map((profile: any) => ({
      ...profile,
      _id: profile._id.toString()
    }));
    
    return NextResponse.json(cleanDbProfiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const profileData = await request.json();
    
    const newProfile = new Profile(profileData);
    await newProfile.save();
    
    return NextResponse.json({ 
      success: true, 
      profile: {
        ...newProfile.toObject(),
        _id: newProfile._id.toString()
      }
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create profile' 
    }, { status: 500 });
  }
}
