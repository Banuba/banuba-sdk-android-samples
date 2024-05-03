#include <bnb/glsl.vert>

BNB_LAYOUT_LOCATION(0) BNB_IN vec2 attrib_pos;

BNB_OUT(0) vec2 var_uv;

void main()
{
    vec2 v = attrib_pos.xy;
    v *= 0.225;
    v.y += 0.75;
    v.x += 0.6;
    gl_Position = bnb_MV * vec4( v, 0., 1. );
    var_uv = attrib_pos.xy*0.5 + 0.5;
    var_uv.y = 1. - var_uv.y;
}