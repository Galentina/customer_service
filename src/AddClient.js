import React, {useState} from "react";
import ServiceList from './ServiceList';
import ClientModal from './ClientModal';
import NewTasksModal from './NewTasksModal';
import './App.css';



function AddClient(props) {
    const {services, clients, managers, statuses, priority} = props;
    const {addServ} = props;


    const [newName, setNewName] = useState('');
    const addNewTask = () => {
        props.addTask(newName);
        for (let i=0; i<clients.length; i++){
            if (newName===clients[i].name) {
                clients[i].tasks = clients[i].tasks + 1;
                props.updateClient(clients[i].tasks, clients[i].id, 'tasks'); setNewName('');
                return;
            }
        }
    }

        const [modalServList, setModalServList] = useState(false);
    const toggleServList = () => setModalServList(!modalServList);

    const [modalNewClient, setModalNewClient] = useState(false);
    const toggleNewClient = () => setModalNewClient(!modalNewClient);

    const [modalNewTask, setModalNewTask] = useState(false);
    const toggleNewTask = () => setModalNewTask(!modalNewTask);

    return (
        <div>
            <div className='divIn'>
            <button className='buttonB' onClick={()=>toggleNewClient()}>Add client</button>&nbsp;&nbsp;
            <ClientModal clients={clients} modal={modalNewClient} toggle={toggleNewClient} addClient={props.addClient} managers={managers}/>
            &nbsp;&nbsp;&nbsp;
            {/*<select className='selectOn' style={{display: "inline", verticalAlign: -3}} value={newName} onChange={(e)=>setNewName(e.target.value)}>*/}
            {/*        {clientsShow.map(el =><option>{el.name}</option>)}*/}
            {/*</select>&nbsp;*/}
                <button className='buttonB' onClick={()=> toggleNewTask()}>Add task</button>
                <NewTasksModal clients={clients} services={services} statuses={statuses} priority={priority} modal={modalNewTask} toggle={toggleNewTask} addTask={props.addTask}/>
            </div>
            <div>
                <button className='buttonA' onClick={toggleServList}>Service List</button>
                <ServiceList toggle={toggleServList} modal={modalServList} services={services} updateServPrice={props.updateServPrice} addServ={props.addServ}/>
            </div>

        </div>


    );
}

export default AddClient;