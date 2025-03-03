export const sdfTextVertexShader = `
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

uniform float uTroikaGlyphVSize;
uniform vec2 uTroikaClipRect;
uniform vec4 uTroikaCurveRadius;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;
attribute vec4 troikaGlyphBounds;
attribute vec3 troikaGlyphColor;
attribute float troikaGlyphIndex;

varying vec2 vUv;
varying vec3 vNormal;
varying vec4 vGlyphBounds;
varying vec3 vGlyphColor;
varying float vGlyphIndex;

void main() {
    vUv = uv;
    vNormal = normalMatrix * normal;
    vGlyphBounds = troikaGlyphBounds;
    vGlyphColor = troikaGlyphColor;
    vGlyphIndex = troikaGlyphIndex;
    
    vec4 pos = vec4(position, 1.0);
    vec4 mvPosition = modelViewMatrix * pos;
    gl_Position = projectionMatrix * mvPosition;
}
`;

export const sdfTextFragmentShader = `
#version 300 es
precision mediump sampler2DArray;
#define varying in
layout(location = 0) out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
precision highp float;

uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaDistanceOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaOutlineOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec4 vGlyphBounds;
varying vec3 vGlyphColor;
varying float vGlyphIndex;

float median(float r, float g, float b) {
    return max(min(r, g), min(max(r, g), b));
}

void main() {
    // Calculate SDF
    vec2 textureUv = vUv * vGlyphBounds.zw + vGlyphBounds.xy;
    vec4 textureSample = texture(uTroikaSDFTexture, textureUv);
    float sdf = median(textureSample.r, textureSample.g, textureSample.b);
    
    // Apply distance transform
    float alpha = smoothstep(
        0.5 - uTroikaBlurRadius,
        0.5 + uTroikaBlurRadius,
        sdf + uTroikaDistanceOffset
    );
    
    // Stroke
    float strokeAlpha = smoothstep(
        0.5 - uTroikaBlurRadius - uTroikaStrokeWidth,
        0.5 + uTroikaBlurRadius - uTroikaStrokeWidth,
        sdf + uTroikaDistanceOffset
    );
    
    // Combine fill and stroke
    vec3 color = mix(uTroikaStrokeColor, vGlyphColor, alpha);
    float finalAlpha = mix(strokeAlpha * uTroikaStrokeOpacity, alpha * uTroikaFillOpacity, alpha);
    
    gl_FragColor = vec4(color, finalAlpha);
}
`; 