class Display {

    static displayNodes(){
        for (let i = 0; i < g.graph.length; i++) {

            //setting the color for node
            if (g.graph[i] == startNode) {
                ctx.fillStyle = "#58ef62";
            } else if(g.graph[i] == endNode) {
                ctx.fillStyle = "#e20929";
            } else if(g.graph[i] == tempStart || g.graph[i] == tempEnd){
                ctx.fillStyle = "#cb15ef";
            } else if(g.graph[i].isTested) {
                ctx.fillStyle = "#c8cbd1";
            } else if(stack.includes(g.graph[i]) || queue.includes(g.graph[i])) {
                ctx.fillStyle = "#e6f210";
            } else {
                ctx.fillStyle = "#719fe8";
            }

            //drawing node
            ctx.beginPath();
            ctx.arc(g.graph[i].x,g.graph[i].y,g.graph[i].size,0,2*Math.PI);
            ctx.fill();

            //drawing the text in node
            ctx.fillStyle = "#000000";
            let fontSize = 25 - g.graph[i].name.length*1.2;
            ctx.font = fontSize + "px cursive";
            let indentX = g.graph[i].name.length*4;
            ctx.fillText(g.graph[i].name, g.graph[i].x - indentX, g.graph[i].y + 5);

            //adding circle around the selected node
            if (g.graph[i].id == selected.id) {
                ctx.beginPath();
                ctx.lineWidth = 0.9;
                ctx.strokeStyle = "#000000";
                ctx.arc(g.graph[i].x, g.graph[i].y, g.graph[i].size + 4,0, 2*Math.PI);
                ctx.stroke();
            }
        }
    }

    /*drawing links(arrows)*/
    static displayLinks(){
        for (let i = 0; i < g.graph.length; i++) {
            for (let j = 0; j < g.graph[i].links.length; j++) {
                let fromX = g.graph[i].x;
                let fromY = g.graph[i].y;
                let toX = g.graph[i].x + (g.graph[i].links[j].toNode.x - g.graph[i].x)*0.9;
                let toY = g.graph[i].y + (g.graph[i].links[j].toNode.y - g.graph[i].y)*0.9;
                let headlen = 20;
                let angle = Math.atan2(toY - fromY, toX - fromX);

                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = "#d1d1d1";
                ctx.moveTo(fromX, fromY);
                ctx.lineTo(toX, toY);
                ctx.lineTo(toX-headlen*Math.cos(angle-Math.PI/8),toY-headlen*Math.sin(angle-Math.PI/8));
                ctx.moveTo(toX-headlen*Math.cos(angle+Math.PI/8),toY-headlen*Math.sin(angle+Math.PI/8));
                ctx.lineTo(toX, toY);
                ctx.stroke();

                let halfwayLineX = g.graph[i].x + (g.graph[i].links[j].toNode.x - g.graph[i].x)*0.5;
                let halfwayLineY = g.graph[i].y + (g.graph[i].links[j].toNode.y - g.graph[i].y)*0.5;
                ctx.fillStyle = "#00dd00";
                ctx.font = "18px cursive";
                ctx.fillText(g.graph[i].links[j].lenght, halfwayLineX, halfwayLineY);
            }
        }

        if (havePath2 == true){
            Display.displayPath2();
        }
        if (havePath == true) {
            Display.displayPath(endNode);
        }
    }

    //recursivly crawls the nodes starting from the end and using there parents
    static displayPath(s){
        if (typeof s != "undefined") {
            if (typeof s.parent == "undefined" || s == startNode) {
                return;
            }

            let to = s.parent;
            let toX = s.x + (to.x - s.x) * 0.1;
            let toY = s.y + (to.y - s.y) * 0.1;
            let headlen = 20;
            let angle = Math.atan2(toY - s.y, toX - s.x);

            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#ff0000";
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(toX, toY);
            ctx.lineTo(toX+headlen*Math.cos(angle-Math.PI/8),toY+headlen*Math.sin(angle-Math.PI/8));
            ctx.moveTo(toX+headlen*Math.cos(angle+Math.PI/8),toY+headlen*Math.sin(angle+Math.PI/8));
            ctx.lineTo(toX, toY);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();

            Display.displayPath(s.parent);
        }
    }

    static displayPath2(){
        for(let i = 0; i < path.length-1; i++){
            let s = path[i]
            let to = path[i+1];
            let toX = s.x + (to.x - s.x) * 0.1;
            let toY = s.y + (to.y - s.y) * 0.1;
            let headlen = 20;
            let angle = Math.atan2(toY - s.y, toX - s.x);

            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#ff0000";
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(toX, toY);
            ctx.lineTo(toX+headlen*Math.cos(angle-Math.PI/8),toY+headlen*Math.sin(angle-Math.PI/8));
            ctx.moveTo(toX+headlen*Math.cos(angle+Math.PI/8),toY+headlen*Math.sin(angle+Math.PI/8));
            ctx.lineTo(toX, toY);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
        }
    }

    // static drawPath(){
    //
    // }

    static clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    static displayGraph(){
        Display.clearCanvas();
        Display.displayLinks();
        Display.displayNodes();
    }
}
