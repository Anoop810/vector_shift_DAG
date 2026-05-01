// inputNode.js

import { BaseNode } from "./baseNode";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { useNodeField } from "./useNodeField";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useNodeField(
    id,
    data,
    "inputName",
    id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useNodeField(id, data, "inputType", "Text");

  return (
    <BaseNode
      nodeId={id}
      title="Input"
      outputs={[{ id: `${id}-output` }]}
    >
      <div className="flex flex-col gap-1.5">
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Name:
          <Input value={currName} onChange={(e) => setCurrName(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Type:
          <Select value={inputType} onChange={(e) => setInputType(e.target.value)}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </Select>
        </label>
      </div>
    </BaseNode>
  );
};
