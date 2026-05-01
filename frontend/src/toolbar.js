// toolbar.js

import { DraggableNode } from './draggableNode';
import { ThemeToggle } from './theme-toggle';

export const PipelineToolbar = () => {

    return (
        <div className="px-4 pt-4">
            <div className="flex flex-wrap items-center gap-2">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='concat' label='Concat' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='delay' label='Delay' />
                <div className="ml-auto flex shrink-0 items-center">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
};
