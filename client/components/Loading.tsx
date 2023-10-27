import ReactLoading from 'react-loading';

type TProps = {
    text?: string;
};

const Loading = ({ text }: TProps) => {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <ReactLoading type='spokes' color='text-stone-500' />
            <p className='text-xs mt-3'>{text || 'loading'}</p>
        </div>
    );
};

export default Loading;
