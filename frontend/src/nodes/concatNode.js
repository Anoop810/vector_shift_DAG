import { BaseNode } from "./baseNode";
import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { useNodeField } from "./useNodeField";

export const ConcatNode = ({ id, data }) => {
  const [separator, setSeparator] = useNodeField(id, data, "separator", " ");

  return (
    <BaseNode
      nodeId={id}
      title="Concat"
      inputs={[{ id: `${id}-first` }, { id: `${id}-second` }, { id: `${id}-third` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <Field>
        <FieldLabel htmlFor={`${id}-separator`}>Separator:</FieldLabel>
        <Input
          id={`${id}-separator`}
          type="text"
          value={separator}
          onChange={(e) => setSeparator(e.target.value)}
        />
      </Field>
    </BaseNode>
  );
};
