#include <bnb/glsl.frag>


BNB_IN(0) vec2 var_uv;



BNB_DECLARE_SAMPLER_2D(0, 1, s_diffuse);

void main()
{
	vec4 d = BNB_TEXTURE_2D(BNB_SAMPLER_2D(s_diffuse), var_uv );
	if( d.w < 1./255. ) discard;
	d.xyz = d.xyz*0.5 + 0.5;
	bnb_FragColor = d;
}
