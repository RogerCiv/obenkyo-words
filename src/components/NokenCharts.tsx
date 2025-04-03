"use client"

import { PieChart, Pie, Label, Tooltip } from "recharts"
import useVocabularyStatus from "../hooks/useVocabularyStatus"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import useFetchData from "@/hooks/useFetchData"

// Definir los niveles deseados (se pueden ajustar los identificadores)
const levels = ["jlpt_n1", "jlpt_n2", "jlpt_n3", "jlpt_n4", "jlpt_n5"]

const chartConfig = {
  visitors: {
    label: "Palabras",
  },
  chrome: {
    label: "Aprendidas",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "No Aprendidas",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Totales",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function NokenCharts() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {levels.map(level => (
        <NokenLevelChart key={level} level={level} />
      ))}
    </div>
  )
}

interface NokenLevelChartProps {
  level: string;
}

function NokenLevelChart({ level }: NokenLevelChartProps) {

  const { wordsStatusMap } = useVocabularyStatus({ level, currentCard: undefined })


  const totalCount = Object.keys(wordsStatusMap).length;
  const knownCount = Object.values(wordsStatusMap).filter(status => status === true).length;
  const notKnownCount = Object.values(wordsStatusMap).filter(status => status === false).length;
  const withoutStatus = totalCount - (knownCount + notKnownCount);

  const chartData = [
    { category: "Aprendidas", value: knownCount, fill: "var(--color-chart-1)" },
    { category: "No Aprendidas", value: notKnownCount, fill: "var(--color-chart-2)" },
    { category: "Sin Estado", value: withoutStatus, fill: "var(--color-chart-3)" }
  ];

  const total = chartData.reduce((acc, d) => acc + d.value, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{level.toUpperCase()}</CardTitle>
        <CardDescription>Estadísticas de vocabulario</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]" config={chartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={50}
              outerRadius={80}
              label
            >
              <Label
                position="center"
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Palabras
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total data for {level.toUpperCase()}
        </div>
      </CardFooter>
    </Card>
  )
}
