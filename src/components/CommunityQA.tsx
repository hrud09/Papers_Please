import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  ThumbsUp,
  CheckCircle2,
  User,
  Clock,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  Send,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Question {
  id: string;
  question: string;
  questionBn: string;
  askedBy: string;
  date: string;
  documentType: string;
  upvotes: number;
  answers: Answer[];
}

interface Answer {
  id: string;
  answer: string;
  answerBn: string;
  answeredBy: string;
  date: string;
  isVerified: boolean;
  upvotes: number;
}

interface CommunityQAProps {
  documentId?: string;
  documentTitle?: string;
}

const questionsData: Question[] = [
  {
    id: "1",
    question: "Can I apply for passport if my NID has my old address?",
    questionBn: "আমার NID তে পুরনো ঠিকানা থাকলে কি পাসপোর্টের জন্য আবেদন করতে পারি?",
    askedBy: "Rahim K.",
    date: "2024-01-10",
    documentType: "passport",
    upvotes: 45,
    answers: [
      {
        id: "a1",
        answer: "Yes, you can apply with old address on NID. However, you must provide current address proof (utility bill) and mention the correct address in the passport form. The passport will be issued with your current address.",
        answerBn: "হ্যাঁ, NID তে পুরনো ঠিকানা থাকলেও আবেদন করতে পারবেন। তবে, বর্তমান ঠিকানার প্রমাণ (ইউটিলিটি বিল) দিতে হবে এবং পাসপোর্ট ফর্মে সঠিক ঠিকানা লিখতে হবে। পাসপোর্ট আপনার বর্তমান ঠিকানায় ইস্যু হবে।",
        answeredBy: "Papers Please Team",
        date: "2024-01-11",
        isVerified: true,
        upvotes: 32,
      },
    ],
  },
  {
    id: "2",
    question: "How long does NID correction really take? Official says 30 days but mine is pending for 3 months",
    questionBn: "NID সংশোধনে আসলে কত সময় লাগে? অফিসিয়াল ৩০ দিন বলে কিন্তু আমারটা ৩ মাস ধরে পেন্ডিং",
    askedBy: "Fatima S.",
    date: "2024-01-08",
    documentType: "nid",
    upvotes: 89,
    answers: [
      {
        id: "a2",
        answer: "Unfortunately, NID corrections often take longer than officially stated. The 30-day timeframe is for 'urgent' processing. Regular corrections can take 2-4 months. If it's been over 3 months, visit the election office with your receipt and follow up in person.",
        answerBn: "দুর্ভাগ্যবশত, NID সংশোধনে অফিসিয়াল সময়ের চেয়ে বেশি সময় লাগে। ৩০ দিন হলো 'জরুরি' প্রসেসিং এর জন্য। সাধারণ সংশোধনে ২-৪ মাস লাগতে পারে। ৩ মাসের বেশি হলে, রসিদ নিয়ে নির্বাচন অফিসে গিয়ে ফলো আপ করুন।",
        answeredBy: "Papers Please Team",
        date: "2024-01-09",
        isVerified: true,
        upvotes: 56,
      },
      {
        id: "a3",
        answer: "I had the same issue. Going in person helped - they processed it within a week after my visit.",
        answerBn: "আমারও একই সমস্যা ছিল। সশরীরে গেলে কাজ হলো - আমার ভিজিটের এক সপ্তাহের মধ্যে প্রসেস করল।",
        answeredBy: "Karim B.",
        date: "2024-01-10",
        isVerified: false,
        upvotes: 23,
      },
    ],
  },
  {
    id: "3",
    question: "Is it safe to apply for birth certificate online? Will the certificate be valid everywhere?",
    questionBn: "অনলাইনে জন্ম সনদের আবেদন করা কি নিরাপদ? সার্টিফিকেট কি সব জায়গায় গ্রহণযোগ্য হবে?",
    askedBy: "Nadia R.",
    date: "2024-01-05",
    documentType: "birth-certificate",
    upvotes: 67,
    answers: [
      {
        id: "a4",
        answer: "Yes, online birth certificates from bdris.gov.bd are 100% official and valid everywhere. In fact, the online version (with 17-digit registration number) is now REQUIRED for NID and passport applications. The printed copy has a QR code for verification.",
        answerBn: "হ্যাঁ, bdris.gov.bd থেকে অনলাইন জন্ম সনদ ১০০% অফিসিয়াল এবং সব জায়গায় গ্রহণযোগ্য। আসলে, অনলাইন ভার্সন (১৭ সংখ্যার রেজিস্ট্রেশন নম্বরসহ) এখন NID ও পাসপোর্ট আবেদনের জন্য বাধ্যতামূলক। প্রিন্টেড কপিতে যাচাইয়ের জন্য QR কোড থাকে।",
        answeredBy: "Papers Please Team",
        date: "2024-01-06",
        isVerified: true,
        upvotes: 41,
      },
    ],
  },
  {
    id: "4",
    question: "Do I really need a broker for driving license at BRTA? They're asking ৳5000",
    questionBn: "BRTA তে ড্রাইভিং লাইসেন্সের জন্য কি সত্যিই দালাল দরকার? তারা ৳৫০০০ চাইছে",
    askedBy: "Sajid M.",
    date: "2024-01-03",
    documentType: "driving-license",
    upvotes: 112,
    answers: [
      {
        id: "a5",
        answer: "NO! You absolutely do NOT need a broker. The official fee is around ৳2,500-3,000 total. Apply online at brta.gov.bd, get your learner license, practice, and appear for the test. It's straightforward. Brokers only take your money for something you can easily do yourself.",
        answerBn: "না! আপনার একদম দালাল দরকার নেই। অফিসিয়াল ফি মোট প্রায় ৳২,৫০০-৩,০০০। brta.gov.bd তে অনলাইনে আবেদন করুন, লার্নার লাইসেন্স নিন, অনুশীলন করুন, এবং পরীক্ষা দিন। এটা সহজ। দালালরা শুধু এমন কাজের জন্য টাকা নেয় যা আপনি সহজেই নিজে করতে পারেন।",
        answeredBy: "Papers Please Team",
        date: "2024-01-04",
        isVerified: true,
        upvotes: 89,
      },
    ],
  },
];

