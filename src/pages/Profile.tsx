
import { NokenCharts } from "@/components/NokenCharts";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  return (
    <section className="container mx-auto py-10 px-4 md:px-0">
      <h1>PROFILE de {user?.email}</h1>
      <NokenCharts />
    </section>
  )
}
