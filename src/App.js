  import React, { useState} from 'react';
  import './index.css'
  import FolderList from './Components/FolderList/FolderList.jsx'
  import TaskList from './Components/TaskList/TaskList.jsx'
  import folderData from './Components/Data/folderData.jsx'
  import taskData from './Components/Data/taskData.jsx'  

  function App() {
    const [currentFolder, setCurrentFolder] = useState(null);
    const [foldersData, setFoldersData] = useState(folderData);
    const [showAllFolders, setShowAllFolders] = useState(false);
    const [tasksData, setTasksData] = useState(taskData);

    function showFolders(){
      setShowAllFolders(!showAllFolders);
    }

    function updateFolders(updatedFolders) {
      setFoldersData(updatedFolders);
    }

    function updateTasksList(updatedTasks) {
      setTasksData(updatedTasks);
    }

    function removeFolder(id) {
      setFoldersData((foldersData) => foldersData.filter(folder => folder.id !== id));
      setCurrentFolder(null);
    }
  
    function openFolder(folder) {
      const currentFolder = foldersData.find(folderItem => folderItem.id === folder.id);
      setCurrentFolder(currentFolder);
      setShowAllFolders(false);
    }

    function updateCurrentFolder(updatedFolder) {
      setCurrentFolder(updatedFolder);
      setFoldersData(prevFolders => {
        const updatedFolders = [...prevFolders];
        const folderIndex = updatedFolders.findIndex(folder => folder.id === updatedFolder.id);
        updatedFolders[folderIndex] = updatedFolder;
        return updatedFolders;
      });
    }

    return (
      <div className='wrapper'>
          <FolderList folders={foldersData} openFolder={openFolder} removeFolder={removeFolder} updateFolders={updateFolders} showFolders={showFolders}/>
          <TaskList 
            folders={foldersData} 
            currentFolder={currentFolder} 
            openFolder={openFolder} 
            updateCurrentFolder={updateCurrentFolder} 
            showAllFolders={showAllFolders} 
            setTasksData={setTasksData} 
            tasksData={tasksData}
            updateTasksList={updateTasksList}
          />
      </div>
    );
  }

  export default App;
