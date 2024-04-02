import React from 'react'
import FolderItem from './../FolderItem/FolderItem.jsx'
import CreateFolder from './../CreateFolder/CreateFolder.jsx'
import imageSrc from './../img/icon.png'
import '../FolderList/FolderList.css'

export default function FolderList(props) {
    const { openFolder, folders, removeFolder, updateFolders, showFolders} = props;
    
    return(
       <div className='folder-wrapper'>
            {folders.length !== 0 && (
               <div className='folder-component'
                    onClick={() => showFolders()}>
                    <img className='folder-component-icon' src={imageSrc} alt='icon' />
                    <p>Все задачи</p>
                </div> 
            )}
            <FolderItem folders={folders} openFolder={openFolder} removeFolder={removeFolder}  />
            <CreateFolder folders={folders} updateFolders={updateFolders}/>
       </div>
    )
}

