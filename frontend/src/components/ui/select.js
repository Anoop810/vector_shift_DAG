import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Select({ className, children, ...props }) {
  const normalizedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || child.type !== 'option') {
      return child;
    }

    return React.cloneElement(child, {
      className: cn('bg-card text-foreground', child.props.className),
      style: {
        backgroundColor: 'hsl(var(--card))',
        color: 'hsl(var(--foreground))',
        ...child.props.style,
      },
    });
  });

  return (
    <div className="relative">
      <select
        className={cn(
          'flex h-9 w-full appearance-none rounded-md border border-slate-400 bg-card pl-3 pr-9 py-1.5 text-sm text-foreground shadow-sm outline-none transition-colors',
          'hover:border-primary/60 hover:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {normalizedChildren}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  );
}
