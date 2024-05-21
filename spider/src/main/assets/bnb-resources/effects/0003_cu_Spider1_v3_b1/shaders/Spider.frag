#include <bnb/glsl.frag>


BNB_IN(0) vec2 var_uv;
BNB_IN(1) vec3 var_t;
BNB_IN(2) vec3 var_b;
BNB_IN(3) vec3 var_n;



BNB_DECLARE_SAMPLER_2D(0, 1, s_diffuse);

BNB_DECLARE_SAMPLER_2D(2, 3, s_normal);

void main()
{
	vec3 d = BNB_TEXTURE_2D(BNB_SAMPLER_2D(s_diffuse), var_uv ).xyz;
	vec3 n = normalize(mat3(var_t,var_b,var_n)*(BNB_TEXTURE_2D(BNB_SAMPLER_2D(s_normal), var_uv ).xyz*2. - 1.));
	vec3 l = vec3(0.,0.8,0.6);
	float diff = dot(n,l)*0.5+0.5;
	vec3 h_dir = normalize( l + vec3(0.,0.,1.) );
	float spec = 0.8*pow( max( dot(h_dir,n), 0. ), 32. );
	bnb_FragColor = vec4((diff+spec)*d,1.);
}
