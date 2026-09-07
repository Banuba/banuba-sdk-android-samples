#include <bnb/glsl.vert>

BNB_LAYOUT_LOCATION(0) BNB_IN vec2 attrib_pos;

void main()
{
	mat3 lt = mat3(bnb_face_box_transform);
	gl_Position = vec4( (lt*vec3(attrib_pos,1.)).xy, 0., 1. );
}
