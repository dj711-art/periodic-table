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
            gridRow: element.y,
            gridColumn: element.x,
          }}
          title={`${element.name} 
          \nElectron Configuration: ${element.electron_configuration}
          \nType: ${element.category}
          \nColor: ${element.color}
          \nPhase: ${element.phase}
          \nDensity: ${element.density}
          \nMelting point: ${element.melting_point}
          \nBoling point: ${element.boiling_point}`} // Add tooltip with electron configuration and element type
        >
          <div className="atomic-number">{element.number}</div>
          <div className="symbol">{element.symbol}</div>
          <div className="name">{element.name}</div>
          <div className="atomic-mass">{element.atomic_mass}</div>
        </div>
      ))}
    </div>
  );
};

export default PeriodicTable;