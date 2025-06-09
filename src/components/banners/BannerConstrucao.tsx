import './Css/ConstrucaoCSS.css'

function BannerConstrucao(props: { image: string | undefined }){
return(
    <div>
        <img src={props.image} alt="Área em Construção" className='w-half h-half object-cover items-center'/>
    </div>
)

}

export default BannerConstrucao