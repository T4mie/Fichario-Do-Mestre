import BannerImage from '../assets/images/fotoplacegholder.jpg'
import Mainheader from "../components/headers/Mainheader";
import HomeBanner1 from '../components/banners/HomeBanner1';
import HomeBody1 from '../components/bodys/HomeBody';

const Home = () => {
  return (
    /*Dentro da DIV temos os componentes de Header, Banner, Body1 e Body2, eles são utilizados para facilitar
    a organização do código, seus códigos estam presentes na pasta components e separados.
    */
    <div>
      <Mainheader></Mainheader>
      <HomeBanner1 image={BannerImage}></HomeBanner1>
      <HomeBody1></HomeBody1>
    </div>
  )
};

export default Home;