const CommunityQA: React.FC<CommunityQAProps> = ({ documentId, documentTitle }) => {
  const { language } = useLanguage();
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAskForm, setShowAskForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const filteredQuestions = documentId
    ? questionsData.filter((q) => q.documentType === documentId)
    : questionsData;

  const searchedQuestions = searchQuery
    ? filteredQuestions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.questionBn.includes(searchQuery)
      )
    : filteredQuestions;

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const handleAskQuestion = () => {
    if (newQuestion.trim()) {
      // In a real app, this would submit to a backend
      alert(language === "bn" ? "আপনার প্রশ্ন জমা হয়েছে!" : "Your question has been submitted!");
      setNewQuestion("");
      setShowAskForm(false);
    }
  };

  return (
    <Card className="bg-[#333533] border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="text-[#E8EDDF] font-semibold">
                {language === "bn" ? "কমিউনিটি প্রশ্নোত্তর" : "Community Q&A"}
              </h3>
              <p className="text-xs text-[#CFDBD5]/60">
                {documentTitle || (language === "bn" ? "বাস্তব অভিজ্ঞতা থেকে শিখুন" : "Learn from real experiences")}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAskForm(!showAskForm)}
            className="text-[#F5CB5C] hover:bg-[#242423] p-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#CFDBD5]/50" />
          <Input
            placeholder={language === "bn" ? "প্রশ্ন খুঁজুন..." : "Search questions..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#242423] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl"
          />
        </div>

        {/* Ask Question Form */}
        {showAskForm && (
          <div className="bg-[#242423] rounded-xl p-4 mb-4 space-y-3">
            <Textarea
              placeholder={language === "bn" ? "আপনার প্রশ্ন লিখুন..." : "Type your question..."}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="bg-[#333533] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl resize-none"
              rows={3}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleAskQuestion}
                className="flex-1 bg-[#F5CB5C] text-[#242423] hover:bg-[#F5CB5C]/90 rounded-xl"
              >
                <Send className="h-4 w-4 mr-2" />
                {language === "bn" ? "প্রশ্ন করুন" : "Ask Question"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowAskForm(false)}
                className="text-[#CFDBD5] hover:bg-[#333533] rounded-xl"
              >
                {language === "bn" ? "বাতিল" : "Cancel"}
              </Button>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-2">
          {searchedQuestions.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-10 w-10 text-[#CFDBD5]/20 mx-auto mb-2" />
              <p className="text-sm text-[#CFDBD5]/50">
                {language === "bn" ? "কোনো প্রশ্ন পাওয়া যায়নি" : "No questions found"}
              </p>
            </div>
          ) : (
            searchedQuestions.map((q) => (
              <div key={q.id} className="bg-[#242423] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleQuestion(q.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#E8EDDF] font-medium text-sm mb-1">
                        {language === "bn" ? q.questionBn : q.question}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[#CFDBD5]/50">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {q.askedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {q.upvotes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {q.answers.length}
                        </span>
                      </div>
                    </div>
                    {expandedQuestion === q.id ? (
                      <ChevronUp className="h-5 w-5 text-[#CFDBD5]/50 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#CFDBD5]/50 flex-shrink-0" />
                    )}
                  </div>
                </button>

                {expandedQuestion === q.id && (
                  <div className="px-4 pb-4 space-y-3">
                    {q.answers.map((answer) => (
                      <div
                        key={answer.id}
                        className={`p-3 rounded-lg ${
                          answer.isVerified
                            ? "bg-green-500/10 border border-green-500/20"
                            : "bg-[#333533]"
                        }`}
                      >
                        {answer.isVerified && (
                          <div className="flex items-center gap-1 mb-2">
                            <Shield className="h-3.5 w-3.5 text-green-500" />
                            <span className="text-[10px] text-green-500 font-medium">
                              {language === "bn" ? "যাচাইকৃত উত্তর" : "Verified Answer"}
                            </span>
                          </div>
                        )}
                        <p className="text-sm text-[#CFDBD5]/80 mb-2">
                          {language === "bn" ? answer.answerBn : answer.answer}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-[#CFDBD5]/50">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {answer.answeredBy}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {answer.date}
                            </span>
                          </div>
                          <span className="flex items-center gap-1 text-xs text-[#CFDBD5]/50">
                            <ThumbsUp className="h-3 w-3" />
                            {answer.upvotes}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityQA;
