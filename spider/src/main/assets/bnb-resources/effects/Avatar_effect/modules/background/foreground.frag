#include <bnb/glsl.frag>
#include "blend_modes.glsl"

BNB_IN(0)
vec2 var_uv;
BNB_IN(1)
vec2 var_uv2;

BNB_DECLARE_SAMPLER_2D(0, 1, tex_camera);
BNB_DECLARE_SAMPLER_2D(2, 3, tex_foreground);

void main()
{
    vec2 uv = var_uv;
    vec2 uv2 = var_uv2;

    vec4 base_color = BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_camera), uv);
    vec4 texture_color = BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_foreground), uv2);

    vec3 rgb = texture_color.rgb;
    float a = texture_color.a;

    float mode = foreground_mode_aspect_rotation.x;

    if (mode == 0.)
        rgb = blendNormal(base_color.rgb, texture_color.rgb, texture_color.a);
    else if (mode == 1.)
        rgb = blendMultiply(base_color.rgb, texture_color.rgb, texture_color.a);
    else if (mode == 2.)
        rgb = blendScreen(base_color.rgb, texture_color.rgb, texture_color.a);
    else if (mode == 3.)
        rgb = blendOverlay(base_color.rgb, texture_color.rgb, texture_color.a);
    else if (mode == 4.)
        rgb = blendSoftLight(base_color.rgb, texture_color.rgb, texture_color.a);
    else if (mode == 5.)
        rgb = blendHardLight(base_color.rgb, texture_color.rgb, texture_color.a);
    else if (mode == 6.)
        rgb = blendAdd(base_color.rgb, texture_color.rgb, texture_color.a);
    else if (mode == 7.)
        rgb = blendLighten(base_color.rgb, texture_color.rgb, texture_color.a);
    else if (mode == 8.)
        rgb = blendColorDodge(base_color.rgb, texture_color.rgb, texture_color.a);

    bnb_FragColor = vec4(rgb, a);
}