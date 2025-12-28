import { title } from 'process';
import { Experience, Project, SkillCategory, Education, Certification, GalleryItem } from './types';
import { Linkedin, Mail, FileText, Phone, Instagram, Github } from 'lucide-react';

export const RESUME_URL = `https://drive.google.com/uc?export=download&id=${import.meta.env.VITE_RESUME_FILE_ID}`;
export const ENABLE_FIDGET_SPINNER = false; // Set to false to disable interactive spinning (idle animation remains)

export const METADATA = {
  title: "Novia Citra Andini",
  description: "Portfolio of Novia Citra Andini, a Data Scientist and Analyst specializing in AI, Machine Learning, and Business Intelligence.",
  image: "/assets/profile/profile.png",
  url: "https://portfolio-noviacitra.vercel.app/",
  type: "website",
  twitterCard: "summary_large_image"
};

// Profile Background Style Options:
// 'MATH_GRID'       : Coordinate dots, technical look (Best for Math/Data Science)
// 'ABSTRACT_FLUID'  : Soft blobs, artistic gradients
// 'TECH_CIRCUIT'    : Tech Ring / Circuit pattern (Data Science Theme)
// 'GRADIENT_MESH'   : Vibrant multi-color mesh gradient
// 'GEOMETRIC_SHAPES': Floating geometric shapes (Triangle, Circle, Square)
export const PROFILE_BACKGROUND_STYLE: 'MATH_GRID' | 'ABSTRACT_FLUID' | 'TECH_CIRCUIT' | 'GRADIENT_MESH' | 'GEOMETRIC_SHAPES' = 'TECH_CIRCUIT';

export const PROJECTS_DESCRIPTION = "A showcase of my key projects demonstrating expertise in AI model development, data analysis, and machine learning applications across various domains.";
export const CERTIFICATIONS_DESCRIPTION = "A testament to technical expertise in AI & Data Science, complemented by recognition in public speaking and scientific communication.";
export const GALLERY_DESCRIPTION = "A visual journey through academic milestones, professional speaking engagements, and impactful community contributions.";
export const CONTACT_TITLE = "Contact Me";
export const CONTACT_DESCRIPTION = " Feel free to reach out for collaborations, new projects, general inquiries, or business partnerships.";

export const ABOUT_DETAILS = {
  subtitle: "Data Scientist & Analyst",
  introduction: "I am a Mathematics graduate from Mataram University with a strong foundation in analytical thinking and problem-solving. My passion lies in Data Science, Machine Learning, and Business Intelligence, where I apply mathematical rigor to build AI models and derive actionable insights from complex data. Beyond technical skills, I am an experienced public speaker and moderator, adept at communicating technical concepts to diverse audiences.",
  highlights: [
    "Expertise in Python, SQL, & Power BI",
    "Machine Learning (YOLO, LSTM, SVM)",
    "Mathematics Graduate (GPA 3.36/4.00)",
    "Public Speaking & Leadership"
  ],
  quickStats: [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Completed", value: "5+" },
    { label: "Certifications", value: "10+" },
    { label: "GPA", value: "3.36" }
  ],
  buttonText: "View Projects"
};

