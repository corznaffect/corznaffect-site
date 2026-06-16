import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Target, ShoppingCart, ChefHat, Zap, Lock, Star, Coffee, Sandwich, UtensilsCrossed, Apple, GlassWater, ArrowDown } from 'lucide-react';

const G = '#C9A961';
const K = '#0A0A0A';
const BG = '#FAFAF7';
const LINE = '#E8E2D0';

// ⚠️ Live Formspree endpoint — submissions go to Cor's Gmail
const FORMSPREE_URL = 'https://formspree.io/f/mvzdywzd';

const Logo = ({ size = 200 }) => {
  // Plain gold CORZNAFFECT wordmark, no box/frame, no monogram.
  // size prop scales font size proportionally (200 -> 22px, 140 -> 16px, 120 -> 14px)
  const fontSize = Math.max(12, Math.round(size * 0.11));
  return (
    <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: `${fontSize}px`, letterSpacing: `${fontSize * 0.35}px`, color: G, fontWeight: 600, textTransform: 'uppercase', display: 'inline-block', paddingLeft: `${fontSize * 0.35}px` }}>CORZNAFFECT</div>
  );
};

const SHARED = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } body { margin: 0; } html { scroll-behavior: smooth; } input:focus, textarea:focus, select:focus { outline: none; border-color: ${G} !important; } button:not(:disabled):hover { transform: translateY(-1px); } button { transition: all 0.2s ease; cursor: pointer; } .feat:hover { transform: translateY(-4px); border-color: ${G} !important; }`;
const BF = { fontFamily: '"DM Sans", sans-serif' };
const SF = { fontFamily: '"Fraunces", Georgia, serif' };

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    phase: '', currentCal: '', currentP: '', currentC: '', currentF: '',
    dietary: '', goals: '',
    signatureName: '', waiverAgreed: false, marketingConsent: false,
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.waiverAgreed || !form.signatureName) {
      setError('Please complete the waiver agreement and sign with your full name.');
      return;
    }
    if (form.signatureName.toLowerCase().trim() !== form.name.toLowerCase().trim()) {
      setError('Your signature must match the name you entered above.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...form,
        timestamp: new Date().toISOString(),
        timestampReadable: new Date().toLocaleString('en-AU'),
        userAgent: navigator.userAgent,
        source: 'Corznaffect Meal Builder Landing Page',
      };
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again or DM Corey on WhatsApp.');
      }
    } catch (err) {
      setError('Network error. Please try again or DM Corey on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: BG, ...SF, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <style>{SHARED}</style>
        <div style={{ maxWidth: 560, textAlign: 'center', background: '#FFF', padding: '60px 48px', border: `1px solid ${LINE}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}><Logo size={140} /></div>
          <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 12 }}>Application Received</div>
          <h1 style={{ fontSize: 40, fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.1 }}>You're in.</h1>
          <p style={{ ...BF, fontSize: 15, color: '#5A5A5A', lineHeight: 1.7, marginBottom: 28 }}>Thanks {form.name.split(' ')[0]}. I've got your application.<br /><br />I'll review it and send the Newie payment link to your WhatsApp ({form.phone}) within 24 hours. Once payment clears, I'll send your unique access code and the meal builder link.</p>
          <div style={{ ...BF, fontSize: 13, color: '#7A7A7A', padding: '16px 20px', background: BG, borderLeft: `3px solid ${G}`, textAlign: 'left' }}>
            <strong style={{ color: K }}>What happens next:</strong>
            <ol style={{ marginTop: 8, paddingLeft: 20, lineHeight: 1.8 }}>
              <li>I review your macros and goals</li>
              <li>Newie payment link sent via WhatsApp</li>
              <li>You pay $100 (one-off)</li>
              <li>You get your unique code + meal builder link</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, ...SF, color: K }}>
      <style>{SHARED}</style>

      {/* HERO */}
      <section style={{ background: K, color: '#FFF', padding: '60px 20px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
        <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}><Logo size={180} /></div>
          <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 16 }}>Customisable Meal Plan · $100 One-Off</div>
          <h1 style={{ fontSize: 'clamp(38px, 6vw, 64px)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24, color: '#FFF' }}>Stop guessing<br />what to eat.</h1>
          <p style={{ ...BF, fontSize: 'clamp(15px, 2vw, 18px)', color: '#C0C0C0', lineHeight: 1.6, maxWidth: 620, margin: '0 auto 40px' }}>A premium meal builder that hits your macros, scales to your phase (bulk, cut, or maintain), and gives you a shopping list straight from Coles, Woolies, Aldi or IGA. No guesswork. No spreadsheets. Just food.</p>
          <a href="#apply" style={{ ...BF, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px', fontSize: 13, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', background: G, color: K, textDecoration: 'none', borderRadius: 2 }}>Apply for access <ArrowRight size={16} /></a>
          <div style={{ ...BF, marginTop: 24, fontSize: 12, color: '#9A9A9A', display: 'inline-flex', alignItems: 'center', gap: 8 }}><Sparkles size={13} color={G} /> Includes a 1:1 call covering the full package + nutritional support</div>
        </div>
      </section>

      {/* PROBLEM/SOLUTION */}
      <section style={{ padding: '80px 20px', maxWidth: 980, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 12 }}>The Problem</div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 20 }}>You know your macros.<br />You still don't know what to cook.</h2>
          <p style={{ ...BF, fontSize: 16, color: '#5A5A5A', lineHeight: 1.7, maxWidth: 640, margin: '0 auto' }}>Every coach hands you a number — 180g protein, 250g carbs, 70g fat — and leaves you alone with a calculator. You spend Sunday nights on MyFitnessPal trying to make eggs and rice add up to something that fits. You give up. You eat the same three meals on rotation. You stall.</p>
        </div>

        <div style={{ background: '#FFF', padding: 'clamp(32px, 5vw, 56px)', border: `1px solid ${LINE}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
          <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>The Fix</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 20, textAlign: 'center' }}>50 meals built around your numbers.</h2>
          <p style={{ ...BF, fontSize: 15, color: '#5A5A5A', lineHeight: 1.7, textAlign: 'center', marginBottom: 36 }}>Pick your phase. Pick meals from breakfast, lunch, dinner, snacks, drinks. Watch the calculator update live. When you're on-track, hit "Create Meal Plan" — get a shopping list and full recipes you can cook tonight.</p>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ background: '#FFF', padding: '80px 20px', borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 12 }}>What's Inside</div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.15 }}>Built for results, not stress.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { icon: Target, title: 'Phase-Aware Portions', desc: 'Same recipes auto-scale for Bulking, Maintaining, or Cutting. Your shopping list scales too.' },
              { icon: Zap, title: 'Live Macro Calculator', desc: 'Add a meal, watch protein, carbs, fats, calories update instantly. Smart feedback tells you exactly what to add.' },
              { icon: ShoppingCart, title: 'Aussie Shopping List', desc: 'Real products from Coles, Woolies, Aldi, IGA. Auto-generated from your selections. No conversions, no confusion.' },
              { icon: ChefHat, title: 'Step-by-Step Recipes', desc: '50 meals across 5 categories. Clear ingredients, easy methods. Cook with confidence even if you\'re not a chef.' },
              { icon: Lock, title: 'Saves Your Progress', desc: 'Unique client code keeps your plan, goals, and reviews safe. Come back any time, pick up where you left off.' },
              { icon: Star, title: 'Cook & Review', desc: 'Rate the meals you cook. Build a personal favourites library. Share feedback to shape future updates.' },
            ].map((f, i) => {
              const Ic = f.icon;
              return (
                <div key={i} className="feat" style={{ background: BG, padding: '28px 24px', border: `1px solid ${LINE}`, transition: 'all 0.3s ease' }}>
                  <Ic size={28} color={G} strokeWidth={1.5} style={{ marginBottom: 16 }} />
                  <h3 style={{ ...SF, fontSize: 22, fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.01em', marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ ...BF, fontSize: 13, color: '#5A5A5A', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APP PREVIEW */}
      <section style={{ padding: '80px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 12 }}>Sneak Peek</div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 16 }}>5 tabs. 50 meals. Zero excuses.</h2>
        </div>

        {/* Mock app interface */}
        <div style={{ background: K, padding: '32px 24px', borderRadius: 4, marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              { l: 'Breakfast', i: Coffee, count: 10 },
              { l: 'Lunch', i: Sandwich, count: 10 },
              { l: 'Dinner', i: UtensilsCrossed, count: 10 },
              { l: 'Snacks', i: Apple, count: 10 },
              { l: 'Drinks', i: GlassWater, count: 10 },
            ].map((c, i) => {
              const Ic = c.i;
              return (
                <div key={i} style={{ ...BF, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', background: i === 0 ? G : 'transparent', color: i === 0 ? K : G, border: `1px solid ${G}`, borderRadius: 2 }}>
                  <Ic size={13} /> {c.l}
                  <span style={{ background: i === 0 ? K : G, color: i === 0 ? G : K, padding: '1px 6px', borderRadius: 8, fontSize: 9, fontWeight: 700 }}>{c.count}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, maxWidth: 600, margin: '0 auto' }}>
            {[
              { l: 'CAL', v: 1840, g: 2400, p: 76 },
              { l: 'PROTEIN', v: 142, g: 170, p: 84, u: 'g' },
              { l: 'CARBS', v: 198, g: 260, p: 76, u: 'g' },
              { l: 'FATS', v: 62, g: 80, p: 78, u: 'g' },
            ].map((m, i) => (
              <div key={i} style={{ background: '#1a1a1a', padding: '12px 14px', border: `1px solid ${G}33` }}>
                <div style={{ ...BF, fontSize: 9, letterSpacing: '1.5px', color: '#9A9A9A', marginBottom: 4 }}>{m.l}</div>
                <div style={{ ...BF, fontSize: 16, fontWeight: 600, color: '#FFF' }}>{m.v}<span style={{ fontSize: 10, color: '#9A9A9A' }}>/{m.g}{m.u || ''}</span></div>
                <div style={{ height: 3, background: '#333', marginTop: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${m.p}%`, background: G }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ ...BF, fontSize: 13, color: '#7A7A7A', textAlign: 'center', fontStyle: 'italic', maxWidth: 600, margin: '0 auto' }}>This is a static preview. The real meal builder is fully interactive — tap any meal to add it, watch macros update live, generate your shopping list and recipes.</p>
      </section>

      {/* INCLUDED: 1-1 CALL */}
      <section style={{ background: K, color: '#FFF', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <Sparkles size={32} color={G} style={{ marginBottom: 20 }} />
          <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 16 }}>Included With Every Purchase</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 24, color: '#FFF' }}>A 1:1 call to set you up properly.</h2>
          <p style={{ ...BF, fontSize: 16, color: '#C0C0C0', lineHeight: 1.7, marginBottom: 32 }}>Once you've purchased the meal builder, you'll get a 1:1 call with me covering everything in the package — how to use it, how to get the most from it, plus nutritional support and balance guidance tailored to your phase. The tool gets you started; the call makes sure you actually use it well.</p>
          <a href="#apply" style={{ ...BF, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', background: G, color: K, textDecoration: 'none', borderRadius: 2 }}>Apply for access <ArrowRight size={14} /></a>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" style={{ padding: '80px 20px', background: BG }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 12 }}>Apply Now</div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 16 }}>Application</h2>
            <p style={{ ...BF, fontSize: 15, color: '#5A5A5A', lineHeight: 1.6, maxWidth: 540, margin: '0 auto' }}>Fill this out and I'll send you the Newie payment link via WhatsApp within 24 hours. Once payment clears, you'll get your access code and the meal builder.</p>
          </div>

          <div style={{ background: '#FFF', padding: 'clamp(28px, 5vw, 48px)', border: `1px solid ${LINE}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />

            {/* Personal */}
            <div style={{ ...BF, fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 16 }}>Your Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginBottom: 28 }}>
              <Field label="Full name" req><input type="text" value={form.name} onChange={e => update('name', e.target.value)} required /></Field>
              <Field label="Email" req><input type="email" value={form.email} onChange={e => update('email', e.target.value)} required /></Field>
              <Field label="Phone (WhatsApp)" req><input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} required placeholder="+61 4XX XXX XXX" /></Field>
            </div>

            {/* Goals */}
            <div style={{ ...BF, fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 16 }}>Your Phase &amp; Macros</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginBottom: 14 }}>
              <Field label="What phase are you in?" req>
                <select value={form.phase} onChange={e => update('phase', e.target.value)} required>
                  <option value="">Choose one...</option>
                  <option value="bulk">Bulking — building muscle</option>
                  <option value="maintain">Maintaining — holding physique</option>
                  <option value="cut">Cutting — losing fat</option>
                  <option value="unsure">Not sure yet — happy to discuss</option>
                </select>
              </Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <Field label="Daily calories"><input type="number" value={form.currentCal} onChange={e => update('currentCal', e.target.value)} placeholder="e.g. 2400" /></Field>
              <Field label="Daily protein (g)"><input type="number" value={form.currentP} onChange={e => update('currentP', e.target.value)} placeholder="e.g. 170" /></Field>
              <Field label="Daily carbs (g)"><input type="number" value={form.currentC} onChange={e => update('currentC', e.target.value)} placeholder="e.g. 260" /></Field>
              <Field label="Daily fats (g)"><input type="number" value={form.currentF} onChange={e => update('currentF', e.target.value)} placeholder="e.g. 80" /></Field>
            </div>
            <p style={{ ...BF, fontSize: 11, color: '#9A9A9A', marginBottom: 28, fontStyle: 'italic' }}>Don't know your macros yet? Leave them blank — we'll sort it on the check-in call.</p>

            {/* Other */}
            <div style={{ ...BF, fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 16 }}>About You</div>
            <Field label="Dietary requirements or allergies (optional)">
              <textarea value={form.dietary} onChange={e => update('dietary', e.target.value)} rows={2} placeholder="e.g. lactose intolerant, no shellfish, gluten free..." />
            </Field>
            <div style={{ marginTop: 14 }}>
              <Field label="Anything else I should know? (optional)">
                <textarea value={form.goals} onChange={e => update('goals', e.target.value)} rows={3} placeholder="What are you working towards? Any food preferences?" />
              </Field>
            </div>

            {/* WAIVER */}
            <div style={{ marginTop: 36, padding: '24px', background: BG, borderLeft: `3px solid ${G}` }}>
              <div style={{ ...BF, fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: K, fontWeight: 700, marginBottom: 12 }}>Liability Waiver &amp; Acknowledgement</div>
              <div style={{ ...BF, fontSize: 12, color: '#3A3A3A', lineHeight: 1.7, marginBottom: 20 }}>
                <p style={{ marginBottom: 10 }}>By submitting this application, I acknowledge and agree that:</p>
                <ul style={{ paddingLeft: 20, listStyle: 'disc' }}>
                  <li style={{ marginBottom: 6 }}>The Corznaffect Customisable Meal Builder is an educational and self-help tool, not medical or dietary advice.</li>
                  <li style={{ marginBottom: 6 }}>The information shared is based solely on the personal study and coaching practice of the provider, who is not a certified dietitian or registered nutritionist.</li>
                  <li style={{ marginBottom: 6 }}>I am responsible for verifying that meals, ingredients, and macro estimates are appropriate for my health, allergies, intolerances, medications, and any medical conditions.</li>
                  <li style={{ marginBottom: 6 }}>I will consult a qualified medical or nutrition professional before making significant dietary changes, especially if I have any health condition.</li>
                  <li style={{ marginBottom: 6 }}>I release Corznaffect, its provider, and any associated parties from any liability, claim, or damages arising from my use of the meal builder, including but not limited to allergic reactions, illness, injury, or any health outcome.</li>
                  <li>This waiver is entered into voluntarily and applies to me, my heirs, and any party claiming through me.</li>
                </ul>
              </div>

              <label style={{ ...BF, display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: K, marginBottom: 16, cursor: 'pointer', lineHeight: 1.5 }}>
                <input type="checkbox" checked={form.waiverAgreed} onChange={e => update('waiverAgreed', e.target.checked)} style={{ marginTop: 3, accentColor: G, width: 18, height: 18, cursor: 'pointer' }} required />
                <span><strong>I have read and agree to the waiver above.</strong> I confirm I am 18 years or older and entering this agreement voluntarily.</span>
              </label>

              <Field label="Type your full name as your digital signature" req>
                <input type="text" value={form.signatureName} onChange={e => update('signatureName', e.target.value)} required placeholder="Must match the full name entered above" style={{ ...SF, fontStyle: 'italic', fontSize: 18 }} />
              </Field>
              <p style={{ ...BF, fontSize: 11, color: '#7A7A7A', marginTop: 8, lineHeight: 1.5 }}>This signature, along with the timestamp of submission and your IP address, forms a record of your agreement.</p>
            </div>

            {/* Marketing consent (optional, GDPR/Spam Act good practice) */}
            <label style={{ ...BF, display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, color: '#5A5A5A', marginTop: 20, cursor: 'pointer', lineHeight: 1.5 }}>
              <input type="checkbox" checked={form.marketingConsent} onChange={e => update('marketingConsent', e.target.checked)} style={{ marginTop: 2, accentColor: G, width: 16, height: 16, cursor: 'pointer' }} />
              <span>(Optional) I'd like to hear about future Corznaffect products, recipe drops, and coaching releases.</span>
            </label>

            {error && <div style={{ ...BF, marginTop: 20, padding: '12px 16px', background: '#FBE9E5', border: '1px solid #A03020', color: '#A03020', fontSize: 13, fontWeight: 500 }}>{error}</div>}

            <button onClick={submit} disabled={submitting} style={{ ...BF, width: '100%', marginTop: 28, padding: 18, fontSize: 13, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', background: submitting ? '#C0C0C0' : K, color: G, border: 'none', borderRadius: 2, cursor: submitting ? 'not-allowed' : 'pointer' }}>{submitting ? 'Submitting...' : 'Submit Application →'}</button>
            <p style={{ ...BF, fontSize: 11, color: '#7A7A7A', marginTop: 14, textAlign: 'center', lineHeight: 1.6 }}>By submitting, your details go directly to Corey at Corznaffect. Payment link sent via WhatsApp within 24 hrs.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: K, color: '#9A9A9A', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><Logo size={120} /></div>
        <p style={{ ...BF, fontSize: 11, lineHeight: 1.7, maxWidth: 600, margin: '0 auto', fontStyle: 'italic', color: '#7A7A7A' }}>I am not a certified dietitian. All information shared is based solely on personal study and coaching practice. Please consult a qualified health professional for medical conditions or specific dietary requirements.</p>
        <p style={{ ...BF, fontSize: 11, color: '#5A5A5A', marginTop: 16 }}>© Corznaffect · Made for the CNA community</p>
      </footer>
    </div>
  );
}

function Field({ label, children, req }) {
  // Inject base styles into the input/textarea/select inside
  const child = React.Children.map(children, ch => {
    if (!React.isValidElement(ch)) return ch;
    return React.cloneElement(ch, {
      style: {
        ...BF,
        width: '100%',
        padding: '12px 14px',
        fontSize: 14,
        border: `1px solid #D4CFBF`,
        background: '#FFF',
        borderRadius: 2,
        ...(ch.props.style || {}),
      }
    });
  });
  return (
    <label style={{ display: 'block' }}>
      <div style={{ ...BF, fontSize: 11, fontWeight: 600, color: K, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 6 }}>
        {label}{req && <span style={{ color: G, marginLeft: 4 }}>*</span>}
      </div>
      {child}
    </label>
  );
}
