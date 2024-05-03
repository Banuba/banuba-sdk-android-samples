#include <bnb/glsl.vert>

#define FINGER_SCALE 0.95

BNB_LAYOUT_LOCATION(0) BNB_IN vec3 attrib_pos;
#ifdef BNB_VK_1
BNB_LAYOUT_LOCATION(1) BNB_IN uint attrib_n;
BNB_LAYOUT_LOCATION(2) BNB_IN uint attrib_t;
#else
BNB_LAYOUT_LOCATION(1) BNB_IN vec4 attrib_n;
BNB_LAYOUT_LOCATION(2) BNB_IN vec4 attrib_t;
#endif
BNB_LAYOUT_LOCATION(3) BNB_IN vec2 attrib_uv;

void main()
{
	vec3 vpos = attrib_pos;
	vpos.xy *= FINGER_SCALE;

	gl_Position = bnb_MVP*vec4(vpos,1.);
}
