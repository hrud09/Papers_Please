import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, MapPin, TrendingUp, AlertCircle } from "lucide-react";

interface QueueData {
  id: string;
  officeName: string;
  location: string;
  currentWaitTime: "light" | "moderate" | "heavy";
  estimatedMinutes: number;
  queueLength: number;
  lastUpdated: string;
  trend: "increasing" | "decreasing" | "stable";
}

interface QueueStatusTrackerProps {
  offices?: QueueData[];
  selectedOfficeId?: string;
  onOfficeSelect?: (officeId: string) => void;
}

const QueueStatusTracker = ({
  offices = [
    {
      id: "dhaka-north",
      officeName: "Dhaka North City Corporation",
      location: "Gulshan, Dhaka",
      currentWaitTime: "moderate",
      estimatedMinutes: 45,
      queueLength: 23,
      lastUpdated: "5 minutes ago",
      trend: "decreasing",
    },
    {
      id: "dhaka-south",
      officeName: "Dhaka South City Corporation",
      location: "Dhanmondi, Dhaka",
      currentWaitTime: "light",
      estimatedMinutes: 20,
      queueLength: 8,
      lastUpdated: "2 minutes ago",
      trend: "stable",
    },
    {
      id: "passport-office",
      officeName: "Department of Immigration & Passports",
      location: "Agargaon, Dhaka",
      currentWaitTime: "heavy",
      estimatedMinutes: 90,
      queueLength: 45,
      lastUpdated: "1 minute ago",
      trend: "increasing",
    },
    {
      id: "nid-center",
      officeName: "National ID Registration Center",
      location: "Tejgaon, Dhaka",
      currentWaitTime: "moderate",
      estimatedMinutes: 35,
      queueLength: 18,
      lastUpdated: "3 minutes ago",
      trend: "stable",
    },
    {
      id: "birth-reg",
      officeName: "Birth Registration Office",
      location: "Ramna, Dhaka",
      currentWaitTime: "light",
      estimatedMinutes: 15,
      queueLength: 6,
      lastUpdated: "4 minutes ago",
      trend: "decreasing",
    },
  ],
  selectedOfficeId = "dhaka-north",
  onOfficeSelect = () => {},
}: QueueStatusTrackerProps) => {
  const [selectedOffice, setSelectedOffice] =
    useState<string>(selectedOfficeId);
  const [refreshTime, setRefreshTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime((prev) => (prev + 1) % 30);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getWaitTimeColor = (waitTime: string) => {
    switch (waitTime) {
      case "light":
        return "bg-green-500";
      case "moderate":
        return "bg-yellow-500";
      case "heavy":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getWaitTimeBadge = (waitTime: string) => {
    switch (waitTime) {
      case "light":
        return {
          variant: "default" as const,
          text: "Light",
          color: "text-green-700 bg-green-100",
        };
      case "moderate":
        return {
          variant: "secondary" as const,
          text: "Moderate",
          color: "text-yellow-700 bg-yellow-100",
        };
      case "heavy":
        return {
          variant: "destructive" as const,
          text: "Heavy",
          color: "text-red-700 bg-red-100",
        };
      default:
        return {
          variant: "outline" as const,
          text: "Unknown",
          color: "text-gray-700 bg-gray-100",
        };
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "decreasing":
        return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      case "stable":
        return <div className="h-4 w-4 rounded-full bg-blue-500" />;
      default:
        return null;
    }
  };

  const selectedOfficeData = offices.find(
    (office) => office.id === selectedOffice,
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Live Queue Status Tracker
        </h2>
        <p className="text-muted-foreground">
          Real-time waiting times at government offices across Bangladesh
        </p>
      </div>

      <Tabs
        value={selectedOffice}
        onValueChange={(value) => {
          setSelectedOffice(value);
          onOfficeSelect(value);
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-6">
          {offices.map((office) => (
            <TabsTrigger key={office.id} value={office.id} className="text-xs">
              <div className="flex items-center space-x-1">
                <div
                  className={`h-2 w-2 rounded-full ${getWaitTimeColor(office.currentWaitTime)}`}
                />
                <span className="hidden sm:inline">
                  {office.officeName.split(" ")[0]}
                </span>
                <span className="sm:hidden">
                  {office.officeName.substring(0, 8)}...
                </span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {offices.map((office) => (
          <TabsContent key={office.id} value={office.id}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Main Status Card */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {office.officeName}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {office.location}
                      </p>
                    </div>
                    {getTrendIcon(office.trend)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Current Status:
                      </span>
                      <Badge
                        className={
                          getWaitTimeBadge(office.currentWaitTime).color
                        }
                      >
                        {getWaitTimeBadge(office.currentWaitTime).text}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Estimated Wait:
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {office.estimatedMinutes} min
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        People in Queue:
                      </span>
                      <span className="text-lg font-semibold">
                        {office.queueLength}
                      </span>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Queue Progress</span>
                        <span>
                          {Math.round((1 - office.queueLength / 50) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(1 - office.queueLength / 50) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Queue Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-xs text-muted-foreground">
                          {office.lastUpdated}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Next Refresh</p>
                        <p className="text-xs text-muted-foreground">
                          {30 - refreshTime}s
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">
                            Pro Tip
                          </p>
                          <p className="text-xs text-yellow-700">
                            {office.currentWaitTime === "light"
                              ? "Great time to visit! Queue is moving quickly."
                              : office.currentWaitTime === "moderate"
                                ? "Moderate wait expected. Consider bringing documents to review."
                                : "Heavy traffic. Consider visiting later or early morning."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-2 bg-green-50 rounded">
                        <p className="text-xs text-green-600">Best Time</p>
                        <p className="text-sm font-semibold text-green-800">
                          9-11 AM
                        </p>
                      </div>
                      <div className="p-2 bg-red-50 rounded">
                        <p className="text-xs text-red-600">Avoid</p>
                        <p className="text-sm font-semibold text-red-800">
                          2-4 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QueueStatusTracker;