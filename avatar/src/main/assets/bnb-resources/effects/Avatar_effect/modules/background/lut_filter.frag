#include <bnb/glsl.frag>
#include <bnb/lut.glsl>

BNB_IN(0)
vec2 var_uv;

BNB_DECLARE_SAMPLER_2D(0, 1, tex_camera);
BNB_DECLARE_SAMPLER_LUT(2, 3, tex_filter);

void main()
{
    vec4 camera = BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_camera), var_uv);
    vec3 color = BNB_TEXTURE_LUT(camera.rgb, BNB_PASS_SAMPLER_ARGUMENT(tex_filter));

    vec3 colored = mix(camera.rgb, color.rgb, lut_strength.x);

    bnb_FragColor = vec4(colored.rgb, camera.a);
}