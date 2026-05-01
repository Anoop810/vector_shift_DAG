import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import { X } from 'lucide-react';
import { useTheme } from '../theme-context';
import { useStore } from '../store';

const sanitizeMarkerId = (raw) => String(raw).replace(/[^a-zA-Z0-9_-]/g, '_');

export default function PipelineEdge({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
}) {
  const removeEdge = useStore((s) => s.removeEdge);
  const { theme } = useTheme();
  const stroke = theme === 'dark' ? '#c4b5fd' : '#a78bfa';
  const markerRingFill = theme === 'dark' ? 'hsl(222.2 84% 6.5%)' : '#ffffff';

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.25,
  });

  const markerId = `pipeline-edge-end-${sanitizeMarkerId(id)}`;

  return (
    <>
      <defs>
        <marker
          id={markerId}
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
        >
          <circle
            cx="6"
            cy="6"
            r="5"
            fill={markerRingFill}
            stroke={stroke}
            strokeWidth="1.5"
          />
          <circle cx="6" cy="6" r="2" fill={stroke} />
        </marker>
      </defs>
      <BaseEdge
        path={edgePath}
        markerEnd={`url(#${markerId})`}
        style={{
          stroke,
          strokeWidth: 2,
          strokeDasharray: '6 5',
        }}
      />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan pointer-events-auto"
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <button
            type="button"
            aria-label="Remove edge"
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 bg-background shadow-sm transition hover:opacity-90"
            style={{ borderColor: stroke, color: stroke }}
            onClick={(e) => {
              e.stopPropagation();
              removeEdge(id);
            }}
          >
            <X className="h-3 w-3" strokeWidth={2.5} />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
