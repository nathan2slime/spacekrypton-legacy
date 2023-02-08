uniform sampler2D base;
uniform sampler2D _texture;

varying vec2 vUv;

varying vec3 vposO;
varying vec3 vposW;
varying vec3 vposW1;
varying vec3 vNormalW;


void main(void){
    vec4 g = texture2D(base, vUv);
    vec4 base0 = texture2D(_texture, vUv);

    float g1 = sin(vposW1.z - 1.5);
    vec3 c =  vec3(0., 242., 235.) / 255.;

    vec2 st = fract(vUv * 200.);
    float d = distance(vec2(.5), st);
    d = step(.1, d);

    vec3 bolinhas = (vec3(1.-d) * base0.rgb) * c;
    g.rgb *= c;

    vec3 viewDirectionW = normalize(cameraPosition - vposW);
    float fresnelTerm = dot(viewDirectionW, vNormalW) * 1.5;
    fresnelTerm = clamp(1. - fresnelTerm, 0., 1.);
    // float alpha = base.r * hologram * fresnelTerm;

    gl_FragColor = vec4(100. * (bolinhas + g.rgb) *g1 * (fresnelTerm +.95), (bolinhas.g + g.g) * base0.r);
    // gl_FragColor = vec4(vec3(1.) * fresnelTerm, 1.);
}