import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Briefcase, CheckCircle2, ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SharedNavigation from "./SharedNavigation";

interface Manager {
  id: string;
  name: string;
  location: string;
  servingArea: string[];
  totalAssignments: number;
  rating: number;
  reviews: number;
  charge: number;
  specialties: string[];
  availability: "available" | "busy" | "offline";
}

const PaperManagersList = () => {
  const navigate = useNavigate();
  const [managers] = useState<Manager[]>([
    {
      id: "1",
      name: "Karim Rahman",
      location: "Dhaka, Gulshan",
      servingArea: ["Dhaka North", "Gulshan", "Banani", "Uttara"],
      totalAssignments: 247,
      rating: 4.9,
      reviews: 156,
      charge: 500,
      specialties: ["NID", "Passport", "Driving License"],
      availability: "available",
    },
    {
      id: "2",
      name: "Fatima Begum",
      location: "Dhaka, Dhanmondi",
      servingArea: ["Dhaka South", "Dhanmondi", "Mohammadpur", "Mirpur"],
      totalAssignments: 189,
      rating: 4.8,
      reviews: 124,
      charge: 500,
      specialties: ["Birth Certificate", "TIN", "Trade License"],
      availability: "available",
    },
    {
      id: "3",
      name: "Abdul Haque",
      location: "Chittagong",
      servingArea: ["Chittagong City", "Agrabad", "Panchlaish"],
      totalAssignments: 312,
      rating: 4.9,
      reviews: 203,
      charge: 500,
      specialties: ["Company Registration", "Bank Account", "Investment"],
      availability: "busy",
    },
    {
      id: "4",
      name: "Nasrin Akter",
      location: "Dhaka, Tejgaon",
      servingArea: ["Tejgaon", "Karwan Bazar", "Farmgate"],
      totalAssignments: 156,
      rating: 4.7,
      reviews: 98,
      charge: 500,
      specialties: ["Passport", "NID Reissue", "Certificates"],
      availability: "available",
    },
    {
      id: "5",
      name: "Mohammad Ali",
      location: "Sylhet",
      servingArea: ["Sylhet City", "Zindabazar", "Ambarkhana"],
      totalAssignments: 201,
      rating: 4.8,
      reviews: 142,
      charge: 500,
      specialties: ["All Documents", "Express Service"],
      availability: "available",
    },
    {
      id: "6",
      name: "Razia Sultana",
      location: "Dhaka, Motijheel",
      servingArea: ["Motijheel", "Paltan", "Kakrail"],
      totalAssignments: 278,
      rating: 4.9,
      reviews: 187,
      charge: 500,
      specialties: ["TIN", "Trade License", "Company Docs"],
      availability: "offline",
    },
  ]);

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "available":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Available</Badge>;
      case "busy":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Busy</Badge>;
      case "offline":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Offline</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SharedNavigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Pricing Banner */}
          <Card className="mb-8 bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">Fixed Service Charge</h3>
                  <p className="text-green-50">Professional document management service</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">৳500</div>
                  <p className="text-sm text-green-50">Per document</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Managers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managers.map((manager) => (
              <Card
                key={manager.id}
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{manager.name}</CardTitle>
                      <div className="flex items-center space-x-1 text-base text-muted-foreground mb-2">
                        <MapPin className="h-5 w-5" />
                        <span>{manager.location}</span>
                      </div>
                    </div>
                    {getAvailabilityBadge(manager.availability)}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-xl">{manager.rating}</span>
                    </div>
                    <span className="text-base text-muted-foreground">
                      ({manager.reviews} reviews)
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                      <span className="text-base font-medium">Completed</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">
                      {manager.totalAssignments}
                    </span>
                  </div>

                  {/* Specialties */}
                  <div>
                    <p className="text-base font-medium mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {manager.specialties.map((specialty, idx) => (
                        <Badge
                          key={idx}
                          className="bg-green-100 text-green-700 hover:bg-green-100 text-sm"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Charge */}
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <span className="text-base font-medium">Service Charge:</span>
                    <span className="text-3xl font-bold text-green-600">
                      ৳{manager.charge}
                    </span>
                  </div>

                  {/* Hire Button */}
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 hover:scale-105 transition-transform text-base py-6"
                    onClick={() => navigate("/hire-paper-manager")}
                  >
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Hire {manager.name.split(" ")[0]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperManagersList;