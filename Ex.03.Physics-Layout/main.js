/*
    
*/

const PI2 = Math.PI * 2;

class App {
    constructor(params = {}) {
        this.initCanvas();
        this.initPhysics();
        this.initBodies();
        // this.initRAF();

        this.updateCanvasSize();
    }


    initCanvas() {
        this.canvas = document.getElementById("lienzo");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener("resize", this.updateCanvasSize.bind(this));
    }

    updateCanvasSize() {
        console.log('updateCanvasSize');
        
        this.canvas.width = this.canvas.getBoundingClientRect().width;
        this.canvas.height = this.canvas.getBoundingClientRect().height;

        if (this.render) {
            this.render.options.width = this.canvas.width;
            this.render.options.height = this.canvas.height;
        }
    }



    initPhysics() {
        console.log(Matter)

        this.engine = Matter.Engine.create();

        this.render = Matter.Render.create({
            element: document.body,
            engine: this.engine,
            canvas: this.canvas,
            options: {
                showDebug: true,
                showPerformance: true,
                width: this.canvas.width,
                height: this.canvas.height,
                wireframes: false,
            }
        });

        Matter.Render.run(this.render);

        this.runner = Matter.Runner.create();
        Matter.Runner.run(this.runner, this.engine);
    }

    initBodies() {
        var bodies = [];
        var totalCircles = 150;
        var layoutRadius = 10;

        for (let i = 0; i < totalCircles; i++) {
            let stepPI = PI2 / totalCircles;
            let step = i * stepPI;

            var circle = Matter.Bodies.circle(
                (this.canvas.width / 2) + (Math.sin(step) * layoutRadius), // x
                250 + (Math.cos(step) * layoutRadius),  // y
                30,  // width
                30 // height
            );
            // Matter.Body.setMass(circle, 1 / i);
            Matter.Body.setDensity(circle, i * 50);
            console.log("circle mass", circle.density);
            
            bodies.push(circle);
        }

        var ground = Matter.Bodies.rectangle(this.canvas.width / 2, this.canvas.height - 100, this.canvas.width - 300, 80, { isStatic: true });
        bodies.push(ground);

        Matter.Composite.add(this.engine.world, bodies);
    }



    initRAF() {
        frame();
    }
}


function frame() {
    console.log("custom animation frame interval");

    requestAnimationFrame(frame);
}





// Inicializar nuestro código
var myApp;

window.onload = function() {
    myApp = new App();
};