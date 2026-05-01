import { useCallback } from "react";
import { useStore } from "../store";

export const useNodeField = (nodeId, data, fieldName, fallbackValue = "") => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const value = data?.[fieldName] ?? fallbackValue;

  const setValue = useCallback(
    (nextValue) => {
      updateNodeField(nodeId, fieldName, nextValue);
    },
    [fieldName, nodeId, updateNodeField]
  );

  return [value, setValue];
};
