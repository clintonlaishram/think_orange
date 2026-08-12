import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";
import "./DarkVeil.css";

// React Bits' DarkVeil, integrated as an ArcField layer (11-08-2026) —
// replaces the two counter-rotating conic rings (L3), which are commented
// out below rather than deleted, per the request that prompted this.
//
// Source is the library's as-shipped GLSL: a fixed-weight CPPN (a small
// hardcoded "neural network" whose weights happen to produce an organic,
// non-repeating pattern) hue-rotated in YIQ space, plus scanline/noise/warp
// knobs layered on top. None of those numbers are ours to simplify — this is
// copied verbatim from the vendor source, not authored here.
const vertex = `
attribute vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}
`;

const fragment = `
#ifdef GL_ES
precision lowp float;
#endif
uniform vec2 uResolution;
uniform float uTime;
uniform float uHueShift;
uniform float uNoise;
uniform float uScan;
uniform float uScanFreq;
uniform float uWarp;
// ── ADDED, not vendor ────────────────────────────────────────────────────
// Vertical framing controls. The CPPN's weights are fixed and its bright
// region happens to live in the upper part of its coordinate space, so at
// vendor defaults the visible pattern crowds the top of a tall box. These two
// let mainImage() re-frame WHICH slice of the pattern the screen samples,
// which is a change to the UV mapping only — the network itself is untouched.
uniform float uYScale;
uniform float uYOffset;
// ─────────────────────────────────────────────────────────────────────────
#define iTime uTime
#define iResolution uResolution

vec4 buf[8];
float rand(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}

mat3 rgb2yiq=mat3(0.299,0.587,0.114,0.596,-0.274,-0.322,0.211,-0.523,0.312);
mat3 yiq2rgb=mat3(1.0,0.956,0.621,1.0,-0.272,-0.647,1.0,-1.106,1.703);

vec3 hueShiftRGB(vec3 col,float deg){
    vec3 yiq=rgb2yiq*col;
    float rad=radians(deg);
    float cosh=cos(rad),sinh=sin(rad);
    vec3 yiqShift=vec3(yiq.x,yiq.y*cosh-yiq.z*sinh,yiq.y*sinh+yiq.z*cosh);
    return clamp(yiq2rgb*yiqShift,0.0,1.0);
}

vec4 sigmoid(vec4 x){return 1./(1.+exp(-x));}

vec4 cppn_fn(vec2 coordinate,float in0,float in1,float in2){
    buf[6]=vec4(coordinate.x,coordinate.y,0.3948333106474662+in0,0.36+in1);
    buf[7]=vec4(0.14+in2,sqrt(coordinate.x*coordinate.x+coordinate.y*coordinate.y),0.,0.);
    buf[0]=mat4(vec4(6.5404263,-3.6126034,0.7590882,-1.13613),vec4(2.4582713,3.1660357,1.2219609,0.06276096),vec4(-5.478085,-6.159632,1.8701609,-4.7742867),vec4(6.039214,-5.542865,-0.90925294,3.251348))*buf[6]+mat4(vec4(0.8473259,-5.722911,3.975766,1.6522468),vec4(-0.24321538,0.5839259,-1.7661959,-5.350116),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(0.21808943,1.1243913,-1.7969975,5.0294676);
    buf[1]=mat4(vec4(-3.3522482,-6.0612736,0.55641043,-4.4719114),vec4(0.8631464,1.7432913,5.643898,1.6106541),vec4(2.4941394,-3.5012043,1.7184316,6.357333),vec4(3.310376,8.209261,1.1355612,-1.165539))*buf[6]+mat4(vec4(5.24046,-13.034365,0.009859298,15.870829),vec4(2.987511,3.129433,-0.89023495,-1.6822904),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(-5.9457836,-6.573602,-0.8812491,1.5436668);
    buf[0]=sigmoid(buf[0]);buf[1]=sigmoid(buf[1]);
    buf[2]=mat4(vec4(-15.219568,8.095543,-2.429353,-1.9381982),vec4(-5.951362,4.3115187,2.6393783,1.274315),vec4(-7.3145227,6.7297835,5.2473326,5.9411426),vec4(5.0796127,8.979051,-1.7278991,-1.158976))*buf[6]+mat4(vec4(-11.967154,-11.608155,6.1486754,11.237008),vec4(2.124141,-6.263192,-1.7050359,-0.7021966),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(-4.17164,-3.2281182,-4.576417,-3.6401186);
    buf[3]=mat4(vec4(3.1832156,-13.738922,1.879223,3.233465),vec4(0.64300746,12.768129,1.9141049,0.50990224),vec4(-0.049295485,4.4807224,1.4733979,1.801449),vec4(5.0039253,13.000481,3.3991797,-4.5561905))*buf[6]+mat4(vec4(-0.1285731,7.720628,-3.1425676,4.742367),vec4(0.6393625,3.714393,-0.8108378,-0.39174938),vec4(0.,0.,0.,0.),vec4(0.,0.,0.,0.))*buf[7]+vec4(-1.1811101,-21.621881,0.7851888,1.2329718);
    buf[2]=sigmoid(buf[2]);buf[3]=sigmoid(buf[3]);
    buf[4]=mat4(vec4(5.214916,-7.183024,2.7228765,2.6592617),vec4(-5.601878,-25.3591,4.067988,0.4602802),vec4(-10.57759,24.286327,21.102104,37.546658),vec4(4.3024497,-1.9625226,2.3458803,-1.372816))*buf[0]+mat4(vec4(-17.6526,-10.507558,2.2587414,12.462782),vec4(6.265566,-502.75443,-12.642513,0.9112289),vec4(-10.983244,20.741234,-9.701768,-0.7635988),vec4(5.383626,1.4819539,-4.1911616,-4.8444734))*buf[1]+mat4(vec4(12.785233,-16.345072,-0.39901125,1.7955981),vec4(-30.48365,-1.8345358,1.4542528,-1.1118771),vec4(19.872723,-7.337935,-42.941723,-98.52709),vec4(8.337645,-2.7312303,-2.2927687,-36.142323))*buf[2]+mat4(vec4(-16.298317,3.5471997,-0.44300047,-9.444417),vec4(57.5077,-35.609753,16.163465,-4.1534753),vec4(-0.07470326,-3.8656476,-7.0901804,3.1523974),vec4(-12.559385,-7.077619,1.490437,-0.8211543))*buf[3]+vec4(-7.67914,15.927437,1.3207729,-1.6686112);
    buf[5]=mat4(vec4(-1.4109162,-0.372762,-3.770383,-21.367174),vec4(-6.2103205,-9.35908,0.92529047,8.82561),vec4(11.460242,-22.348068,13.625772,-18.693201),vec4(-0.3429052,-3.9905605,-2.4626114,-0.45033523))*buf[0]+mat4(vec4(7.3481627,-4.3661838,-6.3037653,-3.868115),vec4(1.5462853,6.5488915,1.9701879,-0.58291394),vec4(6.5858274,-2.2180402,3.7127688,-1.3730392),vec4(-5.7973905,10.134961,-2.3395722,-5.965605))*buf[1]+mat4(vec4(-2.5132585,-6.6685553,-1.4029363,-0.16285264),vec4(-0.37908727,0.53738135,4.389061,-1.3024765),vec4(-0.70647055,2.0111287,-5.1659346,-3.728635),vec4(-13.562562,10.487719,-0.9173751,-2.6487076))*buf[2]+mat4(vec4(-8.645013,6.5546675,-6.3944063,-5.5933375),vec4(-0.57783127,-1.077275,36.91025,5.736769),vec4(14.283112,3.7146652,7.1452246,-4.5958776),vec4(2.7192075,3.6021907,-4.366337,-2.3653464))*buf[3]+vec4(-5.9000807,-4.329569,1.2427121,8.59503);
    buf[4]=sigmoid(buf[4]);buf[5]=sigmoid(buf[5]);
    buf[6]=mat4(vec4(-1.61102,0.7970257,1.4675229,0.20917463),vec4(-28.793737,-7.1390953,1.5025433,4.656581),vec4(-10.94861,39.66238,0.74318546,-10.095605),vec4(-0.7229728,-1.5483948,0.7301322,2.1687684))*buf[0]+mat4(vec4(3.2547753,21.489103,-1.0194173,-3.3100595),vec4(-3.7316632,-3.3792162,-7.223193,-0.23685838),vec4(13.1804495,0.7916005,5.338587,5.687114),vec4(-4.167605,-17.798311,-6.815736,-1.6451967))*buf[1]+mat4(vec4(0.604885,-7.800309,-7.213122,-2.741014),vec4(-3.522382,-0.12359311,-0.5258442,0.43852118),vec4(9.6752825,-22.853785,2.062431,0.099892326),vec4(-4.3196306,-17.730087,2.5184598,5.30267))*buf[2]+mat4(vec4(-6.545563,-15.790176,-6.0438633,-5.415399),vec4(-43.591583,28.551912,-16.00161,18.84728),vec4(4.212382,8.394307,3.0958717,8.657522),vec4(-5.0237565,-4.450633,-4.4768,-5.5010443))*buf[3]+mat4(vec4(1.6985557,-67.05806,6.897715,1.9004834),vec4(1.8680354,2.3915145,2.5231109,4.081538),vec4(11.158006,1.7294737,2.0738268,7.386411),vec4(-4.256034,-306.24686,8.258898,-17.132736))*buf[4]+mat4(vec4(1.6889864,-4.5852966,3.8534803,-6.3482175),vec4(1.3543309,-1.2640043,9.932754,2.9079645),vec4(-5.2770967,0.07150358,-0.13962056,3.3269649),vec4(28.34703,-4.918278,6.1044083,4.085355))*buf[5]+vec4(6.6818056,12.522166,-3.7075126,-4.104386);
    buf[7]=mat4(vec4(-8.265602,-4.7027016,5.098234,0.7509808),vec4(8.6507845,-17.15949,16.51939,-8.884479),vec4(-4.036479,-2.3946867,-2.6055532,-1.9866527),vec4(-2.2167742,-1.8135649,-5.9759874,4.8846445))*buf[0]+mat4(vec4(6.7790847,3.5076547,-2.8191125,-2.7028968),vec4(-5.743024,-0.27844876,1.4958696,-5.0517144),vec4(13.122226,15.735168,-2.9397483,-4.101023),vec4(-14.375265,-5.030483,-6.2599335,2.9848232))*buf[1]+mat4(vec4(4.0950394,-0.94011575,-5.674733,4.755022),vec4(4.3809423,4.8310084,1.7425908,-3.437416),vec4(2.117492,0.16342592,-104.56341,16.949184),vec4(-5.22543,-2.994248,3.8350096,-1.9364246))*buf[2]+mat4(vec4(-5.900337,1.7946124,-13.604192,-3.8060522),vec4(6.6583457,31.911177,25.164474,91.81147),vec4(11.840538,4.1503043,-0.7314397,6.768467),vec4(-6.3967767,4.034772,6.1714606,-0.32874924))*buf[3]+mat4(vec4(3.4992442,-196.91893,-8.923708,2.8142626),vec4(3.4806502,-3.1846354,5.1725626,5.1804223),vec4(-2.4009497,15.585794,1.2863957,2.0252278),vec4(-71.25271,-62.441242,-8.138444,0.50670296))*buf[4]+mat4(vec4(-12.291733,-11.176166,-7.3474145,4.390294),vec4(10.805477,5.6337385,-0.9385842,-4.7348723),vec4(-12.869276,-7.039391,5.3029537,7.5436664),vec4(1.4593618,8.91898,3.5101583,5.840625))*buf[5]+vec4(2.2415268,-6.705987,-0.98861027,-2.117676);
    buf[6]=sigmoid(buf[6]);buf[7]=sigmoid(buf[7]);
    buf[0]=mat4(vec4(1.6794263,1.3817469,2.9625452,0.),vec4(-1.8834411,-1.4806935,-3.5924516,0.),vec4(-1.3279216,-1.0918057,-2.3124623,0.),vec4(0.2662234,0.23235129,0.44178495,0.))*buf[0]+mat4(vec4(-0.6299101,-0.5945583,-0.9125601,0.),vec4(0.17828953,0.18300213,0.18182953,0.),vec4(-2.96544,-2.5819945,-4.9001055,0.),vec4(1.4195864,1.1868085,2.5176322,0.))*buf[1]+mat4(vec4(-1.2584374,-1.0552157,-2.1688404,0.),vec4(-0.7200217,-0.52666044,-1.438251,0.),vec4(0.15345335,0.15196142,0.272854,0.),vec4(0.945728,0.8861938,1.2766753,0.))*buf[2]+mat4(vec4(-2.4218085,-1.968602,-4.35166,0.),vec4(-22.683098,-18.0544,-41.954372,0.),vec4(0.63792,0.5470648,1.1078634,0.),vec4(-1.5489894,-1.3075932,-2.6444845,0.))*buf[3]+mat4(vec4(-0.49252132,-0.39877754,-0.91366625,0.),vec4(0.95609266,0.7923952,1.640221,0.),vec4(0.30616966,0.15693925,0.8639857,0.),vec4(1.1825981,0.94504964,2.176963,0.))*buf[4]+mat4(vec4(0.35446745,0.3293795,0.59547555,0.),vec4(-0.58784515,-0.48177817,-1.0614829,0.),vec4(2.5271258,1.9991658,4.6846647,0.),vec4(0.13042648,0.08864098,0.30187556,0.))*buf[5]+mat4(vec4(-1.7718065,-1.4033192,-3.3355875,0.),vec4(3.1664357,2.638297,5.378702,0.),vec4(-3.1724713,-2.6107926,-5.549295,0.),vec4(-2.851368,-2.249092,-5.3013067,0.))*buf[6]+mat4(vec4(1.5203838,1.2212278,2.8404984,0.),vec4(1.5210563,1.2651345,2.683903,0.),vec4(2.9789467,2.4364579,5.2347264,0.),vec4(2.2270417,1.8825914,3.8028636,0.))*buf[7]+vec4(-1.5468478,-3.6171484,0.24762098,0.);
    buf[0]=sigmoid(buf[0]);
    return vec4(buf[0].x,buf[0].y,buf[0].z,1.);
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/uResolution.xy*2.-1.;
    uv.x *= uResolution.x / uResolution.y;
    uv.y*=-1.;
    // ADDED, not vendor: re-frame the vertical slice of the pattern the screen
    // samples. uv.y here is -1 at the top of the canvas and +1 at the bottom
    // (the flip above puts it that way), so a scale below 1 stretches a
    // narrower band of the pattern over the full height, and the offset slides
    // which band that is. Applied BEFORE the warp on purpose, so the warp
    // distorts what is actually visible rather than the un-framed coordinates.
    uv.y = uv.y * uYScale + uYOffset;
    uv+=uWarp*vec2(sin(uv.y*6.283+uTime*0.5),cos(uv.x*6.283+uTime*0.5))*0.05;
    fragColor=cppn_fn(uv,0.1*sin(0.3*uTime),0.1*sin(0.69*uTime),0.1*sin(0.44*uTime));
}

void main(){
    vec4 col;mainImage(col,gl_FragCoord.xy);
    col.rgb=hueShiftRGB(col.rgb,uHueShift);
    float scanline_val=sin(gl_FragCoord.y*uScanFreq)*0.5+0.5;
    col.rgb*=1.-(scanline_val*scanline_val)*uScan;
    col.rgb+=(rand(gl_FragCoord.xy+uTime)-0.5)*uNoise;
    gl_FragColor=vec4(clamp(col.rgb,0.0,1.0),1.0);
}
`;

