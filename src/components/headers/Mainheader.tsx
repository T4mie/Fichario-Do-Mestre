import { NavLink, useNavigate } from "react-router-dom";    
import { BookOpen, UserRound, UserRoundX } from 'lucide-react';
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../backend/firebase";

function Mainheader() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut(auth).then(() => {
        navigate("/"); // ou "/login", conforme preferir
      });
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
