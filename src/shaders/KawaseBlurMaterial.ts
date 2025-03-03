export const kawaseBlurVertexShader = `
#version 300 es
precision mediump sampler2DArray;
#define attribute in
#define varying out
#define texture2D texture
precision highp float;
precision highp int;

attribute vec3 position;
attribute vec2 uv;

uniform vec2 texelSize;
uniform float kernel;
uniform float scale;

varying vec2 vUv;
varying vec2 uv0;
varying vec2 uv1;
varying vec2 uv2;
varying vec2 uv3;

void main() {
    vUv = uv;
    
    // Compute the texture coordinates for the diamond pattern
    vec2 dUv = texelSize * vec2(kernel) * scale;
    
    uv0 = vUv + vec2(-1.0, -1.0) * dUv;
    uv1 = vUv + vec2(1.0, -1.0) * dUv;
    uv2 = vUv + vec2(-1.0, 1.0) * dUv;
    uv3 = vUv + vec2(1.0, 1.0) * dUv;
    
    gl_Position = vec4(position, 1.0);
}
`;

export const kawaseBlurFragmentShader = `
#version 300 es
precision mediump sampler2DArray;
#define varying in
layout(location = 0) out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
precision highp float;

uniform sampler2D tDiffuse;

varying vec2 vUv;
varying vec2 uv0;
varying vec2 uv1;
varying vec2 uv2;
varying vec2 uv3;

void main() {
    vec4 sum = texture(tDiffuse, uv0);
    sum += texture(tDiffuse, uv1);
    sum += texture(tDiffuse, uv2);
    sum += texture(tDiffuse, uv3);
    
    gl_FragColor = sum * 0.25;
}
`; 