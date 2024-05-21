#include <bnb/glsl.vert>
#include <bnb/decode_int1010102.glsl>
#include<bnb/matrix_operations.glsl>
#define bnb_IDX_OFFSET 0
#ifdef BNB_VK_1
#ifdef gl_VertexID
#undef gl_VertexID
#endif
#ifdef gl_InstanceID
#undef gl_InstanceID
#endif
#define gl_VertexID gl_VertexIndex
#define gl_InstanceID gl_InstanceIndex
#endif

//#define BNB_USE_AUTOMORPH
//#define BNB_1_BONE

BNB_LAYOUT_LOCATION(0) BNB_IN vec3 attrib_pos;
#ifdef BNB_VK_1
BNB_LAYOUT_LOCATION(1) BNB_IN uint attrib_n;
#else
BNB_LAYOUT_LOCATION(1) BNB_IN vec4 attrib_n;
#endif
#ifdef BNB_VK_1
BNB_LAYOUT_LOCATION(2) BNB_IN uint attrib_t;
#else
BNB_LAYOUT_LOCATION(2) BNB_IN vec4 attrib_t;
#endif
BNB_LAYOUT_LOCATION(3) BNB_IN vec2 attrib_uv;
#ifndef BNB_GL_ES_1
BNB_LAYOUT_LOCATION(4) BNB_IN uvec4 attrib_bones;
#else
BNB_LAYOUT_LOCATION(4) BNB_IN vec4 attrib_bones;
#endif
#ifndef BNB_1_BONE
BNB_LAYOUT_LOCATION(5) BNB_IN vec4 attrib_weights;
#endif



BNB_DECLARE_SAMPLER_2D(4, 5, bnb_BONES);

#ifdef BNB_USE_AUTOMORPH

BNB_DECLARE_SAMPLER_2D(6, 7, bnb_MORPH);
#endif

BNB_OUT(0) vec2 var_uv;
BNB_OUT(1) vec3 var_t;
BNB_OUT(2) vec3 var_b;
BNB_OUT(3) vec3 var_n;


vec2 cylinder_proj( float half_angle, float y0, float y1, vec3 v )
{
	float x = atan( v.x, v.z )/half_angle;
	float y = ((v.y-y0)/(y1-y0))*2. - 1.;
	return vec2( x, y );
}

#include <bnb/get_bone.glsl>
#include <bnb/morph_transform.glsl>
void main()
{
	mat4 m = bnb_get_bone( 
#ifdef BNB_GL_ES_1
(float(attrib_bones[0]) * 3. + 0.5) * (1. / (bnb_ANIM.z * 3.)), 1. / (bnb_ANIM.z * 3.), (bnb_ANIM.x + 0.5) / bnb_ANIM.y
#else
attrib_bones[0], int(bnb_ANIMKEY)
#endif
 );
#ifndef BNB_1_BONE
	if( attrib_weights[1] > 0. )
	{
		m = m*attrib_weights[0] + bnb_get_bone( 
#ifdef BNB_GL_ES_1
(float(attrib_bones[1]) * 3. + 0.5) * (1. / (bnb_ANIM.z * 3.)), 1. / (bnb_ANIM.z * 3.), (bnb_ANIM.x + 0.5) / bnb_ANIM.y
#else
attrib_bones[1], int(bnb_ANIMKEY)
#endif
 )*attrib_weights[1];
		if( attrib_weights[2] > 0. )
		{
			m += bnb_get_bone( 
#ifdef BNB_GL_ES_1
(float(attrib_bones[2]) * 3. + 0.5) * (1. / (bnb_ANIM.z * 3.)), 1. / (bnb_ANIM.z * 3.), (bnb_ANIM.x + 0.5) / bnb_ANIM.y
#else
attrib_bones[2], int(bnb_ANIMKEY)
#endif
 )*attrib_weights[2];
			if( attrib_weights[3] > 0. )
				m += bnb_get_bone( 
#ifdef BNB_GL_ES_1
(float(attrib_bones[3]) * 3. + 0.5) * (1. / (bnb_ANIM.z * 3.)), 1. / (bnb_ANIM.z * 3.), (bnb_ANIM.x + 0.5) / bnb_ANIM.y
#else
attrib_bones[3], int(bnb_ANIMKEY)
#endif
 )*attrib_weights[3];
		}
	}
#endif

	vec3 vpos = vec3(vec4(attrib_pos,1.)*m);

#ifdef BNB_USE_AUTOMORPH
	vpos = bnb_auto_morph( vpos );
#endif

	gl_Position = bnb_MVP * vec4(vpos,1.);

	var_uv = attrib_uv;

	var_t = mat3(bnb_MV)*(bnb_decode_int1010102(attrib_t).xyz*mat3(m));
	var_n = mat3(bnb_MV)*(bnb_decode_int1010102(attrib_n).xyz*mat3(m));
	var_b = bnb_decode_int1010102(attrib_t).w * cross( var_n, var_t );
}
