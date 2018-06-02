class FileManager{

    static SaveFile(){
        let nodes = [];

        //get all node from g.graph
        for (let i = 0; i < g.graph.length; i++) {
            nodes.push(g.graph[i].name+","+g.graph[i].x/100+","+g.graph[i].y/100+","+g.graph[i].weight+";"+'\r\n');
        }

        //get all links from g.graph
        let links = [];
        for (let i = 0; i < g.graph.length; i++) {
            for (let j = 0; j < g.graph[i].links.length; j++) {
                let arrLink = [g.graph[i].name, g.graph[i].links[j].toNode.name, g.graph[i].links[j].lenght, g.graph[i].links[j].type];
                links.push(arrLink);
            }
        }

        //adding T for TwoWayRoute and F for OneWeyRoute
        for (let i = 0; i < links.length; i++) {
            let doubleLink = FileManager.checkDoubleLink(i, links);
            if (doubleLink) {
                links[i][4] = "T";
            } else {
                links[i][4] = "F";
            }
        }

        //merging nodes and links
        for (let i = 0; i < links.length; i++) {
            nodes.push(links[i][0]+","+links[i][1]+","+links[i][2]+","+links[i][3]+","+links[i][4]+";"+'\r\n')
        }

        FileManager.downLoadFile(nodes.join(""));
    }

    /*checking the links if they are one or two way*/
    static checkDoubleLink(i, links){
        let doubleLink = false;
        for (let j = i; j < links.length; j++) {
            if (links[i][0] == links[j][1] && links[i][1] == links[j][0]) {
                doubleLink = true;
                links.splice(j, 1);
                break;
            } else {
                doubleLink = false;
            }
        }
        return doubleLink;
    }

    /*adding data to blob and making it for download*/
    static downLoadFile(data){
        let blob = new Blob([data], {type: "text/plain:charset=utf-8"});
        let fileName = document.querySelector("#fileName").value;
        let url = window.URL.createObjectURL(blob);
        let download = document.createElement("a");
        download.href = url;
        download.download = fileName+".txt";
        download.click();
    }

    /*load file from user input*/
    static LoadFile(){
        let selectedFile = document.querySelector('#fileLoad').files[0];

        if (selectedFile != null) {
            let r = new FileReader();

            r.readAsText(selectedFile);

            r.addEventListener("load", FileManager.processFile);
        }
    }

    /*read the file and generate graph*/
    static processFile(e){
        let file = e.target.result;
        let lines = file.split(";");

        if (document.querySelector("#refresh").checked) {
            g.graph = [];
            globalId = 1;
            Selection.deselect();
            havePath = false;
            exitAlgogithm();
        }
        fillLoad();

        for (let i = 0; i < lines.length; i++) {
            let splitLine = lines[i].replace(/^\r\n+|\r\n+$/g, '').split(",");
            if (splitLine.length == 4) {
                let a = new Node(globalId, splitLine[0], parseFloat(splitLine[3]));
                a.x = parseFloat(splitLine[1]) * 100;
                a.y = parseFloat(splitLine[2]) * 100;
                g.graph.push(a);
                globalId++;
            }else if(splitLine.length == 5){
                let node1;
                let node2;
                for (let i = 0; i < g.graph.length; i++) {
                    if (splitLine[0].trim() == g.graph[i].name.trim()) {
                        node1 = g.graph[i];
                    }
                    if (splitLine[1].trim() == g.graph[i].name.trim()) {
                        node2 = g.graph[i];
                    }
                }

                let t = splitLine[3] == "0" ? " - " : splitLine[3];
                if (splitLine[4] == "T") {
                    g.addTwoWayRoute(node1, node2, splitLine[2], t);
                }else if(splitLine[4] == "F"){
                    g.addRoute(node1, node2, splitLine[2], t);
                }
            }
        }
        Display.displayGraph();
    }
}
