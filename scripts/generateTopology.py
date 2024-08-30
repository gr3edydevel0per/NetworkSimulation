from mininet.topo import Topo
from mininet.net import Mininet
from mininet.node import OVSBridge
from mininet.log import setLogLevel, info, error
import json
import itertools

class BusTopo(Topo):
    def build(self, n=5):
        switch = self.addSwitch('s1')
        for i in range(1, n+1):
            host = self.addHost(f'h{i}')
            self.addLink(host, switch)

class StarTopo(Topo):
    def build(self, n=5):
        switch = self.addSwitch('s1')
        for i in range(1, n+1):
            host = self.addHost(f'h{i}')
            self.addLink(host, switch)

class RingTopo(Topo):
    def build(self, n=5):
        switches = []
        for i in range(1, n+1):
            switch = self.addSwitch(f's{i}')
            host = self.addHost(f'h{i}')
            self.addLink(host, switch)
            switches.append(switch)
        for i in range(n):
            self.addLink(switches[i], switches[(i+1) % n])

class MeshTopo(Topo):
    def build(self, n=4):
        hosts = [self.addHost(f'h{i}') for i in range(1, n+1)]
        for h1, h2 in itertools.combinations(hosts, 2):
            self.addLink(h1, h2)

class TreeTopo(Topo):
    def build(self, n=7):
        if n < 4:
            raise ValueError("Number of nodes should be at least 4 for a tree topology.")

        root = self.addSwitch('s1')
        level_1 = [self.addSwitch('s2')]
        level_2 = [self.addSwitch('s3')]
        
        # Create level_1 switches and connect them to root
        self.addLink(level_1[0], root)
        
        # Create level_2 switches and connect them to level_1 switches
        self.addLink(level_2[0], level_1[0])
        
        # Add hosts and connect them to level_2 switches
        hosts = [self.addHost(f'h{i}') for i in range(1, n+1)]
        for i, host in enumerate(hosts):
            self.addLink(host, level_2[i % len(level_2)])

class FullyConnectedTopo(Topo):
    def build(self, n=4):
        nodes = [self.addHost(f'h{i}') for i in range(1, n+1)]
        for h1, h2 in itertools.combinations(nodes, 2):
            self.addLink(h1, h2)

def export_topology(net, filename):
    nodes = []
    links = []

    for host in net.hosts:
        nodes.append({'id': host.name, 'group': 'host'})

    for switch in net.switches:
        nodes.append({'id': switch.name, 'group': 'switch'})

    for link in net.links:
        links.append({'source': link.intf1.node.name, 'target': link.intf2.node.name})

    topology = {'nodes': nodes, 'links': links}

    try:
        with open(filename, '+w') as f:
            json.dump(topology, f, indent=2)
        info(f'*** Topology saved as {filename}\n')
    except Exception as e:
        error(f'Error saving topology as {filename}: {e}\n')

def generate_topology(topo_class, filename):
    topo = topo_class()
    net = Mininet(topo=topo, switch=OVSBridge, controller=None)
    try:
        net.start()
        export_topology(net, filename)
    except Exception as e:
        error(f'Error generating topology: {e}\n')
    finally:
        net.stop()

if __name__ == '__main__':
    setLogLevel('info')

    # Generate and export different topologies
    generate_topology(BusTopo, '../topology/bus_topology.json')
    generate_topology(StarTopo, '../topology/star_topology.json')
    generate_topology(RingTopo, '../topology/ring_topology.json')
    generate_topology(MeshTopo, '../topology/mesh_topology.json')
    generate_topology(TreeTopo, '../topology/tree_topology.json')
    generate_topology(FullyConnectedTopo, '../topology/fully_connected_topology.json')
