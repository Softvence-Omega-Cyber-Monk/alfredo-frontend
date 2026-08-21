export type ProtectLang = "en" | "el" | "it";

export const resolveProtectLang = (langCode?: string): ProtectLang => {
  if (langCode?.startsWith("el")) return "el";
  if (langCode?.startsWith("it")) return "it";
  return "en";
};

export const protectLocale: Record<ProtectLang, string> = {
  en: "en-US",
  el: "el-GR",
  it: "it-IT",
};

interface Item {
  title: string;
  text: string;
}

export interface ProtectCopy {
  brand: string;
  hero: {
    eyebrow: string;
    titleStart: string;
    accent: string;
    titleEnd: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string[];
  };
  stats: { value: string; label: string }[];
  covered: { title: string; subtitle: string; items: Item[] };
  how: { title: string; subtitle: string; steps: Item[] };
  pricing: {
    title: string;
    subtitle: string;
    popular: string;
    cta: string;
    yearly: { name: string; tagline: string; per: string; features: string[] };
    perTrip: { name: string; tagline: string; per: string; features: string[] };
    compareTitle: string;
    compareFew: string;
    compareMany: string;
    breakEven: string;
  };
  faq: { title: string; items: Item[] };
  cta: { title: string; subtitle: string; button: string; note: string };
  checkout: {
    title: string;
    subtitleYearly: string;
    subtitlePerTrip: string;
    name: string;
    email: string;
    address: string;
    addressHint: string;
    trips: string;
    total: string;
    pay: string;
    processing: string;
    secure: string;
    loggedInAs: string;
    emailRequired: string;
    cancelled: string;
    error: string;
  };
  widget: {
    title: string;
    subtitle: string;
    badge: string;
    covered: string;
    validUntil: string;
    tripsLeft: string;
    notCovered: string;
    learnMore: string;
    buyYearly: string;
    buyPerTrip: string;
  };
}

