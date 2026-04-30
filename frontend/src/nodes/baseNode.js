import { Handle, Position } from "reactflow";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const getDistributedTop = (index, total) =>
  `${((index + 1) * 100) / (total + 1)}%`;

/**
 * Handle format:
 * { id: string, style?: object, top?: string }
 */
const renderHandles = (handles = [], type, position) =>
  handles.map((handle, index) => {
    const top = handle.top ?? getDistributedTop(index, handles.length);

    return (
      <Handle
        key={handle.id || `${type}-${index}`}
        id={handle.id || `${type}-${index}`}
        type={type}
        position={position}
        style={{
          top,
          background: "#555",
          ...handle.style,
        }}
      />
    );
  });

export const BaseNode = ({
  title = "Node",
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <Card className="w-[220px] min-h-[100px] bg-card/95 backdrop-blur-sm">
      {/* Left Handles */}
      {renderHandles(inputs, "target", Position.Left)}

      {/* Right Handles */}
      {renderHandles(outputs, "source", Position.Right)}

      {/* Header */}
      <CardHeader className="border-b py-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-2 text-xs">{children}</CardContent>
    </Card>
  );
};