import { BaseNode } from "./baseNode";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { useNodeField } from "./useNodeField";

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useNodeField(id, data, "operation", "+");
  const [constant, setConstant] = useNodeField(id, data, "constant", "0");

  return (
    <BaseNode
      nodeId={id}
      title="Math"
      inputs={[{ id: `${id}-left` }, { id: `${id}-right` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        Operation:
        <Select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </Select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        Fallback Constant:
        <Input type="number" value={constant} onChange={(e) => setConstant(e.target.value)} />
      </label>
    </BaseNode>
  );
};
