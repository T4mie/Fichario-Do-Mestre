import BannerImage from '../assets/images/fotoplacegholder.jpg'
function HomeBannerFirst(){
return(
    <div className="flex flex-col w-full h-104 bg-red-800 items-center justify-center ">
        <div className='w-full h-full object-cover'>
            <img src={BannerImage} alt="ALALALALA" className='w-full h-full object-cover'/>
        </div>
        <div>
            
        </div>  
    </div>
)

}

export default HomeBannerFirst