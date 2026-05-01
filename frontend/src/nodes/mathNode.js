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
      <Field>
        <FieldLabel htmlFor={`${id}-operation`}>Operation:</FieldLabel>
        <Select value={operation} onValueChange={setOperation}>
          <SelectTrigger id={`${id}-operation`} className="w-full">
            <SelectValue placeholder="Operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="+">+</SelectItem>
            <SelectItem value="-">-</SelectItem>
            <SelectItem value="*">*</SelectItem>
            <SelectItem value="/">/</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor={`${id}-constant`}>Fallback Constant:</FieldLabel>
        <Input
          id={`${id}-constant`}
          type="number"
          value={constant}
          onChange={(e) => setConstant(e.target.value)}
        />
      </Field>
    </BaseNode>
  );
};