// ⚠️ hueShift is NOT a design token and can't be one — it's a rotation angle
// fed to a shader uniform, not a CSS colour, and it does NOT move in step
// with HSL degrees: the shift happens in YIQ space (rgb2yiq / yiq2rgb above),
// a different colour model, so "+116° of uHueShift" does not mean "+116° of
// visible hue" — an early attempt at that arithmetic landed on green, not
// ember. The real value was found empirically: a standalone harness rendered
// this exact shader at uHueShift values across the full 0–360° range,
// weighted-hue-sampled the actual output pixels at each, and searched for
// whichever value's dominant hue landed closest to ember-400's (#F26522,
// ≈19.3° HSL). 225° was the clear, stable minimum — the four values on
// either side of it (217–233°) all land within ~2–8° of the target, not a
// lone spike, so it's not a fluke of one sampled frame.
// Re-run that sweep (see the session's sweep-hueshift.mjs) if the shader
// source above ever changes — this is a function of THIS network's fixed
// weights, not a universal constant.
const EMBER_HUE_SHIFT = 225;

// Vertical framing, found the same way as the hue shift — by sweeping and
// MEASURING, not by eye. A harness rendered this shader at the hero's real
// 1.6 aspect across scale × offset combinations, averaged four uTime phases
// (the pattern morphs over time, so one frame proves nothing), and reported
// mean brightness per 10% horizontal band from top to bottom.
//
// At vendor defaults (scale 1, offset 0) that profile is
//   [27.7, 30.7, 24.3, 10.7, 2.3, 0.5, 0.2, 0.1, 0, 0]
// i.e. the pattern is effectively black below 40% of the height — the whole
// reason the effect "showed almost at top". The CPPN's bright region simply
// lives in the upper part of its own coordinate space; nothing was wrong with
// the CSS layers (the vignette was measured and makes almost no difference).
//
// At the chosen values the profile becomes
//   [25.9, 29.4, 30.8, 30.5, 27.5, 21.2, 13.9, 7.6, 3.2, 1.3]
// — full strength through the top ~60%, fading through band 7, effectively
// gone by band 9.
//
// That taper point is not arbitrary. The "Explore Services" button's bottom
// edge was measured across three large viewports and sits at 64–70% of the
// arcfield's height (1600×1000 → 70.0%, 1920×1080 → 68.5%, 2560×1400 →
// 64.3%), and the stat row begins at 76–84%. So the effect reaches the CTA
// pair and then falls away before it can wash behind the stat numbers, which
// is what was asked for. An earlier pass used 0.4/-0.6, which spread energy
// evenly to the very bottom (band 8 still at 17.6) and ran the pattern behind
// the stats.
//
// scale stretches a narrow slice of the pattern over the full height; offset
// slides which slice that is. Re-sweep if the shader source changes, and
// re-check the button fraction if the hero's internal spacing changes.
const Y_SCALE = 0.5;
const Y_OFFSET = -0.5;

