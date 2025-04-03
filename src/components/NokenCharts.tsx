import { TrendingDown, TrendingUp } from "lucide-react"
import { PieChart, Pie, Label } from "recharts"
import useVocabularyStatus from "../hooks/useVocabularyStatus"
import useFetchData from "../hooks/useFetchData"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

// Mapeo de niveles JLPT a nombres amigables
const levelNames: Record<string, string> = {
  jlpt_n1: "JLPT N1",
  jlpt_n2: "JLPT N2",
  jlpt_n3: "JLPT N3",
  jlpt_n4: "JLPT N4",
  jlpt_n5: "JLPT N5",
}

// Definir los niveles deseados (ordenados de menor a mayor dificultad)
const levels = ["jlpt_n5", "jlpt_n4", "jlpt_n3", "jlpt_n2", "jlpt_n1"]

// Configuración del gráfico
const chartConfig = {
  value: {
    label: "Palabras",
  },
  known: {
    label: "Aprendidas",
    color: "hsl(var(--chart-1))",
  },
  notKnown: {
    label: "No Aprendidas",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Sin Estado",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function NokenCharts() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {levels.map((level) => (
        <NokenLevelChart key={level} level={level} />
      ))}
    </div>
  )
}

interface NokenLevelChartProps {
  level: string
}

function NokenLevelChart({ level }: NokenLevelChartProps) {
  // Usar useFetchData para obtener todas las tarjetas de vocabulario de este nivel
  const { vocabularyCards } = useFetchData(level)
  const totalWords = vocabularyCards.length
  
  // Calcular el estado del usuario (solo de las palabras ya respondidas)
  const { wordsStatusMap } = useVocabularyStatus({ level, currentCard: undefined })
  const knownCount = Object.values(wordsStatusMap).filter((status) => status === true).length
  const notKnownCount = Object.values(wordsStatusMap).filter((status) => status === false).length

  // Calcular las palabras pendientes (total dinámico)
  const pendingCount = totalWords - (knownCount + notKnownCount)

  // Datos para el gráfico, usando el total conocido, no conocido y pendientes
  const chartData = [
    { category: "known", value: knownCount, fill: "var(--color-chart-1)" },
    { category: "notKnown", value: notKnownCount, fill: "var(--color-chart-2)" },
    { category: "pending", value: pendingCount, fill: "var(--color-chart-3)" },
  ]



  // Simulación de tendencia real: en una aplicación real se compararían datos históricos del mes anterior.
  // Aquí se asume que el mes anterior se tuvo un 90% del progreso actual (valor dummy).
  const previousMonthKnown = knownCount * 0.9
  const trendingPercentage = previousMonthKnown > 0
    ? (((knownCount - previousMonthKnown) / previousMonthKnown) * 100).toFixed(1)
    : "0"
  const isTrendingUp = Number.parseFloat(trendingPercentage) >= 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{levelNames[level] || level.toUpperCase()}</CardTitle>
        <CardDescription>Estadísticas de vocabulario</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]" config={chartConfig}>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="category" innerRadius={60} outerRadius={80} strokeWidth={5}>
              <Label
                position="center"
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalWords.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
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
        <div className="flex items-center gap-2 font-medium leading-none">
          {isTrendingUp ? (
            <>
              Progreso subiendo {trendingPercentage}% este mes <TrendingUp className="h-4 w-4 text-success" />
            </>
          ) : (
            <>
              Progreso bajando {trendingPercentage.substring(1)}% este mes <TrendingDown className="h-4 w-4 text-error" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          {Math.round((knownCount / totalWords) * 100)}% de palabras aprendidas ({knownCount} de {totalWords})
        </div>
      </CardFooter>
    </Card>
  )
}

