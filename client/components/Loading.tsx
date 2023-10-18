import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <ReactLoading type='spokes' />
            <p className='text-xs mt-3'>Loading</p>
        </div>
    );
};

export default Loading;
