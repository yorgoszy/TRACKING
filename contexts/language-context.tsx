"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "el" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.programs": "Programs",
    "nav.about": "About Us",
    "nav.results": "Results",
    "nav.contact": "Contact",
    "nav.login": "Login",

    // Hero Section
    "hero.title": "The Champion's Journey",
    "hero.titleHighlight": "Starts Here",
    "hero.getStarted": "get started",
    "hero.contact": "contact",
    "hero.scrollDown": "scroll down",

    // Programs Section
    "programs.title": "Explore All",
    "programs.titleSecond": "Programs",
    "programs.01.title": "Movement Learning",
    "programs.01.description": "Introductory movement techniques",
    "programs.02.title": "Movement Development",
    "programs.02.description": "Building athletic foundations for all sports",
    "programs.03.title": "Youth Strength",
    "programs.03.description": "Advanced techniques and conditioning",
    "programs.04.title": "Fitness",
    "programs.04.description": "Customized fitness solutions for all levels",
    "programs.05.title": "Muay Thai",
    "programs.05.description": "Next-Gen Training Methods",
    "programs.06.title": "One by One Training",
    "programs.06.description": "Personalized coaching for maximum results",
    "programs.07.title": "Athlete Performance",
    "programs.07.description": "Elite Strength & Conditioning Strategies",
    "programs.08.title": "Custom Design Program",
    "programs.08.description": "Completely personalized program design",

    // Program Details - Movement Learning (01)
    "program.01.title": "Movement Learning",
    "program.01.subtitle": "Foundation for Athletic Excellence",
    "program.01.fullDescription":
      "Our Movement Learning program is designed for beginners who want to develop fundamental movement skills. This program focuses on body awareness, coordination, and basic movement patterns that form the foundation for all physical activities.",
    "program.01.details.0": "Ages: 4-8 years",
    "program.01.details.1": "Duration: 45 minutes",
    "program.01.details.2": "Frequency: 1 time per week",
    "program.01.details.3": "Schedule: Wednesday",
    "program.01.benefits.0": "Development of fundamental movement skills and coordination",
    "program.01.benefits.1": "Learning rhythm and timing in movement patterns",
    "program.01.benefits.2": "Building cooperation and teamwork abilities",
    "program.01.benefits.3": "Establishing good behavior patterns and discipline",

    // Program Details - Movement Development (02)
    "program.02.title": "Movement Development",
    "program.02.subtitle": "Building Athletic Foundations",
    "program.02.fullDescription":
      "The Movement Development program builds upon basic movement skills to develop athletic foundations applicable to all sports. This program emphasizes proper movement mechanics, strength development, and sport-specific skills.",
    "program.02.details.0": "Ages: 8-12 years",
    "program.02.details.1": "Duration: 60 minutes",
    "program.02.details.2": "Frequency: 2 times per week",
    "program.02.details.3": "Schedule: Tuesday & Thursday",
    "program.02.benefits.0": "Improved athletic performance",
    "program.02.benefits.1": "Enhanced movement efficiency",
    "program.02.benefits.2": "Development of sport-specific skills",
    "program.02.benefits.3": "Reduced risk of injury",

    // Program Details - Youth Strength (03)
    "program.03.title": "Youth Strength",
    "program.03.subtitle": "Advanced Training for Young Athletes",
    "program.03.fullDescription":
      "Our Youth Strength program is designed for adolescents aged 13-17 who want to develop strength, power, and endurance. This program focuses on introducing proper strength training techniques and basic weightlifting movements that form the foundation of athletic performance and strength training.",
    "program.03.details.0": "Ages: 13-17 years",
    "program.03.details.1": "Duration: 60 minutes",
    "program.03.details.2": "Frequency: 3 times per week",
    "program.03.details.3": "Schedule: Monday, Wednesday, Friday",
    "program.03.benefits.0": "Increased strength and power",
    "program.03.benefits.1": "Improved body composition",
    "program.03.benefits.2": "Enhanced athletic performance",
    "program.03.benefits.3": "Development of proper lifting techniques",

    // Program Details - Fitness (04)
    "program.04.title": "Fitness",
    "program.04.subtitle": "Total Body Transformation",
    "program.04.fullDescription":
      "Our Fitness program offers customized training solutions for adults of all fitness levels. Whether you're looking to lose weight, build muscle, or improve overall health, our experienced coaches will design a program tailored to your specific goals.",
    "program.04.details.0": "Ages: 18+ years",
    "program.04.details.1": "Duration: 60-90 minutes",
    "program.04.details.2": "Frequency: 2-5 times per week",
    "program.04.details.3": "Group size: Maximum 6 people",
    "program.04.details.4": "Custom program design",
    "program.04.details.5": "Focus: General fitness, weight management, and overall health",
    "program.04.benefits.0": "Improved cardiovascular health",
    "program.04.benefits.1": "Enhanced muscular strength and endurance",
    "program.04.benefits.2": "Better body composition",
    "program.04.benefits.3": "Increased energy and vitality",

    // Program Details - Muay Thai (05)
    "program.05.title": "Muay Thai",
    "program.05.subtitle": "The Art of Eight Limbs",
    "program.05.fullDescription":
      "Our Muay Thai program combines traditional techniques with modern training methods to develop striking skills, conditioning, and mental toughness. Whether you're interested in competition or just want a challenging workout, our Muay Thai program offers something for everyone.",
    "program.05.details.0": "Ages: 16+ years",
    "program.05.details.1": "Duration: 90 minutes",
    "program.05.details.2": "Frequency: 5 times per week",
    "program.05.details.3": "Schedule: Monday to Friday at 20:00-21:30",
    "program.05.details.4": "Focus: Striking techniques, conditioning, and mental toughness",
    "program.05.benefits.0": "Improved striking skills",
    "program.05.benefits.1": "Enhanced cardiovascular conditioning",
    "program.05.benefits.2": "Increased mental toughness",
    "program.05.benefits.3": "Development of self-defense capabilities",

    // Program Details - One by One Training (06)
    "program.06.title": "One by One Training",
    "program.06.subtitle": "Personalized Excellence",
    "program.06.fullDescription":
      "Our One by One Training program offers personalized coaching tailored to your specific goals and needs. Working directly with one of our experienced coaches, you'll receive individualized attention and customized programming.",
    "program.06.details.0": "Ages: All ages",
    "program.06.details.1": "Duration: 60 minutes",
    "program.06.details.2": "Frequency: Based on individual needs",
    "program.06.details.3": "Focus: Personalized coaching and customized programming",
    "program.06.benefits.0": "Individualized attention",
    "program.06.benefits.1": "Customized programming",
    "program.06.benefits.2": "Detailed feedback and coaching",
    "program.06.benefits.3": "Accelerated progress toward goals",

    // Program Details - Athlete Performance (07)
    "program.07.title": "Athlete Performance",
    "program.07.subtitle": "Elite Training for Champions",
    "program.07.fullDescription":
      "Our Athlete Performance program is designed for competitive athletes looking to take their performance to the next level. Using advanced training methods and performance monitoring, we help athletes excel in their sport.",
    "program.07.details.0": "Ages: 16+ years",
    "program.07.details.1": "Duration: 90-120 minutes",
    "program.07.details.2": "Frequency: 3-5 times per week",
    "program.07.details.3": "Focus: Sport-specific performance enhancement",
    "program.07.benefits.0": "Improved sport-specific performance",
    "program.07.benefits.1": "Enhanced strength, power, and speed",
    "program.07.benefits.2": "Optimized recovery and injury prevention",
    "program.07.benefits.3": "Performance monitoring and feedback",

    // Program Details - Custom Design Program (08)
    "program.08.title": "Custom Design Program",
    "program.08.subtitle": "Tailored Training for Your Unique Goals",
    "program.08.fullDescription":
      "Our Custom Design Program offers completely personalized training solutions created specifically for your unique goals, needs, and circumstances. Working closely with our expert coaches, we'll design a program that fits perfectly into your lifestyle while delivering optimal results.",
    "program.08.details.0": "Ages: All ages",
    "program.08.details.1": "Duration: Customized",
    "program.08.details.2": "Frequency: Based on your goals and availability",
    "program.08.details.3": "Group size: Individual or small groups",
    "program.08.details.4": "Focus: Completely personalized to your specific needs",
    "program.08.benefits.0": "100% customized program design",
    "program.08.benefits.1": "Flexible scheduling and format",
    "program.08.benefits.2": "Ongoing program adjustments",
    "program.08.benefits.3": "Specialized goal achievement",

    // Common Program Page Text
    "program.info.title": "Explore Your",
    "program.info.titleHighlight": "Training Journey",
    "program.info.subtitle": "Program Information",
    "program.details": "Program Details",
    "program.benefits": "Program Benefits",
    "program.schedule": "Weekly Schedule",
    "program.pricing": "Pricing Plans",
    "program.coach": "Meet Your Coach",
    "program.ready": "Ready to Start Your Journey?",
    "program.join": "Join our",
    "program.transform": "program and transform your fitness today.",
    "program.reserve": "Reserve Your Spot",
    "program.contactUs": "Contact Us",

    // Schedule Text
    "schedule.title": "Weekly Schedule",
    "schedule.note": "Note:",
    "schedule.contact": "Contact us for enrollment and any scheduling questions.",
    "schedule.availability": "Availability:",
    "schedule.hours": "Hours:",
    "schedule.flexible": "Flexible scheduling available to accommodate your needs.",

    // Coach Information
    "coach.name": "Georgios Zygouris",
    "coach.title": "Head Coach & Movement Specialist",
    "coach.bio":
      "Graduate of the School of Physical Education and Sport Science at the Aristotle University of Thessaloniki. Professional Muay Thai athlete and certified coach.",

    // Pricing
    "pricing.monthly": "Monthly",
    "pricing.quarterly": "Quarterly",
    "pricing.annual": "Annual",
    "pricing.session": "Session",
    "pricing.sessions12": "12 Sessions",
    "pricing.sessions24": "24 Sessions",
    "pricing.popular": "POPULAR",
    "pricing.choose": "Choose Plan",
    "pricing.perMonth": "/month",
    "pricing.perSession": "/session",
    "pricing.perQuarter": "/quarter",
    "pricing.perYear": "/year",
    "pricing.features.coaching": "Personalized coaching",
    "pricing.features.tracking": "Progress tracking",
    "pricing.features.scheduling": "Flexible scheduling",
    "pricing.features.priority": "Priority booking",
    "pricing.features.assessment": "Free assessment",
    "pricing.features.nutrition": "Nutrition plan included",
    "pricing.features.physiotherapy": "Physiotherapy included",
    "pricing.features.weight": "Weight training included",
    "pricing.features.fighting": "Pro fighting activities included",

    // About Section
    "about.subtitle": "About Us",
    "about.title": "Supporting Your",
    "about.titleHighlight": "Athletic Journey",
    "about.athleticYour": "Athletic Your",
    "about.journey": "Journey",
    "about.tab1": "Head Coach",
    "about.tab2": "Our Vision",
    "about.tab3": "Training Methodology",
    "about.headCoach.title": "Head Coach",
    "about.headCoach.description":
      "My name is Georgios Zygouris, and I am a graduate of the School of Physical Education and Sport Science at the Aristotle University of Thessaloniki (2023). I am a professional Muay Thai athlete and a certified coach since 2024. Through my dual perspective as both competitor and educator, I've established a training environment where children, teenagers, and adults don't just learn movement—they discover their strengths, build character through sport, and find their unique position in the athletic world.",

    // About Section - Head Coach Boxes
    "about.headCoach.box1.title": "Academic Background",
    "about.headCoach.box1.description":
      "Graduate of the School of Physical Education and Sport Science at the Aristotle University of Thessaloniki (2023)",
    "about.headCoach.box2.title": "Professional Athlete",
    "about.headCoach.box2.description": "Professional Muay Thai athlete with experience in high-level competitions",
    "about.headCoach.box3.title": "Core Values",
    "about.headCoach.box3.description":
      "Our goal is not only physical improvement, but also the cultivation of confidence, character and core values",

    "about.vision.title": "Our Vision",
    "about.vision.description":
      "Combining scientific knowledge with real-world experience, we apply skill development and performance-focused training tailored to each age and stage. We see movement as more than physical — it's self-expression, confidence, and the power to grow through challenge. Our mission is to help young people trust the process and explore their potential in a safe, supportive space.",

    // About Section - Vision Boxes
    "about.vision.box1.title": "More Than Physical",
    "about.vision.box1.description":
      "We don't just train bodies. We shape character. Every child is a world in motion, and movement is self-expression, confidence and development.",
    "about.vision.box2.title": "Building Character",
    "about.vision.box2.description":
      "We teach respect, discipline, perseverance and cooperation. Our goal is to create a school of life where children learn to stand upright physically, mentally and morally.",
    "about.vision.box3.title": "Trust the Process",
    "about.vision.box3.description":
      "For us, tomorrow starts today. Step by step. With trust in the process. With the courage to go further. With the will to push the limits.",

    "about.methodology.title": "Training Methodology",
    "about.methodology.description":
      "Our training methodology focuses on progressive skill development and reinforcement of proper movement patterns tailored to each individual's needs and goals. Through comprehensive assessment, we understand your current abilities and weaknesses, establish clear training objectives, create a structured timeline for achievement, and design an exclusive personalized training plan specifically for you.",

    // About Section - Methodology Boxes
    "about.methodology.box1.title": "Movement Skills",
    "about.methodology.box1.item1": "Athletic Skills Development",
    "about.methodology.box1.item2": "Age Appropriate",
    "about.methodology.box1.item3":
      "Throwing & Catching, Climbing Skills, Jumping & Landing, Agility Running, Coordination",
    "about.methodology.box2.title": "Assessment",
    "about.methodology.box2.item1": "Movement & Posture",
    "about.methodology.box2.item2": "Load-velocity profile",
    "about.methodology.box2.item3": "Jump profile",
    "about.methodology.box2.item4": "Endurance",
    "about.methodology.box3.title": "Results Focused",
    "about.methodology.box3.item1": "Results Tracking",
    "about.methodology.box3.item2": "Performance Guidance",
    "about.methodology.box3.item3": "Customized Program Development",

    // Training Section
    "training.title": "Elite Training Methodology",
    "training.description":
      "Our training methodology is based on scientific principles and years of experience working with elite athletes. We focus on developing all aspects of athletic performance including:",
    "training.mobility": "Mobility & Flexibility",
    "training.speed": "Speed & Agility",
    "training.strength": "Strength & Power",
    "training.endurance": "Endurance & Stamina",
    "training.technology":
      "We utilize cutting-edge technology to track performance metrics in real-time, allowing for precise adjustments and optimal training outcomes.",
    "training.button": "OUR APPROACH",
    "training.advanced": "Advanced Technology",
    "training.realTime": "Real-time performance tracking for optimal results",

    // Testimonials Section
    "testimonials.title": "Athlete Results",
    "testimonials.description":
      "Don't just take our word for it. Hear from the athletes who have experienced the Performance difference.",

    // CTA Section
    "cta.title": "Ready to Elevate Your Performance?",
    "cta.description": "Join our community of athletes and start your journey towards peak performance today.",
    "cta.button": "Get Started",

    // Footer
    "footer.contact": "Contact",
    "footer.hours": "Hours",
    "footer.monday": "Monday - Friday:",
    "footer.saturday": "Saturday:",
    "footer.sunday": "Sunday:",
    "footer.closed": "Closed",
    "footer.rights": "© 2023 hyperkids. All rights reserved.",
  },
  el: {
    // Navigation
    "nav.home": "Αρχική",
    "nav.programs": "Προγράμματα",
    "nav.about": "Σχετικά Με Εμάς",
    "nav.results": "Αποτελέσματα",
    "nav.contact": "Επικοινωνία",
    "nav.login": "Σύνδεση",

    // Hero Section
    "hero.title": "Το Ταξίδι του Πρωταθλητή",
    "hero.titleHighlight": "Ξεκινά Εδώ",
    "hero.getStarted": "ξεκίνα τώρα",
    "hero.contact": "επικοινωνία",
    "hero.scrollDown": "κύλισε κάτω",

    // Programs Section
    "programs.title": "Εξερεύνησε Όλα Τα",
    "programs.titleSecond": "Προγράμματα",
    "programs.01.title": "Εκμάθηση Κίνησης",
    "programs.01.description": "Εισαγωγικές τεχνικές κίνησης",
    "programs.02.title": "Ανάπτυξη Κίνησης",
    "programs.02.description": "Δημιουργία αθλητικών βάσεων για όλα τα αθλήματα",
    "programs.03.title": "Δύναμη Νέων",
    "programs.03.description": "Προηγμένες τεχνικές και φυσική κατάσταση",
    "programs.04.title": "Φυσική Κατάσταση",
    "programs.04.description": "Εξατομικευμένες λύσεις φυσικής κατάστασης για όλα τα επίπεδα",
    "programs.05.title": "Muay Thai",
    "programs.05.description": "Μέθοδοι Προπόνησης Νέας Γενιάς",
    "programs.06.title": "Ατομική Προπόνηση",
    "programs.06.description": "Εξατομικευμένη καθοδήγηση για μέγιστα αποτελέσματα",
    "programs.07.title": "Αθλητική Απόδοση",
    "programs.07.description": "Στρατηγικές Ελίτ Δύναμης & Φυσικής Κατάστασης",
    "programs.08.title": "Εξατομικευμένο Πρόγραμμα",
    "programs.08.description": "Πλήρως εξατομικευμένος σχεδιασμός προγράμματος",

    // Program Details - Movement Learning (01)
    "program.01.title": "Εκμάθηση Κίνησης",
    "program.01.subtitle": "Θεμέλια για Αθλητική Αριστεία",
    "program.01.fullDescription":
      "Το πρόγραμμα Εκμάθησης Κίνησης είναι σχεδιασμένο για αρχάριους που θέλουν να αναπτύξουν θεμελιώδεις κινητικές δεξιότητες. Αυτό το πρόγραμμα εστιάζει στη σωματική επίγνωση, τον συντονισμό και τα βασικά κινητικά πρότυπα που αποτελούν τη βάση για όλες τις φυσικές δραστηριότητες.",
    "program.01.details.0": "Ηλικίες: 4-8 ετών",
    "program.01.details.1": "Διάρκεια: 45 λεπτά",
    "program.01.details.2": "Συχνότητα: 1 φορά την εβδομάδα",
    "program.01.details.3": "Πρόγραμμα: Τετάρτη",
    "program.01.benefits.0": "Ανάπτυξη θεμελιωδών κινητικών δεξιοτήτων και συντονισμού",
    "program.01.benefits.1": "Εκμάθηση ρυθμού και χρονισμού στα κινητικά πρότυπα",
    "program.01.benefits.2": "Δημιουργία ικανοτήτων συνεργασίας και ομαδικότητας",
    "program.01.benefits.3": "Καθιέρωση καλών συμπεριφορικών προτύπων και πειθαρχίας",

    // Program Details - Movement Development (02)
    "program.02.title": "Ανάπτυξη Κίνησης",
    "program.02.subtitle": "Δημιουργία Αθλητικών Βάσεων",
    "program.02.fullDescription":
      "Το πρόγραμμα Ανάπτυξης Κίνησης βασίζεται στις βασικές κινητικές δεξιότητες για να αναπτύξει αθλητικές βάσεις εφαρμόσιμες σε όλα τα αθλήματα. Αυτό το πρόγραμμα δίνει έμφαση στη σωστή κινητική μηχανική, την ανάπτυξη δύναμης και τις αθλητικές δεξιότητες.",
    "program.02.details.0": "Ηλικίες: 8-12 ετών",
    "program.02.details.1": "Διάρκεια: 60 λεπτά",
    "program.02.details.2": "Συχνότητα: 2 φορές την εβδομάδα",
    "program.02.details.3": "Πρόγραμμα: Τρίτη & Πέμπτη",
    "program.02.benefits.0": "Βελτιωμένη αθλητική απόδοση",
    "program.02.benefits.1": "Ενισχυμένη αποτελεσματικότητα κίνησης",
    "program.02.benefits.2": "Ανάπτυξη αθλητικών δεξιοτήτων",
    "program.02.benefits.3": "Μειωμένος κίνδυνος τραυματισμού",

    // Program Details - Youth Strength (03)
    "program.03.title": "Δύναμη Νέων",
    "program.03.subtitle": "Προηγμένη Προπόνηση για Νέους Αθλητές",
    "program.03.fullDescription":
      "Το πρόγραμμα Δύναμης Νέων είναι σχεδιασμένο για εφήβους ηλικίας 13-17 ετών που θέλουν να αναπτύξουν δύναμη, ισχύ και αντοχή. Αυτό το πρόγραμμα επικεντρώνεται στην εισαγωγή κατάλληλων τεχνικών προπόνησης δύναμης και βασικών κινήσεων άρσης βαρών που αποτελούν τη βάση της αθλητικής απόδοσης και της προπόνησης δύναμης.",
    "program.03.details.0": "Ηλικίες: 13-17 ετών",
    "program.03.details.1": "Διάρκεια: 60 λεπτά",
    "program.03.details.2": "Συχνότητα: 3 φορές την εβδομάδα",
    "program.03.details.3": "Πρόγραμμα: Δευτέρα, Τετάρτη, Παρασκευή",
    "program.03.benefits.0": "Αυξημένη δύναμη και ισχύς",
    "program.03.benefits.1": "Βελτιωμένη σύσταση σώματος",
    "program.03.benefits.2": "Ενισχυμένη αθλητική απόδοση",
    "program.03.benefits.3": "Ανάπτυξη σωστών τεχνικών άρσης βαρών",

    // Program Details - Fitness (04)
    "program.04.title": "Φυσική Κατάσταση",
    "program.04.subtitle": "Ολική Μεταμόρφωση Σώματος",
    "program.04.fullDescription":
      "Το πρόγραμμα Φυσικής Κατάστασης προσφέρει εξατομικευμένες λύσεις προπόνησης για ενήλικες όλων των επιπέδων φυσικής κατάστασης. Είτε θέλετε να χάσετε βάρος, να χτίσετε μυϊκή μάζα ή να βελτιώσετε τη συνολική υγεία σας, οι έμπειροι προπονητές μας θα σχεδιάσουν ένα πρόγραμμα προσαρμοσμένο στους συγκεκριμένους στόχους σας.",
    "program.04.details.0": "Ηλικίες: 18+ ετών",
    "program.04.details.1": "Διάρκεια: 60-90 λεπτά",
    "program.04.details.2": "Συχνότητα: 2-5 φορές την εβδομάδα",
    "program.04.details.3": "Μέγεθος ομάδας: Μέγιστο 6 άτομα",
    "program.04.details.4": "Εξατομικευμένος σχεδιασμός προγράμματος",
    "program.04.details.5": "Εστίαση: Γενική φυσική κατάσταση, διαχείριση βάρους και συνολική υγεία",
    "program.04.benefits.0": "Βελτιωμένη καρδιαγγειακή υγεία",
    "program.04.benefits.1": "Ενισχυμένη μυϊκή δύναμη και αντοχή",
    "program.04.benefits.2": "Καλύτερη σύνθεση σώματος",
    "program.04.benefits.3": "Αυξημένη ενέργεια και ζωτικότητα",

    // Program Details - Muay Thai (05)
    "program.05.title": "Muay Thai",
    "program.05.subtitle": "Η Τέχνη των Οκτώ Άκρων",
    "program.05.fullDescription":
      "Το πρόγραμμα Muay Thai συνδυάζει παραδοσιακές τεχνικές με σύγχρονες μεθόδους προπόνησης για την ανάπτυξη δεξιοτήτων χτυπήματος, φυσικής κατάστασης και ψυχικής αντοχής. Είτε ενδιαφέρεστε για αγώνες είτε απλά θέλετε μια απαιτητική προπόνηση, το πρόγραμμα Muay Thai προσφέρει κάτι για όλους.",
    "program.05.details.0": "Ηλικίες: 16+ ετών",
    "program.05.details.1": "Διάρκεια: 90 λεπτά",
    "program.05.details.2": "Συχνότητα: 5 φορές την εβδομάδα",
    "program.05.details.3": "Πρόγραμμα: Δευτέρα έως Παρασκευή στις 20:00-21:30",
    "program.05.details.4": "Εστίαση: Τεχνικές χτυπήματος, φυσική κατάσταση και ψυχική αντοχή",
    "program.05.benefits.0": "Βελτιωμένες δεξιότητες χτυπήματος",
    "program.05.benefits.1": "Ενισχυμένη καρδιαγγειακή προετοιμασία",
    "program.05.benefits.2": "Αυξημένη ψυχική αντοχή",
    "program.05.benefits.3": "Ανάπτυξη ικανοτήτων αυτοάμυνας",

    // Program Details - One by One Training (06)
    "program.06.title": "Ατομική Προπόνηση",
    "program.06.subtitle": "Εξατομικευμένη Αριστεία",
    "program.06.fullDescription":
      "Το πρόγραμμα Ατομικής Προπόνησης προσφέρει εξατομικευμένη καθοδήγηση προσαρμοσμένη στους συγκεκριμένους στόχους και τις ανάγκες σας. Δουλεύοντας απευθείας με έναν από τους έμπειρους προπονητές μας, θα λάβετε εξατομικευμένη προσοχή και προσαρμοσμένο προγραμματισμό.",
    "program.06.details.0": "Ηλικίες: Όλες οι ηλικίες",
    "program.06.details.1": "Διάρκεια: 60 λεπτά",
    "program.06.details.2": "Συχνότητα: Με βάση τις ατομικές ανάγκες",
    "program.06.details.3": "Εστίαση: Εξατομικευμένη προπόνηση και προσαρμοσμένος προγραμματισμός",
    "program.06.benefits.0": "Εξατομικευμένη προσοχή",
    "program.06.benefits.1": "Προσαρμοσμένος προγραμματισμός",
    "program.06.benefits.2": "Λεπτομερής ανατροφοδότηση και καθοδήγηση",
    "program.06.benefits.3": "Επιταχυνόμενη πρόοδος προς τους στόχους",

    // Program Details - Athlete Performance (07)
    "program.07.title": "Αθλητική Απόδοση",
    "program.07.subtitle": "Προπόνηση Ελίτ για Πρωταθλητές",
    "program.07.fullDescription":
      "Το πρόγραμμα Αθλητικής Απόδοσης είναι σχεδιασμένο για αγωνιστικούς αθλητές που θέλουν να ανεβάσουν την απόδοσή τους στο επόμενο επίπεδο. Χρησιμοποιώντας προηγμένες μεθόδους προπόνησης και παρακολούθηση απόδοσης, βοηθάμε τους αθλητές να διαπρέψουν στο άθλημά τους.",
    "program.07.details.0": "Ηλικίες: 16+ ετών",
    "program.07.details.1": "Διάρκεια: 90-120 λεπτά",
    "program.07.details.2": "Συχνότητα: 3-5 φορές την εβδομάδα",
    "program.07.details.3": "Εστίαση: Ενίσχυση αθλητικής απόδοσης",
    "program.07.benefits.0": "Βελτιωμένη αθλητική απόδοση",
    "program.07.benefits.1": "Ενισχυμένη δύναμη, ισχύς και ταχύτητα",
    "program.07.benefits.2": "Βελτιστοποιημένη ανάκαμψη και πρόληψη τραυματισμών",
    "program.07.benefits.3": "Παρακολούθηση απόδοσης και ανατροφοδότηση",

    // Program Details - Custom Design Program (08)
    "program.08.title": "Εξατομικευμένο Πρόγραμμα",
    "program.08.subtitle": "Προσαρμοσμένη Προπόνηση για τους Μοναδικούς σας Στόχους",
    "program.08.fullDescription":
      "Το Εξατομικευμένο Πρόγραμμα προσφέρει πλήρως εξατομικευμένες λύσεις προπόνησης δημιουργημένες ειδικά για τους μοναδικούς στόχους, ανάγκες και περιστάσεις σας. Εργαζόμενοι στενά με τους ειδικούς προπονητές μας, θα σχεδιάσουμε ένα πρόγραμμα που ταιριάζει τέλεια στον τρόπο ζωής σας ενώ παραδίδει βέλτιστα αποτελέσματα.",
    "program.08.details.0": "Ηλικίες: Όλες οι ηλικίες",
    "program.08.details.1": "Διάρκεια: Προσαρμοσμένη",
    "program.08.details.2": "Συχνότητα: Βάσει των στόχων και διαθεσιμότητάς σας",
    "program.08.details.3": "Μέγεθος ομάδας: Ατομικά ή μικρές ομάδες",
    "program.08.details.4": "Εστίαση: Πλήρως εξατομικευμένο στις συγκεκριμένες ανάγκες σας",
    "program.08.benefits.0": "100% εξατομικευμένος σχεδιασμός προγράμματος",
    "program.08.benefits.1": "Ευέλικτος προγραμματισμός και μορφή",
    "program.08.benefits.2": "Συνεχείς προσαρμογές προγράμματος",
    "program.08.benefits.3": "Εξειδικευμένη επίτευξη στόχων",

    // Common Program Page Text
    "program.info.title": "Εξερεύνησε το",
    "program.info.titleHighlight": "Ταξίδι Προπόνησής σου",
    "program.info.subtitle": "Πληροφορίες Προγράμματος",
    "program.details": "Λεπτομέρειες Προγράμματος",
    "program.benefits": "Οφέλη Προγράμματος",
    "program.schedule": "Εβδομαδιαίο Πρόγραμμα",
    "program.pricing": "Πακέτα Τιμών",
    "program.coach": "Γνώρισε τον Προπονητή σου",
    "program.ready": "Έτοιμος να Ξεκινήσεις το Ταξίδι σου;",
    "program.join": "Γίνε μέλος του προγράμματος",
    "program.transform": "και μεταμόρφωσε τη φυσική σου κατάσταση σήμερα.",
    "program.reserve": "Κράτησε τη Θέση σου",
    "program.contactUs": "Επικοινώνησε Μαζί μας",

    // Schedule Text
    "schedule.title": "Εβδομαδιαίο Πρόγραμμα",
    "schedule.note": "Σημείωση:",
    "schedule.contact": "Επικοινωνήστε μαζί μας για εγγραφή και οποιεσδήποτε ερωτήσεις προγραμματισμού.",
    "schedule.availability": "Διαθεσιμότητα:",
    "schedule.hours": "Ώρες:",
    "schedule.flexible": "Ευέλικτος προγραμματισμός διαθέσιμος για να ικανοποιήσει τις ανάγκες σας.",

    // Coach Information
    "coach.name": "Γιώργος Ζυγούρης",
    "coach.title": "Κύριος Προπονητής & Ειδικός Κίνησης",
    "coach.bio":
      "Απόφοιτος της Σχολής Φυσικής Αγωγής και Αθλητισμού του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Επαγγελματίας αθλητής Muay Thai και πιστοποιημένος προπονητής.",

    // Pricing
    "pricing.monthly": "Μηνιαίο",
    "pricing.quarterly": "Τριμηνιαίο",
    "pricing.annual": "Ετήσιο",
    "pricing.session": "Συνεδρία",
    "pricing.sessions12": "12 Συνεδρίες",
    "pricing.sessions24": "24 Συνεδρίες",
    "pricing.popular": "ΔΗΜΟΦΙΛΕΣ",
    "pricing.choose": "Επιλογή Πακέτου",
    "pricing.perMonth": "/μήνα",
    "pricing.perSession": "/συνεδρία",
    "pricing.perQuarter": "/τρίμηνο",
    "pricing.perYear": "/έτος",
    "pricing.features.coaching": "Εξατομικευμένη καθοδήγηση",
    "pricing.features.tracking": "Παρακολούθηση προόδου",
    "pricing.features.scheduling": "Ευέλικτος προγραμματισμός",
    "pricing.features.priority": "Προτεραιότητα κράτησης",
    "pricing.features.assessment": "Δωρεάν αξιολόγηση",
    "pricing.features.nutrition": "Διατροφικό πλάνο περιλαμβάνεται",
    "pricing.features.physiotherapy": "Φυσιοθεραπεία περιλαμβάνεται",
    "pricing.features.weight": "Προπόνηση με βάρη περιλαμβάνεται",
    "pricing.features.fighting": "Δραστηριότητες επαγγελματικής πάλης περιλαμβάνονται",

    // About Section
    "about.subtitle": "Σχετικά με Εμάς",
    "about.title": "Υποστηρίζοντας το",
    "about.titleHighlight": "Αθλητικό σας Ταξίδι",
    "about.athleticYour": "Αθλητικό σας",
    "about.journey": "Ταξίδι",
    "about.tab1": "Κύριος Προπονητής",
    "about.tab2": "Το Όραμά μας",
    "about.tab3": "Μεθοδολογία Προπόνησης",
    "about.headCoach.title": "Κύριος Προπονητής",
    "about.headCoach.description":
      "Το όνομά μου είναι Γιώργος Ζυγούρης και είμαι απόφοιτος της Σχολής Φυσικής Αγωγής και Αθλητισμού του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης (2023). Είμαι επαγγελματίας αθλητής Muay Thai και πιστοποιημένος προπονητής από το 2024. Μέσα από τη διπλή μου οπτική ως αγωνιστής και εκπαιδευτικός, έχω δημιουργήσει ένα περιβάλλον προπόνησης όπου παιδιά, έφηβοι και ενήλικες δεν μαθαίνουν απλώς κίνηση—ανακαλύπτουν τις δυνάμεις τους, χτίζουν χαρακτήρα μέσω του αθλητισμού και βρίσκουν τη μοναδική τους θέση στον αθλητικό κόσμο.",

    // About Section - Head Coach Boxes
    "about.headCoach.box1.title": "Ακαδημαϊκό Υπόβαθρο",
    "about.headCoach.box1.description":
      "Απόφοιτος της Σχολής Φυσικής Αγωγής και Αθλητισμού του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης (2023)",
    "about.headCoach.box2.title": "Επαγγελματίας Αθλητής",
    "about.headCoach.box2.description": "Επαγγελματίας αθλητής Muay Thai με εμπειρία σε αγώνες υψηλού επιπέδου",
    "about.headCoach.box3.title": "Βασικές Αξίες",
    "about.headCoach.box3.description":
      "Ο στόχος μας δεν είναι μόνο η φυσική βελτίωση, αλλά και η καλλιέργεια αυτοπεποίθησης, χαρακτήρα και βασικών αξιών",

    "about.vision.title": "Το Όραμά μας",
    "about.vision.description":
      "Συνδυάζοντας επιστημονική γνώση με πραγματική εμπειρία, εφαρμόζουμε ανάπτυξη δεξιοτήτων και προπόνηση εστιασμένη στην απόδοση, προσαρμοσμένη σε κάθε ηλικία και στάδιο. Βλέπουμε την κίνηση ως κάτι περισσότερο από φυσικό — είναι αυτοέκφραση, αυτοπεποίθηση και η δύναμη να μεγαλώνουμε μέσα από την πρόκληση. Η αποστολή μας είναι να βοηθήσουμε τους νέους να εμπιστευτούν τη διαδικασία και να εξερευνήσουν τις δυνατότητές τους σε έναν ασφαλή, υποστηρικτικό χώρο.",

    // About Section - Vision Boxes
    "about.vision.box1.title": "Περισσότερο από Φυσικό",
    "about.vision.box1.description":
      "Δεν προπονούμε απλώς σώματα. Διαμορφώνουμε χαρακτήρα. Κάθε παιδί είναι ένας κόσμος σε κίνηση, και η κίνηση είναι αυτοέκφραση, αυτοπεποίθηση και ανάπτυξη.",
    "about.vision.box2.title": "Χτίσιμο Χαρακτήρα",
    "about.vision.box2.description":
      "Διδάσκουμε σεβασμό, πειθαρχία, επιμονή και συνεργασία. Στόχος μας είναι να δημιουργήσουμε ένα σχολείο ζωής όπου τα παιδιά μαθαίνουν να στέκονται όρθια φυσικά, ψυχικά και ηθικά.",
    "about.vision.box3.title": "Εμπιστοσύνη στη Διαδικασία",
    "about.vision.box3.description":
      "Για εμάς, το αύριο αρχίζει σήμερα. Βήμα βήμα. Με εμπιστοσύνη στη διαδικασία. Με το κουράγιο να πάμε παραπέρα. Με τη θέληση να ξεπεράσουμε τα όρια.",

    "about.methodology.title": "Μεθοδολογία Προπόνησης",
    "about.methodology.description":
      "Η μεθοδολογία προπόνησής μας εστιάζει στην προοδευτική ανάπτυξη δεξιοτήτων και την ενίσχυση των σωστών κινητικών προτύπων προσαρμοσμένων στις ανάγκες και στόχους κάθε ατόμου. Μέσω ολοκληρωμένης αξιολόγησης, κατανοούμε τις τρέχουσες ικανότητες και αδυναμίες σας, καθορίζουμε σαφείς στόχους προπόνησης, δημιουργούμε ένα δομημένο χρονοδιάγραμμα για την επίτευξη και σχεδιάζουμε ένα αποκλειστικό εξατομικευμένο πρόγραμμα προπόνησης ειδικά για εσάς.",

    // About Section - Methodology Boxes
    "about.methodology.box1.title": "Κινητικές Δεξιότητες",
    "about.methodology.box1.item1": "Ανάπτυξη Αθλητικών Δεξιοτήτων",
    "about.methodology.box1.item2": "Κατάλληλο για την Ηλικία",
    "about.methodology.box1.item3":
      "Ρίψεις & Πιασίματα, Δεξιότητες Αναρρίχησης, Άλματα & Προσγειώσεις, Τρεξίματα Ευκινησίας, Συντονισμός",
    "about.methodology.box2.title": "Αξιολόγηση",
    "about.methodology.box2.item1": "Κίνηση & Στάση",
    "about.methodology.box2.item2": "Προφίλ φορτίου - ταχύτητας",
    "about.methodology.box2.item3": "Προφίλ άλματος",
    "about.methodology.box2.item4": "Αντοχή",
    "about.methodology.box3.title": "Εστιασμένα στα Αποτελέσματα",
    "about.methodology.box3.item1": "Παρακολούθηση Αποτελεσμάτων",
    "about.methodology.box3.item2": "Καθοδήγηση Απόδοσης",
    "about.methodology.box3.item3": "Ανάπτυξη Προσαρμοσμένου Προγράμματος",

    // Training Section
    "training.title": "Μεθοδολογία Προπόνησης Ελίτ",
    "training.description":
      "Η μεθοδολογία προπόνησής μας βασίζεται σε επιστημονικές αρχές και χρόνια εμπειρίας εργασίας με αθλητές ελίτ. Εστιάζουμε στην ανάπτυξη όλων των πτυχών της αθλητικής απόδοσης συμπεριλαμβανομένων:",
    "training.mobility": "Κινητικότητα & Ευλυγισία",
    "training.speed": "Ταχύτητα & Ευκινησία",
    "training.strength": "Δύναμη & Ισχύς",
    "training.endurance": "Αντοχή & Αντοχή",
    "training.technology":
      "Χρησιμοποιούμε τεχνολογία αιχμής για την παρακολούθηση μετρήσεων απόδοσης σε πραγματικό χρόνο, επιτρέποντας ακριβείς προσαρμογές και βέλτιστα αποτελέσματα προπόνησης.",
    "training.button": "Η ΠΡΟΣΕΓΓΙΣΗ ΜΑΣ",
    "training.advanced": "Προηγμένη Τεχνολογία",
    "training.realTime": "Παρακολούθηση απόδοσης σε πραγματικό χρόνο για βέλτιστα αποτελέσματα",

    // Testimonials Section
    "testimonials.title": "Αποτελέσματα Αθλητών",
    "testimonials.description":
      "Μην παίρνετε μόνο τον δικό μας λόγο. Ακούστε από τους αθλητές που έχουν βιώσει τη διαφορά του Performance.",

    // CTA Section
    "cta.title": "Έτοιμος να Ανεβάσεις την Απόδοσή σου;",
    "cta.description":
      "Γίνε μέλος της κοινότητάς μας αθλητών και ξεκίνα το ταξίδι σου προς την κορυφαία απόδοση σήμερα.",
    "cta.button": "Ξεκίνα Τώρα",

    // Footer
    "footer.contact": "Επικοινωνία",
    "footer.hours": "Ώρες",
    "footer.monday": "Δευτέρα - Παρασκευή:",
    "footer.saturday": "Σάββατο:",
    "footer.sunday": "Κυριακή:",
    "footer.closed": "Κλειστά",
    "footer.rights": "© 2023 hyperkids. Όλα τα δικαιώματα διατηρούνται.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("el")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "el")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
