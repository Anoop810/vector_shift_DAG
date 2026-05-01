import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, ...props }) {
  return (
    <div
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col space-y-1.5 p-3 pb-2', className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <div className={cn('text-sm font-semibold', className)} style={{ fontWeight: 600, ...(props.style || {}) }} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-3 pt-1', className)} {...props} />;
}