export default function DarkVeil({
  hueShift = EMBER_HUE_SHIFT,
  yScale = Y_SCALE,
  yOffset = Y_OFFSET,
  // Was 0.045. uNoise adds per-pixel, per-FRAME random jitter — animated film
  // grain, re-rolled every rendered frame — so it reads as "sizzle" rather
  // than texture, and it was compounding with the low render resolution below
  // to produce the graininess. Dropped to a level that still breaks up the
  // gradient banding without shimmering. Note `.grain` in theme.css already
  // lays a STATIC 3.5% turbulence over the whole arcfield, so most of the
  // intended texture is coming from there, not from here.
  noiseIntensity = 0.014,
  scanlineIntensity = 0,
  speed = 0.35,
  scanlineFrequency = 0,
  warpAmount = 0.12,
  // Back to full resolution. Earlier this was cut to 0.75 (and dpr capped at
  // 1) purely against fps measured in SOFTWARE rendering — no GPU in that
  // environment — which is a worst case that does not predict real hardware.
  // On a real machine the effect runs fine at full resolution, and the cut was
  // the direct cause of the graininess: at dpr-cap 1 × 0.75 on a 2× retina
  // display, each rendered pixel was being stretched over ~2.7 physical
  // pixels. The frame-skip in the render loop below is kept as the cheap
  // temporal saving, since that one costs no sharpness at all.
  resolutionScale = 1,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas.parentElement;

    // ⚠️ This effect is mount = start. Mounting is deliberately DEFERRED by the
    // caller (ArcField renders <DarkVeil> only once the page is idle) — see the
    // long note there for the measurements. Don't "fix" that by mounting this
    // eagerly.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // A live WebGL canvas is heavier than the CSS transforms it replaces.
    // ArcField's own precedent (the mobile ring, useBloom's cursor loop) is to
    // cut cost on narrow/low-power viewports rather than run the full effect
    // everywhere — same idea here, via render resolution rather than turning
    // the layer off outright, since unlike the rings this has no second
    // hand-tuned "phone" composition to fall back to.
    const isNarrow = window.matchMedia("(max-width: 767px)").matches;
    const effectiveResolutionScale = resolutionScale * (isNarrow ? 0.6 : 1);

    const renderer = new Renderer({
      // Measured (see the session that added this): this canvas alone drops
      // the WHOLE PAGE's requestAnimationFrame rate by ~5× in a software-
      // rendered test (13.3fps -> 2.6fps) — every rAF-driven thing on the
      // page shares one main thread, so an expensive shader here starves
      // Counter/Scramble/scroll-reveal animations too, not just itself.
      // ⚠️ Measured in software rendering (no real GPU in this environment),
      // which is a pessimistic worst case — real hardware does this per-pixel
      // math in parallel and will cost far less. Re-check on an actual laptop
      // and a mid-range phone before treating this as tuned; this is a
      // mitigation applied against a real measured signal, not a guess, but
      // the absolute numbers here are not a prediction of real-device fps.
      //
      // `dpr` is the ONLY place the resolution cut belongs. ogl multiplies the
      // WebGL buffer by `dpr` but leaves the canvas's CSS size (set in
      // resize() below) alone — so folding devicePixelRatio-capping AND
      // effectiveResolutionScale in here reduces the actual per-pixel shader
      // cost without ever touching how big the canvas appears on screen.
      // Passing a scaled width/height to setSize() instead — an earlier
      // version of this file did exactly that — shrinks the visible canvas
      // itself; see the long comment on resize() for what that looked like.
      dpr: Math.min(window.devicePixelRatio, 2) * effectiveResolutionScale,
      canvas,
      alpha: true,
      // ogl defaults this to false. Without it, the browser is free to swap
      // or clear the WebGL back buffer immediately after each render() call —
      // invisible while the rAF loop is running continuously (each frame
      // redraws before anything reads it), but it means anything that reads
      // the canvas asynchronously (a screenshot tool, html2canvas, a browser
      // extension) can catch it freshly cleared to black. Found by exactly
      // that: an out-of-band read of this canvas came back solid (0,0,0)
      // while a synchronous readPixels immediately after drawArrays, on an
      // identical shader/program built by hand, showed real colour.
      preserveDrawingBuffer: true,
    });

    const gl = renderer.gl;
    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2() },
        uHueShift: { value: hueShift },
        uNoise: { value: noiseIntensity },
        uScan: { value: scanlineIntensity },
        uScanFreq: { value: scanlineFrequency },
        uWarp: { value: warpAmount },
        uYScale: { value: yScale },
        uYOffset: { value: yOffset },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    // ⚠️ REAL BUG, found from a screenshot of the actual site (not this
    // environment's software-rendering proxy): ogl's setSize(width, height)
    // does not only size the WebGL buffer — it ALSO writes
    // canvas.style.width/height as INLINE styles, using the exact numbers
    // passed in. Passing the SCALED width/height (as an earlier version of
    // this file did) shrunk the canvas's actual on-screen box to
    // effectiveResolutionScale of its container — pinned top-left, since
    // nothing repositions it — leaving the rest of the box showing nothing
    // but the plain background. That is precisely "half cut": a rich patch
    // of colour in a corner, flat background everywhere else. Inline styles
    // beat the `width:100%;height:100%` class in DarkVeil.css every time, so
    // the CSS was never going to win this fight.
    //
    // The fix is to decouple the two things setSize() conflates: pass the
    // FULL, unscaled container size (so the CSS box is always correct), and
    // fold the resolution cut into `renderer.dpr` instead (set above) — dpr
    // only multiplies the BUFFER, never the style. uResolution is read back
    // from the real buffer dimensions after setSize() applies dpr, rather
    // than recomputed here, so it can never drift out of sync with what
    // gl_FragCoord actually ranges over in the shader.
    const resize = () => {
      renderer.setSize(parent.clientWidth, parent.clientHeight);
      program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    // window's resize event fires on VIEWPORT changes only — it never fires
    // for CONTENT-driven layout changes (a web font swapping in, the hero
    // image loading, React finishing a layout pass), any of which can change
    // this section's height after the effect above already measured it once.
    // A ResizeObserver on the actual container catches all of those, not
    // just window resizes — this is what stops an early, too-small
    // measurement from getting silently locked in for the rest of the page's
    // life, which is the other half of what produced the inconsistent
    // "sometimes right, sometimes cut" behaviour.
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const start = performance.now();
    let frame = null;

    const renderOnce = (t) => {
      program.uniforms.uTime.value = (t / 1000) * speed;
      renderer.render({ scene: mesh });
    };

    // Render on every OTHER rAF tick, not every one. `speed` defaults to
    // 0.35, so uTime already advances slowly — an ambient drift like this
    // has no fast-changing detail for a skipped frame to lose, and halving
    // how often the expensive per-pixel shader actually runs halves this
    // layer's real-time cost without a visible change to the pattern. Time
    // still advances by the FULL elapsed wall-clock each call (not by a
    // fixed step), so the drift speed itself is unaffected — only how often
    // the canvas is repainted changes.
    let tick = 0;
    const loop = () => {
      tick++;
      if (tick % 2 === 0) renderOnce(performance.now() - start);
      frame = requestAnimationFrame(loop);
    };

    const play = () => {
      if (frame === null) loop();
    };
    const pause = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };

    // Matches the reduced-motion contract every other ArcField layer follows
    // (§9.6): render exactly one frame and never start the loop, rather than
    // animating then freezing. Returning early here is deliberate — an earlier
    // version of this file kept the observers wired and merely skipped the
    // initial play() call, but IntersectionObserver fires its callback once on
    // observe(), so `sync()` started the loop anyway and the canvas animated
    // under `prefers-reduced-motion: reduce`. Caught by the reduced-motion audit
    // (CDP `Emulation.setEmulatedMedia`), not by reading the code.
    if (reduceMotion) {
      renderOnce(0);
      return () => {
        window.removeEventListener("resize", resize);
        resizeObserver.disconnect();
      };
    }

    // The hero is ~1100px tall at desktop and deliberately exceeds one screen,
    // so a reader is off it within a single scroll — and rAF keeps firing for
    // an element scrolled far out of view. Gate the loop on the hero actually
    // being on screen, and on the tab being foregrounded. Neither changes what
    // the effect looks like when you can see it, which is the only time it has
    // a job to do.
    let onScreen = true;
    const sync = () => {
      if (onScreen && document.visibilityState === "visible") play();
      else pause();
    };

    const io = new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      sync();
    });
    io.observe(parent);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
    // Intentionally re-runs the whole effect if any prop changes — this is a
    // decorative background layer mounted once per Hero, not a control the
    // user re-tunes at runtime, so a full teardown/rebuild per change is fine.
  }, [hueShift, yScale, yOffset, noiseIntensity, scanlineIntensity, speed, scanlineFrequency, warpAmount, resolutionScale]);

  return <canvas ref={ref} className="darkveil-canvas" aria-hidden="true" />;
}
