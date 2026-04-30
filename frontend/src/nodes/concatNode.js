import { useState } from 'react';
import { BaseNode } from './baseNode';
import { Input } from '../components/ui/input';

export const ConcatNode = ({ id, data }) => {
  const [separator, setSeparator] = useState(data?.separator ?? ' ');

  return (
    <BaseNode
      title="Concat"
      inputs={[{ id: `${id}-first` }, { id: `${id}-second` }, { id: `${id}-third` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        Separator:
        <Input type="text" value={separator} onChange={(e) => setSeparator(e.target.value)} />
      </label>
    </BaseNode>
  );
};
