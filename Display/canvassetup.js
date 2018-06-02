function canvasSetup(){
    const canvas = document.querySelector("canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        Display.displayGraph();
    };

    const c = canvas.getContext('2d');
}
