// run with `node server.mjs`
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
let cellSize = 10;

const grid = new Grid();
grid.initialize(width / cellSize, height / cellSize);

let isMouseDown = false;
let selectedMaterial = "sand";

const bodyBackgroundColor = getComputedStyle(canvas).backgroundColor;

function drawGrid() {
    for (let y = 0; y < height / cellSize; y++) {
        for (let x = 0; x < width / cellSize; x++) {
            const value = grid.get(x, y);
            if (value !== 0) {
                ctx.fillStyle = `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
            } else {
                ctx.fillStyle = bodyBackgroundColor;
            }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

function updateGrid(i) {
    const particle = grid.grid[i];
    if (particle instanceof Particle) {
        particle.move(grid, i);
    }
}

function update() {
    for (let i = grid.grid.length - 1; i >= 0; i--) {
        updateGrid(i);
    }
}

function handleMouseDown(event) {
    const x = Math.floor(event.offsetX / cellSize);
    const y = Math.floor(event.offsetY / cellSize);
    let particle;
    switch (selectedMaterial) {
        case "sand":
            particle = new Sand(x, y);
            break;
        case "water":
            particle = new Water(x, y);
            break;
        case "wood":
            particle = new Wood(x, y);
            break;
        case "fire":
            particle = new Fire(x, y);
            break;
        case "smoke":
            particle = new Smoke(x, y);
            break;
        default:
            particle = new Sand(x, y);
    }
    grid.setCircle(x, y, 3, particle.color);
}

canvas.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    handleMouseDown(event);
});

canvas.addEventListener("mousemove", (event) => {
    if (isMouseDown) {
        handleMouseDown(event);
    }
});

canvas.addEventListener("mouseup", () => {
    isMouseDown = false;
});

document.getElementById("cellSizeInput").addEventListener("input", (event) => {
    cellSize = parseInt(event.target.value, 10);
    grid.initialize(width / cellSize, height / cellSize);
});

document.getElementById("materialSelect").addEventListener("change", (event) => {
    selectedMaterial = event.target.value;
});

function loop() {
    drawGrid();
    update();
    requestAnimationFrame(loop);
}

loop();
loop();