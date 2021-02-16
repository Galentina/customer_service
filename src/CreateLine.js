import React, {useState} from "react";
import './App.css';
import DeleteClient from "./DeleteClient";

function CreateLine(props) {
    const task = props.task;
    const {services, clients}=props;
    const {statuses}=props;
    const {priority}=props;


    const [upService, setUpService] = useState('Choose service:');
    const setTaskService=()=>{
        props.updateTask(upService, task.id, 'service');
        for (let i=0; i<services.length; i++) {
            if (services[i].name === upService) props.updateTask(services[i].price, task.id, 'price');
    }
        makeOpen();
    }

    const [upPayment, setUpPayment] = useState(0);
    const setTaskPayment=()=>{
        props.updateTask(upPayment, task.id, 'pay');
        setOpenButton1(!openButton1);
    }

    const [upStatus, setUpStatus] = useState('Choose status:');
    const setTaskStatus = () => {
        props.updateTask(upStatus, task.id, 'status');

    }

    const [openButton, setOpenButton] = useState(false);            // make open process for new updating input
    const makeOpen = () => {
        setOpenButton(!openButton);
    }

    const [openButton1, setOpenButton1] = useState(false);            // make open process for new updating input
    const makeOpen1 = () => {
        setOpenButton1(!openButton1);
    }

    const [upPriority, setUpPriority] = useState(0);
    const setTaskPriority = () => {
        props.updateTask(upPriority, task.id, 'prior');
    }


    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    return (
        <tr>
            <td>{task.number}</td>
            <td>{task.name}</td>
            <td>{task.serv}</td>
            {/*<td className="td2"><span>{task.serv}</span>&nbsp;&nbsp;*/}
            {/*    <select className='selectOn' value={upService} onChange={(e)=>setUpService(e.target.value)} onClick={()=>*/}
            {/*        setTaskService()}>*/}
            {/*        {services.map(el =><option>{el.name}</option>)}*/}
            {/*    </select>*/}
            {/*</td>*/}
            <td><span>{task.price} &nbsp;$ </span>
            </td>
            <td><span className={(!openButton1) ? 'on' : 'off'}>{task.payment}</span>
                <span className={(!openButton1) ? 'off' : 'on'}>
                    <input className='smallI' style={{width: 60}} value={upPayment} type='number' onChange={(e)=>setUpPayment(e.target.value)}/>&nbsp;
                    </span>&nbsp;$ &nbsp;&nbsp;
                <button className={(!openButton1) ? 'off' : 'smallB'} style={{width: 60}} onClick={()=> setTaskPayment()}>Confirm</button>&nbsp;
                <button className={(!openButton1) ? 'smallB' :'off'} style={{width: 60}} onClick={()=>makeOpen1()}>Update</button>&nbsp;&nbsp;
                <span>Remain to pay: </span>&nbsp;<span>{task.price-task.payment}</span>
            </td>

            <td ><span>{task.status}</span>&nbsp;&nbsp;
                <select className='selectOn' value={upStatus} onChange={(e)=>setUpStatus(e.target.value)} onClick={()=>setTaskStatus()}>
                    {statuses.map(el=><option style={{paddingRight: 15, paddingLeft: 15}}>{el}</option>)}
                </select>
            </td>
            <td><span>{task.priority}</span>&nbsp;&nbsp;
                <select className='selectOn' value={upPriority} onChange={(e)=>setUpPriority(e.target.value)} onClick={()=>setTaskPriority()}>
                    {priority.map(el=><option>{el}</option>)}
                </select>
            </td>

            <td>
                <button className="buttonA" onClick={() => setModal(!modal)}>Delete order</button>
                <DeleteClient  modal={modal} toggle={toggle} task={task} deleteTask={props.deleteTask}/>
            </td>
        </tr>
    );
}


export default CreateLine;