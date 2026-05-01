// llmNode.js

import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode
      nodeId={id}
      title="LLM"
      inputs={[
        { id: `${id}-system` },
        { id: `${id}-prompt` },
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <span>This is an LLM node.</span>
    </BaseNode>
  );
}
