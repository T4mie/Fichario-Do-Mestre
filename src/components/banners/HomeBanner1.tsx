import './Css/HomeBannerCss.css'

function HomeBanner1(props: { image: string | undefined }){
return(
    <div className="relative w-full h-full">
        <img src={props.image} alt="Bem vindo ao Fichário do Mestre" className='w-full h-full object-cover'/>
        <div className="absolute inset-0 flex justify-center items-center">
            <div>
                <p className="text-white font-bold p-4 animate-typing" style={{fontSize:48}}>
                    Bem vindo ao Fichário do Mestre !
                </p>
            </div>
        </div>
    </div>
)

}

export default HomeBanner1