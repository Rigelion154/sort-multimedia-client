import SourceInputField from "./SourceInputField.tsx";

const MainForm = () => {

    return (
        <div className='flex justify-center gap-5 h-screen p-3'>
            <SourceInputField type='source' />
            <SourceInputField type='destination' />
        </div>
    );
};

export default MainForm;