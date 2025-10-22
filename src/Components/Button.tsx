type button ={
    children: React.ReactNode,
    customClass?: string,
    onclick?: React.MouseEventHandler<HTMLButtonElement>,
    icon: React.ReactNode
}

const Button = ({children, customClass,icon,onclick}:button) => {
    return (
        <button 
           onClick={onclick}
            className={` text-white font-bold py-3 px-4 flex justify-center items-center gap-4  cursor-pointer hover:opacity-80  ${customClass}`
            }
            style={{background: "linear-gradient(to left, #064648 39%, #C4F1CD 100% )"}}
        >
           {icon} {children}
        </button>
    )
}
export default Button;