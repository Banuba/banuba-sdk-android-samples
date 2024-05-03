#include <bnb/glsl.vert>

BNB_LAYOUT_LOCATION(0) BNB_IN vec2 attrib_pos;

void main()
{
    vec4 vpos = vec4(attrib_pos, 0., 1.);

    gl_Position = bnb_MV * vpos;
}