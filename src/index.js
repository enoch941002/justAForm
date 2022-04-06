import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import store from './store';
import { addToTable } from './action/tableinfo';

const Task = (props) => {
  const { task } = props;
  return (
    <tr key={task.key}>
      <td>{task.firstName}</td><td>{task.lastName}</td>
    </tr>
  );
};

Task.propTypes = {
  task: PropTypes.object,
};

Task.defaultProps = {
  task: {firstName:'',lastName:''},
};

const TableList = () => {
  const tableList = useSelector(state => state.tableList);
  if(tableList.length > 0){
    return tableList.map((task) => (
      <Task task={task} key={task.key}/>
    ));
  }
  return ;
  
};

const TodoListPage = () => (
  <div>
    <table>
      <thead>
        <tr>
          <th>FIRST NAME</th><th>LAST NAME</th>
        </tr>
      </thead>
      <tbody>
        <TableList />
      </tbody>
    </table>

  </div>
);
const Main = () => {
  const dispatch = useDispatch();
  const tableList = useSelector(state => state.tableList);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  return (
    <div>
      <span>{`數：${tableList.length}`}</span>
      <div>
        <input value={firstName} onChange={(e) => { setFirstName(e.target.value); }} />
        <input value={lastName} onChange={(e) => { setLastName(e.target.value); }} />
        <button type="button" onClick={() => { dispatch(addToTable({key:tableList.length + 1,firstName:firstName,lastName:lastName})); }}>
          新增
        </button>
      </div>
      <TodoListPage />
    </div>
  );
};
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);