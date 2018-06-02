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

    //queue.push(startNode);
    let temp = startNode;

    while(true){
        temp.isTested = true
        if (temp.id == endNode.id) {
            alert("Have path!");
            return;
        }

        //temp.isExtended = true;
        console.log(temp.name);
        console.log(lenArr);
        console.log(queue);
        let newTemp = [];
        for (let i = 0; i < temp.links.length; i++) {
            if (!temp.links[i].toNode.isTested) {
                newTemp.push(temp.links[i].lenght);
            }
        }
        let min = Math.min.apply(Math, newTemp);
        //const count = newTemp.filter(item => item == min);
        //console.log(count.length);
        let closestNode = temp;

        for (let i = 0; i < temp.links.length; i++) {
            //if (count.length <= 1) {
                if (parseInt(temp.links[i].lenght) == min) {
                    console.log(min);
                    closestNode = temp.links[i].toNode;
                    closestNode.isTested = true;
                    closestNode.parent = temp;
                    removeFromQueue(closestNode, lenArr);
                    continue;
                } else if (!temp.links[i].toNode.isTested) {
                    addToQueueLeft(temp.links[i].toNode, temp.links[i].lenght,lenArr ,time);
                }
            // } else {
            //     //closestNode = nodeClosestByDistanceToEnd(temp.links, min);
            // }
        }
        if (temp == closestNode) {
            temp = queue.shift();
            lenArr.shift();
            temp.isTested = true;
        } else {
            temp = closestNode;
        }

        Display.displayGraph();
        await sleep(time);
    }
    alert("Don't have path!");
}

function addToQueueLeft(nodeToAdd, linkLen, lenArr, time) {
    if (queue.length == 0) {
        queue.push(nodeToAdd);
        lenArr.push(linkLen);
    } else {
        for (var i = 0; i < queue.length; i++) {
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
                return;
            }
        }
        queue.push(nodeToAdd);
        lenArr.push(linkLen);
    }
}

function removeFromQueue(node, lenArr){
    for (var i = 0; i < queue.length; i++) {
        if (queue[i].id == node.id) {
            queue.splice(i, 1);
            lenArr.splice(i, 1);
            return;
        }
    }
}

function nodeClosestByDistanceToEnd(links, value){
    //Object.values(links).map(Link => parseFloat(Link.lenght) == value ? calcDistanceToEnd(Link.toNode) : console.log(1));
    for (let i = 0; i < links.length; i++) {
        if (parseFloat(links[i].lenght) == value) {
            console.log(links[i].toNode.name, value);
            calcDistanceToEnd(links[i].toNode);
        }
    }
    let linksByDistanceToEnd = Object.values(links).map(Link => Link.toNode.distanceToEnd);
    let minDis = Math.min.apply(Math, linksByDistanceToEnd);

    for (let i = 0; i < links.length; i++) {
        if (links[i].toNode.distanceToEnd == minDis) {
            return links[i].toNode;
        }
    }
}

function calcDistanceToEnd(node){
    if (node.distanceToEnd == 0) {
        let directLine = Math.floor(Math.sqrt(Math.pow(endNode.x - node.x, 2)
        + Math.pow(endNode.y - node.y, 2)));
        node.distanceToEnd = directLine;
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// //CANCER ALGORITHM
// async function GreedySearchByLength(){
//     let time = document.getElementsByName("range")[0].value;
//     document.getElementsByName("range")[0].addEventListener('change', () => {
//         time = document.getElementsByName("range")[0].value;
//     });
//
//     let lenArr = [];
//
//     Graph.resetGraph();
//
//     if (startNode.id == endNode.id) {
//         alert("Start and end node are same!");
//     }
//
//     //queue.push(startNode);
//     let temp = startNode;
//
//     while(true){
//         temp.isTested = true
//         if (temp.id == endNode.id) {
//             alert("Have path!");
//             return;
//         }
//
//         //temp.isExtended = true;
//         for (let i = 0; i < temp.links.length; i++) {
//             if (!temp.links[i].toNode.isTested) {
//                 lenArr[i] = temp.links[i].lenght;
//             }
//         }
//         // let linksLenArr = Object.values( temp.links ).map(Link => !Link.toNode.isTested ? Link.lenght : undefined);
//         let min = Math.min.apply(Math, lenArr);
//         //const count = lenArr.filter(item => item == min);
//         let closestNode = temp;
//         //if(count.length == 1){
//             for (let i = 0; i < temp.links.length; i++) {
//                 if (parseInt(temp.links[i].lenght) == min) {
//                     closestNode = temp.links[i].toNode;
//                     temp.isTested = true;
//                     temp.parent = temp;
//                     removeFromQueue(closestNode, lenArr);
//                 } else if (!temp.links[i].toNode.isTested) {
//                     addToQueueLeft(temp.links[i].toNode, temp.links[i].lenght,lenArr ,time);
//                 }
//             }
//         // } else {
//         //     //closestNode = nodeClosestByDistanceToEnd(temp.links, min);
//         // }
//         console.log(queue, lenArr);
//
//         if (temp.id == closestNode.id) {
//             temp = queue.shift();
//             lenArr.shift();
//             temp.isTested = true;
//         } else {
//             temp = closestNode;
//         }
//         console.log(temp.name);
//
//         Display.displayGraph();
//         await sleep(time);
//     }
//     alert("Don't have path!");
// }
//
// function addToQueueLeft(nodeToAdd, linkLen, lenArr, time) {
//     if (queue.length == 0) {
//         queue.push(nodeToAdd);
//         lenArr.push(linkLen);
//     } else {
//         for (var i = 0; i < queue.length; i++) {
//             if (nodeToAdd.id == queue[i].id) {
//                 if(parseFloat(lenArr[i]) > parseFloat(linkLen)){
//                     removeFromQueue(nodeToAdd, lenArr);
//                     break;
//                 } else {
//                     return;
//                 }
//             }
//         }
//         for(let i = 0; i < queue.length; i++){
//             if(parseFloat(lenArr[i]) > parseFloat(linkLen)) {
//                 queue.splice(i, 0, nodeToAdd);
//                 lenArr.splice(i, 0, linkLen);
//                 return;
//             }
//         }
//         queue.push(nodeToAdd);
//         lenArr.push(linkLen);
//     }
// }
//
// function removeFromQueue(node, lenArr){
//     for (var i = 0; i < queue.length; i++) {
//         if (queue[i].id == node.id) {
//             queue.splice(i, 1);
//             lenArr.splice(i, 1);
//             return;
//         }
//     }
// }
//
// function nodeClosestByDistanceToEnd(links, value){
//     Object.values(links).map(Link => calcDistanceToEnd(Link.toNode));
//     let linksByDistanceToEnd = Object.values(links).map(Link => Link.toNode.distanceToEnd);
//     let minDis = Math.min.apply(Math, linksByDistanceToEnd);
//
//     for (var i = 0; i < links.length; i++) {
//         if (links[i].toNode.distanceToEnd == minDis) {
//             return links[i].toNode;
//         }
//     }
// }
//
// function calcDistanceToEnd(node){
//     if (node.distanceToEnd == 0) {
//         let directLine = Math.floor(Math.sqrt(Math.pow(endNode.x - node.x, 2)
//         + Math.pow(endNode.y - node.y, 2)));
//         node.distanceToEnd = directLine;
//     }
// }
//
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
