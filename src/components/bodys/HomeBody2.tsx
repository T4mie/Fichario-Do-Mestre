import Img from '../../assets/images/DescriçãoProjeto.png'
import Artur from '../../assets/images/Artur.jpg'
import Vezzu from '../../assets/images/Vezzu.jpg'
import Isa from '../../assets/images/ISA.jpg'
import Furlan from '../../assets/images/Furlan.jpg'
import './css/HomeBody2Css.css'
function HomeBody2(){
    return (
        <div>
            <div className='text-center '>
                <p className='titulo font-bold text-3xl mb-4'>Mestres</p>
            </div>
            <div className="flex flex-row w-full h-108 justify-center">
                <div className="card animate-slide-up flex-1/4 m-3">
                    <div className="flex  items-center pt-4 flex-col gap-5">
                        <div className='w-60 h-60'>
                            <img src={Furlan} alt="" className='w-full h-full object-fill p-1' />
                        </div>
                        <div className='flex-1/4'>
                            <h4>João Vitor Furlan Dessani</h4>
                            <p className='titulos'>Criatura de Muitas faces</p>
                            <p className="quote">"Ninguém sabe como tá a mente do front-ender"</p>
                        </div>
                        <div className='flex-1/4'>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="card animate-slide-up flex-1/4 m-3">
                    <div className="flex  items-center pt-4 flex-col gap-5">
                        <div className='w-60 h-60'>
                            <img src={Artur} alt="" className='w-full h-full object-fill p-1' />
                        </div>
                        <div className='flex-1/4'>
                            <h4>Artur Adam de Oliveira</h4>
                            <p className='titulos'>Anomalía ubíqua</p>
                            <p className="quote">"I am not a brave man. But I am, in certain circumstances, a very stubborn one."</p>
                        </div>
                        <div className='flex-1/4'>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="card animate-slide-up flex-1/4 m-3">
                    <div className="flex  items-center pt-4 flex-col gap-5">
                        <div className='w-60 h-60'>
                            <img src={Vezzu} alt="" className='w-full h-full object-fill p-1' />
                        </div>
                        <div className='flex-1/4'>
                            <h4>Isabela Moraes Vezzu</h4>
                            <p className='titulos'>Eterno servo das escrituras</p>
                            <p className="quote">"O caos é inevitável"</p>
                        </div>
                        <div className='flex-1/4'>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="card animate-slide-up flex-1/4 m-3">
                    <div className="flex  items-center pt-4 flex-col gap-5">
                        <div className='w-60 h-60'>
                            <img src={Isa} alt="" className='w-full h-full object-fill p-1' />
                        </div>
                        <div className='flex-1/4'>
                            <h4>Isabela Tamie Miyazato</h4>
                            <p className='titulos'>Titã das chamas</p>
                            <p className="quote">"The universe leads. We can only follow"</p>
                        </div>
                        <div className='flex-1/4'>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBody2