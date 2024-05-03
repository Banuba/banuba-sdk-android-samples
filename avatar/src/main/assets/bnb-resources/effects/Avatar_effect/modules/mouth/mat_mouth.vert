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

BNB_DECLARE_SAMPLER_2D_ARRAY(12, 13, tex_blend_shapes);

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
    ivec2 bs_p_uv = ivec2((vertex_idx&31)<<1,vertex_idx>>5);
    vec3 vn = attrib_n1.xyz;
    ivec2 bs_n_uv = ivec2(bs_p_uv.x+1,bs_p_uv.y);

    int au_size = textureSize(BNB_SAMPLER_2D_ARRAY(tex_blend_shapes), 0 ).z;
    for( int i = 0; i != au_size; ++i )
    {
                float bs_w;
        bs_w = mix(bnb_AU[i>>2][i&3], 0.0, is_face_anim.y);
        if(i == 3 || i == 4){
            bs_w = max(bs_w,mouth_shape_sv_sh_pv_smile.w);
        }
        if(i == 7)
            bs_w = face_shape_rstd.x; // ShapeFaceRound
        if(i == 8)
            bs_w = face_shape_rstd.y; // ShapeFaceSquare
        if(i == 9)
            bs_w = face_shape_rstd.z; // ShapeFaceTriangle
        if(i == 10)
            bs_w = face_shape_rstd.w; // ShapeFaceDiamond
        if(i == 11)
            bs_w = face_shape_hpro.x; // ShapeFaceHeart
        if(i == 12)
            bs_w = face_shape_hpro.y; // ShapeFacePear
        if(i == 13)
            bs_w = face_shape_hpro.z; // ShapeFaceRectangular
        if(i == 14)
            bs_w = face_shape_hpro.w; // ShapeFaceOblong
        if(i == 15)
            bs_w = mouth_shape_sv_sh_pv_smile.y; // ShapeMouthSizeHorizontal
        if(i == 16)
            bs_w = mouth_shape_sv_sh_pv_smile.z; // ShapeMouthPositionVertical
        
        if( bs_w != 0. )
        {
            vec3 bs_p_delta = texelFetch(BNB_SAMPLER_2D_ARRAY(tex_blend_shapes), ivec3(bs_p_uv,i), 0 ).xyz*bs_w;
            vpos += bs_p_delta;
            vec3 bs_n_delta = texelFetch(BNB_SAMPLER_2D_ARRAY(tex_blend_shapes), ivec3(bs_n_uv,i), 0 ).xyz*bs_w;
            vn += bs_n_delta;
        }
    }

	mat4 m = bnb_get_transform();
	vpos = (vec4(vpos,1.) * m).xyz;

    // vpos.z -= 1680.;
    mat4 mv = bnb_MV_[19];

    float scale = position_scale.w;

        vec2 position = position_scale.xy;
                float mv_scale = length(mv[0].xyz);

    mat3 mv_rot = mat3(mv)/mv_scale;

    float XAngle = atan(mv_rot[2].y,mv_rot[2].z);
    float YAngle = atan(-mv_rot[2].x,sqrt(mv_rot[2].y*mv_rot[2].y + sqrt(mv_rot[2].z*mv_rot[2].z)));
    float ZAngle = atan(mv_rot[1].x,mv_rot[0].x);

    vec2 limits = js_limits.xy;

        // if(is_face_anim.x == 0.){
        XAngle =mix(XAngle, 1.570796, is_face_anim.y);
        YAngle = mix(YAngle, 0.0, is_face_anim.y);
        ZAngle = mix(ZAngle, 0.0, is_face_anim.y);
    // }

    if(YAngle < 0.)
        YAngle = max(YAngle, limits.x*3.14/180.);
    else if(YAngle > 0.)
        YAngle = min(YAngle, limits.y*3.14/180.);

    mat3 Xrot = mat3(
        vec3(1., 0., 0.),
        vec3(0., cos(XAngle), -sin(XAngle)),
        vec3(0., sin(XAngle), cos(XAngle))
    );

    mat3 Yrot = mat3(
        vec3(cos(YAngle), 0., sin(YAngle)),
        vec3(0., 1., 0.),
        vec3(-sin(YAngle), 0., cos(YAngle))
    );

    mat3 Zrot = mat3(
        vec3(cos(ZAngle),-sin(ZAngle), 0.),
        vec3(sin(ZAngle), cos(ZAngle), 0.),
        vec3(0., 0., 1.)
    );

    mat3 rotation = Xrot*Yrot*Zrot*mv_scale;

    // if(attrib_bones[0] != 0u || attrib_bones[0] != 1u){
        mv[0].xyz = rotation[0];
        mv[1].xyz = rotation[1];
        mv[2].xyz = rotation[2];
    // }
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
