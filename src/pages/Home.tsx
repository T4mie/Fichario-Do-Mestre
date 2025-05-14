import {NavLink } from "react-router-dom";    
import { User, UserRound } from 'lucide-react';

const Home = () => {
  return (
    <div>
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
            <NavLink to={"/cadastro"}>Fichário do Mestre</NavLink> 
        </div>
      <NavLink to={'/login'}><UserRound size={30}/></NavLink>
      </nav>
      
    </div>
  )
};
  
  export default Home;