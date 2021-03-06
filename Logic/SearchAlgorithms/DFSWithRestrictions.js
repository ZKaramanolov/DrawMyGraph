async function DFSWithRestrictions(){
    let time = document.getElementsByName("range")[0].value;
    document.getElementsByName("range")[0].addEventListener('change', () => {
        time = document.getElementsByName("range")[0].value;
    });
    let ignorLink = document.querySelector(".link-type").value;
    let ignorWeight = document.querySelector(".node-weight").value;

    Graph.resetGraph();

    if (startNode.id == endNode.id) {
        alert("Start and end node are same!");
        return;
    }

    stack.push(startNode);
    startNode.charges = 0;

    while(stack.length > 0){
        let temp = stack.pop();

        temp.isTested = true;
        Display.displayGraph();

        if (temp.id == endNode.id) {
            havePath = true;
            alert("Distance from start to end: " + endNode.charges);
            Display.displayGraph();
            return;
        }

        for (let i = 0; i < temp.links.length; i++) {
            let tempLen = temp.charges + Number(temp.links[i].lenght);
            if (!temp.links[i].toNode.isTested
                && !stack.includes(temp.links[i].toNode)
                && temp.links[i].toNode.weight < parseInt(ignorWeight)
                && temp.links[i].type != ignorLink.trim()) {
                    temp.links[i].toNode.charges = tempLen;
                    temp.links[i].toNode.parent = temp;
                    stack.push(temp.links[i].toNode);
                    Display.displayGraph();
                    await sleep(time/10);
            }
        }

        await sleep(time);

        temp.isExtended = true;
    }
    alert("Don't have path!");
}
