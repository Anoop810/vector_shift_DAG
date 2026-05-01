// inputNode.js

import { useState } from 'react';
import { BaseNode } from './baseNode';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      nodeId={id}
      title="Input"
      outputs={[{ id: `${id}-output` }]}
    >
      <div className="flex flex-col gap-1.5">
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Name:
          <Input
            value={currName} 
            onChange={handleNameChange} 
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Type:
          <Select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </Select>
        </label>
      </div>
    </BaseNode>
  );
}
