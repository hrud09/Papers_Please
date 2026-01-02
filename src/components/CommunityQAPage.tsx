import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MessageCircle,
  ThumbsUp,
  User,
  Clock,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  Send,
  Shield,
  Filter,
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
  {
    id: "5",
    question: "What happens if I miss my passport appointment?",
    questionBn: "পাসপোর্ট অ্যাপয়েন্টমেন্ট মিস করলে কী হবে?",
    askedBy: "Hassan T.",
    date: "2024-01-12",
    documentType: "passport",
    upvotes: 34,
    answers: [
      {
        id: "a6",
        answer: "If you miss your passport appointment, you'll need to reschedule. You can do this by logging into your account on epassport.gov.bd. There's no penalty, but appointment slots can be hard to get, so you may have to wait several weeks for a new slot.",
        answerBn: "পাসপোর্ট অ্যাপয়েন্টমেন্ট মিস করলে, আবার সময় নির্ধারণ করতে হবে। epassport.gov.bd এ আপনার অ্যাকাউন্টে লগইন করে এটা করতে পারবেন। কোনো জরিমানা নেই, তবে অ্যাপয়েন্টমেন্ট স্লট পাওয়া কঠিন হতে পারে, তাই নতুন স্লটের জন্য কয়েক সপ্তাহ অপেক্ষা করতে হতে পারে।",
        answeredBy: "Papers Please Team",
        date: "2024-01-13",
        isVerified: true,
        upvotes: 28,
      },
    ],
  },
  {
    id: "6",
    question: "Can someone else collect my passport on my behalf?",
    questionBn: "আমার পক্ষ থেকে অন্য কেউ কি আমার পাসপোর্ট সংগ্রহ করতে পারবে?",
    askedBy: "Ayesha K.",
    date: "2024-01-14",
    documentType: "passport",
    upvotes: 56,
    answers: [
      {
        id: "a7",
        answer: "Yes, someone else can collect your passport, but they need: 1) Authorization letter from you, 2) Their NID copy, 3) Your NID copy, 4) Original delivery slip. The authorization letter should be notarized for best results.",
        answerBn: "হ্যাঁ, অন্য কেউ আপনার পাসপোর্ট সংগ্রহ করতে পারবে, তবে তাদের প্রয়োজন: ১) আপনার থেকে অনুমতিপত্র, ২) তাদের NID কপি, ৩) আপনার NID কপি, ৪) মূল ডেলিভারি স্লিপ। সবচেয়ে ভালো ফলাফলের জন্য অনুমতিপত্র নোটারি করা উচিত।",
        answeredBy: "Papers Please Team",
        date: "2024-01-15",
        isVerified: true,
        upvotes: 42,
      },
    ],
  },
];

const documentTypes = [
  { id: "all", label: "All", labelBn: "সব" },
  { id: "nid", label: "NID", labelBn: "NID" },
  { id: "passport", label: "Passport", labelBn: "পাসপোর্ট" },
  { id: "birth-certificate", label: "Birth Certificate", labelBn: "জন্ম সনদ" },
  { id: "driving-license", label: "Driving License", labelBn: "ড্রাইভিং লাইসেন্স" },
];

const CommunityQAPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showAskForm, setShowAskForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const filteredQuestions = selectedType === "all"
    ? questionsData
    : questionsData.filter((q) => q.documentType === selectedType);

  const searchedQuestions = searchQuery
    ? filteredQuestions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.questionBn.includes(searchQuery)
      )
    : filteredQuestions;

  const sortedQuestions = [...searchedQuestions].sort((a, b) => b.upvotes - a.upvotes);

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const handleAskQuestion = () => {
    if (newQuestion.trim()) {
      alert(language === "bn" ? "আপনার প্রশ্ন জমা হয়েছে! আমরা শীঘ্রই উত্তর দেব।" : "Your question has been submitted! We'll answer soon.");
      setNewQuestion("");
      setShowAskForm(false);
    }
  };

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
            <div className="p-2.5 bg-purple-500/20 rounded-xl">
              <MessageCircle className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#E8EDDF]">
                {language === "bn" ? "কমিউনিটি প্রশ্নোত্তর" : "Community Q&A"}
              </h1>
              <p className="text-xs text-[#CFDBD5]/60">
                {language === "bn" ? "বাস্তব অভিজ্ঞতা থেকে শিখুন" : "Learn from real experiences"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Search */}
      <section className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#CFDBD5]/50" />
          <Input
            placeholder={language === "bn" ? "প্রশ্ন খুঁজুন..." : "Search questions..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#333533] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl h-12"
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {documentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedType === type.id
                  ? "bg-[#F5CB5C] text-[#242423]"
                  : "bg-[#333533] text-[#CFDBD5] hover:bg-[#333533]/80"
              }`}
            >
              {language === "bn" ? type.labelBn : type.label}
            </button>
          ))}
        </div>
      </section>

      {/* Ask Question Button */}
      <section className="px-4 mb-4">
        <Button
          onClick={() => setShowAskForm(!showAskForm)}
          className="w-full bg-[#333533] text-[#E8EDDF] hover:bg-[#333533]/80 rounded-xl h-12"
        >
          <Plus className="h-4 w-4 mr-2" />
          {language === "bn" ? "নতুন প্রশ্ন করুন" : "Ask a Question"}
        </Button>
      </section>

      {/* Ask Question Form */}
      {showAskForm && (
        <section className="px-4 mb-4">
          <Card className="bg-[#333533] border-0 rounded-xl">
            <CardContent className="p-4 space-y-3">
              <Textarea
                placeholder={language === "bn" ? "আপনার প্রশ্ন বিস্তারিত লিখুন..." : "Describe your question in detail..."}
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="bg-[#242423] border-0 text-[#E8EDDF] placeholder:text-[#CFDBD5]/30 rounded-xl resize-none"
                rows={4}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleAskQuestion}
                  className="flex-1 bg-[#F5CB5C] text-[#242423] hover:bg-[#F5CB5C]/90 rounded-xl"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {language === "bn" ? "প্রশ্ন জমা দিন" : "Submit Question"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowAskForm(false)}
                  className="text-[#CFDBD5] hover:bg-[#242423] rounded-xl"
                >
                  {language === "bn" ? "বাতিল" : "Cancel"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Stats */}
      <section className="px-4 mb-4">
        <div className="flex gap-2">
          <div className="flex-1 bg-[#333533] rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-[#F5CB5C]">{questionsData.length}</p>
            <p className="text-[10px] text-[#CFDBD5]/60">
              {language === "bn" ? "প্রশ্ন" : "Questions"}
            </p>
          </div>
          <div className="flex-1 bg-[#333533] rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-green-500">
              {questionsData.reduce((acc, q) => acc + q.answers.filter(a => a.isVerified).length, 0)}
            </p>
            <p className="text-[10px] text-[#CFDBD5]/60">
              {language === "bn" ? "যাচাইকৃত উত্তর" : "Verified Answers"}
            </p>
          </div>
          <div className="flex-1 bg-[#333533] rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-purple-500">
              {questionsData.reduce((acc, q) => acc + q.upvotes, 0)}
            </p>
            <p className="text-[10px] text-[#CFDBD5]/60">
              {language === "bn" ? "আপভোট" : "Upvotes"}
            </p>
          </div>
        </div>
      </section>

      {/* Questions List */}
      <section className="px-4">
        <div className="space-y-3">
          {sortedQuestions.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-[#CFDBD5]/20 mx-auto mb-3" />
              <p className="text-[#CFDBD5]/50">
                {language === "bn" ? "কোনো প্রশ্ন পাওয়া যায়নি" : "No questions found"}
              </p>
            </div>
          ) : (
            sortedQuestions.map((q) => (
              <Card key={q.id} className="bg-[#333533] border-0 rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleQuestion(q.id)}
                    className="w-full p-4 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#242423] rounded-xl flex items-center justify-center flex-shrink-0">
                        <ThumbsUp className="h-4 w-4 text-[#F5CB5C]" />
                        <span className="text-xs text-[#CFDBD5] ml-1">{q.upvotes}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#E8EDDF] font-medium text-sm mb-2">
                          {language === "bn" ? q.questionBn : q.question}
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge className="bg-purple-500/10 text-purple-400 text-[10px] border-0">
                            {documentTypes.find(d => d.id === q.documentType)?.[language === "bn" ? "labelBn" : "label"]}
                          </Badge>
                          <span className="text-[10px] text-[#CFDBD5]/50 flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {q.askedBy}
                          </span>
                          <span className="text-[10px] text-[#CFDBD5]/50 flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {q.answers.length} {language === "bn" ? "উত্তর" : "answers"}
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
                    <div className="px-4 pb-4 space-y-3 border-t border-[#242423]">
                      <p className="text-xs text-[#CFDBD5]/50 pt-3">
                        {language === "bn" ? "উত্তরসমূহ" : "Answers"}
                      </p>
                      {q.answers.map((answer) => (
                        <div
                          key={answer.id}
                          className={`p-4 rounded-xl ${
                            answer.isVerified
                              ? "bg-green-500/10 border border-green-500/20"
                              : "bg-[#242423]"
                          }`}
                        >
                          {answer.isVerified && (
                            <div className="flex items-center gap-1 mb-2">
                              <Shield className="h-4 w-4 text-green-500" />
                              <span className="text-xs text-green-500 font-medium">
                                {language === "bn" ? "যাচাইকৃত উত্তর" : "Verified Answer"}
                              </span>
                            </div>
                          )}
                          <p className="text-sm text-[#CFDBD5]/80 mb-3">
                            {language === "bn" ? answer.answerBn : answer.answer}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-[10px] text-[#CFDBD5]/50">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {answer.answeredBy}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {answer.date}
                              </span>
                            </div>
                            <button className="flex items-center gap-1 text-[10px] text-[#CFDBD5]/50 hover:text-[#F5CB5C] transition-colors">
                              <ThumbsUp className="h-3 w-3" />
                              {answer.upvotes}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default CommunityQAPage;
