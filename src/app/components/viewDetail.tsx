import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { itfData } from "../../interface";
import moment from 'moment';
import { log, table } from 'console';
import tableSlice, { getDataDelete, getDataTable } from '../../features/table/tableSlice';

interface DataPopup {
  id: any;
  getDatas: any
}



const ViewDetail: React.FC<DataPopup> = ({ id, getDatas }) => {
  // console.log(id);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<itfData>({
    id: 0,
    status: '',
    currency: '',
    total: 0,
    client: '',
    invoice: '',
    createdAt: ''
  });

  const handleClose = () => {
    setIsOpen(false);
  }

  
  
  const [status, setStatus] = useState('')
  const handleViewDetail = ()=>{
    const tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4MjE2MzAxOH0.1OHw4SAkI8-9f6QZWHFG7kWxKAkjz90TiHo960AfoNQ'
    
    axios
    .get(`http://api.training.div3.pgtest.co/api/v1/product/${id}`, { headers: {"Authorization" : `${tokenStr}`}}) 
    .then((response: any)=>{
      setData(response.data.data);
      setIsOpen(true);
      setStatus(response.data.data.status)
      
      
    })
    .catch((error: any)=>{
      console.log(error);
    })
    

  
  }
  console.log(status)
  
  const handleUpdate = ()=>{
    let newDataUpdate = {
      "id": data.id,
     "status": status,
     "currency": data.currency,
     "fundingMethod": "Credit",
     "total": data.total,
     "order": "Order 1",
     "client": data.client,
     "invoice": data.invoice
    }
   console.log(newDataUpdate)
    
   const tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4MjE2MzAxOH0.1OHw4SAkI8-9f6QZWHFG7kWxKAkjz90TiHo960AfoNQ'
    
   axios
   .put(`http://api.training.div3.pgtest.co/api/v1/product`,newDataUpdate, { headers: {"Authorization" : `${tokenStr}`}}) 
   .then((response: any)=>{
    // setIsOpen(false);
    console.log(response);
     
     
   })
   .catch((error: any)=>{
     console.log(error);
   })

    getDatas();
    setIsOpen(false);
  }
  


  return (
    <>
      <button className="button btn btn-outline-primary" type="button" onClick={handleViewDetail}>Show Detail</button>
      <Popup className='modal' open={isOpen} onClose={handleClose}>
  <div className="header">View Detail</div>
  <label>Status</label>
  <input type="text" value={status} onChange={(e)=>{setStatus( e.target.value)}}  />
  <label>Date</label>
  <input type="text" value={moment(data.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY')} readOnly />
  <label>Client</label>
  <input type="text" value={data.client} readOnly />
  <label>Currency</label>
  <input type="text" value={data.currency} readOnly />
  <label>Total</label>
  <input type="text" value={data.total} readOnly />
  <label>Invoice</label>
  <input type="text" value={data.invoice} readOnly />
  <button onClick={ handleUpdate}>Update</button>
</Popup>

    </>
  );
}

export default ViewDetail;
