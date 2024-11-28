import React, { useEffect, useState } from 'react';
import './PeriodicTable.css';
import elementsData from './periodic-table.json';

const PeriodicTable = () => {
  console.log(elementsData);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    setElements(elementsData.elements);
  }, []);

  return (
    <div className="periodic-table">
      
      
      <div className="table">
        <td>
        {elements.map((element) => (
          <div
            key={element.number}
            className={`element ${element.category}`}
            style={{
              gridRow: element.y,
              gridColumn: element.x,
            }}
          >
            <div className="atomic-number">{element.number}</div>
            <div className="symbol">{element.symbol}</div>
            <div className="name">{element.name}</div>
            <div className="atomic-mass">{element.atomic_mass}</div>
          </div>
        ))}
        </td>
        </div>
    </div>
  );
};

export default PeriodicTable;