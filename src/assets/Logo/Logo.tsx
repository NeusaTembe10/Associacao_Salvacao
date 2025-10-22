import Chearche from "./Chearche.jpg" 
const Logo=()=>{
    return (
        <div className="flex justify-center items-center gap-5 pt-5">
            <img className="w-20 rounded-[50px] opacity-[80%]" src={Chearche} alt="Logo da igreja" />
            <h3 className="font-bold">Associação Salvação</h3>
        </div>
    )
}

export default Logo