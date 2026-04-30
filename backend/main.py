import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO, format='[%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelinePayload(BaseModel):
    nodes: list
    edges: list


def is_dag(nodes, edges):
    graph = {node["id"]: [] for node in nodes}

    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        if source in graph and target in graph:
            graph[source].append(target)

    visited = set()
    path = set()

    def dfs(node):
        if node in path:
            return False

        if node in visited:
            return True

        path.add(node)

        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False

        path.remove(node)
        visited.add(node)

        return True

    for node in graph:
        if node not in visited:
            if not dfs(node):
                return False

    return True


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)

    dag = is_dag(payload.nodes, payload.edges)
    logger.info(
        'Pipeline parsed | nodes=%d edges=%d is_dag=%s',
        num_nodes,
        num_edges,
        dag,
    )

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag
    }
