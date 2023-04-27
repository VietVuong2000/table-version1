import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useEffect } from 'react';
import axios from 'axios';

interface dataPopup{
  data: any;
}

const ViewDetail  : React.FC<dataPopup> = (data) =>  {


  console.log(data)
    return(
    <Popup className='modal'
    trigger={<button className="button btn btn-outline-primary" type="button" >View Detail</button>}
    modal
    >
    
    <div className="header">
      View Detail
    </div>
    <label>Status</label>
    <div>
    <input type="text"/>
    </div>
    <label>Date</label>
    <input type="text" />
    <label>Client</label>
    <input type="text" />
    <label>Currency</label>
    <input type="text" />
    <label>Totail</label>
    <input type="text" />
    <label htmlFor="">Invoice</label>
    <input type="text" />
    </Popup>
    );
}

export default ViewDetail;


  