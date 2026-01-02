import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bell,
  Plus,
  Calendar,
  CreditCard,
  FileText,
  Car,
  Trash2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReminderItem {
  id: string;
  type: "passport" | "nid" | "driving-license";
  expiryDate: string;
  daysLeft: number;
}

const documentTypes = [
  { id: "passport", label: "Passport", labelBn: "পাসপোর্ট", icon: <FileText className="h-4 w-4" /> },
  { id: "nid", label: "NID Card", labelBn: "NID কার্ড", icon: <CreditCard className="h-4 w-4" /> },
  { id: "driving-license", label: "Driving License", labelBn: "ড্রাইভিং লাইসেন্স", icon: <Car className="h-4 w-4" /> },
];

const RenewalReminder = () => {
  const { language } = useLanguage();
  const [reminders, setReminders] = useState<ReminderItem[]>([
    { id: "1", type: "passport", expiryDate: "2025-06-15", daysLeft: 180 },
    { id: "2", type: "driving-license", expiryDate: "2024-12-20", daysLeft: 30 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newReminder, setNewReminder] = useState({ type: "passport", expiryDate: "" });

  const calculateDaysLeft = (date: string): number => {
    const expiry = new Date(date);
    const today = new Date();
    const diff = expiry.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handleAddReminder = () => {
    if (newReminder.expiryDate) {
      const daysLeft = calculateDaysLeft(newReminder.expiryDate);
      setReminders([
        ...reminders,
        {
          id: Date.now().toString(),
          type: newReminder.type as "passport" | "nid" | "driving-license",
          expiryDate: newReminder.expiryDate,
          daysLeft,
        },
      ]);
      setNewReminder({ type: "passport", expiryDate: "" });
      setShowForm(false);
    }
  };

  const removeReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const getStatusColor = (daysLeft: number) => {
    if (daysLeft <= 30) return "text-red-500 bg-red-500/10";
    if (daysLeft <= 90) return "text-orange-500 bg-orange-500/10";
    return "text-green-500 bg-green-500/10";
  };

  const getDocIcon = (type: string) => {
    switch (type) {
      case "passport":
        return <FileText className="h-5 w-5" />;
      case "nid":
        return <CreditCard className="h-5 w-5" />;
      case "driving-license":
        return <Car className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getDocLabel = (type: string) => {
    const doc = documentTypes.find((d) => d.id === type);
    return language === "bn" ? doc?.labelBn : doc?.label;
  };

  return (
    <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <Bell className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="text-[#E8EDDF] font-semibold">
                {language === "bn" ? "নবায়ন রিমাইন্ডার" : "Renewal Reminders"}
              </h3>
              <p className="text-xs text-[#CFDBD5]/60">
                {language === "bn" ? "মেয়াদ উত্তীর্ণের আগে জানুন" : "Get notified before expiry"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowForm(!showForm)}
            className="text-[#F5CB5C] hover:bg-[#242423] p-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-[#242423] rounded-xl p-4 mb-4 space-y-3">
            <div>
              <Label className="text-[#CFDBD5]/80 text-sm mb-1.5 block">
                {language === "bn" ? "ডকুমেন্টের ধরন" : "Document Type"}
              </Label>
              <div className="flex gap-2">
                {documentTypes.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setNewReminder({ ...newReminder, type: doc.id })}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                      newReminder.type === doc.id
                        ? "bg-[#F5CB5C] text-[#242423]"
                        : "bg-[#333533] text-[#CFDBD5] hover:bg-[#333533]/80"
                    }`}
                  >
                    {doc.icon}
                    <span className="hidden sm:inline">{language === "bn" ? doc.labelBn : doc.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-[#CFDBD5]/80 text-sm mb-1.5 block">
                {language === "bn" ? "মেয়াদ উত্তীর্ণের তারিখ" : "Expiry Date"}
              </Label>
              <Input
                type="date"
                value={newReminder.expiryDate}
                onChange={(e) => setNewReminder({ ...newReminder, expiryDate: e.target.value })}
                className="bg-[#333533] border-0 text-[#E8EDDF] rounded-xl"
              />
            </div>
            <Button
              onClick={handleAddReminder}
              className="w-full bg-[#F5CB5C] text-[#242423] hover:bg-[#F5CB5C]/90 rounded-xl"
            >
              {language === "bn" ? "রিমাইন্ডার যোগ করুন" : "Add Reminder"}
            </Button>
          </div>
        )}

        {/* Reminders List */}
        <div className="space-y-2">
          {reminders.length === 0 ? (
            <div className="text-center py-6">
              <Bell className="h-10 w-10 text-[#CFDBD5]/20 mx-auto mb-2" />
              <p className="text-sm text-[#CFDBD5]/50">
                {language === "bn" ? "কোনো রিমাইন্ডার নেই" : "No reminders yet"}
              </p>
            </div>
          ) : (
            reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center gap-3 p-3 bg-[#242423] rounded-xl"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getStatusColor(reminder.daysLeft)}`}>
                  {getDocIcon(reminder.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[#E8EDDF] font-medium text-sm">
                    {getDocLabel(reminder.type)}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Calendar className="h-3 w-3 text-[#CFDBD5]/50" />
                    <span className="text-xs text-[#CFDBD5]/60">
                      {new Date(reminder.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${
                    reminder.daysLeft <= 30 ? "text-red-500" :
                    reminder.daysLeft <= 90 ? "text-orange-500" : "text-green-500"
                  }`}>
                    {reminder.daysLeft > 0 ? (
                      <>
                        {reminder.daysLeft} {language === "bn" ? "দিন বাকি" : "days"}
                      </>
                    ) : (
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {language === "bn" ? "মেয়াদ উত্তীর্ণ!" : "Expired!"}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeReminder(reminder.id)}
                  className="p-2 text-[#CFDBD5]/30 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RenewalReminder;
