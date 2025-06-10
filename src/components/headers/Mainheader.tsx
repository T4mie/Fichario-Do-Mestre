import { NavLink, useNavigate } from "react-router-dom";    
import { BookOpen, UserRound, UserRoundX } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import { onAuthChange, logout } from "../../backend/auth"; // <-- use só suas funções

function Mainheader() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleAuthClick = async () => {
    if (isAuthenticated) {
      await logout(); // <-- chama sua função
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const goToUserPage = () => {
    navigate("/user");
  };

  return (
    <div>
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <NavLink to={"/"}>Fichário do Mestre</NavLink> 
        </div>

        <div className="flex items-center gap-4">
          {/* Botão "Seus Personagens" visível só se autenticado */}
          {isAuthenticated && (
            <button onClick={goToUserPage} className="flex gap-2 items-center">
              <BookOpen size={20}></BookOpen>
              <span>Seu Fichário</span>
            </button>
          )}

          {/* Botão Login/Logout com ícone */}
          <button onClick={handleAuthClick} className="flex items-center gap-2">
            {isAuthenticated ? <UserRoundX size={20} /> : <UserRound size={20} />}
            <span>{isAuthenticated ? "Logout" : "Login"}</span>
          </button>

        </div>
      </nav>
    </div>
  );
}

export default Mainheader;