// outputNode.js

import { useState } from 'react';
import { BaseNode } from './baseNode';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      nodeId={id}
      title="Output"
      inputs={[{ id: `${id}-input` }]}
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
          <Select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </Select>
        </label>
      </div>
    </BaseNode>
  );
}
