import React, {useState} from 'react';
import './App.css';

export default function ClientsList(props) {
    const {client, address, managers, tasks} = props;

    const [upAddress, setUpAddress] = useState('');
    const setClientAddress = () => {
        props.updateClient(upAddress, client.id, 'address');
        makeOpenAdd(openAdd);
    }
    const [openAdd, setOpenAdd] = useState(false);            // make open process for new updating input
    const makeOpenAdd = () => {
        setOpenAdd(!openAdd);
    }
    const [openPers, setOpenPers] = useState(false);            // make open process for new updating input
    const makeOpenPers = () => {
        setOpenPers(!openPers);
    }
    const [upPerson, setUpPerson] = useState('')
    const setClientManager = () => {
        props.updateClient(upPerson, client.id, 'manager');
        setUpPerson('');
        setOpenPers(!openPers);
    }
    const [openTel, setOpenTel] = useState(false);            // make open process for new updating input
    const makeOpenTel = () => {
        setOpenTel(!openTel);
    }
    const [upTel, setUpTel] = useState('');
    const setClientTel=()=>{
        props.updateClient(upTel, client.id, 'tel');
        setOpenTel(!openTel);
    }



    return (
        <tr>
            <td>{client.name}</td>
            <td style={{width: 250}}><span className={(!openAdd) ? 'on' : 'off'}>{address}</span>
                    <input  className={(openAdd) ? 'smallI' :'off'} value={upAddress} onChange={(e)=>setUpAddress(e.target.value)}/>&nbsp;&nbsp;
                    <button className={(openAdd) ? 'smallB' :'off'}  style={{width: 60}} onClick={()=>setClientAddress()}>Ok</button>
                    <button className={(!openAdd) ? 'smallB' : 'off'} style={{width: 60}} onClick={()=>makeOpenAdd()}>Update</button>
            </td>
            <td>{'+'}&nbsp;<span className={(!openTel) ? 'on': 'off'}>{client.tel}</span>
                <span className={(openTel) ? 'on' : 'off'}>
                    <input className='smallI' style={{width: 80}} value={upTel} type='number' onChange={(e)=>setUpTel(e.target.value)}/>&nbsp;
                    </span>&nbsp;&nbsp;
                <button className={(openTel) ? 'smallB' :'off'} style={{width: 60}} onClick={()=>setClientTel()}>Confirm</button>&nbsp;
                <button className={(!openTel) ? 'smallB' :  'off' } style={{width: 60}} onClick={()=>makeOpenTel()}>Update</button>&nbsp;
            </td>
            <td >{client.tasks} &nbsp;</td>
            <td>{client.payment}</td>
            <td>{client.debt}</td>
            <td><span className='on'>{client.manager}</span>&nbsp;&nbsp;
                <select className="smallB" style={{width: 60}} value={upPerson} onChange={(e)=>setUpPerson(e.target.value)}>
                    {managers.map(el =><option>{el}</option>)}
                </select>&nbsp;
                <button className='smallB' style={{width: 60}} onClick={()=>setClientManager()}>Change</button>&nbsp;&nbsp;

            </td>

        </tr>
    );




}