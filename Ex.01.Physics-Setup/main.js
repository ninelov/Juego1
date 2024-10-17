/*
    1. Descargar librería
    2. Leer librería desde HTML
    3. Configurar nuestro canvas
    4. Inicializar el código de la librería
    5. Inicializar nuestro código
*/


// 3. Configurar nuestro canvas
const CANVAS = document.getElementById("lienzo");
const CTX = CANVAS.getContext("2d");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

function updateCanvasSize() {
    console.log('updateCanvasSize');
    
    CANVAS.width = CANVAS.getBoundingClientRect().width;
    CANVAS.height = CANVAS.getBoundingClientRect().height;

    if (render) {
        render.options.width = CANVAS.width;
        render.options.height = CANVAS.height;
    }
}



/*///// Matter.js Setup ///*/

// 4. Inicializar el código de la librería
console.log(Matter)

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var canvas = document.getElementById("lienzo");
var render = Render.create({
    element: document.body,
    engine: engine,
    canvas: CANVAS,
    options: {
        showPerformance: true,
        showDebug: true,
        width: CANVAS.width,
        height: CANVAS.height,
    }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 180);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var circleA = Bodies.circle(550, 250, 30, 30);
var irregularShape = Bodies.fromVertices(550, 0, [
    { x: 0, y: 0 },
    { x: 300, y: 0 },
    { x: 250, y: 100 },
    { x: 200, y: 200 },
    { x: 50, y: 150 }
]);

var ground = Bodies.rectangle(CANVAS.width / 2, CANVAS.height - 100, CANVAS.width - 100, 80, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, circleA, irregularShape, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);



// 5. Inicializar nuestro código
window.onload = function() {
    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();
};