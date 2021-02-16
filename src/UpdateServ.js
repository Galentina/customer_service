import React, {useState} from "react";

export default function UpdateService(props) {

    const {service}=props;

    const [upPrice, setUpPrice] = useState(0);
    const setTaskPrice = () =>{
        props.updateServPrice(upPrice, service.id);
        makeOpen();
    }
    const [openButton, setOpenButton] = useState(false);            // make open process for new updating input
    const makeOpen = () => {
        setOpenButton(!openButton);
    }


    return (
        <tr><td className="td2" style={{width: 100}}>{service.name}</td>
            <td className="td2" style={{width: 100}}>{service.cost}&nbsp;$</td>
            <td>{service.price}&nbsp;$&nbsp;&nbsp;
                <input className={(!openButton) ? 'off' : 'smallI'} style={{width: 60}} value={upPrice} type='number' onChange={(e)=>setUpPrice(e.target.value)}/>&nbsp;
                <button className={(!openButton) ? 'off' : 'smallI'} style={{width: 30}} onClick={()=> setTaskPrice()}>Ok</button>
                <button className={(!openButton) ? 'smallB': 'off'} style={{width: 60}} onClick={()=> makeOpen()}>Update</button>
            </td>
        </tr>


    )



}