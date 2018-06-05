async function DFSWithNodeThatMustPass(){
    let time = document.getElementsByName("range")[0].value;
    document.getElementsByName("range")[0].addEventListener('change', () => {
        time = document.getElementsByName("range")[0].value;
    });
    let nodesString = document.querySelector(".nodes-input").value;
    let nodesArr = nodesString.replace(/^\r\n+|\r\n+$/g, '').split(",");
    let nodes = [];
    let charges = 0;

    nodes = fillNodesArr(nodesArr);

    path = [];
    Graph.resetGraph();

    if (startNode.id == endNode.id) {
        alert("Start and end node are same!");
        return;
    }

    while(nodes.length > 1){
        tempStart = nodes.shift();
        tempEnd = nodes[0];
        let segmentPath = [];

        queue.push(tempStart);
        tempStart.charges = 0;

        while(true){
            let temp = queue.shift();

            if(queue.length == 0 && typeof temp == "undefined") {
                alert("Don't have path!");
                return;
            } else if (temp.id == tempEnd.id) {
                charges += tempEnd.charges;
                break;
            }

            temp.isTested = true;
            Display.displayGraph();

            await WeightLinkedNodes(temp, time);
            await sleep(time);
        }
        savePath(segmentPath, tempStart, tempEnd);
        segmentPath.reverse();
        path.push.apply(path, segmentPath);
        Graph.resetGraph();
    }
    path.push(endNode);
    path.reverse();
    alert("Total charges: " + charges);
    havePath2 = true;
    Display.displayGraph();
}

function savePath(segmentPath, s, e){
    if (typeof e != "undefined") {
        if (typeof e.parent == "undefined" || e == s) {
            return;
        }
        segmentPath.push(e.parent);

        savePath(segmentPath, s, e.parent);
    }
}

function fillNodesArr(nodesArr){
    let nodes = [];
    nodes.push(startNode);
    for (let i = 0; i < nodesArr.length; i++) {
        for (let j = 0; j < g.graph.length; j++) {
            if (nodesArr[i] == g.graph[j].name) {
                nodes.push(g.graph[j]);
            }
        }
    }
    nodes.push(endNode);

    if (document.querySelector("#op").checked) {
        for (let i = 1; i < nodes.length - 1; i++) {
            calcDistanceToEnd(nodes[i], startNode);
        }
        //selective sort
        for (let i = 1; i < nodes.length-2; i++) {
            for (let j = 2; j < nodes.length-1; j++) {
                if (nodes[i].distanceToEnd > nodes[j].distanceToEnd) {
                    let t = nodes[j];
                    nodes[j] = nodes[i];
                    nodes[i] = t;
                }
            }
        }
    }

    return nodes;
}
