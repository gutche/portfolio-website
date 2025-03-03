export {
    meshStandardVertexShader,
    meshStandardFragmentShader
} from './MeshStandardMaterial';

export {
    sdfTextVertexShader,
    sdfTextFragmentShader
} from './SDFTextMaterial';

export {
    luminanceVertexShader,
    luminanceFragmentShader
} from './LuminanceMaterial';

export {
    kawaseBlurVertexShader,
    kawaseBlurFragmentShader
} from './KawaseBlurMaterial';

export {
    copyVertexShader,
    copyFragmentShader
} from './CopyMaterial';

// Common shader utilities
export const ShaderLib = {
    common: `
    vec3 LinearTosRGB(vec3 color) {
        vec3 a = 12.92 * color;
        vec3 b = 1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055;
        vec3 c = step(vec3(0.0031308), color);
        return mix(a, b, c);
    }
    
    vec4 LinearTosRGB(vec4 color) {
        return vec4(LinearTosRGB(color.rgb), color.a);
    }
    
    vec3 sRGBToLinear(vec3 color) {
        vec3 a = color / 12.92;
        vec3 b = pow((color + 0.055) / 1.055, vec3(2.4));
        vec3 c = step(vec3(0.04045), color);
        return mix(a, b, c);
    }
    
    vec4 sRGBToLinear(vec4 color) {
        return vec4(sRGBToLinear(color.rgb), color.a);
    }
    `
}; 