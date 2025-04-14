import { Outlet, Link } from "react-router-dom";    

const Home = () => {
  return (
    <>
      <nav>
        <h1>Teste</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/User">User</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};
  
  export default Home;