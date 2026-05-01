import { BaseNode } from "./baseNode";
import { Field, FieldLabel } from "../components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNodeField } from "./useNodeField";

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useNodeField(
    id,
    data,
    "transformType",
    "uppercase"
  );

  return (
    <BaseNode
      nodeId={id}
      title="Transform"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <Field>
        <FieldLabel htmlFor={`${id}-transform-op`}>Operation:</FieldLabel>
        <Select value={transformType} onValueChange={setTransformType}>
          <SelectTrigger id={`${id}-transform-op`} className="w-full">
            <SelectValue placeholder="Operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uppercase">Uppercase</SelectItem>
            <SelectItem value="lowercase">Lowercase</SelectItem>
            <SelectItem value="trim">Trim</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </BaseNode>
  );
};
