export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform sampler2D tDiffuse;
  uniform sampler2D tText;
  uniform float time;
  uniform float sIntensity;
  uniform float sCount;
  uniform float nIntensity;
  uniform float vIntensity;
  uniform float brightness;
  uniform float scanSpeed;
  uniform float scanWidth;
  uniform float pixelShift;
  varying vec2 vUv;

  float random(vec2 c) {
    return fract(sin(dot(c.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    
    // Scanning line distortion
    float scanPos = 1.0 - mod(time * scanSpeed, 1.0 + scanWidth * 2.0) + scanWidth;
    float scanEffect = smoothstep(scanPos - scanWidth, scanPos, uv.y) - 
            smoothstep(scanPos, scanPos + scanWidth, uv.y);
    
    // Apply horizontal shift at scan line
    vec2 distortedUv = uv;
    distortedUv.x += scanEffect * pixelShift;
    
    // Sample texture with distortion
    vec4 texel = texture2D(tDiffuse, distortedUv);
    
    // Convert to black and white using luminance
    float luminance = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
    texel.rgb = vec3(luminance);
    
    // Create rolling scanlines
    float scanline = 0.5 + 0.5 * sin((uv.y + mod(time * 0.5, 1.0)) * sCount);
    scanline = 1.0 - (scanline * sIntensity);
    
    // Create static noise effect
    float noise = random(uv + vec2(time * 0.01)) * nIntensity;
    
    // Create rectangular vignette effect
    vec2 vignetteUv = abs(uv - 0.5) * 2.0;
    float vig = 1.0 - vIntensity * max(vignetteUv.x, vignetteUv.y);
    vig = pow(vig, 2.0);
    
    // Add chromatic aberration (only to the grayscale image)
    float aberration = 0.003;
    vec2 uvR = distortedUv + vec2(aberration, 0.0);
    vec2 uvB = distortedUv - vec2(aberration, 0.0);
    vec3 color;
    color.r = texture2D(tDiffuse, uvR).r;
    color.g = texel.g;
    color.b = texture2D(tDiffuse, uvB).b;
    
    // Convert the chromatic aberration result to grayscale as well
    float aberrationLuminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = vec3(aberrationLuminance);
    
    // Composite the effects
    vec3 result = color;
    result *= scanline * vig * brightness;
    result += vec3(noise);
    
    // Get text with proper positioning
    vec4 textColor = texture2D(tText, distortedUv);
    
    // Simple text overlay without any effects
    result = mix(result, textColor.rgb, textColor.a * 0.9);
    
    gl_FragColor = vec4(result, 1.0);
  }
`;
