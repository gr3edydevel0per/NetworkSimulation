from mininet.net import Mininet
from mininet.node import OVSBridge
from mininet.log import setLogLevel, info, error
from mininet.cli import CLI
import os
import signal
import subprocess
import glob

def clear_network():
    # Check and delete existing Mininet files (optional, for cleanup)
    mininet_files = ['../topology/*.json']
    for file_pattern in mininet_files:
        for file in glob.glob(file_pattern):
            try:
                os.remove(file)
                info(f'*** Removed {file}\n')
            except Exception as e:
                error(f'Error removing {file}: {e}\n')

if __name__ == '__main__':
    setLogLevel('info')
    clear_network()
