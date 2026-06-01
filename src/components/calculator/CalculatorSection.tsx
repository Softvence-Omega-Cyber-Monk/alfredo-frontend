import CommonWrapper from "@/common/CommonWrapper";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CalculatorSectionProps {
    isHome?: boolean;
    className?: string;
}

export default function CalculatorSection({ isHome = false, className = "" }: CalculatorSectionProps) {

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

    const membership = 59;
    const [nights, setNights] = useState(10);
    const [travelers, setTravelers] = useState(2);
    const [trips, setTrips] = useState(2);


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

    const fmt = (n: number): string => {
        const locale = currentLang === 'el' ? 'el-GR' : currentLang === 'it' ? 'it-IT' : 'en-US';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(n);
    };

    const hotelCost = trips * nights * (120 + Math.max(travelers - 1, 0) * 20);
    const savings = Math.max(hotelCost - membership, 0);



    return (
        <CommonWrapper>
            <div className={className || (isHome ? "card w-full max-w-5xl mx-auto my-12" : "card w-full md:w-3/4 lg:w-1/2 mx-auto")} id="calculator">
                <style>{`
        :root{--blue:#1565d8;--dark:#102033;--muted:#607086;--bg:#f4f9ff;--card:#fff}
        *{box-sizing:border-box}
        .card{background:var(--card);border-radius:28px;padding:28px;box-shadow:0 18px 50px rgba(16,32,51,.12)}
        label{display:block;font-weight:700;margin-top:20px}
        .row{display:flex;justify-content:space-between;margin-bottom:8px;gap:12px}
        input[type=range]{width:100%}
        input[type=number]{width:100%;border:1px solid #d8e2ef;border-radius:14px;padding:14px;font-size:16px;font-weight:700;color:var(--dark);outline:none}
        input[type=number]:focus{border-color:var(--blue)}
        .input-wrap{display:flex;align-items:center;gap:10px}
        .currency{font-weight:800;color:var(--blue)}
        .btn{background:var(--blue);color:#fff;border:0;border-radius:14px;padding:14px 20px;font-weight:700;text-decoration:none;display:inline-block;cursor:pointer}
        .btn.secondary{background:#fff;color:var(--blue);border:1px solid #d7e7ff}
        .result{background:var(--blue);color:#fff;border-radius:24px;padding:26px;margin-top:26px}
        .result small{opacity:1;font-size:24px;font-weight:900;letter-spacing:-0.8px;display:block;margin-bottom:8px}
        .big{font-size:84px;font-weight:900;margin:6px 0 22px;color:#31f06b;letter-spacing:-3px;line-height:0.95;text-shadow:0 0 18px rgba(49,240,107,0.38)}
        .email{display:flex;gap:10px;margin-top:22px}
        .email input{flex:1;border:1px solid #d8e2ef;border-radius:14px;padding:14px;font-size:16px}
        .compare-row{display:grid;grid-template-columns:minmax(0,1fr) 54px minmax(0,1fr);align-items:start;justify-items:center;gap:14px;width:100%;max-width:620px;margin:0 auto 24px auto;text-align:center}
        .compare-item{width:100%;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center}
        .compare-item small{display:flex;width:100%;min-height:72px;align-items:center;justify-content:center;text-align:center;white-space:normal;line-height:1.05;font-size:30px;font-weight:900;color:#fff;margin:0}
        .compare-item b{display:block;width:100%;text-align:center;margin-top:16px;font-size:40px;line-height:1;color:#fff;font-weight:900}
        .compare-vs{width:54px;min-height:72px;display:flex;align-items:center;justify-content:center;text-align:center;font-weight:900;font-size:32px;color:#fff;line-height:1;padding-top:0}
        .compare-separator{width:84%;height:1px;background:rgba(255,255,255,.28);margin:0 auto 28px auto}

        @media(max-width:640px){
          .card{padding:18px;border-radius:20px}
          .result{padding:18px;border-radius:18px;margin-top:18px}
          .result small{font-size:18px;letter-spacing:-0.4px}
          .big{font-size:clamp(42px,13vw,64px);margin:4px 0 14px;letter-spacing:-2px}
          .compare-row{grid-template-columns:minmax(0,1fr) 40px minmax(0,1fr);gap:6px}
          .compare-item small{font-size:20px;min-height:48px}
          .compare-item b{font-size:26px;margin-top:10px}
          .compare-vs{font-size:22px;width:40px;min-height:48px}
          .compare-separator{margin:0 auto 16px auto}
          .email{flex-direction:column;gap:8px}
          .email input{width:100%}
          label{margin-top:14px;font-size:14px}
          .btn{width:100%;text-align:center}
        }
      `}</style>

                {isHome ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="flex flex-col gap-4">
                            <h2 style={{ marginTop: 0, marginBottom: "12px" }}>{t.calcTitle}</h2>

                            <label style={{ marginTop: 0 }}>
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

                            <label style={{ marginTop: "12px" }}>
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

                            <label style={{ marginTop: "12px" }}>
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
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="result" style={{ marginTop: 0 }}>
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

                            <form className="email" action="https://vacanzagreece.gr/signup" method="get" style={{ marginTop: 0 }}>
                                <input type="email" placeholder={t.email} />
                                <button className="btn" type="submit">{t.start}</button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </CommonWrapper>
    );
}
