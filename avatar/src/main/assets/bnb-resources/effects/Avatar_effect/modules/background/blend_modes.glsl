// https://github.com/jamieowen/glsl-blend/blob/master/normal.glsl
vec3 blendNormal(vec3 base, vec3 blend)
{
    return blend;
}
vec3 blendNormal(vec3 base, vec3 blend, float opacity)
{
    return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}

// https://github.com/jamieowen/glsl-blend/blob/master/multiply.glsl
vec3 blendMultiply(vec3 base, vec3 blend)
{
    return base * blend;
}
vec3 blendMultiply(vec3 base, vec3 blend, float opacity)
{
    return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}

// https://github.com/jamieowen/glsl-blend/blob/master/overlay.glsl
float blendOverlay(float base, float blend)
{
    return base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend));
}
vec3 blendOverlay(vec3 base, vec3 blend)
{
    return vec3(blendOverlay(base.r, blend.r), blendOverlay(base.g, blend.g), blendOverlay(base.b, blend.b));
}
vec3 blendOverlay(vec3 base, vec3 blend, float opacity)
{
    return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}

// https://github.com/jamieowen/glsl-blend/blob/master/screen.glsl
float blendScreen(float base, float blend)
{
    return 1.0 - ((1.0 - base) * (1.0 - blend));
}
vec3 blendScreen(vec3 base, vec3 blend)
{
    return vec3(blendScreen(base.r, blend.r), blendScreen(base.g, blend.g), blendScreen(base.b, blend.b));
}
vec3 blendScreen(vec3 base, vec3 blend, float opacity)
{
    return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
}

// https://github.com/jamieowen/glsl-blend/blob/master/soft-light.glsl
float blendSoftLight(float base, float blend)
{
    return (blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));
}
vec3 blendSoftLight(vec3 base, vec3 blend)
{
    return vec3(blendSoftLight(base.r, blend.r), blendSoftLight(base.g, blend.g), blendSoftLight(base.b, blend.b));
}
vec3 blendSoftLight(vec3 base, vec3 blend, float opacity)
{
    return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}

// https://github.com/jamieowen/glsl-blend/blob/master/hard-light.glsl
vec3 blendHardLight(vec3 base, vec3 blend)
{
    return blendOverlay(blend, base);
}
vec3 blendHardLight(vec3 base, vec3 blend, float opacity)
{
    return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));
}

float blendColorDodge(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
	return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
}

vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
}

float blendLighten(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
	return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}

float blendAdd(float base, float blend) {
	return min(base+blend,1.0);
}

vec3 blendAdd(vec3 base, vec3 blend) {
	return min(base+blend,vec3(1.0));
}

vec3 blendAdd(vec3 base, vec3 blend, float opacity) {
	return (blendAdd(base, blend) * opacity + base * (1.0 - opacity));
}