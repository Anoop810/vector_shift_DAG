import { Handle, Position } from "reactflow";
import { Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useStore } from "../store";

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
  nodeId,
  title = "Node",
  inputs = [],
  outputs = [],
  children,
}) => {
  const deleteNode = useStore((s) => s.deleteNode);

  return (
    <Card className="w-[220px] min-h-[100px] bg-card/95 backdrop-blur-sm">
      {/* Left Handles */}
      {renderHandles(inputs, "target", Position.Left)}

      {/* Right Handles */}
      {renderHandles(outputs, "source", Position.Right)}

      {/* Header */}
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 border-b py-2">
        <CardTitle className="min-w-0 flex-1 text-base leading-tight">
          {title}
        </CardTitle>
        {nodeId ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 w-7 shrink-0 p-0 text-muted-foreground hover:border-destructive/60 hover:bg-destructive/10 hover:text-destructive"
            aria-label="Delete node"
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(nodeId);
            }}
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
          </Button>
        ) : null}
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-2 text-xs">{children}</CardContent>
    </Card>
  );
};