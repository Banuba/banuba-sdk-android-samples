#include <bnb/glsl.frag>
#include <bnb/transform_uv.glsl>

BNB_IN(0) vec2 var_uv;

BNB_DECLARE_SAMPLER_2D(0, 1, s_text);

void main()
{
    vec2 uv = bnb_contain_uv(var_uv, vec2(1024.,768.), 2.0, 0.0);
    float text_mask = BNB_TEXTURE_2D(BNB_SAMPLER_2D(s_text), uv).x;
    bnb_FragColor = vec4(1., 1., 1., text_mask);
}