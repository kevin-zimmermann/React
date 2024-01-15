const Button = ( { type, value,className,placeholder,onClick,innerHTML} ) => {
    return (
        <div>
            <button className={className} type={type} value={value} onClick={onClick} placeholder={placeholder}>{innerHTML}</button>
        </div>
    );
};

export default Button;
