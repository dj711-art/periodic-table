import React, { useEffect, useState } from 'react';
import './PeriodicTable.css';
import elementsData from './periodic-table.json';
import Element from './Element';

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    setElements(elementsData.elements);
  }, []);

  return (
    <div className="periodic-table">
      {elements.map((element) => (
        <Element key={element.number} element={element} />
      ))}
    </div>
  );
};

export default PeriodicTable;