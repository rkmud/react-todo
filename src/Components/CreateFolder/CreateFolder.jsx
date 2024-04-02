import React, { useState }    from 'react';
import '../CreateFolder/CreateFolder.css'
import colorData from '../Data/colorData'

export default function CreateFolder(props) {
    const {updateFolders, folders} = props
    const [isOpen, setIsOpen] = useState(false)
    const [valueInput, setValueInput] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null);
    const [lengthFolder, setLengthFolder] = useState(folders.length + 1)
    
    function handleChange(e) {
        setValueInput(e.target.value)
    }

    function closeForm() {
        setIsOpen(!isOpen)
    }

    function addFolder(){
        if(!selectedColor) {
            setSelectedColor(colorData[0])
            return;
        }
        updateFolders([...folders, {
            id: lengthFolder,
            title: valueInput,
            color: selectedColor.color,
            checked: false
        }])
        setValueInput(null);
        setSelectedColor(null);
        setLengthFolder(lengthFolder + 1);
        setIsOpen(false);
    }

    function chooseColor(id) {
        setSelectedColor(colorData.find(color => color.id === id))
    } 

    return (
        <React.Fragment>
            <div className="create-item">
                <div className="create-link">
                    <span className="create-icon" onClick={closeForm}>+</span>
                    <p>Добавить папку</p>
                    {isOpen && (
                        <div className="create-add">
                            <input 
                                className='create-add-input'
                                type='text'
                                value={valueInput || ''} 
                                placeholder='Название папки'
                                onChange={handleChange}
                            />
                            <div className='create-add-colors'>
                                {colorData.map(color => 
                                    <div
                                        key={color.id}
                                        className={`create-add-color ${selectedColor?.id === color.id ? 'active' : ''}`}
                                        style={{
                                            background: color.color,
                                            border: `2px solid ${color.color}`
                                        }}
                                        onClick={() => chooseColor(color.id)}
                                    >
                                    </div>
                                )}
                            </div>
                            <button className='button-add' onClick={addFolder}>Добавить</button>
                            <span className="button-close" onClick={closeForm}>&times;</span>
                        </div>
                    )}
                </div>
            </div>
            
        </React.Fragment>
    )
}