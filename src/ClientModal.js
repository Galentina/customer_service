import React, {useState} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';

export default function ClientModal(props) {
    const {modal, toggle, managers, clients} = props;

    const [newClient, setNewClient] = useState('');
    const [upManager, setUpManager] = useState('');
    const [upAddress, setUpAddress] = useState('');
    const [upTel, setUpTel] = useState('');

    const addNewClient = () => {
        let exists = false;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].name === newClient) {
                exists = true; if (exists === true) alert('This client is already exists. \n Please Choose another name');
                setNewClient('');
                return;
            }
        }
        if (exists === false)
            props.addClient(newClient, upAddress, upTel, upManager);
        setNewClient('');
        setUpManager('');
        setUpAddress('');
        setUpTel('');
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle} charCode='X'>Create a new client</ModalHeader>
                <ModalBody>
                    <table className="table">
                        <thead><tr id='tr1'>
                            <td>Areas to fill</td>
                            <td>Fill in details</td>
                           </tr>
                        </thead>
                        <tbody>
                        <tr><td>Clients Name:</td>
                            <td><input className="smallI" type="text" value={newClient} onChange={(e)=>setNewClient(e.target.value)} placeholder='Insert clients name'/></td>
                        </tr>
                        <tr><td>Clients address:</td>
                            <td><input className="smallI" type="text"  value={upAddress} onChange={(e)=>setUpAddress(e.target.value)} placeholder='Insert clients address'/></td>
                        </tr>
                        <tr><td>Clients Telephone:</td>
                            <td><input className="smallI" type="number"  value={upTel} onChange={(e)=>setUpTel(e.target.value)} placeholder='Insert clients telephone'/></td>
                        </tr>
                        <tr><td>Manager:</td>
                            <td><select className="smallI" value={upManager} onChange={(e)=>setUpManager(e.target.value)}>
                                {managers.map(el =><option>{el}</option>)}
                            </select>&nbsp;
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button className="buttonA" disabled={!newClient} onClick={()=>addNewClient()} >Save</button>{' '}
                    <button className="buttonB" onClick={toggle}>Close</button>
                </ModalFooter>
            </Modal>

        </div>
    )
}