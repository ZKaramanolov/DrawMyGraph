class Link{
    constructor(toNode ,lenght ,type){
        //Lenght of link
        this.lenght = lenght;
        //Link goes to that node
        this.toNode = toNode;
        //type of link
        this.type = type;
    }

    /*Checking if the start point and end point of the link is in nodes.
    if exist from opposite node link it takes his length and type
    else asking the user for length and type*/
    static tryLinking(fromX, fromY, toX, toY){
        for (let i = 0; i < g.graph.length; i++) {
            if (Math.sqrt((g.graph[i].x - fromX)**2 + (g.graph[i].y - fromY)**2)
                < g.graph[i].size) {
                for (let j = 0; j < g.graph.length; j++) {
                    if ((Math.sqrt((g.graph[j].x - toX)**2 + (g.graph[j].y - toY)**2)
                        < g.graph[i].size) && j != i && this.checkLink(g.graph[i], g.graph[j])) {
                        this._start = g.graph[i];
                        this._end = g.graph[j];
                        if (this.checkLink(this._end, this._start) == true) {
                            fillLoad('link');
                        } else {
                            g.addRoute(this._start, this._end, this._lenTo, this._typeTo);
                            setSettings();
                        }
                    }
                }
            }
        }
    }

    /*Cheking if link exist*/
    static checkLink(from, to){
        for (let i = 0; i < from.links.length; i++) {
            if (from.links[i].toNode == to) {
                this._lenTo = from.links[i].lenght;
                this._typeTo = from.links[i].type;
                return false;
            }
        }
        return true;
    }

    /*setting link with the user length and type*/
    static setLink(){
        let len = document.querySelector("#length").value == "" ? 0 : document.querySelector("#length").value;
        let type = document.querySelector("#type").value == "" ? "-" : document.querySelector("#type").value;
        g.addRoute(this._start, this._end, len, type);
        setSettings();
        fillLoad();
    }

    static deleteLink(fullLink){
        let subLink = fullLink.split(" ---> ");
        if (confirm("Are you sure want to DELETE the link to " + subLink[1])) {
            for (let i = 0; i < selected.links.length; i++) {
                if (selected.links[i].toNode.name.trim() == subLink[1].trim()) {
                    selected.links.splice(i, 1);
                    setSettings();
                    Display.displayGraph();
                }
            }
        }
    }
}