export const protectCopy: Record<ProtectLang, ProtectCopy> = {
  en: {
    brand: "Vacanza Protect",
    hero: {
      eyebrow: "Home & travel insurance",
      accent: "Travel",
      titleStart: "Protected",
      titleEnd: "",
      subtitle:
        "Insurance protection for BnB owners, travelers and homeowners.",
      ctaPrimary: "Get covered",
      ctaSecondary: "See the plans",
      trust: ["Damage & theft cover", "Travel protection", "Cancel anytime"],
    },
    stats: [
      { value: "2 min", label: "to get covered" },
      { value: "0", label: "paperwork" },
      { value: "100%", label: "online claims" },
    ],
    covered: {
      title: "What Vacanza Protect covers",
      subtitle:
        "One policy for the two things you care about most: your property and your travels.",
      items: [
        {
          title: "Property damage",
          text: "Accidental damage to your home or B&B caused by guests, tenants or visitors.",
        },
        {
          title: "Theft & burglary",
          text: "Belongings taken from your property are covered up to the policy limit.",
        },
        {
          title: "Travel protection",
          text: "Trip cancellations, delays, lost luggage and medical emergencies while you are away.",
        },
        {
          title: "Claims made simple",
          text: "Report online with a few photos. Nothing to print, no queues, no waiting rooms.",
        },
      ],
    },
    how: {
      title: "How it works",
      subtitle: "Three steps, no phone calls, no paperwork.",
      steps: [
        {
          title: "1. Choose your cover",
          text: "Yearly cover for your property, or single trip cover for when you travel.",
        },
        {
          title: "2. Pay securely",
          text: "Checkout is handled by Stripe. Cards, Apple Pay and Google Pay accepted.",
        },
        {
          title: "3. You are covered",
          text: "A confirmation email with your cover details arrives right after payment.",
        },
      ],
    },
    pricing: {
      title: "Simple pricing, no surprises",
      subtitle:
        "Pick the cover that matches your life. You can switch whenever you like.",
      popular: "Most popular",
      cta: "Get covered",
      yearly: {
        name: "Annual home cover",
        tagline: "For homeowners and B&B owners",
        per: "/ year",
        features: [
          "12 months of continuous cover",
          "Damage and theft protection",
          "Priority claim handling",
          "Cancel renewal anytime",
        ],
      },
      perTrip: {
        name: "Single trip cover",
        tagline: "For travelers and occasional stays",
        per: "/ trip",
        features: [
          "Cover for one trip",
          "Damage and theft protection",
          "Pay only when you travel",
          "No subscription",
        ],
      },
      compareTitle: "Which cover is right for you?",
      compareFew: "2 trips per year",
      compareMany: "10 trips per year",
      breakEven: "The annual cover costs less from {{count}} trips per year.",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          title: "Who is Vacanza Protect for?",
          text: "Homeowners, B&B owners and travelers who want their property and their trips protected.",
        },
        {
          title: "When does the cover start?",
          text: "As soon as your payment goes through. You receive a confirmation email with your cover details.",
        },
        {
          title: "Do I need an account?",
          text: "No. Vacanza Protect is sold on its own — an email address is all you need to buy.",
        },
        {
          title: "How do I make a claim?",
          text: "Reply to your confirmation email describing what happened and attach photos. Our team gets back to you within two working days.",
        },
        {
          title: "Can I cancel?",
          text: "Yes. The annual cover can be stopped from renewing at any time and stays active until the end of the paid period.",
        },
      ],
    },
    cta: {
      title: "Get covered in two minutes",
      subtitle:
        "Join the homeowners and travelers who stopped worrying about damage, theft and trips gone wrong.",
      button: "Get covered now",
      note: "Secure payment with Stripe · Cancel anytime",
    },
    checkout: {
      title: "Complete your cover",
      subtitleYearly: "12 months of protection for your property.",
      subtitlePerTrip: "Protection for the trips you are planning.",
      name: "Full name",
      email: "Email address",
      address: "Address of the property to cover",
      addressHint: "Optional — we confirm the details by email.",
      trips: "Trips to cover",
      total: "Total",
      pay: "Continue to payment",
      processing: "Redirecting to Stripe...",
      secure: "You will be redirected to Stripe to pay securely.",
      loggedInAs: "Buying as",
      emailRequired: "Please enter a valid email address",
      cancelled: "Checkout cancelled. You are not covered yet.",
      error: "We could not start the checkout. Please try again.",
    },
    widget: {
      title: "Protect your home and trips",
      subtitle: "Home and travel insurance from Vacanza Protect.",
      badge: "Insurance",
      covered: "You are covered",
      validUntil: "Cover valid until",
      tripsLeft: "trips covered",
      notCovered: "You are not covered yet",
      learnMore: "How it works",
      buyYearly: "Cover my home",
      buyPerTrip: "Cover one trip",
    },
  },

  el: {
    brand: "Vacanza Protect",
    hero: {
      eyebrow: "Ασφάλιση κατοικίας & ταξιδιού",
      titleStart: "Το σπίτι και τα ταξίδια σου,",
      accent: "πλήρως καλυμμένα",
      titleEnd: "",
      subtitle:
        "Το Vacanza Protect ασφαλίζει ιδιοκτήτες κατοικιών, ιδιοκτήτες BnB και ταξιδιώτες από ζημιές, κλοπή και απρόοπτα στο ταξίδι. Αποκτάς κάλυψη online σε δύο λεπτά — χωρίς έντυπα, χωρίς τηλέφωνα.",
      ctaPrimary: "Απόκτησε κάλυψη",
      ctaSecondary: "Δες τα πακέτα",
      trust: [
        "Κάλυψη ζημιών & κλοπής",
        "Ταξιδιωτική προστασία",
        "Ακύρωση οποτεδήποτε",
      ],
    },
    stats: [
      { value: "2 λεπτά", label: "για να καλυφθείς" },
      { value: "0", label: "γραφειοκρατία" },
      { value: "100%", label: "online αιτήματα" },
    ],
    covered: {
      title: "Τι καλύπτει το Vacanza Protect",
      subtitle:
        "Ένα συμβόλαιο για τα δύο πράγματα που σε νοιάζουν περισσότερο: την περιουσία και τα ταξίδια σου.",
      items: [
        {
          title: "Ζημιές στην κατοικία",
          text: "Τυχαίες ζημιές στο σπίτι ή στο BnB σου από επισκέπτες, ενοικιαστές ή φιλοξενούμενους.",
        },
        {
          title: "Κλοπή & διάρρηξη",
          text: "Αντικείμενα που αφαιρούνται από την κατοικία σου καλύπτονται έως το όριο του συμβολαίου.",
        },
        {
          title: "Ταξιδιωτική προστασία",
          text: "Ακυρώσεις ταξιδιών, καθυστερήσεις, απώλεια αποσκευών και ιατρικά έκτακτα περιστατικά όσο λείπεις.",
        },
        {
          title: "Απλά αιτήματα",
          text: "Δήλωσέ το online με λίγες φωτογραφίες. Τίποτα για εκτύπωση, καμία ουρά.",
        },
      ],
    },
    how: {
      title: "Πώς λειτουργεί",
      subtitle: "Τρία βήματα, χωρίς τηλέφωνα και χαρτιά.",
      steps: [
        {
          title: "1. Διάλεξε κάλυψη",
          text: "Ετήσια κάλυψη για την κατοικία σου ή κάλυψη ενός ταξιδιού όταν ταξιδεύεις.",
        },
        {
          title: "2. Πλήρωσε με ασφάλεια",
          text: "Η πληρωμή γίνεται μέσω Stripe. Δεκτές κάρτες, Apple Pay και Google Pay.",
        },
        {
          title: "3. Είσαι καλυμμένος",
          text: "Αμέσως μετά την πληρωμή λαμβάνεις email επιβεβαίωσης με τα στοιχεία της κάλυψής σου.",
        },
      ],
    },
    pricing: {
      title: "Απλή τιμολόγηση, χωρίς εκπλήξεις",
      subtitle:
        "Διάλεξε την κάλυψη που σου ταιριάζει. Μπορείς να αλλάξεις όποτε θέλεις.",
      popular: "Πιο δημοφιλές",
      cta: "Απόκτησε κάλυψη",
      yearly: {
        name: "Ετήσια κάλυψη κατοικίας",
        tagline: "Για ιδιοκτήτες κατοικιών και BnB",
        per: "/ χρόνο",
        features: [
          "12 μήνες συνεχούς κάλυψης",
          "Προστασία από ζημιές και κλοπή",
          "Προτεραιότητα στα αιτήματα",
          "Ακύρωση ανανέωσης οποτεδήποτε",
        ],
      },
      perTrip: {
        name: "Κάλυψη ενός ταξιδιού",
        tagline: "Για ταξιδιώτες και περιστασιακές διαμονές",
        per: "/ ταξίδι",
        features: [
          "Κάλυψη για ένα ταξίδι",
          "Προστασία από ζημιές και κλοπή",
          "Πληρώνεις μόνο όταν ταξιδεύεις",
          "Χωρίς συνδρομή",
        ],
      },
      compareTitle: "Ποια κάλυψη σου ταιριάζει;",
      compareFew: "2 ταξίδια τον χρόνο",
      compareMany: "10 ταξίδια τον χρόνο",
      breakEven:
        "Η ετήσια κάλυψη συμφέρει από {{count}} ταξίδια τον χρόνο και πάνω.",
    },
    faq: {
      title: "Συχνές ερωτήσεις",
      items: [
        {
          title: "Σε ποιους απευθύνεται το Vacanza Protect;",
          text: "Σε ιδιοκτήτες κατοικιών, ιδιοκτήτες BnB και ταξιδιώτες που θέλουν να προστατεύσουν την περιουσία και τα ταξίδια τους.",
        },
        {
          title: "Πότε ξεκινά η κάλυψη;",
          text: "Μόλις ολοκληρωθεί η πληρωμή. Λαμβάνεις email επιβεβαίωσης με τα στοιχεία της κάλυψης.",
        },
        {
          title: "Χρειάζομαι λογαριασμό;",
          text: "Όχι. Το Vacanza Protect πωλείται αυτόνομα — χρειάζεσαι μόνο ένα email για να το αγοράσεις.",
        },
        {
          title: "Πώς κάνω αίτημα αποζημίωσης;",
          text: "Απάντησε στο email επιβεβαίωσης περιγράφοντας τι συνέβη και επισύναψε φωτογραφίες. Απαντάμε εντός δύο εργάσιμων ημερών.",
        },
        {
          title: "Μπορώ να ακυρώσω;",
          text: "Ναι. Η ετήσια κάλυψη μπορεί να σταματήσει να ανανεώνεται οποτεδήποτε και παραμένει ενεργή μέχρι το τέλος της πληρωμένης περιόδου.",
        },
      ],
    },
    cta: {
      title: "Απόκτησε κάλυψη σε δύο λεπτά",
      subtitle:
        "Έλα κι εσύ στους ιδιοκτήτες και τους ταξιδιώτες που έπαψαν να ανησυχούν για ζημιές, κλοπές και ταξίδια που πάνε στραβά.",
      button: "Απόκτησε κάλυψη τώρα",
      note: "Ασφαλής πληρωμή με Stripe · Ακύρωση οποτεδήποτε",
    },
    checkout: {
      title: "Ολοκλήρωσε την κάλυψή σου",
      subtitleYearly: "12 μήνες προστασίας για την κατοικία σου.",
      subtitlePerTrip: "Προστασία για τα ταξίδια που σχεδιάζεις.",
      name: "Ονοματεπώνυμο",
      email: "Διεύθυνση email",
      address: "Διεύθυνση της κατοικίας που καλύπτεται",
      addressHint: "Προαιρετικό — επιβεβαιώνουμε τα στοιχεία με email.",
      trips: "Ταξίδια προς κάλυψη",
      total: "Σύνολο",
      pay: "Συνέχεια στην πληρωμή",
      processing: "Ανακατεύθυνση στο Stripe...",
      secure: "Θα μεταφερθείς στο Stripe για ασφαλή πληρωμή.",
      loggedInAs: "Αγορά ως",
      emailRequired: "Συμπλήρωσε ένα έγκυρο email",
      cancelled: "Η πληρωμή ακυρώθηκε. Δεν έχεις κάλυψη ακόμα.",
      error: "Δεν μπορέσαμε να ξεκινήσουμε την πληρωμή. Δοκίμασε ξανά.",
    },
    widget: {
      title: "Προστάτεψε το σπίτι και τα ταξίδια σου",
      subtitle: "Ασφάλιση κατοικίας και ταξιδιού από το Vacanza Protect.",
      badge: "Ασφάλιση",
      covered: "Είσαι καλυμμένος",
      validUntil: "Η κάλυψη ισχύει έως",
      tripsLeft: "ταξίδια καλυμμένα",
      notCovered: "Δεν έχεις κάλυψη ακόμα",
      learnMore: "Πώς λειτουργεί",
      buyYearly: "Κάλυψε το σπίτι μου",
      buyPerTrip: "Κάλυψε ένα ταξίδι",
    },
  },

  it: {
    brand: "Vacanza Protect",
    hero: {
      eyebrow: "Assicurazione casa e viaggio",
      titleStart: "La tua casa e i tuoi viaggi,",
      accent: "protetti davvero",
      titleEnd: "",
      subtitle:
        "Vacanza Protect assicura proprietari di case, gestori di B&B e viaggiatori contro danni, furti e imprevisti di viaggio. Ti assicuri online in due minuti — senza moduli e senza telefonate.",
      ctaPrimary: "Assicurati ora",
      ctaSecondary: "Vedi i piani",
      trust: [
        "Copertura danni e furto",
        "Protezione viaggio",
        "Disdici quando vuoi",
      ],
    },
    stats: [
      { value: "2 min", label: "per assicurarti" },
      { value: "0", label: "burocrazia" },
      { value: "100%", label: "richieste online" },
    ],
    covered: {
      title: "Cosa copre Vacanza Protect",
      subtitle:
        "Una sola polizza per le due cose che contano di più: la tua casa e i tuoi viaggi.",
      items: [
        {
          title: "Danni alla proprietà",
          text: "Danni accidentali alla tua casa o al tuo B&B causati da ospiti, inquilini o visitatori.",
        },
        {
          title: "Furto e scasso",
          text: "Gli oggetti sottratti dalla tua proprietà sono coperti fino al massimale di polizza.",
        },
        {
          title: "Protezione viaggio",
          text: "Annullamenti, ritardi, bagagli smarriti ed emergenze mediche mentre sei via.",
        },
        {
          title: "Richieste semplici",
          text: "Segnala online con qualche foto. Niente da stampare, nessuna coda.",
        },
      ],
    },
    how: {
      title: "Come funziona",
      subtitle: "Tre passaggi, senza telefonate e senza moduli.",
      steps: [
        {
          title: "1. Scegli la copertura",
          text: "Copertura annuale per la tua casa, oppure copertura singola quando viaggi.",
        },
        {
          title: "2. Paga in sicurezza",
          text: "Il pagamento è gestito da Stripe. Carte, Apple Pay e Google Pay accettati.",
        },
        {
          title: "3. Sei coperto",
          text: "Subito dopo il pagamento ricevi un'email di conferma con i dettagli della copertura.",
        },
      ],
    },
    pricing: {
      title: "Prezzi semplici, nessuna sorpresa",
      subtitle:
        "Scegli la copertura adatta a te. Puoi cambiarla quando vuoi.",
      popular: "Più scelto",
      cta: "Assicurati ora",
      yearly: {
        name: "Copertura casa annuale",
        tagline: "Per proprietari di case e B&B",
        per: "/ anno",
        features: [
          "12 mesi di copertura continua",
          "Protezione danni e furto",
          "Gestione prioritaria delle richieste",
          "Disdici il rinnovo quando vuoi",
        ],
      },
      perTrip: {
        name: "Copertura singolo viaggio",
        tagline: "Per viaggiatori e soggiorni occasionali",
        per: "/ viaggio",
        features: [
          "Copertura per un viaggio",
          "Protezione danni e furto",
          "Paghi solo quando viaggi",
          "Nessun abbonamento",
        ],
      },
      compareTitle: "Quale copertura fa per te?",
      compareFew: "2 viaggi all'anno",
      compareMany: "10 viaggi all'anno",
      breakEven:
        "La copertura annuale conviene da {{count}} viaggi all'anno in su.",
    },
    faq: {
      title: "Domande frequenti",
      items: [
        {
          title: "A chi è rivolto Vacanza Protect?",
          text: "A proprietari di case, gestori di B&B e viaggiatori che vogliono proteggere la propria casa e i propri viaggi.",
        },
        {
          title: "Quando inizia la copertura?",
          text: "Appena il pagamento va a buon fine. Ricevi un'email di conferma con i dettagli della copertura.",
        },
        {
          title: "Serve un account?",
          text: "No. Vacanza Protect si acquista da solo — basta un indirizzo email.",
        },
        {
          title: "Come apro una richiesta?",
          text: "Rispondi all'email di conferma descrivendo l'accaduto e allegando le foto. Ti rispondiamo entro due giorni lavorativi.",
        },
        {
          title: "Posso disdire?",
          text: "Sì. La copertura annuale può non essere rinnovata in qualsiasi momento e resta attiva fino alla fine del periodo pagato.",
        },
      ],
    },
    cta: {
      title: "Assicurati in due minuti",
      subtitle:
        "Unisciti ai proprietari e ai viaggiatori che hanno smesso di preoccuparsi di danni, furti e viaggi andati storti.",
      button: "Assicurati ora",
      note: "Pagamento sicuro con Stripe · Disdici quando vuoi",
    },
    checkout: {
      title: "Completa la tua copertura",
      subtitleYearly: "12 mesi di protezione per la tua casa.",
      subtitlePerTrip: "Protezione per i viaggi che hai in programma.",
      name: "Nome e cognome",
      email: "Indirizzo email",
      address: "Indirizzo dell'immobile da coprire",
      addressHint: "Facoltativo — confermiamo i dettagli via email.",
      trips: "Viaggi da coprire",
      total: "Totale",
      pay: "Vai al pagamento",
      processing: "Reindirizzamento a Stripe...",
      secure: "Verrai reindirizzato a Stripe per pagare in sicurezza.",
      loggedInAs: "Acquisto come",
      emailRequired: "Inserisci un indirizzo email valido",
      cancelled: "Pagamento annullato. Non sei ancora coperto.",
      error: "Non siamo riusciti ad avviare il pagamento. Riprova.",
    },
    widget: {
      title: "Proteggi la tua casa e i tuoi viaggi",
      subtitle: "Assicurazione casa e viaggio di Vacanza Protect.",
      badge: "Assicurazione",
      covered: "Sei coperto",
      validUntil: "Copertura valida fino al",
      tripsLeft: "viaggi coperti",
      notCovered: "Non sei ancora coperto",
      learnMore: "Come funziona",
      buyYearly: "Copri la mia casa",
      buyPerTrip: "Copri un viaggio",
    },
  },
};
