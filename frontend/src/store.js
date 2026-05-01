// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    deleteNode: (nodeId) => {
        set({
            nodes: get().nodes.filter((n) => n.id !== nodeId),
            edges: get().edges.filter(
                (e) => e.source !== nodeId && e.target !== nodeId
            ),
        });
    },
    duplicateNode: (nodeId) => {
        const nodes = get().nodes;
        const nodeToDuplicate = nodes.find((node) => node.id === nodeId);
        if (!nodeToDuplicate) return;

        const duplicatedNodeId = get().getNodeID(nodeToDuplicate.type);
        const offsetStep = 40;
        const maxAttempts = 30;
        let attempt = 1;
        let nextPosition = {
            x: nodeToDuplicate.position.x + offsetStep,
            y: nodeToDuplicate.position.y + offsetStep,
        };

        while (
            attempt <= maxAttempts &&
            nodes.some(
                (node) =>
                    Math.abs(node.position.x - nextPosition.x) < 1 &&
                    Math.abs(node.position.y - nextPosition.y) < 1
            )
        ) {
            attempt += 1;
            nextPosition = {
                x: nodeToDuplicate.position.x + offsetStep * attempt,
                y: nodeToDuplicate.position.y + offsetStep * attempt,
            };
        }

        const duplicatedNode = {
            ...nodeToDuplicate,
            id: duplicatedNodeId,
            position: nextPosition,
            data: {
                ...nodeToDuplicate.data,
                id: duplicatedNodeId,
            },
            selected: false,
            dragging: false,
        };

        set({
            nodes: [...get().nodes, duplicatedNode],
        });
    },
    toggleNodeCollapsed: (nodeId) => {
        set({
            nodes: get().nodes.map((node) =>
                node.id === nodeId
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            collapsed: !node.data?.collapsed,
                        },
                    }
                    : node
            ),
        });
    },
    removeEdge: (edgeId) => {
        set({
            edges: get().edges.filter((e) => e.id !== edgeId),
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({ ...connection, type: 'pipeline' }, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: { ...node.data, [fieldName]: fieldValue },
              }
            : node
        ),
      });
    },
  }));
