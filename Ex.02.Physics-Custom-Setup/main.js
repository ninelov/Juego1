/*
    1. Crear la arquitectura de nuestro sitio / aplicación
        1.1. Configurar nuestro canvas
        1.2. Inicializar el código de la librería
        1.3. Configurar nuestro propio "request animation frame" por si lo necesitamos más adelante

    2. Inicializar nuestro código
*/

// 1.3. Configurar nuestro propio "request animation frame" por si lo necesitamos más adelante
function frame() {
    console.log("custom animation frame interval");
    // El código que quisiéramos animar o actualizar a 60 fps iria aquí dentro

    requestAnimationFrame(frame);
}

// 1. Crear la arquitectura de nuestro sitio / aplicación
class App {
    constructor(params = {}) {
        // 1.1. Configurar nuestro canvas
        this.initCanvas();

        // 1.2. Inicializar el código de la librería
        this.initPhysics();

        // 1.3. Configurar nuestro propio "request animation frame" por si lo necesitamos más adelante
        this.initRAF();

        this.updateCanvasSize();
    }


    // 1.1. Configurar nuestro canvas
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



    // 1.2. Inicializar el código de la librería (Matter.js)
    initPhysics() {
        console.log(Matter)

        /*
            Los "alias" son nombres mas cortos para escribir menos código y/o que nuestro programa sea más fácil de leer.

            En este caso por crear la arquitectura de nuestro programa dentro de una clase, es posible que nos confundan los alias, entonces no lo usaremos en este ejemplo, pero si te resulta más cómo crear un alias, adelante, puede quedar algo así:

                // module aliases
                this.mEngine = Matter.Engine;
                this.mRender = Matter.Render;
                this.mRunner = Matter.Runner;
                this.mBodies = Matter.Bodies;
                this.mComposite = Matter.Composite;
            
            Pero nómbralos como te resulte más intuitivo y fácil de comprender.
        */

        // create an engine
        this.engine = Matter.Engine.create();

        // create a renderer
        this.render = Matter.Render.create({
            element: document.body,
            engine: this.engine,
            canvas: this.canvas,
            options: {
                showPerformance: true,
                showDebug: true,
                width: this.canvas.width,
                height: this.canvas.height,
            }
        });

        // create rigid modies (boxes, circle, irregular shape and a ground)
        var boxA = Matter.Bodies.rectangle(400, 200, 80, 180);
        var boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
        var circleA = Matter.Bodies.circle(550, 250, 30, 30);
        var irregularShape = Matter.Bodies.fromVertices(550, 0, [
            { x: 0, y: 0 },
            { x: 300, y: 0 },
            { x: 250, y: 100 },
            { x: 200, y: 200 },
            { x: 50, y: 150 }
        ]);

        var ground = Matter.Bodies.rectangle(this.canvas.width / 2, this.canvas.height - 100, this.canvas.width - 100, 80, { isStatic: true });

        // add all of the bodies to the world
        Matter.Composite.add(this.engine.world, [boxA, boxB, circleA, irregularShape, ground]);

        // run the renderer
        Matter.Render.run(this.render);

        // create runner
        this.runner = Matter.Runner.create();

        // run the engine
        Matter.Runner.run(this.runner, this.engine);
    }



    // 1.3. Configurar nuestro propio "request animation frame" por si lo necesitamos más adelante
    initRAF() {
        frame();
    }
}







// 2. Inicializar nuestro código
var myApp;

window.onload = function() {
    myApp = new App();
};