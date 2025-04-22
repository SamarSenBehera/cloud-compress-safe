
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
