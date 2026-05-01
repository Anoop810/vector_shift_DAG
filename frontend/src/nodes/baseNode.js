import { Handle, Position } from "reactflow";
import { ChevronDown, ChevronUp, Copy, Trash2 } from "lucide-react";
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
  const duplicateNode = useStore((s) => s.duplicateNode);
  const toggleNodeCollapsed = useStore((s) => s.toggleNodeCollapsed);
  const isCollapsed = useStore(
    (s) => s.nodes.find((node) => node.id === nodeId)?.data?.collapsed ?? false
  );

  return (
    <Card className="w-[220px] min-h-[100px] border-2 border-slate-400 bg-card/95 shadow-[0_1px_2px_rgba(15,23,42,0.1)] backdrop-blur-sm dark:border-slate-600 dark:shadow-sm">
      {/* Left Handles */}
      {renderHandles(inputs, "target", Position.Left)}

      {/* Right Handles */}
      {renderHandles(outputs, "source", Position.Right)}

      {/* Header */}
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 border-b border-slate-400 py-2 dark:border-slate-600">
        <CardTitle className="min-w-0 flex-1 text-base leading-tight">
          {title}
        </CardTitle>
        {nodeId ? (
          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground"
              aria-label={isCollapsed ? "Expand node" : "Collapse node"}
              title={isCollapsed ? "Expand node" : "Collapse node"}
              onClick={(e) => {
                e.stopPropagation();
                toggleNodeCollapsed(nodeId);
              }}
            >
              {isCollapsed ? (
                <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <ChevronUp className="h-3.5 w-3.5" aria-hidden />
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground"
              aria-label="Duplicate node"
              title="Duplicate node"
              onClick={(e) => {
                e.stopPropagation();
                duplicateNode(nodeId);
              }}
            >
              <Copy className="h-3.5 w-3.5" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground hover:border-destructive/60 hover:bg-destructive/10 hover:text-destructive"
              aria-label="Delete node"
              title="Delete node"
              onClick={(e) => {
                e.stopPropagation();
                deleteNode(nodeId);
              }}
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
            </Button>
          </div>
        ) : null}
      </CardHeader>

      {/* Content */}
      {!isCollapsed ? (
        <CardContent className="space-y-2 text-xs">{children}</CardContent>
      ) : null}
    </Card>
  );
};