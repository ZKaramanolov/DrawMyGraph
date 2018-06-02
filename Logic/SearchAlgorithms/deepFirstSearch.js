async function DeepFirstSearch(){
    let time = document.getElementsByName("range")[0].value;
    document.getElementsByName("range")[0].addEventListener('change', () => {
        time = document.getElementsByName("range")[0].value;
    });

    Graph.resetGraph();

    if (startNode.id == endNode.id) {
        alert("Start and end node are same!");
    }

    stack.push(startNode);

    while(stack.length > 0){
        let temp = stack.pop();

        temp.isTested = true;
        Display.displayGraph();

        if (temp.id == endNode.id) {
            alert("Have path!");
            return;
        }

        for (let i = 0; i < temp.links.length; i++) {
            if (!temp.links[i].toNode.isTested && !stack.includes(temp.links[i].toNode)) {
                stack.push(temp.links[i].toNode);
            }
        }

        await sleep(time);

        temp.isExtended = true;
    }
    alert("Don't have path!");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
