// src/pages/tabs/Tabs.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../backend/auth";
import { getCharacters, getAllSheetModels } from "../../backend/firestore";
import "./Tabs.css";

import AddButton from "../../components/buttons/AddButton";
import CharacterButton from "../../components/buttons/CharacterButton";
import ModelButton from "../../components/buttons/ModeloButton";

function Tabs() {
  const [toggle, setToggle] = useState(1);
  const [personagens, setPersonagens] = useState<any[]>([]);
  const [modelList, setModelList] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    buscarPersonagens();
    buscarModelos();
  }, []);

  const buscarPersonagens = async () => {
    try {
      const user = getCurrentUser();
      const characters = await getCharacters(user.uid);
      setPersonagens(characters);
    } catch (error) {
      alert("Erro ao buscar personagens: " + (error as Error).message);
    }
  };

  const buscarModelos = async () => {
    try {
      const user = getCurrentUser();
      const models = await getAllSheetModels(user.uid);
      setModelList(models);
    } catch (error) {
      alert("Erro ao buscar modelos: " + (error as Error).message);
    }
  }

  function updateToggle(id: number) {
    setToggle(id);
  }

  return (
    <div className="flex justify-center">
      <div className="col-6 tab p-5">
        {/* Títulos das tabs */}
        <ul className="tab-list">
          <li className={toggle === 1 ? "selected" : "not-selected"} onClick={() => updateToggle(1)}>
            Personagens
          </li>
          <li className={toggle === 2 ? "selected" : "not-selected"} onClick={() => updateToggle(2)}>
            Modelos
          </li>
          <li className={toggle === 3 ? "selected" : "not-selected"} onClick={() => updateToggle(3)}>
            Sistemas
          </li>
          <li className={toggle === 4 ? "selected" : "not-selected"} onClick={() => updateToggle(4)}>
            Campanhas
          </li>
        </ul>

        {/* Conteúdo da tab Personagens */}
        <div className={toggle === 1 ? "show-content " : "content"}>
          <AddButton onClick={() => navigate("/personagem")} />
          {personagens.map((personagem) => (
          <CharacterButton
            key={personagem.id}
            characterId={personagem.id}
            nome={personagem.nome || "Sem Nome"}
            onEdit={() => navigate(`/personagem/${personagem.id}`)}
            onDelete={() => alert(`Deletar personagem "${personagem.nome}"`)}
          />
          ))}
        </div>

        {/* Conteúdo da tab Modelos*/}
        <div className={toggle === 2 ? "show-content" : "content"}>
          <AddButton onClick={() => navigate("/criar-modelo")} />
            {modelList.map(model => (
            <ModelButton
              key={model.id}
              modelId={model.id}
              onEdit={() => navigate(`/criar-modelo/${model.id}`)}
              onDelete={() => alert(`Deletar modelo "${model.data.nome}"`)}
            />
          ))}
        </div>

        {/* Outras Tabs*/}
        <div className={toggle === 3 ? "show-content" : "content"}>
          <h2>Seus Sistemas</h2>
          <p>ENIGMA DO MEDO</p>
        </div>
        <div className={toggle === 4 ? "show-content" : "content"}>
          <h2>Suas campanhas</h2>
          <p>Campanhas mágicas LEGAL</p>
        </div>
      </div>
    </div>
  );
}

export default Tabs;