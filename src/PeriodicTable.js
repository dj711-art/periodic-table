import React, { useEffect, useState } from 'react';
import './PeriodicTable.css';
import elementsData from './periodic-table.json';
import Element from './Element';

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    // Initialize elements with clicked state
    const elementsWithState = elementsData.elements.map(element => ({
      ...element,
      clicked: false
    }));
    setElements(elementsWithState);
  }, []);

  const handleDoubleClick = (element) => {
    setElements(prevElements =>
      prevElements.map(el => {
        if (el.number === element.number) {
          return { ...el, clicked: !el.clicked };
        } else if (element.reactivity && element.reactivity.some(reaction => reaction.number === el.number)) {
          return { ...el, clicked: !el.clicked };
        } else {
          return el;
        }
      })
    );

    if (element.isotopes && element.isotopes.trim() !== "") {
      setSelectedElement(element);
    } else {
      setSelectedElement(null);
    }
  };

  const formatIsotopes = (isotopes) => {
    return isotopes.replace(/(\d+)/g, '<sup>$1</sup>');
  };

  const formatCompound = (compound) => {
    return compound.replace(/(\d+)/g, '<sub>$1</sub>');
  };

  const getElementName = (number) => {
    const element = elements.find(el => el.number === number);
    return element ? element.name : number;
  };

  return (
    <div className="periodic-table">
      {elements.map((element) => (
        <Element key={element.number} element={element} onDoubleClick={() => handleDoubleClick(element)} />
      ))}
      {selectedElement && (
        <div className="details">
          <div className="isotopes">
            <h3>Isotopes</h3>
            <ul>
              {selectedElement.isotopes.split(', ').map((isotope, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: formatIsotopes(isotope) }} />
              ))}
            </ul>
          </div>
          <div className="discovery">
            <p>Discovery Date: {selectedElement["discovery date"]}</p>
            <p>Discovered By: {selectedElement["discovered by"]}</p>
          </div>
          {selectedElement.reactivity && (
            <div className="reactivity">
              <h3>Reactivity</h3>
              <ul>
                {selectedElement.reactivity.map((reaction, index) => (
                  <li key={index}>
                    Reacts with {getElementName(reaction.number)} to form <span dangerouslySetInnerHTML={{ __html: formatCompound(reaction.compound) }} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;