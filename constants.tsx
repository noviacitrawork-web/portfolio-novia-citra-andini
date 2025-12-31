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
    "Expertise in Python & Power BI",
    "Machine Learning (YOLO, LSTM, SVM)",
    "Mathematics Graduate (GPA 3.36/4.00)",
    "Public Speaking & Leadership"
  ],
  quickStats: [
    { label: "Years Experience", value: "1+" },
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
  about: "Mathematics graduate with a strong foundation in data handling, structured analysis, and clear communication. Experienced in documentation, workflow mapping, and presenting ideas effectively to technical and non-technical audiences."
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
      "Performed sentiment analysis on participant feedback by extracting, cleaning, and consolidating data from 34 program databases.",
      "Identified patterns in positive–negative sentiment, participant suggestions, and recurring challenges, and translated insights into structured analytical reports.",
      "Conducted market and content research on new class themes, potential speakers, and relevant tools, and built a structured research database to support curriculum and product development."
    ]
  },
  {
    id: '2',
    role: "Researcher & Speaker",
    company: "Mataram University",
    period: "Dec. 2024 - Jul. 2025",
    description: [
      "Developed and presented an object detection model (YOLOv7) at a National Seminar to identify Anthracnose pests on chili.",
      "Achieved 94% detection accuracy through dataset annotation and image preparation for model training.",
      "Analyzed and trained neural network models (LSTM vs. Backpropagation) to predict Solana price time series data.",
      "Presented the model comparison at a National Seminar, demonstrating the LSTM model achieved 96% accuracy, outperforming Backpropagation"
    ]
  },
  {
    id: '3',
    role: "Internship",
    company: "PT. PLN (Persero) Unit Induk Wilayah NTB",
    period: "Jul. 2024 - Dec. 2024",
    description: [
      "Recorded and archived PLN media publications (social media, newspapers) using Microsoft Excel to facilitate monitoring and reporting processes.",
      "Compiled and archived over 40,000 local TV running text broadcast records using Microsoft Excel, ensuring organized and accessible data documentation."
    ]
  },
  {
    id: '4',
    role: "Teaching Assistant",
    company: "Mataram University",
    period: "Sep. 2023 - Dec. 2024",
    description: [
      "Assisted 154 students in Programming Algorithms and Database courses, achieving over a 90% pass rate in laboratory sessions.",
      "Designed Database practical modules focused on data visualization and interactive dashboard development using Power BI.",
      "Supervised final data visualization projects, leading two students to obtain copyright certificates for their work.",
      "Taught algorithmic concepts and guided Python implementation to improve student understanding of programming exercises."
    ]
  },
  {
    id: '5',
    role: "Moderator",
    company: "Mataram University",
    period: "Sep. 2023 - Dec. 2024",
    description: [
      "Guided the National Digital Start-Up Competition (3 days), managing event flow and Q&A sessions for 100+ participants.",
      "Facilitated the Mental Health Festival, moderating discussions and creating interactive dialogue for 40+ participants.",
      "Led the \"Python Training for Data Science\" seminar, guiding technical sessions and Q&A to ensure effective knowledge transfer to 70+ participants."
    ]
  }

];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: "Intelligent Anthracnose Detection on Chili Peppers Using YOLOv7",
    role: "Researcher",
    date: "2025",
    description: [
      "This project developed a *YOLOv7-based object detection model* to identify anthracnose disease in chili plants using image data. The model was trained on labeled images of healthy and infected chilies through data preparation, annotation, and evaluation stages, achieving an *accuracy of 94%*. The results demonstrate YOLOv7’s potential as an effective solution for early pest detection to support agricultural productivity and reduce crop losses.",
    ],
    tags: ["Data Annotation","Data Labeling","YOLOv7", "Python", "Computer Vision", "Research"],
    image: "assets/experience/chili_yolov7/chili_yolov7.png"
  },
  {
    id: 'p2',
    title: "Machine Learning Models for Cryptocurrency Price Prediction (Solana Case Study)",
    role: "Researcher",
    date: "2025",
    description: [
      "This project compares Backpropagation and Long Short-Term Memory (LSTM) neural networks for predicting the daily closing price of Solana (SOL) using historical time-series data from Binance. The study involved data preprocessing, normalization, model construction, and evaluation using the Mean Absolute Percentage Error (MAPE) metric. Results show that both models achieved high prediction accuracy, with LSTM slightly outperforming Backpropagation (MAPE 3.14% vs. 3.16%), demonstrating LSTM’s stronger capability in capturing time-series patterns in highly volatile cryptocurrency markets.",
    ],
    tags: ["LSTM", "Neural Networks", "Python", "Financial Analysis","Machine Learning", "Research"],
    image: "assets/experience/solana/output.png"
  },
  {
    id: 'p3',
    title: "Breast Care: Web-Based Breast Cancer Early Detection System Using Machine Learning",
    role: "Developer",
    date: "2024",
    description: [
      "Breast Care is a web-based early detection application for breast cancer developed as a capstone project in the Data Science program at BISA AI Academy. The system applies data mining techniques by comparing multiple classification algorithms—K-Nearest Neighbor (KNN), Support Vector Machine (SVM), and Naive Bayes—to predict benign and malignant breast cancer cases. Using the Breast Cancer Wisconsin Dataset and an 80:20 train-test split, the KNN model achieved the best performance with 97% accuracy, precision, and recall. The final model was deployed using Streamlit and integrated with Firebase, providing an accessible, data-driven decision support tool for early breast cancer screening and public health awareness.",
    ],
    tags: ["SVM", "Machine Learning", "Health AI", "Python"],
    image: "assets/experience/breast_cancer/breast_cancer.png"
  },
  {
    id: 'p4',
    title: "Media Monitoring and Public Communication Documentation at PT PLN (Persero) UIW NTB",
    role: "Intern",
    date: "2024",
    description: [
      "This project documents my internship at PT PLN (Persero) Unit Induk Wilayah NTB, where I supported public communication through systematic media monitoring and documentation. My responsibilities included collecting, archiving, and recording media publications from online platforms, newspapers, and television broadcasts. I managed large-scale datasets using Microsoft Excel and Google Drive to ensure data accuracy, traceability, and structured reporting. The project highlights my experience in data entry workflows, evidence management, monitoring processes, and cross-platform documentation to support organizational reporting and public communication strategies.",
    ],
    tags: ["Data Management", "Excel", "Internship"],
    image: "assets/experience/pln/pln.png"
  },
  {
    id: 'p5',
    title: "Data Visualization and Reporting Module Using Power BI",
    role: "Analyst",
    date: "2024",
    description: [
      "Conducted comprehensive sales data analysis and created interactive visualizations to provide actionable business insights. Utilized tools such as Power BI and Excel to identify trends, forecast sales, and support strategic decision-making processes. The project enhanced data-driven approaches within the organization, improving sales performance and market understanding."
    ],
    tags: ["Data Analysis", "Power BI", "Excel", "Visualization"],
    image: "assets/experience/sales_data/sales_data.png"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Hard Skills",
    items: [
      "Python", "Power BI", "Google Looker", "Excel", "Canva"
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
      "Served as a Teaching Assistant for Programming Algorithms and Database courses, assisting 154 students.",
      "Presented 2 Machine Learning research projects (YOLOv7 Object Detection & LSTM Prediction) at National Seminars.",
      "Selected as a Finalist in the Science and Technology National Competition 2024 (Scientific Writing).",
      "Led the Public Relation & Media division at Gamatika Coding Club, managing a team of 8 members.",
      "Moderated the \"Python Training for Data Science\" seminar (70+ participants) and the National Digital Start-Up Competition (100+ participants)."
    ],
    image: "/assets/education/logo_unram.png"
  },
  {
    institution: "BISA AI Academy",
    degree: "Independent Study MSIB 6 Data Science",
    period: "2024",
    gpa: "Score 96/100",
    details: [
      "Completed the Kampus Merdeka Batch 6 independent study program in Data Science (Score: 96/100).",
      "Developed a Capstone Project, creating a cancer prediction application using SVM algorithms.", 
      "Conducted 2 webinars related to Data Science during the program."
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
    hoverText: "demonstrating foundational competence in applying Artificial Intelligence and data-driven insights to support business decision-making and strategy",
    link:"https://certifications.certnexus.com/1fc2521e-5cb3-4ace-86e2-5db043be94e3#acc.Wmc1ix9w"
  },
  {
    id: 'c2',
    title: "CertNexus DSBIZ™ Credential",
    issuer: "CertNexus",
    date: "Jul 2024",
    image: "/assets/certificates/certnexus/dsbiz.png",
    hoverText: "demonstrating competence in applying Data Science and Business Intelligence to support business decision-making and strategy",
    link:"https://www.credential.net/ebed4275-99c4-458d-bdab-3614dc4ee56f#acc.nl2wkINj"
  },
  {
    id: 'c3',
    title: "Presenter Certificate – National Seminar Merdeka Belajar",
    issuer: "Universitas Mataram",
    date: "2024",
    image: "/assets/certificates/national_seminar_merdeka_belajar/1.png",
    hoverText: "Presenter at the National Seminar Merdeka Belajar by Universitas Mataram, presenting research on chili anthracnose pest detection using machine learning",
    link: ""
  },
  {
    id: 'c4',
    title: "Presenter Certificate – National Seminar on Mathematics Education and Its Applications",
    issuer: "Universitas Mataram & ITB",
    date: "2024",
    image: "/assets/certificates/national_seminar_merdeka_belajar/1.png", 
    hoverText: "Presenter at the National Seminar on Mathematics Education (Universitas Mataram & ITB), presenting a comparative study of machine learning models for cryptocurrency price prediction.",
    link: ""
  },
  {
    id: 'c5',
    title: "Guest Speaker – Loka Karya Gamatika Coding Club",
    issuer: "Gamatika Coding Club",
    date: "2024",
    image: "assets/certificates/gamatika_coding_club/1.png",
    hoverText: "Shared insights on applying mathematics in computing as a guest speaker at Gamatika Coding Club’s Loka Karya.",
    link: ""
  },
  {
    id: 'c6',
    title: "Guest Speaker – Journal Review Class, Gamatika Research Club",
    issuer: "Gamatika Research Club",
    date: "2024",
    image: "/assets/certificates/default.png",
    hoverText: "Discussed types of machine learning research and shared research ideas with participants.",
    link: ""
  },
  {
    id: 'c7',
    title: "Guest Speaker – Sharing Session, Gamatika Coding Club",
    issuer: "Gamatika Coding Club",
    date: "2024",
    image: "/assets/certificates/default.png",
    hoverText: "Shared insights on independent study programs and internship experiences with participants at Gamatika Coding Club’s sharing session.",
    link: ""
  },
  {
    id: 'c8',
    title: "Teaching Assistant – Algorithms & Programming",
    issuer: "Universitas Mataram",
    date: "2023 - 2024",
    image: "/assets/gallery/asdos/asdos.jpg", 
    hoverText: "Delivered structured labs on basic Python and programming algorithms.",
    link: ""
  },
  {
    id: 'c9',
    title: "Teaching Assistant – Database Systems",
    issuer: "Universitas Mataram",
    date: "2023 - 2024",
    image: "/assets/gallery/asdos/asdos.jpg",
    hoverText: "Guided students in database fundamentals and structured data management.",
    link: ""
  },
  {
    id: 'c10',
    title: "Scientific Paper Finalist – Universitas Sriwijaya",
    issuer: "Universitas Sriwijaya",
    date: "Oct 2024",
    image: "assets/certificates/finalist_national_seminar/Finalist Karya Ilmiah.jpg",
    hoverText: "Finalist in a scientific writing competition with research-based analysis.",
    link: ""
  },
  {
    id: 'c11',
    title: "Copyright Holder – Infographic Design",
    issuer: "Intellectual Property Office",
    date: "2024",
    image: "/assets/certificates/default.png",
    hoverText: "Holder of copyright for data-driven infographic content.",
    link: ""
  },
  {
    id: 'c12',
    title: "Presenter – Statistical Quality Control (Variable Control Charts)",
    issuer: "BISA AI Academy",
    date: "Mar 2022",
    image: "assets/certificates/webinar_speaker_bisaai/Sertif Pemateri 1.png",
    hoverText: "Presented quality control methods using variable control charts.",
    link: ""
  },
  {
    id: 'c13',
    title: "Presenter – Statistical Quality Control (Attribute Control Charts)",
    issuer: "BISA AI Academy",
    date: "Mar 2022",
    image: "assets/certificates/webinar_speaker_bisaai/Sertif Pemateri 2.png",
    hoverText: "Explained attribute control charts for quality monitoring.",
    link: ""
  },
  {
    id: 'c14',
    title: "Head of Public Relations & Media",
    issuer: "Gamatika Coding Club",
    date: "2024",
    image: "/assets/certificates/default.png",
    hoverText: "Led organizational communication, media strategy, and publications.",
    link: ""
  },
  {
    id: 'c15',
    title: "MSIB Batch 6 – Bisa AI (Data Science)",
    issuer: "BISA AI Academy",
    date: "Jun 2024",
    image: "assets/certificates/msib_6/MSIB 6.png",
    hoverText: "National program focused on data science, analytics, and AI applications.",
    link: ""
  },
  {
    id: 'c16',
    title: "Moderator – Workshop & Digital Startup Competition",
    issuer: "Universitas Mataram",
    date: "Jul 2022",
    image: "assets/certificates/wdsc_moderator/Moderator WDSC.jpg",
    hoverText: "Moderated discussions and sessions for digital startup competitions.",
    link: ""
  },
  {
    id: 'c17',
    title: "Moderator – Python for Data Science Webinar",
    issuer: "Universitas Mataram",
    date: "Sep 2023",
    image: "assets/certificates/python_training_data_science_moderator/Moderator Python Training.jpg",
    hoverText: "Facilitated a technical webinar on Python for data science.",
    link: ""
  },
  {
    id: 'c18',
    title: "Moderator – Mental Health Fest Webinar",
    issuer: "Universitas Mataram",
    date: "Nov 2022",
    image: "assets/certificates/mental_health_fest_moderator/Moderator Mental Health Fest.jpg",
    hoverText: "Moderated discussions and audience engagement on mental health topics.",
    link: ""
  },
  {
    id: 'c19',
    title: "Secretary – Department of Class (OPTION)",
    issuer: "OPTION Organization",
    date: "2022",
    image: "assets/certificates/secretary_option/Sekretaris OPTION.jpg",
    hoverText: "Managed administration, documentation, and internal coordination.",
    link: ""
  },
  {
    id: 'c20',
    title: "Treasurer – Leadership & Organizational Management Training (PRIMA)",
    issuer: "PRIMA Training",
    date: "2022",
    image: "/assets/certificates/default.png",
    hoverText: "Oversaw budgeting, financial management, and reporting.",
    link: ""
  },
  {
    id: 'c21',
    title: "Co-Event Lead – GAMATIKA Bonding Night",
    issuer: "Gamatika",
    date: "2023",
    image: "/assets/certificates/default.png", 
    hoverText: "Coordinated planning and execution of organizational events.",
    link: ""
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: "Graduation",
    description: "Successfully completed a Bachelor’s degree in Mathematics.",
    images: ["assets/gallery/graduate/1.jpg", "assets/gallery/graduate/2.jpg", "assets/gallery/graduate/3.jpg", "assets/gallery/graduate/4.jpg", "assets/gallery/graduate/5.jpg", "assets/gallery/graduate/6.jpg"]
  },
  {
    id: 'g2',
    title: "Computational Mathematics Workshop",
    description: "Workshop on applying computational mathematics to solve real-world problems.",
    images: ["assets/gallery/loka_karya/pamflet_loka_karya.jpg"]
  },
  {
    id: 'g3',
    title: "Journal Review Class – Machine Learning",
    description: "Academic session exploring machine learning in research and practical applications.",
    images: ["assets/gallery/journal_review/1.jpg", "assets/gallery/journal_review/2.jpg", "assets/gallery/journal_review/3.jpg"]
  },
  {
    id: 'g4',
    title: "Sharing Session – Independent Study & Internship",
    description: "Sharing insights on growth through independent study and internship programs.",
    images: ["assets/gallery/sharing_session/pamflet_sharing_session.jpg"]
  },
  {
    id: 'g5',
    title: "National Mathematics Education Seminar Presenter",
    description: "Presented research at a national seminar on mathematics education and applications.",
    images: ["assets/gallery/national_seminar/national_seminar.jpg"]
  },
  {
    id: 'g6',
    title: "Journal Review Class Speaker",
    description: "Delivered material and led discussions in a journal review session.",
    images: ["assets/gallery/journal_review/2.jpg", "assets/gallery/journal_review/3.jpg"]
  },
  {
    id: 'g7',
    title: "Copyrighted Infographic Project",
    description: "Final project infographic officially registered with intellectual property rights.",
    images: ["assets/certificates/finalist_national_seminar/Finalist Karya Ilmiah.jpg"] // Best guess based on "Project/Infographic" context
  },
  {
    id: 'g8',
    title: "Internship at PLN",
    description: "Internship experience contributing to organizational and data-related activities.",
    images: ["assets/gallery/pkl_pln/1.jpg", "assets/gallery/pkl_pln/2.jpg"]
  },
  {
    id: 'g9',
    title: "Moderator – Digital Startup Competition (Day 1)",
    description: "Moderated the main discussion sessions of the workshop and startup competition.",
    images: ["assets/gallery/wdsc/1.png", "assets/gallery/wdsc/2.png"]
  },
  {
    id: 'g10',
    title: "Moderator – Digital Startup Competition (Day 2)",
    description: "Led and moderated core sessions with speakers and participants.",
    images: ["assets/gallery/wdsc/3.jpg", "assets/gallery/wdsc/4.jpg"]
  },
  {
    id: 'g11',
    title: "Moderator – Digital Startup Competition (Day 3–4)",
    description: "Moderated key sessions and final discussions throughout the event.",
    images: ["assets/gallery/wdsc/1.png"] // Reusing generic image
  },
  {
    id: 'g12',
    title: "Moderator – Python for Data Science",
    description: "Moderated a technical session on Python applications in data science.",
    images: ["assets/gallery/python_data_science/1.jpg", "assets/gallery/python_data_science/2.jpg", "assets/gallery/python_data_science/3.jpg"]
  },
  {
    id: 'g13',
    title: "Moderator – Mental Health Fest",
    description: "Moderated discussions focused on mental health awareness and education.",
    images: ["assets/gallery/mental_health_fest/mental_health_fest.jpg"]
  },
  {
    id: 'g14',
    title: "Moderator – Leadership & Organizational Training",
    description: "Facilitated leadership and organizational management training sessions.",
    images: ["assets/certificates/secretary_option/Sekretaris OPTION.jpg"] // Reusing related cert image as placeholder
  },
  {
    id: 'g15',
    title: "Teaching Assistant Activity",
    description: "Assisted teaching and guided students during practicum sessions.",
    images: ["assets/gallery/asdos/asdos.jpg"]
  }
];

// Select which gallery items to show in the carousel by ID
const CAROUSEL_IDS = ['g1', 'g3', 'g4','g10'];

export const CAROUSEL_ITEMS: GalleryItem[] = CAROUSEL_IDS.map(id => 
  GALLERY.find(item => item.id === id)
).filter((item): item is GalleryItem => item !== undefined);