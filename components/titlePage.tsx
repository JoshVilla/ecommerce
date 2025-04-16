import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface TitlePageProps {
  title: string;
  hasBack?: boolean;
  className?: string;
}
function TitlePage({ title, hasBack, className }: TitlePageProps) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className={`${className} flex items-center gap-2`}>
      {hasBack && (
        <ArrowLeft
          className="h-6 w-6 cursor-pointer hover:underline"
          onClick={handleBack}
        />
      )}
      <div className="text-2xl font-bold">{title}</div>
    </div>
  );
}

export default TitlePage;
