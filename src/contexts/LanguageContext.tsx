import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations = {
  en: {
    // Header
    "header.title": "Papers Please",
    "header.subtitle": "Bangladesh Document Guide",
    "header.getHelp": "Get Help",
    "header.language": "বাংলা",

    // Hero Section
    "hero.title": "Complete Your Government Paperwork",
    "hero.subtitle": "Without Any Hassle",
    "hero.description":
      "Get step-by-step guides, official fees, and live queue status for all government documents in Bangladesh. Save time, money, and avoid middlemen.",

    // Quick Actions
    "quickAction.queue.title": "Check Queue Status",
    "quickAction.queue.description":
      "See live waiting times at government offices",
    "quickAction.submit.title": "Submit Queue Update",
    "quickAction.submit.description":
      "Help others by sharing current wait times",
    "quickAction.browse.title": "Browse Documents",
    "quickAction.browse.description":
      "Find step-by-step guides for any document",

    // Stats
    "stats.documents.title": "Documents Covered",
    "stats.documents.value": "50+",
    "stats.documents.description":
      "Complete procedures for all major government documents",
    "stats.offices.title": "Government Offices",
    "stats.offices.value": "25+",
    "stats.offices.description":
      "Live queue status from offices across Bangladesh",
    "stats.users.title": "Users Helped",
    "stats.users.value": "10K+",
    "stats.users.description": "Citizens who avoided middlemen and saved money",
    "stats.savings.title": "Average Savings",
    "stats.savings.value": "৳2,500",
    "stats.savings.description":
      "Money saved per document by following our guides",

    // Tabs
    "tabs.documents": "Document Guides",
    "tabs.queue": "Queue Status",
    "tabs.submit": "Submit Update",

    // Document Categories
    "category.title": "Document Categories",
    "category.description":
      "Complete guide to all government documents in Bangladesh",
    "category.filter.all": "All Documents",
    "category.filter.popular": "Most Popular",
    "category.filter.common": "Common",
    "category.filter.specialized": "Specialized",
    "category.processingTime": "Processing Time:",
    "category.officialFee": "Official Fee:",
    "category.stepsRequired": "Steps Required:",
    "category.requiredDocuments": "Required Documents:",
    "category.viewDetails": "View Details",
    "category.more": "more",
    "category.steps": "steps",

    // Document Types
    "doc.nid.title": "National ID Card",
    "doc.nid.titleBengali": "জাতীয় পরিচয়পত্র",
    "doc.passport.title": "Passport",
    "doc.passport.titleBengali": "পাসপোর্ট",
    "doc.birth.title": "Birth Certificate",
    "doc.birth.titleBengali": "জন্ম নিবন্ধন",
    "doc.marriage.title": "Marriage Certificate",
    "doc.marriage.titleBengali": "বিবাহ নিবন্ধন",
    "doc.driving.title": "Driving License",
    "doc.driving.titleBengali": "ড্রাইভিং লাইসেন্স",
    "doc.education.title": "Education Certificate",
    "doc.education.titleBengali": "শিক্ষাগত সনদ",
    "doc.business.title": "Business License",
    "doc.business.titleBengali": "ব্যবসায়িক লাইসেন্স",
    "doc.land.title": "Land Records",
    "doc.land.titleBengali": "ভূমি রেকর্ড",
    "doc.police.title": "Police Clearance",
    "doc.police.titleBengali": "পুলিশ ক্লিয়ারেন্স",

    // Anti-Scam Section
    "antiScam.title": "Avoid Common Scams",
    "antiScam.description":
      "Protect yourself from unnecessary fees and fraudulent services",
    "antiScam.officialFees.title": "Official Fees Only",
    "antiScam.officialFees.description":
      "Never pay more than the official government fee listed in our guides",
    "antiScam.directApplication.title": "Direct Application",
    "antiScam.directApplication.description":
      "Apply directly at government offices - no middlemen needed",
    "antiScam.verifyInfo.title": "Verify Information",
    "antiScam.verifyInfo.description":
      "Always cross-check requirements with our updated guides",

    // Footer
    "footer.description":
      "Empowering Bangladeshi citizens with official government document procedures",
    "footer.copyright": "© 2024 Papers Please",
    "footer.madeFor": "Made for the people of Bangladesh",
    "footer.openSource": "Free & Open Source",

    // Guide Page
    "guide.backToHome": "Back to Home",
    "guide.overview": "Overview",
    "guide.procedure": "Step-by-Step Procedure",
    "guide.offices": "Government Offices",
    "guide.fees": "Fees & Processing Time",
    "guide.faqs": "Frequently Asked Questions",
    "guide.tips": "Related Tips",
    "guide.importance": "Importance",
    "guide.officialFee": "Official Fee",
    "guide.processingTime": "Processing Time",
    "guide.requiredDocuments": "Required Documents",
    "guide.step": "Step",

    // Law First Aid
    "lawFirstAid.title": "Law First Aid",
    "lawFirstAid.subtitle": "Emergency Legal Guidance",
    "lawFirstAid.backToHome": "Back to Home",
    "lawFirstAid.emergencyCall": "Emergency? Call 999 immediately",
    "lawFirstAid.knowRights": "Know Your Rights, Know What To Do",
    "lawFirstAid.description":
      "Get immediate, step-by-step legal guidance based on Bangladesh law. Whether you're a victim, witness, or being accused, this tool will help you understand your rights and take the right actions.",
    "lawFirstAid.tellSituation": "Tell us about your situation",
    "lawFirstAid.userRole": "What is your role in this situation?",
    "lawFirstAid.victim": "I am a victim",
    "lawFirstAid.witness": "I am a witness",
    "lawFirstAid.accused": "I am being accused or involved",
    "lawFirstAid.incidentType": "Type of incident",
    "lawFirstAid.selectIncident": "Select the type of incident",
    "lawFirstAid.specifyIncident": "Please specify the incident",
    "lawFirstAid.describeIncident": "Describe the type of incident",
    "lawFirstAid.location": "Location of incident",
    "lawFirstAid.locationPlaceholder": "City, district, or specific location",
    "lawFirstAid.timeOfIncident": "Time of incident (optional)",
    "lawFirstAid.immediateDanger": "Are you in immediate danger?",
    "lawFirstAid.yes": "Yes",
    "lawFirstAid.no": "No",
    "lawFirstAid.additionalContext": "Additional context (optional)",
    "lawFirstAid.contextPlaceholder":
      "Provide any additional details that might help us give you better guidance",
    "lawFirstAid.getGuide": "Get My Action Guide",
    "lawFirstAid.personalizedGuide": "Your Personalized Action Guide",
    "lawFirstAid.downloadGuide": "Download Guide",
    "lawFirstAid.newSituation": "New Situation",
    "lawFirstAid.dangerDetected": "IMMEDIATE DANGER DETECTED",
    "lawFirstAid.callNow":
      "Call 999 now for emergency assistance. Your safety is the top priority.",
    "lawFirstAid.immediateActions": "Immediate Actions",
    "lawFirstAid.emergencyContacts": "Emergency Contacts",
    "lawFirstAid.whereToGo": "Where to Go",
    "lawFirstAid.documentsToCollect": "Documents to Collect",
    "lawFirstAid.legalRights": "Your Legal Rights",
    "lawFirstAid.whoToContact": "Who to Contact for Help",
    "lawFirstAid.dos": "Do's",
    "lawFirstAid.donts": "Don'ts",
    "lawFirstAid.disclaimer": "Important Disclaimer",
    "lawFirstAid.disclaimerText":
      "This guidance is based on general Bangladesh law and should not replace professional legal advice. Laws and procedures may vary by jurisdiction and circumstances. Always consult with a qualified lawyer for your specific situation.",

    // Incident Types
    "incident.assault": "Physical assault",
    "incident.theft": "Theft or robbery",
    "incident.domestic": "Domestic violence",
    "incident.sexual": "Sexual harassment or rape",
    "incident.cyber": "Cybercrime (Facebook/phone threats, hacking, etc.)",
    "incident.drug": "Drug-related situation",
    "incident.accident": "Road accident",
    "incident.police": "Police harassment or unlawful detention",
    "incident.other": "Other",
  },
  bn: {
    // Header
    "header.title": "পেপারস প্লিজ",
    "header.subtitle": "বাংলাদেশ ডকুমেন্ট গাইড",
    "header.getHelp": "সাহায্য নিন",
    "header.language": "English",

    // Hero Section
    "hero.title": "আপনার সরকারি কাগজপত্র সম্পন্ন করুন",
    "hero.subtitle": "কোনো ঝামেলা ছাড়াই",
    "hero.description":
      "বাংলাদেশের সকল সরকারি ডকুমেন্টের জন্য ধাপে ধাপে গাইড, অফিসিয়াল ফি এবং লাইভ কিউ স্ট্যাটাস পান। সময়, অর্থ সাশ্রয় করুন এবং দালালদের এড়িয়ে চলুন।",

    // Quick Actions
    "quickAction.queue.title": "কিউ স্ট্যাটাস চেক করুন",
    "quickAction.queue.description": "সরকারি অফিসে লাইভ অপেক্ষার সময় দেখুন",
    "quickAction.submit.title": "কিউ আপডেট জমা দিন",
    "quickAction.submit.description":
      "বর্তমান অপেক্ষার সময় শেয়ার করে অন্যদের সাহায্য করুন",
    "quickAction.browse.title": "ডকুমেন্ট ব্রাউজ করুন",
    "quickAction.browse.description":
      "যেকোনো ডকুমেন্টের জন্য ধাপে ধাপে গাইড খুঁজুন",

    // Stats
    "stats.documents.title": "ডকুমেন্ট কভার করা হয়েছে",
    "stats.documents.value": "৫০+",
    "stats.documents.description":
      "সকল প্রধান সরকারি ডকুমেন্টের সম্পূর্ণ পদ্ধতি",
    "stats.offices.title": "সরকারি অফিস",
    "stats.offices.value": "২৫+",
    "stats.offices.description": "বাংলাদেশ জুড়ে অফিস থেকে লাইভ কিউ স্ট্যাটাস",
    "stats.users.title": "ব্যবহারকারীদের সাহায্য করা হয়েছে",
    "stats.users.value": "১০ হাজার+",
    "stats.users.description": "যে নাগরিকরা দালাল এড়িয়ে অর্থ সাশ্রয় করেছেন",
    "stats.savings.title": "গড় সাশ্রয়",
    "stats.savings.value": "৳২,৫০০",
    "stats.savings.description":
      "আমাদের গাইড অনুসরণ করে প্রতি ডকুমেন্টে অর্থ সাশ্রয়",

    // Tabs
    "tabs.documents": "ডকুমেন্ট গাইড",
    "tabs.queue": "কিউ স্ট্যাটাস",
    "tabs.submit": "আপডেট জমা দিন",

    // Document Categories
    "category.title": "ডকুমেন্ট ক্যাটাগরি",
    "category.description": "বাংলাদেশের সকল সরকারি ডকুমেন্টের সম্পূর্ণ গাইড",
    "category.filter.all": "সকল ডকুমেন্ট",
    "category.filter.popular": "সবচেয়ে জনপ্রিয়",
    "category.filter.common": "সাধারণ",
    "category.filter.specialized": "বিশেষায়িত",
    "category.processingTime": "প্রক্রিয়াকরণের সময়:",
    "category.officialFee": "অফিসিয়াল ফি:",
    "category.stepsRequired": "প্রয়োজনীয় ধাপ:",
    "category.requiredDocuments": "প্রয়োজনীয় ডকুমেন্ট:",
    "category.viewDetails": "বিস্তারিত দেখুন",
    "category.more": "আরো",
    "category.steps": "ধাপ",

    // Document Types
    "doc.nid.title": "জাতীয় পরিচয়পত্র",
    "doc.nid.titleBengali": "National ID Card",
    "doc.passport.title": "পাসপোর্ট",
    "doc.passport.titleBengali": "Passport",
    "doc.birth.title": "জন্ম নিবন্ধন",
    "doc.birth.titleBengali": "Birth Certificate",
    "doc.marriage.title": "বিবাহ নিবন্ধন",
    "doc.marriage.titleBengali": "Marriage Certificate",
    "doc.driving.title": "ড্রাইভিং লাইসেন্স",
    "doc.driving.titleBengali": "Driving License",
    "doc.education.title": "শিক্ষাগত সনদ",
    "doc.education.titleBengali": "Education Certificate",
    "doc.business.title": "ব্যবসায়িক লাইসেন্স",
    "doc.business.titleBengali": "Business License",
    "doc.land.title": "ভূমি রেকর্ড",
    "doc.land.titleBengali": "Land Records",
    "doc.police.title": "পুলিশ ক্লিয়ারেন্স",
    "doc.police.titleBengali": "Police Clearance",

    // Anti-Scam Section
    "antiScam.title": "সাধারণ প্রতারণা এড়িয়ে চলুন",
    "antiScam.description":
      "অপ্রয়োজনীয় ফি এবং প্রতারণামূলক সেবা থেকে নিজেকে রক্ষা করুন",
    "antiScam.officialFees.title": "শুধুমাত্র অফিসিয়াল ফি",
    "antiScam.officialFees.description":
      "আমাদের গাইডে তালিকাভুক্ত অফিসিয়াল সরকারি ফির চেয়ে বেশি কখনো পরিশোধ করবেন না",
    "antiScam.directApplication.title": "সরাসরি আবেদন",
    "antiScam.directApplication.description":
      "সরাসরি সরকারি অফিসে আবেদন করুন - কোনো দালালের প্রয়োজন নেই",
    "antiScam.verifyInfo.title": "তথ্য যাচাই করুন",
    "antiScam.verifyInfo.description":
      "আমাদের আপডেটেড গাইডের সাথে সর্বদা প্রয়োজনীয়তা ক্রস-চেক করুন",

    // Footer
    "footer.description":
      "বাংলাদেশী নাগরিকদের অফিসিয়াল সরকারি ডকুমেন্ট পদ্ধতিতে ক্ষমতায়ন",
    "footer.copyright": "© ২০২৪ পেপারস প্লিজ",
    "footer.madeFor": "বাংলাদেশের জনগণের জন্য তৈরি",
    "footer.openSource": "বিনামূল্যে ও ওপেন সোর্স",

    // Guide Page
    "guide.backToHome": "হোমে ফিরুন",
    "guide.overview": "সংক্ষিপ্ত বিবরণ",
    "guide.procedure": "ধাপে ধাপে পদ্ধতি",
    "guide.offices": "সরকারি অফিস",
    "guide.fees": "ফি ও প্রক্রিয়াকরণের সময়",
    "guide.faqs": "প্রায়শই জিজ্ঞাসিত প্রশ্ন",
    "guide.tips": "সম্পর্কিত টিপস",
    "guide.importance": "গুরুত্ব",
    "guide.officialFee": "অফিসিয়াল ফি",
    "guide.processingTime": "প্রক্রিয়াকরণের সময়",
    "guide.requiredDocuments": "প্রয়োজনীয় ডকুমেন্ট",
    "guide.step": "ধাপ",

    // Law First Aid
    "lawFirstAid.title": "আইনি প্রাথমিক চিকিৎসা",
    "lawFirstAid.subtitle": "জরুরি আইনি নির্দেশনা",
    "lawFirstAid.backToHome": "হোমে ফিরুন",
    "lawFirstAid.emergencyCall": "জরুরি? এখনই ৯৯৯ এ কল করুন",
    "lawFirstAid.knowRights": "আপনার অধিকার জানুন, কী করতে হবে জানুন",
    "lawFirstAid.description":
      "বাংলাদেশের আইনের ভিত্তিতে তাৎক্ষণিক, ধাপে ধাপে আইনি নির্দেশনা পান। আপনি ভুক্তভোগী, সাক্ষী বা অভিযুক্ত যাই হন না কেন, এই টুলটি আপনাকে আপনার অধিকার বুঝতে এবং সঠিক পদক্ষেপ নিতে সাহায্য করবে।",
    "lawFirstAid.tellSituation": "আপনার পরিস্থিতি সম্পর্কে বলুন",
    "lawFirstAid.userRole": "এই পরিস্থিতিতে আপনার ভূমিকা কী?",
    "lawFirstAid.victim": "আমি একজন ভুক্তভোগী",
    "lawFirstAid.witness": "আমি একজন সাক্ষী",
    "lawFirstAid.accused": "আমি অভিযুক্ত বা জড়িত",
    "lawFirstAid.incidentType": "ঘটনার ধরন",
    "lawFirstAid.selectIncident": "ঘটনার ধরন নির্বাচন করুন",
    "lawFirstAid.specifyIncident": "অনুগ্রহ করে ঘটনাটি নির্দিষ্ট করুন",
    "lawFirstAid.describeIncident": "ঘটনার ধরন বর্ণনা করুন",
    "lawFirstAid.location": "ঘটনার স্থান",
    "lawFirstAid.locationPlaceholder": "শহর, জেলা বা নির্দিষ্ট স্থান",
    "lawFirstAid.timeOfIncident": "ঘটনার সময় (ঐচ্ছিক)",
    "lawFirstAid.immediateDanger": "আপনি কি তাৎক্ষণিক বিপদে আছেন?",
    "lawFirstAid.yes": "হ্যাঁ",
    "lawFirstAid.no": "না",
    "lawFirstAid.additionalContext": "অতিরিক্ত প্রসঙ্গ (ঐচ্ছিক)",
    "lawFirstAid.contextPlaceholder":
      "আমাদের আরও ভাল নির্দেশনা দিতে সাহায্য করতে পারে এমন কোনো অতিরিক্ত বিবরণ প্রদান করুন",
    "lawFirstAid.getGuide": "আমার কর্মপরিকল্পনা পান",
    "lawFirstAid.personalizedGuide": "আপনার ব্যক্তিগত কর্মপরিকল্পনা",
    "lawFirstAid.downloadGuide": "গাইড ডাউনলোড করুন",
    "lawFirstAid.newSituation": "নতুন পরিস্থিতি",
    "lawFirstAid.dangerDetected": "তাৎক্ষণিক বিপদ শনাক্ত করা হয়েছে",
    "lawFirstAid.callNow":
      "জরুরি সহায়তার জন্য এখনই ৯৯৯ এ কল করুন। আপনার নিরাপত্তাই সর্বোচ্চ অগ্রাধিকার।",
    "lawFirstAid.immediateActions": "তাৎক্ষণিক পদক্ষেপ",
    "lawFirstAid.emergencyContacts": "জরুরি যোগাযোগ",
    "lawFirstAid.whereToGo": "কোথায় যেতে হবে",
    "lawFirstAid.documentsToCollect": "যে কাগজপত্র সংগ্রহ করতে হবে",
    "lawFirstAid.legalRights": "আপনার আইনি অধিকার",
    "lawFirstAid.whoToContact": "সাহায্যের জন্য কার সাথে যোগাযোগ করবেন",
    "lawFirstAid.dos": "করণীয়",
    "lawFirstAid.donts": "বর্জনীয়",
    "lawFirstAid.disclaimer": "গুরুত্বপূর্ণ দাবিত্যাগ",
    "lawFirstAid.disclaimerText":
      "এই নির্দেশনা সাধারণ বাংলাদেশের আইনের উপর ভিত্তি করে এবং পেশাদার আইনি পরামর্শের বিকল্প নয়। আইন এবং পদ্ধতি এখতিয়ার এবং পরিস্থিতি অনুযায়ী ভিন্ন হতে পারে। আপনার নির্দিষ্ট পরিস্থিতির জন্য সর্বদা একজন যোগ্য আইনজীবীর সাথে পরামর্শ করুন।",

    // Incident Types
    "incident.assault": "শারীরিক নির্যাতন",
    "incident.theft": "চুরি বা ডাকাতি",
    "incident.domestic": "পারিবারিক সহিংসতা",
    "incident.sexual": "যৌন হয়রানি বা ধর্ষণ",
    "incident.cyber": "সাইবার অপরাধ (ফেসবুক/ফোনে হুমকি, হ্যাকিং ইত্যাদি)",
    "incident.drug": "মাদক সংক্রান্ত পরিস্থিতি",
    "incident.accident": "সড়ক দুর্ঘটনা",
    "incident.police": "পুলিশি হয়রানি বা বেআইনি আটক",
    "incident.other": "অন্যান্য",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
