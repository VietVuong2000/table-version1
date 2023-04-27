
import React, {useEffect, useState} from "react";

interface Props {
    postsPerPage: number,
    totalPost: number,
    paginate: any
  }
 

  
  const Pagination: React.FC<Props> = ({postsPerPage, totalPost, paginate}) =>{
    const [pageNumber, setPageNumber] = useState<number[]>([]);
    useEffect(()=>{
        setPageNumber([]);
    }, [totalPost])
      
    for(let i=1; i <= Math.ceil(totalPost / postsPerPage); i++){
          pageNumber.push(i);
        }
        
    const newPageNumber= [...new Set(pageNumber)];
    
      
  
    return(
        
          <nav>
              <ul className="pagination">
                  {newPageNumber.map(number =>(
                      <li key={number} className="page-item">
                        <a href="!#" className="page-link" onClick={()=>paginate(number)}>{number}</a>
                      </li>
                  ))}
              </ul>
          </nav>
      )
  }
  
  export default Pagination;


