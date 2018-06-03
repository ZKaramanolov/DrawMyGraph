function fillAlgorithm(){
    const al = document.querySelector(".menu-algorithms-content");

    al.innerHTML = `
        <div class="algorithms-titile-wrapper">
            <span class="algorithms-title">Algorithms</span>
        </div>
        <div class="algorithms-wrapper">
            <div class="algorithm" name="DFS">
                <span class="algorithm-name">DeepFirstSearch(DFS)</span>
            </div>
            <div class="algorithm" name="BFS">
                <span class="algorithm-name">BreadthFirstSearch(BFS)</span>
            </div>
            <div class="algorithm" name="GSBL">
                <span class="algorithm-name">GreedySearchByLength</span>
            </div>
            <div class="algorithm" name="DA">
                <span class="algorithm-name">Dijkstra'sAlgorithm</span>
            </div>
            <div class="algorithm" name="DFSWR">
                <span class="algorithm-name">DFSWithRestrictions</span>
            </div>
            <div class="algorithm" name="DFSWNTMP">
                <span class="algorithm-name">DFSWithNodeThatMustPass</span>
            </div>
        </div>
    `;
    document.getElementsByName("DFS")[0].addEventListener('click', () => {
        AlgorithmPanel("DeepFirstSearch(DFS)", "DeepFirstSearch");
    });
    document.getElementsByName("BFS")[0].addEventListener('click', () => {
        alert("Isn't implemented!");
    });
    document.getElementsByName("GSBL")[0].addEventListener('click', () => {
        AlgorithmPanel("GreedySearchByLength", "GreedySearchByLength");
    });
    document.getElementsByName("DA")[0].addEventListener('click', () => {
        AlgorithmPanel("Dijkstra's Algorithm", "dijkstraAlgorithm");
    });
    document.getElementsByName("DFSWR")[0].addEventListener('click', () => {
        AlgorithmPanel("DFSWithRestrictions", "DFSWithRestrictions");
    });
    document.getElementsByName("DFSWNTMP")[0].addEventListener('click', () => {
        AlgorithmPanel("DFSWithNodeThatMustPass", "DFSWithNodeThatMustPass");
    });
}

function AlgorithmPanel(title, callback = ""){
    document.querySelector(".menu-algorithms").style = "visibility: hidden";
    document.querySelector(".algorithm-setup").style = "visibility: visible; display: block";
    document.querySelector(".setup-title").innerHTML = title;
    if (title == "DFSWithRestrictions") {
        document.querySelector(".restrictions-wrapper").style = "visibility: visible; display: block";
    }
    document.querySelector(".algorithm-start-btn").setAttribute("onclick", callback + "()");
}

function setStartNode(){
    startNode = selected;
    document.querySelector("#sLabel").innerHTML = startNode.name;
    Display.displayGraph();
}

function setEndNode(){
    endNode = selected;
    document.querySelector("#eLabel").innerHTML = endNode.name;
    Display.displayGraph();
}

function exitAlgogithm(){
    document.querySelector(".menu-algorithms").style = "visibility: visible";
    document.querySelector(".algorithm-setup").style = "visibility: hidden; display: hidden";
    document.querySelector(".restrictions-wrapper").style = "visibility: hidden; display: none";
    document.querySelector("#sLabel").innerHTML = '';
    document.querySelector("#eLabel").innerHTML = '';
    document.querySelector(".link-type").value = '';
    document.querySelector(".node-weight").value = '';
    startNode = undefined;
    endNode = undefined;
    resetAlgorithmSetup();
}

function resetAlgorithmSetup(){

    Graph.resetGraph();
}
