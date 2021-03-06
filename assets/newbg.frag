// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 hash( vec2 x )
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*sin( (u_time*.04)*13.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

	vec2 u = f*f*(2.0-3.0*f);

    return mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec2 r = vec2( gl_FragCoord.xy - 0.05*u_resolution.xy );
    float n= noise(.005*r.xy);
    float n2= noise(.05*r.xy)*cos(n*u_time*0.003)*2.;
	r = 1.0 * r.xy / u_resolution.xy;

    vec3 col1 = vec3 (.97647,0.78431,0.71373);
    vec3 col2 = vec3 (0.06275,  0.14902 , 0.95686);
    vec3 col3 = vec3 (.97647,0.78431,0.71373);
     vec3 pixi;
    float width = cos(cos(.003 * u_time)*0.5)*n;
    float width2 = sin(fract(.03 * u_time)*n);
    float mody = mod(width-width2+n2,fract(floor(r.y+u_time*.04)*.04));
    
    if(cos(cos(.5* u_time)*n2) < mody){
        pixi = col3;
    	}
    else {
        pixi =col2;
        }
      if(sin(r.x+u_time)-n2 < mody){
        pixi = col3;

    	}

 gl_FragColor = vec4(pixi,1.0);
    


}