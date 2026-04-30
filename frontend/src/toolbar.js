// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="px-4 pt-4">
            <div className="flex flex-wrap gap-2">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='concat' label='Concat' />
                <DraggableNode type='filter' label='Filter' />
            </div>
        </div>
    );
};
