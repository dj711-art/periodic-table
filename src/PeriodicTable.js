import React, { useEffect, useState } from 'react';
import './PeriodicTable.css';
import elementsData from './periodic-table.json';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    setElements(elementsData.elements);
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceElement = elements[source.index];
    const destinationElement = elements[destination.index];

    // Logic to determine if the elements can form a compound
    alert(`Dropped ${sourceElement.name} on ${destinationElement.name}`);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="periodic-table" direction="horizontal">
        {(provided) => (
          <div
            className="periodic-table"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {elements.map((element, index) => (
              <Draggable key={element.number} draggableId={String(element.number)} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`element ${element.category}`}
                    style={{
                      ...provided.draggableProps.style,
                      gridRow: element.y,
                      gridColumn: element.x,
                      opacity: snapshot.isDragging ? 0.5 : 1,
                    }}
                    title={`Electron Configuration: ${element.electron_configuration}\nType: ${element.category}`} // Add tooltip with electron configuration and element type
                  >
                    <div className="atomic-number">{element.number}</div>
                    <div className="symbol">{element.symbol}</div>
                    <div className="name">{element.name}</div>
                    <div className="atomic-mass">{element.atomic_mass}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PeriodicTable;