// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`${type} flex h-11 min-w-[96px] cursor-grab items-center justify-center rounded-md border bg-card px-3 text-sm font-medium text-card-foreground shadow-sm transition hover:bg-muted`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{
          minWidth: '96px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          background: '#fff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
          cursor: 'grab',
          padding: '0 12px',
          fontSize: '14px',
          fontWeight: 500,
        }}
        draggable
      >
          <span>{label}</span>
      </div>
    );
  };
  