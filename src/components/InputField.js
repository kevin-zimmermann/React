const InputField = ( {label, type, value, onChange,className,placeholder} ) => {
    return (
        <div>
            <label>{label}</label>
            <input className={className} type={type} value={value} onChange={onChange} placeholder={placeholder} />
        </div>
    );
};

export default InputField;
