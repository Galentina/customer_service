import React, {useState} from "react";
import AddClient from "./AddClient";
import CreateLine from "./CreateLine";
import ClientsList from "./ClientsList"
import {v4 as uuid4v} from 'uuid';
import './App.css';

function App() {

  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([])
  const [order, setOrder] = useState(0);
  const [services, setServices] = useState([
    {id: uuid4v(), name: '--', price: 0},
    {id: uuid4v(), name: 'Antiviral prophylaxis', cost: 100, price: 150},
    {id: uuid4v(), name: 'Installing Windows 7, 8, 10', cost: 100, price: 200},
    {id: uuid4v(), name: 'Motherboard replacing', cost: 100, price: 150},
    {id: uuid4v(), name: 'Power supply replacing', cost: 100, price: 120},
    {id: uuid4v(), name: 'Video card replacing', cost: 100, price: 190},
    {id: uuid4v(), name: 'Hard drive replacing', cost: 100, price: 200},
  ]);

  const managers = ['--', 'Maria', "Ivan", 'Leon', 'Clara', 'Mark', 'Olga', 'Serge'];
  const confPayment = ['--', 'No', 'Yes'];
  const statuses = ["--", 'Received', 'In processing', 'On verification', 'Ready for delivery', 'Delivered', 'Received by client']
  const priority = [0, 1, 2, 3, 4, 5];


  const addClient = (client, address, tel, manager) => {
    const newClients = [...clients];
    newClients.push({
      id: uuid4v(),
      name: client,
      address: address,
      tel: Number(tel),
      tasks: 0,
      payment: 0,
      debt: 0,
      manager: manager,
    });
    setClients(newClients);
  }
  const updateClient = (word, id, key) => {
    const newClients = [...clients];
    newClients.map(el => {
      if (el.id === id)
        switch (key) {
          case 'address': {el.address = word; break; }
          case 'tel': {el.tel = word; break; }
          case 'tasks': {el.tasks = word; break;}
          case 'payment': {el.payment = Number(word); break;}
          case 'debt': {el.debt = Number(word); break;}
          case 'manager': {el.manager = word; break;}
          default: alert("Wrong item");
        }
      return el;
    });
    console.log(newClients);
    setClients(newClients);
  }

  const addTask = (client, service, price, payment, status, priority) => {
    let newTasks = [...tasks];
    const newOrder = order + 1;
    newTasks.push({
      id: uuid4v(),
      number: newOrder,
      name: client,
      serv: service,
      price: Number(price),
      payment: Number(payment),
      status: status,
      priority: priority
    });
    setTasks(newTasks);
    setOrder(newOrder);
    newTasks=newTasks.filter(el => el.name === client);
    let sum = 0, sumDebts = 0;
    for (let i=0; i<newTasks.length; i++) {
      sum = sum + newTasks[i].payment;
      sumDebts = sumDebts + newTasks[i].price
    }
    const newClients = [...clients];
    newClients.map(el => (el.name === client) ? updateClient(sum, el.id, 'payment') : {...el});
    newClients.map(el => (el.name === client) ? updateClient((sumDebts - sum), el.id, 'debt') : {...el});
    newClients.map(el => (el.name === client) ? updateClient(el.tasks +1, el.id, 'tasks') : {...el});
  }

  const clientsPayment = (name) => {
    let newTasks = [...tasks];
    newTasks=newTasks.filter(el => el.name === name);
    let sum = 0;
    let sumDebts = 0;
    for (let i = 0; i < newTasks.length; i++) {
      sum = sum + newTasks[i].payment;
      sumDebts = sumDebts + newTasks[i].price
    }
    const newClients = [...clients];
    newClients.map(el => (el.name === name) ? updateClient(sum, el.id, 'payment') : {...el});
    newClients.map(el => (el.name === name) ? updateClient((sumDebts - sum), el.id, 'debt') : {...el});
  }

  const updateTask = (word, id, key) => {
    const newTasks = [...tasks];
    newTasks.map(el => {
      if (el.id === id)
        switch (key) {
          case 'service': {el.serv = word; break;}
          case 'price': {el.price = Number(word); clientsPayment(el.name); break;}
          case 'pay': {el.payment = Number(word); clientsPayment(el.name); break;}
          case 'status': {el.status = word; break;}
          case 'prior': {el.priority = word; break;}
          default: alert("Update");}
      return el;
    });
    setTasks(newTasks);
  }

  const deleteTask = (id) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        if (tasks[i].price !== tasks[i].payment) {
          alert("This task is not possible to delete, because task payment is not complete");
          return;
        } else if (tasks[i].status !== 'Received by client') {
          alert("Update client's status");
          return;
        }
        clients.map(el => (el.name !== tasks[i].name) ? {el} : el.tasks = el.tasks - 1);
        const newTasks = tasks.filter(el => el.id !== id);
        setTasks(newTasks);
        clientsPayment(tasks[i].name);
      }
    }
  }

  const addServ = (newName, newCost, newPrice) => {
    const newServices = [...services];
    newServices.push({id: uuid4v(), name: newName, cost: newCost, price: newPrice});
    setServices(newServices);
  }

  const updateServPrice = (price, id) => {
    const newServices = [...services];
    newServices.map(el => {
      if (el.id === id) {
        el.price = price;
      } return el;
    })
    setServices(newServices);
  }

  return (
      <div className="App">
        <header className="App-header">Customer service</header>
        <AddClient clients={clients} addClient={addClient} addTask={addTask} addServ={addServ} tasks={tasks}
                   services={services} statuses={statuses} priority={priority} managers={managers}
                   updateServPrice={updateServPrice} updateClient={updateClient}/>
        <hr/>

        <table className="table">
          <thead>
          <tr style={{backgroundColor: '#41afcf', fontSize: 15, color: "white"}}>
            <td style={{width: 200}}>Client</td>
            <td style={{width: 200}}>Address</td>
            <td>Tel:</td>
            <td>Number of orders</td>
            <td>Payment</td>
            <td>Clients Debt</td>
            <td>Clients Manager</td>
          </tr>
          </thead>

          <tbody>
          {clients.map((el, i) => <ClientsList updateClient={updateClient} key={i} client={el} address = {el.address} id={el.id}
                                               tasks={tasks} managers={managers}/>)}


          </tbody>
        </table>
        <hr/>
        <table className="table">
          <thead>
          <tr id='tr1'>
            <td>№</td>
            <td style={{width: 150}}>Client</td>
            <td>Service</td>
            <td>Price</td>
            <td>Payment</td>
            <td>Status</td>
            <td>Priority</td>
            <td>Manage order</td>
          </tr>
          </thead>
          <tbody>
          {tasks.map((el, i) =>
              <CreateLine
                  key={i}
                  task={el}
                  id={el.id}
                  services={services}
                  updateTask={updateTask}
                  confPayment={confPayment}
                  statuses={statuses}
                  priority={priority}
                  deleteTask={deleteTask}
                  clients={clients}
                  updateClient={updateClient}
              />)}
          </tbody>
        </table>

      </div>
  );
}

export default App;