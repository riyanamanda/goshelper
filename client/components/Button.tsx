import { MouseEventHandler } from 'react';

type Props = {
    children: any;
    onclick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, onclick }: Props) => {
    return (
        <button
            className='flex items-center gap-2 border px-3 py-0.5 rounded shadow-xl text-white font-medium tracking-wide leading-relaxed bg-blue-500 border-blue-500/20 shadow-blue-500/20 hover:bg-blue-600 hover:shadow-blue-600/20 hover:border-blue-600/20 transition-colors duration-200'
            onClick={onclick}
        >
            {children}
        </button>
    );
};
export default Button;
