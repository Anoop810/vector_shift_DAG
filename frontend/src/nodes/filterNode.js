import { BaseNode } from "./baseNode";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { useNodeField } from "./useNodeField";

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useNodeField(id, data, "condition", "value > 0");
  const [mode, setMode] = useNodeField(id, data, "mode", "keep");

  return (
    <BaseNode
      nodeId={id}
      title="Filter"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-pass` }, { id: `${id}-fail` }]}
    >
      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        Condition:
        <Input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} />
      </label>
      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        Mode:
        <Select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="keep">Keep matching</option>
          <option value="drop">Drop matching</option>
        </Select>
      </label>
    </BaseNode>
  );
};
