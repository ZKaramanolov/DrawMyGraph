function fillLoad(typeLoad){
    let load = document.querySelector("#load");
    let blur = document.querySelector("#blur");

    //toggle the blur and load container(on/off)
    if (blur.getAttribute("class") == "blur") {
        blur.classList.toggle("load-visible");
        load.classList.toggle("load-visible");
    } else {
        blur.classList.toggle("blur");
        load.classList.toggle("load");
    }

    //depends on what is comming from typeLoad, the load container is filled with different data
    if (typeLoad == "save") {
        load.innerHTML = `
            <div class="load-title-wrapper"><span class="load-title">Save Graph</span></div>
            <div class="load-btn-wrapper">
                <input type="text" class="name-file" placeholder="Name" id="fileName">
                <button class="load-btn" onclick="FileManager.SaveFile()">Download</button>
            <div>
        `;
    } else if(typeLoad == "load"){
        load.innerHTML = `
            <div class="load-title-wrapper"><span class="load-title">Load Graph</span></div>
            <div class="refresh-checkbox"><input type="checkbox" id="refresh">Delete canvas</div>
            <input class="load-input" type="file" id="fileLoad">
            <div class="load-btn-wrapper">
                <button class="load-btn" onclick="FileManager.LoadFile()">Load</button>
            </div>
        `;
    } else if(typeLoad == "link"){
        load.innerHTML = `
            <div class="load-title-wrapper"><span class="load-title">Link</span><div>
            <div class="load-title-wrapper">
                <input class="link-prop" type="text" id="length" placeholder="Length">
                <input class="link-prop" type="text" id="type" placeholder="Type">
            </div>
            <div class="load-btn-wrapper">
                <button class="load-btn" onclick="Link.setLink()">Set</button>
            </div>
        `;
    }
}
