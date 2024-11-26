import React from 'react';

const Button = ({ color, icon, children, onClick, className }) => {
    return (
        <button onClick={onClick} type="submit"
                className={`fixed w-36 h-12 rounded-3xl shadow-lg text-center flex items-center justify-center space-x-2 ${color} ${className}`}
                >
            {icon && <img src={icon} alt="Icon" className="h-6 w-6" />} 
            <span>{children}</span>
        </button>
    );
};

export default Button;
