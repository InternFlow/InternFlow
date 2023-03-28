import React, { useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'react-bootstrap-icons';
import './Accordion.css';

const Accordion = ({ title , children}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item"
   > 
        <button className={isActive? "active accordion-title" : "accordion-title"} onClick={() => setIsActive(!isActive)} >{title} 
        {!isActive ? (<ArrowDownCircle className='accordion-icon'></ArrowDownCircle>) :
        (<ArrowUpCircle  className='accordion-icon'></ArrowUpCircle>)}
      </button> 
      
      {isActive && <div className="accordion-content " >
         
        {children}
        </div>}
    </div> 
  );
};

export default Accordion;