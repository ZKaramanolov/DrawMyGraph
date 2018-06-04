class Graph{
    constructor(){
        this.graph = [];
    }

    addRoute(from, to, len, type){
        let link = new Link(to);
        link.lenght = len;
        link.type = type;
        from.links.push(link);
        Display.displayGraph();
    }

    addTwoWayRoute(from, to, len, type){
        this.addRoute(from, to, len, type);
        this.addRoute(to, from, len, type);
        Display.displayGraph();
    }

    static resetGraph(){
        for (var i = 0; i < g.graph.length; i++) {
            g.graph[i].isTested = false;
            g.graph[i].isExtended = false;
            g.graph[i].depth = 0;
            g.graph[i].distanceToEnd = Infinity;
            g.graph[i].charges = Infinity;
            g.graph[i].parent = null;
        }
        stack = [];
        queue = [];
        havePath = false;
        havePath2 = false;
        tempStart = undefined;
        tempEnd = undefined;
        //Graph.resetGraphLinks()
        Display.displayGraph();
    }
}
