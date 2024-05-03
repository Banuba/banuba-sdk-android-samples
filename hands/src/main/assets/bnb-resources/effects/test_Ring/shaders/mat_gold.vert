#include <bnb/glsl.vert>
#include <bnb/decode_int1010102.glsl>

BNB_LAYOUT_LOCATION(0) BNB_IN vec3 attrib_pos;
#ifdef BNB_VK_1
BNB_LAYOUT_LOCATION(1) BNB_IN uint attrib_n;
BNB_LAYOUT_LOCATION(2) BNB_IN uint attrib_t;
#else
BNB_LAYOUT_LOCATION(1) BNB_IN vec4 attrib_n;
BNB_LAYOUT_LOCATION(2) BNB_IN vec4 attrib_t;
#endif
BNB_LAYOUT_LOCATION(3) BNB_IN vec2 attrib_uv;

BNB_OUT(0) vec2 var_uv;
BNB_OUT(1) vec3 var_t;
BNB_OUT(2) vec3 var_b;
BNB_OUT(3) vec3 var_n;
BNB_OUT(4) vec3 var_v;

void main()
{
	vec3 vpos = attrib_pos;

	gl_Position = bnb_MVP*vec4(vpos,1.);

	var_uv = attrib_uv;

	var_n = mat3(bnb_MV)*bnb_decode_int1010102(attrib_n).xyz;
	var_t = mat3(bnb_MV)*bnb_decode_int1010102(attrib_t).xyz;
	var_b = bnb_decode_int1010102(attrib_t).w*cross( var_n, var_t );
	var_v = (bnb_MV*vec4(vpos,1.)).xyz;
}
