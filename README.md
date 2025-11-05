# knights-travails

An implementation of a <em>shortest path</em> function on graph that's undirected and non-weighted. This is implemented via BFS with some additional bookkeeping to avoid looping and allow retracing a path. 

The graph represents the possible moves a knight can make on a chessboard. It's worth noting since a knight can (provably) travel between any two squares, the graph here is wholely connected.