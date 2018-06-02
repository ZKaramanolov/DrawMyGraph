/*Onmousedown getting mouseX and mouseY and start drawing line and
drawing same line(this.t) when mouse not moving.
Onmouseup call tryLinking*/
function drawLink() {
    if (activatedLinking && document.querySelector("#blur").classList != "blur load-visible"
            && document.querySelector("#load").classList != "load load-visible") {

        document.body.onmousedown = () => {

            this.drawCanvas = setInterval(() => {
                Display.displayGraph();
            }, 10);

            this.mouseX = event.clientX;
            this.mouseY = event.clientY;

            document.body.onmousemove = (event) => {
                clearInterval(this.t);
                this.t = setInterval(() => {
                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "#d1d1d1";
                    ctx.moveTo(this.mouseX, this.mouseY);
                    ctx.lineTo(event.clientX, event.clientY);
                    ctx.stroke();
                }, 1)
            }
        }

        document.body.onmouseup = () => {
            Link.tryLinking(this.mouseX, this.mouseY, event.clientX, event.clientY);
            document.body.onmousemove = null;
            clearInterval(this.t);
            clearInterval(this.drawCanvas);
            Display.displayGraph();
        }
    } else {
        document.body.onmouseup = null;
        document.body.onmousedown = null;
    }
}
