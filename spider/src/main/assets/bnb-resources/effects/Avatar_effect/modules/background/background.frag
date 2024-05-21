#include <bnb/glsl.frag>

BNB_IN(0)
vec2 var_uv;
BNB_IN(1)
vec2 var_uv2;

BNB_DECLARE_SAMPLER_2D(0, 1, tex_background);

void main()
{
    vec2 uv = var_uv;
    vec2 uv2 = var_uv2;
    
    vec4 texture_color = BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_background), uv2);

    vec3 rgb = texture_color.rgb;
    float a = texture_color.a;

    bnb_FragColor = vec4(rgb, 1.0);
}