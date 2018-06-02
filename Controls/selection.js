class Selection{

    /*selecting node that mouseX and mouseY are in it*/
    static selection() {
        if(!activatedLinking && document.querySelector("#blur").classList != "blur load-visible"
                && document.querySelector("#load").classList != "load load-visible") {
            for (let i = 0; i < g.graph.length; i++) {
                let mouseX = event.clientX;
                let mouseY = event.clientY;
                if((Math.sqrt((g.graph[i].x - mouseX)**2 + (g.graph[i].y - mouseY)**2)
                    < g.graph[i].size)){
                    if (selected.id != g.graph[i].id) {
                        selected = g.graph[i];
                        document.querySelector(".settings-wrapper").style = `
                            transition: opacity 0.3s;
                            opacity: 1;
                            visibility: visible;
                            `;
                        setSettings();
                        Display.displayGraph();
                        return;
                    } else {
                        Selection.deselect();
                        return;
                    }
                }
            }
        }
    };

    static deselect(){
        document.querySelector(".settings-wrapper").style = `
           transition: opacity 0.3s, visibility 0.3s;
           opacity: 0;
           visibility: hidden;
           `;
        selected = new Node(0);
        Display.displayGraph();
    }
}
