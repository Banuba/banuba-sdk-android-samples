#include <bnb/glsl.frag>

#ifndef BNB_GL_ES_1

precision mediump float;
precision mediump sampler2DArray;
precision mediump sampler2DShadow;

#endif /* BNB_GL_ES_1 */

BNB_IN(0) vec2 var_uv;
BNB_IN(1) vec3 var_t;
BNB_IN(2) vec3 var_b;
BNB_IN(3) vec3 var_n;
BNB_IN(4) vec3 var_v;

BNB_DECLARE_SAMPLER_2D(0, 1, base_color);
BNB_DECLARE_SAMPLER_2D(2, 3, metallic_roughness);
BNB_DECLARE_SAMPLER_2D(4, 5, normal);
BNB_DECLARE_SAMPLER_CUBE(6, 7, tex_ibl_diff);
BNB_DECLARE_SAMPLER_CUBE(8, 9, tex_ibl_spec);
BNB_DECLARE_SAMPLER_2D(14, 15, eyelids_tex);
BNB_DECLARE_SAMPLER_2D(16, 17, shadows);


// gamma to linear
vec3 g2l( vec3 g )
{
	return g*(g*(g*0.305306011+0.682171111)+0.012522878);
}

// combined hdr to ldr and linear to gamma
vec3 l2g( vec3 l )
{
	return sqrt(1.33*(1.-exp(-l)))-0.03;
}

vec3 fresnel_schlick_roughness( float prod, vec3 F0, float roughness )
{
	return F0 + ( max( F0, 1. - roughness ) - F0 )*pow( 1. - prod, 5. );
}

vec2 brdf_approx( float Roughness, float NoV )
{
	const vec4 c0 = vec4( -1., -0.0275, -0.572, 0.022 );
	const vec4 c1 = vec4( 1., 0.0425, 1.04, -0.04 );
	vec4 r = Roughness*c0 + c1;
	float a004 = min( r.x*r.x, exp2( -9.28*NoV ) )*r.x + r.y;
	vec2 AB = vec2( -1.04, 1.04 )*a004 + r.zw;
	return AB;
}

vec3 fresnel_schlick( float prod, vec3 F0 )
{
    return F0 + ( 1. - F0 )*pow( 1. - prod, 5. );
}

float distribution_GGX( float cN_H, float roughness )
{
    float a = roughness*roughness;
    float a2 = a*a;
    float d = cN_H*cN_H*( a2 - 1. ) + 1.;
    return a2/(3.14159265*d*d);
}

float geometry_schlick_GGX( float NV, float roughness )
{
    float r = roughness + 1.;
    float k = r*r/8.;
    return NV/( NV*( 1. - k ) + k );
}

float geometry_smith( float cN_L, float ggx2, float roughness )
{
    return geometry_schlick_GGX( cN_L, roughness )*ggx2;
}

float diffuse_factor( float n_l, float w )
{
    float w1 = 1. + w;
    return pow( max( 0., n_l + w )/w1, w1 );
}

vec3 blendMultiply(vec3 base, vec3 blend)
{
    return base * blend;
}
vec3 blendMultiply(vec3 base, vec3 blend, float opacity)
{
    return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}

void main()
{

	vec3 radiance[4];
	radiance[0] = radiance_1.xyz;
	radiance[1] = radiance_2.xyz;   
	radiance[2] = radiance_3.xyz;   
	radiance[3] = radiance_4.xyz;   


	vec4 lights[4];
	lights[0] = vec4(normalize(lights_1.xyz),1.);
	lights[1] = vec4(normalize(lights_2.xyz),1.);
    lights[2] = vec4(normalize(lights_3.xyz),1.);
	lights[3] = vec4(normalize(lights_4.xyz),1.);


	vec4 base_opacity = BNB_TEXTURE_2D(BNB_SAMPLER_2D(base_color),var_uv);
	vec4 shadows = BNB_TEXTURE_2D(BNB_SAMPLER_2D(shadows),var_uv);
	vec4 eyelids = BNB_TEXTURE_2D(BNB_SAMPLER_2D(eyelids_tex),var_uv);
	
	vec3 base = vec3(1.);

	base = blendMultiply(base, g2l(shadows_color.rgb), shadows.r * shadows_color.a);
	base = blendMultiply(base, g2l(eyelids_color.rgb), eyelids.r * eyelids_color.a);
	base = blendMultiply(base, vec3(0.), base_opacity.r);

	float opacity = 1.;

	bnb_FragColor = vec4(base,opacity);
}
