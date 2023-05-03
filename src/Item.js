function Item(props) {

  const task = props.task;
  
  function deleteAction() {
    props.deleteAction(task);
  }
  
  function updateAction() {
    props.updateAction(task);
  }

  return (
  <div>
    <li>
      <input defaultChecked={task.done} onClick={updateAction} key={task.id} type="checkbox"/>
      <label className={task.done ? 'taskDone' : null}>{task.title}</label>
      <button type="button" onClick={deleteAction}>X</button>
    </li>
  </div>
  );
}

export default Item;