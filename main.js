c = document.body.appendChild(document.createElement`canvas`);
c.width = 1280;
c.height = 720;

for (i in g = c.getContext`webgl`) {
    g[i[0] + i[6]] = g[i];
}

for (i in a = new AudioContext) {
    a[i[6]] = a[i];
}

cs = (src, type, shader = g.cS(type)) => {
    g.sS(shader, src);
    g.compileShader(shader);
    return shader;
}

d = _ => {  
    g.uniform1f(g.gf(p, "t"), a.currentTime);
    g.dr(6, 0, 3);
    requestAnimationFrame(d);
}

c.onclick = _ => {
    c.requestFullscreen();
    g.aS(p = g.cP(), cs(`attribute vec4 p;void main(){gl_Position=p;}`, 35633));
    g.aS(p, cs(shader_frag, 35632));

    g.lo(p);

    g.vA(g.ug(p), 2, 5120, g.bf(34962, g.cB()), 1, g.bD(34962, new Int8Array([1, -3, 1, 1]), 35044));
    g.eV(0);
    
    c = a.B();
    c.buffer = a.createBuffer(1, q = 44000 * 45, 44000);
    for (t = q; t--;) {
        //Write tune here
        c.buffer.getChannelData(0)[t] = 
        (_ => {
            var fract = x => x % 1;
            var time = t / 48000;
            var m = Math;
            var noise = x => m.sin((x + 10) * m.sin(m.pow(x + 10, fract(x) + 10)));
            
            var bassmelodygen = function(time) {
                var melody = 0;
                for(let i = 0; i < 6; i++) {
                    var c = '44223322'.charAt(m.floor(time * 2) % 8);
                    melody += m.asin(
                        m.sin(time * ((0.5 + i * 20 * (1 - c)) + (i * 120.0 * c))) * (1 - fract(time * 4))) / m.PI;
                }
                return melody;
            };
            var hihat = noise(time) * m.pow(1 - fract(time * 4), 3) / 4;
            var kick = m.sin(m.pow(1 - fract(time + 0.5), 5) * 200);
            var snare = noise(m.floor(time * 2000)) * m.pow(1 - fract(time), 5) / 2;

            return (bassmelodygen(time) ** 3) + (hihat + kick + snare) / 2;
        })();
    }
    c.connect(a.a);
    c.start();
    d();
}
