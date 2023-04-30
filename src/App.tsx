import React, { useEffect, useState, useRef } from 'react';
// import logo from './logo.svg';


import './App.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './app/store';
import { getDataTable, getDataDelete } from './features/table/tableSlice';
import { itfData } from '../src/interface';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { current } from '@reduxjs/toolkit';
import Pagination from './app/components/pagination';
import Table from './app/components/tablePage';
import Avatar from "react-avatar-edit";






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
  const [page, setPage] = useState(1);

  //const upload img




  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerspage] = useState(3);

  
  const indexOfLastPage = currentPage* postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPosts = datas.slice(indexOfFirstPage, indexOfLastPage);
  // const currentPage = d

  

  const [preview, setPreview] = useState(null);
  const [src, setSrc] = useState("./test.png");

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview: any) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (elem: any) => {
    console.log('ok');
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

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


  //upload Immage


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
    let newDatas
    if(newInvoice){
      newDatas = tables.filter((data: any) =>{
        if (data.invoice) return data.invoice.includes(newInvoice);
      })
    }
    else {
      newDatas = [...tables]
    }
    setDatas(newDatas);
   }


const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");



  const handleFromDateChange = (event: any) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: any) => {
    setToDate(event.target.value);
  };


  const filterDates = () => {
    const fromDateWithEndOfDay = fromDate !== "" ? new Date(fromDate) : "";
    const toDateWithEndOfDay = toDate !== "" ? new Date(toDate) : "";

    if (toDateWithEndOfDay !== "") {
      toDateWithEndOfDay.setHours(23, 59, 59, 999);
    }

    if (fromDateWithEndOfDay !== "") {
      fromDateWithEndOfDay.setHours(0, 0, 0, 0);
    }



    return tables.filter((data: any) => {
      return (
        (fromDateWithEndOfDay === "" || new Date(data.createdAt) >= fromDateWithEndOfDay) && (toDateWithEndOfDay === "" || new Date(data.createdAt) <= toDateWithEndOfDay)
      );
    });
  };

   let a :any;
   useEffect(() => {
     if(fromDate && toDate){
      setDatas(filterDates());
    }


   },[fromDate,toDate])
  
  

  // const [dateConvert, setDateConvert] = useState<number>();

  // tables.map((data: any) =>{
  //   let dateData = new Date(data.createdAt).getTime() / 1000
  //   setDateConvert(dateData)
    
  // })
  
 


// console.log(datas)
  // useEffect(()=>{
  //   const fintDate = tables.filter((data: any)=>{
  //     return  
  //   })
  // },[fromConvert, toConvert])






const paginate = (pageNumber: any) =>setCurrentPage(pageNumber)



return(

 
    <div className="App">

<Avatar
  width={390}
  height={295}
  onCrop={onCrop}
  onClose={onClose}
  onBeforeFileLoad={onBeforeFileLoad}
  src={src}
/>
{preview ? <img src={preview} alt="Preview" /> : <div></div>}



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

      <input type="date" className='input' onChange={handleFromDateChange }/>
      <input type="date" className='input' onChange={handleToDateChange }/>
      <input type="text" className='input' onChange={handleChangeInvoice} placeholder='        Invoice'/>
      </div>
          
      <Table currentPosts={currentPosts} HandleDelete={HandleDelete} />
      
      <Pagination postsPerPage={postsPerPage} totalPost={datas.length} paginate={paginate} />


    </div>
    
  );
}

export default App;
