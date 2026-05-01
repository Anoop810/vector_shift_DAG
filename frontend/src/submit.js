// submit.js

import { useState } from 'react';
import { toast } from 'sonner';
import { useStore } from './store';
import { Button } from './components/ui/button';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError('');

        try {
            const cleanNodes = nodes.map((node) => ({ id: node.id }));
            const cleanEdges = edges.map((edge) => ({
                source: edge.source,
                target: edge.target,
            }));

            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes: cleanNodes, edges: cleanEdges }),
            });

            if (!response.ok) {
                throw new Error(`Backend returned ${response.status}`);
            }

            const data = await response.json();
            toast.success('Pipeline parsed', {
                description: (
                    <span className="block whitespace-pre-line text-left text-sm">
                        {`Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nDAG: ${data.is_dag}`}
                    </span>
                ),
                duration: 6000,
            });
        } catch (err) {
            setError(err.message || 'Request failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 pb-4">
            <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
    );
}
