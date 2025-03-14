const SideMenu = () => {
    return (
        <div className='fixed start-[30px] top-[20px] flex flex-col gap-3'>
            <div className='border-2 text-white font-bold rounded-md p-4'>
                <span className='me-1'>
                        Расширения для фото:
                </span>
                <span className='text-blue-700'>
                        [ 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp' ]
                </span>
            </div>

            <div className='border-2 text-white font-bold rounded-md p-4'>
                <span className='me-1'>
                    Расширения для видео:
                </span>
                <span className='text-blue-700'>
                    [ 'mp4', 'mov', 'avi', 'mkv', 'webm' ]
                </span>
            </div>
        </div>
    );
};

export default SideMenu;