import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  CreditCard,
  Users,
  GraduationCap,
  Building,
  Car,
  Heart,
  Briefcase,
  Home,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DocumentCategory {
  id: string;
  title: string;
  titleBengali: string;
  description: string;
  icon: string;
  estimatedTime: string;
  officialFee: string;
  popularity: "high" | "medium" | "low";
  documents: string[];
  steps: number;
  color: string;
}

const iconOptions = [
  { value: "FileText", label: "File Text", icon: <FileText className="h-4 w-4" /> },
  { value: "CreditCard", label: "Credit Card", icon: <CreditCard className="h-4 w-4" /> },
  { value: "Users", label: "Users", icon: <Users className="h-4 w-4" /> },
  { value: "GraduationCap", label: "Graduation Cap", icon: <GraduationCap className="h-4 w-4" /> },
  { value: "Building", label: "Building", icon: <Building className="h-4 w-4" /> },
  { value: "Car", label: "Car", icon: <Car className="h-4 w-4" /> },
  { value: "Heart", label: "Heart", icon: <Heart className="h-4 w-4" /> },
  { value: "Briefcase", label: "Briefcase", icon: <Briefcase className="h-4 w-4" /> },
  { value: "Home", label: "Home", icon: <Home className="h-4 w-4" /> },
  { value: "Shield", label: "Shield", icon: <Shield className="h-4 w-4" /> },
];

const colorOptions = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-pink-500", label: "Pink" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-indigo-500", label: "Indigo" },
  { value: "bg-teal-500", label: "Teal" },
  { value: "bg-yellow-500", label: "Yellow" },
  { value: "bg-red-500", label: "Red" },
];

const DocumentCategoryAdmin: React.FC = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [editingCategory, setEditingCategory] = useState<DocumentCategory | null>(null);
  const [formData, setFormData] = useState<Partial<DocumentCategory>>({
    id: "",
    title: "",
    titleBengali: "",
    description: "",
    icon: "FileText",
    estimatedTime: "",
    officialFee: "",
    popularity: "medium",
    documents: [],
    steps: 1,
    color: "bg-blue-500",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...formData as DocumentCategory } : cat
      ));
    } else {
      // Add new category
      setCategories([...categories, formData as DocumentCategory]);
    }
    resetForm();
  };

  const handleEdit = (category: DocumentCategory) => {
    setEditingCategory(category);
    setFormData(category);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const resetForm = () => {
    setEditingCategory(null);
    setFormData({
      id: "",
      title: "",
      titleBengali: "",
      description: "",
      icon: "FileText",
      estimatedTime: "",
      officialFee: "",
      popularity: "medium",
      documents: [],
      steps: 1,
      color: "bg-blue-500",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Document Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="id">ID</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="e.g., nid"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title (English)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., National ID Card"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="titleBengali">Title (Bengali)</Label>
                <Input
                  id="titleBengali"
                  value={formData.titleBengali}
                  onChange={(e) => setFormData({ ...formData, titleBengali: e.target.value })}
                  placeholder="e.g., জাতীয় পরিচয়পত্র"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Apply for new NID or update existing information"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => setFormData({ ...formData, icon: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          {option.icon}
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) => setFormData({ ...formData, color: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded-full ${option.value}`} />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedTime">Estimated Time</Label>
                <Input
                  id="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                  placeholder="e.g., 7-15 days"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="officialFee">Official Fee</Label>
                <Input
                  id="officialFee"
                  value={formData.officialFee}
                  onChange={(e) => setFormData({ ...formData, officialFee: e.target.value })}
                  placeholder="e.g., ৳50-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="popularity">Popularity</Label>
                <Select
                  value={formData.popularity}
                  onValueChange={(value: "high" | "medium" | "low") =>
                    setFormData({ ...formData, popularity: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select popularity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="steps">Number of Steps</Label>
                <Input
                  id="steps"
                  type="number"
                  min="1"
                  value={formData.steps}
                  onChange={(e) => setFormData({ ...formData, steps: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              {editingCategory && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
              <Button type="submit">
                {editingCategory ? "Update Category" : "Add Category"}
              </Button>
            </div>
          </form>

          {/* Categories List */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Existing Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${category.color} text-white`}>
                        {iconOptions.find(opt => opt.value === category.icon)?.icon}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">
                      {category.title}
                      <div className="text-sm font-normal text-muted-foreground">
                        {category.titleBengali}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Processing Time:</span>
                      <span>{category.estimatedTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Official Fee:</span>
                      <span>{category.officialFee}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentCategoryAdmin; 