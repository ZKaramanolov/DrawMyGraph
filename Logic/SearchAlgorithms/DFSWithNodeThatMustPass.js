async function DFSWithNodeThatMustPass(){
    let time = document.getElementsByName("range")[0].value;
    document.getElementsByName("range")[0].addEventListener('change', () => {
        time = document.getElementsByName("range")[0].value;
    });
    path = [];
    let nodesString = document.querySelector(".nodes-input").value;
    let nodesArr = nodesString.replace(/^\r\n+|\r\n+$/g, '').split(",");
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
                break;
            }

            // for (var i = 0; i < nodes.length; i++) {
            //     if (nodes[i].id == temp.id) {
            //         nodes.splice(i, 1);
            //     }
            // }

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
