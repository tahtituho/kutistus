precision lowp float;
uniform float t;
vec2 resolution = vec2(1280, 720);
float d;
float mt;

vec3 as;
vec3 ac;

vec2 uv;

vec3 rot(vec3 zp, vec3 a) {
    as = sin(a);
    ac = cos(a);
    zp = vec3(
        ac.z*zp.x-as.z*zp.y,
        as.z*zp.x+ac.z*zp.y,
        zp.z);
    return vec3(
        ac.y*zp.x+as.y*zp.z,
        zp.y,
        -as.y*zp.x+ac.y*zp.z
    );
}

float scene(vec3 path) {    
    mt = length(tan(path * 2.0 + t));
    path = rot(path, vec3(-t)) + sin(rot(path, vec3(t * 2.0))) * 0.3;
 
    vec4 p = vec4(path, 1.0);
    for (int i = 0; i < 12; i++) {
        p.xyz = clamp(p.xyz, -2.5, 2.5) * 2.0 - p.xyz; 
        float r = dot(p.xyz, p.xyz);
        p *= ((r < 6.0) ? 6.0 / r : 1.0) * (-29.8 * 0.272321 + 5.0);
    }
    return length(p.xyz) / abs(p.w);
}

void main() {
    uv = (2.0 * gl_FragCoord.xy - resolution) / resolution.y;
    for(int i = 0; i <= 64; i++) {
        d += scene(vec3(0.01) + normalize(vec3(0.0, -0.5145, -0.8575) + uv.x * vec3(-0.75, 0.0, 0.0) + uv.y * vec3(0.0, 0.6443, -0.3859)) * d);
    }
    gl_FragColor = vec4(vec3(smoothstep(d, 0.0, 2.0)) * (mt * vec3(0.94, 0.81, 0.05)), 1.0); 
}