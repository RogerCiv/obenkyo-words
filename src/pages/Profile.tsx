"use client"

import { NokenCharts } from "@/components/NokenCharts";
import { StudyCalendar } from "@/components/StudyCalendar";
import { useAuth } from "@/hooks/useAuth";
import useVocabularyStatus from "@/hooks/useVocabularyStatus";

export default function Profile() {
  const { user } = useAuth();
  const { studyDays } = useVocabularyStatus();

  console.log("studyDays", studyDays)
  return (
    <section className="container mx-auto py-10 px-4 md:px-0">
      <h1>PROFILE de {user?.email}</h1>
      <div className=""></div>
      <StudyCalendar dates={studyDays} />
      <NokenCharts />
    </section>
  )
}
