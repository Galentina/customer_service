import React,{useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';


export default function DeleteTaskModal(props) {
    const {modal, task, toggle} = props;

    const deleteClient = () => {
        props.deleteTask(task.id);
        props.toggle();
    }


    return (

            <Modal isOpen={modal} toggle={toggle} style={{width: "400px", display: "block"}}>
                <ModalHeader toggle={toggle}>Do you want to delete task № ${task.number}?</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete {task.name}'s task № {task.number}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>deleteClient()}>Delete</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

    );
}