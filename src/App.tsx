import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './app/store';
import { getDataTable, getDataDelete } from './features/table/tableSlice';
import { itfData } from '../src/interface';
import { PaginationControl } from 'react-bootstrap-pagination-control';


function App() {
  
  const tables = useSelector((state: RootState) => state.table.tables);
  const dispatch = useDispatch()
  const tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4MjE2MzAxOH0.1OHw4SAkI8-9f6QZWHFG7kWxKAkjz90TiHo960AfoNQ'
  
  const [filterSatus, setFilterSatus] = React.useState(['','RECEIVED','PENDING','FULFILLED']);
  const [fiterClient, setFilterClient] = React.useState(['','Chrome','google']);
  const [filterFrom, setFilterFrom] = React.useState([]);
  const [filterTo, setFilterTo] = React.useState([]);
  const [filterInvoice, setFilterInvoice] = React.useState('');
  const [datas, setDatas] = React.useState([]);
  const [selected, setSelected] = useState(filterSatus[0]);
  const [selectClient, setSelectClient] = useState(fiterClient[0]);
  const [page, setPage] = useState(1)

  const getDatas =  () => {
    axios
    .get("http://api.training.div3.pgtest.co/api/v1/product", { headers: {"Authorization" : `${tokenStr}`}})
    .then((response)=>{
      dispatch(getDataTable(response.data.data))
      setDatas(response.data.data)
     
      
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  React.useEffect(()=>{
    getDatas()
  },[])


  var HandleDelete = (id: number) =>{   
      axios
      .delete(`http://api.training.div3.pgtest.co/api/v1/product/${id}`, { headers: {"Authorization" : `${tokenStr}`}})
      .then((response)=>{
        dispatch(getDataDelete)
        console.log(response);
    
      })
      .catch((error)=>{
        console.log(error);
      })

      getDatas();

      setDatas((datas) => {
        return datas.filter((data: any, index ) => data.status === selected)
      })

      setDatas((datas) => {
        return datas.filter((data: any, index ) => data.client === selectClient)
      })

     
  }

  const handleChangeStatus = (e: any) => {
    const newStatus = e.target.value;
    setSelected(newStatus);
    const newDatats = tables.filter((data: any, index: number) =>{
      return data.status === newStatus
    })
    setDatas(newDatats)
    
  }
  const handleChangeClient = (e: any) => {
    const newClient = e.target.value;
    console.log(newClient)
    setSelectClient(newClient);
    let newDatas: any = []
    newDatas = tables.filter((data: any, index: number) =>{
      return data.client === newClient 
    })
    let updateDatas = newDatas
    if (selected) {
      updateDatas = datas.filter((data: any, index: number) =>{
        return data.client === newClient 
      })
      
    }
    
    
    setDatas(updateDatas)
    
  }

  const handleChangeInvoice = (e: any) =>{
    const newInvoice = e.target.value;
    console.log(newInvoice);
    let newDatas = tables.filter((data: any) =>{
      return data.invoice === newInvoice;
    })

    setDatas(newDatas);
    

    
  }

  let date: Date = new Date("2023-04-25T11:58:06.000Z")
  console.log(date)


return(
  
    <div className="App">

      <div className='inSearch'>
     
      <select className="form-select input" aria-label="Default select example" value={selected} onChange={handleChangeStatus}>
        {filterSatus.map((status, index) => {
          return (
            
            <option value={status} key={index}>{status}</option>
          )
        })}
      
        
      </select>

      <select className="form-select input" aria-label="Default select example" value={selectClient} onChange={handleChangeClient}>
        
      {fiterClient.map((client, index) => {
          return (
            <option value={client} key={index} >{client}</option>
          )
        })}
        
      </select>

      <input type="date" className='input'/>
      <input type="date" className='input'/>
      <input type="text" className='input' onChange={handleChangeInvoice} placeholder='        Invoice'/>
      </div>
          


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
      {datas.map((data: itfData) =>{
        // console.log(tables)
      return(
          <tr key={data.id}>
            <th scope="row">{data.status}</th>
            <td>{data.id}</td>
            <td>{data.client}</td>
            <td>{data.currency}</td>
            <td>{data.total}</td>
            <td>{data.invoice}</td>
            <td style={{display: 'flex', justifyContent: 'space-around'}}>
              <button>overview</button>
              <button onClick={() => HandleDelete(data.id)}>delete</button>
              
            </td>
          </tr>
            )})}
        </tbody>


      </table>
      
      <PaginationControl
    page={page}
    between={4}
    total={datas.length}
    limit={8}
    changePage={(page) => {
      setPage(page); 
      console.log(page)
    }}
    ellipsis={1}
  />
      <div>
        
      </div>
    </div>
  );
}

export default App;
