import { itfData } from "../../interface";
import React,{useEffect, useState} from "react";
import ViewDetail from "./viewDetail";
import axios from "axios";
import moment from "moment";




interface datatable {
    currentPosts: any,
    HandleDelete: any

}



const Table : React.FC<datatable> = ({currentPosts, HandleDelete})=>{

  const [dataPopup, setDataPopup] = useState({})
  const handleViewDetail =(id: any)=>{
    const tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4MjE2MzAxOH0.1OHw4SAkI8-9f6QZWHFG7kWxKAkjz90TiHo960AfoNQ'
   
      axios
      .get(`http://api.training.div3.pgtest.co/api/v1/product/${id}`, { headers: {"Authorization" : `${tokenStr}`}}) 
      .then((response: any)=>{
        setDataPopup(response.data.data);
        console.log(response.data.data);

    
      })
      .catch((error: any)=>{
        console.log(error);
      })
   
  }
    return(
        

      <table className="table table-striped" >
      <thead>
        <tr>
          <th scope="col" className='tableHead'>Status</th>
          <th scope="col" className='tableHead'>Date</th>
          <th scope="col" className='tableHead'>Client</th>
          <th scope="col" className='tableHead'>Currentcy</th>
          <th scope="col" className='tableHead'>Total</th>
          <th scope="col" className='tableHead'>Invoice#</th>
          <th scope="col" className='tableHead'></th>            
        </tr>
      </thead>
      <tbody>
    {currentPosts.map((data: itfData) =>{
      // console.log(new Date(data.createdAt).getTime() / 1000)
      
    return(
        <tr key={data.id}>
          <th scope="row">{data.status}</th>
          <td>{moment(data.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY')}</td>
          <td>{data.client}</td>
          <td>{data.currency}</td>
          <td>{data.total.toLocaleString('de-DE')}</td>
          <td>{data.invoice}</td>
          <td style={{display: 'flex', justifyContent: 'space-around'}}>
            <button onClick={()=> handleViewDetail(data.id)}>
                  ...
            </button>
              


        

            
            
            
            <button type="button" className="btn btn-outline-danger" onClick={() => HandleDelete(data.id)}>delete</button>
            
          </td>
        </tr>
          )})}
      </tbody>

      
      
    </table>
    )

}

export default Table