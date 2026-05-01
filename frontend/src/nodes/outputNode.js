// outputNode.js

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
      <Field>
        <FieldLabel htmlFor={`${id}-name`}>Name:</FieldLabel>
        <Input id={`${id}-name`} value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </Field>
      <Field>
        <FieldLabel htmlFor={`${id}-output-type`}>Type:</FieldLabel>
        <Select value={outputType} onValueChange={setOutputType}>
          <SelectTrigger id={`${id}-output-type`} className="w-full">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="File">Image</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </BaseNode>
  );
};
