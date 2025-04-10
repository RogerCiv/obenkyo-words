import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

interface StudyCalendarProps {
  dates: string[];
}

export function StudyCalendar({ dates }: StudyCalendarProps) {
  // Convertir las fechas a objetos Date
  const highlightedDates = React.useMemo(
    () => dates.map(dateStr => new Date(dateStr)),
    [dates]
  )

  // En este caso, queremos que los días recibidos aparezcan seleccionados, por lo que usamos "multiple"
  return (
    <div className="">
        <p>Dias en los que has aprendido</p>
      <Calendar
        mode="multiple"
        selected={highlightedDates}
        onSelect={() => { }}
        modifiers={{ highlighted: highlightedDates }}
        className="rounded-md border shadow max-w-max"
      />

    </div>
  )
}
