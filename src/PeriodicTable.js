import React, { useEffect, useState } from 'react';
import './PeriodicTable.css';
import elementsData from './periodic-table.json';

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    setElements(elementsData.elements);
  }, []);

  return (
    <div className="periodic-table">
      
      
     
        
        {elements.map((element) => (
          <div
            key={element.number}
            className={`element ${element.category}`}
            style={{
              gridRow: element.y, // Position the element in the specified row
              gridColumn: element.x, // Position the element in the specified column
            }}
          >
            <div className="atomic-number">{element.number}</div>
            <div className="symbol">{element.symbol}</div>
            <div className="name">{element.name}</div>
            <div className="atomic-mass">{element.atomic_mass}</div>
            <div className="category">{element.category}</div>
          </div>
        ))}
        
        
    </div>
  );
};

export default PeriodicTable;