export const luminanceVertexShader = `
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

export const luminanceFragmentShader = `
#version 300 es
precision mediump sampler2DArray;
#define varying in
layout(location = 0) out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
precision highp float;

uniform sampler2D tDiffuse;
uniform float luminanceThreshold;
uniform float smoothWidth;

varying vec2 vUv;

void main() {
    vec4 texel = texture(tDiffuse, vUv);
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float v = dot(texel.xyz, luma);
    
    vec4 outputColor = vec4(0.0, 0.0, 0.0, 1.0);
    
    float alpha = smoothstep(luminanceThreshold, luminanceThreshold + smoothWidth, v);
    
    gl_FragColor = mix(outputColor, texel, alpha);
}
`; 