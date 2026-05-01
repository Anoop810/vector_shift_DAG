import { BaseNode } from "./baseNode";
import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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
      <Field>
        <FieldLabel htmlFor={`${id}-condition`}>Condition:</FieldLabel>
        <Input
          id={`${id}-condition`}
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor={`${id}-mode`}>Mode:</FieldLabel>
        <Select value={mode} onValueChange={setMode}>
          <SelectTrigger id={`${id}-mode`} className="w-full">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="keep">Keep matching</SelectItem>
            <SelectItem value="drop">Drop matching</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </BaseNode>
  );
};
