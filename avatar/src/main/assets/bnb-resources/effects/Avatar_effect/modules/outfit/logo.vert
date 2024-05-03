#include <bnb/glsl.vert>
#include<bnb/matrix_operations.glsl>
#include <bnb/decode_int1010102.glsl>

BNB_LAYOUT_LOCATION(0) BNB_IN vec3 attrib_pos;

#if defined(BNB_VK_1)
BNB_LAYOUT_LOCATION(1) BNB_IN uint attrib_n;
BNB_LAYOUT_LOCATION(2) BNB_IN uint attrib_t;
#else
BNB_LAYOUT_LOCATION(1) BNB_IN vec4 attrib_n;
BNB_LAYOUT_LOCATION(2) BNB_IN vec4 attrib_t;
#endif

BNB_LAYOUT_LOCATION(3) BNB_IN vec2 attrib_uv;

#ifndef BNB_GL_ES_1
BNB_LAYOUT_LOCATION(4) BNB_IN uvec4 attrib_bones;
#else
BNB_LAYOUT_LOCATION(4) BNB_IN vec4 attrib_bones;
#endif

BNB_LAYOUT_LOCATION(5) BNB_IN vec4 attrib_weights;
#ifdef GLFX_MALI_VERTEX_ID_ATTRIB
BNB_LAYOUT_LOCATION(6) BNB_IN uint attrib_vertex_id;
#endif

BNB_DECLARE_SAMPLER_2D(10, 11, bnb_BONES);

BNB_OUT(0) vec2 var_uv;
BNB_OUT(1) vec3 var_t;
BNB_OUT(2) vec3 var_b;
BNB_OUT(3) vec3 var_n;
BNB_OUT(4) vec3 var_v;

#include <bnb/anim_transform.glsl>

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
	vec3 vpos = attrib_pos;
	vec4 attrib_n1 = decode_int1010102(attrib_n);

#ifdef GLFX_MALI_VERTEX_ID_ATTRIB
    int vertex_idx = int(attrib_vertex_id);
#else
    int vertex_idx = gl_VertexID;
#endif
    vec3 vn = attrib_n1.xyz;

	mat4 m = bnb_get_transform();
	vpos = (vec4(vpos,1.) * m).xyz;

    // vpos.z -= 1680.;
    float scale = position_scale.w;
    vec2 position = position_scale.xy;
    mat4 mv = bnb_MV_[19];
    
        mv[0] = vec4(0.1 *scale,0.,0.,0.);
        mv[1] = vec4(0.,0.,-0.1*scale,0.);
        mv[2] = vec4(0.,0.1*scale,0.,0.);
        mv[3].xyz = vec3(position.x, position.y, -1000.);

    mat4 proj = bnb_PROJ;
    float zn = 500.;
    float zf = 1500.;
    float fov = 30.;
    float aspect = bnb_SCREEN.x / bnb_SCREEN.y;
    float S1 = 1. / (tan((fov/2.) * (3.14/180.)) * aspect);
    float S2 = 1. / (tan((fov/2.) * (3.14/180.)));

    proj[2][2] = -(zf+zn)/(zf-zn);
    proj[3][2] = -2.*zf*zn/(zf-zn);

    proj[0][0] = S1;
    proj[1][1] = S2;
	gl_Position = proj * ( mv * vec4(vpos,1.) );

#ifdef BNB_VK_1
    gl_Position.z = (gl_Position.z+gl_Position.w)/2.0;
#endif

	var_uv = attrib_uv;

	mat3 mv0_3 = mat3(mv[0].xyz,mv[1].xyz,mv[2].xyz);
	mat3 m_3 = mat3(m[0].xyz,m[1].xyz,m[2].xyz);

	vec4 attrib_t1 = decode_int1010102(attrib_t);

	var_n = normalize(mv0_3*(vn*m_3));
	vec3 vt = shortest_arc_m3(attrib_n1.xyz,vn)*attrib_t1.xyz;
	var_t = normalize(mv0_3*(vt*m_3));
	var_b = attrib_t1.w * cross(var_n, var_t);
	var_v = (mv*vec4(vpos,1.)).xyz * 0.001;
}
