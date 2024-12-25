import { Card } from "@/components/ui/card";

interface SupporterCardProps {
  title: string;
  description: string;
}

export function SupporterCard({ title, description }: SupporterCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-[#1e2749] mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
}
