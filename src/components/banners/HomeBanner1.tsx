
function HomeBanner1(props: { image: string | undefined }){
return(
    <div className="flex flex-col w-full h-120 bg-red-800 items-center justify-center ">
        <div className='w-full h-full object-cover'>
            <img src={props.image} alt="Bem vindo ao Fichário do Mestre" className='w-full h-full object-cover'/>
        </div>
    </div>
)

}

export default HomeBanner1