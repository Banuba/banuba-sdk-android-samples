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
BNB_DECLARE_SAMPLER_2D(14, 15, tex_overlay);
BNB_DECLARE_SAMPLER_2D(16, 17, lips);
BNB_DECLARE_SAMPLER_2D(18, 19, wrinkles);
BNB_DECLARE_SAMPLER_2D(20, 21, freckles);
BNB_DECLARE_SAMPLER_2D(22, 23, moles);
BNB_DECLARE_SAMPLER_2D(24, 25, blush);
BNB_DECLARE_SAMPLER_2D(26, 27, lips_glitter);
BNB_DECLARE_SAMPLER_2D(28, 29, facial);

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

float blendSoftLight(float base, float blend)
{
    return (blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));
}
vec3 blendSoftLight(vec3 base, vec3 blend)
{
    return vec3(blendSoftLight(base.r, blend.r), blendSoftLight(base.g, blend.g), blendSoftLight(base.b, blend.b));
}
vec3 blendSoftLight(vec3 base, vec3 blend, float opacity)
{
    return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}
float blendOverlay(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}
vec3 blendOverlay(vec3 base, vec3 blend) {
	return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}
vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}
vec3 blendMultiply(vec3 base, vec3 blend)
{
    return base * blend;
}
vec3 blendMultiply(vec3 base, vec3 blend, float opacity)
{
    return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}
vec4 blend(vec4 base, vec4 target, BNB_DECLARE_SAMPLER_2D_ARGUMENT(tex_mask))
{
    vec4 tex = BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_mask), var_uv);
    tex.rgb += target.rgb;
    tex.r *= target.a;

    // https://gist.github.com/JordanDelcros/518396da1c13f75ee057
    if (tex.r == 0.)
        return base;
    if (base.a == 0.)
        return tex;

    float a = 1. - (1. - base.a) * (1. - tex.r);
    vec3 rgb = mix(base.rgb * base.a, tex.rgb, tex.r) / a;

    return vec4(rgb, a);
}

vec4 blend(vec4 base, BNB_DECLARE_SAMPLER_2D_ARGUMENT(tex_mask))
{
    return blend(base, vec4(0., 0., 0., 1.), BNB_PASS_SAMPLER_ARGUMENT(tex_mask));
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
	vec4 overlay = BNB_TEXTURE_2D(BNB_SAMPLER_2D(tex_overlay),var_uv);
	vec3 freckles = BNB_TEXTURE_2D(BNB_SAMPLER_2D(freckles),var_uv).xyz;
	vec3 wrinkles = BNB_TEXTURE_2D(BNB_SAMPLER_2D(wrinkles),var_uv).xyz;
	vec3 moles = BNB_TEXTURE_2D(BNB_SAMPLER_2D(moles),var_uv).xyz;
	vec3 blush = BNB_TEXTURE_2D(BNB_SAMPLER_2D(blush),var_uv).xyz;
	vec3 facial = BNB_TEXTURE_2D(BNB_SAMPLER_2D(facial),var_uv).xyz;




	float mask = BNB_TEXTURE_2D(BNB_SAMPLER_2D(lips),var_uv).r;

	vec3 base = g2l(base_opacity.xyz) * blendOverlay(g2l(face_color.xyz), g2l(overlay.xyz));

	base = blendMultiply(base, g2l(wrinkles_color.rgb), wrinkles.r * wrinkles_color.a);
	base = blendMultiply(base, g2l(freckles_color.rgb), freckles.r * freckles_color.a);
	base = blendMultiply(base, g2l(moles_color.rgb), moles.r * moles_color.a);
	base = blendMultiply(base, g2l(blush_color.rgb), blush.r * blush_color.a);
	base = blendMultiply(base, g2l(facialhair_color.rgb), facial.r * facialhair_color.a);


	float opacity = base_opacity.w;

	vec3 mrao = BNB_TEXTURE_2D(BNB_SAMPLER_2D(metallic_roughness),var_uv).xyz;

	float metallic = mrao.z;
	float roughness = mrao.y;

	// if(mask > 0.1){
	// 	base = mix(base, lips_color.xyz, lips_color.w);
	// 	metallic = mix(metallic,lips_mr.x, lips_color.w);
	// 	roughness = mix(roughness,lips_mr.y, lips_color.w);
	// }

	base = mix(base,mix(base, g2l(lips_color.xyz), lips_color.w),mask);
	metallic = mix(metallic,mix(metallic,lips_mr.x, lips_color.w),mask);
	roughness = mix(roughness,mix(roughness,lips_mr.y, lips_color.w),mask);

	vec3 N = normalize( mat3(var_t,var_b,var_n)*(BNB_TEXTURE_2D(BNB_SAMPLER_2D(normal),var_uv).xyz*2.-1.) );

	vec3 V = normalize( -var_v );
	float cN_V = max( 0., dot( N, V ) );
	vec3 R = reflect( -V, N );

	vec3 F0 = mix( vec3(0.04), base, metallic );

	vec3 F = fresnel_schlick_roughness( cN_V, F0, roughness );
	vec3 kD = ( 1. - F )*( 1. - metallic );

	vec3 diffuse = BNB_TEXTURE_CUBE( BNB_SAMPLER_CUBE(tex_ibl_diff), N ).xyz * base;

	const float MAX_REFLECTION_LOD = 7.; // number of mip levels in tex_ibl_spec
	vec3 prefilteredColor = BNB_TEXTURE_CUBE_LOD( BNB_SAMPLER_CUBE(tex_ibl_spec), R, roughness*MAX_REFLECTION_LOD ).xyz;
	vec2 brdf = brdf_approx( roughness, cN_V );
	vec3 specular = prefilteredColor * (F0 * brdf.x + brdf.y);

	vec3 color = (kD*diffuse + specular);

	    float ggx2 = geometry_schlick_GGX( cN_V, roughness );
    for( int i = 0; i != 4; ++i )
    {
        vec4 lw = lights[i];
        vec3 L = lw.xyz;
        float lwrap = lw.w;
        vec3 H = normalize( V + L );
        float N_L = dot( N, L );
        float cN_L = max( 0., N_L );
        float cN_H = max( 0., dot( N, H ) );
        float cH_V = max( 0., dot( H, V ) );

        float NDF = distribution_GGX( cN_H, roughness );
        float G = geometry_smith( cN_L, ggx2, roughness );
        vec3 F_light = fresnel_schlick( cH_V, F0 );

        vec3 specular = NDF*G*F_light/( 4.*cN_V*cN_L + 0.001 );

        vec3 kD_light = ( 1. - F_light )*( 1. - metallic );

        color += ( kD_light*base/3.14159265 + specular )*radiance[i]*diffuse_factor( N_L, lwrap );
    }

	bnb_FragColor = vec4(l2g(color),opacity);
}
