import {useState} from "react";
import {apiClient} from "../api/apiClient.ts";

const MainForm = () => {
    const [sourcePath, setSourcePath] = useState<string>('')

    const handleSetPath = (newPath: string, type: 'source' | 'target') => {
        const directoryItems = apiClient.post('/sort/path', {newPath, type})

        console.log(directoryItems)
    }

    return (
        <div className='flex items-center justify-center gap-5 h-screen'>
            <div className='flex flex-col gap-1'>
                <label className='font-bold opacity-60'>Путь к данным:</label>
                <input type="text"
                       style={{minWidth: '300px'}}
                       className='border border-blue-500 rounded-sm px-2 py-1 flex-grow'
                       placeholder='Укажите путь к исходным данным' value={sourcePath}
                       onChange={e => setSourcePath(e.target.value)}
                />
                <button onClick={() => handleSetPath(sourcePath, 'source')}
                        className='mt-2 border-b border-b-green-600 px-2 py-1'>
                    Применить
                </button>
            </div>

            <div className='flex flex-col gap-1'>
                <label className='font-bold opacity-60'>Путь к данным:</label>
                <input type="text"
                       style={{minWidth: '300px'}}
                       className='border border-blue-500 rounded-sm px-2 py-1 flex-grow'
                       placeholder='Укажите путь к исходным данным' value={sourcePath}
                       onChange={e => setSourcePath(e.target.value)}
                />
                <button onClick={() => handleSetPath(sourcePath, 'source')}
                        className='mt-2 border-b border-b-green-600 px-2 py-1'>
                    Применить
                </button>
            </div>
        </div>
    );
};

export default MainForm;