function DFSWithNodeThatMustPass(){
    let time = document.getElementsByName("range")[0].value;
    document.getElementsByName("range")[0].addEventListener('change', () => {
        time = document.getElementsByName("range")[0].value;
    });

    let nodesString = document.querySelector(".nodes-input").value;
    let nodesArr = nodesString.replace(/^\r\n+|\r\n+$/g, '').split(",");
    let nodes = [];
    for (var i = 0; i < g.graph.length; i++) {
        if (nodesArr[i] == g.graph[i].name) {
            nodes.push(g.graph[i]);
        }
    }
    nodes.push(endNode);

    Graph.resetGraph();

    if (startNode.id == endNode.id) {
        alert("Start and end node are same!");
        return;
    }


    while(nodes.length > 0){
        let tempStart = nodes.shift();
        let tempEnd = nodes.shift();

        while (true) {

            if (tempStart.id == tempEnd.id) {
                break;
            }

        }
    }
}
