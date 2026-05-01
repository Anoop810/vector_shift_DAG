// outputNode.js

import { BaseNode } from "./baseNode";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { useNodeField } from "./useNodeField";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useNodeField(
    id,
    data,
    "outputName",
    id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useNodeField(id, data, "outputType", "Text");

  return (
    <BaseNode
      nodeId={id}
      title="Output"
      inputs={[{ id: `${id}-input` }]}
    >
      <div className="flex flex-col gap-1.5">
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Name:
          <Input value={currName} onChange={(e) => setCurrName(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Type:
          <Select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </Select>
        </label>
      </div>
    </BaseNode>
  );
};
