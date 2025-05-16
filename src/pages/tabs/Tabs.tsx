import { useState } from "react";
import "./Tabs.css";

function Tabs() {
  const [toggle, setToggle] = useState(1);

  function updateToggle(id: number) {
    setToggle(id);
  }

  return (
    <div className="d-flex justify-center ">
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

        {/* Conteúdos */}
        <div className={toggle === 1 ? "show-content " : "content"}>
          <h2>Seus Personagens</h2>
          <p>AQUI Ó</p>
        </div>
        <div className={toggle === 2 ? "show-content" : "content"}>
          <h2>Seus Modelos</h2>
          <p>Modelos UAU</p>
        </div>
        <div className={toggle === 3 ? "show-content" : "content"}>
          <h2>Seus Sistemas</h2>
          <p>ENIGMA DO MEDO</p>
        </div>
        <div className={toggle === 4 ? "show-content" : "content"}>
          <h2>Suas campanhas</h2>
          <p>Camapanhas mágicas LEGAL</p>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
