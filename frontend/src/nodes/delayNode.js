import { BaseNode } from "./baseNode";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { useNodeField } from "./useNodeField";

export const DelayNode = ({ id, data }) => {
  const [duration, setDuration] = useNodeField(id, data, "duration", "1000");
  const [unit, setUnit] = useNodeField(id, data, "unit", "ms");

  return (
    <BaseNode
      nodeId={id}
      title="Delay"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        Duration:
        <Input
          type="number"
          min="0"
          className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        Unit:
        <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="ms">Milliseconds</option>
          <option value="s">Seconds</option>
        </Select>
      </label>
    </BaseNode>
  );
};
