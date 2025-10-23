import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Profile from "@/models/Profile"

const seedData = [
  {
    name: 'Saksham Arora',
    avatar: 'https://i.pravatar.cc/150?img=15',
    bio: 'Marketing enthusiast with a passion for branding and storytelling.',
    education: 'MBA, TAPMI',
    skills: ['Marketing Strategy', 'Branding', 'Communication'],
    experience: 'Interned at HUL for brand management.',
    projects: [
      { 
        title: 'Case Study: ONGC', 
        description: 'Analyzed strategic growth initiatives.',
        link: '#'
      },
      { 
        title: 'Case Study: Jal Jeevan Mission', 
        description: 'Studied rural water delivery impact.',
        link: '#'
      },
    ],
    linkedin: 'https://www.linkedin.com/in/sakshamarora/',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    name: 'Priya Sharma',
    avatar: 'https://i.pravatar.cc/150?img=25',
    bio: 'UX Researcher dedicated to understanding user trends and behaviors.',
    education: 'MBA, TAPMI',
    skills: ['UX Research', 'Data Analysis', 'User Testing'],
    experience: 'Worked on multiple UX research projects.',
    projects: [
      { 
        title: 'User Research Study', 
        description: 'Conducted comprehensive user behavior analysis.',
        link: '#'
      },
    ],
    linkedin: 'https://www.linkedin.com/in/priyasharma/',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    name: 'Rahul Verma',
    avatar: 'https://i.pravatar.cc/150?img=35',
    bio: 'Product Manager building products that users love.',
    education: 'MBA, TAPMI',
    skills: ['Product Strategy', 'Analytics', 'Leadership'],
    experience: 'Led product teams at tech startups.',
    projects: [
      { 
        title: 'Product Launch', 
        description: 'Successfully launched a mobile app with 10K+ users.',
        link: '#'
      },
    ],
    linkedin: 'https://www.linkedin.com/in/rahulverma/',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
]

export async function POST() {
  try {
    await dbConnect()

    const existingCount = await Profile.countDocuments()
    if (existingCount > 0) {
      return NextResponse.json({
        message: "Database already has profiles",
        count: existingCount
      })
    }

    const profiles = await Profile.insertMany(seedData)

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      data: profiles,
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 })
  }
}
