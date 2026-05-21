import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface ReturnButtonProps {
  href: string;
  label: string;
}

export const ReturnButton = ({ href, label }: ReturnButtonProps) => {
  return (
    <Button size="lg" className="h-10 px-4" asChild>
      <Link href={href}>
        <ArrowLeftIcon /> <span>{label}</span>
      </Link>
    </Button>
  );
};
