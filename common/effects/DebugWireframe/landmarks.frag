#include <bnb/glsl.frag>

void main()
{
    float r = 0.0, delta = 0.0, alpha = 1.0;
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    r = 1.25*dot(cxy, cxy);
    delta = fwidth(r);
    alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
    bnb_FragColor = vec4(1.,0.,0.,1.) * (alpha);
}
