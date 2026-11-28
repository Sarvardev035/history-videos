"""Make the full soundtrack (original music + cartoon sound effects) from an episode's meta JSON.
python3 sfx.py meta.json out.wav     (meta from: node render.js ep.js meta > meta.json)
All sounds are synthesized here, so there is no copyright risk."""
import json, sys, numpy as np, wave
SR = 48000
rng = np.random.default_rng(7)
def T(d): return np.arange(int(SR*d))/SR
def env(n, a=.005, r=None):
    e = np.ones(n); ai = max(1, int(a*SR)); e[:ai] = np.linspace(0, 1, ai)
    if r is None: r = n/SR
    ri = min(n, int(r*SR)); e[-ri:] *= np.linspace(1, 0, ri)**2; return e
def sweep(f0, f1, d, wav='sine', vib=0, vibf=0, curve=1):
    t = T(d); p = (t/d)**curve; f = f0+(f1-f0)*p
    if vib: f = f*(1+vib*np.sin(2*np.pi*vibf*t))
    ph = 2*np.pi*np.cumsum(f)/SR
    if wav == 'sine': return np.sin(ph)
    if wav == 'saw': return 2*((ph/(2*np.pi)) % 1)-1
    if wav == 'sq': return np.sign(np.sin(ph))*.6
def noise(d): return rng.uniform(-1, 1, int(SR*d))
def lp(x, a):  # one-pole low-pass, a in (0,1): smaller = darker
    y = np.empty_like(x); s = 0.
    for i, v in enumerate(x): s += a*(v-s); y[i] = s
    return y
def bp_noise(d, lo_a, hi_a): n = noise(d); return lp(n, hi_a)-lp(n, lo_a)
def tone(f, d, harm=(1,), decay=8):
    t = T(d); x = sum(np.sin(2*np.pi*f*(i+1)*t)*h for i, h in enumerate(harm)); return x*np.exp(-decay*t)
S = {}
S['ding'] = lambda: (tone(1760, 1.2, (1, .3, .1), 3)+tone(2637, 1.2, (1,), 4)*.5)*.5
S['whoosh'] = lambda: bp_noise(.45, .02, .35)*np.sin(np.pi*T(.45)/.45)**2*1.4
S['sting'] = lambda: sum(sweep(f, f, 1.0, 'saw')*.18 for f in (98, 116.5, 146.8, 185))*env(int(SR*1.0), .01, .6)*(1+.5*np.sin(2*np.pi*14*T(1.0)))
S['creep'] = lambda: np.concatenate([tone(f, .25, (1, .5), 9) for f in (196, 207.7, 220, 233)])*.6
S['tick'] = lambda: tone(3000, .08, (1,), 60)*.6
S['alert'] = lambda: (sweep(600, 1400, .18, 'sq')*env(int(SR*.18)))*.35
S['whistle'] = lambda: np.concatenate([sweep(f0, f1, d, vib=.01, vibf=6)*env(int(SR*d), .02, .05) for f0, f1, d in ((1320, 1320, .22), (1568, 1568, .22), (1760, 1175, .5))])*.3
S['question'] = lambda: sweep(500, 900, .35, 'sine', .02, 8, 2)*env(int(SR*.35))*.4
S['suspense'] = lambda: (sweep(110, 104, .9, 'saw')*.3+tone(55, .9, (1, .5), 2))*env(int(SR*.9), .02, .5)*.5
S['stretch'] = lambda: sweep(180, 900, .7, 'saw', .08, 18, 1.5)*env(int(SR*.7), .02, .1)*.25
S['pop'] = lambda: sweep(900, 200, .08)*env(int(SR*.08))*.7
S['clack'] = lambda: (bp_noise(.06, .2, .9)*env(int(SR*.06), .001))*1.2
S['boing'] = lambda: sweep(160, 420, .5, 'sine', .25, 14, .5)*env(int(SR*.5), .005, .4)*.6
S['pow'] = lambda: (tone(55, .5, (1, .6), 7)*1.2+bp_noise(.5, .03, .6)*np.exp(-12*T(.5)))*.9
S['bonk'] = lambda: (tone(330, .3, (1, .7, .3), 14)+tone(80, .3, (1,), 10))*.7
S['slideup'] = lambda: sweep(500, 2000, .9, 'sine', .015, 7)*env(int(SR*.9), .03, .1)*.4
S['slidedown'] = lambda: sweep(2000, 300, .7, 'sine', .015, 7)*env(int(SR*.7), .02, .1)*.4
S['thud'] = lambda: (tone(45, .5, (1, .4), 9)*1.3+lp(noise(.5), .05)*np.exp(-15*T(.5))*2)*.9
S['flap'] = lambda: np.concatenate([bp_noise(.07, .05, .5)*env(int(SR*.07), .002)*(1.0 if i % 2 else .6) for i in range(8)])*.8
S['zip'] = lambda: sweep(300, 2500, .18, 'saw')*env(int(SR*.18))*.25
S['tweet'] = lambda: np.concatenate([sweep(2600, 3600, .09)*env(int(SR*.09)), np.zeros(int(SR*.05)), sweep(2800, 4000, .12)*env(int(SR*.12))])*.3
S['chomp'] = lambda: np.concatenate([bp_noise(.05, .05, .7)*env(int(SR*.05), .001)*1.2, np.zeros(int(SR*.06)), bp_noise(.05, .05, .7)*env(int(SR*.05), .001)])
S['snap'] = lambda: bp_noise(.09, .1, .95)*np.exp(-40*T(.09))*1.6
def laugh():  # cartoon "ha-ha-ha": vowel-ish formant pulses, falling pitch
    out = []
    for i in range(7):
        f = 300-i*18; d = .13; t = T(d)
        v = sweep(f, f*.9, d, 'saw'); v = lp(v, .25)+lp(v, .6)*.3
        out += [v*np.sin(np.pi*t/d)**1.5, np.zeros(int(SR*.06))]
    return np.concatenate(out)*.6
