export const copyVertexShader = `
#version 300 es
precision mediump sampler2DArray;
#define attribute in
#define varying out
#define texture2D texture
precision highp float;
precision highp int;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

export const copyFragmentShader = `
#version 300 es
precision mediump sampler2DArray;
#define varying in
layout(location = 0) out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
precision highp float;

uniform sampler2D tDiffuse;
uniform float opacity;

varying vec2 vUv;

void main() {
    vec4 texel = texture(tDiffuse, vUv);
    gl_FragColor = opacity * texel;
    
    #ifdef ENCODE_OUTPUT
    gl_FragColor = LinearTosRGB(gl_FragColor);
    #endif
}
`; 