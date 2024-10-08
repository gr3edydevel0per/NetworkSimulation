const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/generateTopology', (req, res) => {
    exec('sudo python3 scripts/generateTopology.py');
    });


    app.get('/topology/:type', (req, res) => {
        const topologyType = req.params.type;
        const allowedTopologies = ['bus', 'star', 'ring', 'mesh', 'tree', 'fully_connected'];
        
        if (!allowedTopologies.includes(topologyType)) {
            return res.status(400).send('Invalid topology type');
        }
    
        const outputFile = path.join(__dirname, 'topology', `${topologyType}_topology.json`);
    
        if (fs.existsSync(outputFile)) {
            res.sendFile(outputFile);
        } else {
            res.status(500).send('Topology file not generated');
        }
    });
    

app.get("/simulator",(req,res)=>{
    res.render("simulator");
})

app.get("/pathfinder",(req,res)=>{
    res.render("pathFinder");
})

app.get("/icmp",(req,res)=>{
    res.render("icmp_star");
})

app.get("/tcp",(req,res)=>{
    res.render("protocolSimulation/tcp");
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
