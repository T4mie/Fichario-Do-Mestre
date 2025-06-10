import './Css/ConstrucaoCSS.css'

function BannerConstrucao(props: { image: string | undefined }){
return(
    <div>
        <img src={props.image} alt="Área em Construção" className='w-100 h-100 object-cover items-center'/>
    </div>
)

}

export default BannerConstrucao