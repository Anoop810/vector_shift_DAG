// textNode.js

import { useState } from 'react';
import { BaseNode } from './baseNode';
import { Input } from '../components/ui/input';

const variableRegex = /\{\{\s*([^{}\s]+)\s*\}\}/g;

const extractVariables = (text) => {
  const matches = text.matchAll(variableRegex);
  const uniqueVariables = new Set();

  for (const match of matches) {
    uniqueVariables.add(match[1]);
  }

  return Array.from(uniqueVariables);
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text ?? '');
  const variables = extractVariables(currText);
  const inputHandles = variables.map((variable) => ({
    id: `${id}-input-${variable}`,
  }));

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      nodeId={id}
      title="Text"
      inputs={inputHandles}
      outputs={[{ id: `${id}-output` }]}
    >
      <div>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Text:
          <Input
            value={currText} 
            onChange={handleTextChange} 
          />
        </label>
        <div className="mt-1 text-[11px] text-muted-foreground">
          Variables: {variables.length ? variables.join(', ') : 'none'}
        </div>
      </div>
    </BaseNode>
  );
}
