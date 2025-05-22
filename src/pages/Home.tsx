import BannerImage from '../assets/images/fotoplacegholder.jpg'
import Body1Image from '../assets/images/DescriçãoProjeto.png'
import Mainheader from "../components/headers/Mainheader";
import HomeBanner1 from '../components/banners/HomeBanner1';
import HomeBody1 from '../components/bodys/HomeBody';
import HomeBody2 from '../components/bodys/HomeBody2'
import { Animator,batch,Fade,ScrollContainer,ScrollPage} from 'react-scroll-motion';


const Home = () => {
  const animation = batch(Fade());
  return (
    /*Dentro da DIV temos os componentes de Header, Banner, Body1 e Body2, eles são utilizados para facilitar
    a organização do código, seus códigos estam presentes na pasta components e separados.
    */
    <div>
      <Mainheader></Mainheader>
      <ScrollContainer>
        <ScrollPage style={{}}>
          <Animator animation={animation}>
            <HomeBanner1 image={BannerImage}></HomeBanner1>
          </Animator>
        </ScrollPage >
        <ScrollPage style={{alignContent:'center'}}>
          <Animator animation={animation}>
            <HomeBody1 image={Body1Image} />
          </Animator>
        </ScrollPage>
        <ScrollPage style={{alignContent:'center'}}>
          <Animator animation={animation}>
            <HomeBody2></HomeBody2>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </div>
  )
};

export default Home;