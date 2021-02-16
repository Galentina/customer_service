import React, { useState } from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import UpdateService from './UpdateServ';


export default function DeleteTaskModal(props) {
    const {modal, services, toggle} = props;
    const [newService, setNewService] = useState('');
    const [newCost, setNewCost] = useState(0);
    const [newPrice, setNewPrice]  = useState(0);
    const addService = (newService, newCost, newPrice) => {
        props.addServ(newService, newCost, newPrice);
        setNewService('');
        setNewCost(0);
        setNewPrice(0);
    }

    const [openButton, setOpenButton] = useState(false);
    const makeOpenAdd = () => {
        setOpenButton(!openButton);
    }

    return (

        <Modal isOpen={modal} toggle={toggle} style={{width: "800px", display: "block"}} >
            <ModalHeader toggle={toggle} charCode='X'>Update service list</ModalHeader>
            <ModalBody>
                <table id="table">
                    <thead>
                    <tr style={{backgroundColor: '#41afcf', fontSize: 15, color: "white"}}>
                        <td className="td2">Service Name</td>
                        <td className="td2">Cost</td>
                        <td className="td2">Price</td>
                    </tr>
                    </thead>
                    <tbody>
                        {services.filter(el =>el.name!=='--').map(el=>
                        <UpdateService service={el} id={el.id} updateServPrice={props.updateServPrice}/>
                    )}
                    </tbody>
                </table>
                {openButton &&
                <div className='div_center'>
                <input className='smallI' style={{width: 255}} value={newService} onChange={(e)=>setNewService(e.target.value)} placeholder="Add a new service"/>&nbsp;
                <input className='smallI' style={{width: 100}} type='number' value={newCost} onChange={(e)=>setNewCost(e.target.value)} placeholder="Services cost"/>&nbsp;
                <input className='smallI' style={{width: 100}} type='number' value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Services price"/>
                <button className='buttonA' style={{marginTop: 10}} onClick={()=> {addService(newService, newCost, newPrice); makeOpenAdd()}} disabled={!newService || !newCost || !newPrice}>Add service</button>
                </div>}
                    {!openButton &&
                <div className='div_center'>
                    <button className='buttonA' style={{marginTop: 10}} onClick={() => makeOpenAdd()}>Add
                    service</button>
                </div>}
            </ModalBody>
            <ModalFooter>
                {/*<button className='buttonA' >Update</button>{' '}*/}
                <button className='buttonA' onClick={toggle}>Close</button>
            </ModalFooter>
        </Modal>

    );
}