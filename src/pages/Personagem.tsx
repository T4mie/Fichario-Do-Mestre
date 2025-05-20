// src/pages/Personagem.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../backend/auth";
import {
  getCharacterById,
  saveCharacterData,
  updateCharacterImage,
} from "../backend/firestore";
import { uploadImage } from "../backend/storage";

export default function EditarPersonagem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemUrl, setImagemUrl] = useState<string | null>(null);

  // Personalidade
  const [nome, setNome] = useState("");
  const [classe, setClasse] = useState("");
  const [nivel, setNivel] = useState(1);
  const [raca, setRaca] = useState("");
  const [antecedente, setAntecedente] = useState("");
  const [nomeJogador, setNomeJogador] = useState("");

  // Atributos
  const [atributos, setAtributos] = useState({
    forca: 10,
    inteligencia: 10,
    destreza: 10,
    carisma: 10,
    sabedoria: 10,
    constituicao: 10,
  });

  // Perícias
  const [pericias, setPericias] = useState<{ [key: string]: boolean }>({});

  type AtributoChave = 'forca' | 'inteligencia' | 'destreza' | 'carisma' | 'sabedoria' | 'constituicao';


  const handleAtributoChange = (atributo: string, valor: number) => {
    setAtributos((prev) => ({ ...prev, [atributo]: valor }));
  };

  const handlePericiaChange = (pericia: string) => {
    setPericias((prev) => ({
      ...prev,
      [pericia]: !prev[pericia],
    }));
  };

  useEffect(() => {
    async function carregar() {
      try {
        const user = getCurrentUser();
        const personagem = await getCharacterById(user.uid, id!);
        if (!personagem) return;

        setNome(personagem.personalidade?.nome || "");
        setClasse(personagem.personalidade?.classe || "");
        setNivel(personagem.personalidade?.nivel || 1);
        setRaca(personagem.personalidade?.raca || "");
        setAntecedente(personagem.personalidade?.antecedente || "");
        setNomeJogador(personagem.personalidade?.nomeJogador || "");
        setImagemUrl(personagem.imageUrl || null);

        const atributosPadrao = {
          forca: 10,
          inteligencia: 10,
          destreza: 10,
          carisma: 10,
          sabedoria: 10,
          constituicao: 10,
        };

        setAtributos({ ...atributosPadrao, ...(personagem.atributos || {}) });

        // Lista completa de perícias que você quiser
        const todasPericias = [
        "Acrobacia",
        "Arcanismo",
        "Atletismo",
        "Atuacao",
        "Enganacao",
        "Furtividade",
        "Historia",
        "Intimidacao",
        "Intuicao",
        "Investigacao",
        "AdestrarAnimais",
        "Medicina",
        "Natureza",
        "Percepcao",
        "Persuasao",
        "Prestidigitacao",
        "Religiao",
        "Sobrevivencia",
      ];

        const periciasCompletas: { [key: string]: boolean } = {};
        todasPericias.forEach((nome) => {
          periciasCompletas[nome] = personagem.pericias?.[nome] || false;
        });

        setPericias(periciasCompletas);
      } catch (err) {
        alert("Erro ao carregar personagem: " + (err as Error).message);
      }
    }

    carregar();
  }, [id]);


  const handleSalvar = async () => {
    setLoading(true);
    try {
      const user = getCurrentUser();

      await saveCharacterData(user.uid, id!, atributos, "atributos");
      await saveCharacterData(user.uid, id!, pericias, "pericias");
      await saveCharacterData(user.uid, id!, {
        nome: nome.trim() || "Sem Nome",
        classe,
        nivel,
        raca,
        antecedente,
        nomeJogador,
      }, "personalidade");



      if (imagem) {
        const path = `users/${user.uid}/characters/${id}/imagem.png`;
        const url = await uploadImage(imagem, path);
        await updateCharacterImage(user.uid, id!, url);
      }

      alert("Personagem atualizado!");
      navigate(`/personagens/${id}`);
    } catch (error) {
      alert("Erro ao salvar: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fundo text-fundo">
      <div className="bg-caixa p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Editar Personagem</h2>

        {/* Personalidade */}
        <div className="mb-4">
          <h3 className="font-bold mb-2">Personalidade</h3>
          <input type="text" placeholder="Nome do personagem" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full mb-2 p-2 rounded" />
          <input type="text" placeholder="Raça" value={raca} onChange={(e) => setRaca(e.target.value)} className="w-full mb-2 p-2 rounded" />
          <input type="text" placeholder="Classe" value={classe} onChange={(e) => setClasse(e.target.value)} className="w-full mb-2 p-2 rounded" />
          <input type="number" placeholder="Nível" value={nivel} onChange={(e) => setNivel(Number(e.target.value))} className="w-full mb-2 p-2 rounded" min="1" />
          <input type="text" placeholder="Antecedente" value={antecedente} onChange={(e) => setAntecedente(e.target.value)} className="w-full mb-2 p-2 rounded" />
          <input type="text" placeholder="Nome do Jogador" value={nomeJogador} onChange={(e) => setNomeJogador(e.target.value)} className="w-full mb-2 p-2 rounded" />
        </div>

        {/* Atributos */}
        
        <div className="mb-4">
          <h3 className="font-bold mb-2">Atributos</h3>
          {(Object.keys(atributos) as AtributoChave[]).map((atributo) => (
          <div key={atributo} className="mb-2">
            <label className="capitalize">{atributo}</label>
            <input
              type="number"
              value={atributos[atributo]}
              onChange={(e) => handleAtributoChange(atributo, Number(e.target.value))}
              className="w-full p-2 rounded"
              min="1"
              max="20"
            />
          </div>
        ))}
        </div>

        {/* Perícias */}
        <div className="mb-4">
          <h3 className="font-bold mb-2">Perícias</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(pericias).map((pericia) => (
              <div key={pericia} className="flex items-center">
                <input
                  type="checkbox"
                  id={pericia}
                  checked={pericias[pericia]}
                  onChange={() => handlePericiaChange(pericia)}
                  className="mr-2"
                />
                <label htmlFor={pericia}>{pericia}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Imagem */}
        <div className="mb-4">
          <label className="block font-bold mb-1">Imagem</label>
          {imagemUrl ? ( <img src={imagemUrl} alt="Imagem atual" className="w-32 h-32 object-cover mb-2 rounded" /> ) : null}
          <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files?.[0] || null)} />
        </div>

        <button
          onClick={handleSalvar}
          className="w-full bg-fundo text-caixa p-2 rounded hover:opacity-90"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
        <button
          onClick={() => navigate('/user')}
          className="w-full bg-gray-500 text-white p-2 rounded hover:opacity-90 mb-4"
        >
          Voltar para Usuário
        </button>
      </div>
    </div>
  );
}
