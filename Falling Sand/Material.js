class Particle {
    constructor({ type, empty } = {}) {
        this.type = type;
        this.empty = empty ?? false;
    }
}

class Sand extends Particle {
    constructor() {
        super({type: "sand"});
        this.color = [194, 178, 128];
    }
}

class Water extends Particle {
    constructor() {
        super({type: "water"});
        this.color = [0, 0, 255];
    }
}

class Wood extends Particle {
    constructor() {
        super({type: "wood"});
        this.color = [139, 69, 19];
    }
    move(grid, index) {
        // Holz bewegt sich nicht
    }
}

class Fire extends Particle {
    constructor() {
        super({type: "fire"});
        this.color = [255, 0, 0];
    }
}

class Smoke extends Particle {
    constructor() {
        super({type: "smoke"});
        this.color = [128, 128, 128];
    }
}

class Empty extends Particle {
    constructor() {
        super({type: "empty"});
        super.empty = true;
        this.color = [0, 0, 0];
    }
    move(grid, index) {
        // Leere Zellen bewegen sich nicht
    }
}

// Klassen global machen
window.Particle = Particle;
window.Sand = Sand;
window.Water = Water;
window.Wood = Wood;
window.Fire = Fire;
window.Smoke = Smoke;
window.Empty = Empty;