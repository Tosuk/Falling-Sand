const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
let cellSize = 2;

const grid = new Grid();
grid.initialize(width / cellSize, height / cellSize);

let isMouseDown = false;
let selectedMaterial = "sand";

const bodyBackgroundColor = getComputedStyle(canvas).backgroundColor;
// Konvertiere die extrahierten Werte in separate Variablen

const rgbValues = bodyBackgroundColor.match(/\d+/g); 

const red = parseInt(rgbValues[0]);
const green = parseInt(rgbValues[1]);
const blue = parseInt(rgbValues[2]);
function drawGrid() {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const gridX = Math.floor(x / cellSize);
            const gridY = Math.floor(y / cellSize);
            const value = grid.get(gridX, gridY);
            const index = (y * width + x) * 4;
            if (value !== 0) {
                data[index] = value[0];
                data[index + 1] = value[1];
                data[index + 2] = value[2];
                data[index + 3] = 255; // Alpha
            } else {
                data[index] = red;
                data[index + 1] = green;
                data[index + 2] = blue;
                data[index + 3] = 255; // Alpha
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function updateGrid(index) {
    const below = index + grid.width;
    const right = below + 1;
    const left = below - 1;
    const column = index % grid.width;

    if (below < grid.grid.length && grid.isEmpty(below)) {
        grid.swap(index, below);
    } else if (right < grid.grid.length && grid.isEmpty(right) && right % grid.width > column) {
        grid.swap(index, right);
    } else if (left >= 0 && grid.isEmpty(left) && left % grid.width < column) {
        grid.swap(index, left);
    }
}

function update() {
    for (let i = grid.grid.length - 1; i >= 0; i--) {
        if (!grid.isEmpty(i)) {
            updateGrid(i);
        }
        
    }
}

function handleMouseDown(event) {
    const x = Math.floor(event.offsetX / cellSize);
    const y = Math.floor(event.offsetY / cellSize);
    let particle;
    switch (selectedMaterial) {
        case "sand":
            particle = new Sand();
            break;
        case "water":
            particle = new Water();
            break;
        case "wood":
            particle = new Wood();
            break;
        case "fire":
            particle = new Fire();
            break;
        case "smoke":
            particle = new Smoke();
            break;
        default:
            particle = new Sand();
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
