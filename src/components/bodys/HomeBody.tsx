

function HomeBody1(props: { image: string | undefined }){
    return (
        <div className="flex flex-row bg-[#101930]">
            <div className="flex flex-6/12 justify-center p-4">
                <img src={props.image} className="" alt="Uma mesa com dados e fichas espalhados." />
            </div>
            <div className="flex flex-6/12 justify-center items-center p-4  text-justify">
                <p className="">Somos uma equipe de quatro apaixonados por RPG, que nos conhecemos na faculdade e compartilhamos o mesmo entusiasmo por esse universo fantástico. Motivados por essa paixão, decidimos unir forças para criar um projeto que facilitasse a vida de mestres e jogadores. <br /><br />
                A ideia do Fichário do Mestre nasceu do desejo de uma plataforma simples e intuitiva para a criação de modelos autorais de fichas de RPG do zero, visto que há uma escassez de opções nesse âmbito. Por mais que há no mercado sites de modelos famosos e prontos (como Dungeons&Dragons e Ordem Paranormal) para criação de fichas, poucos oferecem a liberdade e a flexibilidade de personalização de um sistema feito do zero com menor reconhecimento.
                <br /><br />
                Com o Fichário do Mestre, queremos oferecer uma ferramenta intuitiva, versátil e acessível, onde cada usuário possa montar fichas do jeito que imaginar, tornando a experiência de gerenciar personagens e histórias muito mais prática e fácil.</p>
            </div>
        </div>
    )
}

export default HomeBody1