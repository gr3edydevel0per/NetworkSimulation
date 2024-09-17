
# Path Finder

How the algorithm works:
Queue Initialization: The algorithm starts by putting the starting node (start) in a queue. This queue will store the nodes to be explored.

Visited Set: It also keeps track of the nodes that have been visited, ensuring each node is processed only once to avoid cycles.
Predecessor Tracking: The algorithm uses a predecessor object to track the node from which each node was reached. This is essential for backtracking the path once the target node (end) is found.

Exploring Neighbors: For each node, the algorithm explores all its connected neighbors by checking the links. If a connected neighbor hasn't been visited, it is added to the queue, and its predecessor is recorded.

Path Reconstruction: If the target node (end) is reached, the algorithm traces back the path from end to start using the predecessor object.

No Path Found: If the queue is exhausted without reaching the target node, the function returns null.