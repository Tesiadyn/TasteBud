import React from 'react';
import { FlavourNodeProps } from './Post';



const FlavourNodeComponent: React.FC<FlavourNodeProps> = ({ node, onNodeSelect }) => {
  const { id, name, selectedCount, children } = node;

  const handleSelect = () => {
    onNodeSelect(id);
  };

  return (
    <div>
      <label>
        <input 
        type="checkbox" 
        checked={selectedCount > 0} 
        onChange={handleSelect} />
        {name} ({selectedCount})
      </label>
      {children.map((child) => (
        <FlavourNodeComponent 
        key={child.id} 
        node={child} 
        onNodeSelect={onNodeSelect} />
      ))}
    </div>
  );
};

export default FlavourNodeComponent;
