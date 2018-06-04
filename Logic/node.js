class Node{
    constructor(id, name = "", weight = 0) {
        this.id = id;
        this.name = name != "" ? name : String(id);
        this.weight = weight;
        this.x = 0;
        this.y = 0;
        //Is every link visited
        this.isExtended = false;
        //Is it visited
        this.isTested = false;
        //distance to end with straight line
        this.distanceToEnd = Infinity;
        //accumulated charges
        this.charges = Infinity;
        //Contain <Node, charges>
        this.parent;
        //ArrayList<Link>
        this.links = [];
        //Node size
        this.size = 20;
    }

    static DeleteNode(){
        if (confirm("Are you sure want to DELETE node: " + selected.name)) {
            //deleting all links that points that node
            for (let i = 0; i < g.graph.length; i++) {
                for (let j = 0; j < g.graph[i].links.length; j++) {
                    if (g.graph[i].links[j].toNode.id == selected.id) {
                        g.graph[i].links.splice(j,1);
                    }
                }
            }

            //deleting the node
            for (let i = 0; i < g.graph.length; i++) {
                if (g.graph[i].id == selected.id) {
                    g.graph.splice(i, 1);
                    Selection.deselect();
                }
            }
            Display.displayGraph();
        }
    }
}
