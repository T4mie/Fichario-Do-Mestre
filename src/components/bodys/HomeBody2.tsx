import Img from '../../assets/images/DescriçãoProjeto.png'
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
                            <img src={Img} alt="" className='w-full h-full object-fill p-1' />
                        </div>
                        <div className='flex-1/4'>
                            <p>João Vitor Furlan Dessani</p>
                        </div>
                        <div className='flex-1/4'>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="card animate-slide-up flex-1/4 m-3">
                    <div className="flex  items-center pt-4 flex-col gap-5">
                        <div className='w-60 h-60'>
                            <img src={Img} alt="" className='w-full h-full object-fill p-1' />
                        </div>
                        <div className='flex-1/4'>
                            <p>Artur Adam de Oliveira</p>
                        </div>
                        <div className='flex-1/4'>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="card animate-slide-up flex-1/4 m-3">
                    <div className="flex  items-center pt-4 flex-col gap-5">
                        <div className='w-60 h-60'>
                            <img src={Img} alt="" className='w-full h-full object-fill p-1' />
                        </div>
                        <div className='flex-1/4'>
                            <p>Isabela Moraes Vezzu</p>
                        </div>
                        <div className='flex-1/4'>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="card animate-slide-up flex-1/4 m-3">
                    <div className="flex  items-center pt-4 flex-col gap-5">
                        <div className='w-60 h-60'>
                            <img src={Img} alt="" className='w-full h-full object-fill p-1' />
                        </div>
                        <div className='flex-1/4'>
                            <p>Isabela Tamie Miyazato</p>
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