  import React, { useState, useEffect } from "react";
  import "../TaskList/TaskList.css";
  import changeIcon from "../img/change-icon.jpg";

  function TaskList(props) {
    const { currentFolder , updateCurrentFolder, showAllFolders, folders, tasksData, setTasksData} = props;
    const [nameFolder, setNameFolder] = useState(currentFolder?.title);
    const [editNameFolder, setEditNameFolder] = useState(true);
    const [showFormAdd, setShowFormAdd] = useState(false);
    const [taskItem, setTaskItem] = useState("");
    const [tasks, setTasks] = useState([...tasksData]);
    const [taskLength, setTaskLength] = useState(tasksData.length + 1);
    const [itemActiveId, setItemActiveId] = useState(null);

    function openFormAdd() {
      setShowFormAdd(true);
    }

    function changeNameFolder() {
      setEditNameFolder(false);
    }

    useEffect(() => {
      setNameFolder(currentFolder?.title);
      setTasks(tasksData.filter((task) => task.item === currentFolder?.id));
    }, [currentFolder, tasksData]);

    function handleChange(event) {
      setNameFolder(event.target.value);
      updateNameFolder(event.target.value);
    }

    function updateNameFolder(name) {
      const updatedFolders = [...folders];
      const updatedNameFolder = { ...currentFolder, title: name };
      const folderIndex = updatedFolders.findIndex(
        (folder) => folder.id === currentFolder.id
      );
      updatedFolders[folderIndex] = updatedNameFolder;
      updateCurrentFolder(updatedFolders[folderIndex]);
    }
  
    function addTaskItem(taskItem) {
        const updatedTasks = [
          ...tasksData,
          {
            id: taskLength, 
            item: currentFolder.id,
            task: taskItem,
            checked: false,
          },
      ];
      setTasksData(updatedTasks);
      setTaskItem(""); 
      setTaskLength(taskLength + 1);
      setShowFormAdd(false);
    }

    function doneTask(id) {
      setTasksData((tasks) =>
        tasks.map((task) =>
          task.id === id ? { ...task, checked: !task.checked } : task
        )
      );
    }

    function handleItem(id) {
      setItemActiveId((prevId) => (prevId === id ? null : id));
    }

    function removeItem(id) {
      setTasksData(tasks =>tasks.filter(task => task.id !== id))
    }
  
    return (
      <div className={`task ${!currentFolder ? (!showAllFolders ? 'passive' : '') : ''}`}>
         {showAllFolders ? (
            <React.Fragment>
              {folders.map((folder) => (
                <div key={folder.id} className="task-wrapper">
                  <p className="task-title"
                     style={{ color: folder.color }}>
                    {folder.title}
                  </p>
                  <div className="line"></div>
                  <ul className="task-list">
                    {tasksData
                    .filter((task) => task.item === folder.id)
                    .map((taskItem) => (
                      <li 
                        key={taskItem.id}
                        className={`task-item ${
                          itemActiveId === taskItem.id ? "active" : ""
                        }`}
                      >
                        <span
                          className={`task-list-circle ${
                            taskItem.checked ? "active" : ""
                          }`}
                          onClick={() => doneTask(taskItem.id)}
                        >
                        </span>
                        <p onClick={() => handleItem(taskItem.id)}>
                          {taskItem.task}
                        </p>
                        {itemActiveId === taskItem.id && (
                          <span 
                            className="task-item-delete"
                            onClick={() => removeItem(taskItem.id)}
                          >
                            &times;
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </React.Fragment>
        ) : (
          currentFolder ? (
            <React.Fragment>
              <div className="task-title-wrapper">
                <input
                  className="task-title"
                  name={currentFolder.title}
                  type="text"
                  style={{ color: currentFolder.color }}
                  value={nameFolder || ""}
                  readOnly={editNameFolder}
                  onChange={handleChange}
                />
                <img
                  className="change-icon"
                  src={changeIcon}
                  alt="change-icon"
                  onClick={() => {
                    changeNameFolder();
                  }}
                />
              </div>
              <div className="line"></div>
              <ul className="task-list">
                {currentFolder &&
                  tasks
                    .filter((taskItem) => taskItem.item === currentFolder.id)
                    .map((taskItem) => (
                      <li
                        key={taskItem.id}
                        className={`task-item ${
                          itemActiveId === taskItem.id ? "active" : ""
                        }`}
                      >
                        <span
                          className={`task-list-circle ${
                            taskItem.checked ? "active" : ""
                          }`}
                          onClick={() => doneTask(taskItem.id)}
                        ></span>
                        <p onClick={() => handleItem(taskItem.id)}>
                          {taskItem.task}
                        </p>
                        {itemActiveId === taskItem.id && (
                          <span 
                            className="task-item-delete"
                            onClick={() => removeItem(taskItem.id)}
                          >
                            &times;
                          </span>
                        )}
                      </li>
                    ))}
              </ul>
              <div className="block-add">
                {!showFormAdd && (
                  <div className="block-item">
                    <span className="add-item-icon" onClick={openFormAdd}></span>
                    <p>Новая задача</p>
                  </div>
                )}
                {showFormAdd && (
                  <div className="form-add">
                    <input
                      className="form-add-input"
                      placeholder="Текст задачи"
                      value={taskItem}
                      onChange={(e) => setTaskItem(e.target.value)}
                    />
                    <div className="form-btns">
                      <button
                        className="form-btn form-btn-add"
                        onClick={() => addTaskItem(taskItem)}
                      >
                        Добавить задачу
                      </button>
                      <button
                        className="form-btn form-btn-cancel"
                        onClick={() => setShowFormAdd(false)}
                      >
                        Отменить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          ) : (
            <p className="task-text-default">Задачи отсуствуют</p>
          )) }

        
      </div>
    );
  }

  export default TaskList;