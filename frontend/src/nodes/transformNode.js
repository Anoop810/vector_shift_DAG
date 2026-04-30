import { useState } from 'react';
import { BaseNode } from './baseNode';
import { Select } from '../components/ui/select';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType ?? 'uppercase');

  return (
    <BaseNode
      title="Transform"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        Operation:
        <Select value={transformType} onChange={(e) => setTransformType(e.target.value)}>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
        </Select>
      </label>
    </BaseNode>
  );
};