S['laugh'] = laugh
def trombone():
    out = []
    for f, d in ((293.7, .38), (277.2, .38), (261.6, .38), (246.9, 1.3)):
        v = sweep(f, f, d, 'saw', .02 if d > 1 else .0, 5); v = lp(v, .12)
        out.append(v*env(len(v), .03, .12))
    return np.concatenate(out)*.7
S['sadtrombone'] = trombone

def music(dur, bpm, duck):
    beat = 60/bpm; n = int(SR*dur); out = np.zeros(n)
    prog = [(48, 52, 55), (45, 48, 52), (41, 45, 48), (43, 47, 50)]  # C Am F G (midi)
    mel = [72, 76, 79, 76, 74, 72, 74, 76, 69, 72, 76, 72, 71, 69, 71, 72, 77, 76, 74, 72, 74, 77, 76, 74, 74, 71, 67, 71, 74, 76, 74, 71]
    hz = lambda m: 440*2**((m-69)/12)
    i = 0; t0 = 0.
    while t0 < dur:
        bar = int(i/8) % 4; ch = prog[bar]; s = int(t0*SR)
        def add(x, at):
            e = min(n, at+len(x));
            if at < n: out[at:e] += x[:e-at]
        if i % 2 == 0: add(tone(hz(ch[0]-12), beat*.9, (1, .5, .2), 7)*.55, s)  # bass pluck
        else: add(tone(hz(ch[0]-12+7), beat*.9, (1, .5, .2), 7)*.4, s)
        if i % 2 == 1: add(sum(tone(hz(m), beat*.5, (1, .2), 14) for m in ch)*.12, s)  # off-beat chord
        add(tone(hz(mel[i % 32]), beat*.48, (1, .1, .25), 11)*.22, s)  # marimba-ish melody
        if i % 4 == 2: add(bp_noise(.05, .3, .95)*np.exp(-60*T(.05))*.25, s)  # snap
        add(bp_noise(.03, .6, .98)*np.exp(-90*T(.03))*.08, s)  # hat
        i += 1; t0 += beat/2
    g = np.ones(n)
    for a, b in duck: g[int(a*SR):int(b*SR)] = .25
    g = np.convolve(g, np.ones(2400)/2400, 'same')
    fade = int(SR*.6); out[-fade:] *= np.linspace(1, 0, fade)
    return out*g

meta = json.load(open(sys.argv[1])); D = meta['DUR']; M = meta.get('MUSIC', {})
mix = music(D, M.get('bpm', 120), M.get('duck', []))*.55
for t, name in meta['CUES']:
    x = S[name](); s = int(t*SR); e = min(len(mix), s+len(x)); mix[s:e] += x[:e-s]
mix = np.tanh(mix*1.1)*.9
st = np.stack([mix, mix], 1)
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype('<i2').tobytes())
print('ok', D, 's,', len(meta['CUES']), 'sfx')
