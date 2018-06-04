async function dijkstraAlgorithm(){
    let time = document.getElementsByName("range")[0].value;
    document.getElementsByName("range")[0].addEventListener('change', () => {
        time = document.getElementsByName("range")[0].value;
    });

    if (startNode.id == endNode.id) {
        alert("Start node and End node are same!");
    }

    queue.push(startNode);
    startNode.charges = 0;

    while(true){
        let temp = queue.shift();

        if(queue.length == 0 && typeof temp == "undefined") {
            alert("Don't have path!");
            return;
        } else if (temp.id == endNode.id) {
            havePath = true;
            alert("Distance from start to end: " + endNode.charges);
            Display.displayGraph();
            break;
        }

        temp.isTested = true;
        Display.displayGraph();

        await WeightLinkedNodes(temp, time);
        await sleep(time);
    }
}

async function WeightLinkedNodes(temp , time){
    for (let i = 0; i < temp.links.length; i++) {
        let tempLen = temp.charges + Number(temp.links[i].lenght);
        if (tempLen < temp.links[i].toNode.charges) {
            temp.links[i].toNode.charges = tempLen;
            temp.links[i].toNode.parent = temp;
        }
        if (!temp.links[i].toNode.isTested
                && !queue.includes(temp.links[i].toNode)
                    && !temp.links[i].toNode.isExtended) {
            addToQueue(temp.links[i].toNode);
            Display.displayGraph();
            await sleep(time/10);
        }
    }
    temp.isExtended = true;
}

function addToQueue(nodeToAdd) {
	for(let i = 0; i < queue.length; i++){
		if(queue[i].charges > nodeToAdd.charges){
			queue.splice(i, 0, nodeToAdd);
			return;
		}
	}
	queue.push(nodeToAdd);
}
