import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../backend/auth";
import { uploadImage } from "../backend/storage";
import { createCharacter, saveCharacterData, updateCharacterImage } from "../backend/firestore";

export default function CriarPersonagem() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Personalidade
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [classe, setClasse] = useState("");
  const [nivel, setNivel] = useState(1);
  const [antecedente, setAntecedente] = useState("");
  const [nomeJogador, setNomeJogador] = useState("");

  // Atributos
  const [forca, setForca] = useState(10);
  const [inteligencia, setInteligencia] = useState(10);
  const [destreza, setDestreza] = useState(10);
  const [carisma, setCarisma] = useState(10);
  const [sabedoria, setSabedoria] = useState(10);
  const [constituicao, setConstituicao] = useState(10);

  // Perícias (todas inicialmente false)
  const [pericias, setPericias] = useState({
    Atletismo: false,
    Acrobacia: false,
    Furtividade: false,
    Prestidigitacao: false,
    Arcanismo: false,
    Historia: false,
    Investigacao: false,
    Natureza: false,
    Religiao: false,
    AdestrarAnimais: false,
    Intuicao: false,
    Medicina: false,
    Percepcao: false,
    Sobrevivencia: false,
    Atuacao: false,
    Enganacao: false,
    Intimidacao: false,
    Persuasao: false
  });

  const handlePericiaChange = (pericia: string) => {
    setPericias(prev => ({
      ...prev,
      [pericia]: !prev[pericia as keyof typeof pericias]
    }));
  };

  const handleCreateCharacter = async () => {
    setLoading(true);

    try {
      const user = getCurrentUser();
      const uid = user.uid;

      // 1. Cria personagem vazio para obter o ID
      const characterId = await createCharacter(uid);

      // 2. Prepara caminho da imagem e faz upload
      const placeholder = "https://firebasestorage.googleapis.com/v0/b/fichario-do-mestre.firebasestorage.app/o/app%2Fplaceholder.png?alt=media&token=6c4819be-3da7-4781-9396-519e67ae782b";
      const imagePath = `users/${uid}/characters/${characterId}/imagem.png`;
      const imageUrl = image ? await uploadImage(image, imagePath) : placeholder;

      // 3. Salva os dados do personagem nos campos certos
      await saveCharacterData(uid, characterId, {
        forca,
        inteligencia,
        destreza,
        carisma,
        sabedoria,
        constituicao
      }, "atributos");

      await saveCharacterData(uid, characterId, pericias, "pericias");

      await saveCharacterData(uid, characterId, {
        nome: nome.trim() || "Sem Nome",
        raca,
        classe,
        nivel,
        antecedente,
        nomeJogador
      }, "personalidade");

      // 4. Atualiza o personagem com a URL da imagem
      await updateCharacterImage(uid, characterId, imageUrl);

      console.log("Personagem criado com sucesso!" );

      // 5. Navega para a página do personagem criado
      navigate(`/user`);
    } catch (error) {
      alert("Erro ao criar personagem: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fundo text-fundo">
      <div className="bg-caixa p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Personagem</h2>

        {/* Personalidade */}
        <div className="mb-4">
          <h3 className="font-bold mb-2">Personalidade</h3>
          <input
            type="text"
            placeholder="Nome do personagem"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full mb-2 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Raça"
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
            className="w-full mb-2 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Classe"
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            className="w-full mb-2 p-2 rounded"
          />
          <input
            type="number"
            placeholder="Nível"
            value={nivel}
            onChange={(e) => setNivel(Number(e.target.value))}
            className="w-full mb-2 p-2 rounded"
            min={1}
          />
          <input
            type="text"
            placeholder="Antecedente"
            value={antecedente}
            onChange={(e) => setAntecedente(e.target.value)}
            className="w-full mb-2 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Nome do Jogador"
            value={nomeJogador}
            onChange={(e) => setNomeJogador(e.target.value)}
            className="w-full mb-2 p-2 rounded"
          />
        </div>

        {/* Atributos */}
        <div className="mb-4">
          <h3 className="font-bold mb-2">Atributos</h3>
          {[
            { label: "forca", value: forca, setter: setForca },
            { label: "inteligencia", value: inteligencia, setter: setInteligencia },
            { label: "destreza", value: destreza, setter: setDestreza },
            { label: "carisma", value: carisma, setter: setCarisma },
            { label: "sabedoria", value: sabedoria, setter: setSabedoria },
            { label: "constituicao", value: constituicao, setter: setConstituicao },
          ].map(({ label, value, setter }) => (
            <div key={label} className="mb-2">
              <label className="capitalize">{label}</label>
              <input
                type="number"
                value={value}
                onChange={e => setter(Number(e.target.value))}
                className="w-full p-2 rounded"
                min={1}
                max={20}
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
                  checked={pericias[pericia as keyof typeof pericias]}
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
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-caixa text-fundo px-4 py-2 rounded shadow hover:opacity-90 inline-block"
          >
            Selecionar imagem (opcional)
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          <p className="mt-2 text-sm">
            {image ? image.name : "Imagem padrão será usada"}
          </p>
        </div>

        <button
          onClick={handleCreateCharacter}
          className="w-full bg-fundo text-caixa p-2 rounded hover:opacity-90"
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Personagem"}
        </button>
      </div>
    </div>
  );
}
