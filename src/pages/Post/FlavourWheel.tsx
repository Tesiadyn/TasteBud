// FlavourWheel.tsx
import React, { useState } from "react";
import { sampleFlavourData, FlavourNode } from "./Post";
import FlavourNodeComponent from "./FlavourNode";

const FlavourWheel: React.FC = () => {
  const [flavourData, setFlavourData] =
    useState<FlavourNode[]>(sampleFlavourData);

  const handleNodeSelect = (nodeId: number) => {
    const updatedData = updateNodeAndAncestors(flavourData, nodeId);
    setFlavourData(updatedData);
  };

  return (
    <div>
      {flavourData.map((topNode) => (
        <FlavourNodeComponent
          key={topNode.id}
          node={topNode}
          onNodeSelect={handleNodeSelect}
        />
      ))}
    </div>
  );
};

export default FlavourWheel;

const updateNodeAndAncestors = (
  data: FlavourNode[],
  nodeId: number
): FlavourNode[] => {
  const updatedData: FlavourNode[] = data.map((node) => {
    if (node.id === nodeId) {
      return {
        ...node,
        selectedCount: node.selectedCount > 0 ? node.selectedCount - 1 : 1,
      };
    } else {
      return {
        ...node,
        children: node.children.map((child) =>
          updateNodeAndDescendants(child, nodeId)
        ),
      };
    }
  });

  return updatedData;
};

const updateNodeAndDescendants = (
  node: FlavourNode,
  targetNodeId: number
): FlavourNode => {
  if (node.id === targetNodeId) {
    return {
      ...node,
      selectedCount: node.selectedCount > 0 ? node.selectedCount - 1 : 1,
    };
  } else {
    return {
      ...node,
      children: node.children.map((child) =>
        updateNodeAndDescendants(child, targetNodeId)
      ),
    };
  }
};
