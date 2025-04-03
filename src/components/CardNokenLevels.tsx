import { useNavigate } from "react-router-dom";

interface CardNokenLevelsProps {
  levelCard: {
    level: string;
    title: string;
    image: string;
    description: string;
  }
}

export default function CardNokenLevels({ levelCard }: CardNokenLevelsProps) {
  const navigate = useNavigate();
  
  const handleEntrar = () => {
    navigate(`/nokens/${levelCard.level}`);
  };

  return (
    <div className="card bg-base-100 max-w-xl shadow-sm">
      <figure>
        <img src={`/${levelCard.image}`} alt="Imagen de Noken" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-accent font-bold">{levelCard.title}</h2>
        <p className="text-pretty font-medium">{levelCard.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary hover:opacity-90" onClick={handleEntrar}>Entrar</button>
        </div>
      </div>
    </div>
  )
}
