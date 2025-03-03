export const meshStandardVertexShader = `
#version 300 es
precision mediump sampler2DArray;
#define attribute in
#define varying out
#define texture2D texture
precision highp float;
precision highp int;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    vViewPosition = -mvPosition.xyz;
    vNormal = normalMatrix * normal;
}
`;

export const meshStandardFragmentShader = `
#version 300 es
precision mediump sampler2DArray;
#define varying in
layout(location = 0) out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
precision highp float;

uniform vec3 diffuse;
uniform float roughness;
uniform float metalness;
uniform float opacity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
    vec4 diffuseColor = vec4(diffuse, opacity);
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Basic lighting calculation
    float NdotV = max(dot(normal, viewDir), 0.0);
    vec3 color = diffuseColor.rgb * NdotV;
    
    gl_FragColor = vec4(color, diffuseColor.a);
}
`; 