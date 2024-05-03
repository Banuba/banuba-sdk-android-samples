#include <bnb/glsl.vert>
#include <bnb/transform_uv.glsl>

BNB_LAYOUT_LOCATION(0)
BNB_IN vec3 attrib_pos;

BNB_OUT(0)
vec2 var_uv;
BNB_OUT(1)
vec2 var_uv2;

BNB_DECLARE_SAMPLER_2D(2, 3, tex_foreground);

vec2 aspect_fill_uv_tex(vec2 uv)
{
    vec2 fg_tex_size = vec2(textureSize(BNB_SAMPLER_2D(tex_foreground), 0));

    if (fg_tex_size.x < 1.0 || fg_tex_size.y < 1.0) {
        fg_tex_size = bnb_SCREEN.xy;
    }

    // according to content modes in bnb/transform_uv.glsl, 1. is aspect_fill
    float content_mode = foreground_mode_aspect_rotation.y;
    float foreground_rotation_angle = 0.;

    return bnb_contain_uv(uv, fg_tex_size, content_mode, foreground_rotation_angle);
}

mat3 shortest_arc_m3( vec3 from, vec3 to )
{
	vec3 a = cross( from, to );
	float c = dot( from, to );

	float t = 1./(1.+c);
	float tx = t*a.x;
	float ty = t*a.y;
	float tz = t*a.z;
	float txy = tx*a.y;
	float txz = tx*a.z;
	float tyz = ty*a.z;

	return mat3
	(
		c + tx*a.x, txy + a.z, txz - a.y,
		txy - a.z, c + ty*a.y, tyz + a.x,
		txz + a.y, tyz - a.x, c + tz*a.z
	);
}


void main()
{
    vec2 v = attrib_pos.xy;
    
    gl_Position = vec4(v, 1., 1.);
    var_uv = v * 0.5 + 0.5;
    var_uv -= mix(face_rotation.xy /20000., vec2(0.0), is_face_anim.y);
    var_uv2 = aspect_fill_uv_tex(var_uv);
    var_uv2 = bnb_rotate_uv(var_uv2, foreground_mode_aspect_rotation.z * 3.14/180.);
#ifdef BNB_VK_1
    var_uv.y = 1. - var_uv.y;
#endif

    var_uv2.y = 1. - var_uv2.y;
}