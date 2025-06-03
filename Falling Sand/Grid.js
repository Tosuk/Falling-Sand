class Grid {
    initialize(width, height) {
        this.width = width;
        this.height = height;
        this.grid = new Array(width * height).fill(0);
    }

    Clear() {
        this.grid = new Array(width * height).fill(0);
    }

    set(x, y, color) {
        this.grid[y * this.width + x] = this.varyColor(color);
    }

    setCircle(x, y, radius, color) {
        const radiusSquared = radius * radius;
        for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
                if (i * i + j * j <= radiusSquared) {
                    this.set(x + i, y + j, color);
                }
            }
        }
    }

    get(x, y) {
        return this.grid[y * this.width + x];
    }

    swap(a, b) {
        const temp = this.grid[a];
        this.grid[a] = this.grid[b];
        this.grid[b] = temp;
    }

    isEmpty(index) {
        return this.grid[index] === 0;
    }

    //
    //Farbenfunktionen
    //

    //varriert eine Farbe leicht, damit ein effekt von zb. Sand zu erzielen
    varyColor(color) {
        const hsv = this.rgb2hsv(color[0], color[1], color[2]);
        hsv.h = Math.floor(hsv.h)
        hsv.s = hsv.s + Math.floor(Math.random() * 21) - 10;
        hsv.v = hsv.v + Math.floor(Math.random() * 11) - 10;
        const rgb = this.HSVtoRGB(hsv.h / 360, hsv.s / 100, hsv.v / 100);
        //const r = Math.max(0, Math.min(255, color[0] + Math.floor(Math.random() * 21) - 10));
        //const g = Math.max(0, Math.min(255, color[1] + Math.floor(Math.random() * 21) - 10));
        //const b = Math.max(0, Math.min(255, color[2] + Math.floor(Math.random() * 21) - 10));
        return [rgb.r, rgb.g, rgb.b];
    }


    // https://stackoverflow.com/questions/8022885/rgb-to-hsv-color-in-javascript
    rgb2hsv(r, g, b) {
        let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
        rabs = r / 255;
        gabs = g / 255;
        babs = b / 255;
        v = Math.max(rabs, gabs, babs),
        diff = v - Math.min(rabs, gabs, babs);
        diffc = c => (v - c) / 6 / diff + 1 / 2;
        percentRoundFn = num => Math.round(num * 100) / 100;
        if (diff == 0) {
             h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(rabs);
            gg = diffc(gabs);
            bb = diffc(babs);

            if (rabs === v) {
                h = bb - gg;
            } else if (gabs === v) {
                h = (1 / 3) + rr - bb;
            } else if (babs === v) {
                h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
                h += 1;
            } else if (h > 1) {
                h -= 1;
            }
        }
        return {
            h: Math.round(h * 360),
            s: percentRoundFn(s * 100),
            v: percentRoundFn(v * 100)
        };
    }

    //https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
    HSVtoRGB(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

}

window.Grid = Grid;