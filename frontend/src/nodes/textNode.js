// textNode.js

import { BaseNode } from "./baseNode";
import { Field, FieldDescription, FieldLabel } from "../components/ui/field";
import { useLayoutEffect, useMemo, useRef } from "react";
import { useNodeField } from "./useNodeField";

const variableRegex = /\{\{\s*([^{}\s]+)\s*\}\}/g;

const extractVariables = (text) => {
  const matches = text.matchAll(variableRegex);
  const uniqueVariables = new Set();

  for (const match of matches) {
    uniqueVariables.add(match[1]);
  }

  return Array.from(uniqueVariables);
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useNodeField(id, data, "text", "");
  const textareaRef = useRef(null);
  const variables = extractVariables(currText);
  const inputHandles = variables.map((variable) => ({
    id: `${id}-input-${variable}`,
  }));
  const textWidth = useMemo(() => {
    const lines = currText.split("\n");
    const longestLineLength = lines.reduce(
      (maxLength, line) => Math.max(maxLength, line.length),
      0
    );

    return Math.min(Math.max(longestLineLength * 7 + 36, 180), 420);
  }, [currText]);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const nextHeight = Math.min(Math.max(textarea.scrollHeight, 64), 220);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > 220 ? "auto" : "hidden";
  }, [currText]);

  return (
    <BaseNode
      nodeId={id}
      title="Text"
      inputs={inputHandles}
      outputs={[{ id: `${id}-output` }]}
    >
      <Field>
        <FieldLabel htmlFor={`${id}-text`}>Text:</FieldLabel>
        <textarea
          id={`${id}-text`}
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          className="max-w-full resize-none rounded-md border border-input bg-background px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ width: `${textWidth}px` }}
          rows={1}
        />
        <FieldDescription>
          Variables: {variables.length ? variables.join(", ") : "none"}
        </FieldDescription>
      </Field>
    </BaseNode>
  );
};
