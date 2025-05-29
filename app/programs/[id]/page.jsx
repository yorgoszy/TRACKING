"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useLanguage } from "@/contexts/language-context"

export default function ProgramPage() {
  const params = useParams()
  const router = useRouter()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const { language } = useLanguage()

  const infoRef = useRef(null)
  const coachRef = useRef(null)

  const programs = [
    {
      id: "01",
      title: "Movement Learning",
      titleGR: "Εκμάθηση Κίνησης",
      subtitle: "Foundation for Athletic Excellence",
      subtitleGR: "Θεμέλιο για Αθλητική Αριστεία",
      description: "Introductory movement techniques",
      descriptionGR: "Εισαγωγικές τεχνικές κίνησης",
      heroImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/healthy%20%285%29-pROfPw5NNcOPTmqt2U6YucoJGsmCPa.png",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/healthy%20%285%29-pROfPw5NNcOPTmqt2U6YucoJGsmCPa.png",
      fullDescription:
        "Our Movement Learning program is designed for beginners who want to develop fundamental movement skills. This program focuses on body awareness, coordination, and basic movement patterns that form the foundation for all physical activities.",
      fullDescriptionGR:
        "Το πρόγραμμα Εκμάθησης Κίνησης είναι σχεδιασμένο για αρχάριους που θέλουν να αναπτύξουν βασικές κινητικές δεξιότητες. Αυτό το πρόγραμμα επικεντρώνεται στη σωματική επίγνωση, το συντονισμό και τα βασικά πρότυπα κίνησης που αποτελούν το θεμέλιο για όλες τις σωματικές δραστηριότητες.",
      details: ["Ages: 4-8 years", "Duration: 45 minutes", "Frequency: 1 time per week", "Schedule: Wednesday"],
      detailsGR: ["Ηλικίες: 4-8 ετών", "Διάρκεια: 45 λεπτά", "Συχνότητα: 1 φορά την εβδομάδα", "Πρόγραμμα: Τετάρτη"],
      benefits: [
        "Development of fundamental movement skills and coordination",
        "Learning rhythm and timing in movement patterns",
        "Building cooperation and teamwork abilities",
        "Establishing good behavior patterns and discipline",
      ],
      benefitsGR: [
        "Ανάπτυξη βασικών κινητικών δεξιοτήτων και συντονισμού",
        "Εκμάθηση ρυθμού και χρονισμού στα πρότυπα κίνησης",
        "Οικοδόμηση συνεργασίας και ομαδικότητας",
        "Καθιέρωση καλών προτύπων συμπεριφοράς και πειθαρχίας",
      ],
      schedule: {
        availability: "Wednesday",
        availabilityGR: "Τετάρτη",
        hours: "Ages 4-6: 17:15-18:00 | Ages 6-8: 18:15-19:00",
        hoursGR: "Ηλικίες 4-6: 17:15-18:00 | Ηλικίες 6-8: 18:15-19:00",
      },
      pricing: {
        monthly: {
          price: 50,
          sessions: "4 sessions per month (1 per week)",
          sessionsGR: "4 συνεδρίες το μήνα (1 ανά εβδομάδα)",
        },
        quarterly: {
          price: 120,
          sessions: "12 sessions (3 months)",
          sessionsGR: "12 συνεδρίες (3 μήνες)",
          savings: "Save €30",
          savingsGR: "Εξοικονομήστε €30",
        },
        annual: {
          price: 360,
          sessions: "48 sessions (12 months)",
          sessionsGR: "48 συνεδρίες (12 μήνες)",
          savings: "Save €240",
          savingsGR: "Εξοικονομήστε €240",
        },
      },
      coach: {
        name: "Georgios Zygouris",
        nameGR: "Γεώργιος Ζυγούρης",
        title: "Head Coach & Movement Specialist",
        titleGR: "Επικεφαλής Προπονητής & Ειδικός Κίνησης",
        bio: "Graduate of the School of Physical Education and Sport Science at the Aristotle University of Thessaloniki. Professional Muay Thai athlete and certified coach.",
        bioGR:
          "Απόφοιτος της Σχολής Φυσικής Αγωγής και Αθλητισμού του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Επαγγελματίας αθλητής Muay Thai και πιστοποιημένος προπονητής.",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281150%20x%20650%20px%29%20%283%29-QL7NMzkvg4ZjsbfomgTbHHPk2t72BP.png",
      },
    },
    {
      id: "02",
      title: "Movement Development",
      titleGR: "Ανάπτυξη Κίνησης",
      subtitle: "Building Athletic Foundations",
      subtitleGR: "Οικοδόμηση Αθλητικών Θεμελίων",
      description: "Building athletic foundations for all sports",
      descriptionGR: "Οικοδόμηση αθλητικών θεμελίων για όλα τα αθλήματα",
      heroImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%28426%20x%20480%20px%29%20%285%29-JbSLdM8vbTecDDIoWInJLnCWkwhO9x.png",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%28426%20x%20480%29%20%285%29-JbSLdM8vbTecDDIoWInJLnCWkwhO9x.png",
      fullDescription:
        "The Movement Development program builds upon basic movement skills to develop athletic foundations applicable to all sports. This program emphasizes proper movement mechanics, strength development, and sport-specific skills.",
      fullDescriptionGR:
        "Το πρόγραμμα Ανάπτυξης Κίνησης βασίζεται σε βασικές κινητικές δεξιότητες για την ανάπτυξη αθλητικών θεμελίων που εφαρμόζονται σε όλα τα αθλήματα. Αυτό το πρόγραμμα δίνει έμφαση στη σωστή μηχανική κίνησης, την ανάπτυξη δύναμης και τις ειδικές δεξιότητες για κάθε άθλημα.",
      details: [
        "Ages: 8-12 years",
        "Duration: 60 minutes",
        "Frequency: 2 times per week",
        "Schedule: Tuesday & Thursday",
      ],
      detailsGR: [
        "Ηλικίες: 8-12 ετών",
        "Διάρκεια: 60 λεπτά",
        "Συχνότητα: 2 φορές την εβδομάδα",
        "Πρόγραμμα: Τρίτη & Πέμπτη",
      ],
      benefits: [
        "Improved athletic performance",
        "Enhanced movement efficiency",
        "Development of sport-specific skills",
        "Reduced risk of injury",
      ],
      benefitsGR: [
        "Βελτιωμένη αθλητική απόδοση",
        "Ενισχυμένη αποτελεσματικότητα κίνησης",
        "Ανάπτυξη ειδικών αθλητικών δεξιοτήτων",
        "Μειωμένος κίνδυνος τραυματισμού",
      ],
      schedule: {
        availability: "Tuesday & Thursday",
        availabilityGR: "Τρίτη & Πέμπτη",
        hours: "Ages 8-10: 18:00-19:00 | Ages 10-12: 19:00-20:00",
        hoursGR: "Ηλικίες 8-10: 18:00-19:00 | Ηλικίες 10-12: 19:00-20:00",
      },
      pricing: {
        monthly: {
          price: 70,
          sessions: "8 sessions per month (2 per week)",
          sessionsGR: "8 συνεδρίες το μήνα (2 ανά εβδομάδα)",
        },
        quarterly: {
          price: 180,
          sessions: "24 sessions (3 months)",
          sessionsGR: "24 συνεδρίες (3 μήνες)",
          savings: "Save €30",
          savingsGR: "Εξοικονομήστε €30",
        },
        annual: {
          price: 600,
          sessions: "96 sessions (12 months)",
          sessionsGR: "96 συνεδρίες (12 μήνες)",
          savings: "Save €240",
          savingsGR: "Εξοικονομήστε €240",
        },
      },
      coach: {
        name: "Georgios Zygouris",
        nameGR: "Γεώργιος Ζυγούρης",
        title: "Head Coach & Movement Specialist",
        titleGR: "Επικεφαλής Προπονητής & Ειδικός Κίνησης",
        bio: "Graduate of the School of Physical Education and Sport Science at the Aristotle University of Thessaloniki. Professional Muay Thai athlete and certified coach.",
        bioGR:
          "Απόφοιτος της Σχολής Φυσικής Αγωγής και Αθλητισμού του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Επαγγελματίας αθλητής Muay Thai και πιστοποιημένος προπονητής.",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281150%20x%20650%20px%29%20%283%29-QL7NMzkvg4ZjsbfomgTbHHPk2t72BP.png",
      },
    },
    {
      id: "03",
      title: "Youth Strength",
      titleGR: "Δύναμη Νέων",
      subtitle: "Advanced Training for Young Athletes",
      subtitleGR: "Προχωρημένη Προπόνηση για Νέους Αθλητές",
      description: "Advanced techniques and conditioning",
      descriptionGR: "Προχωρημένες τεχνικές και προετοιμασία",
      heroImage: "/youth-strength-training.png",
      image: "/youth-strength-training.png",
      fullDescription:
        "Our Youth Strength program is designed for adolescents aged 13-17 who want to develop strength, power, and endurance. This program focuses on introducing proper strength training techniques and basic weightlifting movements that form the foundation of athletic performance and strength training.",
      fullDescriptionGR:
        "Το πρόγραμμα Δύναμης Νέων είναι σχεδιασμένο για εφήβους ηλικίας 13-17 ετών που θέλουν να αναπτύξουν δύναμη, ισχύ και αντοχή. Αυτό το πρόγραμμα επικεντρώνεται στην εισαγωγή κατάλληλων τεχνικών προπόνησης δύναμης και βασικών κινήσεων άρσης βαρών που αποτελούν τη βάση της αθλητικής απόδοσης και της προπόνησης δύναμης.",
      details: [
        "Ages: 13-17 years",
        "Duration: 60 minutes",
        "Frequency: 3 times per week",
        "Schedule: Monday, Wednesday, Friday",
      ],
      detailsGR: [
        "Ηλικίες: 13-17 ετών",
        "Διάρκεια: 60 λεπτά",
        "Συχνότητα: 3 φορές την εβδομάδα",
        "Πρόγραμμα: Δευτέρα, Τετάρτη, Παρασκευή",
      ],
      benefits: [
        "Increased strength and power",
        "Improved body composition",
        "Enhanced athletic performance",
        "Development of proper lifting techniques",
      ],
      benefitsGR: [
        "Αυξημένη δύναμη και ισχύς",
        "Βελτιωμένη σύσταση σώματος",
        "Ενισχυμένη αθλητική απόδοση",
        "Ανάπτυξη σωστών τεχνικών άρσης βαρών",
      ],
      schedule: {
        availability: "Monday, Wednesday, Friday",
        availabilityGR: "Δευτέρα, Τετάρτη, Παρασκευή",
        hours: "19:00 - 20:00",
        hoursGR: "19:00 - 20:00",
      },
      pricing: {
        monthly: {
          price: 90,
          sessions: "12 sessions per month (3 per week)",
          sessionsGR: "12 συνεδρίες το μήνα (3 ανά εβδομάδα)",
        },
        quarterly: {
          price: 240,
          sessions: "36 sessions (3 months)",
          sessionsGR: "36 συνεδρίες (3 μήνες)",
          savings: "Save €30",
          savingsGR: "Εξοικονομήστε €30",
        },
        annual: {
          price: 850,
          sessions: "144 sessions (12 months)",
          sessionsGR: "144 συνεδρίες (12 μήνες)",
          savings: "Save €230",
          savingsGR: "Εξοικονομήστε €230",
        },
      },
      coach: {
        name: "Georgios Zygouris",
        nameGR: "Γεώργιος Ζυγούρης",
        title: "Head Coach & Movement Specialist",
        titleGR: "Επικεφαλής Προπονητής & Ειδικός Κίνησης",
        bio: "Graduate of the School of Physical Education and Sport Science at the Aristotle University of Thessaloniki. Professional Muay Thai athlete and certified coach.",
        bioGR:
          "Απόφοιτος της Σχολής Φυσικής Αγωγής και Αθλητισμού του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Επαγγελματίας αθλητής Muay Thai και πιστοποιημένος προπονητής.",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281150%20x%20650%20px%29%20%283%29-QL7NMzkvg4ZjsbfomgTbHHPk2t72BP.png",
      },
    },
    {
      id: "04",
      title: "Fitness",
      titleGR: "Φυσική Κατάσταση",
      subtitle: "Total Body Transformation",
      subtitleGR: "Ολική Μεταμόρφωση Σώματος",
      description: "Customized fitness solutions for all levels",
      descriptionGR: "Εξατομικευμένες λύσεις φυσικής κατάστασης για όλα τα επίπεδα",
      heroImage: "/strength-conditioning-training.png",
      image: "/strength-conditioning-training.png",
      fullDescription:
        "Our Fitness program offers customized training solutions for adults of all fitness levels. Whether you're looking to lose weight, build muscle, or improve overall health, our experienced coaches will design a program tailored to your specific goals.",
      fullDescriptionGR:
        "Το πρόγραμμα Φυσικής Κατάστασης προσφέρει εξατομικευμένες λύσεις προπόνησης για ενήλικες όλων των επιπέδων φυσικής κατάστασης. Είτε θέλετε να χάσετε βάρος, να χτίσετε μυς ή να βελτιώσετε τη συνολική υγεία σας, οι έμπειροι προπονητές μας θα σχεδιάσουν ένα πρόγραμμα προσαρμοσμένο στους συγκεκριμένους στόχους σας.",
      details: [
        "Ages: 18+ years",
        "Duration: 60-90 minutes",
        "Frequency: 2-5 times per week",
        "Group size: Maximum 6 people",
        "Custom program design",
        "Focus: General fitness, weight management, and overall health",
      ],
      detailsGR: [
        "Ηλικίες: 18+ ετών",
        "Διάρκεια: 60-90 λεπτά",
        "Συχνότητα: 2-5 φορές την εβδομάδα",
        "Μέγεθος ομάδας: Μέγιστο 6 άτομα",
        "Προσαρμοσμένος σχεδιασμός προγράμματος",
        "Εστίαση: Γενική φυσική κατάσταση, διαχείριση βάρους και συνολική υγεία",
      ],
      benefits: [
        "Improved cardiovascular health",
        "Enhanced muscular strength and endurance",
        "Better body composition",
        "Increased energy and vitality",
      ],
      benefitsGR: [
        "Βελτιωμένη καρδιαγγειακή υγεία",
        "Ενισχυμένη μυϊκή δύναμη και αντοχή",
        "Καλύτερη σύσταση σώματος",
        "Αυξημένη ενέργεια και ζωτικότητα",
      ],
      schedule: {
        availability: "Daily by appointment",
        availabilityGR: "Καθημερινά με ραντεβού",
        hours: "7:00 - 20:00",
        hoursGR: "7:00 - 20:00",
      },
      pricing: {
        monthly: {
          price: 110,
          sessions: "Flexible sessions per month",
          sessionsGR: "Ευέλικτες συνεδρίες ανά μήνα",
        },
        quarterly: {
          price: 300,
          sessions: "3 months access",
          sessionsGR: "Πρόσβαση 3 μηνών",
          savings: "Save €30",
          savingsGR: "Εξοικονομήστε €30",
        },
        annual: {
          price: 1050,
          sessions: "12 months access",
          sessionsGR: "Πρόσβαση 12 μηνών",
          savings: "Save €270",
          savingsGR: "Εξοικονομήστε €270",
        },
      },
      coach: {
        name: "Georgios Zygouris",
        nameGR: "Γεώργιος Ζυγούρης",
        title: "Head Coach & Movement Specialist",
        titleGR: "Επικεφαλής Προπονητής & Ειδικός Κίνησης",
        bio: "Graduate of the School of Physical Education and Sport Science at the Aristotle University of Thessaloniki. Professional Muay Thai athlete and certified coach.",
        bioGR:
          "Απόφοιτος της Σχολής Φυσικής Αγωγής και Αθλητισμού του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Επαγγελματίας αθλητής Muay Thai και πιστοποιημένος προπονητής.",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281150%20x%20650%20px%29%20%283%29-QL7NMzkvg4ZjsbfomgTbHHPk2t72BP.png",
      },
    },
    {
      id: "05",
      title: "Muay Thai",
      titleGR: "Muay Thai",
      subtitle: "The Art of Eight Limbs",
      subtitleGR: "Η Τέχνη των Οκτώ Άκρων",
      description: "Next-Gen Training Methods",
      descriptionGR: "Μέθοδοι Προπόνησης Νέας Γενιάς",
      heroImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%28426%20x%20480%29%20%2810%29-r2fKUeFRLK9yPcIAARBUlDqfQXrdOA.png",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%28426%20x%20480%29%2810%29-r2fKUeFRLK9yPcIAARBUlDqfQXrdOA.png",
      fullDescription:
        "Our Muay Thai program combines traditional techniques with modern training methods to develop striking skills, conditioning, and mental toughness. Whether you're interested in competition or just want a challenging workout, our Muay Thai program offers something for everyone.",
      fullDescriptionGR:
        "Το πρόγραμμα Muay Thai συνδυάζει παραδοσιακές τεχνικές με σύγχρονες μεθόδους προπόνησης για την ανάπτυξη δεξιοτήτων χτυπήματος, φυσικής κατάστασης και ψυχικής αντοχής. Είτε ενδιαφέρεστε για αγώνες είτε απλά θέλετε μια απαιτητική προπόνηση, το πρόγραμμα Muay Thai προσφέρει κάτι για όλους.",
      details: [
        "Ages: 16+ years",
        "Duration: 90 minutes",
        "Frequency: 5 times per week",
        "Schedule: Monday to Friday at 20:00-21:30",
        "Focus: Striking techniques, conditioning, and mental toughness",
      ],
      detailsGR: [
        "Ηλικίες: 16+ ετών",
        "Διάρκεια: 90 λεπτά",
        "Συχνότητα: 5 φορές την εβδομάδα",
        "Πρόγραμμα: Δευτέρα έως Παρασκευή στις 20:00-21:30",
        "Εστίαση: Τεχνικές χτυπήματος, φυσική κατάσταση και ψυχική αντοχή",
      ],
      benefits: [
        "Improved striking skills",
        "Enhanced cardiovascular conditioning",
        "Increased mental toughness",
        "Development of self-defense capabilities",
      ],
      benefitsGR: [
        "Βελτιωμένες δεξιότητες χτυπήματος",
        "Ενισχυμένη καρδιαγγειακή προετοιμασία",
        "Αυξημένη ψυχική αντοχή",
        "Ανάπτυξη ικανοτήτων αυτοάμυνας",
      ],
      schedule: {
        availability: "Monday to Friday",
        availabilityGR: "Δευτέρα έως Παρασκευή",
        hours: "20:00 - 21:30",
        hoursGR: "20:00 - 21:30",
      },
      pricing: {
        monthly: {
          price: 70,
          sessions: "20 sessions per month (5 per week)",
          sessionsGR: "20 συνεδρίες το μήνα (5 ανά εβδομάδα)",
        },
        quarterly: {
          price: 270,
          sessions: "60 sessions (3 months) + weight training",
          sessionsGR: "60 συνεδρίες (3 μήνες) + προπόνηση με βάρη",
          savings: "Includes weight training",
          savingsGR: "Περιλαμβάνει προπόνηση με βάρη",
        },
        annual: {
          price: 850,
          sessions: "240 sessions (12 months) + pro fighting activities",
          sessionsGR: "240 συνεδρίες (12 μήνες) + επαγγελματικές δραστηριότητες μάχης",
          savings: "Includes pro fighting activities",
          savingsGR: "Περιλαμβάνει επαγγελματικές δραστηριότητες μάχης",
        },
      },
      coach: {
        name: "Georgios Zygouris",
        nameGR: "Γεώργιος Ζυγούρης",
        title: "Head Coach & Professional Muay Thai Athlete",
        titleGR: "Επικεφαλής Προπονητής & Επαγγελματίας Αθλητής Muay Thai",
        bio: "Graduate of the School of Physical Education and Sport Science at the Aristotle University of Thessaloniki. Professional Muay Thai athlete and certified coach with extensive competition experience.",
        bioGR:
          "Απόφοιτος της Σχολής Φυσικής Αγωγής και Αθλητισμού του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Επαγγελματίας αθλητής Muay Thai και πιστοποιημένος προπονητής με εκτεταμένη αγωνιστική εμπειρία.",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281150%20x%20650%20px%29%20%283%29-QL7NMzkvg4ZjsbfomgTbHHPk2t72BP.png",
      },
    },
    {
      id: "06",
      title: "One by One Training",
      titleGR: "Προπόνηση Ένας προς Έναν",
      subtitle: "Personalized Excellence",
      subtitleGR: "Εξατομικευμένη Αριστεία",
      description: "Personalized coaching for maximum results",
      descriptionGR: "Εξατομικευμένη προπόνηση για μέγιστα αποτελέσματα",
      heroImage: "/one-by-one-training.png",
      image: "/one-by-one-training.png",
      fullDescription:
        "Our One by One Training program offers personalized coaching tailored to your specific goals and needs. Working directly with one of our experienced coaches, you'll receive individualized attention and customized programming.",
      fullDescriptionGR:
        "Το πρόγραμμα Προπόνησης Ένας προς Έναν προσφέρει εξατομικευμένη καθοδήγηση προσαρμοσμένη στους συγκεκριμένους στόχους και τις ανάγκες σας. Δουλεύοντας απευθείας με έναν από τους έμπειρους προπονητές μας, θα λάβετε εξατομικευμένη προσοχή και προσαρμοσμένο προγραμματισμό.",
      details: [
        "Ages: All ages",
        "Duration: 60 minutes",
        "Frequency: Based on individual needs",
        "Focus: Personalized coaching and customized programming",
      ],
      detailsGR: [
        "Ηλικίες: Όλες οι ηλικίες",
        "Διάρκεια: 60 λεπτά",
        "Συχνότητα: Με βάση τις ατομικές ανάγκες",
        "Εστίαση: Εξατομικευμένη προπόνηση και προσαρμοσμένος προγραμματισμός",
      ],
      benefits: [
        "Individualized attention",
        "Customized programming",
        "Detailed feedback and coaching",
        "Accelerated progress toward goals",
      ],
      benefitsGR: [
        "Εξατομικευμένη προσοχή",
        "Προσαρμοσμένος προγραμματισμός",
        "Λεπτομερής ανατροφοδότηση και καθοδήγηση",
        "Επιταχυνόμενη πρόοδος προς τους στόχους",
      ],
      schedule: {
        availability: "Daily by appointment",
        availabilityGR: "Καθημερινά με ραντεβού",
        hours: "7:00 - 20:00",
        hoursGR: "7:00 - 20:00",
      },
      pricing: {
        monthly: {
          price: 30,
          sessions: "Individual session booking",
          sessionsGR: "Κράτηση μεμονωμένης συνεδρίας",
        },
        quarterly: {
          price: 25,
          sessions: "12 sessions package",
          sessionsGR: "Πακέτο 12 συνεδριών",
          savings: "Save €5 per session",
          savingsGR: "Εξοικονομήστε €5 ανά συνεδρία",
        },
        annual: {
          price: 20,
          sessions: "24 sessions package",
          sessionsGR: "Πακέτο 24 συνεδριών",
          savings: "Save €10 per session",
          savingsGR: "Εξοικονομήστε €10 ανά συνεδρία",
        },
      },
      coach: {
        name: "Georgios Zygouris",
        nameGR: "Γεώργιος Ζυγούρης",
        title: "Head Coach & Movement Specialist",
        titleGR: "Επικεφαλής Προπονητής & Ειδικός Κίνησης",
        bio: "Graduate of the School of Physical Education and Sport Science at the Aristotle University of Thessaloniki. Professional Muay Thai athlete and certified coach.",
        bioGR:
          "Απόφοιτος της Σχολής Φυσικής Αγωγής και Αθλητισμού του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Επαγγελματίας αθλητής Muay Thai και πιστοποιημένος προπονητής.",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281150%20x%20650%20px%29%20%283%29-QL7NMzkvg4ZjsbfomgTbHHPk2t72BP.png",
      },
    },
    {
      id: "07",
      title: "Athlete Performance",
      titleGR: "Απόδοση Αθλητών",
      subtitle: "Elite Training for Champions",
      subtitleGR: "Ελίτ Προπόνηση για Πρωταθλητές",
      description: "Elite Strength & Conditioning Strategies",
      descriptionGR: "Στρατηγικές Ελίτ Δύναμης & Προετοιμασίας",
      heroImage: "/athlete-performance-training.png",
      image: "/athlete-performance-training.png",
      fullDescription:
        "Our Athlete Performance program is designed for competitive athletes looking to take their performance to the next level. Using advanced training methods and performance monitoring, we help athletes excel in their sport.",
      fullDescriptionGR:
        "Το πρόγραμμα Απόδοσης Αθλητών είναι σχεδιασμένο για αγωνιστικούς αθλητές που θέλουν να ανεβάσουν την απόδοσή τους στο επόμενο επίπεδο. Χρησιμοποιώντας προηγμένες μεθόδους προπόνησης και παρακολούθηση απόδοσης, βοηθάμε τους αθλητές να διαπρέψουν στο άθλημά τους.",
      details: [
        "Ages: 16+ years",
        "Duration: 90-120 minutes",
        "Frequency: 3-5 times per week",
        "Focus: Sport-specific performance enhancement",
      ],
      detailsGR: ["Ηλικίες: 16+ ετών", "Διάρκεια: 90-120 λεπτά", "Συχνότητα: 3-5 φορές την εβδομάδα"],
      benefits: [
        "Improved sport-specific performance",
        "Enhanced strength, power, and speed",
        "Optimized recovery and injury prevention",
        "Performance monitoring and feedback",
      ],
      benefitsGR: [
        "Βελτιωμένη απόδοση ειδικά για το άθλημα",
        "Ενισχυμένη δύναμη, ισχύς και ταχύτητα",
        "Βελτιστοποιημένη ανάκαμψη και πρόληψη τραυματισμών",
        "Παρακολούθηση απόδοσης και ανατροφοδότηση",
      ],
      schedule: {
        availability: "Daily by appointment",
        availabilityGR: "Καθημερινά με ραντεβού",
        hours: "7:00 - 20:00",
        hoursGR: "7:00 - 20:00",
      },
      pricing: {
        monthly: {
          price: 150,
          sessions: "24 sessions per month",
          sessionsGR: "24 συνεδρίες το μήνα",
        },
        quarterly: {
          price: 400,
          sessions: "72 sessions (3 months)",
          sessionsGR: "72 συνεδρίες (3 μήνες)",
          savings: "Save €50",
          savingsGR: "Εξοικονομήστε €50",
        },
        annual: {
          price: 1450,
          sessions: "288 sessions (12 months)",
          sessionsGR: "288 συνεδρίες (12 μήνες)",
          savings: "Save €350",
          savingsGR: "Εξοικονομήστε €350",
        },
      },
      coach: {
        name: "Georgios Zygouris",
        nameGR: "Γεώργιος Ζυγούρης",
        title: "Head Coach & Movement Specialist",
        titleGR: "Επικεφαλής Προπονητής & Ειδικός Κίνησης",
        bio: "Graduate of the School of Physical Education and Sport Science at the Aristotle University of Thessaloniki. Professional Muay Thai athlete and certified coach.",
        bioGR:
          "Απόφοιτος της Σχολής Φυσικής Αγωγής και Αθλητισμού του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Επαγγελματίας αθλητής Muay Thai και πιστοποιημένος προπονητής.",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281150%20x%20650%20px%29%20%283%29-QL7NMzkvg4ZjsbfomgTbHHPk2t72BP.png",
      },
    },
    {
      id: "08",
      title: "Custom Design Program",
      titleGR: "Πρόγραμμα Προσαρμοσμένου Σχεδιασμού",
      subtitle: "Tailored Training for Your Unique Goals",
      subtitleGR: "Προσαρμοσμένη Προπόνηση για τους Μοναδικούς Στόχους Σας",
      description: "Completely personalized program design",
      descriptionGR: "Πλήρως εξατομικευμένος σχεδιασμός προγράμματος",
      heroImage: "/custom-design-program.png",
      image: "/custom-design-program.png",
      fullDescription:
        "Our Custom Design Program offers completely personalized training solutions created specifically for your unique goals, needs, and circumstances. Working closely with our expert coaches, we'll design a program that fits perfectly into your lifestyle while delivering optimal results.",
      fullDescriptionGR:
        "Το Πρόγραμμα Προσαρμοσμένου Σχεδιασμού προσφέρει πλήρως εξατομικευμένες λύσεις προπόνησης που δημιουργούνται ειδικά για τους μοναδικούς στόχους, τις ανάγκες και τις περιστάσεις σας. Συνεργαζόμενοι στενά με τους έμπειρους προπονητές μας, θα σχεδιάσουμε ένα πρόγραμμα που ταιριάζει τέλεια στον τρόπο ζωής σας ενώ παρέχει βέλτιστα αποτελέσματα.",
      details: [
        "Ages: All ages",
        "Duration: Customized",
        "Frequency: Based on your goals and availability",
        "Group size: Individual or small groups",
        "Focus: Completely personalized to your specific needs",
      ],
      detailsGR: [
        "Ηλικίες: Όλες οι ηλικίες",
        "Διάρκεια: Προσαρμοσμένη",
        "Συχνότητα: Με βάση τους στόχους και τη διαθεσιμότητά σας",
        "Μέγεθος ομάδας: Ατομικό ή μικρές ομάδες",
        "Εστίαση: Πλήρως εξατομικευμένο στις συγκεκριμένες ανάγκες σας",
      ],
      benefits: [
        "100% customized program design",
        "Flexible scheduling and format",
        "Ongoing program adjustments",
        "Specialized goal achievement",
      ],
      benefitsGR: [
        "100% προσαρμοσμένος σχεδιασμός προγράμματος",
        "Ευέλικτος προγραμματισμός και μορφή",
        "Συνεχείς προσαρμογές προγράμματος",
        "Εξειδικευμένη επίτευξη στόχων",
      ],
      schedule: {
        availability: "Flexible scheduling",
        availabilityGR: "Ευέλικτος προγραμματισμός",
        hours: "Based on your availability",
        hoursGR: "Με βάση τη διαθεσιμότητά σας",
      },
      pricing: {
        monthly: {
          price: 250,
          sessions: "Custom program design",
          sessionsGR: "Προσαρμοσμένος σχεδιασμός προγράμματος",
        },
        quarterly: {
          price: 650,
          sessions: "3 months custom program",
          sessionsGR: "Προσαρμοσμένο πρόγραμμα 3 μηνών",
          savings: "Save €100",
          savingsGR: "Εξοικονομήστε €100",
        },
        annual: {
          price: 2400,
          sessions: "12 months custom program",
          sessionsGR: "Προσαρμοσμένο πρόγραμμα 12 μηνών",
          savings: "Save €600",
          savingsGR: "Εξοικονομήστε €600",
        },
      },
      coach: {
        name: "Georgios Zygouris",
        nameGR: "Γεώργιος Ζυγούρης",
        title: "Head Coach & Program Designer",
        titleGR: "Επικεφαλής Προπονητής & Σχεδιαστής Προγραμμάτων",
        bio: "Graduate of the School of Physical Education and Sport Science at the Aristotle University of Thessaloniki. Professional Muay Thai athlete and certified coach specializing in personalized program design.",
        bioGR:
          "Απόφοιτος της Σχολής Φυσικής Αγωγής και Αθλητισμού του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Επαγγελματίας αθλητής Muay Thai και πιστοποιημένος προπονητής με ειδίκευση στον εξατομικευμένο σχεδιασμό προγραμμάτων.",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281150%20x%20650%20px%29%20%283%29-QL7NMzkvg4ZjsbfomgTbHHPk2t72BP.png",
      },
    },
  ]

  const tabs = [
    { id: "program-details", label: "Program Details", labelGR: "Λεπτομέρειες Προγράμματος", number: "01" },
    { id: "program-benefits", label: "Program Benefits", labelGR: "Οφέλη Προγράμματος", number: "02" },
    { id: "weekly-schedule", label: "Weekly Schedule", labelGR: "Εβδομαδιαίο Πρόγραμμα", number: "03" },
    { id: "pricing-plans", label: "Pricing Plans", labelGR: "Πακέτα Τιμών", number: "04" },
  ]

  useEffect(() => {
    if (params.id) {
      const foundProgram = programs.find((p) => p.id === params.id)
      if (foundProgram) {
        setProgram(foundProgram)
      } else {
        router.push("/")
      }
    }
    setLoading(false)
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">{language === "el" ? "Φόρτωση..." : "Loading..."}</div>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">{language === "el" ? "Το πρόγραμμα δεν βρέθηκε" : "Program not found"}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-24 pb-12 bg-black text-white">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black to-gray-900">
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="container mx-auto px-4 pt-12 pb-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {language === "el" ? program.titleGR : program.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              {language === "el" ? program.subtitleGR : program.subtitle}
            </p>
          </div>
        </div>

        {/* Αφαιρέθηκαν τα πλαίσια πληροφοριών */}
      </section>

      <section ref={infoRef} id="info" className="pt-32 pb-20 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <span className="text-[#00ffba] text-sm uppercase tracking-wider mb-3 block">
                  {language === "el" ? "Πληροφορίες Προγράμματος" : "Program Information"}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight text-white">
                  {language === "el" ? "Ξεκινήστε" : "Begin Your"} <br />
                  <span className="text-[#00ffba]">{language === "el" ? "το ταξίδι σας" : "Training Journey"}</span>
                </h2>

                <div className="space-y-6 mt-12">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(index)}
                      className={`flex items-center w-full text-left transition-all duration-300 group ${
                        activeTab === index ? "opacity-100" : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <span
                        className={`text-[#00ffba] font-medium mr-4 transition-all duration-300 ${
                          activeTab === index ? "text-2xl" : "text-xl group-hover:text-2xl"
                        }`}
                      >
                        {tab.number}
                      </span>
                      <div>
                        <h3
                          className={`font-bold transition-all duration-300 text-white ${
                            activeTab === index ? "text-xl" : "text-lg"
                          }`}
                        >
                          {language === "el" ? tab.labelGR : tab.label}
                        </h3>
                        <div
                          className={`h-0.5 bg-[#00ffba] mt-2 transition-all duration-300 ${
                            activeTab === index ? "w-full" : "w-0 group-hover:w-1/2"
                          }`}
                        ></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="relative">
                {/* Program Details Tab */}
                <div
                  className={`transition-all duration-500 ${
                    activeTab === 0 ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                  }`}
                >
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    {language === "el" ? "Λεπτομέρειες Προγράμματος" : "Program Details"}
                  </h3>
                  <p className="text-lg text-gray-300 mb-8">
                    {language === "el"
                      ? `Το πρόγραμμα ${program.titleGR} είναι σχεδιασμένο να παρέχει μια ολοκληρωμένη εμπειρία προπόνησης προσαρμοσμένη στις συγκεκριμένες ανάγκες και στόχους σας. Παρακάτω είναι οι βασικές λεπτομέρειες αυτού του προγράμματος.`
                      : `Our ${program.title} program is designed to provide a comprehensive training experience tailored to your specific needs and goals. Below are the key details of this program.`}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    {(language === "el" ? program.detailsGR : program.details).map((detail, index) => (
                      <div key={index} className="bg-gray-900 p-6 rounded-sm border-l-2 border-[#00ffba]">
                        <p className="text-gray-300">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Program Benefits Tab */}
                <div
                  className={`transition-all duration-500 ${
                    activeTab === 1 ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                  }`}
                >
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    {language === "el" ? "Οφέλη Προγράμματος" : "Program Benefits"}
                  </h3>
                  <p className="text-lg text-gray-300 mb-8">
                    {language === "el"
                      ? `Η συμμετοχή στο πρόγραμμα ${program.titleGR} προσφέρει πολλά οφέλη που επεκτείνονται πέρα από τη σωματική κατάσταση. Εδώ είναι τα βασικά πλεονεκτήματα που θα βιώσετε.`
                      : `Participating in our ${program.title} program offers numerous benefits that extend beyond physical fitness. Here are the key advantages you'll experience.`}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    {(language === "el" ? program.benefitsGR : program.benefits).map((benefit, index) => (
                      <div key={index} className="bg-gray-900 p-6 rounded-sm border-l-2 border-[#00ffba]">
                        <p className="text-gray-300">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Schedule Tab */}
                <div
                  className={`transition-all duration-500 ${
                    activeTab === 2 ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                  }`}
                >
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    {language === "el" ? "Εβδομαδιαίο Πρόγραμμα" : "Weekly Schedule"}
                  </h3>
                  <p className="text-lg text-gray-300 mb-8">
                    {language === "el"
                      ? `Το πρόγραμμα ${program.titleGR} προσφέρει ευέλικτο προγραμματισμό για να προσαρμοστεί στον πολυάσχολο τρόπο ζωής σας.`
                      : `Our ${program.title} program offers flexible scheduling to accommodate your busy lifestyle.`}
                  </p>
                  <div className="bg-gray-900 p-8 rounded-sm border-l-4 border-[#00ffba]">
                    <div className="flex items-center mb-6">
                      <svg
                        className="w-6 h-6 text-[#00ffba] mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <h4 className="text-2xl font-bold text-white">
                        {language === "el" ? "Εβδομαδιαίο Πρόγραμμα" : "Weekly Schedule"}
                      </h4>
                    </div>

                    {program.id === "01" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-800 p-6 rounded border-l-2 border-[#00ffba]">
                            <h5 className="text-xl font-bold text-white mb-3">
                              {language === "el" ? "Ηλικίες 4-6" : "Ages 4-6"}
                            </h5>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-300">
                                  {language === "el" ? "Τετάρτη" : "Wednesday"}
                                </span>
                                <span className="text-[#00ffba] font-bold">17:15 - 18:00</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-800 p-6 rounded border-l-2 border-[#00ffba]">
                            <h5 className="text-xl font-bold text-white mb-3">
                              {language === "el" ? "Ηλικίες 6-8" : "Ages 6-8"}
                            </h5>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-300">
                                  {language === "el" ? "Τετάρτη" : "Wednesday"}
                                </span>
                                <span className="text-[#00ffba] font-bold">18:15 - 19:00</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-gray-800 rounded">
                          <p className="text-gray-300">
                            <strong>{language === "el" ? "Σημείωση:" : "Note:"}</strong>
                            {language === "el"
                              ? " Οι συνεδρίες προγραμματίζονται μία φορά την εβδομάδα για να αποφευχθεί η κόπωση και να διατηρηθούν τα παιδιά ενεργά και παρακινημένα. Επικοινωνήστε μαζί μας για εγγραφή και οποιεσδήποτε ερωτήσεις προγραμματισμού."
                              : " Sessions are scheduled once per week to avoid fatigue and keep children engaged and motivated. Contact us for enrollment and any scheduling questions."}
                          </p>
                        </div>
                      </>
                    )}

                    {program.id === "02" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-800 p-6 rounded border-l-2 border-[#00ffba]">
                            <h5 className="text-xl font-bold text-white mb-3">
                              {language === "el" ? "Ηλικίες 8-10" : "Ages 8-10"}
                            </h5>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-300">
                                  {language === "el" ? "Τρίτη" : "Tuesday"}
                                </span>
                                <span className="text-[#00ffba] font-bold">18:00 - 19:00</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-300">
                                  {language === "el" ? "Πέμπτη" : "Thursday"}
                                </span>
                                <span className="text-[#00ffba] font-bold">18:00 - 19:00</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-800 p-6 rounded border-l-2 border-[#00ffba]">
                            <h5 className="text-xl font-bold text-white mb-3">
                              {language === "el" ? "Ηλικίες 10-12" : "Ages 10-12"}
                            </h5>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-300">
                                  {language === "el" ? "Τρίτη" : "Tuesday"}
                                </span>
                                <span className="text-[#00ffba] font-bold">19:00 - 20:00</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-300">
                                  {language === "el" ? "Πέμπτη" : "Thursday"}
                                </span>
                                <span className="text-[#00ffba] font-bold">19:00 - 20:00</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-gray-800 rounded">
                          <p className="text-gray-300">
                            <strong>{language === "el" ? "Σημείωση:" : "Note:"}</strong>
                            {language === "el"
                              ? " Οι συνεδρίες προγραμματίζονται δύο φορές την εβδομάδα για να εξασφαλιστεί συνεχής πρόοδος και ανάπτυξη δεξιοτήτων. Επικοινωνήστε μαζί μας για εγγραφή και οποιεσδήποτε ερωτήσεις προγραμματισμού."
                              : " Sessions are scheduled twice per week to ensure consistent progress and skill development. Contact us for enrollment and any scheduling questions."}
                          </p>
                        </div>
                      </>
                    )}

                    {program.id === "03" && (
                      <>
                        <div className="bg-gray-800 p-6 rounded border-l-2 border-[#00ffba]">
                          <h5 className="text-xl font-bold text-white mb-3">
                            {language === "el" ? "Ηλικίες 13-17" : "Ages 13-17"}
                          </h5>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-300">
                                {language === "el" ? "Δευτέρα" : "Monday"}
                              </span>
                              <span className="text-[#00ffba] font-bold">19:00 - 20:00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-300">
                                {language === "el" ? "Τετάρτη" : "Wednesday"}
                              </span>
                              <span className="text-[#00ffba] font-bold">19:00 - 20:00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-300">
                                {language === "el" ? "Παρασκευή" : "Friday"}
                              </span>
                              <span className="text-[#00ffba] font-bold">19:00 - 20:00</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-gray-800 rounded">
                          <p className="text-gray-300">
                            <strong>{language === "el" ? "Σημείωση:" : "Note:"}</strong>
                            {language === "el"
                              ? " Οι συνεδρίες προγραμματίζονται τρεις φορές την εβδομάδα με έμφαση στην εισαγωγή προπόνησης δύναμης, σωστές τεχνικές άρσης βαρών και οικοδόμηση του θεμελίου για αθλητική απόδοση. Επικοινωνήστε μαζί μας για εγγραφή και οποιεσδήποτε ερωτήσεις προγραμματισμού."
                              : " Sessions are scheduled three times per week focusing on strength training introduction, proper weightlifting techniques, and building the foundation for athletic performance. Contact us for enrollment and any scheduling questions."}
                          </p>
                        </div>
                      </>
                    )}

                    {program.id === "05" && (
                      <>
                        <div className="bg-gray-800 p-6 rounded border-l-2 border-[#00ffba]">
                          <h5 className="text-xl font-bold text-white mb-3">
                            {language === "el" ? "Ηλικίες 16+" : "Ages 16+"}
                          </h5>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-300">
                                {language === "el" ? "Δευτέρα έως Παρασκευή" : "Monday to Friday"}
                              </span>
                              <span className="text-[#00ffba] font-bold">20:00 - 21:30</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-gray-800 rounded">
                          <p className="text-gray-300">
                            <strong>{language === "el" ? "Σημείωση:" : "Note:"}</strong>
                            {language === "el"
                              ? " Οι συνεδρίες προγραμματίζονται πέντε φορές την εβδομάδα για να εξασφαλιστεί συνεχής πρόοδος και ανάπτυξη δεξιοτήτων. Επικοινωνήστε μαζί μας για εγγραφή και οποιεσδήποτε ερωτήσεις προγραμματισμού."
                              : " Sessions are scheduled five times per week to ensure consistent progress and skill development. Contact us for enrollment and any scheduling questions."}
                          </p>
                        </div>
                      </>
                    )}

                    {!["01", "02", "03", "05"].includes(program.id) && (
                      <>
                        <div className="bg-gray-800 p-6 rounded border-l-2 border-[#00ffba]">
                          <h5 className="text-xl font-bold text-white mb-3">
                            {language === "el" ? "Πληροφορίες Προγράμματος" : "Schedule Information"}
                          </h5>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-300">
                                {language === "el" ? "Διαθεσιμότητα:" : "Availability:"}
                              </span>
                              <span className="text-[#00ffba] font-bold">
                                {language === "el" ? program.schedule.availabilityGR : program.schedule.availability}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-300">
                                {language === "el" ? "Ώρες:" : "Hours:"}
                              </span>
                              <span className="text-[#00ffba] font-bold">
                                {language === "el" ? program.schedule.hoursGR : program.schedule.hours}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-gray-800 rounded">
                          <p className="text-gray-300">
                            <strong>{language === "el" ? "Σημείωση:" : "Note:"}</strong>
                            {language === "el"
                              ? " Ευέλικτος προγραμματισμός διαθέσιμος για να προσαρμοστεί στις ανάγκες σας. Επικοινωνήστε μαζί μας για εγγραφή και οποιεσδήποτε ερωτήσεις προγραμματισμού."
                              : " Flexible scheduling available to accommodate your needs. Contact us for enrollment and any scheduling questions."}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Pricing Plans Tab */}
                <div
                  className={`transition-all duration-500 ${
                    activeTab === 3 ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                  }`}
                >
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    {language === "el" ? "Πακέτα Τιμών" : "Pricing Plans"}
                  </h3>
                  <p className="text-lg text-gray-300 mb-8">
                    {language === "el"
                      ? "Επιλέξτε το πακέτο που ταιριάζει καλύτερα στους στόχους προπόνησης και το πρόγραμμά σας. Όλα τα πακέτα περιλαμβάνουν εξατομικευμένη προπόνηση και πρόσβαση στις εγκαταστάσεις μας."
                      : "Choose the plan that best fits your training goals and schedule. All plans include personalized coaching and access to our facilities."}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {program.id === "06" ? (
                      <>
                        <div className="bg-gray-900 p-8 rounded-sm border-t-4 border-[#00ffba] shadow-md hover:shadow-lg transition-shadow">
                          <h4 className="text-2xl font-bold mb-2 text-white">
                            {language === "el" ? "Συνεδρία" : "Session"}
                          </h4>
                          <div className="flex items-end mb-6">
                            <span className="text-4xl font-bold text-white">€{program.pricing.monthly.price}</span>
                            <span className="text-gray-500 ml-2 text-white">
                              {language === "el" ? "/συνεδρία" : "/session"}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-6">
                            {language === "el" ? program.pricing.monthly.sessionsGR : program.pricing.monthly.sessions}
                          </p>
                          <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Εξατομικευμένη προπόνηση" : "Personalized coaching"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Παρακολούθηση προόδου" : "Progress tracking"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Ευέλικτος προγραμματισμός" : "Flexible scheduling"}
                              </span>
                            </li>
                          </ul>
                          <button className="w-full py-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors">
                            {language === "el" ? "Επιλογή Πακέτου" : "Choose Plan"}
                          </button>
                        </div>
                        <div className="bg-gray-900 p-8 rounded-sm border-t-4 border-[#00ffba] shadow-md hover:shadow-lg transition-shadow relative transform scale-105">
                          <div className="absolute top-0 right-0 bg-[#00ffba] text-black px-4 py-1 text-sm font-bold -mt-3 mr-3">
                            {language === "el" ? "ΔΗΜΟΦΙΛΕΣ" : "POPULAR"}
                          </div>
                          <h4 className="text-2xl font-bold mb-2 text-white">
                            {language === "el" ? "12 Συνεδρίες" : "12 Sessions"}
                          </h4>
                          <div className="flex items-end mb-6">
                            <span className="text-4xl font-bold text-white">€{program.pricing.quarterly.price}</span>
                            <span className="text-gray-500 ml-2 text-white">
                              {language === "el" ? "/συνεδρία" : "/session"}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-2">
                            {language === "el"
                              ? program.pricing.quarterly.sessionsGR
                              : program.pricing.quarterly.sessions}
                          </p>
                          <p className="text-[#00ffba] font-bold mb-6">
                            {language === "el"
                              ? program.pricing.quarterly.savingsGR
                              : program.pricing.quarterly.savings}
                          </p>
                          <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Εξατομικευμένη προπόνηση" : "Personalized coaching"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Παρακολούθηση προόδου" : "Progress tracking"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Ευέλικτος προγραμματισμός" : "Flexible scheduling"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Προτεραιότητα κράτησης" : "Priority booking"}
                              </span>
                            </li>
                          </ul>
                          <button className="w-full py-3 bg-[#00ffba] text-black font-bold hover:bg-[#00d69e] transition-colors">
                            {language === "el" ? "Επιλογή Πακέτου" : "Choose Plan"}
                          </button>
                        </div>
                        <div className="bg-gray-900 p-8 rounded-sm border-t-4 border-[#00ffba] shadow-md hover:shadow-lg transition-shadow">
                          <h4 className="text-2xl font-bold mb-2 text-white">
                            {language === "el" ? "24 Συνεδρίες" : "24 Sessions"}
                          </h4>
                          <div className="flex items-end mb-6">
                            <span className="text-4xl font-bold text-white">€{program.pricing.annual.price}</span>
                            <span className="text-gray-500 ml-2 text-white">
                              {language === "el" ? "/συνεδρία" : "/session"}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-2">
                            {language === "el" ? program.pricing.annual.sessionsGR : program.pricing.annual.sessions}
                          </p>
                          <p className="text-[#00ffba] font-bold mb-6">
                            {language === "el" ? program.pricing.annual.savingsGR : program.pricing.annual.savings}
                          </p>
                          <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Εξατομικευμένη προπόνηση" : "Personalized coaching"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Παρακολούθηση προόδου" : "Progress tracking"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Ευέλικτος προγραμματισμός" : "Flexible scheduling"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Προτεραιότητα κράτησης" : "Priority booking"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Δωρεάν αξιολόγηση" : "Free assessment"}
                              </span>
                            </li>
                          </ul>
                          <button className="w-full py-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors">
                            {language === "el" ? "Επιλογή Πακέτου" : "Choose Plan"}
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-gray-900 p-8 rounded-sm border-t-4 border-[#00ffba] shadow-md hover:shadow-lg transition-shadow">
                          <h4 className="text-2xl font-bold mb-2 text-white">
                            {language === "el" ? "Μηνιαίο" : "Monthly"}
                          </h4>
                          <div className="flex items-end mb-6">
                            <span className="text-4xl font-bold text-white">€{program.pricing.monthly.price}</span>
                            <span className="text-gray-500 ml-2 text-white">
                              {language === "el" ? "/μήνα" : "/month"}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-6">
                            {language === "el" ? program.pricing.monthly.sessionsGR : program.pricing.monthly.sessions}
                          </p>
                          <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Εξατομικευμένη προπόνηση" : "Personalized coaching"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Παρακολούθηση προόδου" : "Progress tracking"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Ευέλικτος προγραμματισμός" : "Flexible scheduling"}
                              </span>
                            </li>
                          </ul>
                          <button className="w-full py-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors">
                            {language === "el" ? "Επιλογή Πακέτου" : "Choose Plan"}
                          </button>
                        </div>
                        <div className="bg-gray-900 p-8 rounded-sm border-t-4 border-[#00ffba] shadow-md hover:shadow-lg transition-shadow relative transform scale-105">
                          <div className="absolute top-0 right-0 bg-[#00ffba] text-black px-4 py-1 text-sm font-bold -mt-3 mr-3">
                            {language === "el" ? "ΔΗΜΟΦΙΛΕΣ" : "POPULAR"}
                          </div>
                          <h4 className="text-2xl font-bold mb-2 text-white">
                            {language === "el" ? "Τριμηνιαίο" : "Quarterly"}
                          </h4>
                          <div className="flex items-end mb-6">
                            <span className="text-4xl font-bold text-white">€{program.pricing.quarterly.price}</span>
                            <span className="text-gray-500 ml-2 text-white">
                              {language === "el" ? "/τρίμηνο" : "/quarter"}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-2">
                            {language === "el"
                              ? program.pricing.quarterly.sessionsGR
                              : program.pricing.quarterly.sessions}
                          </p>
                          <p className="text-[#00ffba] font-bold mb-6">
                            {language === "el"
                              ? program.pricing.quarterly.savingsGR
                              : program.pricing.quarterly.savings}
                          </p>
                          <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Εξατομικευμένη προπόνηση" : "Personalized coaching"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Παρακολούθηση προόδου" : "Progress tracking"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Ευέλικτος προγραμματισμός" : "Flexible scheduling"}
                              </span>
                            </li>
                            {program.id === "07" ? (
                              <li className="flex items-start">
                                <svg
                                  className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-gray-300">
                                  {language === "el" ? "Πρόγραμμα διατροφής περιλαμβάνεται" : "Nutrition plan included"}
                                </span>
                              </li>
                            ) : program.id === "05" ? (
                              <li className="flex items-start">
                                <svg
                                  className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-gray-300">
                                  {language === "el" ? "Προπόνηση με βάρη περιλαμβάνεται" : "Weight training included"}
                                </span>
                              </li>
                            ) : (
                              <li className="flex items-start">
                                <svg
                                  className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-gray-300">
                                  {language === "el" ? "Προτεραιότητα κράτησης" : "Priority booking"}
                                </span>
                              </li>
                            )}
                          </ul>
                          <button className="w-full py-3 bg-[#00ffba] text-black font-bold hover:bg-[#00d69e] transition-colors">
                            {language === "el" ? "Επιλογή Πακέτου" : "Choose Plan"}
                          </button>
                        </div>
                        <div className="bg-gray-900 p-8 rounded-sm border-t-4 border-[#00ffba] shadow-md hover:shadow-lg transition-shadow">
                          <h4 className="text-2xl font-bold mb-2 text-white">
                            {language === "el" ? "Ετήσιο" : "Annual"}
                          </h4>
                          <div className="flex items-end mb-6">
                            <span className="text-4xl font-bold text-white">€{program.pricing.annual.price}</span>
                            <span className="text-gray-500 ml-2 text-white">
                              {language === "el" ? "/έτος" : "/year"}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-2">
                            {language === "el" ? program.pricing.annual.sessionsGR : program.pricing.annual.sessions}
                          </p>
                          <p className="text-[#00ffba] font-bold mb-6">
                            {language === "el" ? program.pricing.annual.savingsGR : program.pricing.annual.savings}
                          </p>
                          <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Εξατομικευμένη προπόνηση" : "Personalized coaching"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Παρακολούθηση προόδου" : "Progress tracking"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Ευέλικτος προγραμματισμός" : "Flexible scheduling"}
                              </span>
                            </li>
                            {program.id === "07" ? (
                              <>
                                <li className="flex items-start">
                                  <svg
                                    className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  <span className="text-gray-300">
                                    {language === "el"
                                      ? "Πρόγραμμα διατροφής περιλαμβάνεται"
                                      : "Nutrition plan included"}
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <svg
                                    className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  <span className="text-gray-300">
                                    {language === "el" ? "Φυσιοθεραπεία περιλαμβάνεται" : "Physiotherapy included"}
                                  </span>
                                </li>
                              </>
                            ) : program.id === "05" ? (
                              <li className="flex items-start">
                                <svg
                                  className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-gray-300">
                                  {language === "el"
                                    ? "Επαγγελματικές δραστηριότητες μάχης περιλαμβάνονται"
                                    : "Pro fighting activities included"}
                                </span>
                              </li>
                            ) : (
                              <li className="flex items-start">
                                <svg
                                  className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-gray-300">
                                  {language === "el" ? "Προτεραιότητα κράτησης" : "Priority booking"}
                                </span>
                              </li>
                            )}
                            <li className="flex items-start">
                              <svg
                                className="h-5 w-5 text-[#00ffba] mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">
                                {language === "el" ? "Δωρεάν αξιολόγηση" : "Free assessment"}
                              </span>
                            </li>
                          </ul>
                          <button className="w-full py-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors">
                            {language === "el" ? "Επιλογή Πακέτου" : "Choose Plan"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={coachRef} id="coach" className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">
              {language === "el" ? "Γνωρίστε τον Προπονητή σας" : "Meet Your Coach"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={program.coach.image || "/placeholder.svg"}
                  alt={language === "el" ? program.coach.nameGR : program.coach.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">
                  {language === "el" ? program.coach.nameGR : program.coach.name}
                </h3>
                <p className="text-xl text-[#00ffba] mb-6">
                  {language === "el" ? program.coach.titleGR : program.coach.title}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {language === "el" ? program.coach.bioGR : program.coach.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-[#00ffba]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === "el" ? "Έτοιμοι να Ξεκινήσετε το Ταξίδι σας;" : "Ready to Start Your Journey?"}
          </h2>
          <p className="text-xl mb-8">
            {language === "el"
              ? `Συμμετέχετε στο πρόγραμμα ${program.titleGR} και μεταμορφώστε τη φυσική σας κατάσταση σήμερα.`
              : `Join our ${program.title} program and transform your fitness today.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-black text-white font-bold text-lg hover:bg-gray-800 transition-colors">
              {language === "el" ? "Κρατήστε τη Θέση σας" : "Reserve Your Spot"}
            </button>
            <Link
              href="/#contact"
              className="px-8 py-4 bg-white text-black font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              {language === "el" ? "Επικοινωνήστε Μαζί μας" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
