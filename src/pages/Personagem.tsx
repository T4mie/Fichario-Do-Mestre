import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../backend/auth";
import { getCharacters } from "../backend/firestore";

export default function MostrarPersonagem() {
  const { nome } = useParams();
  const [dados, setDados] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const user = getCurrentUser();
        const personagens = await getCharacters(user.uid);
      const personagem = personagens.find(p => p.id === nome);

        if (personagem) {
          setDados(personagem);
        } else {
          alert("Personagem não encontrado.");
        }
      } catch (error) {
        alert("Erro ao buscar personagem: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    buscarDados();
  }, [nome]);

  if (loading) {
    return <p className="text-center mt-10">Carregando personagem...</p>;
  }

  if (!dados) {
    return <p className="text-center mt-10">Personagem não encontrado.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-fundo text-fundo">
      <div className="bg-caixa p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">{nome}</h2>
        <img
          src={dados.imageUrl}
          alt={nome}
          className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
        />
        <div className="text-left">
          <p><strong>Força:</strong> {dados.forca}</p>
          <p><strong>Inteligência:</strong> {dados.inteligencia}</p>
          <p><strong>Destreza:</strong> {dados.destreza}</p>
          <p><strong>Carisma:</strong> {dados.carisma}</p>
          <p><strong>Sabedoria:</strong> {dados.sabedoria}</p>
          <p><strong>Constituição:</strong> {dados.constituicao}</p>
        </div>
         <button
          className="btn btn-secondary mb-4"
          onClick={() => navigate("/user")}
        >
          Voltar
        </button>
      </div>
     
    </div>
  );
}
