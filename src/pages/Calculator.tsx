'use client';


import { useTranslation } from "react-i18next";
import calculatorSideImage from "@/assets/calculator-side-image.png"
import CalculatorSection from '@/components/calculator/CalculatorSection';

const VacanzaSavingsCalculator: React.FC = () => {
    const { i18n } = useTranslation();
    const langCode = i18n.language || "en";
    let currentLang: 'en' | 'el' | 'it' = 'en';
    if (langCode.startsWith("el")) {
        currentLang = "el";
    } else if (langCode.startsWith("it")) {
        currentLang = "it";
    } else {
        currentLang = "en";
    }

    const copy = {
        el: {
            topCta: "Εγγραφή",
            badge: "Δωρεάν υπολογιστής εξοικονόμησης χρημάτων",
            headline: "Δες πόσα χρήματα μπορείς να εξοικονομήσεις στα ταξίδια σου στην Ελλάδα.",
            subhead: "Σύγκρινε το κόστος ενός Airbnb ή ενός ξενοδοχείου με μια συνδρομή Vacanza και δες πόσα μπορείς να εξοικονομήσεις κάθε χρόνο ανταλλάσσοντας το σπίτι σου.",
            calcCta: "Υπολόγισε την εξοικονόμηση",
            howCta: "Εγγραφή",
            calcTitle: "Υπολογιστής εξοικονόμησης χρημάτων",
            nightsLabel: "Αριθμός διανυκτερεύσεων",
            nightlyNote: "Υπολογισμένο με βάση τον μέσο όρο των τιμών του 2026.",
            travelersLabel: "Αριθμός ταξιδιωτών",
            tripsLabel: "Ταξίδια ανά χρόνο",
            savingLabel: "Με Vacanza εξοικονομείς",
            hotelLabel: "Σύνηθες κόστος",
            email: "Το email σου",
            start: "Ξεκίνα",
            f1Title: "Ταξίδεψε βιώσιμα",
            f1Text: "Σταμάτα να πληρώνεις όλες τις έξτρα χρεώσεις. Γίνε μέλος στη Vacanza, ξόδεψε λιγότερα και ταξίδεψε περισσότερο. Χωρίς κρυφές χρεώσεις.",
            f2Title: "Ένα ελληνικό εγχείρημα",
            f2Text: "Μια κοινότητα φτιαγμένη ειδικά για προορισμούς στην Ελλάδα και ελληνικά σπίτια. Βοήθησε την οικονομία και το περιβάλλον ταξιδεύοντας βιώσιμα.",
            f3Title: "Με έμφαση στην εμπιστοσύνη",
            f3Text: "Επαληθευμένα προφίλ, πλήρεις λεπτομέρειες κατοικίας και ξεκάθαροι όροι πριν από κάθε ανταλλαγή.",
            socialProof: "Ήδη επιλέγεται από ταξιδιώτες στην Ελλάδα που θέλουν να ταξιδεύουν περισσότερο, ξοδεύοντας λιγότερα.",
            bottomSignup: "Εγγραφή",
            bottomPremium: "Απόκτησε πρόσβαση τώρα",
            howTitle: "Πώς λειτουργεί",
            how1Title: "✅ 1. Δημιούργησε το προφίλ σου",
            how1Text: "Μπες στη Vacanza και ολοκλήρωσε το προφίλ σου για να αρχίσεις να στέλνεις και να λαμβάνεις αιτήματα ανταλλαγής.",
            how2Title: "💙 2. Βρες άλλους ταξιδιώτες",
            how2Text: "Βρες άλλους σόλο ταξιδιώτες, ζευγάρια ή οικογένειες που είναι πρόθυμοι να σε φιλοξενήσουν ή να ανταλλάξουν σπίτι μαζί σου.",
            how3Title: "🏖 3. Ολοκλήρωσε την ανταλλαγή",
            how3Text: "Ολοκλήρωσε την ανταλλαγή μέσα από την πλατφόρμα και ετοιμάσου για το επόμενο ταξίδι σου στην Ελλάδα!"
        },
        it: {
            topCta: "Iscriviti",
            badge: "Calcolatore gratuito di risparmio",
            headline: "Scopri quanto puoi risparmiare sui tuoi viaggi in Grecia.",
            subhead: "Confronta il costo di Airbnb o hotel con una membership Vacanza. Stima il tuo risparmio annuale viaggiando in modo sostenibile con lo scambio casa.",
            calcCta: "Calcola il risparmio",
            howCta: "Registrati",
            calcTitle: "Calcolatore di risparmio",
            nightsLabel: "Numero di notti",
            nightlyNote: "calcolato su una media nazionale del 2026",
            travelersLabel: "Numero di viaggiatori",
            tripsLabel: "Viaggi all’anno",
            savingLabel: "Con Vacanza risparmi",
            hotelLabel: "Costo tipico",
            email: "La tua email",
            start: "Inizia",
            f1Title: "Viaggia sostenibilmente",
            f1Text: "Basta pagare commissioni per tutto. Scegli lo scambio case, spendi di meno e viaggi di più. Nessuna commissione extra.",
            f2Title: "Un progetto greco",
            f2Text: "Una community costruita per destinazioni greche e case in Grecia. Aiuta l’economia e l’ambiente riducendo gli sprechi.",
            f3Title: "Fiducia prima di tutto",
            f3Text: "Profili, dettagli delle case e accordi chiari e verificati prima di ogni scambio.",
            socialProof: "Già scelta da viaggiatori in Grecia che vogliono viaggiare di più spendendo meno.",
            bottomSignup: "Registrati",
            bottomPremium: "Accedi subito",
            howTitle: "Come funziona",
            how1Title: "✅ 1. Crea il tuo profilo",
            how1Text: "Accedi a Vacanza e completa il tuo profilo per iniziare a inviare e ricevere opportunità di scambio.",
            how2Title: "💙 2. Scambia in Grecia",
            how2Text: "Trova viaggiatori, coppie o famiglie in Grecia disposte a ospitarti o a scambiare casa con te.",
            how3Title: "🏖 3. Finalizza lo scambio",
            how3Text: "Finalizza lo scambio in piattaforma e preparati al tuo prossimo viaggio in Grecia!"
        },
        en: {
            topCta: "Join",
            badge: "Free savings calculator",
            headline: "See how much you could save on your trips in Greece.",
            subhead: "Compare Airbnb or hotel costs with a Vacanza membership and see how much you could save per year exchanging your home.",
            calcCta: "Calculate my savings",
            howCta: "Register",
            calcTitle: "Savings Calculator",
            nightsLabel: "Number of nights",
            nightlyNote: "calculated on a 2026 national average",
            travelersLabel: "Number of travelers",
            tripsLabel: "Trips per year",
            savingLabel: "With Vacanza you save",
            hotelLabel: "Typical cost",
            email: "Your email",
            start: "Start",
            f1Title: "Travel without paying for accommodation",
            f1Text: "Stop overpaying for fees. Travel with Vacanza, spend less and travel more. No extra fees applied after subscription.",
            f2Title: "A Greek project",
            f2Text: "A community built for Greek destinations and Greek homes. Help the economy and the environment while travelling sustainably.",
            f3Title: "Trust-first",
            f3Text: "Verified profiles, full property details and clear terms before every exchange.",
            socialProof: "Already chosen by travelers in Greece who want to travel more while spending less.",
            bottomSignup: "Register",
            bottomPremium: "Get instant access",
            howTitle: "How it works",
            how1Title: "✅ 1. Create your profile",
            how1Text: "Access Vacanza and complete your profile to start sending and receiving exchange opportunities.",
            how2Title: "💙 2. Exchange in Greece",
            how2Text: "Find travelers, couples or families in Greece willing to host you or exchange homes with you.",
            how3Title: "🏖 3. Finalize your exchange",
            how3Text: "Finalize the exchange on the platform and get ready for your next trip in Greece!"
        }
    };

    const t = copy[currentLang];






    return (
        <div className="wrap">
            <style>{`
        :root{--blue:#1565d8;--dark:#102033;--muted:#607086;--bg:#f4f9ff;--card:#fff}
        *{box-sizing:border-box} 
        body{margin:0;font-family:Arial,Helvetica,sans-serif;background:linear-gradient(#eef7ff,#fff);color:var(--dark)}
        .wrap{max-width:1120px;margin:auto;padding:24px}
        header{display:flex;justify-content:space-between;align-items:center;margin-bottom:40px}
        .logo{font-weight:800;font-size:22px;color:var(--blue)}
        .btn{background:var(--blue);color:#fff;border:0;border-radius:14px;padding:14px 20px;font-weight:700;text-decoration:none;display:inline-block;cursor:pointer}
        .btn.secondary{background:#fff;color:var(--blue);border:1px solid #d7e7ff}

        /* Hero: flex-col on mobile, flex-row on desktop */
        .hero{display:flex;flex-direction:column;gap:28px;align-items:stretch}
        .hero > *{min-width:0}

        h1{font-size:52px;line-height:1.02;margin:0 0 18px}
        p{font-size:18px;line-height:1.6;color:var(--muted)}
        .badge{display:inline-block;background:#fff;color:var(--blue);padding:10px 14px;border-radius:999px;font-weight:700;margin-bottom:18px;box-shadow:0 6px 18px rgba(0,0,0,.06)}
        .card{background:var(--card);border-radius:28px;padding:28px;box-shadow:0 18px 50px rgba(16,32,51,.12);width:100%}
        label{display:block;font-weight:700;margin-top:20px}
        .row{display:flex;justify-content:space-between;margin-bottom:8px;gap:12px}
        input[type=range]{width:100%}
        input[type=number]{width:100%;border:1px solid #d8e2ef;border-radius:14px;padding:14px;font-size:16px;font-weight:700;color:var(--dark);outline:none}
        input[type=number]:focus{border-color:var(--blue)}
        .input-wrap{display:flex;align-items:center;gap:10px}
        .currency{font-weight:800;color:var(--blue)}
        .result{background:var(--blue);color:#fff;border-radius:24px;padding:26px;margin-top:26px}
        .result small{opacity:1;font-size:24px;font-weight:900;letter-spacing:-0.8px;display:block;margin-bottom:8px}
        .big{font-size:84px;font-weight:900;margin:6px 0 22px;color:#31f06b;letter-spacing:-3px;line-height:0.95;text-shadow:0 0 18px rgba(49,240,107,0.38)}
        .grid3{display:grid;grid-template-columns:minmax(92px,1fr) auto minmax(92px,1fr);gap:24px;font-size:18px;justify-content:center;align-items:center;text-align:center}
        .email{display:flex;gap:10px;margin-top:22px}
        .email input{flex:1;border:1px solid #d8e2ef;border-radius:14px;padding:14px;font-size:16px}
        .features{display:grid;grid-template-columns:1fr;gap:18px;margin-top:40px}
        .feature{background:#fff;border-radius:22px;padding:22px;box-shadow:0 8px 24px rgba(16,32,51,.07);position:relative;overflow:hidden}
        .feature-mark{width:54px;height:54px;border-radius:18px;background:linear-gradient(145deg,#f5fbff,#eaf4ff);color:var(--blue);display:flex;align-items:center;justify-content:center;margin-bottom:15px;box-shadow:inset 0 0 0 1px rgba(21,101,216,.10),0 8px 18px rgba(21,101,216,.08)}
        .compare-row{display:grid;grid-template-columns:minmax(0,1fr) 54px minmax(0,1fr);align-items:start;justify-items:center;gap:14px;width:100%;max-width:620px;margin:0 auto 24px auto;text-align:center}
        .compare-item{width:100%;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center}
        .compare-item small{display:flex;width:100%;min-height:72px;align-items:center;justify-content:center;text-align:center;white-space:normal;line-height:1.05;font-size:30px;font-weight:900;color:#fff;margin:0}
        .compare-item b{display:block;width:100%;text-align:center;margin-top:16px;font-size:40px;line-height:1;color:#fff;font-weight:900}
        .compare-vs{width:54px;min-height:72px;display:flex;align-items:center;justify-content:center;text-align:center;font-weight:900;font-size:32px;color:#fff;line-height:1;padding-top:0}
        .compare-separator{width:84%;height:1px;background:rgba(255,255,255,.28);margin:0 auto 28px auto}
        .desktop-hero-image{width:100%;max-width:100%;height:240px;border-radius:22px;object-fit:cover;display:block;margin-bottom:22px;box-shadow:0 18px 50px rgba(16,32,51,.12)}

        @media(min-width:640px) and (max-width:900px){
          .features{grid-template-columns:repeat(2,1fr)}
        }

        @media(min-width:901px){
          .features{grid-template-columns:repeat(3,1fr)}
        }

        /* Desktop: flex-row, each child takes 50% */
        @media(min-width:851px){
          .hero{flex-direction:row;gap:36px;align-items:flex-start}
          .hero > div:first-child{order:2;flex:1;display:flex;flex-direction:column;justify-content:flex-start;padding-top:10px}
          .hero > .card{order:1;flex:1}
          .desktop-hero-image{height:340px;border-radius:28px;margin-bottom:28px}
        }

        /* Tablet */
        @media(max-width:850px){
          .wrap{padding:16px}
          h1{font-size:clamp(34px,8vw,46px)}
          .btn{width:100%;text-align:center}
        }

        /* Mobile: scale down inner calculator elements */
        @media(max-width:640px){
          .wrap{padding:12px}
          .card{padding:18px;border-radius:20px}
          .result{padding:18px;border-radius:18px;margin-top:18px}
          .result small{font-size:18px;letter-spacing:-0.4px}
          .big{font-size:clamp(42px,13vw,64px);margin:4px 0 14px;letter-spacing:-2px}
          .compare-row{grid-template-columns:minmax(0,1fr) 40px minmax(0,1fr);gap:6px}
          .compare-item small{font-size:18px;min-height:44px}
          .compare-item b{font-size:24px;margin-top:8px}
          .compare-vs{font-size:20px;width:40px;min-height:44px}
          .compare-separator{margin:0 auto 16px auto}
          .email{flex-direction:column;gap:8px}
          .email input{width:100%}
          label{margin-top:14px;font-size:14px}
          h1{font-size:clamp(28px,7vw,38px)}
          p{font-size:15px}
        }
      `}</style>

            {/* <header>
                <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="" alt="Vacanza" style={{ height: '48px', width: 'auto', display: 'block', borderRadius: '12px' }} />
                </div>
                <a className="btn" href="https://vacanzagreece.gr/signup">{t.topCta}</a>
            </header> */}

            <section className="hero">
                <div>
                    <img
                        className="desktop-hero-image"
                        src={calculatorSideImage}
                        alt="Greek seaside home with direct sea view"
                    />

                    <div className="badge">{t.badge}</div>
                    <h1>{t.headline}</h1>
                    <p>{t.subhead}</p>

                    <div className="socialProof" style={{
                        margin: '16px 0 22px 0',
                        fontSize: '15px',
                        lineHeight: '1.5',
                        color: '#4f6480',
                        fontWeight: '700',
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '12px 14px',
                        boxShadow: '0 6px 18px rgba(16,32,51,.06)'
                    }}>
                        {t.socialProof}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <a className="btn" href="#calculator" style={{ textAlign: 'center' }}>{t.calcCta}</a>
                        <a className="btn secondary" href="https://vacanzagreece.gr/signup" style={{ textAlign: 'center' }}>{t.howCta}</a>
                    </div>
                </div>
                <CalculatorSection className="card" />

                {/* <div className="card" id="calculator">
                    <h2>{t.calcTitle}</h2>

                    <label>
                        <div className="row">
                            <span>{t.nightsLabel}</span>
                            <span>{nights}</span>
                        </div>
                        <input
                            type="range"
                            min="2"
                            max="45"
                            value={nights}
                            onChange={(e) => setNights(Number(e.target.value))}
                        />
                    </label>

                    <label>
                        <div className="row">
                            <span>{t.travelersLabel}</span>
                            <span>{travelers}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="8"
                            value={travelers}
                            onChange={(e) => setTravelers(Number(e.target.value))}
                        />
                    </label>

                    <label>
                        <div className="row">
                            <span>{t.tripsLabel}</span>
                            <span>{trips}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="8"
                            value={trips}
                            onChange={(e) => setTrips(Number(e.target.value))}
                        />
                    </label>

                    <div className="result">
                        <div className="compare-row">
                            <div className="compare-item">
                                <small>{t.hotelLabel}</small>
                                <b>{fmt(hotelCost)}</b>
                            </div>
                            <div className="compare-vs">VS</div>
                            <div className="compare-item">
                                <small>Vacanza</small>
                                <b>{fmt(membership)}</b>
                            </div>
                        </div>

                        <div className="compare-separator"></div>

                        <div style={{ textAlign: 'center' }}>
                            <small>{t.savingLabel}</small>
                            <div className="big">{fmt(savings)}</div>
                        </div>
                    </div>

                    <form className="email" action="https://vacanzagreece.gr/signup" method="get">
                        <input type="email" placeholder={t.email} />
                        <button className="btn" type="submit">{t.start}</button>
                    </form>
                </div> */}
            </section>

            <section className="features" style={{ marginTop: '40px' }}>
                <div className="feature" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ minWidth: '54px', height: '54px', borderRadius: '16px', background: '#eef6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>💸</div>
                    <div>
                        <h3>{t.f1Title}</h3>
                        <p>{t.f1Text}</p>
                    </div>
                </div>

                <div className="feature" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ minWidth: '54px', height: '54px', borderRadius: '16px', background: '#eef6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>🇬🇷</div>
                    <div>
                        <h3>{t.f2Title}</h3>
                        <p>{t.f2Text}</p>
                    </div>
                </div>

                <div className="feature" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ minWidth: '54px', height: '54px', borderRadius: '16px', background: '#eef6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>🤝</div>
                    <div>
                        <h3>{t.f3Title}</h3>
                        <p>{t.f3Text}</p>
                    </div>
                </div>
            </section>

            {/* How it works section */}
            <section style={{ marginTop: '50px', textAlign: 'center', paddingBottom: '30px' }}>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="https://vacanzagreece.gr/signup" className="btn">{t.bottomSignup}</a>
                    <a href="https://buy.stripe.com/dRm14nfFYfpsavd2judIA00" className="btn secondary">{t.bottomPremium}</a>
                </div>
            </section>

            <section style={{
                marginTop: '26px',
                background: 'linear-gradient(180deg,#f3f9ff 0%, #eef7ff 100%)',
                borderRadius: '28px',
                padding: '30px',
                boxShadow: '0 12px 40px rgba(16,32,51,.08)'
            }}>
                <h2 style={{ fontSize: '38px', lineHeight: '1.1', margin: '0 0 30px', textAlign: 'center', color: '#102033' }}>
                    {t.howTitle}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                    <div style={{ background: 'rgba(255,255,255,.78)', backdropFilter: 'blur(6px)', borderRadius: '22px', padding: '24px', boxShadow: '0 8px 24px rgba(16,32,51,.05)' }}>
                        <h3 style={{ fontSize: '22px', lineHeight: '1.25', margin: '0 0 12px', color: '#102033' }}>{t.how1Title}</h3>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0', color: '#607086' }}>{t.how1Text}</p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,.78)', backdropFilter: 'blur(6px)', borderRadius: '22px', padding: '24px', boxShadow: '0 8px 24px rgba(16,32,51,.05)' }}>
                        <h3 style={{ fontSize: '22px', lineHeight: '1.25', margin: '0 0 12px', color: '#102033' }}>{t.how2Title}</h3>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0', color: '#607086' }}>{t.how2Text}</p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,.78)', backdropFilter: 'blur(6px)', borderRadius: '22px', padding: '24px', boxShadow: '0 8px 24px rgba(16,32,51,.05)' }}>
                        <h3 style={{ fontSize: '22px', lineHeight: '1.25', margin: '0 0 12px', color: '#102033' }}>{t.how3Title}</h3>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0', color: '#607086' }}>{t.how3Text}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
                    <a href="https://vacanzagreece.gr/signup" className="btn">{t.bottomSignup}</a>
                    <a href="https://buy.stripe.com/dRm14nfFYfpsavd2judIA00" className="btn secondary">{t.bottomPremium}</a>
                </div>
            </section>
        </div>
    );
};

export default VacanzaSavingsCalculator;