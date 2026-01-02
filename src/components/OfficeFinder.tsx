import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Phone,
  ExternalLink,
  Building2,
  Users,
  Navigation,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Office {
  id: string;
  name: string;
  nameBn: string;
  type: "passport" | "nid" | "brta" | "birth";
  address: string;
  addressBn: string;
  phone?: string;
  hours: string;
  hoursBn: string;
  crowdStatus: "low" | "medium" | "high";
  mapUrl: string;
}

const offices: Office[] = [
  {
    id: "1",
    name: "Agargaon Passport Office",
    nameBn: "আগারগাঁও পাসপোর্ট অফিস",
    type: "passport",
    address: "E-6/1, Agargaon Administrative Area, Dhaka-1207",
    addressBn: "ই-৬/১, আগারগাঁও প্রশাসনিক এলাকা, ঢাকা-১২০৭",
    phone: "02-8181818",
    hours: "9:00 AM - 5:00 PM (Sun-Thu)",
    hoursBn: "সকাল ৯টা - বিকাল ৫টা (রবি-বৃহঃ)",
    crowdStatus: "high",
    mapUrl: "https://maps.google.com/?q=Agargaon+Passport+Office+Dhaka",
  },
  {
    id: "2",
    name: "Uttara NID Center",
    nameBn: "উত্তরা NID কেন্দ্র",
    type: "nid",
    address: "Uttara Sector 6, Dhaka",
    addressBn: "উত্তরা সেক্টর ৬, ঢাকা",
    phone: "02-55034567",
    hours: "9:00 AM - 5:00 PM (Sun-Thu)",
    hoursBn: "সকাল ৯টা - বিকাল ৫টা (রবি-বৃহঃ)",
    crowdStatus: "medium",
    mapUrl: "https://maps.google.com/?q=Uttara+Sector+6+Dhaka",
  },
  {
    id: "3",
    name: "Mirpur BRTA Office",
    nameBn: "মিরপুর BRTA অফিস",
    type: "brta",
    address: "Mirpur-10, Dhaka",
    addressBn: "মিরপুর-১০, ঢাকা",
    phone: "02-9006963",
    hours: "9:00 AM - 5:00 PM (Sun-Thu)",
    hoursBn: "সকাল ৯টা - বিকাল ৫টা (রবি-বৃহঃ)",
    crowdStatus: "high",
    mapUrl: "https://maps.google.com/?q=BRTA+Mirpur+Dhaka",
  },
  {
    id: "4",
    name: "Motijheel Passport Office",
    nameBn: "মতিঝিল পাসপোর্ট অফিস",
    type: "passport",
    address: "BSB Building, Motijheel, Dhaka-1000",
    addressBn: "BSB ভবন, মতিঝিল, ঢাকা-১০০০",
    phone: "02-9551234",
    hours: "9:00 AM - 5:00 PM (Sun-Thu)",
    hoursBn: "সকাল ৯টা - বিকাল ৫টা (রবি-বৃহঃ)",
    crowdStatus: "low",
    mapUrl: "https://maps.google.com/?q=Motijheel+Dhaka",
  },
];

const officeTypes = [
  { id: "all", label: "All", labelBn: "সব" },
  { id: "passport", label: "Passport", labelBn: "পাসপোর্ট" },
  { id: "nid", label: "NID", labelBn: "NID" },
  { id: "brta", label: "BRTA", labelBn: "BRTA" },
];

const OfficeFinder = () => {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState("all");

  const filteredOffices = selectedType === "all"
    ? offices
    : offices.filter((o) => o.type === selectedType);

  const getCrowdColor = (status: string) => {
    switch (status) {
      case "low":
        return "text-green-500 bg-green-500/10";
      case "medium":
        return "text-orange-500 bg-orange-500/10";
      case "high":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-[#CFDBD5] bg-[#CFDBD5]/10";
    }
  };

  const getCrowdLabel = (status: string) => {
    switch (status) {
      case "low":
        return language === "bn" ? "কম ভিড়" : "Low Crowd";
      case "medium":
        return language === "bn" ? "মাঝারি ভিড়" : "Moderate";
      case "high":
        return language === "bn" ? "বেশি ভিড়" : "Crowded";
      default:
        return "";
    }
  };

  return (
    <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center">
            <MapPin className="h-5 w-5 text-[#F5CB5C]" />
          </div>
          <div>
            <h3 className="text-[#E8EDDF] font-semibold">
              {language === "bn" ? "অফিস খুঁজুন" : "Find Offices"}
            </h3>
            <p className="text-xs text-[#CFDBD5]/60">
              {language === "bn" ? "কাছের সরকারি অফিস" : "Nearby government offices"}
            </p>
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {officeTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedType === type.id
                  ? "bg-[#F5CB5C] text-[#242423]"
                  : "bg-[#242423] text-[#CFDBD5] hover:bg-[#242423]/80"
              }`}
            >
              {language === "bn" ? type.labelBn : type.label}
            </button>
          ))}
        </div>

        {/* Offices List */}
        <div className="space-y-3">
          {filteredOffices.map((office) => (
            <div key={office.id} className="bg-[#242423] rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#F5CB5C]" />
                  <h4 className="text-[#E8EDDF] font-medium text-sm">
                    {language === "bn" ? office.nameBn : office.name}
                  </h4>
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg flex items-center gap-1 ${getCrowdColor(office.crowdStatus)}`}>
                  <Users className="h-3 w-3" />
                  {getCrowdLabel(office.crowdStatus)}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-start gap-2 text-xs text-[#CFDBD5]/70">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>{language === "bn" ? office.addressBn : office.address}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#CFDBD5]/70">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{language === "bn" ? office.hoursBn : office.hours}</span>
                </div>
                {office.phone && (
                  <div className="flex items-center gap-2 text-xs text-[#CFDBD5]/70">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{office.phone}</span>
                  </div>
                )}
              </div>

              <a
                href={office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 bg-[#333533] hover:bg-[#333533]/80 rounded-xl text-sm text-[#F5CB5C] transition-all"
              >
                <Navigation className="h-4 w-4" />
                {language === "bn" ? "ম্যাপে দেখুন" : "Get Directions"}
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OfficeFinder;
