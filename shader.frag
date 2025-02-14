precision lowp float;
uniform float t;
vec2 resolution = vec2(1280, 720);
float d;
float mt;

float as;
float ac;

vec2 uv;

vec3 rot(vec3 zp, float a) {
    as = sin(a);
    ac = cos(a);
    return vec3(
        ac*zp.x+as*zp.z,
        zp.y,
        -as*zp.x+ac*zp.z
    );
}

float scene(vec3 path) {    
    path = vec3(1.0, -1.5, 0.0) + path + sin(rot(path, t)) * 0.2;
    mt = length(abs(cos(path * 5.0)) - 1.0);
    return (abs(dot(cos(path), sin(path.zxy)) - 3.0) - 2.0);
}

void main() {
    uv = (2.0 * gl_FragCoord.xy - resolution) / resolution.y;
    for(int i = 0; i <= 64; i++) {
        d += scene(vec3(-t) + normalize(vec3(0.0, -0.5145, -0.8575) + uv.x * vec3(-0.75, 0.0, 0.0) + uv.y * vec3(0.0, 0.6443, -0.3859)) * d);
    }
    gl_FragColor = vec4(vec3(smoothstep(0.0, d, 2.0)) * (mt * vec3(0.94, 0.81, 0.05)), 1.0); 
}