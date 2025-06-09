import {NavLink, useNavigate } from "react-router-dom";    
import { UserRound } from 'lucide-react';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../backend/firebase";

function Mainheader(){

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    //verifica persistência
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleUserClick = () => {
    if(isAuthenticated){
      navigate("/user"); // já logado
    } else {
      navigate("/login");
    }
  }
return(
    <div>
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
            <NavLink to={"/"}>Fichário do Mestre</NavLink> 
        </div>
      <button onClick={handleUserClick}>
        <UserRound size={30}/>
      </button>
      </nav>
    </div>
)   
}
export default Mainheader