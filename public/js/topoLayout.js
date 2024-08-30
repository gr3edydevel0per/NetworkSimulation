function applyStarLayout(nodes, links, width, height) {
    const centerNode = nodes.find(node => node.id.startsWith('s'));
    const outerNodes = nodes.filter(node => node.id.startsWith('h'));
    const radius = Math.min(width, height) / 3;
    const angleStep = (2 * Math.PI) / outerNodes.length;

    nodes.forEach(node => {
        if (node.id === centerNode.id) {
            node.x = width / 2;
            node.y = height / 2;
        } else {
            const index = outerNodes.indexOf(node);
            node.x = width / 2 + radius * Math.cos(index * angleStep);
            node.y = height / 2 + radius * Math.sin(index * angleStep);
        }
    });
}

function applyBusLayout(nodes, links, width, height) {
    const margin = 100;
    const step = (width - 2 * margin) / (nodes.length - 1);

    nodes.forEach((node, index) => {
        node.x = margin + index * step;
        node.y = height / 2;
    });
}

function applyRingLayout(nodes, links, width, height) {
    const radius = Math.min(width, height) / 3;
    const angleStep = (2 * Math.PI) / nodes.length;

    nodes.forEach((node, index) => {
        node.x = width / 2 + radius * Math.cos(index * angleStep);
        node.y = height / 2 + radius * Math.sin(index * angleStep);
    });
}

function applyMeshLayout(nodes, links, width, height) {
    const numRows = Math.ceil(Math.sqrt(nodes.length));
    const numCols = Math.ceil(nodes.length / numRows);
    const cellWidth = width / numCols;
    const cellHeight = height / numRows;

    nodes.forEach((node, index) => {
        const row = Math.floor(index / numCols);
        const col = index % numCols;
        node.x = col * cellWidth + cellWidth / 2;
        node.y = row * cellHeight + cellHeight / 2;
    });
}

function applyTreeLayout(nodes, links, width, height) {
// Create a map for nodes by ID
const nodeMap = new Map(nodes.map(node => [node.id, { id: node.id, children: [] }]));

// Create the root node (assuming s1 is the root)
const rootNode = nodeMap.get('s1');
if (!rootNode) {
console.error('Root node not found');
return;
}

// Build the hierarchical structure
links.forEach(link => {
const parentNode = nodeMap.get(link.source);
const childNode = nodeMap.get(link.target);
if (parentNode && childNode) {
parentNode.children.push(childNode);
} else {
console.warn(`Link from ${link.source} to ${link.target} failed. Node(s) not found.`);
}
});

// Create a d3 hierarchy from the root node
const root = d3.hierarchy(rootNode);

// Apply the tree layout
const treeLayout = d3.tree().size([width, height]);
treeLayout(root);

// Update nodes' positions
root.descendants().forEach(d => {
const node = nodeMap.get(d.data.id);
if (node) {
node.x = d.x;
node.y = d.y;
}
});

// Log node positions for debugging
console.log('Node positions:', root.descendants().map(d => ({ id: d.data.id, x: d.x, y: d.y })));
}


function applyFullyConnectedLayout(nodes, links, width, height) {
    const radius = Math.min(width, height) / 3;
    const angleStep = (2 * Math.PI) / nodes.length;

    nodes.forEach((node, index) => {
        node.x = width / 2 + radius * Math.cos(index * angleStep);
        node.y = height / 2 + radius * Math.sin(index * angleStep);
    });
}