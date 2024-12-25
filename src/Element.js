import React, { useState, useRef, useEffect } from 'react';
import './PeriodicTable.css';

const Element = ({ element }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ vertical: 'bottom', horizontal: 'center' });
  const elementRef = useRef(null);

  useEffect(() => {
    const handlePosition = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const newPosition = { vertical: 'bottom', horizontal: 'center' };

        if (rect.top < 150) {
          newPosition.vertical = 'top';
        } else {
          newPosition.vertical = 'bottom';
        }

        if (rect.left < 100) {
          newPosition.horizontal = 'left';
        } else if (rect.right > window.innerWidth - 100) {
          newPosition.horizontal = 'right';
        } else {
          newPosition.horizontal = 'center';
        }

        setTooltipPosition(newPosition);
      }
    };

    handlePosition();
    window.addEventListener('resize', handlePosition);
    return () => window.removeEventListener('resize', handlePosition);
  }, []);

  const formatElectronConfiguration = (config) => {
    return config.replace(/([spdf])(\d+)/g, '$1<sup>$2</sup>');
  };

  const formatCompound = (compound) => {
    return compound.replace(/(\d+)/g, '<sub>$1</sub>');
  };

  return (
    <div
      id={element.number}
      className={`element ${element.category}`}
      style={{
        gridRow: element.y,
        gridColumn: element.x,
      }}
      ref={elementRef}
    >
      <div className="atomic-number">{element.number}</div>
      <div className="symbol">{element.symbol}</div>
      <div className="atomic-mass">{element.atomic_mass}</div>
      <div className={`tooltip ${tooltipPosition.vertical} ${tooltipPosition.horizontal} ${element.category}`}>
        <strong>{element.name}</strong><br />
        Electron Configuration: <span dangerouslySetInnerHTML={{ __html: formatElectronConfiguration(element.electron_configuration) }} /><br />
        Type: {element.category}<br />
        Color: {element.color}<br />
        Phase: {element.phase}<br />
        Density: {element.density}<br />
        Melting Point: {element.melting_point}<br />
        Boiling Point: {element.boiling_point}<br />
        
      </div>
    </div>
  );
};

export default Element;