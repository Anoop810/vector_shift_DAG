// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Backend returned ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message || 'Request failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            {result && <div>{`Status: ${result.status} | Nodes: ${result.num_nodes} | Edges: ${result.num_edges}`}</div>}
            {error && <div style={{ color: 'crimson' }}>{error}</div>}
        </div>
    );
}
