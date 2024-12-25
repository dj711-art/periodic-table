import React, { useEffect, useState } from 'react';
import './PeriodicTable.css';
import elementsData from './periodic-table.json';
import Element from './Element';

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);
  const [selectedIsotopes, setSelectedIsotopes] = useState(null);

  useEffect(() => {
    // Initialize elements with clicked state
    const elementsWithState = elementsData.elements.map(element => ({
      ...element,
      clicked: false
    }));
    setElements(elementsWithState);
  }, []);

  const handleDoubleClick = (element) => {
    if (element.isotopes && element.isotopes.trim() !== "") {
      setSelectedIsotopes(element.isotopes);
    } else {
      setSelectedIsotopes(null);
    }
    
  };

  const formatIsotopes = (isotopes) => {
    return isotopes.replace(/(\d+)/g, '<sup>$1</sup>');
  };

  return (
    <div className="periodic-table">
      {elements.map((element) => (
        <Element key={element.number} element={element} onDoubleClick={() => handleDoubleClick(element)}  />
      ))}
      {selectedIsotopes && (
        <div className="isotopes">
          <h3>Isotopes</h3>
          <ul>
            {selectedIsotopes.split(', ').map((isotope, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: formatIsotopes(isotope) }} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;