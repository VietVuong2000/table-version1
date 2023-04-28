import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { itfData } from "../../interface";

interface DataPopup {
  id: any;
}

const ViewDetail: React.FC<DataPopup> = ({ id }) => {
  console.log(id);
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
  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  
  const handleViewDetail = ()=>{
    const tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4MjE2MzAxOH0.1OHw4SAkI8-9f6QZWHFG7kWxKAkjz90TiHo960AfoNQ'
   
      axios
      .get(`http://api.training.div3.pgtest.co/api/v1/product/${id}`, { headers: {"Authorization" : `${tokenStr}`}}) 
      .then((response: any)=>{
        setData(response.data.data);
        setIsOpen(true);

    
      })
      .catch((error: any)=>{
        console.log(error);
      })
   
  }

  return (
    <>
      <button className="button btn btn-outline-primary" type="button" onClick={handleViewDetail}>Show Detail</button>
      <Popup className='modal' open={isOpen} onClose={handleClose}>
  <div className="header">View Detail</div>
  <label>Status</label>
  <input type="text" value={data.status} readOnly />
  <label>Date</label>
  <input type="text" value={data.createdAt} readOnly />
  <label>Client</label>
  <input type="text" value={data.client} readOnly />
  <label>Currency</label>
  <input type="text" value={data.currency} readOnly />
  <label>Total</label>
  <input type="text" value={data.total} readOnly />
  <label>Invoice</label>
  <input type="text" value={data.invoice} readOnly />
  <button onClick={handleClose}>Close</button>
</Popup>

    </>
  );
}

export default ViewDetail;