export const PERSONAL_INFO = {
  name: "Novia Citra Andini",
  firstName: "Novia Citra", // First line of name in Hero
  lastName: "Andini", // Second line of name in Hero
  logo: "Novia", // Logo text in Navbar
  role: "Data Analyst | Data Scientist | Mathematics Graduate | Public Speaker | Moderator", // Static role for SEO/Metadata
  typingRoles: ["Data Analyst", "Data Scientist", "General Affair", "Data Entry", "Research and Development", "Assistant", "Public Speaker", "Moderator"], // Roles for the typing animation
  email: import.meta.env.VITE_EMAIL || "",
  linkedin: import.meta.env.VITE_LINKEDIN_URL || "",
  profileImage: "assets/profile/profile.png", // Replace with your actual photo URL
  about: "Mathematics graduate from Mataram University blending analytical rigor with strong communication skills. Passionate about Data Science, Machine Learning, and Business Intelligence, with proven experience in building AI models and handling large-scale data. A confident public speaker and moderator, capable of translating complex technical insights into clear, actionable strategies."
};

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: PERSONAL_INFO.linkedin },
  { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/novia0315" },
  { 
    name: 'Email', 
    icon: <Mail className="w-5 h-5" />, 
    href: `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent("Diskusi Kerjasama")}` 
  },
  { 
    name: 'WhatsApp', 
    icon: <Phone className="w-5 h-5" />, 
    href: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}` 
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    role: "Intern Research and Development",
    company: "Jadi Maju",
    period: "Nov 2025 - Present",
    description: [
      "Performed sentiment analysis from 34 program databases.",
      "Identified patterns in participant feedback and translated insights into reports.",
      "Conducted market research for new class themes."
    ]
  },
  {
    id: '2',
    role: "Researcher & Speaker",
    company: "Mataram University",
    period: "Dec 2024 - Jul 2025",
    description: [
      "Developed YOLOv7 object detection model for Anthracnose pests (94% accuracy).",
      "Compared LSTM vs Backpropagation for Solana price prediction (LSTM achieved 96% accuracy)."
    ]
  },
  {
    id: '3',
    role: "Intern (Communication Division)",
    company: "PT PLN (Persero) Unit Induk Wilayah NTB",
    period: "Jul 2024 - Aug 2024",
    description: [
      "Archived 40,000+ local TV running text records and media publications using Excel."
    ]
  },
  {
    id: '4',
    role: "Teaching Assistant",
    company: "Mataram University",
    period: "Sep 2023 - Dec 2024",
    description: [
      "Assisted 154 students in Programming Algorithms and Database courses."
    ]
  },
  // moderator
  {
    id: '5',
    role: "Moderator",
    company: "Mataram University",
    period: "2022 - 2024",
    description: [
      "Moderated 5+ events including Mental Health Fest, Python Training for Data Science, and Workshop on Digital Startup Competition with 300+ participants."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: "Anthracnose Pest Detection on Chili",
    role: "Researcher",
    date: "2025",
    description: [
      "Developed an object detection model using YOLOv7 to identify Anthracnose pests on chili plants.",
    ],
    tags: ["YOLOv7", "Python", "Computer Vision", "Research"],
    image: "assets/experience/chili_yolov7/chili_yolov7.png"
  },
  {
    id: 'p2',
    title: "Solana Price Prediction",
    role: "Researcher",
    date: "2025",
    description: [
      "Compared LSTM and Backpropagation Neural Networks for predicting Solana cryptocurrency prices.",
    ],
    tags: ["LSTM", "Neural Networks", "Python", "Financial Analysis"],
    image: "assets/experience/solana/output.png"
  },
  {
    id: 'p3',
    title: " Breast Cancer Prediction App",
    role: "Developer",
    date: "2024",
    description: [
      "Developed a breast cancer prediction application using SVM Algorithms as a Capstone Project at BISA AI.",
    ],
    tags: ["SVM", "Machine Learning", "Health AI", "Python"],
    image: "assets/experience/breast_cancer/breast_cancer.png"
  },
  {
    id: 'p4',
    title: "Internship (Communication Division) at PT PLN (Persero) Unit Induk Wilayah NTB",
    role: "Intern",
    date: "2024",
    description: [
      "Archived over 40,000 local TV running text records and media publications using Excel during internship at PT PLN (Persero) Unit Induk Wilayah NTB.",
    ],
    tags: ["Data Management", "Excel", "Internship"],
    image: "assets/experience/pln/pln.png"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Hard Skills",
    items: [
      "Python", "SQL", "Power BI", "Google Looker", "Excel", "Canva"
    ]
  },
  {
    category: "Core Concepts",
    items: [
      "Data Analysis", "Machine Learning (YOLO, LSTM, SVM)", "AI Model Development", "Market Research"
    ]
  },
  {
    category: "Soft Skills",
    items: [
      "Communication", "Public Speaking", "Leadership", "Problem Solving"
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "Mataram University",
    degree: "Bachelor Degree in Mathematics",
    period: "Aug 2021 - Jul 2025",
    gpa: "3.36/4.00",
    details: [
      "Fresh graduate with a strong interest in Data Science and Machine Learning."
    ],
    image: "/assets/education/logo_unram.png"
  },
  {
    institution: "BISA AI Academy",
    degree: "Independent Study MSIB 6 Data Science",
    period: "2024",
    gpa: "Score 96/100",
    details: [
      "Completed Independent Study in Data Science with a score of 96/100."
    ],
    image: "/assets/education/logo_bisaai.png"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'c1',
    title: "CertNexus AIBIZ™ Credential",
    issuer: "CertNexus",
    date: "Oct 2024",
    image: "/assets/certificates/certnexus/aibiz.jpg",
    hoverText: "Successfully obtained the AIBIZ™ credential from CertNexus",
    link:"https://certifications.certnexus.com/1fc2521e-5cb3-4ace-86e2-5db043be94e3#acc.Wmc1ix9w"
  },
  {
    id: 'c2',
    title: "CertNexus DSBIZ™ Credential",
    issuer: "CertNexus",
    date: "Jul 2024",
    image: "/assets/certificates/certnexus/dsbiz.png",
    hoverText: "Successfully obtained the DSBIZ™ credential from CertNexus",
    link:"https://www.credential.net/ebed4275-99c4-458d-bdab-3614dc4ee56f#acc.nl2wkINj"
  },
  {
    id: 'c3',
    title: "Finalist, Science and Technology National Competition 2024",
    issuer: "National Competition",
    date: "Oct 2024",
    image: "assets/certificates/finalist_national_seminar/Finalist Karya Ilmiah.jpg",
    hoverText: "Became a finalist in the national seminar for participation in the Science And Technology National Competition 2024 in the Scientific Writing category",
  },
  {
    id: 'c4',
    title: "Independent Study MSIB 6 Data Science",
    issuer: "BISA AI Academy",
    date: "Jun 2024",
    image: "assets/certificates/msib_6/MSIB 6.png",
    hoverText: "Completed Independent Study in Data Science from BISA AI Academy"
  },
  {
    id: 'c5',
    title: "Journal Review Session Presenter",
    issuer: "Mataram University",
    date: "Dec 2024",
    image: "assets/certificates/national_seminar_presenter/national_seminar_presenter.jpg",
    hoverText: "Became a presenter at the National Seminar at Mataram University"
  },
  {
    id: 'c6',
    title: "Mental Health Fest Moderator",
    issuer: "Mataram University",
    date: "Nov 2022",
    image: "assets/certificates/mental_health_fest_moderator/Moderator Mental Health Fest.jpg",
    hoverText: "Served as the moderator for the Mental Health Fest event held at Mataram University"
  },
  {
    id: 'c7',
    title: "Python Training for Data Science Moderator",
    issuer: "Mataram University",
    date: "Sep 2023",
    image: "assets/certificates/python_training_data_science_moderator/Moderator Python Training.jpg",
    hoverText: "Served as the moderator for the Python Training for Data Science workshop at Mataram University"
  },
  {
    id: 'c8',
    title: "Secretary OPTION",
    issuer: "Mataram University",
    date: "2022",
    image: "assets/certificates/secretary_option/Sekretaris OPTION.jpg",
    hoverText: "Served as the secretary of the OPTION organization at Mataram University"
  },
  {
    id: 'c9',
    title: "WDSC Moderator",
    issuer: "Mataram University",
    date: "Jul 2022",
    image: "assets/certificates/wdsc_moderator/Moderator WDSC.jpg",
    hoverText: "Served as the moderator for the Workshop and Digital Startup Competition 2022 at Mataram University"
  },
  {
    id: 'c10',
    title: "Webinar Speaker at BISA AI Academy",
    issuer: "BISA AI Academy",
    date: "Mar 2022",
    image: "assets/certificates/webinar_speaker_bisaai/Sertif Pemateri 1.png",
    hoverText: "Delivered a webinar on Quality Control Statistics at BISA AI Academy"
  },
  {
    id: 'c11',
    title: "Webinar Speaker at BISA AI Academy",
    issuer: "BISA AI Academy",
    date: "Mar 2022",
    image: "assets/certificates/webinar_speaker_bisaai/Sertif Pemateri 2.png",
    hoverText: "Delivered a webinar on Quality Control Attributes at BISA AI Academy"}
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: "Graduation Day",
    description: "Celebrating the completion of my Bachelor's degree in Mathematics at Mataram University",
    images: ["assets/gallery/graduate/1.jpg", "assets/gallery/graduate/2.jpg", "assets/gallery/graduate/3.jpg", "assets/gallery/graduate/4.jpg", "assets/gallery/graduate/5.jpg", "assets/gallery/graduate/6.jpg" ]

  },
  {
    id: 'g2',
    title: "Webinar Speaker at BISA AI Academy",
    description: "Delivering a webinar on Quality Control Statistics at BISA AI Academy",
    images: ["assets/gallery/webinar_bisaai/1.png", "assets/gallery/webinar_bisaai/2.png"]
  },
  {
    id: 'g3',
    title: "Workshop and Digital Startup Competition 2022",
    description: "Startup Optimization for Creative Tech Business in Society 5.0",
    images: ["assets/gallery/wdsc/1.png", "assets/gallery/wdsc/2.png", "assets/gallery/wdsc/3.jpg", "assets/gallery/wdsc/4.jpg"]
  },
  {
    id: 'g4',
    title: " Workshop Python Training for Data Science",
    description: "Becoming the MC for Python Training for Data Science workshop at Mataram University",
    images: ["assets/gallery/python_data_science/1.jpg", "assets/gallery/python_data_science/2.jpg", "assets/gallery/python_data_science/3.jpg"]
  },
  {
    id: 'g5',
    title: "Internship at PT PLN (Persero) Unit Induk Wilayah NTB",
    description: "Completed internship program at PT PLN (Persero) Unit Induk Wilayah NTB, gaining practical experience in the energy sector",
    images: ["assets/gallery/pkl_pln/1.jpg", "assets/gallery/pkl_pln/2.jpg"]
  },
  {
    id: 'g6',
    title: "Journal Review Session",
    description: "Presented a journal review session at Mataram University, exploring machine learning in research and applications",
    images: ["assets/gallery/journal_review/1.jpg", "assets/gallery/journal_review/2.jpg", "assets/gallery/journal_review/3.jpg"]
  },
  {
    id: 'g7',
    title: "Loka Karya Gamatika Coding Club 2025",
    description: "Presented at the Gamatika Coding Club workshop at Mataram University on 'Computation for Solutions: Computational Mathematics for Real World Problems'",
    images: ["assets/gallery/loka_karya/pamflet_loka_karya.jpg"]
  },
  {
    id: 'g8',
    title: "Sharing Session at Gamatika Coding Club 2025",
    description: "Sharing session at Gamatika Coding Club on 'Growing Further with Internships and Independent Studies'",
    images: ["assets/gallery/sharing_session/pamflet_sharing_session.jpg"]
  },
  {
    id: 'g9',
    title: "Finalist, Science and Technology National Competition 2024",
    description: "Became a finalist in the national seminar for participation in the Science And Technology National Competition 2024 in the Scientific Writing category organized by the Mathematics Student Association FMIPA Sriwijaya University on October 30, 2024",
    images: ["assets/gallery/national_seminar/national_seminar.jpg"]
  },
  {
    id: 'g10',
    title: "Mental Health Fest Moderator",
    description: "Served as the moderator for the Mental Health Fest event held at Mataram University, facilitating discussions on mental health awareness and support",
    images: ["assets/gallery/mental_health_fest/mental_health_fest.jpg"]
  },
 
  {    
    id: 'g11',
    title: "Teaching Assistant Role",
    description: "Serving as a Teaching Assistant for the Programming Algorithms and Database courses at Mataram University",
    images: ["assets/gallery/asdos/asdos.jpg"]
  }


];

// Select which gallery items to show in the carousel by ID
const CAROUSEL_IDS = ['g1', 'g3', 'g4','g10'];

export const CAROUSEL_ITEMS: GalleryItem[] = CAROUSEL_IDS.map(id => 
  GALLERY.find(item => item.id === id)
).filter((item): item is GalleryItem => item !== undefined);