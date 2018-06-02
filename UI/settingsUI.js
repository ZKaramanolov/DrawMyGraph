function getSettings(){
    let name = document.querySelector("#name").value;
    let x = document.querySelector("#X").value;
    let y = document.querySelector("#Y").value;
    let weight = document.querySelector("#W").value;
    for (let i = 0; i < g.graph.length; i++) {
        if (g.graph[i].id == selected.id) {
            g.graph[i].name = name;
            g.graph[i].x = x * 100;
            g.graph[i].y = y * 100;
            g.graph[i].weight = weight;
        }
    }
    Display.displayGraph();
}

function setSettings() {
    const sew = document.querySelector(".settings-elements-wrapper");

    sew.innerHTML = `
        <div class="set-wrapper">
            <input name="name" id="name" class="node-name" value="${selected.name}"></input>
        </div>
        <div class="set-wrapper">
            <div class="el-wrapper">
                <label for="X" class="node-el">X:</label>
                <input id="X" name="X" style="width:35px;" value="${selected.x/100}">
                <label for="Y" class="node-el">Y:</label>
                <input id="Y" name="Y" style="width:35px;" value="${selected.y/100}">
            </div>
            <div class="el-wrapper">
                <label for="W" class="node-el">Weight: </label>
                <input id="W" name="W" style="width:50px;" value="${selected.weight}">
            </div>
            <div class="el-wrapper">
                <label class="node-el">Links</label>
                <div id="links" class="links-wrapper"></div>
            </div>
            <button onclick="Node.DeleteNode()" class="node-link">Delete Node</button>
        </div>
    `;

    let height = 275;
    let ls = document.querySelector("#links");
    for (let i = 0; i < selected.links.length; i++) {
        let len = selected.links[i].lenght === undefined ? 0 : selected.links[i].lenght;
        let type = selected.links[i].type === undefined ? " - ": selected.links[i].type;
        ls.innerHTML += `
            <div class="links-wrapper">
                <button onclick="Link.deleteLink(this.textContent)" class="node-link">
                    ${selected.name} ---> ${selected.links[i].toNode.name}<br>
                </button>
                <span class="link-inf">${len} : ${type}</span>
            </div>
        `;
        height += 50;
    }
    document.querySelector(".settings-wrapper").style.height = height;

    document.getElementsByName("X")[0].addEventListener('keyup', this.getSettings);
    document.getElementsByName("Y")[0].addEventListener('keyup', this.getSettings);
    document.getElementsByName("W")[0].addEventListener('keyup', this.getSettings);
    document.getElementsByName("name")[0].addEventListener('keyup', this.getSettings);
}
