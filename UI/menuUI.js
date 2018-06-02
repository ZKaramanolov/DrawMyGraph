function menu() {
    const n = document.querySelector("#Node");
    const l = document.querySelector("#Link");

    n.onclick = () => {
        let a = new Node(globalId);
        a.x = Math.floor(Math.random() * 300 + 200);
        a.y = Math.floor(Math.random() * 300 + 100);
        g.graph.push(a);
        globalId++;
        Display.displayGraph();
    }
    l.onclick = () => {
        if (activatedLinking) {
            activatedLinking = false;
            document.querySelector('#Link').style = `
                transition: background 0.7s;
            `;
        } else {
            activatedLinking = true;
            document.querySelector('#Link').style = `
                transition: background 0.7s;
                background: #787878;
            `;
        }
    }
}
