// src/pages/tabs/Tabs.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../backend/auth";
import { getCharacters, getAllSheetModels, deleteSheetModel, deleteCharacter } from "../../backend/firestore";
import "./Tabs.css";
import Construcao from '../../assets/images/Construção.png';
import BannerConstrucao from "../../components/banners/BannerConstrucao";

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

  const handleDeleteModel = async (modelId: string) => {
  if (window.confirm("Tem certeza que deseja deletar este modelo?")) {
    try {
      const user = getCurrentUser();
      await deleteSheetModel(user.uid, modelId);
      buscarModelos();
    } catch (error) {
      alert("Erro ao deletar modelo: " + (error as Error).message);
    }
  }
};

const handleDeleteCharacter = async (charId: string) => {
  if (window.confirm("Tem certeza que deseja deletar este personagem?")) {
    try {
      const user = getCurrentUser();
      await deleteCharacter(user.uid, charId);
      buscarPersonagens();
    } catch (error) {
      alert("Erro ao deletar personagem: " + (error as Error).message);
    }
  }
};

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
          <div className="flex flex-row flex-wrap">
            <AddButton onClick={() => navigate("/personagem")} />
            {personagens.map((personagem) => (
            <CharacterButton
              key={personagem.id}
              characterId={personagem.id}
              nome={personagem.nome || "Sem Nome"}
              onEdit={() => navigate(`/personagem/${personagem.id}`)}
              onDelete={() => handleDeleteCharacter(personagem.id)}
            />
            ))}
          </div>
        </div>

        {/* Conteúdo da tab Modelos*/}
        <div className={toggle === 2 ? "show-content" : "content"}>
          <div className="flex flex-row flex-wrap">
            <AddButton onClick={() => navigate("/criar-modelo")} />
              {modelList.map(model => (
              <ModelButton
                key={model.id}
                modelId={model.id}
                onEdit={() => navigate(`/criar-modelo/${model.id}`)}
                onDelete={() => handleDeleteModel(model.id)}
              />
            ))}
          </div>
        </div>

        {/* Outras Tabs*/}
        <div className={toggle === 3 ? "show-content" : "content"}>
          <BannerConstrucao image={Construcao}></BannerConstrucao>
          <h2>Sob Construção, agradecemos a compreensão.</h2>
        </div>
        <div className={toggle === 4 ? "show-content" : "content"}>
          <BannerConstrucao image={Construcao}></BannerConstrucao>
          <h2>Sob Construção, agradecemos a compreensão.</h2>
        </div>
      </div>
    </div>
  );
}

export default Tabs;