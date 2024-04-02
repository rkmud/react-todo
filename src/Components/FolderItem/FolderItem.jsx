import React, {useState} from 'react'
import '../FolderItem/FolderItem.css'

function FolderItem(props) {
  
  const {folders, openFolder , removeFolder} = props;
  const [clickedItemId, setClickedItemId] = useState(null);

  function handleItemId(id) {
    setClickedItemId(id)
  }
  
  return (
    <ul className="folder-list">
      {folders.map(folder => (
          <li 
            key={folder.id} 
            className={`folder-item ${clickedItemId === folder.id ? 'active' : ''}`}
            onClick={() => {
              openFolder(folder)
              handleItemId(folder.id)
            }}
          >
            <span className='folder-item-icon' style={{ background: folder.color }}></span>
            <p className='folder-item-name'>{folder.title}</p>
            {clickedItemId  &&
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFolder(folder.id)
                }} 
                className='folder-item-close'
              >
                &times;
              </span>
            }
          </li>
        ))}
    </ul>
  );
}

export default FolderItem;