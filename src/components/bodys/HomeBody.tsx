

function HomeBody1(props: { image: string | undefined }){
    return (
        <div className="flex flex-row bg-[#101930]">
            <div className="flex flex-6/12 justify-center p-4">
                <img src={props.image} className="" alt="Uma mesa com dados e fichas espalhados." />
            </div>
            <div className="flex flex-6/12 justify-center items-center text-center p-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    )
}

export default HomeBody1