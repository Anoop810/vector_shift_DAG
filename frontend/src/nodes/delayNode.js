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
      <Field>
        <FieldLabel htmlFor={`${id}-duration`}>Duration:</FieldLabel>
        <Input
          id={`${id}-duration`}
          type="number"
          min="0"
          className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor={`${id}-unit`}>Unit:</FieldLabel>
        <Select value={unit} onValueChange={setUnit}>
          <SelectTrigger id={`${id}-unit`} className="w-full">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ms">Milliseconds</SelectItem>
            <SelectItem value="s">Seconds</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </BaseNode>
  );
};
