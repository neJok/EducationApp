'use client';
import { useEffect, useState } from "react";
import useSubjects from "@/hooks/useSubjects";
import Subject from "@/lib/Models/subject";
import BackButton from "@/components/BackButton";
import {notFound} from "next/navigation";
import {LoadingState} from "@/components/TmaSDKLoader";

export default function Page({ params }: { params: { name: string } }) {
  const { subjects, loading } = useSubjects();
  const [currentSubject, setCurrentSubject] = useState<Subject | undefined>(
    undefined
  );

  useEffect(() => {
    if (subjects.length !== 0) {
      const subject = subjects.find((subject: Subject) => subject.key === params.name);
      if (!subject) {
        notFound()
      }
      setCurrentSubject(subject);
    }
  }, [params.name, subjects]);

  return (
    <>
      <BackButton />
      {loading ? <LoadingState /> : (
        <div>{currentSubject?.label}</div>
      )}
    </>
  );
}