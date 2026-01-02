import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  FileText,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  Building,
  Phone,
  Globe,
  MessageCircle,
  Send,
  User,
  Mail,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CostBreakdown from "./CostBreakdown";
import DocumentChecklist from "./DocumentChecklist";
import TimelineView from "./TimelineView";
import RejectionReasons from "./RejectionReasons";
import BrokerFreeGuide from "./BrokerFreeGuide";

interface DocumentGuideData {
  id: string;
  title: string;
  titleBengali: string;
  description: string;
  importance: string;
  officialFee: string;
  processingTime: string;
  requiredDocuments: string[];
  procedure: {
    step: number;
    title: string;
    description: string;
    tips?: string;
  }[];
  offices: {
    name: string;
    address: string;
    phone?: string;
    hours: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  tips: string[];
  relatedDocuments: string[];
}

const documentGuides: Record<string, DocumentGuideData> = {
  nid: {
    id: "nid",
    title: "National ID Card",
    titleBengali: "জাতীয় পরিচয়পত্র",
    description:
      "The National ID Card is the primary identification document for Bangladeshi citizens.",
    importance:
      "Essential for voting, opening bank accounts, getting passport, and accessing government services.",
    officialFee: "Free (New) | ৳230-৳575 (Correction/Renewal)",
    processingTime: "3-6 months (New) | 7-30 days (Correction)",
    requiredDocuments: [
      "SSC/JSC Certificate",
      "Birth Certificate (Online)",
      "Parents' NID",
      "Utility Bill (Gas/Electricity/Water)",
      "Citizenship Certificate (Chairman/Councilor)",
    ],
    procedure: [
      {
        step: 1,
        title: "Collect Application Form",
        description:
          "Get the NID application form from your local registration office or download online.",
        tips: "Forms are available free of charge at all registration offices.",
      },
      {
        step: 2,
        title: "Fill Out the Form",
        description:
          "Complete all sections of the form with accurate information.",
        tips: "Use black ink and write clearly. Any mistakes may delay processing.",
      },
      {
        step: 3,
        title: "Gather Required Documents",
        description:
          "Collect all necessary documents including SSC/JSC certificate, online birth certificate, parents' NID.",
        tips: "Make photocopies of all documents and keep originals for verification.",
      },
      {
        step: 4,
        title: "Submit Application",
        description:
          "Submit your completed application with documents at the registration office.",
        tips: "New issue is FREE. Correction costs ৳230 (Regular) or ৳345 (Urgent).",
      },
    ],
    offices: [
      {
        name: "Dhaka NID Registration Office",
        address: "Segunbagicha, Dhaka-1000",
        phone: "02-9558916",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
      {
        name: "Chittagong NID Office",
        address: "Court Building, Chittagong",
        phone: "031-2523456",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
    ],
    faqs: [
      {
        question: "How long does it take to get a new NID?",
        answer: "New NID: 3-6 months. Correction: 30 days (Regular) or 7 days (Urgent).",
      },
      {
        question: "What is the fee for NID?",
        answer: "New Issue: Free. Correction: ৳230 (Regular) / ৳345 (Urgent). Renewal: ৳345 (Regular) / ৳575 (Urgent).",
      },
      {
        question: "What if I lose my NID card?",
        answer: "You can apply for a duplicate card by filing a General Diary (GD) at the nearest police station first.",
      },
    ],
    tips: [
      "New NID issuance is FREE - avoid middlemen charging extra",
      "Keep photocopies of your NID in multiple places",
      "Update your address if you move to a new location",
      "Check your information carefully before submitting",
    ],
    relatedDocuments: ["Birth Certificate", "Passport", "Driving License"],
  },
  passport: {
    id: "passport",
    title: "e-Passport",
    titleBengali: "ই-পাসপোর্ট",
    description:
      "Official travel document issued by the Government of Bangladesh for international travel.",
    importance:
      "Required for international travel, visa applications, and as primary ID for many services.",
    officialFee: "৳4,025 - ৳10,350",
    processingTime: "15-21 days (Regular) | 7-10 days (Express)",
    requiredDocuments: [
      "NID Card or Birth Certificate",
      "Previous Passport (if any)",
      "GO/NOC (for Government Employees)",
      "Proof of Profession (Student ID, Trade License)",
    ],
    procedure: [
      {
        step: 1,
        title: "Online Application",
        description: "Fill out the online application form at the official passport website.",
        tips: "Complete the form in one sitting as it cannot be saved partially.",
      },
      {
        step: 2,
        title: "Pay Application Fee",
        description: "48 Pages, 5 Years: ৳4,025 (Reg) / ৳6,325 (Exp). 10 Years: ৳5,750 (Reg) / ৳8,050 (Exp).",
        tips: "Keep the payment receipt safe as you'll need it for the appointment.",
      },
      {
        step: 3,
        title: "Book Appointment",
        description: "Schedule an appointment at your nearest passport office.",
        tips: "Book as early as possible as slots fill up quickly.",
      },
      {
        step: 4,
        title: "Visit Passport Office",
        description: "Attend your appointment with all required documents.",
        tips: "Arrive 30 minutes early and dress formally for the photo.",
      },
      {
        step: 5,
        title: "Biometric Data Collection",
        description: "Provide fingerprints and have your photo taken.",
        tips: "Ensure your hands are clean and dry for clear fingerprints.",
      },
      {
        step: 6,
        title: "Collect Passport",
        description: "Regular: 15-21 days. Express: 7-10 days. Super Express: 2 days.",
        tips: "Track your application status online using your reference number.",
      },
    ],
    offices: [
      {
        name: "Dhaka Passport Office",
        address: "Agargaon, Dhaka-1207",
        phone: "02-8181818",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
      {
        name: "Chittagong Passport Office",
        address: "Dampara, Chittagong",
        phone: "031-2503456",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
    ],
    faqs: [
      {
        question: "How much does an e-Passport cost?",
        answer: "48 Pages, 5 Years: ৳4,025 (Reg) / ৳6,325 (Exp). 48 Pages, 10 Years: ৳5,750 (Reg) / ৳8,050 (Exp). 64 Pages, 10 Years: ৳8,050 (Reg) / ৳10,350 (Exp).",
      },
      {
        question: "What is the processing time?",
        answer: "Regular: 15-21 working days. Express: 7-10 working days. Super Express: 2 working days.",
      },
    ],
    tips: [
      "Apply well in advance of your travel date",
      "Check passport validity requirements for your destination",
      "Keep digital copies of your passport",
      "Government employees need GO/NOC from their department",
    ],
    relatedDocuments: ["National ID Card", "Birth Certificate", "Police Clearance"],
  },
  "birth-certificate": {
    id: "birth-certificate",
    title: "Birth Certificate",
    titleBengali: "জন্ম নিবন্ধন",
    description: "Official document recording a person's birth, issued by local government.",
    importance: "Required for school admission, NID application, passport, and all government services.",
    officialFee: "Free - ৳100",
    processingTime: "1-7 Working Days",
    requiredDocuments: [
      "EPI (Vaccine) Card or Hospital Certificate",
      "Parents' NID & Birth Certificates",
      "Holding Tax Receipt (Residence Proof)",
      "School Certificate (if applicable)",
    ],
    procedure: [
      {
        step: 1,
        title: "Apply Online or Visit Office",
        description: "Go to bdris.gov.bd or visit your local Union/Municipality office.",
        tips: "Online application is faster and recommended.",
      },
      {
        step: 2,
        title: "Submit Required Documents",
        description: "Provide EPI card, parents' documents, and address proof.",
        tips: "Hospital certificate can be used instead of EPI card.",
      },
      {
        step: 3,
        title: "Pay Fee (if applicable)",
        description: "0-45 Days: Free. 45 Days-5 Years: ৳25. Above 5 Years: ৳50. Correction: ৳100.",
        tips: "Registration within 45 days of birth is FREE.",
      },
    ],
    offices: [
      {
        name: "Local Union Parishad Office",
        address: "Your local Union Parishad",
        phone: "Contact local office",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
      {
        name: "City Corporation Office",
        address: "Your local City Corporation ward office",
        phone: "Contact local office",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
    ],
    faqs: [
      {
        question: "What is the fee for birth certificate?",
        answer: "0-45 Days: Free. 45 Days-5 Years: ৳25. Above 5 Years: ৳50. Correction: ৳100.",
      },
      {
        question: "How long does it take?",
        answer: "1-7 Working Days depending on local office/councilor.",
      },
    ],
    tips: [
      "Register within 45 days of birth to get it FREE",
      "Keep the online registration number safe",
      "Verify all information before final submission",
      "You can download the certificate from bdris.gov.bd",
    ],
    relatedDocuments: ["National ID Card", "Passport", "School Admission"],
  },
  "marriage-certificate": {
    id: "marriage-certificate",
    title: "Marriage Certificate",
    titleBengali: "বিবাহ নিবন্ধন",
    description: "Official registration of marriage under Bangladesh law.",
    importance: "Required for spouse visa, joint property, legal rights, and various government services.",
    officialFee: "৳1,250 per ৳1 Lakh Denmohar",
    processingTime: "Registration: Immediate | Certificate: 1-3 Days",
    requiredDocuments: [
      "NID / Birth Certificate (Bride & Groom)",
      "2 Passport Size Photos (Each)",
      "NID of 2 Witnesses",
      "Affidavit (for Court Marriage/Late Registration)",
    ],
    procedure: [
      {
        step: 1,
        title: "Contact Marriage Registrar (Kazi)",
        description: "Find a licensed Kazi in your area for the registration.",
        tips: "Verify the Kazi's license before proceeding.",
      },
      {
        step: 2,
        title: "Submit Documents",
        description: "Provide NID/Birth certificates, photos, and witness documents.",
        tips: "Both parties must be present with their original documents.",
      },
      {
        step: 3,
        title: "Pay Registration Fee",
        description: "Fee is ৳1,250 per ৳1 Lakh Denmohar. Above ৳4 Lakh, fee is only ৳100 per Lakh.",
        tips: "Example: ৳5 Lakh Denmohar = ৳5,100 fee.",
      },
      {
        step: 4,
        title: "Collect Certificate",
        description: "Registration is immediate. Certificate issued within 1-3 days.",
        tips: "Keep multiple copies of the certificate for future use.",
      },
    ],
    offices: [
      {
        name: "Local Kazi Office",
        address: "Licensed Marriage Registrar in your area",
        phone: "Contact local Kazi",
        hours: "As per appointment",
      },
    ],
    faqs: [
      {
        question: "What is the registration fee?",
        answer: "৳1,250 per ৳1 Lakh Denmohar. Above ৳4 Lakh, fee is only ৳100 per Lakh. Example: ৳5 Lakh = ৳5,100.",
      },
      {
        question: "How long does registration take?",
        answer: "Registration is immediate. Certificate is issued within 1-3 days.",
      },
    ],
    tips: [
      "Verify Kazi's license before registration",
      "Keep original documents safe",
      "Both parties must be present",
      "Court marriage requires an affidavit",
    ],
    relatedDocuments: ["National ID Card", "Birth Certificate", "Passport"],
  },
  "driving-license": {
    id: "driving-license",
    title: "Driving License",
    titleBengali: "ড্রাইভিং লাইসেন্স",
    description: "Official license to operate motor vehicles in Bangladesh.",
    importance: "Legally required to drive any motor vehicle. Valid as government-issued ID.",
    officialFee: "৳518 - ৳4,500",
    processingTime: "Learner: Immediate-2 days | Smart Card: 30 days-6 months",
    requiredDocuments: [
      "Learner License Number",
      "Medical Certificate (Registered Doctor)",
      "NID / Birth Certificate",
      "Utility Bill (Address Proof)",
      "Education Certificate (Min. Class 8)",
    ],
    procedure: [
      {
        step: 1,
        title: "Apply for Learner License",
        description: "Visit BRTA office or apply online. Fee: ৳518 for 1 category.",
        tips: "You must pass a written test to get learner license.",
      },
      {
        step: 2,
        title: "Get Medical Certificate",
        description: "Obtain a medical fitness certificate from a registered doctor.",
        tips: "Eye test is mandatory for the medical certificate.",
      },
      {
        step: 3,
        title: "Practice Driving",
        description: "Practice for at least 30 days with your learner license.",
        tips: "Learner license is valid for 3 months.",
      },
      {
        step: 4,
        title: "Take Driving Test",
        description: "Appear for the practical driving test at BRTA.",
        tips: "Practice parallel parking and lane driving.",
      },
      {
        step: 5,
        title: "Apply for Smart Card License",
        description: "After passing, apply for Smart Card License. Fee: ~৳2,542.",
        tips: "Current processing time is delayed to 3-6 months.",
      },
    ],
    offices: [
      {
        name: "BRTA Dhaka Office",
        address: "Mirpur, Dhaka",
        phone: "02-9006963",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
      {
        name: "BRTA Chittagong Office",
        address: "GEC Circle, Chittagong",
        phone: "031-2520345",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
    ],
    faqs: [
      {
        question: "What are the fees?",
        answer: "Learner License: ৳518 (1 Category). Smart Card License: ~৳2,542. Renewal: ৳2,500-৳4,500.",
      },
      {
        question: "How long does it take?",
        answer: "Learner: Immediate-2 days. Smart Card: Officially 30 days but currently delayed 3-6 months.",
      },
    ],
    tips: [
      "Apply for learner license first",
      "Practice for at least 30 days",
      "Minimum Class 8 education certificate required",
      "Medical certificate must be from registered doctor",
    ],
    relatedDocuments: ["National ID Card", "Birth Certificate", "Medical Certificate"],
  },
  "education-certificate": {
    id: "education-certificate",
    title: "Education Certificate",
    titleBengali: "শিক্ষাগত সনদ",
    description: "Verification and authentication of educational documents from Education Boards.",
    importance: "Required for higher education admission, job applications, and foreign credentials verification.",
    officialFee: "৳50 - ৳1,500",
    processingTime: "7-15 Working Days",
    requiredDocuments: [
      "Original Registration Card",
      "Original Admit Card",
      "Photocopy of Certificate/Marksheet",
      "Application via Institute Head",
    ],
    procedure: [
      {
        step: 1,
        title: "Collect Required Documents",
        description: "Gather original registration card, admit card, and certificate copies.",
        tips: "Keep original documents safe - only submit photocopies where allowed.",
      },
      {
        step: 2,
        title: "Submit Application",
        description: "Apply through your institution head or directly to the Education Board.",
        tips: "Verify fee: Board verification ৳50-৳300, Transcript ৳500-৳1,500.",
      },
      {
        step: 3,
        title: "Collect Certificate",
        description: "Processing takes 7-15 working days. Collect from the Board office.",
        tips: "Track your application status through the Board website.",
      },
    ],
    offices: [
      {
        name: "Dhaka Education Board",
        address: "Bakshibazar, Dhaka",
        phone: "02-7120662",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
    ],
    faqs: [
      {
        question: "What is the verification fee?",
        answer: "Board Verification: ৳50-৳300 per document. Transcript/Original: ৳500-৳1,500. Fees vary by Board.",
      },
      {
        question: "How long does verification take?",
        answer: "7-15 Working Days depending on the Education Board.",
      },
    ],
    tips: [
      "Apply through your institution for faster processing",
      "Keep photocopies of all certificates",
      "Fees vary by Education Board",
      "Check Board website for current fee structure",
    ],
    relatedDocuments: ["SSC Certificate", "HSC Certificate", "Degree Certificate"],
  },
  "business-license": {
    id: "business-license",
    title: "Business License",
    titleBengali: "ব্যবসায়িক লাইসেন্স",
    description: "Trade license required to operate any business in Bangladesh.",
    importance: "Legally required for all businesses. Needed for bank accounts, tenders, and tax registration.",
    officialFee: "৳500 - ৳50,000 + Taxes",
    processingTime: "3-7 Working Days",
    requiredDocuments: [
      "Shop Rent Agreement / Ownership Proof",
      "Holding Tax Receipt",
      "Owner's NID",
      "3 Passport Size Photos",
    ],
    procedure: [
      {
        step: 1,
        title: "Collect Application Form",
        description: "Get application form from City Corporation/Municipality office. Form fee: ৳50.",
        tips: "Forms are also available online for some city corporations.",
      },
      {
        step: 2,
        title: "Submit Required Documents",
        description: "Provide rent agreement, holding tax receipt, NID, and photos.",
        tips: "For rented premises, landlord's consent may be required.",
      },
      {
        step: 3,
        title: "Pay License Fee",
        description: "Fee: ৳500-৳50,000 based on business capital. Plus 15% VAT + 30% Signboard Tax.",
        tips: "License must be renewed annually.",
      },
      {
        step: 4,
        title: "Inspection & Collection",
        description: "After inspection, collect license within 3-7 working days.",
        tips: "Display license prominently in your business premises.",
      },
    ],
    offices: [
      {
        name: "Dhaka City Corporation",
        address: "Nagar Bhaban, Dhaka",
        phone: "02-9558745",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
    ],
    faqs: [
      {
        question: "What is the license fee?",
        answer: "Application Form: ৳50. License Fee: ৳500-৳50,000 based on capital. Additional: 15% VAT + 30% Signboard Tax.",
      },
      {
        question: "How long does it take?",
        answer: "3-7 Working Days after document submission and inspection.",
      },
    ],
    tips: [
      "Renew license annually before expiry",
      "Display license at business premises",
      "Fee depends on business type and capital",
      "Keep all receipts for tax purposes",
    ],
    relatedDocuments: ["National ID Card", "TIN Certificate", "VAT Registration"],
  },
  "land-records": {
    id: "land-records",
    title: "Land Records",
    titleBengali: "ভূমি রেকর্ড",
    description: "Official land ownership documents including Mutation (Namjari) and Porcha.",
    importance: "Essential for proving land ownership, property transfer, and legal disputes.",
    officialFee: "৳100 - ৳1,170",
    processingTime: "Mutation: 28-45 days | Porcha: 7-15 days",
    requiredDocuments: [
      "Main Deed (Dalil) & Bia Dalil",
      "Warish Certificate (if inheritance)",
      "Up-to-date Land Tax (Khajna) Receipt",
      "Applicant NID & Photo",
    ],
    procedure: [
      {
        step: 1,
        title: "Collect Required Documents",
        description: "Gather main deed, warish certificate (if inherited), and land tax receipts.",
        tips: "Ensure all land taxes are paid up-to-date.",
      },
      {
        step: 2,
        title: "Apply for Mutation (Namjari)",
        description: "Submit application at AC Land office. Fixed fee: ৳1,170.",
        tips: "Fee breakdown: Court ৳20 + Notice ৳50 + Record ৳1,000 + Khatian ৳100.",
      },
      {
        step: 3,
        title: "Wait for Processing",
        description: "Mutation: 28 days (City) / 45 days (Rural). Porcha: 7-15 days.",
        tips: "You can apply for Porcha/Certified Copy separately for ৳100.",
      },
      {
        step: 4,
        title: "Collect Documents",
        description: "Collect mutation certificate and updated Porcha from the office.",
        tips: "Verify all information in the documents before leaving.",
      },
    ],
    offices: [
      {
        name: "AC Land Office",
        address: "Your local Upazila/Thana Land Office",
        phone: "Contact local office",
        hours: "9:00 AM - 5:00 PM (Sunday-Thursday)",
      },
    ],
    faqs: [
      {
        question: "What is the Mutation fee?",
        answer: "Mutation (Namjari): ৳1,170 fixed (Court ৳20 + Notice ৳50 + Record ৳1,000 + Khatian ৳100). Porcha: ৳100.",
      },
      {
        question: "How long does Mutation take?",
        answer: "28 days in City Corporation areas. 45 days in Rural/Upazila areas. Porcha: 7-15 days.",
      },
    ],
    tips: [
      "Pay all land taxes before applying",
      "Keep original deeds in a safe place",
      "For inherited land, get Warish Certificate first",
      "Verify boundaries during mutation process",
    ],
    relatedDocuments: ["Warish Certificate", "Land Tax Receipt", "Property Deed"],
  },
  "police-clearance": {
    id: "police-clearance",
    title: "Police Clearance",
    titleBengali: "পুলিশ ক্লিয়ারেন্স",
    description: "Certificate verifying no criminal record, required for visas and employment.",
    importance: "Required for immigration, foreign employment, government jobs, and visa applications.",
    officialFee: "৳500",
    processingTime: "7-14 Working Days",
    requiredDocuments: [
      "Valid Passport (Mandatory)",
      "Treasury Challan (Code: 1-2201-0001-2681)",
      "NID or Birth Certificate",
      "Councilor/Chairman Certificate (Address)",
    ],
    procedure: [
      {
        step: 1,
        title: "Pay Challan Fee",
        description: "Pay ৳500 via Sonali Bank or Treasury Challan. Code: 1-2201-0001-2681.",
        tips: "Keep the original challan receipt - you'll need it for submission.",
      },
      {
        step: 2,
        title: "Submit Application",
        description: "Apply at your local police station with passport, NID, and challan.",
        tips: "Councilor/Chairman certificate is needed for address verification.",
      },
      {
        step: 3,
        title: "Police Verification",
        description: "Police will verify your address and background. May visit your home.",
        tips: "Processing may take longer if police visit is delayed.",
      },
      {
        step: 4,
        title: "Collect Certificate",
        description: "Collect from the same police station after 7-14 working days.",
        tips: "Certificate is usually valid for 6 months to 1 year.",
      },
    ],
    offices: [
      {
        name: "Local Police Station",
        address: "Your residential area police station",
        phone: "Contact local police station",
        hours: "As per police station timings",
      },
    ],
    faqs: [
      {
        question: "What is the fee?",
        answer: "Challan Fee: ৳500 paid via Sonali Bank or Treasury Challan (Code: 1-2201-0001-2681).",
      },
      {
        question: "How long does it take?",
        answer: "7-14 Working Days. May take longer if police verification visit is delayed.",
      },
    ],
    tips: [
      "Valid passport is MANDATORY",
      "Pay challan at Sonali Bank only",
      "Be available for police verification visit",
      "Apply early - processing can be delayed",
    ],
    relatedDocuments: ["Passport", "National ID Card", "Address Certificate"],
  },
};

const DocumentGuidePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const guide = id ? documentGuides[id] : null;

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#242423] flex items-center justify-center pb-24">
        <Card className="max-w-md mx-auto bg-[#333533] border-0 rounded-2xl">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-[#E8EDDF]">Document Not Found</h2>
            <p className="text-[#CFDBD5]/70 mb-4">
              The requested document guide could not be found.
            </p>
            <Button onClick={() => navigate("/")} className="bg-[#F5CB5C] text-[#242423] hover:bg-[#F5CB5C]/90 rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("guide.backToHome")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#242423] pb-24 md:pb-8">
      {/* Header */}
      <header className="px-4 pt-6 pb-4 md:pt-20">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="p-2.5 bg-[#333533] rounded-xl text-[#CFDBD5] hover:bg-[#333533]/80 active:scale-95 transition-transform"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F5CB5C] rounded-xl">
              <FileText className="h-5 w-5 text-[#242423]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#E8EDDF]">
                {guide.title}
              </h1>
              <p className="text-xs text-[#CFDBD5]/60">
                {guide.titleBengali}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Info Cards */}
      <section className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3 sm:flex sm:overflow-x-auto pb-2 scrollbar-hide">
          <Card className="sm:min-w-[140px] bg-[#333533] border-0 rounded-2xl active:scale-95 transition-transform">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-[#F5CB5C]" />
              </div>
              <p className="text-[10px] sm:text-xs text-[#CFDBD5]/60 mb-0.5">{t("guide.officialFee")}</p>
              <p className="text-sm sm:text-lg font-bold text-[#F5CB5C]">
                {guide.officialFee}
              </p>
            </CardContent>
          </Card>
          <Card className="sm:min-w-[140px] bg-[#333533] border-0 rounded-2xl active:scale-95 transition-transform">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
              </div>
              <p className="text-[10px] sm:text-xs text-[#CFDBD5]/60 mb-0.5">{t("guide.processingTime")}</p>
              <p className="text-sm sm:text-lg font-bold text-green-500">
                {guide.processingTime}
              </p>
            </CardContent>
          </Card>
          <Card className="sm:min-w-[140px] bg-[#333533] border-0 rounded-2xl active:scale-95 transition-transform">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
              </div>
              <p className="text-[10px] sm:text-xs text-[#CFDBD5]/60 mb-0.5">{t("guide.requiredDocuments")}</p>
              <p className="text-sm sm:text-lg font-bold text-blue-500">
                {guide.requiredDocuments.length}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide bg-transparent mb-4">
            <TabsTrigger value="overview" className="rounded-full px-4 py-2 bg-[#333533] text-[#CFDBD5] text-sm font-medium data-[state=active]:bg-[#F5CB5C] data-[state=active]:text-[#242423] transition-all active:scale-95 whitespace-nowrap">{t("guide.overview")}</TabsTrigger>
            <TabsTrigger value="procedure" className="rounded-full px-4 py-2 bg-[#333533] text-[#CFDBD5] text-sm font-medium data-[state=active]:bg-[#F5CB5C] data-[state=active]:text-[#242423] transition-all active:scale-95 whitespace-nowrap">{t("guide.procedure")}</TabsTrigger>
            <TabsTrigger value="offices" className="rounded-full px-4 py-2 bg-[#333533] text-[#CFDBD5] text-sm font-medium data-[state=active]:bg-[#F5CB5C] data-[state=active]:text-[#242423] transition-all active:scale-95 whitespace-nowrap">{t("guide.offices")}</TabsTrigger>
            <TabsTrigger value="faqs" className="rounded-full px-4 py-2 bg-[#333533] text-[#CFDBD5] text-sm font-medium data-[state=active]:bg-[#F5CB5C] data-[state=active]:text-[#242423] transition-all active:scale-95 whitespace-nowrap">{t("guide.faqs")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-4">
              <Card className="bg-[#333533] border-0 rounded-2xl active:scale-[0.99] transition-transform">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-[#F5CB5C]" />
                    </div>
                    <div>
                      <h3 className="text-[#E8EDDF] font-semibold mb-1">{t("guide.importance")}</h3>
                      <p className="text-[#CFDBD5]/70 text-sm leading-relaxed">{guide.importance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#333533] border-0 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-green-500" />
                    </div>
                    <h3 className="text-[#E8EDDF] font-semibold">{t("guide.requiredDocuments")}</h3>
                  </div>
                  <div className="space-y-2 pl-1">
                    {guide.requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-[#242423] rounded-xl">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-[#CFDBD5]/80 text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="procedure">
            <div className="space-y-3">
              {guide.procedure.map((step, index) => (
                <Card key={index} className="bg-[#333533] border-0 rounded-2xl active:scale-[0.99] transition-transform overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#F5CB5C] text-[#242423] rounded-xl w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                        {step.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#E8EDDF] mb-1.5">{step.title}</h3>
                        <p className="text-[#CFDBD5]/70 text-sm leading-relaxed mb-2">
                          {step.description}
                        </p>
                        {step.tips && (
                          <div className="bg-[#242423] rounded-xl p-3 mt-3 border border-[#F5CB5C]/20">
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 bg-[#F5CB5C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Lightbulb className="h-3.5 w-3.5 text-[#F5CB5C]" />
                              </div>
                              <p className="text-xs text-[#CFDBD5]/70 leading-relaxed">
                                {step.tips}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offices">
            <div className="space-y-3">
              {guide.offices.map((office, index) => (
                <Card key={index} className="bg-[#333533] border-0 rounded-2xl active:scale-[0.99] transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building className="h-5 w-5 text-[#F5CB5C]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#E8EDDF] mb-2">{office.name}</h3>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 p-2 bg-[#242423] rounded-xl">
                            <MapPin className="h-4 w-4 text-[#CFDBD5]/50 mt-0.5 flex-shrink-0" />
                            <p className="text-[#CFDBD5]/70 text-sm">{office.address}</p>
                          </div>
                          {office.phone && (
                            <div className="flex items-center gap-2 p-2 bg-[#242423] rounded-xl">
                              <Phone className="h-4 w-4 text-[#CFDBD5]/50" />
                              <p className="text-[#CFDBD5]/70 text-sm">{office.phone}</p>
                            </div>
                          )}
                          <div className="flex items-center gap-2 p-2 bg-[#242423] rounded-xl">
                            <Clock className="h-4 w-4 text-[#CFDBD5]/50" />
                            <p className="text-[#CFDBD5]/70 text-sm">{office.hours}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faqs">
            <div className="space-y-3">
              {guide.faqs.map((faq, index) => (
                <Card key={index} className="bg-[#333533] border-0 rounded-2xl active:scale-[0.99] transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#F5CB5C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="h-4 w-4 text-[#F5CB5C]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#E8EDDF] text-sm mb-1.5">{faq.question}</h3>
                        <p className="text-[#CFDBD5]/70 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Additional Features */}
      <section className="px-4 mt-6 space-y-4">
        {/* Cost Breakdown */}
        <CostBreakdown documentId={id || "nid"} documentTitle={guide.title} />
        
        {/* Document Checklist */}
        <DocumentChecklist documentId={id || "nid"} documentTitle={guide.title} />
        
        {/* Timeline View */}
        <TimelineView documentId={id || "nid"} documentTitle={guide.title} />
        
        {/* Rejection Reasons */}
        <RejectionReasons documentId={id || "nid"} documentTitle={guide.title} />
        
        {/* Broker Free Guide */}
        <BrokerFreeGuide documentId={id || "nid"} documentTitle={guide.title} />
      </section>

      {/* Consultancy Form Section */}
      <section className="px-4 mt-6 mb-8">
        <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#F5CB5C] to-[#F5CB5C]/50" />
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-[#F5CB5C] rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-6 w-6 text-[#242423]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#E8EDDF]">{t("consultancy.title")}</h3>
                <p className="text-xs text-[#CFDBD5]/60">{t("consultancy.subtitle")}</p>
              </div>
            </div>

            <ConsultancyForm documentTitle={guide.title} t={t} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

const ConsultancyForm = ({ documentTitle, t }: { documentTitle: string; t: (key: string) => string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issue: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", issue: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="text-center py-8 animate-slide-up">
        <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h4 className="text-[#E8EDDF] font-semibold text-lg mb-2">{t("consultancy.success")}</h4>
        <p className="text-[#CFDBD5]/60 text-sm">
          {t("consultancy.successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-[#CFDBD5]/80 text-sm flex items-center gap-2">
          <User className="h-3.5 w-3.5 text-[#F5CB5C]" />
          {t("consultancy.name")}
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={t("consultancy.namePlaceholder")}
          className="bg-[#242423] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl h-12 focus:ring-2 focus:ring-[#F5CB5C]/50"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[#CFDBD5]/80 text-sm flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-[#F5CB5C]" />
            {t("consultancy.email")}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={t("consultancy.emailPlaceholder")}
            className="bg-[#242423] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl h-12 focus:ring-2 focus:ring-[#F5CB5C]/50"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-[#CFDBD5]/80 text-sm flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-[#F5CB5C]" />
            {t("consultancy.phone")}
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder={t("consultancy.phonePlaceholder")}
            className="bg-[#242423] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl h-12 focus:ring-2 focus:ring-[#F5CB5C]/50"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="issue" className="text-[#CFDBD5]/80 text-sm flex items-center gap-2">
          <MessageCircle className="h-3.5 w-3.5 text-[#F5CB5C]" />
          {t("consultancy.issue")}
        </Label>
        <Textarea
          id="issue"
          name="issue"
          value={formData.issue}
          onChange={handleChange}
          required
          placeholder={`${t("consultancy.issuePlaceholder")} (${documentTitle})`}
          rows={3}
          className="bg-[#242423] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl focus:ring-2 focus:ring-[#F5CB5C]/50 resize-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#F5CB5C] text-[#242423] hover:bg-[#F5CB5C]/90 active:scale-[0.98] rounded-xl h-12 font-semibold text-sm transition-transform"
      >
        <Send className="h-4 w-4 mr-2" />
        {t("consultancy.submit")}
      </Button>

      <p className="text-[10px] text-[#CFDBD5]/50 text-center pt-1">
        {t("consultancy.note")}
      </p>
    </form>
  );
};

export default DocumentGuidePage;
