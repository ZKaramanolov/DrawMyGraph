//CANCER ALGORITHM
async function GreedySearchByLength(){
    let time = document.getElementsByName("range")[0].value;
    document.getElementsByName("range")[0].addEventListener('change', () => {
        time = document.getElementsByName("range")[0].value;
    });

    let lenArr = [];

    Graph.resetGraph();

    if (startNode.id == endNode.id) {
        alert("Start and end node are same!");
    }

    let temp = startNode;

    while(true){
        temp.isTested = true
        if (temp.id == endNode.id) {
            havePath = true;
            Display.displayGraph();
            return;
        }

        let newTemp = [];
        for (let i = 0; i < temp.links.length; i++) {
            if (!temp.links[i].toNode.isTested) {
                temp.links[i].toNode.parent = temp;
                newTemp.push(temp.links[i].lenght);
            }
        }
        let min = Math.min(...newTemp);

        let count = newTemp.filter(item => item == min);

        let closestNode = temp;

        if (count.length <= 1) {
            for (let i = 0; i < temp.links.length; i++) {
                if (parseInt(temp.links[i].lenght) == min) {
                    closestNode = temp.links[i].toNode;
                    closestNode.isTested = true;
                    closestNode.parent = temp;
                    removeFromQueue(closestNode, lenArr);
                    continue;
                } else if (!temp.links[i].toNode.isTested) {
                    addToQueueLeft(temp.links[i].toNode, temp.links[i].lenght, lenArr, temp, time);
                }
            }
        } else {
            closestNode = nodeClosestByDistanceToEnd(temp.links, min);
            for (let i = 0; i < temp.links.length; i++) {
                if (closestNode.id != temp.links[i].toNode.id && !temp.links[i].toNode.isTested) {
                    addToQueueLeft(temp.links[i].toNode, temp.links[i].lenght, lenArr, temp, time);
                }
            }
        }

        if (temp == closestNode) {
            min = Math.min(...lenArr);
            count = lenArr.filter(item => item == min);
            if (count.lenght <= 1) {
                closestNode = queue.shift();
                lenArr.shift();
                closestNode.parent = temp;
                closestNode.isTested = true;
            } else {
                let tempArr = [];
                let tempLenArr = [];
                for (let i = 0; i < count.length; i++) {
                    let calcDisTemp = queue.shift();
                    calcDistanceToEnd(calcDisTemp, endNode);
                    tempArr.push(calcDisTemp);
                    tempLenArr.push(lenArr.shift());
                }
                let nodesByDistanceToEnd = Object.values(tempArr).map(n => n.distanceToEnd);
                let minDis = Math.min(...nodesByDistanceToEnd);
                for (let i = 0; i < tempArr.length; i++) {
                    if (tempArr[i].distanceToEnd == minDis) {
                        closestNode = tempArr[i];
                        tempLenArr[i] = 0;
                        closestNode.isTested = true;
                    }
                }
                for (let i = 0; i < tempArr.length; i++) {
                    if (closestNode.id != tempArr[i].id && !tempArr[i].isTested) {
                        addToQueueLeft(tempArr[i], tempLenArr[i], lenArr, temp, time);
                    }
                }
            }
        }
        temp = closestNode;

        Display.displayGraph();
        await sleep(time);
    }
    alert("Don't have path!");
}

function addToQueueLeft(nodeToAdd, linkLen, lenArr, temp, time) {
    if (queue.length == 0) {
        queue.push(nodeToAdd);
        lenArr.push(linkLen);
    } else {
        for (let i = 0; i < queue.length; i++) {
            if (nodeToAdd.id == queue[i].id) {
                if(parseFloat(lenArr[i]) > parseFloat(linkLen)){
                    removeFromQueue(nodeToAdd, lenArr);
                    break;
                } else {
                    return;
                }
            }
        }
        for(let i = 0; i < queue.length; i++){
            if(parseFloat(lenArr[i]) > parseFloat(linkLen)) {
                queue.splice(i, 0, nodeToAdd);
                lenArr.splice(i, 0, linkLen);
                nodeToAdd.parent = temp;
                return;
            }
        }
        queue.push(nodeToAdd);
        lenArr.push(linkLen);
    }
}

function removeFromQueue(node, lenArr){
    for (let i = 0; i < queue.length; i++) {
        if (queue[i].id == node.id) {
            queue.splice(i, 1);
            lenArr.splice(i, 1);
            return;
        }
    }
}

function nodeClosestByDistanceToEnd(links, min){
    //Object.values(links).map(Link => parseFloat(Link.lenght) == min ? calcDistanceToEnd(Link.toNode) : console.log(1));
    for (let i = 0; i < links.length; i++) {
        if (parseFloat(links[i].lenght) == min) {
            calcDistanceToEnd(links[i].toNode, endNode);
        }
    }
    let linksByDistanceToEnd = Object.values(links).map(Link => Link.toNode.distanceToEnd);
    let minDis = Math.min(...linksByDistanceToEnd);
    for (let i = 0; i < links.length; i++) {
        if (links[i].toNode.distanceToEnd == minDis) {
            links[i].toNode.isTested = true;
            return links[i].toNode;
        }
    }
}

function calcDistanceToEnd(node, from){
    if (node.distanceToEnd == Infinity) {
        let directLine = Math.floor(Math.sqrt(Math.pow(from.x - node.x, 2)
        + Math.pow(from.y - node.y, 2)));
        node.distanceToEnd = directLine;
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
