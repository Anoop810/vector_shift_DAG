// inputNode.js

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
      <Field>
        <FieldLabel htmlFor={`${id}-name`}>Name:</FieldLabel>
        <Input id={`${id}-name`} value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </Field>
      <Field>
        <FieldLabel htmlFor={`${id}-input-type`}>Type:</FieldLabel>
        <Select value={inputType} onValueChange={setInputType}>
          <SelectTrigger id={`${id}-input-type`} className="w-full">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="File">File</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </BaseNode>
  );
};
