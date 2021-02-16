import React, {useState} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';

export default function ClientModal(props) {
    const {modal, toggle, clients, services, statuses, priority} = props;
    const clientsShow = ['--',...clients];

    const [upClient, setUpClient] = useState('');
    const [upService, setUpService] = useState('');
    const [upPrice, setUpPrice] = useState(0);
    const [upPayment, setUpPayment] = useState(0);
    const [upStatus, setUpStatus] = useState('');
    const [upPriority, setUpPriority] = useState(0);

    const addNewTask = () => {
        props.addTask(upClient, upService, upPrice, upPayment, upStatus, upPriority)
        setUpClient('');
        setUpService('');
        setUpPrice(0);
        setUpPayment(0);
        setUpStatus('');
        setUpPriority(0)
    }

    const setTaskPrice=()=>{
        for (let i=0; i<services.length; i++) {
            if (services[i].name === upService) setUpPrice(services[i].price);
        }
    }

    const [openButton1, setOpenButton1] = useState(false);            // make open process for new updating input
    const makeOpen1 = () => {
        setOpenButton1(!openButton1);
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle} charCode='X'>Create a new task</ModalHeader>
                <ModalBody>
                    <table className="table">
                        <thead><tr id='tr1'>
                            <td>Areas to fill</td>
                            <td className='td2'>Fill in details</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td>Choose client:</td>
                            <td>{upClient}&nbsp;
                            <select className='selectOn' value={upClient} onChange={(e)=>setUpClient(e.target.value)}>
                                {clientsShow.map(el =><option>{el.name}</option>)}
                            </select></td>
                        </tr>
                        <tr><td>Choose service:</td>
                            <td><span>{upService}</span>&nbsp;&nbsp;
                            <select className='selectOn' value={upService} onChange={(e)=>setUpService(e.target.value)} onClick={() => setTaskPrice()}>
                                {services.map(el =><option>{el.name}</option>)}
                            </select></td>
                        </tr>
                        <tr><td>Service Price:</td>
                            <td>{upPrice}</td>
                        </tr>
                        <tr><td>Payment:</td>
                            <td><span className={(!openButton1) ? 'off' : 'on'}>{upPayment}</span>
                                <span className={(!openButton1) ? 'on' : 'off'}>
                                <input className='smallI60' value={upPayment} type='number' onChange={(e)=>setUpPayment(e.target.value)}/>&nbsp;
                                </span> &nbsp;$ &nbsp;
                                <button className={(!openButton1) ? 'smallB' :'off'} style={{width: 60}} onClick={()=> makeOpen1()}>Confirm</button>&nbsp;
                                <button className={(!openButton1) ? 'off' : 'smallB'} style={{width: 60}} onClick={()=>makeOpen1()}>Update</button>&nbsp;
                            </td>
                        </tr>
                        <tr><td>Task status:</td>
                            <td><span>{upStatus}</span>&nbsp;&nbsp;
                                <select className='selectOn' value={upStatus} onChange={(e)=>setUpStatus(e.target.value)}>
                                    {statuses.map(el=><option>{el}</option>)}
                                </select>
                            </td>
                        </tr>
                        <tr><td>Priority:</td>
                            <td><span>{upPriority}</span>&nbsp;&nbsp;
                                <select className='selectOn' value={upPriority} onChange={(e)=>setUpPriority(e.target.value)}>
                                    {priority.map(el=><option>{el}</option>)}
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button className="buttonA" disabled={!upClient} onClick={()=>addNewTask()} >Save</button>{' '}
                    <button className="buttonB" onClick={toggle}>Close</button>
                </ModalFooter>
            </Modal>

        </div>
    )
}