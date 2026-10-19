/* Psykologiatlas – innehåll. Källor: boken "Du och samhället" kap 10–11, lärarens PowerPoints kap 10 och 11,
   och listan "Att kunna till provet". Texten är omskriven. Allt som inte står i materialet är märkt "Förklaring". */
/* Ritar en klickbar tidslinje med rutor. items: [nyckel, ålder, rad 1, rad 2] */
const timeline = (items, bw, from, to) => {
  const gap = 10, W = 16 + items.length * bw + (items.length - 1) * gap;
  return `<svg viewBox="0 0 ${W} 170" role="img" aria-label="Tidslinje">
    <line class="line" x1="8" y1="150" x2="${W - 12}" y2="150"/><polygon points="${W - 6},150 ${W - 18},144 ${W - 18},156" fill="currentColor" opacity=".5"/>
    <text x="8" y="168" font-size="12" opacity=".7">${from}</text><text x="${W - 6}" y="168" font-size="12" text-anchor="end" opacity=".7">${to}</text>
    ${items.map(([k, age, a, b], i) => {
      const x = 8 + i * (bw + gap), c = x + bw / 2;
      return `<g data-k="${k}"><rect class="shape ${i % 2 ? "acc" : ""}" x="${x}" y="14" width="${bw}" height="112" rx="12"/>
        <text x="${c}" y="40" text-anchor="middle" font-size="13" opacity=".75">${age}</text>
        <text x="${c}" y="74" text-anchor="middle" font-size="15" font-weight="700">${a}</text>
        <text x="${c}" y="95" text-anchor="middle" font-size="15" font-weight="700">${b}</text>
        <line class="line" x1="${c}" y1="126" x2="${c}" y2="150"/></g>`;
    }).join("")}
  </svg>`;
};

window.ATLAS = {

/* ================= FIGURER (egna SVG:er) ================= */
figs: {
  idkarta: {
    label: "Identitetens delar",
    start: "Identiteten består av många delar. Klicka på en del.",
    svg: `<svg viewBox="0 0 600 300" role="img" aria-label="Tankekarta: identitet i mitten med roller, intressen, familj, kön, egenskaper och nationalitet runt om">
      <g class="line"><line x1="300" y1="150" x2="150" y2="55"/><line x1="300" y1="150" x2="450" y2="55"/><line x1="300" y1="150" x2="95" y2="150"/><line x1="300" y1="150" x2="505" y2="150"/><line x1="300" y1="150" x2="150" y2="245"/><line x1="300" y1="150" x2="450" y2="245"/></g>
      <g data-k="identitet"><ellipse class="shape acc" cx="300" cy="150" rx="90" ry="40"/><text x="300" y="156" text-anchor="middle" font-size="18" font-weight="700">IDENTITET</text></g>
      <g data-k="roller"><ellipse class="shape" cx="150" cy="55" rx="72" ry="30"/><text x="150" y="61" text-anchor="middle" font-size="16">Roller</text></g>
      <g data-k="intressen"><ellipse class="shape" cx="450" cy="55" rx="72" ry="30"/><text x="450" y="61" text-anchor="middle" font-size="16">Intressen</text></g>
      <g data-k="familj"><ellipse class="shape" cx="95" cy="150" rx="72" ry="30"/><text x="95" y="156" text-anchor="middle" font-size="16">Familj</text></g>
      <g data-k="kon"><ellipse class="shape" cx="505" cy="150" rx="72" ry="30"/><text x="505" y="156" text-anchor="middle" font-size="16">Kön</text></g>
      <g data-k="egenskaper"><ellipse class="shape" cx="150" cy="245" rx="72" ry="30"/><text x="150" y="251" text-anchor="middle" font-size="16">Egenskaper</text></g>
      <g data-k="nationalitet"><ellipse class="shape" cx="450" cy="245" rx="72" ry="30"/><text x="450" y="251" text-anchor="middle" font-size="16">Nationalitet</text></g>
    </svg>`,
    info: {
      identitet: "<b>Identitet</b> är din bild av vem du är, att du är medveten om dig själv som en unik person (NE). Popov m.fl. kallar det en stabil och tillförlitlig bild av vem vi är. <span class='muted'>(s. 171)</span>",
      roller: "<b>Roller:</b> olika roller du har i livet, till exempel elev, senare ett yrke eller ett uppdrag. <span class='muted'>(s. 171)</span>",
      intressen: "<b>Intressen:</b> dina fritidsintressen är en del av hur du beskriver dig själv. <span class='muted'>(s. 171)</span>",
      familj: "<b>Familj:</b> du i relation till din familj och dina vänner. Familjen är också en grupp som skapar din sociala identitet. <span class='muted'>(s. 171–172)</span>",
      kon: "<b>Kön:</b> din könsidentitet. Boken räknar din biologiska könsidentitet till de delar av identiteten som är medfödda. <span class='muted'>(s. 171–172)</span>",
      egenskaper: "<b>Egenskaper:</b> din personlighet, till exempel om du är envis, lugn eller nyfiken. <span class='muted'>(s. 171)</span>",
      nationalitet: "<b>Nationalitet:</b> hör ihop med din kulturella identitet. Enligt barnkonventionen har alla barn rätt till en nationalitet. Etnicitet är enligt boken en medfödd del av identiteten. <span class='muted'>(s. 171–172)</span>"
    }
  },
  stern: {
    label: "Daniel Sterns fem stadier",
    start: "Sterns stadier från födseln till fyra år. Klicka på ett stadium.",
    svg: `<svg viewBox="0 0 700 170" role="img" aria-label="Tidslinje med Daniel Sterns fem stadier">
      <line class="line" x1="10" y1="150" x2="685" y2="150"/><polygon points="690,150 678,144 678,156" fill="currentColor" opacity=".5"/>
      <text x="10" y="168" font-size="12" opacity=".7">födsel</text><text x="690" y="168" font-size="12" text-anchor="end" opacity=".7">4 år och framåt</text>
      ${[["s0", "0–2 mån", "Inget samlat", "själv ännu"], ["s1", "2–6 mån", "Kärn-", "självet"], ["s2", "7–15 mån", "Subjektiva", "självet"], ["s3", "16 mån–3 år", "Verbala", "självet"], ["s4", "4 år –", "Berättande", "självet"]]
        .map(([k, age, a, b], i) => {
          const x = 8 + i * 138;
          return `<g data-k="${k}"><rect class="shape ${i ? "acc" : ""}" x="${x}" y="14" width="128" height="112" rx="12"/>
          <text x="${x + 64}" y="40" text-anchor="middle" font-size="13" opacity=".75">${age}</text>
          <text x="${x + 64}" y="74" text-anchor="middle" font-size="16" font-weight="700">${a}</text>
          <text x="${x + 64}" y="96" text-anchor="middle" font-size="16" font-weight="700">${b}</text>
          <line class="line" x1="${x + 64}" y1="126" x2="${x + 64}" y2="150"/></g>`;
        }).join("")}
    </svg>`,
    info: {
      s0: "<b>0–2 månader:</b> du har ännu inget sammanhållet själv. Du känner tidigt igen mammas röst och föräldrarnas ansikten och börjar uppskatta dagliga rutiner. Det lägger grunden för din självuppfattning.",
      s1: "<b>2–6 månader – kärnsjälvet:</b> du tar medveten ögonkontakt och ler ditt första sociala leende. Kärnsjälvet byggs av intryck, enkla minnesbilder, egna känslor och dina rörelser.",
      s2: "<b>7–15 månader – det subjektiva självet:</b> du knyter an till den som tar hand om dig och uppfattar samspelet med andra. Växelspelet mellan dig och föräldrarna utvecklar det subjektiva självet.",
      s3: "<b>16 månader–3 år – det verbala självet:</b> med språket kan du hantera dig själv. Symbollekar börjar, till exempel att laga mat i sandlådan. Du lär dig säga ditt namn och känna igen din spegelbild.",
      s4: "<b>4 år och framåt – det berättande självet:</b> tal och minne utvecklas så att du kan berätta sammanhängande historier. Samtal med dig själv och med andra bidrar till din identitet."
    }
  },
  marcia: {
    label: "Marcias fyra identitetsstatusar",
    start: "Två frågor ger fyra statusar: Har personen utforskat (gått igenom kris)? Har personen bestående engagemang? Klicka på en ruta.",
    svg: `<svg viewBox="0 0 600 360" role="img" aria-label="Fyrfältsfigur över Marcias identitetsstatusar">
      <text x="360" y="18" text-anchor="middle" font-size="14" font-weight="700">Utforskning / kris</text>
      <text x="245" y="44" text-anchor="middle" font-size="13" opacity=".75">Nej</text><text x="475" y="44" text-anchor="middle" font-size="13" opacity=".75">Ja</text>
      <text transform="translate(22 200) rotate(-90)" text-anchor="middle" font-size="14" font-weight="700">Bestående engagemang</text>
      <text x="120" y="130" text-anchor="end" font-size="13" opacity=".75">Ja</text><text x="120" y="268" text-anchor="end" font-size="13" opacity=".75">Nej / vagt</text>
      <g data-k="forutfattad"><rect class="shape" x="130" y="56" width="226" height="136" rx="12"/><text x="243" y="118" text-anchor="middle" font-size="18" font-weight="700">Förutfattad</text><text x="243" y="142" text-anchor="middle" font-size="13" opacity=".8">säker men "lånad"</text></g>
      <g data-k="etablerad"><rect class="shape acc" x="362" y="56" width="226" height="136" rx="12"/><text x="475" y="118" text-anchor="middle" font-size="18" font-weight="700">Etablerad</text><text x="475" y="142" text-anchor="middle" font-size="13" opacity=".8">självvald och klar</text></g>
      <g data-k="forvirring"><rect class="shape" x="130" y="198" width="226" height="136" rx="12"/><text x="243" y="260" text-anchor="middle" font-size="18" font-weight="700">Identitets-</text><text x="243" y="282" text-anchor="middle" font-size="18" font-weight="700">förvirring</text><text x="243" y="304" text-anchor="middle" font-size="13" opacity=".8">diffus, flytande</text></g>
      <g data-k="moratorium"><rect class="shape" x="362" y="198" width="226" height="136" rx="12"/><text x="475" y="262" text-anchor="middle" font-size="18" font-weight="700">Moratorium</text><text x="475" y="286" text-anchor="middle" font-size="13" opacity=".8">söker aktivt</text></g>
    </svg>`,
    info: {
      forutfattad: "<b>Förutfattad identitet:</b> identiteten är inte medvetet vald utan övertagen, till exempel från föräldrarna. Den är säker men \"lånad\". Du har inte själv valt utbildning eller yrke och har inte haft någon stor kris. Du kan ha många engagemang, men du har inte valt dem själv. Brukar förändras senare i livet. <span class='muted'>(s. 176)</span>",
      etablerad: "<b>Etablerad identitet:</b> en klar och konsistent identitet som du själv har format, både inifrån och genom relationer. Du kan se världen från andras perspektiv och har engagemang utifrån egna intressen eller kärlek. <span class='muted'>(s. 177)</span>",
      forvirring: "<b>Identitetsförvirring:</b> en diffus och obestämd identitet. Egentligen mer oklarhet än förvirring, ofta med lite intresse för frågor om vem du är. På engelska: <i>fluid identity</i>. Ingen utforskning av roller och inga bestående engagemang. <span class='muted'>(s. 176)</span>",
      moratorium: "<b>Moratorium:</b> du söker aktivt din identitet och prövar olika alternativ. Kriserna kan ge ångest och förtvivlan. Engagemangen är vaga eller saknas. För många är detta ett steg på vägen mot nästa fas. <span class='muted'>(s. 177)</span>"
    }
  },

/* ---------- Kap 10.2 Anknytning och lek ---------- */
  bowlby: {
    label: "Bowlbys fyra stadier i anknytningsutvecklingen",
    start: "Bowlbys fyra stadier under de första åren. Klicka på ett stadium.",
    svg: timeline([["b1", "0–2 mån", "Signalerar", "behov"], ["b2", "2–7 mån", "Känner igen,", "trygghet"], ["b3", "7 mån–2 år", "Protesterar,", "trygg bas"], ["b4", "2 år –", "Förstår", "andras känslor"]], 150, "födsel", "uppåt"),
    info: {
      b1: "<b>1. 0–2 månader:</b> du kunde signalera dina behov och känslor och reagerade på kontakt och stimulering. Så skapades anpassning och närhet till dem som tog hand om dig.",
      b2: "<b>2. 2–7 månader:</b> samspelet blev starkare eftersom du kände igen vissa människor. Om de upplevdes som pålitliga utvecklades en trygghet hos dig.",
      b3: "<b>3. 7 månader–2 år:</b> du protesterade om dina trygghetspersoner försvann och hade svårt att låta andra trösta dig. Du utforskade omgivningen med den trygga vuxna som en bas.",
      b4: "<b>4. 2 år och uppåt:</b> du började förstå andra människors känslor och behov. Då kunde det sociala samspelet med andra utvecklas vidare."
    }
  },
  strange: {
    label: "The Strange Situation i sju steg",
    start: "Ainsworths observation i sju steg. Klicka på ett steg för att se vad observatören tittar efter.",
    svg: timeline([["t1", "Steg 1", "Lek med", "mamma"], ["t2", "Steg 2", "Främling", "kommer in"], ["t3", "Steg 3", "Mamma", "går ut"], ["t4", "Steg 4", "Mamma in,", "främling ut"], ["t5", "Steg 5", "Barnet", "ensamt"], ["t6", "Steg 6", "Främling", "kommer in"], ["t7", "Steg 7", "Mamma in,", "främling ut"]], 96, "start", "slut"),
    info: {
      t1: "<b>Steg 1:</b> barnet och mamman leker i ett lekrum. Använder barnet mamman som trygg bas och utforskar rummet?",
      t2: "<b>Steg 2:</b> en främling kommer in i rummet. Leker barnet med främlingen?",
      t3: "<b>Steg 3:</b> mamman lämnar rummet. Hur reagerar barnet när mamman går?",
      t4: "<b>Steg 4:</b> mamman kommer tillbaka och främlingen går. Låter sig barnet tröstas lätt av mamman om det varit ledset?",
      t5: "<b>Steg 5:</b> mamman går och barnet är ensamt. Här blir stressen störst.",
      t6: "<b>Steg 6:</b> främlingen kommer in. Låter sig barnet tröstas av främlingen?",
      t7: "<b>Steg 7:</b> mamman kommer tillbaka och främlingen går ut. Hur tar barnet emot mamman den här gången?"
    }
  },
  stilar: {
    label: "Hur vanliga anknytningsstilarna är",
    start: "Andel barn med varje anknytningsstil. Den ljusa delen visar spannet när boken anger ett intervall. Klicka på en stapel.",
    svg: `<svg viewBox="0 0 600 300" role="img" aria-label="Stapeldiagram: A 10 %, B 60–70 %, C 10 %, D 5–10 %">
      <line class="line" x1="50" y1="250" x2="570" y2="250"/>
      <g data-k="A"><rect class="shape acc" x="70" y="221.4" width="90" height="28.6" rx="4"/><text x="115" y="212" text-anchor="middle" font-size="15" font-weight="700">10 %</text><text x="115" y="272" text-anchor="middle" font-size="16" font-weight="700">A</text><text x="115" y="291" text-anchor="middle" font-size="13">Undvikande</text></g>
      <g data-k="B"><rect class="shape" x="200" y="50" width="90" height="28.6" rx="4" opacity=".55"/><rect class="shape acc" x="200" y="78.6" width="90" height="171.4" rx="4"/><text x="245" y="41" text-anchor="middle" font-size="15" font-weight="700">60–70 %</text><text x="245" y="272" text-anchor="middle" font-size="16" font-weight="700">B</text><text x="245" y="291" text-anchor="middle" font-size="13">Trygg</text></g>
      <g data-k="C"><rect class="shape acc" x="330" y="221.4" width="90" height="28.6" rx="4"/><text x="375" y="212" text-anchor="middle" font-size="15" font-weight="700">10 %</text><text x="375" y="272" text-anchor="middle" font-size="16" font-weight="700">C</text><text x="375" y="291" text-anchor="middle" font-size="13">Ambivalent</text></g>
      <g data-k="D"><rect class="shape" x="460" y="221.4" width="90" height="14.3" rx="4" opacity=".55"/><rect class="shape acc" x="460" y="235.7" width="90" height="14.3" rx="4"/><text x="505" y="212" text-anchor="middle" font-size="15" font-weight="700">5–10 %</text><text x="505" y="272" text-anchor="middle" font-size="16" font-weight="700">D</text><text x="505" y="291" text-anchor="middle" font-size="13">Oorganiserad/osäker</text></g>
    </svg>`,
    info: {
      A: "<b>Typ A – undvikande (10 %):</b> barnet stänger av när mamman lämnar rummet, visar ingen stress och bryr sig inte om mamman när hon kommer tillbaka.",
      B: "<b>Typ B – trygg (60–70 %):</b> barnet leker i rummet med mamman som trygg bas, blir ledset när hon går och tröstas lätt när hon kommer tillbaka.",
      C: "<b>Typ C – ambivalent (10 %):</b> barnet blir ledset när mamman går men både vill och inte vill bli tröstat när hon kommer tillbaka. Mamman är ingen trygg bas.",
      D: "<b>Typ D – oorganiserad/osäker (5–10 %):</b> barnet har ingen konsekvent strategi. Ibland är det ledset och lätt att trösta, ibland tvekar det att söka mammans tröst. Stilen lades till av Main och Solomon 1986."
    }
  },
  lek: {
    label: "Lekens och relationernas utveckling",
    start: "Hur leken och relationerna med jämnåriga förändras från 6 månader till 18 år. Klicka på en ruta.",
    svg: timeline([["l1", "6–12 mån", "Le och", "sträcka sig"], ["l2", "1 år", "Sida vid", "sida"], ["l3", "1–2 år", "Övnings-", "lekar"], ["l4", "2–6 år", "Aktions-", "lek"], ["l5", "3–4 år", "Rollek /", "symbollek"], ["l6", "6–12 år", "Regel-", "styrd lek"], ["l7", "12–18 år", "Klickar", ""]], 100, "6 mån", "18 år"),
    info: {
      l1: "<b>6–12 månader:</b> du kunde le mot andra barn och sträcka dig mot dem för att röra vid dem.",
      l2: "<b>Ett år:</b> du kunde dela med dig av leksaker, men relationerna med jämnåriga ledde mest till konflikter. Ni lekte <b>vid sidan om varandra</b> och samspelade inte.",
      l3: "<b>1–2 år – övningslekar:</b> det roliga var att behärska leken, inte att förstå den. Du behövde också lära dig att kontrollera dina impulser, till exempel impulsen att ta andra barns saker.",
      l4: "<b>2–6 år – aktionslekar:</b> de sociala förmågorna utvecklades och du lekte mer i grupp. I början av perioden gick leken från leksaker till aktionslekar, ibland kallade \"vild lek\", som att springa och jaga varandra utan något egentligt mål.",
      l5: "<b>3–4 år – rollekar eller symbollekar:</b> du lekte till exempel doktor eller mamma-pappa-barn. Här formades vänskap, och många ville helst leka med barn av samma kön.",
      l6: "<b>6–12 år – regelstyrd lek:</b> mycket fantasi och rollekar med till exempel Barbie och Lego. Du förstod regler bättre och lekte med formella regler (fotboll) eller informella regler (kurragömma). Vänskap byggde på delade tankar och känslor. Grupphierarkier uppstod: någon blev ledare och någon hamnade utanför, vilket kan ge dåligt självförtroende.",
      l7: "<b>12–18 år – klickar:</b> du är allt mer med vänner. Enligt en studie spenderar ungdomar 29 % av sin vakna tid med kompisar och 13 % med föräldrarna. Man umgås i \"klickar\" med samma intressen, ofta flera olika, och det utvecklar förmågan att umgås med många."
    }
  },

/* ---------- Kap 10.3 Grupper ---------- */
  storlek: {
    label: "Gruppens storlek",
    start: "Hur gruppens storlek påverkar samarbetet. Klicka på en grupp.",
    svg: (() => {
      const groups = [["g2", 2, "2 personer"], ["g3", 3, "3 personer"], ["g5", 5, "4–5 personer"], ["g7", 7, "6–7 eller fler"]];
      return `<svg viewBox="0 0 600 170" role="img" aria-label="Fyra gruppstorlekar">${groups.map(([k, n, lab], i) => {
        const cx = 78 + i * 148, cy = 68, R = n === 2 ? 18 : n === 3 ? 22 : n === 5 ? 30 : 38;
        const dots = Array.from({ length: n }, (_, j) => {
          const a = -Math.PI / 2 + j * 2 * Math.PI / n;
          return `<circle class="shape acc" cx="${(cx + R * Math.cos(a)).toFixed(1)}" cy="${(cy + R * Math.sin(a)).toFixed(1)}" r="11"/>`;
        }).join("");
        return `<g data-k="${k}"><rect class="shape" x="${cx - 66}" y="6" width="132" height="158" rx="12"/>${dots}<text x="${cx}" y="146" text-anchor="middle" font-size="14" font-weight="700">${lab}</text></g>`;
      }).join("")}</svg>`;
    })(),
    info: {
      g2: "<b>Två personer:</b> båda är aktiva, eftersom det inte går att smita undan. Gruppen blir ofta demokratisk och trivsam, särskilt om man själv valt vem man jobbar med. Små uppgifter går bra och snabbt, men stora arbeten blir svåra och det kommer fram få perspektiv.",
      g3: "<b>Tre personer:</b> fler diskussioner, så fler perspektiv kommer fram. Det finns en risk att två av medlemmarna \"hittar varandra\" och samarbetar mer.",
      g5: "<b>Fyra–fem personer:</b> informella samtal går bra, men för att arbetet ska bli klart behövs en mer formell struktur: att alla kommer till tals, vem som antecknar och vem som fördelar ordet. Många perspektiv kommer fram, och gruppen fungerar även om någon är borta.",
      g7: "<b>Sex, sju eller fler:</b> skillnaderna mellan medlemmarna ökar. Den blyga blir tystare och den pratglada tar över. Gruppen behöver tydliga regler, till exempel en mötesledare och handuppräckning. Det finns risk för undergrupper och att arbetet delas upp. Det tar längre tid, men resultatet kan bli bättre."
    }
  },
  firo: {
    label: "FIRO-modellen enligt Will Schultz",
    start: "FIRO: tre faser som gruppen går igenom medurs. Klicka på en del av cirkeln.",
    svg: `<svg viewBox="0 0 600 330" role="img" aria-label="Cirkel med FIROs faser: tillhörighet, rollsökning och samhörighet">
      <g data-k="f2"><path class="shape acc" d="M300,170 L178.8,100 A140,140 0 0 1 390,62.8 Z"/><text x="300" y="98" text-anchor="middle" font-size="15" font-weight="700">2. Rollsökning</text></g>
      <g data-k="idyll"><path class="shape" d="M300,170 L390,62.8 A140,140 0 0 1 421.2,100 Z"/><text x="440" y="70" font-size="12">Idyll</text></g>
      <g data-k="f3"><path class="shape acc" d="M300,170 L421.2,100 A140,140 0 0 1 300,310 Z"/><text x="368" y="218" text-anchor="middle" font-size="15" font-weight="700">3. Samhörighet</text></g>
      <g data-k="f1"><path class="shape acc" d="M300,170 L300,310 A140,140 0 0 1 162.1,145.6 Z"/><text x="236" y="225" text-anchor="middle" font-size="15" font-weight="700">1. Tillhörighet</text></g>
      <g data-k="gemyt"><path class="shape" d="M300,170 L162.1,145.6 A140,140 0 0 1 178.8,100 Z"/><text x="150" y="112" text-anchor="end" font-size="12">Gemyt</text></g>
    </svg>`,
    info: {
      f1: "<b>1. Tillhörandefasen:</b> medlemmarna ser sig ännu inte som en grupp, men de börjar skapa ett sammanhang.",
      f2: "<b>2. Rollsökningsfasen:</b> nu ser medlemmarna sig som en grupp och arbetar för att bestämma roller och status. De mäter sin kompetens mot varandra, och konflikter kan uppstå. Hur länge fasen varar skiljer sig mellan grupper, och vissa grupper lämnar den aldrig, vilket inte är bra för samspelet.",
      f3: "<b>3. Samhörighetsfasen:</b> rollerna är bestämda och gruppen bygger relationer. Om gruppen fungerar väl blir det samarbete och bättre resultat. Alla grupper når inte hit.",
      gemyt: "<b>Gemyt</b> (mellan tillhörighet och rollsökning) är en <b>skenfas</b>. Gruppen är trevlig, skämtar och håller god min, men bara på ytan. Ingen vågar säga vad hen tycker eller ta konflikten om roller, så gruppen undviker rollsökningen. Det känns mysigt men leder ingenstans. <i>(Förklaring: kommer från den svenska FIRO-litteraturen, inte från boken.)</i>",
      idyll: "<b>Idyll</b> (mellan rollsökning och samhörighet) är en <b>skenfas</b>. Lättnaden efter konflikterna gör att gruppen tror att den har nått äkta samhörighet: alla är överens och allt känns perfekt. Egentligen är problemen bara undanstoppade, och det är ännu inte den öppenhet som finns i samhörighetsfasen. <i>(Förklaring: kommer från den svenska FIRO-litteraturen, inte från boken.)</i>"
    }
  },
  tuckman: {
    label: "Tuckmans modell om gruppers processer och samspel",
    start: "Kurvan visar gruppens energi och produktivitet över tid. Klicka på en fas.",
    svg: `<svg viewBox="0 0 600 300" role="img" aria-label="Kurva över Tuckmans fem faser där energin sjunker i storming och stiger i norming och performing">
      <line class="line" x1="50" y1="282" x2="580" y2="282"/><line class="line" x1="50" y1="282" x2="50" y2="20"/>
      <text transform="translate(28 150) rotate(-90)" text-anchor="middle" font-size="12" opacity=".75">Energi och produktivitet</text>
      <text x="575" y="297" text-anchor="end" font-size="12" opacity=".75">Tid →</text>
      <path d="M60,125 C120,120 160,118 200,175 S240,236 262,236 S305,232 330,150 S372,66 420,64 L570,64" fill="none" stroke="var(--accent)" stroke-width="4"/>
      ${[["t1", 62, 92, "1. Forming"], ["t2", 205, 244, "2. Storming"], ["t3", 342, 150, "3. Norming"], ["t4", 380, 28, "4. Performing"], ["t5", 455, 76, "5. Adjourning"]].map(([k, x, y, l]) =>
        `<g data-k="${k}"><rect class="shape" x="${x}" y="${y}" width="${l.length * 8.6 + 14}" height="26" rx="8"/><text x="${x + 7}" y="${y + 18}" font-size="14" font-weight="700">${l}</text></g>`).join("")}
    </svg>`,
    info: {
      t1: "<b>1. Forming:</b> medlemmarna är positiva och därför engagerade, men det är lite förvirrande eftersom samspelet inte är klart än.",
      t2: "<b>2. Storming:</b> alla söker sin plats i gruppen. Osäkerheten från fas ett och sökandet efter en roll kan leda till konflikter. Konflikterna måste lösas för att gruppen ska komma till fas tre. Här är energin som lägst.",
      t3: "<b>3. Norming:</b> gruppen har formats, medlemmarna känner varandra och kan börja samspela. Normer skapas.",
      t4: "<b>4. Performing:</b> gruppen har blivit allt mer sammansvetsad. Fokus kan läggas på samspelet, målet och arbetet för att nå det.",
      t5: "<b>5. Adjourning:</b> i vissa fall upplöses gruppen när målen är nådda och uppgifterna klara."
    }
  },
  sjufas: {
    label: "Sjufasmodellen (Lennéer Axelson och Thylefors)",
    start: "Modellen kombinerar många teorier. Gruppen går runt i sju faser. Klicka på en fas.",
    svg: (() => {
      const names = ["1. Initialfas", "2. Smekmånad", "3. Integration", "4. Konflikt", "5. Platåfas", "6. Mognad", "7. Separation"];
      const cx = 300, cy = 195, rx = 215, ry = 150;
      return `<svg viewBox="0 0 600 390" role="img" aria-label="Cirkel med sju faser"><ellipse class="line" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" stroke-dasharray="6 6"/>
        ${names.map((n, i) => {
          const a = -Math.PI / 2 + i * 2 * Math.PI / 7, x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
          return `<g data-k="p${i + 1}"><rect class="shape ${i === 5 ? "acc" : ""}" x="${(x - 72).toFixed(1)}" y="${(y - 22).toFixed(1)}" width="144" height="44" rx="10"/><text x="${x.toFixed(1)}" y="${(y + 6).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="700">${n}</text></g>`;
        }).join("")}
        <text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="13" opacity=".7">medurs →</text></svg>`;
    })(),
    info: {
      p1: "<b>1. Initialfas:</b> medlemmarna ska lära känna varandra och är osäkra. Det finns inga tydliga normer än, och gruppen är varken sammanhållen eller målmedveten. Alla vill hitta sin plats och en roll och visar sina bästa sidor, men det blir inte mycket samspel eller kommunikation.",
      p2: "<b>2. Smekmånadsfas:</b> medlemmarna tycker att de har hittat den bästa gruppen, \"den rätta\". Stämningen är avslappnad, kommunikationen ökar och blir djupare, och man börjar känna sig trygg. Alla visar sina goda sidor och är nöjda och eniga.",
      p3: "<b>3. Integrationsfas:</b> medlemmarna visar även sina dåliga sidor, så meningsskiljaktigheter kan uppstå. För att slippa konflikter fokuserar gruppen mer på uppgiften än på gruppen. Normer uppstår och rollerna fördelas. Det finns en vi-känsla.",
      p4: "<b>4. Konfliktfas:</b> konflikterna som man undvek tidigare blir nu tydliga. Medlemmarna hanterar dem olika: vissa vill vinna, andra vill tillbaka till smekmånaden. Kanske vill vissa stanna i konflikterna för att slippa arbetet. Mindre grupper kan uppstå.",
      p5: "<b>5. Platåfas:</b> medlemmarna upplever att det står still och känner sig likgiltiga inför arbetet. Gruppen kommer ingenstans och utvecklas inte.",
      p6: "<b>6. Mognadsfas:</b> medlemmarna vågar vara självständiga och respekterar varandra på riktigt. Målen och rollerna är klara och kommunikationen tydlig, så gruppen tar tag i arbetet och strävar mot målen.",
      p7: "<b>7. Separationsfas:</b> ingen grupp varar för alltid. Vissa är tidsbestämda, som ett grupparbete eller en gymnasieklass. Andra upphör vid omorganisation eller nedläggning. Känslor som ångest, ilska, glädje, lättnad eller sorg kan dyka upp."
    }
  },

/* ---------- Kap 10.3 Ledarskap ---------- */
  ledartyper: {
    label: "Ledartyperna A–E",
    start: "Boken visar fem ledartyper utifrån hur mycket ledaren fokuserar på uppgiften och på relationerna. Klicka på en bokstav.",
    svg: `<svg viewBox="0 0 600 320" role="img" aria-label="Diagram med axlarna Uppgiften och Relationerna och ledartyperna A till E">
      <line class="line" x1="70" y1="285" x2="565" y2="285"/><line class="line" x1="70" y1="285" x2="70" y2="20"/>
      <polygon points="70,12 64,24 76,24" fill="currentColor" opacity=".5"/><polygon points="573,285 561,279 561,291" fill="currentColor" opacity=".5"/>
      <text x="80" y="24" font-size="14" font-weight="700">Uppgiften</text><text x="560" y="308" text-anchor="end" font-size="14" font-weight="700">Relationerna</text>
      ${[["A", 170, 80], ["B", 460, 80], ["E", 315, 160], ["C", 170, 230], ["D", 460, 230]].map(([k, x, y]) =>
        `<g data-k="${k}"><circle class="shape acc" cx="${x}" cy="${y}" r="28"/><text x="${x}" y="${y + 8}" text-anchor="middle" font-size="22" font-weight="800">${k}</text></g>`).join("")}
    </svg>`,
    info: {
      A: "<b>A – mycket uppgift, lite relationer:</b> ledaren fokuserar på arbetet och målen. Det motsvarar det uppgiftsorienterade, mer auktoritära ledarskapet. <i>(Min tolkning av figuren. Boken ber dig själv beskriva A–E.)</i>",
      B: "<b>B – mycket uppgift och mycket relationer:</b> ledaren bryr sig både om att målen nås och om att medlemmarna mår bra. <i>(Min tolkning av figuren.)</i>",
      C: "<b>C – lite uppgift och lite relationer:</b> ledaren varken styr arbetet eller bryr sig om relationerna. Det liknar låt-gå-ledaren som är passiv och ointresserad. <i>(Min tolkning av figuren.)</i>",
      D: "<b>D – lite uppgift, mycket relationer:</b> ledaren fokuserar på att medlemmarna ska må bra och ha goda relationer. Det motsvarar det relationsorienterade ledarskapet (mer demokratiskt eller låt-gå). <i>(Min tolkning av figuren.)</i>",
      E: "<b>E – mitt emellan:</b> ledaren balanserar uppgift och relationer på en medelnivå, en kompromiss. <i>(Min tolkning av figuren.)</i>"
    }
  },
  hersey: {
    label: "Situationsanpassat ledarskap (Hersey och Blanchard)",
    start: "Gruppen ska utvecklas från mognadsnivå 1 till 4, och ledaren byter stil efter nivån. Klicka på en ruta.",
    svg: `<svg viewBox="0 0 600 360" role="img" aria-label="Fyrfält med mognadsnivå 1 till 4 och ledarstilarna instruerande, tränande, deltagande och delegerande">
      <line class="line" x1="60" y1="330" x2="590" y2="330"/><line class="line" x1="60" y1="330" x2="60" y2="16"/>
      <text x="70" y="22" font-size="13" font-weight="700">Stödjande beteende ↑</text><text x="588" y="352" text-anchor="end" font-size="13" font-weight="700">Styrande beteende →</text>
      <g data-k="n3"><rect class="shape" x="75" y="36" width="245" height="135" rx="12"/><text x="197" y="86" text-anchor="middle" font-size="13" opacity=".8">Nivå 3 (kan, men vill inte alltid)</text><text x="197" y="116" text-anchor="middle" font-size="19" font-weight="700">Deltagande</text></g>
      <g data-k="n2"><rect class="shape" x="335" y="36" width="245" height="135" rx="12"/><text x="457" y="86" text-anchor="middle" font-size="13" opacity=".8">Nivå 2 (kan lite – vill mycket)</text><text x="457" y="116" text-anchor="middle" font-size="19" font-weight="700">Tränande</text></g>
      <g data-k="n4"><rect class="shape acc" x="75" y="182" width="245" height="135" rx="12"/><text x="197" y="232" text-anchor="middle" font-size="13" opacity=".8">Nivå 4 (kan och vill)</text><text x="197" y="262" text-anchor="middle" font-size="19" font-weight="700">Delegerande</text></g>
      <g data-k="n1"><rect class="shape" x="335" y="182" width="245" height="135" rx="12"/><text x="457" y="232" text-anchor="middle" font-size="13" opacity=".8">Nivå 1 (kan inte)</text><text x="457" y="262" text-anchor="middle" font-size="19" font-weight="700">Instruerande</text></g>
      <text x="457" y="178" text-anchor="middle" font-size="16" opacity=".7">↑</text><text x="327" y="108" text-anchor="middle" font-size="16" opacity=".7">←</text><text x="197" y="178" text-anchor="middle" font-size="16" opacity=".7">↓</text>
    </svg>`,
    info: {
      n1: "<b>Mognadsnivå 1 (kan inte) – instruerande ledarstil:</b> auktoritär och beordrande, med envägskommunikation. Ledaren är övertydlig och ger exakta instruktioner med noggrann uppföljning. Mycket styrning, lite stöd.",
      n2: "<b>Mognadsnivå 2 (kan lite – vill mycket) – tränande ledarstil:</b> mycket förklaring och motivering och hög grad av genomförande. Tvåvägskommunikation. Mycket styrning och mycket stöd.",
      n3: "<b>Mognadsnivå 3 (kan, men vill inte alltid) – deltagande ledarstil:</b> ledaren lockar med medbestämmande och samarbete. Gruppen får känna tillit, och kommunikationen är uppmuntrande. Mycket stöd, mindre styrning.",
      n4: "<b>Mognadsnivå 4 (kan och vill) – delegerande ledarstil:</b> ledaren ger gruppen ansvar för beslut och genomförande. Kommunikationen bygger på gruppens egna intressen och engagemang. Lite styrning och lite stöd behövs."
    }
  },

/* ---------- Kap 11 Tre perspektiv ---------- */
  perspektiv: {
    label: "Tre förklaringar till prosocialt beteende",
    start: "Varför hjälper vi andra? Tre perspektiv ger tre förklaringar. Klicka på ett perspektiv.",
    svg: `<svg viewBox="0 0 600 210" role="img" aria-label="Tre kort: biologiskt, behavioristiskt och kognitivt perspektiv">
      <text x="300" y="22" text-anchor="middle" font-size="16" font-weight="700">Varför hjälper vi andra?</text>
      ${[["bio", 12, "Biologiskt", "Medfött", "Gruppen överlevde"], ["beh", 208, "Behavioristiskt", "Inlärt", "Förstärkning, förebilder"], ["kog", 404, "Kognitivt", "Tankar", "Självschema, dissonans"]].map(([k, x, t, a, b]) =>
        `<g data-k="${k}"><rect class="shape acc" x="${x}" y="40" width="184" height="160" rx="14"/><text x="${x + 92}" y="90" text-anchor="middle" font-size="18" font-weight="800">${t}</text><text x="${x + 92}" y="128" text-anchor="middle" font-size="15" font-weight="700">${a}</text><text x="${x + 92}" y="158" text-anchor="middle" font-size="13" opacity=".8">${b}</text></g>`).join("")}
    </svg>`,
    info: {
      bio: "<b>Biologiskt perspektiv (evolutionspsykologi):</b> prosocialt beteende är medfött och nedärvt. Att hjälpa andra gjorde att gruppen överlevde. Även empatin är nedärvd, och hjälpsamheten finns alltså i generna. <span class='muted'>(s. 198)</span>",
      beh: "<b>Behavioristiskt perspektiv (inlärning):</b> prosocialt beteende beror på uppväxten och inlärningen. När omgivningen uppskattar att du är empatisk och hjälpsam förstärks beteendet. Stöds av Beamas experiment. Social inlärningsteori och behovet av att passa in i innegrupper hör också hit. <span class='muted'>(s. 199–200)</span>",
      kog: "<b>Kognitivt perspektiv (tankar):</b> du hjälper för att det stärker en positiv bild av dig själv (ditt självschema), och för att slippa kognitiv dissonans mellan dina värderingar och det du gör (Festinger 1957). <span class='muted'>(s. 199–200)</span>"
    }
  }
},

/* ================= STUDIER ================= */
studies: {
  kidwell: {
    ch: "identitet", sec: "erikson", who: "Jennie Kidwell", year: "1995", tag: "Stödjer Erikson",
    syfte: "Undersöka om ungdomar går igenom en identitetskris.",
    fp: "82 studenter, 14–17 år.",
    metod: "Personlighetstest och en strukturerad jag-identitetsintervju (med frågor som Marcia tagit fram).",
    resultat: "Att utforska olika identiteter var en del av identitetskrisen. De som inte upplevde att de hade en fast identitet hade svagare jaguppfattning, kände sig mer förvirrade och olyckliga och hade mer psykisk ohälsa.",
    slutsats: "Studien verkar bekräfta Eriksons femte fas.",
    src: "\"Adolescence\" · bok s. 175",
    crit: "<b>Styrkor:</b> en strukturerad intervju ger djupa svar, och alla får samma frågor.<br><b>Svagheter:</b> bara 82 personer, så det är svårt att generalisera. Svaren bygger på vad ungdomarna själva säger. Studien visar ett samband men inte vad som orsakar vad: mår man sämre för att man saknar fast identitet, eller tvärtom?"
  },
  rutter: {
    ch: "identitet", sec: "erikson", who: "Mikael Rutter m.fl.", year: "1976", tag: "Talar emot Erikson",
    syfte: "Undersöka om ungdomar går igenom en identitetskris.",
    fp: "2 030 studenter, 14–15 år.",
    metod: "Enkät och intervju med lärare och föräldrar.",
    resultat: "Lärare och föräldrar ansåg att bara ett fåtal av eleverna eller barnen gick igenom en identitetskris.",
    slutsats: "Inte alla tonåringar går igenom en identitetskris.",
    src: "\"The Journal of Child Psychology and Psychiatry\" · bok s. 175",
    crit: "<b>Styrkor:</b> mycket stort urval (2 030 personer).<br><b>Svagheter:</b> man frågade lärare och föräldrar, inte ungdomarna själva. En identitetskris sker inombords och syns kanske inte för vuxna. Bara 14–15-åringar fanns med, medan Eriksons femte fas gäller 13–19 år. Studien är från 1976, så ungdomars liv kan ha förändrats sedan dess."
  },
  klimstra: {
    ch: "identitet", sec: "marcia", who: "Theo Klimstra", year: "2010", tag: "Stödjer Marcia",
    syfte: "Undersöka hur identitet formas, och om Eriksons och Marcias teorier stämmer.",
    fp: "1 313 ungdomar, 12–16 år.",
    metod: "Identitetstest och enkät.",
    resultat: "Ju äldre försökspersonerna var, desto fler roller hade de testat. Engagemanget ökade med åldern.",
    slutsats: "Marcias teori om att testa roller och hitta engagemang (intressen i livet) verkar stämma för ungdomar i 12–16-årsåldern.",
    src: "\"Journal of Youth Adolescence\" · bok s. 177",
    crit: "<b>Styrkor:</b> stort urval (1 313 personer) och ett tydligt syfte.<br><b>Svagheter:</b> bara 12–16 år, så vi vet inte hur det ser ut för äldre tonåringar. Test och enkät bygger på vad ungdomarna själva svarar. Resultatet visar att utforskning och engagemang ökar med åldern, men inte hur de fyra statusarna följer på varandra."
  },
  ainsworth: {
    ch: "anknytning", sec: "ainsworth", who: "Mary Ainsworth", year: "1958 och 1971", tag: "Bygger vidare på Bowlby",
    syfte: "Observera barn och deras mammor för att se om barnet har en god anknytning till sin mamma.",
    fp: "Uganda 1958: 28 mammor och deras barn, observerade i nio månader. USA 1971: 26 familjer.",
    metod: "Observation. Ainsworths observationsmanual <i>The Strange Situation</i> har sju steg där mamman och en främling går in och ut ur ett lekrum.",
    resultat: "Barnen visade olika anknytningsstilar. Ainsworth beskrev tre: undvikande (A), trygg (B) och ambivalent (C). Mary Main och Judith Solomon lade 1986 till en fjärde: oorganiserad/osäker (D).",
    slutsats: "Metoden används i dag i hela världen för att ta reda på barns anknytning till sina närstående.",
    src: "Bok s. 179–181",
    crit: "<b>Styrkor:</b> man observerar hur barnen faktiskt beter sig i stället för att fråga dem. Alla barn går igenom samma sju steg, så det går att jämföra, och metoden används över hela världen.<br><b>Svagheter:</b> små urval (28 och 26 familjer). Bara mammor var med, inte pappor eller andra vuxna. Lekrummet är en konstgjord situation, så barnet kan bete sig annorlunda hemma. Det kan finnas kulturskillnader mellan Uganda och USA.<br><b>Etik:</b> man utsätter små barn för stress med flit när mamman går och barnet lämnas ensamt. Det är boken som ber dig fundera på det."
  },
  hazan: {
    ch: "anknytning", sec: "hazan", who: "Cindy Hazan och Phillip Shaver", year: "1987", tag: "Barndom → vuxenliv",
    syfte: "Påverkar barndomens anknytningsstil den mest romantiska relationen i vuxenlivet?",
    fp: "620 personer (205 män och 415 kvinnor), medelålder 36 år, 91 % heterosexuella.",
    metod: "Enkät. Forskarna satte in en \"kärleksenkät\" i en tidning som läsarna fick svara på och skicka in. Den hade frågor om barndomen (upplevd anknytning till föräldrarna) och om den mest romantiska kärleksrelationen som vuxen.",
    resultat: "56 % ansåg sig ha haft en trygg anknytning: de hade lätt att vara nära andra, litade på sin partner, var inte rädda att bli övergivna och hade lägst andel skilsmässor. 20 % upplevde en ambivalent anknytning: de var rädda att bli avvisade, såg relationen som instabil och var svartsjuka. 24 % hade en undvikande anknytning: de hade svårt att vara nära andra, och relationen saknade närhet och tillit.",
    slutsats: "Det fanns ett samband mellan barndomens anknytningsstil och kvaliteten på vuxenrelationerna.",
    src: "\"Journal of Personality and Social Psychology\" · bok s. 182",
    crit: "<b>Styrkor:</b> stort urval (620 personer) och tydliga resultat i procent.<br><b>Svagheter:</b> det är de vuxna själva som minns sin barndom, och minnen kan vara felaktiga eller färgade av hur de mår i dag. Bara tidningens läsare som själva ville svara var med, så urvalet är inte slumpmässigt. Det var dubbelt så många kvinnor som män, och 91 % var heterosexuella. Studien visar ett samband men inte att barndomen orsakar hur vuxenrelationen blir."
  },
  tafvelin: {
    ch: "ledarskap", sec: "tafvelin", who: "Susanne Tafvelin m.fl.", year: "2022", tag: "Dagens forskning",
    syfte: "Undersöka vilken ledarskapsstil som fungerar bäst och leder både till välbefinnande och god prestation.",
    fp: "En stor mängd, eftersom det är en metastudie.",
    metod: "Metastudie: forskarna samlade in 30 studier (21 från Norden) som gjorts 2015–2020 och gjorde en översikt. 10 av studierna var experiment, resten var kvantitativa enkäter och intervjuer.",
    resultat: "Det ledarskap som fungerade bäst kallade forskarna det <b>transformerande ledarskapet</b> (boken skriver \"transformerade\"). Ledaren ska 1) vara en förebild som lever som hen lär och går att lita på, 2) ha en positiv framtidsvision som skapar mening och motivation, 3) stimulera nya idéer genom att ge förutsättningar och handlingsutrymme, och 4) visa omtanke genom att lyssna och coacha. Om ledaren är destruktiv, till exempel aggressiv (direkt eller indirekt), hotar eller kränker, mår medarbetarna dåligt. Indirekt aggression kan vara att dra sig undan och inte finnas där för medarbetarna.",
    slutsats: "Ett gott ledarskap kan leda till att medarbetarna mår bra i arbetsgrupper och presterar bättre.",
    src: "Myndigheten för arbetsmiljökunskap · bok s. 193–194",
    crit: "<b>Styrkor:</b> en metastudie väger ihop många studier (30 stycken), så underlaget blir stort. Den innehåller både experiment och enkäter, studierna är nya (2015–2020) och många är från Norden, så resultatet passar bra för svenska arbetsplatser.<br><b>Svagheter:</b> en metastudie blir aldrig bättre än studierna den bygger på. De flesta var enkäter och intervjuer där medarbetarna själva bedömde sin chef och sitt mående. Fokus på Norden gör det svårare att generalisera till andra kulturer."
  },
  beama: {
    ch: "perspektiv", sec: "inlart", who: "Arthur Beama m.fl.", year: "1978", tag: "Stödjer inlärning",
    syfte: "Undersöka om vi kan lära människor att bli hjälpsamma.",
    fp: "En grupp studenter.",
    metod: "Experiment. Studenterna fick se en film om prosocialt beteende. Två veckor senare utsattes de för en fejkad olycka som de trodde var på riktigt. Studenterna som sett filmen och en kontrollgrupp som inte sett den observerades när de passerade olyckan.",
    resultat: "De som sett filmen om prosocialt beteende hjälpte till mer (43 %) än de som inte sett den (25 %).",
    slutsats: "Att prosocialt beteende är inlärt får stöd av studien.",
    src: "\"Personality and Social Psychology Bulletin\" · bok s. 199",
    crit: "<b>Styrkor:</b> ett experiment med kontrollgrupp kan visa orsak och verkan, alltså att filmen gjorde skillnad. Olyckan kändes verklig, så studenterna betedde sig troligen naturligt.<br><b>Svagheter:</b> bara studenter var med, så det är svårt att generalisera. Det är oklart hur många som deltog. Även bland dem som sett filmen hjälpte mer än hälften inte till. Effekten mättes bara vid ett tillfälle, två veckor senare.<br><b>Etik:</b> deltagarna blev lurade med en fejkad olycka, vilket kan vara obehagligt."
  }
},

/* ================= KAPITEL ================= */
chapters: [
{
  id: "identitet", ready: true, short: "Identitet",
  label: "Kap 10.1 · s. 171–178",
  title: "Vem är du? Identitet och självbild",
  desc: "Personlig och social identitet, Sterns fem stadier, Eriksons femte fas, Marcias fyra identitetsstatusar samt självbild, självkänsla och självförtroende.",
  sections: [
    {
      id: "vad", title: "Vad är identitet?",
      why: "Här börjar kapitlet. Provet frågar ofta efter skillnaden mellan personlig och social identitet.",
      src: "Bok s. 171–172 · PPT kap 10, bild 5–6",
      html: `
        <p>När du beskriver dig själv med egenskaper, tankar och värderingar handlar det om det som psykologin kallar <b>identitet</b>.</p>
        <div class="def"><b>Identitet</b>Din bild av vem du är, att vara medveten om dig själv som en unik person. Kan också beskrivas som en stabil och tillförlitlig bild av vem vi är.<cite>NE · Alex Popov m.fl. "Psychology"</cite></div>
        <p>Identiteten består av många delar: dina egenskaper (personlighet), dina fritidsintressen, du i relation till familj och vänner, din könsidentitet, din kulturella identitet och de roller du har i livet, till exempel elev, yrke eller uppdrag.</p>
        [[fig:idkarta]]
        <h3>Personlig och social identitet</h3>
        <div class="tablewrap"><table>
          <tr><th></th><th>Personlig identitet</th><th>Social identitet</th></tr>
          <tr><th>Vad det är</th><td>Din unika identitet som skiljer dig från andra.</td><td>Din känsla av vem du är utifrån att du identifierar dig med föräldrar och jämnåriga (Schaffer, 2006).</td></tr>
          <tr><th>Bygger på</th><td><b>Kontinuitet:</b> en stabil självkänsla. Du kan beskriva dig själv och dina egenskaper på ett korrekt sätt utifrån dina minnen, behov och känslor, både nu och tidigare.</td><td>Att du är medlem i grupper där du är förankrad, till exempel familjen. Din ställning i grupperna och vilken funktion du har där.</td></tr>
          <tr><th>Syns genom</th><td>Hur du beskriver dig själv inifrån.</td><td>Attribut som markerar gruppen, till exempel klädstil och frisyr.</td></tr>
        </table></div>
        <div class="note">Exempel: "Jag är envis och älskar att rita" är personlig identitet. "Jag är målvakt i laget och storasyster hemma" är social identitet.</div>
        <h3>Identitet som juridiskt begrepp</h3>
        <p>Identitet finns också i <b>barnkonventionen</b>. Alla barn har rätt</p>
        <ol><li>till sin identitet</li><li>till ett namn</li><li>till en nationalitet</li><li>att veta vem som är ens föräldrar och leva med dem om det går</li><li>att bli registrerade när de föds.</li></ol>
        <p class="task">Skriv ned några påståenden om vem du är. Vilka hör till din personliga identitet och vilka till din sociala?</p>`,
      check: [
        { q: "Vad menas med att den personliga identiteten bygger på kontinuitet?", a: "Att du upplever dig själv som samma person över tid. Du har en stabil självkänsla och kan beskriva dig själv korrekt utifrån dina minnen, behov och känslor." },
        { q: "Hur markerar man ofta sin sociala identitet enligt boken?", a: "Med attribut som klädstil och frisyr." },
        { q: "Nämn tre rättigheter i barnkonventionen som har med identitet att göra.", a: "Rätt till sin identitet, till ett namn, till en nationalitet, att veta vilka föräldrarna är och leva med dem om det går, och att registreras vid födseln (tre av dessa)." }
      ]
    },
    {
      id: "stern", title: "Hur formas identiteten? Daniel Stern",
      why: "Stern visar att jaget börjar byggas redan när vi är spädbarn, långt innan vi kan prata.",
      src: "Bok s. 172–174 · PPT kap 10, bild 7",
      html: `
        <p>Den juridiska identiteten får du när du föds. Vissa delar av identiteten är <b>medfödda</b>, till exempel din biologiska könsidentitet och din etnicitet. Andra delar formas i <b>mötet med omvärlden</b>. Både din personliga och din sociala identitet börjar formas tidigt och hänger ihop med att du utvecklar ett "jag".</p>
        <div class="def"><b>Identitetsutveckling</b>En process där ditt sätt att uppfatta dig själv blir etablerat och du får en säker självuppfattning.<cite>Henry Egidius, "Psykologiguiden"</cite></div>
        <p><b>Daniel Stern</b> var en amerikansk psykoanalytiker som forskade på spädbarn. Han gjorde olika experiment, bland annat om hur barn styr blicken för att söka kontakt, och beskrev hur jaget växer fram under de fyra första åren.</p>
        [[fig:stern]]
        <div class="tablewrap"><table>
          <tr><th>Ålder</th><th>Stadium</th><th>Det viktigaste</th></tr>
          <tr><td>0–2 mån</td><td>Inget sammanhållet själv</td><td>Känner igen mammas röst och föräldrarnas ansikten, gillar rutiner</td></tr>
          <tr><td>2–6 mån</td><td>Kärnsjälvet</td><td>Medveten ögonkontakt, första sociala leendet</td></tr>
          <tr><td>7–15 mån</td><td>Det subjektiva självet</td><td>Anknytning, samspel och växelspel med föräldrarna</td></tr>
          <tr><td>16 mån–3 år</td><td>Det verbala självet</td><td>Språk, symbollekar, säger sitt namn, känner igen spegelbilden</td></tr>
          <tr><td>4 år och framåt</td><td>Det berättande självet</td><td>Berättar sammanhängande historier, samtal formar identiteten</td></tr>
        </table></div>
        <div class="note">Minnesregel för ordningen: <b>K-S-V-B</b>, alltså kärn, subjektiv, verbal, berättande. Barnet <i>känner</i>, <i>knyter an</i>, <i>pratar</i> och till sist <i>berättar</i>.</div>
        <h3>Skolåldern</h3>
        <p>När du börjar skolan blir vännerna allt viktigare. Du jämför dig med andra i klassen och på skolan, och både din personliga och din sociala identitet fortsätter att växa. Många psykologer ser tonåren som en särskilt viktig tid. Två som har studerat den är Erik H. Erikson och James Marcia.</p>`,
      check: [
        { q: "I vilket stadium börjar barnet känna igen sin spegelbild?", a: "I det verbala självet (16 månader–3 år)." },
        { q: "Varför kallas stadiet från fyra år för det berättande självet?", a: "För att tal och minne har utvecklats så mycket att barnet kan berätta sammanhängande historier. Samtal med sig själv och andra bidrar till identiteten." },
        { q: "Vilka delar av identiteten är medfödda enligt boken?", a: "Till exempel den biologiska könsidentiteten och etniciteten." }
      ]
    },
    {
      id: "erikson", title: "Tonåren: Eriksons femte fas",
      why: "Erikson är den klassiska teorin om tonårens identitetskris. Boken visar studier både för och emot.",
      src: "Bok s. 174–175 · PPT kap 10, bild 8",
      html: `
        <p><b>Erik H. Erikson</b> var en tysk-amerikansk psykolog. Hans teori om <b>psykosocial utveckling</b> beskriver hur vi utvecklas genom hela livet med hjälp av viktiga människor omkring oss och genom att gå igenom <b>kriser</b>.</p>
        <p>Enligt Erikson är det framför allt i den <b>femte fasen (13–19 år)</b> som identiteten blir fast och konsistent. Krisen i den fasen kallas <b>identitet eller rollförvirring</b>. Då är det viktigt att testa och utforska många olika identiteter.</p>
        <p>Erikson såg själv den här identitetskrisen när han observerade ungdomar i två olika ursprungsfolk (boken skriver "indianstammar") i USA. Jennie Kidwell ville ta reda på om teorin stämde.</p>
        [[study:kidwell]]
        <p>Kidwells studie verkar bekräfta Eriksons femte fas. Mikael Rutter kom fram till något annat.</p>
        [[study:rutter]]
        <p>Rutters studie visar att <b>inte alla tonåringar</b> går igenom en identitetskris.</p>
        <h3>Kritik mot Erikson</h3>
        <p>Det finns få studier som stödjer Eriksons utvecklingsteori. Den har också fått kritik för sina <b>fasta faser</b> och sin <b>strikta åldersindelning</b>.</p>
        <div class="note"><b>Så värderar du en studie.</b> Fråga dig:<br>
          1. <b>Urval:</b> hur många var med, hur gamla, och varifrån? Kan man generalisera till alla?<br>
          2. <b>Metod:</b> experiment, enkät, intervju eller observation? Vem svarade, personen själv eller någon annan?<br>
          3. <b>Tid:</b> när gjordes studien? Kan det ha förändrats sedan dess?<br>
          4. <b>Samband eller orsak:</b> visar studien att A orsakar B, eller bara att de hänger ihop?<br>
          5. <b>Etik:</b> fick deltagarna veta vad det handlade om? Kunde någon ta skada?<br>
          <i>Boken hänvisar till sitt avsnitt 1.5 Kritiskt tänkande. Det avsnittet har jag inte fått, så de här frågorna är mina egna.</i></div>
        <p class="task">Hur har din femte fas varit? Har du testat olika roller? Har du känt rollförvirring?</p>
        <p><a class="train" href="#/k/identitet/modeller/erikson">Träna på Eriksons femte fas →</a></p>`,
      check: [
        { q: "Vilken ålder gäller Eriksons femte fas, och vad heter krisen?", a: "13–19 år. Krisen heter identitet eller rollförvirring." },
        { q: "Varför kan Rutter ha kommit fram till något annat än Kidwell?", a: "Rutter frågade lärare och föräldrar, inte ungdomarna själva. En identitetskris sker inombords och syns kanske inte för vuxna. Hans urval var också bara 14–15 år. (Egen slutsats, inte från boken.)" },
        { q: "Vilken kritik har Eriksons teori fått enligt boken?", a: "Få studier stödjer den, och den kritiseras för sina fasta faser och den strikta åldersindelningen." }
      ]
    },
    {
      id: "marcia", title: "Marcias fyra identitetsstatusar",
      why: "Marcia gör Eriksons femte fas mätbar. På provet ska du kunna beskriva statusarna och känna igen dem i exempel.",
      src: "Bok s. 176–178 · PPT kap 10, bild 9",
      html: `
        <p><b>James Marcia</b> var en amerikansk utvecklingspsykolog som byggde vidare på Eriksons femte fas. Han kom fram till att identitetsförvirringen kan vara en svår process för en del ungdomar och tog fram en <b>intervjumetod för att mäta identitet</b>.</p>
        <p>Tre saker är centrala hos Marcia: <b>kris</b>, <b>utforskning</b> (att testa olika identiteter) och att hitta <b>bestående engagemang</b> i livet, till exempel att vara aktiv i en förening eller spela ett instrument. Han beskrev fyra <b>identitetsstatusar</b>. De kommer <b>inte i en bestämd ordning</b> och är <b>inte bestående</b>.</p>
        [[fig:marcia]]
        <div class="tablewrap"><table>
          <tr><th>Status</th><th>Utforskning / kris</th><th>Engagemang</th><th>Kännetecken</th></tr>
          <tr><td><b>Förutfattad identitet</b></td><td>Nej, ingen stor kris</td><td>Ja, men inte självvalda</td><td>Övertagen från föräldrarna, säker men "lånad"</td></tr>
          <tr><td><b>Identitetsförvirring</b></td><td>Nej</td><td>Nej</td><td>Diffus och obestämd (<i>fluid identity</i>)</td></tr>
          <tr><td><b>Moratorium</b></td><td>Ja, mitt i kriser</td><td>Vaga eller inga</td><td>Söker aktivt, kan ge ångest och förtvivlan</td></tr>
          <tr><td><b>Etablerad identitet</b></td><td>Ja, har utforskat</td><td>Ja, självvalda</td><td>Klar och konsistent, kan se andras perspektiv</td></tr>
        </table></div>
        <div class="note">Fyrfältsfiguren är mitt sätt att visa bokens text. Ställ två frågor om personen: Har hen utforskat? Har hen bestående engagemang? Svaren ger statusen.</div>
        [[study:klimstra]]
        <p>Klimstras studie visar att det Marcia beskriver, att testa roller och hitta engagemang, verkar vara något som ungdomar i 12–16 års ålder håller på med. Andra studier har visat att ungdomar med <b>etablerad identitet</b> har fler engagemang, till exempel i organisationer, och högre självförtroende än de som fortfarande testar olika roller.</p>
        <p class="task">Vilken av Marcias statusar är du i nu? Har du varit i någon av de andra? Känner du igen statusarna hos vänner eller i filmer?</p>`,
      check: [
        { q: "Vad är skillnaden mellan moratorium och identitetsförvirring?", a: "I båda saknas fasta engagemang. I moratorium söker man aktivt och går igenom kriser. Vid identitetsförvirring utforskar man inte alls och har ofta lite intresse för frågan om vem man är." },
        { q: "Sara har alltid vetat att hon ska ta över familjens restaurang. Hon har aldrig funderat på något annat. Vilken status?", a: "Förutfattad identitet. Den är säker men övertagen från familjen, utan egen utforskning." },
        { q: "Följer statusarna alltid på varandra i samma ordning?", a: "Nej. Enligt Marcia kommer de inte i en bestämd ordning och är inte bestående." }
      ]
    },
    {
      id: "livet", title: "Identiteten genom livet",
      why: "Identiteten blir aldrig helt färdig. Nya kriser kan komma i vuxenlivet och på äldre dagar.",
      src: "Bok s. 178",
      html: `
        <p>Samtidigt som du går igenom din identitetskris kan dina föräldrar vara i en <b>mitt i livet-kris</b>. De blir äldre och undrar kanske om de fortfarande är attraktiva och om de har gjort rätt val i livet. Några börjar med en ny idrott eller köper motorcykel eller sportbil. Även deras identitet kan ifrågasättas.</p>
        <p>Som vuxen formas identiteten till stor del av <b>arbetet</b>, som enligt forskarna är en av de viktigaste utvecklingsuppgifterna för en vuxen. I Sverige är det vanligt att man presenterar sig med namn och yrke.</p>
        <p>När man går i pension kan en ny kris komma, en <b>pensionärskris</b>. Vem är jag om jag inte går till jobbet varje dag? Man kan känna sig värdelös och utan uppgift och tappa självförtroendet, så identiteten ifrågasätts igen.</p>
        <div class="tablewrap"><table>
          <tr><th>Livsskede</th><th>Identitetsfråga</th></tr>
          <tr><td>Tonåren</td><td>Identitet eller rollförvirring (Erikson), Marcias statusar</td></tr>
          <tr><td>Vuxen</td><td>Arbetet formar identiteten</td></tr>
          <tr><td>Mitt i livet</td><td>Mitt i livet-kris: har jag gjort rätt val?</td></tr>
          <tr><td>Pension</td><td>Pensionärskris: vem är jag utan arbetet?</td></tr>
        </table></div>`,
      check: [
        { q: "Vad är en pensionärskris?", a: "När arbetet tar slut kan man känna sig värdelös och utan uppgift och tappa självförtroendet. Identiteten ifrågasätts igen." },
        { q: "Varför är arbetet viktigt för vuxnas identitet enligt boken?", a: "Arbetet är en av de viktigaste utvecklingsuppgifterna för en vuxen och formar identiteten. I Sverige presenterar man sig ofta med namn och yrke." }
      ]
    },
    {
      id: "sjalvbild", title: "Självbild, självinsikt, självkänsla och självförtroende",
      why: "Fyra begrepp som lätt blandas ihop. De står på \"Att kunna\"-listan och i lärarens PowerPoint.",
      src: "PPT kap 10, bild 10–13 · \"Att kunna till provet\"",
      html: `
        <div class="warn">⚠ Det här avsnittet bygger på lärarens PowerPoint. Jag hittade det inte på bokens sidor 171–194.</div>
        <h3>Självbild</h3>
        <p>Självbilden är kanske den viktigaste delen av ditt själv och din identitet. Det är <b>den bild du har av dig själv</b>, ungefär som när du ser dig själv i ett skyltfönster. Bilden är helt <b>subjektiv</b>, och man kan ha flera självbilder.</p>
        <p>Självbilden skapas i <b>samspelet med omgivningen</b>. Människorna omkring dig håller upp <b>speglar</b> som visar dig olika bilder av vem du är, och självbilden blir en sammanslagning av alla bilderna, både positiva och negativa.</p>
        <ul>
          <li>Ett barn som möts av <b>villkorslös kärlek</b> ser sig själv som någon som är värd att älskas. Det ger en god grund för en stark och positiv självbild.</li>
          <li>Ett barn som hela tiden möts av suckar, ointresse eller negativa kommentarer får lättare en negativ självbild.</li>
          <li>Det är inte bara familjen som håller upp speglar. Kompisar, lärare, grannar, släktingar, främlingar och media gör det också, och du gör samma sak för dem.</li>
        </ul>
        <div class="def"><b>Kongruens</b>Överensstämmelse mellan självbilden och den du faktiskt är. Vissa har hög kongruens, andra låg.<cite>PPT kap 10, bild 10</cite></div>
        <h3>Självinsikt</h3>
        <p>Att ha <b>självinsikt</b> är att känna sig själv väl. Det är bra för den egna psykiska hälsan. Den som arbetar med andras hälsa behöver god självinsikt: för att kunna hantera andras ångest, oro eller nedstämdhet måste man veta att man klarar sina egna känslor.</p>
        <h3>Självkänsla och självförtroende</h3>
        <div class="tablewrap"><table>
          <tr><th></th><th>Självkänsla</th><th>Självförtroende</th></tr>
          <tr><th>Handlar om</th><td>Hur du <b>värderar dig själv</b>, alltså vem du är</td><td>Hur mycket du litar på din <b>förmåga</b>, alltså vad du klarar</td></tr>
          <tr><th>Starkt</th><td>Du är nöjd med dig själv och duger som du är</td><td>Du känner dig säker och vågar mer, vilket stärker självförtroendet ännu mer</td></tr>
          <tr><th>Svagt</th><td>Du ser ner på dig själv och tycker inte att du duger</td><td>Du tvivlar på att du klarar saker</td></tr>
        </table></div>
        <div class="note">Man kan ha bra självförtroende men dålig självkänsla. Du kan veta att du är bäst i laget på fotboll men ändå inte känna att du duger som människa.</div>`,
      check: [
        { q: "Hur skapas självbilden enligt PowerPointen?", a: "I samspel med omgivningen. Människor runt dig håller upp speglar, och självbilden blir en sammanslagning av alla bilder, både positiva och negativa." },
        { q: "Vad är skillnaden mellan självkänsla och självförtroende?", a: "Självkänsla handlar om hur du värderar dig själv, om du duger som du är. Självförtroende handlar om tilltro till din förmåga, om vad du klarar av." },
        { q: "Vad betyder hög kongruens?", a: "Att självbilden stämmer väl överens med hur du faktiskt är." }
      ]
    }
  ],

  terms: [
    { t: "Identitet", d: "Din bild av vem du är, att vara medveten om dig själv som en unik person. Popov m.fl.: en stabil och tillförlitlig bild av vem vi är.", src: "s. 171" },
    { t: "Personlig identitet", d: "Din unika identitet som skiljer dig från andra. Bygger på kontinuitet: en stabil självkänsla, och att du kan beskriva dig själv utifrån dina minnen, behov och känslor.", src: "s. 172" },
    { t: "Social identitet", d: "Din känsla av vem du är utifrån att du identifierar dig med föräldrar och jämnåriga (Schaffer, 2006). Handlar om din ställning och funktion i grupper. Markeras ofta med klädstil och frisyr.", src: "s. 172" },
    { t: "Identitet enligt barnkonventionen", d: "Alla barn har rätt till sin identitet, ett namn, en nationalitet, att veta vilka föräldrarna är och leva med dem om det går, och att registreras när de föds.", src: "s. 172" },
    { t: "Identitetsutveckling", d: "En process där ditt sätt att uppfatta dig själv blir etablerat och du får en säker självuppfattning (Egidius).", src: "s. 172" },
    { t: "Daniel Stern", d: "Amerikansk psykoanalytiker som forskade på spädbarn. Beskrev hur jaget växer fram under de fyra första åren, bland annat genom att studera hur barn styr blicken för att söka kontakt.", src: "s. 172–173" },
    { t: "Kärnsjälvet", d: "Sterns stadium 2–6 månader: medveten ögonkontakt och första sociala leendet. Byggs av intryck, enkla minnesbilder, egna känslor och rörelser.", src: "s. 173" },
    { t: "Det subjektiva självet", d: "Sterns stadium 7–15 månader: barnet knyter an till den som tar hand om det och uppfattar samspelet. Växelspel med föräldrarna.", src: "s. 173" },
    { t: "Det verbala självet", d: "Sterns stadium 16 månader–3 år: språket gör att barnet kan hantera sig själv. Symbollekar, säger sitt namn och känner igen sin spegelbild.", src: "s. 173" },
    { t: "Det berättande självet", d: "Sterns stadium från 4 år: tal och minne gör att barnet kan berätta sammanhängande historier. Samtal formar identiteten.", src: "s. 174" },
    { t: "Erik H. Erikson", d: "Tysk-amerikansk psykolog. Teorin om psykosocial utveckling: vi utvecklas genom livet med hjälp av viktiga andra och genom kriser.", src: "s. 174" },
    { t: "Psykosocial utveckling", d: "Eriksons teori om att vi utvecklas i faser genom hela livet, i samspel med viktiga andra och genom att gå igenom kriser.", src: "s. 174" },
    { t: "Identitet eller rollförvirring", d: "Krisen i Eriksons femte fas (13–19 år). Den unga testar och utforskar olika identiteter för att nå en fast och konsistent identitet.", src: "s. 174" },
    { t: "James Marcia", d: "Amerikansk utvecklingspsykolog som byggde vidare på Eriksons femte fas. Tog fram en intervjumetod för att mäta identitet och beskrev fyra identitetsstatusar.", src: "s. 176" },
    { t: "Identitetsstatus", d: "Marcias fyra lägen: förutfattad identitet, identitetsförvirring, moratorium och etablerad identitet. De kommer inte i bestämd ordning och är inte bestående.", src: "s. 176" },
    { t: "Engagemang (Marcia)", d: "Ett bestående åtagande i livet, till exempel att vara aktiv i en förening eller spela ett instrument. Centralt hos Marcia tillsammans med kris och utforskning.", src: "s. 176" },
    { t: "Förutfattad identitet", d: "En säker men \"lånad\" identitet som tagits över från till exempel föräldrarna utan egen reflektion. Ingen stor kris, och engagemangen är inte självvalda. Brukar förändras senare i livet.", src: "s. 176" },
    { t: "Identitetsförvirring", d: "En diffus och obestämd identitet (fluid identity). Ingen utforskning av roller och inga bestående engagemang.", src: "s. 176" },
    { t: "Moratorium", d: "Man söker aktivt sin identitet och prövar alternativ. Kriser kan ge ångest och förtvivlan. Engagemangen är vaga eller saknas. Ofta ett steg mot nästa fas.", src: "s. 177" },
    { t: "Etablerad identitet", d: "En klar och konsistent identitet som man själv har format, inifrån och genom relationer. Man kan se andras perspektiv och har engagemang utifrån egna intressen.", src: "s. 177" },
    { t: "Mitt i livet-kris", d: "När föräldragenerationen blir äldre kan de ifrågasätta sin identitet: är jag attraktiv, har jag gjort rätt val? Kan till exempel leda till en ny idrott eller en sportbil.", src: "s. 178" },
    { t: "Pensionärskris", d: "När arbetet tar slut kan man känna sig värdelös och utan uppgift och tappa självförtroendet, så identiteten ifrågasätts igen.", src: "s. 178" },
    { t: "Självbild", d: "Den bild du har av dig själv. Den är subjektiv och skapas i samspel med omgivningen, som håller upp \"speglar\" åt dig.", src: "PPT kap 10, bild 10–11" },
    { t: "Kongruens", d: "Överensstämmelse mellan självbilden och den du faktiskt är. Vissa har hög kongruens, andra låg.", src: "PPT kap 10, bild 10" },
    { t: "Självinsikt", d: "Att känna sig själv väl. Bra för den psykiska hälsan och viktigt för den som arbetar med andras mående.", src: "PPT kap 10, bild 12" },
    { t: "Självkänsla", d: "Hur du värderar dig själv. Bra självkänsla: du duger som du är. Dålig självkänsla: du ser ner på dig själv.", src: "PPT kap 10, bild 13" },
    { t: "Självförtroende", d: "Tilltro till din egen förmåga. Starkt självförtroende gör att du vågar mer, vilket i sin tur stärker självförtroendet.", src: "PPT kap 10, bild 13" }
  ],

  quiz: [
    { t: "mc", q: "Vilken sorts identitet bygger på en upplevelse av kontinuitet?", o: ["Personlig identitet", "Social identitet", "Juridisk identitet", "Förutfattad identitet"], a: 0, why: "Den personliga identiteten bygger på kontinuitet: du har en stabil självkänsla och känner igen dig själv över tid.", src: "Bok s. 172" },
    { t: "tf", q: "\"Den sociala identiteten markeras ofta med attribut som klädstil och frisyr.\"", a: true, why: "Sant. Boken nämner just klädstil och frisyr som sätt att visa vilken grupp man hör till.", src: "Bok s. 172" },
    { t: "order", q: "Sätt Daniel Sterns stadier i rätt ordning, från födseln.", items: ["Inget sammanhållet själv", "Kärnsjälvet", "Det subjektiva självet", "Det verbala självet", "Det berättande självet"], why: "Ordningen är kärn, subjektiv, verbal och berättande, ungefär att känna, knyta an, prata och berätta.", src: "Bok s. 173–174" },
    { t: "match", q: "Para ihop Sterns stadier med rätt ålder.", pairs: [["Kärnsjälvet", "2–6 månader"], ["Det subjektiva självet", "7–15 månader"], ["Det verbala självet", "16 månader–3 år"], ["Det berättande självet", "4 år och framåt"]], why: "Stern beskriver hur jaget växer fram under de fyra första åren.", src: "Bok s. 173–174" },
    { t: "mc", q: "Ett barn börjar säga sitt namn och känner igen sig själv i spegeln. Vilket stadium enligt Stern?", o: ["Det verbala självet", "Kärnsjälvet", "Det berättande självet", "Det subjektiva självet"], a: 0, why: "Det verbala självet (16 månader–3 år). Språket gör att barnet kan hantera sig själv.", src: "Bok s. 173" },
    { t: "mc", q: "Vad heter krisen i Eriksons femte fas?", o: ["Identitet eller rollförvirring", "Moratorium", "Mitt i livet-kris", "Pensionärskris"], a: 0, why: "I femte fasen (13–19 år) handlar krisen om identitet eller rollförvirring. Moratorium är en av Marcias statusar.", src: "Bok s. 174" },
    { t: "mc", q: "Vilken ålder gäller Eriksons femte fas?", o: ["13–19 år", "7–12 år", "20–30 år", "4–6 år"], a: 0, why: "Enligt Erikson blir identiteten fast och konsistent framför allt mellan 13 och 19 år.", src: "Bok s. 174" },
    { t: "tf", q: "\"Rutters studie visade att nästan alla tonåringar går igenom en identitetskris.\"", a: false, why: "Falskt. Lärare och föräldrar ansåg att bara ett fåtal gick igenom en identitetskris. Rutter talar alltså emot Erikson.", src: "Bok s. 175" },
    { t: "match", q: "Para ihop studien med metoden.", pairs: [["Kidwell (1995)", "Personlighetstest och strukturerad jag-identitetsintervju"], ["Rutter m.fl. (1976)", "Enkät och intervju med lärare och föräldrar"], ["Klimstra (2010)", "Identitetstest och enkät"]], why: "Lägg märke till att Rutter frågade vuxna, medan Kidwell och Klimstra frågade ungdomarna själva.", src: "Bok s. 175, 177" },
    { t: "mc", q: "Vilken kritik har Eriksons teori fått enligt boken?", o: ["Fasta faser och strikt åldersindelning", "Den handlar bara om spädbarn", "Den bygger på djurförsök", "Den saknar kriser"], a: 0, why: "Få studier stödjer teorin, och den kritiseras för sina fasta faser och den strikta åldersindelningen.", src: "Bok s. 175" },
    { t: "match", q: "Para ihop Marcias status med beskrivningen.", pairs: [["Förutfattad identitet", "Säker men lånad, övertagen från föräldrarna"], ["Identitetsförvirring", "Diffus, ingen utforskning och inga engagemang"], ["Moratorium", "Söker aktivt och prövar alternativ, kriser"], ["Etablerad identitet", "Klar och självvald, egna engagemang"]], why: "Tänk på de två frågorna: har personen utforskat, och har personen bestående engagemang?", src: "Bok s. 176–177" },
    { t: "mc", q: "Omar byter intressen varje månad, provar olika gymnasieprogram och känner ofta ångest över vem han är. Vilken status?", o: ["Moratorium", "Förutfattad identitet", "Etablerad identitet", "Identitetsförvirring"], a: 0, why: "Moratorium: han söker aktivt och prövar alternativ, kriserna ger ångest och engagemangen är vaga.", src: "Bok s. 177" },
    { t: "mc", q: "Lina ska bli advokat som båda sina föräldrar och har aldrig funderat på något annat. Vilken status?", o: ["Förutfattad identitet", "Moratorium", "Identitetsförvirring", "Etablerad identitet"], a: 0, why: "Förutfattad identitet: säker men övertagen från föräldrarna, utan egen utforskning eller kris.", src: "Bok s. 176" },
    { t: "tf", q: "\"Marcias identitetsstatusar följer alltid på varandra i en bestämd ordning.\"", a: false, why: "Falskt. Enligt Marcia kommer statusarna inte i en bestämd ordning och är inte bestående.", src: "Bok s. 176" },
    { t: "mc", q: "Vad kom Klimstra (2010) fram till?", o: ["Ju äldre, desto fler testade roller, och engagemanget ökade", "Bara ett fåtal har en identitetskris", "De utan fast identitet mådde bättre", "Identiteten är färdig vid 12 års ålder"], a: 0, why: "Det stödjer Marcias teori om att testa roller och hitta engagemang hos 12–16-åringar.", src: "Bok s. 177" },
    { t: "mc", q: "Vad är en pensionärskris?", o: ["Identiteten ifrågasätts när arbetet tar slut", "En kris i Eriksons femte fas", "När föräldrar köper sportbil", "En anknytningsstil"], a: 0, why: "Utan arbetet kan man känna sig värdelös och utan uppgift och tappa självförtroendet.", src: "Bok s. 178" },
    { t: "mc", q: "Vilket begrepp handlar om hur du värderar dig själv, om du duger som du är?", o: ["Självkänsla", "Självförtroende", "Självinsikt", "Kongruens"], a: 0, why: "Självkänsla handlar om värdet du ger dig själv. Självförtroende handlar om din förmåga.", src: "PPT kap 10, bild 13" },
    { t: "mc", q: "Vad betyder hög kongruens?", o: ["Självbilden stämmer med hur man faktiskt är", "Man har många sociala identiteter", "Man har starkt självförtroende", "Man har gått igenom en identitetskris"], a: 0, why: "Kongruens betyder överensstämmelse mellan självbild och faktiskt själv.", src: "PPT kap 10, bild 10" }
  ],

  essays: [
    {
      kind: "Förklara", q: "Förklara vad identitet är och vad som skiljer den personliga identiteten från den sociala. Ge egna exempel.",
      src: "Bok s. 171–172",
      model: `<p>Identitet är vår bild av vem vi är, att vara medveten om sig själv som en unik person (NE). Popov m.fl. beskriver det som en stabil och tillförlitlig bild av vem vi är. Identiteten består av flera delar, till exempel egenskaper, intressen, relationer, kön, kultur och roller.</p>
        <p>Psykologin skiljer mellan personlig och social identitet. Den <b>personliga</b> identiteten är det unika som skiljer mig från andra. Den bygger på kontinuitet: jag har en stabil självkänsla och kan beskriva mig själv utifrån mina minnen, behov och känslor. Exempel: jag vet att jag är envis och tycker om att rita.</p>
        <p>Den <b>sociala</b> identiteten är min känsla av vem jag är utifrån de grupper jag tillhör, som familjen och vännerna (Schaffer). Den handlar om min ställning och funktion i grupperna och visas ofta med klädstil och frisyr. Exempel: jag är målvakt i laget och storasyster hemma.</p>
        <p>De två hänger ihop. Grupperna påverkar hur jag ser på mig själv, och min personlighet påverkar vilka grupper jag söker mig till.</p>`,
      levels: {
        E: ["Ger en enkel definition av identitet", "Beskriver personlig och social identitet var för sig", "Ger minst ett exempel"],
        C: ["Förklarar kontinuitet i den personliga identiteten", "Kopplar den sociala identiteten till grupper, ställning och attribut", "Exemplen visar tydligt skillnaden"],
        A: ["Använder källor (NE, Popov, Schaffer) och begrepp säkert", "Resonerar om hur de två identiteterna påverkar varandra", "Nyanserat och välstrukturerat svar"]
      }
    },
    {
      kind: "Beskriv och jämför", q: "Beskriv hur identiteten formas enligt Daniel Stern och Erik H. Erikson. Vad har teorierna gemensamt, och vad skiljer dem åt?",
      src: "Bok s. 172–175",
      model: `<p><b>Stern</b> beskriver hur jaget växer fram de fyra första åren. Från 0–2 månader finns inget samlat själv, men barnet känner igen röster och ansikten. Sedan kommer kärnsjälvet (2–6 mån) med ögonkontakt och socialt leende, det subjektiva självet (7–15 mån) med anknytning och samspel, det verbala självet (16 mån–3 år) med språk, namn och spegelbild, och det berättande självet (4 år och framåt) när barnet kan berätta sammanhängande historier.</p>
        <p><b>Erikson</b> beskriver psykosocial utveckling genom hela livet. Vi utvecklas med hjälp av viktiga andra och genom kriser. I femte fasen (13–19 år) blir identiteten fast och konsistent genom krisen identitet eller rollförvirring, då man testar olika identiteter.</p>
        <p><b>Gemensamt:</b> båda menar att identiteten utvecklas stegvis och i samspel med andra människor. <b>Skillnader:</b> Stern fokuserar på de första fyra åren, Erikson på hela livet och särskilt tonåren. Erikson betonar kriser, Stern betonar hur självet byggs upp av intryck, språk och berättelser.</p>`,
      levels: {
        E: ["Beskriver några av Sterns stadier", "Beskriver Eriksons femte fas och krisen", "Nämner en likhet eller skillnad"],
        C: ["Beskriver Sterns stadier i rätt ordning med ålder", "Förklarar att Erikson handlar om hela livet och kriser", "Jämför med både likheter och skillnader"],
        A: ["Jämför systematiskt (period, drivkraft, samspel)", "Nämner kritiken mot Eriksons fasta faser", "Drar en egen, välmotiverad slutsats"]
      }
    },
    {
      kind: "Värdera", q: "Granska och värdera Eriksons och Marcias identitetsteorier. Använd studierna av Kidwell, Rutter och Klimstra.",
      src: "Bok s. 174–178",
      model: `<p>Erikson menar att tonåren (13–19 år) präglas av krisen identitet eller rollförvirring. Marcia byggde vidare på det med fyra identitetsstatusar som inte följer en bestämd ordning.</p>
        <p><b>Stöd:</b> Kidwell (1995) intervjuade 82 ungdomar och fann att utforskning var en del av identitetskrisen, och att de utan fast identitet mådde sämre. Det stödjer Erikson. Klimstra (2010) undersökte 1 313 ungdomar och fann att de testat fler roller och hade mer engagemang ju äldre de var. Det stödjer Marcia.</p>
        <p><b>Emot:</b> Rutter m.fl. (1976) fann bland 2 030 elever att bara ett fåtal gick igenom en identitetskris, så krisen gäller inte alla. Men Rutter frågade lärare och föräldrar. En inre kris syns kanske inte utåt, vilket gör resultatet osäkrare.</p>
        <p><b>Värdering:</b> Eriksons teori har få stödjande studier och kritiseras för fasta faser och strikt åldersindelning. Erikson byggde dessutom sina idéer på observationer av ungdomar i två ursprungsfolk i USA, vilket gör det svårt att generalisera. Marcias teori är mer flexibel, eftersom statusarna inte är fasta, och den kan mätas med intervjuer. Den verkar därför bättre förklara att alla inte har samma utveckling. Båda teorierna bygger dock mycket på vad ungdomar själva säger, och studierna gäller bara vissa åldrar.</p>`,
      levels: {
        E: ["Beskriver båda teorierna översiktligt", "Nämner minst en studie och dess resultat", "Gör en enkel värdering"],
        C: ["Använder studier både för och emot", "Kommenterar metod eller urval i studierna", "Väger för- och nackdelar mot varandra"],
        A: ["Använder alla tre studierna och kritiken mot Erikson", "Granskar metoder (vem svarar, urval, ålder, tid) nyanserat", "Drar en välgrundad slutsats om vilken teori som har starkast stöd"]
      }
    }
  ]
},

/* ---------- Kapitel som byggs härnäst (materialet finns redan) ---------- */
{
  id: "anknytning", ready: true, short: "Anknytning & lek",
  label: "Kap 10.2 · s. 179–186",
  title: "Hur uppstår psykosocialt samspel? Anknytning och lek",
  desc: "Oxytocin, Bowlbys fyra stadier, Ainsworths Strange Situation och anknytningsstilarna A–D, Hazan och Shaver, och leken från sida vid sida till klickar.",
  sections: [
    {
      id: "bowlby", title: "Det första bandet: oxytocin och Bowlby",
      why: "Anknytningen till de första vuxna lägger grunden för hur du samspelar med andra resten av livet.",
      src: "Bok s. 179 · PPT kap 10, bild 14",
      html: `
        <p>När du föddes hade du ett <b>medfött biologiskt behov</b> av att knyta an till de vuxna som tog hand om dig. När du ammades såg din <b>hypotalamus</b> till att det bildades <b>oxytocin</b>. Oxytocin kallas kärlekshormonet. Tillsammans med sociala och kognitiva faktorer gör det att människor knyter starka band till varandra.</p>
        <div class="def"><b>Anknytning</b>När känslomässiga band uppstår eller finns mellan, oftast, ett spädbarn och en förälder eller annan vuxen som barnet fäster sig vid.<cite>Henry Egidius, "Psykologiguiden"</cite></div>
        <p><b>John Bowlby</b> intresserade sig för de första starka banden och skapade en <b>anknytningsteori</b> på 1950–1970-talet. Enligt teorin har evolutionen gjort spädbarn hjälplösa men söta, så att föräldrarna tar hand om dem. Föräldrarna har i sin tur <b>medfödda mekanismer</b> som får dem att ta hand om barnet.</p>
        <p>Bowlby kom fram till att anknytningen under de första åren följer fyra grundläggande stadier:</p>
        [[fig:bowlby]]
        <ol>
          <li><b>0–2 månader:</b> barnet signalerar behov och känslor och reagerar på kontakt, vilket ger närhet till vårdarna.</li>
          <li><b>2–7 månader:</b> barnet känner igen vissa människor. Om de är pålitliga växer en trygghet fram.</li>
          <li><b>7 månader–2 år:</b> barnet protesterar när trygghetspersonen försvinner, är svårt att trösta för andra och utforskar med den trygga vuxna som bas.</li>
          <li><b>2 år och uppåt:</b> barnet börjar förstå andras känslor och behov, så samspelet kan utvecklas vidare.</li>
        </ol>
        <p>Om barnet får en god anknytning i barndomen skapas enligt Bowlby goda <b>relationsscheman</b> i hjärnans informationsprocessystem. De påverkar senare relationer i livet positivt.</p>
        <div class="note">Bowlby förklarar anknytningen <b>biologiskt</b>, med evolution och medfödda mekanismer. Samma sorts förklaring kommer tillbaka i kap 11 om varför vi hjälper varandra.</div>`,
      check: [
        { q: "Vad är oxytocin, och var bildas det?", a: "Ett hormon som kallas kärlekshormonet. Hypotalamus ser till att det bildas, till exempel vid amning. Tillsammans med sociala och kognitiva faktorer skapar det starka band mellan människor." },
        { q: "Hur förklarar Bowlby att föräldrar tar hand om sina barn?", a: "Med evolutionen: spädbarn är hjälplösa men söta så att föräldrarna tar hand om dem, och föräldrarna har medfödda mekanismer för att göra det." },
        { q: "Vad händer i Bowlbys tredje stadium (7 månader–2 år)?", a: "Barnet protesterar när trygghetspersonen försvinner, har svårt att tröstas av andra och utforskar omgivningen med den trygga vuxna som bas." }
      ]
    },
    {
      id: "ainsworth", title: "Mary Ainsworth och The Strange Situation",
      why: "Ainsworths studie är en av de mest kända inom psykologin, och boken ber dig både värdera den och fundera över etiken.",
      src: "Bok s. 179–181 · PPT kap 10, bild 15",
      html: `
        <p><b>Mary Ainsworth</b> var en amerikansk utvecklingspsykolog som fortsatte Bowlbys arbete. Hon tog fram ett sätt att <b>observera</b> barn och deras mammor för att se om barnet hade en god anknytning till sin mamma.</p>
        [[study:ainsworth]]
        <p>Så här går observationen till:</p>
        [[fig:strange]]
        <p>En observatör antecknar hur barnet reagerar när mamman går och kommer tillbaka. Leker barnet med främlingen, och låter det sig tröstas av främlingen? Lämnar barnet mamman för att utforska lekrummet, och låter det sig lätt tröstas av mamman om det har varit ledset?</p>
        <p class="task">Värdera Ainsworths observationsstudie. Är det etiskt rätt att observera barn på det här sättet?</p>`,
      check: [
        { q: "Var och när gjorde Ainsworth sina studier?", a: "I Uganda 1958 (28 mammor och barn i nio månader) och i USA 1971 (26 familjer)." },
        { q: "Vad tittar observatören efter i The Strange Situation?", a: "Hur barnet reagerar när mamman går och kommer tillbaka, om barnet leker med och tröstas av främlingen, om det utforskar rummet och om det tröstas lätt av mamman." },
        { q: "Vilket etiskt problem finns med metoden?", a: "Man utsätter små barn för stress med flit, till exempel när barnet lämnas ensamt i ett främmande rum. (Egen slutsats, boken ber dig fundera på det.)" }
      ]
    },
    {
      id: "stilar", title: "De fyra anknytningsstilarna",
      why: "Stilarna A–D är provets kärna i det här avsnittet. Du ska kunna beskriva dem och känna igen dem i exempel.",
      src: "Bok s. 180–181 · PPT kap 10, bild 15",
      html: `
        <p>Ainsworth kom fram till att barnen visade <b>tre</b> olika anknytningsstilar. Psykologerna <b>Mary Main och Judith Solomon</b> lade 1986 till en <b>fjärde</b>.</p>
        [[fig:stilar]]
        <div class="tablewrap"><table>
          <tr><th>Stil</th><th>När mamman går</th><th>När mamman kommer tillbaka</th><th>Andel</th></tr>
          <tr><td><b>A – undvikande</b></td><td>Stänger av, visar ingen stress</td><td>Bryr sig inte om henne</td><td>10 %</td></tr>
          <tr><td><b>B – trygg</b></td><td>Blir ledset (har lekt med mamman som trygg bas)</td><td>Tröstas lätt</td><td>60–70 %</td></tr>
          <tr><td><b>C – ambivalent</b></td><td>Blir ledset</td><td>Både vill och inte vill bli tröstat, mamman är ingen trygg bas</td><td>10 %</td></tr>
          <tr><td><b>D – oorganiserad/osäker</b></td><td>Ingen konsekvent strategi</td><td>Ibland lätt att trösta, ibland tvekar det att söka tröst</td><td>5–10 %</td></tr>
        </table></div>
        <p>Forskning från hela världen, bland annat Sverige, visar hur många barn som har de olika stilarna.</p>
        <h3>Vad stilarna betyder senare</h3>
        <p>Stilarna har visat sig få följder för framtida relationer. <b>Trygga</b> barn har ett mognare samspel med jämnåriga än barn med de andra stilarna och delar med sig när de leker. Barn med <b>oorganiserad/osäker</b> anknytning är oftare utåtagerande och har därför svårare att få vänner.</p>
        <div class="note">Minnesregel: <b>A</b> = Avstånd (undvikande), <b>B</b> = trygg Bas, <b>C</b> = kluven (ambivalent), <b>D</b> = Desorganiserad (oorganiserad).</div>
        <p class="task">Granska och värdera Bowlbys och Ainsworths anknytningsteori.</p>`,
      check: [
        { q: "Ett barn leker vidare som om inget hänt när mamman går och bryr sig inte om henne när hon kommer tillbaka. Vilken stil?", a: "Typ A, undvikande." },
        { q: "Vilken stil är vanligast, och hur stor andel har den?", a: "Typ B, trygg, med 60–70 % av barnen." },
        { q: "Vilka lade till den fjärde stilen, och när?", a: "Mary Main och Judith Solomon, 1986. Det var typ D, oorganiserad/osäker." }
      ]
    },
    {
      id: "hazan", title: "Från barndom till kärleksrelation: Hazan och Shaver",
      why: "Studien visar att anknytningen från barndomen kan följa med in i vuxenlivet.",
      src: "Bok s. 181–182 · PPT kap 10, bild 16",
      html: `
        <p>Anknytningsstilen från barndomen kan också påverka relationer som vuxen. Professorerna <b>Cindy Hazan och Phillip Shaver</b> visade 1987 att tryggheten eller otryggheten i barndomen påverkade kärleksrelationer senare i livet.</p>
        [[study:hazan]]
        <div class="tablewrap"><table>
          <tr><th>Anknytning i barndomen</th><th>Andel</th><th>Som vuxen i relationen</th></tr>
          <tr><td><b>Trygg</b></td><td>56 %</td><td>Lätt att vara nära, litar på partnern, inte rädd att bli övergiven, lägst andel skilsmässor</td></tr>
          <tr><td><b>Ambivalent</b></td><td>20 %</td><td>Rädd att bli avvisad, ser relationen som instabil, svartsjuk</td></tr>
          <tr><td><b>Undvikande</b></td><td>24 %</td><td>Svårt att vara nära, relationen saknar närhet och tillit</td></tr>
        </table></div>
        <p>Studien visar att den anknytningsstil du utvecklar som barn kan påverka de relationer du har som vuxen.</p>
        <div class="note">Jämför med Ainsworth: där var ungefär 60–70 % av barnen trygga, här ansåg 56 % av de vuxna att de hade haft en trygg anknytning. Fördelningen liknar varandra, men Hazan och Shaver har bara tre stilar. Den fjärde, oorganiserad, finns inte med.</div>`,
      check: [
        { q: "Vilken metod använde Hazan och Shaver?", a: "En enkät, en \"kärleksenkät\" i en tidning som läsarna själva fick svara på och skicka in." },
        { q: "Hur beskrev de med ambivalent anknytning sina vuxenrelationer?", a: "De var rädda att bli avvisade, såg relationen som instabil och var svartsjuka." },
        { q: "Ge en svaghet med studien.", a: "Till exempel att de vuxna själva fick minnas sin barndom, och minnen kan vara felaktiga. Bara tidningsläsare som ville svara var med, och det var dubbelt så många kvinnor som män." }
      ]
    },
    {
      id: "lek", title: "Lek och relationer med jämnåriga",
      why: "Det är inte bara de vuxna som formar ditt samspel. Leken med andra barn tränar de sociala förmågorna steg för steg.",
      src: "Bok s. 182–185",
      html: `
        <p>Inte bara anknytningen till nära vuxna har bidragit till ditt <b>psykosociala samspel</b>, utan även leken och relationerna med jämnåriga.</p>
        [[fig:lek]]
        <div class="tablewrap"><table>
          <tr><th>Ålder</th><th>Lek och relationer</th></tr>
          <tr><td>6–12 mån</td><td>Ler mot andra barn och sträcker sig mot dem för att röra vid dem</td></tr>
          <tr><td>1 år</td><td>Kan dela med sig av leksaker, men mest konflikter. Leker <b>vid sidan om</b> varandra utan att samspela</td></tr>
          <tr><td>1–2 år</td><td><b>Övningslekar:</b> roligt att behärska leken, inte att förstå den. Tränar impulskontroll</td></tr>
          <tr><td>2–6 år</td><td>Leker mer i grupp. <b>Aktionslekar</b> eller "vild lek", som att springa och jaga varandra</td></tr>
          <tr><td>3–4 år</td><td><b>Rollekar</b> eller "symbollekar" (doktor, mamma-pappa-barn). Vänskap formas, många leker helst med samma kön</td></tr>
          <tr><td>6–12 år</td><td>Fantasi och rollek (Barbie, Lego). <b>Regelstyrd lek</b> med formella regler (fotboll) eller informella regler (kurragömma). Vänskap genom delade tankar och känslor. <b>Grupphierarkier</b>: ledare och utanför</td></tr>
          <tr><td>12–18 år</td><td>29 % av vaken tid med kompisar, 13 % med föräldrar. <b>Klickar</b> med samma intressen</td></tr>
        </table></div>
        <p>Att hamna utanför gruppens gemenskap i 6–12-årsåldern kan vara mycket tufft och leda till dåligt självförtroende. I alla dessa lek- och relationsfaser utvecklades din förmåga till psykosocialt samspel.</p>
        <p class="task">Gör en tidslinje över din barndom: vem lekte du med, vad lekte ni och vad lärde du dig?</p>`,
      check: [
        { q: "Vad menas med att ettåringar leker vid sidan om varandra?", a: "De leker bredvid varandra men inte tillsammans, och samspelar inte." },
        { q: "Vad är skillnaden mellan en övningslek och en regelstyrd lek?", a: "I en övningslek (1–2 år) är det roliga att behärska leken, inte att förstå den. I en regelstyrd lek (6–12 år) följer man formella eller informella regler, till exempel i fotboll eller kurragömma." },
        { q: "Vad är en klick, och vad tränar den?", a: "En grupp ungdomar som delar intressen. Att umgås i flera klickar tränar förmågan att umgås med många och samspela med människor." }
      ]
    },
    {
      id: "vuxen", title: "Relationer genom hela livet",
      why: "Det psykosociala samspelet tar aldrig slut. Det ändrar bara form när vi blir vuxna och äldre.",
      src: "Bok s. 185–186",
      html: `
        <p>Sociala relationer är viktiga även efter barn- och ungdomstiden. Enligt bland andra <b>Erik H. Erikson</b> är behovet av <b>närhet och intimitet</b> viktigt i den tidiga vuxenåldern. Då brukar de viktigaste målen vara att skaffa sig en utbildning, ett arbete och en parrelation. Det viktiga är att känna sig behövd i en familj, för eventuella barn eller på arbetet. I medelåldern är familjen och arbetslivet fortfarande de viktigaste relationerna.</p>
        <p>När man blir äldre och går i pension kan många känna sig <b>ensamma</b>. Andra skaffar nya intressen, går med i aktivitetsgrupper och reser. Livskamraten är ofta också den bästa vännen, och om hen dör kan livet förändras brutalt.</p>
        <div class="tablewrap"><table>
          <tr><th>Män som blir änklingar</th><th>Kvinnor som blir änkor</th></tr>
          <tr><td>Verkar lida mer och kan känna sig mycket ensamma om de inte hittar en ny livskamrat. Andelen självmord bland äldre män är högre än bland kvinnor.</td><td>Verkar engagera sig mer i fritidsaktiviteter och resa mer. Äldre kvinnor verkar ha ett rikare socialt nätverk.</td></tr>
        </table></div>
        <p>Ditt psykosociala samspel pågår alltså <b>hela livet</b>.</p>`,
      check: [
        { q: "Vad är viktigt i den tidiga vuxenåldern enligt Erikson?", a: "Behovet av närhet och intimitet. Målen är ofta utbildning, arbete och en parrelation, och att känna sig behövd." },
        { q: "Vilken skillnad finns mellan äldre män och kvinnor som förlorar sin partner?", a: "Män verkar lida mer och känna sig mer ensamma, och självmord är vanligare bland äldre män. Kvinnor engagerar sig mer i aktiviteter, reser mer och har ett rikare socialt nätverk." }
      ]
    }
  ],

  terms: [
    { t: "Anknytning", d: "När känslomässiga band uppstår eller finns mellan, oftast, ett spädbarn och en förälder eller annan vuxen som barnet fäster sig vid (Egidius).", src: "s. 179" },
    { t: "Oxytocin", d: "\"Kärlekshormonet\". Bildas med hjälp av hypotalamus, till exempel vid amning. Tillsammans med sociala och kognitiva faktorer skapar det starka band mellan människor.", src: "s. 179" },
    { t: "John Bowlby", d: "Skapade anknytningsteorin på 1950–1970-talet: spädbarn är genom evolutionen hjälplösa men söta, och föräldrarna har medfödda mekanismer för att ta hand om dem.", src: "s. 179" },
    { t: "Bowlbys fyra stadier", d: "0–2 mån: signalerar behov. 2–7 mån: känner igen pålitliga personer, trygghet. 7 mån–2 år: protesterar vid separation, utforskar med trygg bas. 2 år–: förstår andras känslor och behov.", src: "s. 179" },
    { t: "Trygg bas", d: "Den trygga vuxna som barnet utforskar omgivningen ifrån (Bowlbys tredje stadium). Ett tryggt barn (typ B) leker med mamman som trygg bas.", src: "s. 179–181" },
    { t: "Relationsscheman", d: "Enligt Bowlby skapar en god anknytning i barndomen goda relationsscheman i hjärnans informationsprocessystem, som påverkar senare relationer positivt.", src: "s. 179" },
    { t: "Mary Ainsworth", d: "Amerikansk utvecklingspsykolog som fortsatte Bowlbys arbete. Observerade mammor och barn i Uganda (1958) och USA (1971) och skapade The Strange Situation.", src: "s. 179–180" },
    { t: "The Strange Situation", d: "Ainsworths observationsmanual i sju steg där mamman och en främling går in och ut ur ett lekrum. Används i hela världen för att ta reda på barns anknytning.", src: "s. 180" },
    { t: "Typ A – undvikande", d: "Barnet stänger av när mamman går, visar ingen stress och bryr sig inte om henne när hon kommer tillbaka. Cirka 10 %.", src: "s. 180" },
    { t: "Typ B – trygg", d: "Barnet leker med mamman som trygg bas, blir ledset när hon går och tröstas lätt när hon kommer tillbaka. 60–70 %.", src: "s. 181" },
    { t: "Typ C – ambivalent", d: "Barnet blir ledset när mamman går men både vill och inte vill bli tröstat när hon kommer tillbaka. Mamman är ingen trygg bas. Cirka 10 %.", src: "s. 181" },
    { t: "Typ D – oorganiserad/osäker", d: "Barnet har ingen konsekvent strategi. Ibland ledset och lätt att trösta, ibland tvekar det att söka tröst. 5–10 %. Tillagd av Main och Solomon 1986.", src: "s. 180–181" },
    { t: "Hazan och Shaver (1987)", d: "Enkät i en tidning med 620 vuxna. Visade ett samband mellan anknytningsstilen i barndomen och kvaliteten på vuxna kärleksrelationer.", src: "s. 182" },
    { t: "Psykosocialt samspel", d: "Samspelet mellan dig och andra människor. Det utvecklas genom anknytning till nära vuxna, lek och relationer med jämnåriga, och genom grupper. Det pågår hela livet.", src: "s. 179–186" },
    { t: "Lek vid sidan om varandra", d: "Vid ett års ålder leker barn bredvid varandra men inte tillsammans, och samspelar inte. Relationerna leder mest till konflikter.", src: "s. 182–183" },
    { t: "Övningslek", d: "Lek vid 1–2 års ålder där det roliga är att behärska leken, inte att förstå den. Barnet tränar också impulskontroll, till exempel att inte ta andras saker.", src: "s. 183" },
    { t: "Aktionslek", d: "\"Vild lek\" vid 2–6 år, som att springa och jaga varandra utan något egentligt mål.", src: "s. 183" },
    { t: "Rollek (symbollek)", d: "Lek vid 3–4 år där man spelar roller, till exempel doktor eller mamma-pappa-barn. Här formas vänskap, och många föredrar att leka med barn av samma kön.", src: "s. 184" },
    { t: "Regelstyrd lek", d: "Lek vid 6–12 år med formella regler (fotboll) eller informella regler (kurragömma).", src: "s. 184" },
    { t: "Grupphierarki", d: "Uppstår vid 6–12 år när barn får olika status: någon blir ledare och någon hamnar utanför, vilket kan ge dåligt självförtroende.", src: "s. 184" },
    { t: "Klick", d: "En grupp ungdomar (12–18 år) som delar intressen. Att umgås i flera klickar utvecklar förmågan att umgås med många.", src: "s. 185" },
    { t: "Närhet och intimitet", d: "Enligt Erikson ett viktigt behov i den tidiga vuxenåldern, då målen ofta är utbildning, arbete och en parrelation.", src: "s. 185" }
  ],

  quiz: [
    { t: "mc", q: "Vilket hormon kallas kärlekshormonet?", o: ["Oxytocin", "Adrenalin", "Kortisol", "Melatonin"], a: 0, why: "Oxytocin bildas till exempel vid amning och skapar, tillsammans med sociala och kognitiva faktorer, starka band mellan människor.", src: "Bok s. 179" },
    { t: "mc", q: "Vilken del av hjärnan ser till att oxytocin bildas?", o: ["Hypotalamus", "Hjärnbarken", "Lillhjärnan", "Hippocampus"], a: 0, why: "Boken skriver att hypotalamus ser till att oxytocin bildas när barnet ammas.", src: "Bok s. 179" },
    { t: "tf", q: "\"Enligt Bowlby har evolutionen gjort spädbarn hjälplösa men söta, så att föräldrarna tar hand om dem.\"", a: true, why: "Sant. Bowlby förklarar anknytningen biologiskt. Föräldrarna har dessutom medfödda mekanismer för att ta hand om barnet.", src: "Bok s. 179" },
    { t: "order", q: "Sätt Bowlbys fyra stadier i rätt ordning.", items: ["Signalerar behov och reagerar på kontakt", "Känner igen pålitliga personer, trygghet växer", "Protesterar när trygghetspersonen går, utforskar med trygg bas", "Förstår andras känslor och behov"], why: "0–2 mån, 2–7 mån, 7 mån–2 år, 2 år och uppåt.", src: "Bok s. 179" },
    { t: "order", q: "Sätt stegen i The Strange Situation i rätt ordning.", items: ["Barnet och mamman leker", "En främling kommer in", "Mamman lämnar rummet", "Mamman kommer tillbaka, främlingen går", "Mamman går, barnet är ensamt", "Främlingen kommer in", "Mamman kommer tillbaka, främlingen går ut"], why: "Mamman går två gånger. Andra gången lämnas barnet helt ensamt, och det är då stressen blir störst.", src: "Bok s. 180" },
    { t: "tf", q: "\"Ainsworth gjorde sin första studie i USA 1958.\"", a: false, why: "Falskt. 1958 gjorde hon studien i Uganda med 28 mammor och barn. 1971 gjorde hon samma studie i USA med 26 familjer.", src: "Bok s. 179–180" },
    { t: "match", q: "Para ihop anknytningsstilen med beskrivningen.", pairs: [["A – undvikande", "Visar ingen stress och bryr sig inte om mamman när hon kommer"], ["B – trygg", "Ledsen när mamman går, tröstas lätt när hon kommer"], ["C – ambivalent", "Vill och vill inte bli tröstad, mamman är ingen trygg bas"], ["D – oorganiserad/osäker", "Ingen konsekvent strategi"]], why: "Tänk på hur barnet reagerar när mamman går och när hon kommer tillbaka.", src: "Bok s. 180–181" },
    { t: "match", q: "Para ihop stilen med andelen barn.", pairs: [["Typ A", "10 %"], ["Typ B", "60–70 %"], ["Typ D", "5–10 %"]], why: "Trygg anknytning är klart vanligast. Ambivalent (C) är också 10 %.", src: "Bok s. 180–181" },
    { t: "mc", q: "Vilka lade till den fjärde anknytningsstilen (D) 1986?", o: ["Mary Main och Judith Solomon", "Hazan och Shaver", "John Bowlby", "Darley och Latané"], a: 0, why: "Ainsworth beskrev tre stilar, och Main och Solomon lade till den oorganiserade/osäkra.", src: "Bok s. 180" },
    { t: "mc", q: "Ett barn gråter när mamman går. När hon kommer tillbaka sträcker barnet sig efter henne men knuffar sedan bort henne. Vilken stil?", o: ["C – ambivalent", "A – undvikande", "B – trygg", "D – oorganiserad"], a: 0, why: "Ambivalent: barnet både vill och inte vill bli tröstat.", src: "Bok s. 181" },
    { t: "mc", q: "Vad visar forskningen om barn med trygg anknytning?", o: ["De har ett mognare samspel med jämnåriga och delar med sig", "De är mer utåtagerande", "De leker helst ensamma", "De har svårare att få vänner"], a: 0, why: "Det är barn med oorganiserad/osäker anknytning som oftare är utåtagerande och har svårare att få vänner.", src: "Bok s. 181" },
    { t: "mc", q: "Vilken metod använde Hazan och Shaver?", o: ["Enkät i en tidning", "Observation i ett lekrum", "Experiment med kontrollgrupp", "Intervju med lärare"], a: 0, why: "Läsarna svarade på en \"kärleksenkät\" om sin barndom och sin mest romantiska relation.", src: "Bok s. 182" },
    { t: "mc", q: "Vilken grupp i Hazan och Shavers studie var rädd att bli avvisad och svartsjuk?", o: ["Ambivalent (20 %)", "Trygg (56 %)", "Undvikande (24 %)", "Oorganiserad"], a: 0, why: "De med ambivalent anknytning såg dessutom relationen som instabil.", src: "Bok s. 182" },
    { t: "order", q: "Sätt lekens utveckling i rätt ordning.", items: ["Lek vid sidan om varandra", "Övningslekar", "Aktionslekar (vild lek)", "Rollekar (symbollekar)", "Regelstyrd lek", "Klickar med delade intressen"], why: "1 år, 1–2 år, 2–6 år, 3–4 år, 6–12 år, 12–18 år.", src: "Bok s. 182–185" },
    { t: "match", q: "Para ihop leken med ett exempel.", pairs: [["Övningslek", "Det roliga är att behärska leken"], ["Aktionslek", "Springa och jaga varandra"], ["Rollek", "Leka doktor eller mamma-pappa-barn"], ["Regelstyrd lek", "Fotboll eller kurragömma"]], why: "Leken går från att träna en färdighet till att följa regler tillsammans.", src: "Bok s. 183–184" },
    { t: "mc", q: "Hur stor del av sin vakna tid är 12–18-åringar med kompisar, enligt studien i boken?", o: ["29 %", "13 %", "50 %", "5 %"], a: 0, why: "29 % med kompisar och 13 % med föräldrarna.", src: "Bok s. 185" },
    { t: "tf", q: "\"Äldre kvinnor som blir änkor verkar ha ett rikare socialt nätverk än män som blir änklingar.\"", a: true, why: "Sant. Kvinnorna engagerar sig mer i fritidsaktiviteter och reser mer, medan männen verkar lida mer av ensamhet.", src: "Bok s. 186" }
  ],

  essays: [
    {
      kind: "Beskriv", q: "Beskriv Bowlbys anknytningsteori och hur Mary Ainsworth byggde vidare på den. Förklara de fyra anknytningsstilarna.",
      src: "Bok s. 179–181",
      model: `<p>Barn föds med ett biologiskt behov av att knyta an. Oxytocin, som bildas med hjälp av hypotalamus, bidrar till starka band. <b>Bowlby</b> (1950–1970-talet) menade att evolutionen gjort spädbarn hjälplösa men söta, och att föräldrar har medfödda mekanismer för att ta hand om dem. Anknytningen följer fyra stadier: barnet signalerar behov (0–2 mån), känner igen pålitliga personer (2–7 mån), protesterar vid separation och utforskar med en trygg bas (7 mån–2 år) och börjar förstå andras känslor (2 år och uppåt). En god anknytning ger goda relationsscheman inför senare relationer.</p>
        <p><b>Ainsworth</b> fortsatte Bowlbys arbete och observerade mammor och barn, först i Uganda 1958 och sedan i USA 1971. Hennes metod, The Strange Situation, har sju steg där mamman och en främling går in och ut ur ett lekrum medan man ser hur barnet reagerar.</p>
        <p>Stilarna är: <b>A, undvikande</b> (ingen stress, bryr sig inte om mamman, 10 %), <b>B, trygg</b> (ledsen när mamman går, tröstas lätt, 60–70 %), <b>C, ambivalent</b> (vill och vill inte bli tröstad, 10 %) och <b>D, oorganiserad/osäker</b> (ingen konsekvent strategi, 5–10 %), som Main och Solomon lade till 1986. Trygga barn får ett mognare samspel med jämnåriga, medan oorganiserade barn oftare är utåtagerande.</p>`,
      levels: {
        E: ["Beskriver översiktligt vad anknytning är och Bowlbys teori", "Nämner Ainsworths metod", "Beskriver några av stilarna"],
        C: ["Beskriver Bowlbys stadier och den evolutionära förklaringen", "Förklarar hur The Strange Situation går till", "Beskriver alla fyra stilarna med reaktioner"],
        A: ["Kopplar ihop teorierna tydligt (Ainsworth bygger på Bowlby)", "Tar med andelar, Main och Solomon och följderna för senare relationer", "Välstrukturerat svar med korrekta begrepp"]
      }
    },
    {
      kind: "Värdera", q: "Granska och värdera Ainsworths observationsstudie och Hazan och Shavers studie. Diskutera också om det är etiskt rätt att observera barn så som Ainsworth gjorde.",
      src: "Bok s. 179–182",
      model: `<p><b>Ainsworth:</b> en styrka är att hon observerade hur barnen faktiskt betedde sig, och att alla gick igenom samma sju steg, så resultaten går att jämföra. Metoden används i dag över hela världen. Svagheter är de små urvalen (28 och 26 familjer), att bara mammor var med och att lekrummet är en konstgjord miljö där barn kanske beter sig annorlunda än hemma. Uganda och USA har också olika kulturer.</p>
        <p><b>Hazan och Shaver:</b> urvalet är stort (620 personer), men det består av tidningsläsare som själva valde att svara, med dubbelt så många kvinnor som män. Vuxna fick minnas sin barndom, och minnen kan vara felaktiga. Studien visar ett samband, inte att barndomen orsakar hur vuxenrelationen blir.</p>
        <p><b>Etik:</b> i Ainsworths studie utsätts små barn för stress med flit, särskilt när de lämnas ensamma. Man kan försvara metoden med att stressen är kort, att mamman kommer tillbaka och att kunskapen kan hjälpa barn. Men barnen kan inte själva ge sitt samtycke. Själv tycker jag ... <i>(avsluta med en egen motiverad ståndpunkt)</i>.</p>`,
      levels: {
        E: ["Ger någon styrka och svaghet för en av studierna", "Gör en enkel kommentar om etiken"],
        C: ["Värderar båda studierna med styrkor och svagheter", "Kommenterar urval och metod (observation och enkät)", "Diskuterar etiken med argument för och emot"],
        A: ["Nyanserad värdering: generalisering, självrapport, samband eller orsak", "Jämför studierna med varandra", "Drar en egen, välmotiverad slutsats om etiken"]
      }
    },
    {
      kind: "Förklara", q: "Förklara hur ditt psykosociala samspel har utvecklats från spädbarn till ungdom, genom anknytning, lek och relationer.",
      src: "Bok s. 179–185",
      model: `<p>Samspelet börjar med <b>anknytningen</b>. Spädbarnet har ett medfött behov av att knyta an, oxytocin skapar band, och enligt Bowlby går anknytningen genom fyra stadier fram till att barnet förstår andras känslor vid ungefär två års ålder. En trygg anknytning ger goda relationsscheman och ett mognare samspel med jämnåriga.</p>
        <p>Sedan tränar <b>leken</b> det sociala steg för steg. Vid 6–12 månader ler barnet mot andra barn, vid ett år leker det vid sidan om dem, vid 1–2 år kommer övningslekar och impulskontroll, vid 2–6 år aktionslekar i grupp och vid 3–4 år rollekar där vänskap formas. Vid 6–12 år blir leken regelstyrd, vänskap bygger på delade tankar och grupphierarkier uppstår.</p>
        <p>I <b>tonåren</b> umgås man mest med vänner (29 % av den vakna tiden) i klickar med samma intressen, vilket tränar förmågan att umgås med många. Samspelet fortsätter genom hela livet med parrelationer, familj och arbete.</p>`,
      levels: {
        E: ["Nämner anknytning och några lekformer", "Beskriver utvecklingen översiktligt"],
        C: ["Förklarar anknytningens betydelse med Bowlby eller Ainsworth", "Beskriver lekens utveckling i rätt ordning med åldrar", "Kopplar leken till sociala förmågor"],
        A: ["Visar hur anknytning och lek hänger ihop (till exempel trygghet ger mognare samspel)", "Använder begrepp säkert och tar med tonåren och klickarna", "Sammanhängande och välstrukturerat"]
      }
    }
  ]
},
{
  id: "grupper", ready: true, short: "Grupper",
  label: "Kap 10.3 · s. 186–190",
  title: "Hur samspelar du i grupper?",
  desc: "Inne- och utegrupper, grupprocesser, gruppstorlek från två till sju personer, FIRO, Tuckmans fem faser och sjufasmodellen.",
  sections: [
    {
      id: "grupp", title: "Varför grupper? Innegrupper och utegrupper",
      why: "Grupperna du tillhör formar både din identitet och ditt beteende. Det är grunden för hela avsnittet om grupper.",
      src: "Bok s. 186 · PPT kap 10, bild 17",
      html: `
        <p>Det är viktigt för oss människor att ingå i olika grupper. Vi identifierar oss gärna med de grupper som är särskilt viktiga för oss, och det påverkar både vår <b>identitet</b> och vårt <b>beteende</b>.</p>
        <p>Enligt <b>social identitetsteori</b> är vissa grupper, <b>innegrupperna</b>, viktiga för oss eftersom vi är en del av dem och identifierar oss med medlemmarna. Vi formas också av grupper som vi inte tillhör, <b>utegrupperna</b>, som vi på olika sätt tar avstånd från. I det samspelet formas både din identitet och ditt beteende.</p>
        <div class="tablewrap"><table>
          <tr><th>Innegrupp</th><th>Utegrupp</th></tr>
          <tr><td>En grupp du tillhör och identifierar dig med</td><td>En grupp du inte tillhör och tar avstånd från</td></tr>
          <tr><td>Exempel: ditt lag, din klass, din familj</td><td>Exempel: motståndarlaget, en annan skola</td></tr>
        </table></div>
        <div class="def"><b>Grupprocesser (gruppdynamik)</b>Hur enskilda medlemmar beter sig i gruppen och hur gruppen samspelar som helhet. Samspelet avgör hur väl gruppen fungerar.<cite>Bok s. 186</cite></div>
        <p>I många grupper finns mål att nå. Då måste gruppen lösa problem och fatta beslut. Forskare har studerat hur grupper samspelar och hur effektiva de är på att samarbeta mot sina mål, och har tagit fram många begrepp och teorier om grupprocesser.</p>
        <p class="task">Vilka grupper har format din identitet och ditt beteende? Hur?</p>`,
      check: [
        { q: "Vad är skillnaden mellan en innegrupp och en utegrupp?", a: "En innegrupp tillhör du och identifierar dig med. En utegrupp tillhör du inte, och du tar på olika sätt avstånd från den. Båda formar din identitet och ditt beteende." },
        { q: "Vad menas med grupprocesser?", a: "Hur enskilda medlemmar beter sig i gruppen och hur gruppen samspelar som helhet. Ett annat ord är gruppdynamik." }
      ]
    },
    {
      id: "storlek", title: "Gruppens storlek",
      why: "Hur många ni är påverkar vem som pratar, hur många perspektiv som kommer fram och hur lång tid arbetet tar.",
      src: "Bok s. 186–187 · PPT kap 10, bild 17",
      html: `
        <p>Forskare har studerat hur många man bör vara i en grupp som ska arbeta tillsammans, till exempel vid ett grupparbete i skolan, där arbetet ska göras gemensamt och inte delas upp. Hur många som passar beror på syftet med gruppen och med arbetet.</p>
        [[fig:storlek]]
        <div class="tablewrap"><table>
          <tr><th>Storlek</th><th>Fördelar</th><th>Nackdelar</th></tr>
          <tr><td><b>2</b></td><td>Båda är aktiva, demokratiskt och trivsamt, små uppgifter går snabbt</td><td>Svårt med stora arbeten, få perspektiv</td></tr>
          <tr><td><b>3</b></td><td>Fler diskussioner och perspektiv</td><td>Två kan "hitta varandra" och lämna den tredje utanför</td></tr>
          <tr><td><b>4–5</b></td><td>Många perspektiv, fungerar även om någon är borta</td><td>Behöver struktur: alla kommer till tals, någon antecknar och någon fördelar ordet</td></tr>
          <tr><td><b>6–7+</b></td><td>Resultatet kan bli bättre</td><td>Tysta blir tystare och pratglada tar över, undergrupper bildas, det tar längre tid, det behövs regler och mötesledare</td></tr>
        </table></div>`,
      check: [
        { q: "Varför fungerar en grupp på fyra–fem personer även om någon är sjuk?", a: "Det finns tillräckligt många kvar för att arbetet ska fortsätta och för att många perspektiv ska komma fram." },
        { q: "Vilka problem kan uppstå i en grupp med sju eller fler?", a: "Skillnaderna ökar: den blyga blir tystare och den pratglada tar över. Undergrupper kan bildas och arbetet tar längre tid. Det behövs tydliga regler, till exempel en mötesledare." }
      ]
    },
    {
      id: "firo", title: "FIRO-modellen (Will Schultz)",
      why: "FIRO är den tidigaste modellen om grupprocesser i boken, och de andra bygger vidare på den.",
      src: "Bok s. 187–188 · PPT kap 10, bild 18",
      html: `
        <p><b>Will Schultz</b>, en amerikansk psykolog, undrade på <b>1950-talet</b> varför vissa besättningar på fartyg under andra världskriget samspelade bättre än andra, trots att besättningarna hade liknande bakgrund och utbildning. Utifrån sina studier av besättningarna skapade han teorin <b>FIRO</b>, <i>Fundamental Interpersonal Relations Orientation</i>. Många tar fortfarande upp den när man pratar om grupprocesser.</p>
        <p>Enligt FIRO beror gruppens <b>prestation och effektivitet på relationerna och samspelet</b> i gruppen. Schultz menade att grupper går igenom tre faser:</p>
        [[fig:firo]]
        <ol>
          <li><b>Tillhörandefasen:</b> medlemmarna ser sig inte som en grupp än, men börjar skapa ett sammanhang.</li>
          <li><b>Rollsökningsfasen:</b> de ser sig som en grupp och bestämmer roller och status. De mäter kompetens mot varandra och konflikter kan uppstå. Vissa grupper fastnar här.</li>
          <li><b>Samhörighetsfasen:</b> rollerna är bestämda och gruppen bygger relationer. Det ger samarbete och bättre resultat, men alla grupper når inte hit.</li>
        </ol>
        <h3>Gemyt och Idyll: två skenfaser</h3>
        <p>I bokens figur står orden <b>Gemyt</b> och <b>Idyll</b> mellan faserna. Boken förklarar dem inte, men i den svenska FIRO-litteraturen beskrivs de som <b>skenfaser</b>. Gruppen tror att den mår bra, men den har undvikit det jobbiga steget.</p>
        <div class="tablewrap"><table>
          <tr><th></th><th>Gemyt</th><th>Idyll</th></tr>
          <tr><th>Var</th><td>Mellan tillhörighet och rollsökning</td><td>Mellan rollsökning och samhörighet</td></tr>
          <tr><th>Hur det känns</th><td>Trevligt, skämt och god min</td><td>Lättnad, allt känns perfekt och alla är överens</td></tr>
          <tr><th>Vad som egentligen händer</th><td>Gruppen undviker konflikten om roller och status</td><td>Gruppen tror att den nått samhörighet, men problemen är bara undanstoppade</td></tr>
          <tr><th>Ser ut som</th><td>Samhörighet "för tidigt"</td><td>Samhörighet, men utan äkta öppenhet</td></tr>
        </table></div>
        <div class="note">Gemyt och Idyll står inte förklarade i boken. Förklaringen kommer från hur FIRO brukar beskrivas i Sverige. Kolla med läraren om du ska kunna begreppen till provet. Jämför gärna med sjufasmodellen: Idyll påminner om smekmånadsfasen.</div>`,
      check: [
        { q: "Vad fick Schultz att börja forska om grupper?", a: "Han undrade varför vissa fartygsbesättningar under andra världskriget samspelade bättre än andra, trots liknande bakgrund och utbildning." },
        { q: "Vad beror gruppens prestation på enligt FIRO?", a: "På relationerna och samspelet i gruppen." },
        { q: "I vilken fas fastnar vissa grupper, och varför är det dåligt?", a: "I rollsökningsfasen. Gruppen fortsätter att tävla om roller och status, och det skadar samspelet." }
      ]
    },
    {
      id: "tuckman", title: "Tuckmans fem faser",
      why: "Forming, storming, norming, performing och adjourning är lätta att minnas och vanliga på prov.",
      src: "Bok s. 188–189 · PPT kap 10, bild 19",
      html: `
        <p><b>Bruce Tuckman</b>, en amerikansk forskare, utvecklade FIRO-modellen. Hans teori beskriver gruppens process och samspel i <b>fem faser</b>, och i varje fas beter sig medlemmarna på olika sätt.</p>
        [[fig:tuckman]]
        <div class="tablewrap"><table>
          <tr><th>Fas</th><th>Vad händer</th></tr>
          <tr><td><b>1. Forming</b></td><td>Positiva och engagerade, men lite förvirrande eftersom samspelet inte är klart</td></tr>
          <tr><td><b>2. Storming</b></td><td>Alla söker sin plats, vilket ger konflikter. De måste lösas för att gruppen ska gå vidare</td></tr>
          <tr><td><b>3. Norming</b></td><td>Medlemmarna känner varandra och börjar samspela. Normer skapas</td></tr>
          <tr><td><b>4. Performing</b></td><td>Sammansvetsad grupp, fokus på samspel, mål och arbete</td></tr>
          <tr><td><b>5. Adjourning</b></td><td>Gruppen upplöses när målen är nådda (i vissa fall)</td></tr>
        </table></div>
        <div class="note">Minnesregel: på engelska rimmar alla faserna på "-orming" utom den sista, <b>adjourning</b>, som betyder ungefär "avsluta mötet".</div>
        <div class="warn">⚠ Listan "Att kunna till provet" stavar namnet "Tuckerman". Boken och PowerPointen skriver <b>Tuckman</b>.</div>`,
      check: [
        { q: "I vilken fas är energin lägst, och varför?", a: "I storming. Alla söker sin plats i gruppen, och osäkerheten leder till konflikter." },
        { q: "Vad skapas i norming-fasen?", a: "Normer. Medlemmarna har lärt känna varandra och börjar samspela." }
      ]
    },
    {
      id: "sjufas", title: "Sjufasmodellen (Lennéer Axelson och Thylefors)",
      why: "Den mest detaljerade modellen. Boken ber dig använda den för att beskriva din egen klass.",
      src: "Bok s. 189–190 · PPT kap 10, bild 20",
      html: `
        <p>Den sista modellen är en <b>kombination av många teorier</b>. Den beskrivs i den klassiska boken <i>Arbetsgruppens psykologi</i> av <b>Barbro Lennéer Axelson och Ingela Thylefors</b> och delar in grupprocessen i sju faser.</p>
        [[fig:sjufas]]
        <div class="tablewrap"><table>
          <tr><th>Fas</th><th>Kännetecken</th></tr>
          <tr><td><b>1. Initialfas</b></td><td>Osäkerhet, inga tydliga normer eller roller, alla visar sina bästa sidor, lite samspel</td></tr>
          <tr><td><b>2. Smekmånadsfas</b></td><td>"Den rätta" gruppen, avslappnat, mer kommunikation, trygghet, alla nöjda och eniga</td></tr>
          <tr><td><b>3. Integrationsfas</b></td><td>Vi-känsla, visar även dåliga sidor, undviker konflikter genom att fokusera på uppgiften, normer och roller</td></tr>
          <tr><td><b>4. Konfliktfas</b></td><td>Undvikna konflikter blir tydliga. Vissa vill vinna, andra vill tillbaka. Mindre grupper kan bildas</td></tr>
          <tr><td><b>5. Platåfas</b></td><td>Står still, likgiltighet, ingen utveckling</td></tr>
          <tr><td><b>6. Mognadsfas</b></td><td>Självständiga medlemmar, genuin respekt, klara mål och roller, tydlig kommunikation, arbetsfas</td></tr>
          <tr><td><b>7. Separationsfas</b></td><td>Gruppen upphör, till exempel ett grupparbete, en klass eller en nedläggning. Känslor som ångest, ilska, glädje, lättnad eller sorg</td></tr>
        </table></div>
        <p class="task">Beskriv grupprocessen i din klass eller grupp med begreppen från sjufasmodellen.</p>`,
      check: [
        { q: "Vad är skillnaden mellan integrationsfasen och konfliktfasen?", a: "I integrationsfasen visar man sina dåliga sidor men undviker konflikter genom att fokusera på uppgiften. I konfliktfasen kommer de undvikna konflikterna upp till ytan." },
        { q: "Vad kännetecknar platåfasen?", a: "Gruppen står still. Medlemmarna känner sig likgiltiga och tycker inte att de utvecklas eller kommer vidare." }
      ]
    },
    {
      id: "jamfor", title: "Jämför de tre modellerna",
      why: "På provet kan du få jämföra modellerna. Tabellen visar vilka faser som ungefär motsvarar varandra.",
      src: "Bok s. 187–190, 194 · PPT kap 10, bild 24",
      html: `
        <div class="note">Jämförelsen är min egen. Boken ställer inte upp modellerna bredvid varandra, men tabellen bygger på hur boken beskriver faserna.</div>
        <div class="tablewrap"><table>
          <tr><th>Ungefär samma läge</th><th>FIRO (Schultz)</th><th>Tuckman</th><th>Sjufasmodellen</th></tr>
          <tr><td>Ny grupp, osäkerhet</td><td>1. Tillhörande</td><td>1. Forming</td><td>1. Initialfas, 2. Smekmånad</td></tr>
          <tr><td>Roller och konflikter</td><td>2. Rollsökning</td><td>2. Storming</td><td>3. Integration, 4. Konflikt</td></tr>
          <tr><td>Normer och samspel</td><td rowspan="2">3. Samhörighet</td><td>3. Norming</td><td>(normer uppstår redan i 3. Integration)</td></tr>
          <tr><td>Gruppen arbetar effektivt</td><td>4. Performing</td><td>6. Mognad</td></tr>
          <tr><td>Stillastående</td><td>–</td><td>–</td><td>5. Platåfas</td></tr>
          <tr><td>Gruppen upphör</td><td>–</td><td>5. Adjourning</td><td>7. Separation</td></tr>
        </table></div>
        <h3>Likheter och skillnader</h3>
        <ul>
          <li><b>Gemensamt:</b> alla modellerna menar att grupper går igenom faser, att osäkerhet och konflikter om roller är en normal del av processen, och att gruppen blir effektiv först när relationerna fungerar.</li>
          <li><b>FIRO</b> är äldst och enklast (tre faser), och den bygger på studier av fartygsbesättningar.</li>
          <li><b>Tuckman</b> utvecklade FIRO och lade till att gruppen upplöses (adjourning).</li>
          <li><b>Sjufasmodellen</b> kombinerar många teorier och är mest detaljerad. Den har också med en <b>platåfas</b> där gruppen står still.</li>
        </ul>
        <p><b>Sammanfattning enligt boken:</b> gruppers samspel beror bland annat på gruppens <b>storlek</b> och gruppens <b>ledare</b>. Hur gruppen samspelar och utvecklas kallas grupprocesser eller gruppdynamik.</p>`,
      check: [
        { q: "Vilken fas finns bara i sjufasmodellen?", a: "Platåfasen, där gruppen står still och medlemmarna känner sig likgiltiga." },
        { q: "Vilka två saker påverkar enligt bokens sammanfattning hur en grupp samspelar?", a: "Gruppens storlek och gruppens ledare." }
      ]
    }
  ],

  terms: [
    { t: "Social identitetsteori", d: "Teorin om att vissa grupper (innegrupper) är viktiga för oss eftersom vi identifierar oss med medlemmarna, medan vi tar avstånd från andra (utegrupper).", src: "s. 186" },
    { t: "Innegrupp", d: "En grupp du tillhör och identifierar dig med. Den formar din identitet och ditt beteende.", src: "s. 186" },
    { t: "Utegrupp", d: "En grupp du inte tillhör och på olika sätt tar avstånd från. Även den formar dig.", src: "s. 186" },
    { t: "Grupprocesser (gruppdynamik)", d: "Hur enskilda medlemmar beter sig i gruppen och hur gruppen samspelar och utvecklas som helhet.", src: "s. 186, 194" },
    { t: "Undergrupper", d: "Mindre grupper som lätt bildas i stora grupper (sex, sju eller fler) eller i konfliktfasen, när arbetet delas upp.", src: "s. 187, 190" },
    { t: "Will Schultz", d: "Amerikansk psykolog som på 1950-talet studerade fartygsbesättningar under andra världskriget och skapade FIRO.", src: "s. 187" },
    { t: "FIRO", d: "Fundamental Interpersonal Relations Orientation (Schultz). Gruppens prestation och effektivitet beror på relationer och samspel. Tre faser: tillhörande, rollsökning, samhörighet.", src: "s. 187–188" },
    { t: "Tillhörandefasen", d: "FIRO fas 1: medlemmarna ser sig inte som en grupp än men börjar skapa ett sammanhang.", src: "s. 188" },
    { t: "Rollsökningsfasen", d: "FIRO fas 2: gruppen bestämmer roller och status, medlemmarna mäter kompetens och konflikter kan uppstå. Vissa grupper lämnar aldrig fasen.", src: "s. 188" },
    { t: "Gemyt (FIRO)", d: "Skenfas mellan tillhörighet och rollsökning: gruppen är trevlig på ytan men undviker konflikten om roller. Förklaras inte i boken, utan kommer från den svenska FIRO-litteraturen.", src: "Bokens figur s. 188 + Förklaring" },
    { t: "Idyll (FIRO)", d: "Skenfas mellan rollsökning och samhörighet: lättnad och allt verkar perfekt, men problemen är undanstoppade och den äkta öppenheten saknas. Förklaras inte i boken.", src: "Bokens figur s. 188 + Förklaring" },
    { t: "Samhörighetsfasen", d: "FIRO fas 3: rollerna är bestämda och gruppen bygger relationer, vilket ger samarbete och bättre resultat. Alla grupper når inte hit.", src: "s. 188" },
    { t: "Bruce Tuckman", d: "Amerikansk forskare som utvecklade FIRO till en modell med fem faser: forming, storming, norming, performing och adjourning.", src: "s. 188" },
    { t: "Forming", d: "Tuckman fas 1: positiva och engagerade medlemmar, men lite förvirrande eftersom samspelet inte är klart.", src: "s. 188" },
    { t: "Storming", d: "Tuckman fas 2: alla söker sin plats, vilket leder till konflikter som måste lösas för att gruppen ska gå vidare.", src: "s. 188" },
    { t: "Norming", d: "Tuckman fas 3: gruppen har formats, medlemmarna känner varandra och samspelar. Normer skapas.", src: "s. 189" },
    { t: "Performing", d: "Tuckman fas 4: gruppen är sammansvetsad och fokuserar på samspel, mål och arbete.", src: "s. 189" },
    { t: "Adjourning", d: "Tuckman fas 5: i vissa fall upplöses gruppen när målen är nådda och uppgifterna klara.", src: "s. 189" },
    { t: "Lennéer Axelson och Thylefors", d: "Barbro Lennéer Axelson och Ingela Thylefors skrev \"Arbetsgruppens psykologi\" med sjufasmodellen, en kombination av många teorier.", src: "s. 189" },
    { t: "Initialfas", d: "Sjufasmodellen fas 1: osäkra medlemmar, inga tydliga normer, alla vill hitta sin plats och visar sina bästa sidor, lite samspel.", src: "s. 189" },
    { t: "Smekmånadsfas", d: "Sjufasmodellen fas 2: man har hittat \"den rätta\" gruppen. Avslappnat, mer kommunikation, man känner sig trygg.", src: "s. 189" },
    { t: "Integrationsfas", d: "Sjufasmodellen fas 3: man visar även sina dåliga sidor men undviker konflikter genom att fokusera på uppgiften. Normer uppstår och roller fördelas.", src: "s. 189" },
    { t: "Konfliktfas", d: "Sjufasmodellen fas 4: de undvikna konflikterna blir tydliga. Vissa vill vinna, andra vill tillbaka till smekmånaden.", src: "s. 190" },
    { t: "Platåfas", d: "Sjufasmodellen fas 5: det står still, medlemmarna är likgiltiga och gruppen utvecklas inte.", src: "s. 190" },
    { t: "Mognadsfas", d: "Sjufasmodellen fas 6: självständiga medlemmar, genuin respekt, klara mål och roller, och gruppen arbetar mot målen.", src: "s. 190" },
    { t: "Separationsfas", d: "Sjufasmodellen fas 7: gruppen upphör (tidsbestämd eller nedlagd), och känslor som ångest, ilska, glädje, lättnad eller sorg kan dyka upp.", src: "s. 190" }
  ],

  quiz: [
    { t: "mc", q: "Vad kallas en grupp du inte tillhör och tar avstånd från?", o: ["Utegrupp", "Innegrupp", "Undergrupp", "Klick"], a: 0, why: "Enligt social identitetsteori formas vi både av innegrupper och av utegrupper.", src: "Bok s. 186" },
    { t: "mc", q: "Vilket annat ord används för grupprocesser?", o: ["Gruppdynamik", "Grupphierarki", "Gruppstorlek", "Gruppnorm"], a: 0, why: "Grupprocesser eller gruppdynamik handlar om hur medlemmarna beter sig och hur gruppen samspelar som helhet.", src: "Bok s. 186" },
    { t: "match", q: "Para ihop gruppstorleken med det som är typiskt.", pairs: [["2 personer", "Båda är aktiva, men svårt med stora arbeten"], ["3 personer", "Risk att två hittar varandra"], ["4–5 personer", "Fungerar även om någon är borta"], ["6–7 eller fler", "Tysta blir tystare och undergrupper bildas"]], why: "Ju större grupp, desto fler perspektiv men också mer struktur som behövs.", src: "Bok s. 187" },
    { t: "mc", q: "Vad studerade Will Schultz när han skapade FIRO?", o: ["Fartygsbesättningar under andra världskriget", "Skolklasser i Sverige", "Arbetsgrupper på kontor", "Fotbollslag"], a: 0, why: "Han undrade varför vissa besättningar samspelade bättre trots liknande bakgrund och utbildning.", src: "Bok s. 187" },
    { t: "order", q: "Sätt FIRO-modellens faser i rätt ordning.", items: ["Tillhörandefasen", "Rollsökningsfasen", "Samhörighetsfasen"], why: "Först sammanhang, sedan roller och status, sist relationer och samarbete.", src: "Bok s. 188" },
    { t: "tf", q: "\"Enligt FIRO når alla grupper till slut samhörighetsfasen.\"", a: false, why: "Falskt. Alla grupper når inte samhörighetsfasen, och vissa lämnar aldrig rollsökningsfasen.", src: "Bok s. 188" },
    { t: "order", q: "Sätt Tuckmans faser i rätt ordning.", items: ["Forming", "Storming", "Norming", "Performing", "Adjourning"], why: "Forming, storming, norming, performing och sist adjourning när gruppen upplöses.", src: "Bok s. 188–189" },
    { t: "mc", q: "I vilken av Tuckmans faser skapas normer?", o: ["Norming", "Forming", "Storming", "Adjourning"], a: 0, why: "I norming har gruppen formats, medlemmarna känner varandra och normer skapas.", src: "Bok s. 189" },
    { t: "mc", q: "Klassen har precis börjat. Alla är trevliga men osäkra och vet inte riktigt hur gruppen fungerar. Vilken fas hos Tuckman?", o: ["Forming", "Storming", "Performing", "Norming"], a: 0, why: "I forming är medlemmarna positiva och engagerade, men samspelet är inte klart än.", src: "Bok s. 188" },
    { t: "order", q: "Sätt sjufasmodellens faser i rätt ordning.", items: ["Initialfas", "Smekmånadsfas", "Integrationsfas", "Konfliktfas", "Platåfas", "Mognadsfas", "Separationsfas"], why: "Lennéer Axelson och Thylefors modell kombinerar många teorier.", src: "Bok s. 189–190" },
    { t: "mc", q: "Gruppen jobbar på, men alla är likgiltiga och tycker inte att något händer. Vilken fas i sjufasmodellen?", o: ["Platåfas", "Konfliktfas", "Mognadsfas", "Initialfas"], a: 0, why: "Platåfasen: det står still och gruppen utvecklas inte.", src: "Bok s. 190" },
    { t: "match", q: "Para ihop fasen med modellen den kommer från.", pairs: [["Rollsökningsfasen", "FIRO (Schultz)"], ["Storming", "Tuckman"], ["Smekmånadsfas", "Sjufasmodellen"]], why: "Tre modeller med olika namn på faser som delvis liknar varandra.", src: "Bok s. 188–190" },
    { t: "tf", q: "\"I integrationsfasen undviker gruppen konflikter genom att fokusera på uppgiften.\"", a: true, why: "Sant. Man visar sina dåliga sidor, men för att slippa konflikter fokuserar man på uppgiften. Konflikterna kommer upp i nästa fas.", src: "Bok s. 189" },
    { t: "mc", q: "Vilken modell är en kombination av många olika teorier?", o: ["Sjufasmodellen", "FIRO", "Tuckmans modell", "Social identitetsteori"], a: 0, why: "Lennéer Axelson och Thylefors modell i \"Arbetsgruppens psykologi\" kombinerar många teorier.", src: "Bok s. 189" },
    { t: "mc", q: "Vilka två saker påverkar bland annat gruppers samspel enligt bokens sammanfattning?", o: ["Gruppens storlek och ledare", "Gruppens ålder och kön", "Gruppens mål och lokal", "Gruppens namn och historia"], a: 0, why: "Bokens sammanfattning nämner storleken och ledaren.", src: "Bok s. 194" }
  ],

  essays: [
    {
      kind: "Jämför", q: "Beskriv och jämför FIRO-modellen, Tuckmans modell och sjufasmodellen. Vilka likheter och skillnader finns?",
      src: "Bok s. 187–190",
      model: `<p><b>FIRO</b> skapades av Will Schultz på 1950-talet efter studier av fartygsbesättningar. Gruppens prestation beror på relationer och samspel, och gruppen går igenom tillhörande, rollsökning och samhörighet. Alla grupper når inte samhörighet.</p>
        <p><b>Tuckman</b> utvecklade FIRO till fem faser: forming (positivt men oklart), storming (konflikter om platser), norming (normer skapas), performing (effektivt arbete) och adjourning (gruppen upplöses).</p>
        <p><b>Sjufasmodellen</b> av Lennéer Axelson och Thylefors kombinerar många teorier: initialfas, smekmånad, integration, konflikt, platå, mognad och separation.</p>
        <p><b>Likheter:</b> alla beskriver utvecklingen i faser. Osäkerhet i början och konflikter om roller hör till processen, och gruppen fungerar bäst när relationerna är på plats (samhörighet, performing, mognad). <b>Skillnader:</b> FIRO har bara tre faser och inget slut. Tuckman lägger till att gruppen upplöses. Sjufasmodellen är mest detaljerad, delar upp konflikterna i två steg (integration och konflikt) och har en platåfas där gruppen står still.</p>`,
      levels: {
        E: ["Beskriver minst två modeller med några faser", "Nämner en likhet eller skillnad"],
        C: ["Beskriver alla tre modellerna med faser i rätt ordning", "Jämför med både likheter och skillnader"],
        A: ["Visar vilka faser som motsvarar varandra", "Tar med bakgrund (Schultz fartyg, Tuckman bygger på FIRO, sjufas kombinerar)", "Drar en egen slutsats, till exempel om vilken modell som passar bäst för att beskriva en klass"]
      }
    },
    {
      kind: "Tillämpa", q: "Beskriv grupprocessen i din klass eller en annan grupp du varit med i. Använd begrepp från sjufasmodellen (eller Tuckman).",
      src: "Bok s. 189–190",
      model: `<p><i>Exempel på hur ett svar kan se ut:</i></p>
        <p>När vi började i ettan var vi i <b>initialfasen</b>: alla var osäkra, visade sina bästa sidor och det fanns inga normer för hur man skulle vara. Efter några veckor kom <b>smekmånaden</b>: alla tyckte att klassen var bra och vi gjorde mycket tillsammans. Under hösten kom <b>integrationsfasen</b>, när vi började se varandras dåliga sidor men undvek bråk genom att bara fokusera på skolarbetet, och normer som att alla sitter på samma platser uppstod. Inför ett stort grupparbete kom <b>konfliktfasen</b>: det blev bråk om arbetsfördelningen och några bildade en egen undergrupp. ... </p>
        <p>Avsluta med var gruppen är nu, till exempel <b>mognadsfasen</b> med respekt och tydliga roller, eller <b>platåfasen</b>, och med vad som kommer att hända i <b>separationsfasen</b> när ni slutar.</p>`,
      levels: {
        E: ["Använder några faser och kopplar dem till egna exempel"],
        C: ["Använder faserna i rätt ordning och beskriver kännetecknen korrekt", "Exemplen passar faserna tydligt"],
        A: ["Använder begreppen säkert (normer, roller, undergrupper, vi-känsla)", "Resonerar om varför gruppen hamnade i en viss fas och om modellen stämmer med verkligheten"]
      }
    }
  ]
},
{
  id: "ledarskap", ready: true, short: "Ledarskap",
  label: "Kap 10.3 · s. 191–194",
  title: "Hur leds en grupp?",
  desc: "Auktoritär, demokratisk och låt-gå-ledare, uppgifts- och relationsorienterat ledarskap, ledartyperna A–E, situationsanpassat ledarskap och Tafvelins transformerande ledarskap.",
  sections: [
    {
      id: "fodd", title: "Är man född till ledare?",
      why: "Den första idén om ledarskap handlade om personlighet. Forskningen har inte gett den något stort stöd.",
      src: "Bok s. 191 · PPT kap 10, bild 21",
      html: `
        <p>En viktig fråga om psykosocialt samspel är vem som ska leda en grupp, vem som är bäst på det och hur en grupp leds på bästa sätt.</p>
        <p>Först trodde man att en ledare var <b>"född till ledare"</b>, alltså att vissa människor har personlighetsegenskaper som gör dem till bättre ledare. Två egenskaper som särskilt lyftes fram var <b>intelligens</b> och att vara <b>talför</b>. Det synsättet har <b>inte fått något stort stöd i forskningen</b>.</p>
        <p class="task">Vilka egenskaper tycker du att en bra ledare ska ha?</p>`,
      check: [
        { q: "Vilka två egenskaper lyftes fram när man trodde att ledare var födda till ledare?", a: "Intelligens och att vara talför." },
        { q: "Vad säger forskningen om att vara född till ledare?", a: "Synsättet har inte fått något stort stöd i forskningen." }
      ]
    },
    {
      id: "stilar", title: "Tre klassiska ledarstilar",
      why: "Auktoritär, demokratisk och låt-gå är grunden. Lär dig vad som händer med produktiviteten när ledaren är borta.",
      src: "Bok s. 191 · PPT kap 10, bild 22",
      html: `
        <p>En rad klassiska ledarskapsstudier har lyft fram tre ledarstilar:</p>
        <div class="tablewrap"><table>
          <tr><th></th><th>Auktoritär</th><th>Demokratisk</th><th>Låt-gå</th></tr>
          <tr><th>Så leder hen</th><td>Ger order och lyssnar inte på gruppen</td><td>Samråder med gruppen</td><td>Passiv och ointresserad, leder inte</td></tr>
          <tr><th>När ledaren är där</th><td>Hög produktivitet</td><td>Oftast mer produktiv</td><td>Låg produktivitet, ibland lekstämning</td></tr>
          <tr><th>När ledaren är borta</th><td>Gruppen är beroende av ledaren</td><td>Gruppen kan arbeta ändå</td><td>Låg produktivitet</td></tr>
          <tr><th>Uppskattas?</th><td>Nej</td><td>Ja</td><td>Nej</td></tr>
        </table></div>
        <h3>Uppgift eller relationer?</h3>
        <p>En annan klassisk indelning:</p>
        <ul>
          <li><b>Uppgiftsorienterat ledarskap:</b> ledaren fokuserar på arbetet och på att nå målen. Det är mer auktoritärt.</li>
          <li><b>Relationsorienterat ledarskap:</b> ledaren fokuserar på att medlemmarna ska må bra och ha goda relationer. Det är mer demokratiskt eller låt-gå.</li>
        </ul>
        <p class="task">Ge exempel på ledare du har eller har haft med de olika stilarna. Stämmer beskrivningarna?</p>`,
      check: [
        { q: "Vilken ledarstil gör att gruppen kan arbeta även när ledaren inte är där?", a: "Den demokratiska. Den är oftast mer produktiv och uppskattas av gruppen." },
        { q: "Vad är skillnaden mellan uppgiftsorienterat och relationsorienterat ledarskap?", a: "Den uppgiftsorienterade ledaren fokuserar på arbetet och målen (mer auktoritärt). Den relationsorienterade fokuserar på att medlemmarna mår bra och har goda relationer (mer demokratiskt eller låt-gå)." }
      ]
    },
    {
      id: "typer", title: "Ledartyperna A–E",
      why: "Boken ber dig själv beskriva de fem ledartyperna i figuren. Här finns ett förslag.",
      src: "Bok s. 192",
      html: `
        <p>Om man kombinerar fokus på <b>uppgiften</b> med fokus på <b>relationerna</b> kan det uppstå ett antal ledartyper. Boken visar dem som punkterna A–E i ett diagram och ber dig beskriva dem.</p>
        [[fig:ledartyper]]
        <div class="note">Beskrivningarna nedan är mina tolkningar av figuren. Boken ger inga färdiga svar.</div>
        <div class="tablewrap"><table>
          <tr><th>Typ</th><th>Uppgift</th><th>Relationer</th><th>Liknar</th></tr>
          <tr><td><b>A</b></td><td>Hög</td><td>Låg</td><td>Uppgiftsorienterad, auktoritär</td></tr>
          <tr><td><b>B</b></td><td>Hög</td><td>Hög</td><td>Både mål och trivsel</td></tr>
          <tr><td><b>C</b></td><td>Låg</td><td>Låg</td><td>Låt-gå</td></tr>
          <tr><td><b>D</b></td><td>Låg</td><td>Hög</td><td>Relationsorienterad</td></tr>
          <tr><td><b>E</b></td><td>Mellan</td><td>Mellan</td><td>Balans, kompromiss</td></tr>
        </table></div>`,
      check: [
        { q: "Vilken ledartyp i figuren fokuserar mycket på uppgiften men lite på relationerna?", a: "A, som liknar det uppgiftsorienterade och mer auktoritära ledarskapet." }
      ]
    },
    {
      id: "situation", title: "Situationsanpassat ledarskap (Hersey och Blanchard)",
      why: "En bra ledare har ingen enda stil utan byter stil efter hur mogen gruppen är.",
      src: "Bok s. 192–193",
      html: `
        <p><b>Ken Blanchard och Paul Hersey</b>, två amerikanska ledarskapsexperter, tog fram en modell där en bra ledare är <b>flexibel</b> och anpassar sin stil efter situationen. Modellen kallas <b>det situationsanpassade ledarskapet</b>.</p>
        <p>En ledare som anpassar sitt ledarskap tar hänsyn till:</p>
        <ul><li>gruppens engagemang</li><li>gruppens motivation</li><li>gruppens skicklighet och mognad</li><li>uppgiftens svårighetsgrad</li><li>gruppens stabilitet.</li></ul>
        <p>Gruppens engagemang, motivation och skicklighet kan vara på <b>fyra nivåer</b>, där nivå 1 är lägst och nivå 4 högst. Enligt teorin ska gruppen utvecklas från nivå 1 till nivå 4.</p>
        [[fig:hersey]]
        <div class="tablewrap"><table>
          <tr><th>Mognadsnivå</th><th>Ledarstil</th><th>Så gör ledaren</th></tr>
          <tr><td><b>1</b> kan inte</td><td>Instruerande</td><td>Auktoritär, beordrande, envägskommunikation, exakta instruktioner, noggrann uppföljning</td></tr>
          <tr><td><b>2</b> kan lite, vill mycket</td><td>Tränande</td><td>Mycket förklaring och motivering, hög grad av genomförande, tvåvägskommunikation</td></tr>
          <tr><td><b>3</b> kan, men vill inte alltid</td><td>Deltagande</td><td>Lockar med medbestämmande och samarbete, gruppen får känna tillit, uppmuntrande kommunikation</td></tr>
          <tr><td><b>4</b> kan och vill</td><td>Delegerande</td><td>Ger gruppen ansvar för beslut och genomförande, kommunikation utifrån gruppens egna intressen</td></tr>
        </table></div>
        <div class="note">Minnesregel: <b>I-T-D-D</b>, alltså instruera, träna, delta, delegera. Ju mognare grupp, desto mer släpper ledaren taget.</div>`,
      check: [
        { q: "Vilken ledarstil passar en grupp på mognadsnivå 2 (kan lite men vill mycket)?", a: "Den tränande: mycket förklaring och motivering och tvåvägskommunikation." },
        { q: "Nämn tre saker en situationsanpassad ledare tar hänsyn till.", a: "Tre av dessa: gruppens engagemang, motivation, skicklighet och mognad, uppgiftens svårighetsgrad och gruppens stabilitet." }
      ]
    },
    {
      id: "tafvelin", title: "Dagens forskning: transformerande ledarskap",
      why: "Tafvelins metastudie svarar på frågan vilket ledarskap som ger både välmående och goda resultat.",
      src: "Bok s. 193–194 · PPT kap 10, bild 23",
      html: `
        <p>Vilka ledare är bäst? Vilket ledarskap kan leda till välbefinnande och god prestation, och därmed ett fungerande psykosocialt samspel? <b>Susanne Tafvelin</b>, docent i psykologi vid Umeå universitet, har gjort en studie om det.</p>
        [[study:tafvelin]]
        <div class="tablewrap"><table>
          <tr><th>Transformerande ledare</th><th>Destruktiv ledare</th></tr>
          <tr><td>1. Är en förebild som lever som hen lär<br>2. Har en positiv framtidsvision<br>3. Stimulerar nya idéer<br>4. Visar omtanke, lyssnar och coachar</td><td>Är aggressiv, direkt eller indirekt (drar sig undan och finns inte där)<br>Hotar och kränker<br>→ medarbetarna mår dåligt</td></tr>
        </table></div>
        <div class="note">Det transformerande ledarskapet liknar den demokratiska ledaren och typ B i figuren: det handlar både om mål (vision, nya idéer) och om relationer (förebild, omtanke).</div>`,
      check: [
        { q: "Vilka fyra beteenden kännetecknar det transformerande ledarskapet?", a: "Att vara en förebild, ha en positiv framtidsvision, stimulera nya idéer och visa omtanke." },
        { q: "Vad är en metastudie?", a: "En studie där man samlar in och sammanställer många andra studier. Tafvelin använde 30 studier." },
        { q: "Vad kan indirekt aggression hos en chef vara?", a: "Att dra sig undan och inte finnas där för medarbetarna." }
      ]
    }
  ],

  terms: [
    { t: "Född till ledare", d: "Den tidiga idén att vissa har personlighetsegenskaper, särskilt intelligens och att vara talför, som gör dem till bättre ledare. Har inte fått något stort stöd i forskningen.", src: "s. 191" },
    { t: "Auktoritär ledare", d: "Ger order och lyssnar inte. Hög produktivitet när ledaren är där, men gruppen är beroende av hen och uppskattar inte ledarskapet.", src: "s. 191" },
    { t: "Demokratisk ledare", d: "Samråder med gruppen, som kan arbeta även när ledaren är borta. Oftast mer produktiv och uppskattad.", src: "s. 191" },
    { t: "Låt-gå-ledare", d: "Passiv och ointresserad och leder inte gruppen. Ibland lekstämning. Låg produktivitet både med och utan ledaren, och ledaren uppskattas inte.", src: "s. 191" },
    { t: "Uppgiftsorienterat ledarskap", d: "Ledaren fokuserar på arbetet och på att nå målen (mer auktoritärt).", src: "s. 191" },
    { t: "Relationsorienterat ledarskap", d: "Ledaren fokuserar på att medlemmarna mår bra och har goda relationer (mer demokratiskt eller låt-gå).", src: "s. 191" },
    { t: "Situationsanpassat ledarskap", d: "Hersey och Blanchards modell: en bra ledare är flexibel och anpassar stilen efter gruppens engagemang, motivation, skicklighet och mognad, uppgiftens svårighet och gruppens stabilitet.", src: "s. 192" },
    { t: "Hersey och Blanchard", d: "Paul Hersey och Ken Blanchard, amerikanska ledarskapsexperter som skapade det situationsanpassade ledarskapet med fyra mognadsnivåer.", src: "s. 192" },
    { t: "Instruerande ledarstil", d: "Mognadsnivå 1 (kan inte): auktoritär, beordrande, envägskommunikation, exakta instruktioner och noggrann uppföljning.", src: "s. 193" },
    { t: "Tränande ledarstil", d: "Mognadsnivå 2 (kan lite, vill mycket): mycket förklaring och motivering, hög grad av genomförande, tvåvägskommunikation.", src: "s. 193" },
    { t: "Deltagande ledarstil", d: "Mognadsnivå 3 (kan, men vill inte alltid): lockar med medbestämmande och samarbete, gruppen får känna tillit, uppmuntrande kommunikation.", src: "s. 193" },
    { t: "Delegerande ledarstil", d: "Mognadsnivå 4 (kan och vill): ger gruppen ansvar för beslut och genomförande. Kommunikationen bygger på gruppens egna intressen och engagemang.", src: "s. 193" },
    { t: "Transformerande ledarskap", d: "Enligt Tafvelin m.fl. (2022) det ledarskap som fungerar bäst. Ledaren är en förebild, har en positiv framtidsvision, stimulerar nya idéer och visar omtanke.", src: "s. 193" },
    { t: "Destruktivt ledarskap", d: "En ledare som är aggressiv (direkt eller indirekt), hotar och kränker. Medarbetarna mår dåligt. Indirekt aggression är att dra sig undan och inte finnas där.", src: "s. 193" },
    { t: "Metastudie", d: "En studie som sammanställer många andra studier. Tafvelin m.fl. samlade in 30 studier om ledarskapsstilar.", src: "s. 193" }
  ],

  quiz: [
    { t: "mc", q: "Vilka egenskaper lyftes fram när man trodde att ledare var födda till ledare?", o: ["Intelligens och att vara talför", "Empati och omtanke", "Styrka och längd", "Ålder och erfarenhet"], a: 0, why: "Synsättet har inte fått något stort stöd i forskningen.", src: "Bok s. 191" },
    { t: "match", q: "Para ihop ledarstilen med beskrivningen.", pairs: [["Auktoritär", "Ger order och lyssnar inte, gruppen blir beroende"], ["Demokratisk", "Samråder, gruppen kan arbeta utan ledaren"], ["Låt-gå", "Passiv och ointresserad, låg produktivitet"]], why: "Bara den demokratiska ledaren uppskattas av gruppen.", src: "Bok s. 191" },
    { t: "mc", q: "Vilken ledare ger hög produktivitet bara när ledaren är på plats?", o: ["Den auktoritära", "Den demokratiska", "Låt-gå-ledaren", "Den delegerande"], a: 0, why: "Gruppen är beroende av den auktoritära ledaren och uppskattar inte ledarskapet.", src: "Bok s. 191" },
    { t: "tf", q: "\"Relationsorienterat ledarskap är mer auktoritärt.\"", a: false, why: "Falskt. Det uppgiftsorienterade ledarskapet är mer auktoritärt. Det relationsorienterade är mer demokratiskt eller låt-gå.", src: "Bok s. 191" },
    { t: "mc", q: "Vad går det situationsanpassade ledarskapet ut på?", o: ["Ledaren anpassar sin stil efter gruppen och situationen", "Ledaren har alltid samma stil", "Gruppen väljer ledare varje vecka", "Ledaren ska vara född till ledare"], a: 0, why: "Hersey och Blanchard menar att en bra ledare är flexibel.", src: "Bok s. 192" },
    { t: "order", q: "Sätt Hersey och Blanchards ledarstilar i rätt ordning, från mognadsnivå 1 till 4.", items: ["Instruerande", "Tränande", "Deltagande", "Delegerande"], why: "Ju mognare gruppen är, desto mer ansvar lämnar ledaren över.", src: "Bok s. 193" },
    { t: "match", q: "Para ihop mognadsnivån med beskrivningen av gruppen.", pairs: [["Nivå 1", "Kan inte"], ["Nivå 2", "Kan lite, vill mycket"], ["Nivå 3", "Kan, men vill inte alltid"], ["Nivå 4", "Kan och vill"]], why: "Gruppen ska enligt teorin utvecklas från nivå 1 till 4.", src: "Bok s. 193" },
    { t: "mc", q: "En nyanställd vet inte alls hur jobbet går till. Vilken ledarstil passar enligt Hersey och Blanchard?", o: ["Instruerande", "Delegerande", "Deltagande", "Låt-gå"], a: 0, why: "Nivå 1 (kan inte) kräver exakta instruktioner och noggrann uppföljning.", src: "Bok s. 193" },
    { t: "mc", q: "Ett erfaret lag kan jobbet och vill göra det. Vilken ledarstil passar?", o: ["Delegerande", "Instruerande", "Tränande", "Auktoritär"], a: 0, why: "Nivå 4 (kan och vill): ledaren ger gruppen ansvar för beslut och genomförande.", src: "Bok s. 193" },
    { t: "mc", q: "Vilken metod använde Tafvelin m.fl. (2022)?", o: ["Metastudie av 30 studier", "Ett enda experiment", "Observation av en skolklass", "Intervju med en chef"], a: 0, why: "21 av de 30 studierna kom från Norden, och de gjordes 2015–2020.", src: "Bok s. 193" },
    { t: "match", q: "Para ihop det transformerande ledarskapets beteenden med vad de innebär.", pairs: [["Vara en förebild", "Leva som man lär, gå att lita på"], ["Positiv framtidsvision", "Skapa mening och motivation"], ["Stimulera nya idéer", "Ge förutsättningar och handlingsutrymme"], ["Visa omtanke", "Lyssna och coacha"]], why: "Det här ledarskapet gav både välbefinnande och god prestation.", src: "Bok s. 193" },
    { t: "tf", q: "\"Enligt Tafvelin kan en chef som drar sig undan och inte finns där få medarbetarna att må dåligt.\"", a: true, why: "Sant. Det kallas indirekt aggression och räknas som destruktivt ledarbeteende.", src: "Bok s. 193" }
  ],

  essays: [
    {
      kind: "Jämför", q: "Beskriv och jämför de klassiska ledarstilarna med det situationsanpassade ledarskapet. Vilket synsätt tror du fungerar bäst i en skolklass?",
      src: "Bok s. 191–193",
      model: `<p>De <b>klassiska ledarstilarna</b> är tre. Den auktoritära ledaren ger order och lyssnar inte. Gruppen presterar när ledaren är där men blir beroende och uppskattar inte ledaren. Den demokratiska ledaren samråder, gruppen kan arbeta utan ledaren, den är oftast mer produktiv och uppskattas. Låt-gå-ledaren är passiv och ger låg produktivitet. Man kan också dela in ledare i uppgiftsorienterade och relationsorienterade.</p>
        <p>Det <b>situationsanpassade ledarskapet</b> (Hersey och Blanchard) menar att ingen stil alltid är bäst. Ledaren anpassar sig efter gruppens mognad: instruerande vid nivå 1 (kan inte), tränande vid nivå 2, deltagande vid nivå 3 och delegerande vid nivå 4 (kan och vill).</p>
        <p><b>Jämförelse:</b> de klassiska stilarna beskriver fasta sätt att leda, medan Hersey och Blanchard ser ledarskap som flexibelt. Den instruerande stilen liknar den auktoritära och den delegerande liknar en låt-gå-ledare, men i modellen är de rätt val i rätt situation. <b>Skolklass:</b> en lärare kan behöva vara instruerande när något är nytt och delegerande när klassen kan. Tafvelins forskning pekar på det transformerande ledarskapet som bäst för både välmående och prestation.</p>`,
      levels: {
        E: ["Beskriver de tre klassiska stilarna översiktligt", "Nämner situationsanpassat ledarskap"],
        C: ["Beskriver stilarnas effekter på produktivitet och trivsel", "Förklarar de fyra mognadsnivåerna och stilarna", "Jämför fasta stilar med flexibelt ledarskap"],
        A: ["Ser kopplingar (instruerande liknar auktoritär och så vidare)", "Använder Tafvelins forskning i resonemanget", "Drar en välmotiverad slutsats om skolklassen"]
      }
    },
    {
      kind: "Värdera", q: "Värdera Tafvelins studie. Vad kännetecknar ett gott ledarskap enligt dagens forskning, och hur säkert är resultatet?",
      src: "Bok s. 193–194",
      model: `<p>Tafvelin m.fl. (2022) gjorde en <b>metastudie</b> av 30 studier (21 från Norden) från 2015–2020 för att ta reda på vilket ledarskap som ger både välbefinnande och god prestation. Det <b>transformerande ledarskapet</b> fungerade bäst: ledaren är en förebild, har en positiv vision, stimulerar nya idéer och visar omtanke. Destruktiva ledare som är aggressiva, hotar, kränker eller drar sig undan får medarbetarna att må dåligt.</p>
        <p><b>Styrkor:</b> en metastudie väger ihop många studier, både experiment och enkäter, och de är nya och nordiska, vilket passar Sverige. <b>Svagheter:</b> resultatet blir aldrig bättre än studierna det bygger på. Många är enkäter där medarbetarna själva bedömer sin chef. Nordiskt fokus gör det svårare att generalisera till andra kulturer.</p>
        <p><b>Slutsats:</b> resultatet är ganska säkert eftersom det bygger på många studier, men man bör vara försiktig med att säga att samma ledarskap fungerar överallt.</p>`,
      levels: {
        E: ["Beskriver studiens syfte och resultat", "Nämner en styrka eller svaghet"],
        C: ["Förklarar vad en metastudie är", "Beskriver alla fyra beteendena och destruktivt ledarskap", "Väger styrkor mot svagheter"],
        A: ["Nyanserad värdering (urval, självrapport, generalisering)", "Drar en välgrundad slutsats om hur säkert resultatet är"]
      }
    }
  ]
},
{
  id: "normer", ready: true, short: "Normer & hjälp",
  label: "Kap 11 · s. 195–197",
  title: "Kan du bidra till ett bättre samhälle?",
  desc: "Sociala normer, gyllene regeln, reciprocitetsprincipen, Kitty Genovese och ansvarsspridning, och prosocialt beteende, antisocialt beteende och altruism.",
  sections: [
    {
      id: "normer", title: "Vad är normer, och varför följer vi dem?",
      why: "Normer styr nästan allt vi gör tillsammans med andra. Kapitlet börjar med var de kommer ifrån.",
      src: "Bok s. 195 · PPT kap 11, bild 2",
      html: `
        <p><b>Normer</b> är det du <b>bör göra</b>. Många tycker att det är tryggt att ha fasta normer att rätta sig efter. Men hur har normerna uppstått, och varför har vi just dessa?</p>
        <div class="tablewrap"><table>
          <tr><th>Var normer kommer ifrån</th><th>Förklaring</th></tr>
          <tr><td>De heliga skrifterna</td><td>Många fasta normer kommer därifrån. En del är föråldrade men lever kvar för att de ger <b>trygghet och samhörighet</b>, som är viktiga behov hos människor.</td></tr>
          <tr><td>Social inlärningsteori</td><td>Normer uppstår när vi <b>observerar och imiterar</b> andra människor.</td></tr>
          <tr><td>Social identitetsteori</td><td>Normer uppstår i de <b>innegrupper</b> vi tillhör.</td></tr>
        </table></div>
        <h3>Sociala normer</h3>
        <p>Många av våra normer är <b>sociala normer</b>. Det är positiva normer som gör att sociala relationer fungerar bättre och kanske även blir starkare. Det kan handla om</p>
        <ul>
          <li><b>ordning och reda</b>, till exempel att vi står i kö när vi ska betala i affären</li>
          <li><b>hjälpsamhet</b>, till exempel att du visar vägen för en turist som inte hittar</li>
          <li>sådant som skapar en <b>trevlig atmosfär</b>, till exempel att du hälsar på läraren när lektionen börjar.</li>
        </ul>
        <p>Vi behöver normer för att <b>kontrollera vårt eget beteende</b>, för att skapa <b>ordning</b> och för att kunna bygga <b>sociala relationer</b>. Normerna är en gemensam grund i en grupp, ett samhälle och en hel kultur. Därför följer de flesta oftast de normer som gäller.</p>
        <p class="task">Ge fler exempel på sociala normer.</p>`,
      check: [
        { q: "Varför lever föråldrade normer kvar enligt boken?", a: "För att de ger trygghet och samhörighet, som är viktiga behov hos människor." },
        { q: "Hur uppstår normer enligt social inlärningsteori?", a: "Genom att vi observerar och imiterar andra människor." },
        { q: "Ge tre exempel på sociala normer från boken.", a: "Att stå i kö i affären (ordning och reda), att visa vägen för en turist (hjälpsamhet) och att hälsa på läraren (trevlig atmosfär)." }
      ]
    },
    {
      id: "omsesidighet", title: "Gyllene regeln och reciprocitetsprincipen",
      why: "Ömsesidighet är en norm som många andra normer bygger på, och den finns i nästan alla kulturer.",
      src: "Bok s. 195–196 · PPT kap 11, bild 2–3",
      html: `
        <p>En grundläggande norm som finns i många kulturer är <b>normen om ömsesidighet</b>. Den verkar ha funnits länge, eftersom den finns i många religioner som <b>"den gyllene regeln"</b> och i det latinska uttrycket <b>"quid pro quo"</b>. I vardagen och i engelskspråkiga länder säger man "tjänster och gentjänster" eller "ge och ta". Normen bidrar till ett mer <b>socialt hållbart samhälle</b>.</p>
        <p>Den gyllene regeln finns i många religioner men även i filosofiska och etiska läror. Den kan formuleras på två sätt:</p>
        <div class="tablewrap"><table>
          <tr><th>Positivt</th><th>Negativt</th></tr>
          <tr><td>"Behandla andra såsom du själv vill bli behandlad."</td><td>"Behandla inte andra som du inte själv vill bli behandlad."</td></tr>
        </table></div>
        <div class="def"><b>Reciprocitetsprincipen</b>En norm som många andra normer bygger på. Om någon gör något mot dig förväntas du, eller har du rätt, att göra samma sak tillbaka.<cite>dictionary.apa.org</cite></div>
        <p>Normen om ömsesidighet går tillbaka på reciprocitetsprincipen.</p>
        <p class="task">Brukar du hjälpa andra? Om du hjälper någon, förväntar du dig då en gentjänst?</p>`,
      check: [
        { q: "Vad innebär reciprocitetsprincipen?", a: "Att om någon gör något mot dig förväntas du, eller har du rätt, att göra samma sak tillbaka. Många andra normer bygger på den." },
        { q: "Formulera den gyllene regeln positivt och negativt.", a: "Positivt: behandla andra såsom du själv vill bli behandlad. Negativt: behandla inte andra som du inte själv vill bli behandlad." }
      ]
    },
    {
      id: "genovese", title: "Kitty Genovese och ansvarsspridning",
      why: "Ett verkligt fall fick psykologer att börja forska om när vi hjälper andra och när vi inte gör det.",
      src: "Bok s. 196–197 · PPT kap 11, bild 3",
      html: `
        <p>Forskare har intresserat sig för frågor som: Hur mycket skulle du kunna hjälpa en annan människa? Skulle du hjälpa till om du riskerade att själv bli skadad eller till och med dödad?</p>
        <p>Det som fick många psykologer att intressera sig för frågorna var en tragisk händelse i <b>New York 1964</b>. En ung kvinna, <b>Kitty Genovese</b>, blev våldtagen och mördad. När polisen utredde brottet visade det sig att <b>38 människor</b> i närliggande bostäder hade både hört och sett brottet, men <b>ingen ingrep</b> för att hjälpa henne.</p>
        <div class="def"><b>Ansvarsspridning (åskådareffekten)</b>Psykologerna <b>John Darley och Bibb Latané</b> förklarade fallet med att ju fler åskådare som finns vid en händelse där man borde ingripa, desto mindre är chansen att någon faktiskt reagerar. Alla tror att någon annan ska ingripa, så ingen tar ansvar.<cite>Bok s. 196–197</cite></div>
        <h3>När hjälper vi?</h3>
        <div class="tablewrap"><table>
          <tr><th>Mer hjälp</th><th>Mindre hjälp</th></tr>
          <tr><td>Om en person ingriper följer andra efter</td><td>Ju fler åskådare, desto mindre hjälp (ansvarsspridning)</td></tr>
          <tr><td>Ju mer man kan identifiera sig med den som behöver hjälp</td><td>Ju större fara för en själv</td></tr>
          <tr><td>Om man har kunskaper, till exempel i sjukvård eller självförsvar</td><td></td></tr>
        </table></div>
        <div class="note">Praktiskt råd: om du behöver hjälp bland många människor, peka ut <b>en</b> person och säg vad hen ska göra. Då bryter du ansvarsspridningen. Det följer av teorin men står inte i boken.</div>`,
      check: [
        { q: "Vad hände med Kitty Genovese, och varför blev fallet viktigt för psykologin?", a: "Hon våldtogs och mördades i New York 1964. 38 grannar hörde eller såg brottet men ingen ingrep, vilket fick psykologer att forska om när människor hjälper." },
        { q: "Vad innebär ansvarsspridning?", a: "Ju fler åskådare, desto mindre chans att någon ingriper, eftersom alla tror att någon annan ska göra det (Darley och Latané)." },
        { q: "Nämn två saker som gör att vi hjälper mer.", a: "Två av dessa: att någon annan redan ingripit, att vi kan identifiera oss med personen och att vi har kunskaper som sjukvård eller självförsvar." }
      ]
    },
    {
      id: "prosocialt", title: "Prosocialt beteende, antisocialt beteende och altruism",
      why: "Tre begrepp som du måste kunna skilja på. De är grunden för nästa kapitel om varför vi hjälper.",
      src: "Bok s. 197–198 · PPT kap 11, bild 4–5",
      html: `
        <p>Varje dag hjälper människor andra på olika sätt. Vissa ger blod, skänker pengar eller är tränare för barn utan att få betalt. Det kallas <b>prosocialt beteende</b>. Det gäller även beteende som gynnar samhället som helhet, till exempel att donera pengar eller arbeta som volontär.</p>
        <div class="def"><b>Prosocialt beteende</b>Olika beteenden där man hjälper en eller flera andra människor. Det gynnar andra men inte en själv direkt.<cite>psycnet.apa.org</cite></div>
        <div class="def"><b>Antisocialt beteende</b>Olika beteenden där personen inte visar respekt för sociala normer om de står i vägen för personens impulser och mål.<cite>psykologiguiden.se</cite></div>
        <div class="def"><b>Altruism</b>Den som hjälper handlar osjälviskt. Man visar omtanke om andra utan att vänta sig något tillbaka, sätter sina egna intressen åt sidan och kanske betalar ett pris i tid, risk eller pengar.<cite>psykologiguiden.se · Popov m.fl. "Psychology"</cite></div>
        <p>Begreppet prosocialt beteende finns inte i de flesta ordböcker. Det skapades av forskare som motsatsen till <b>antisocialt beteende</b>.</p>
        <h3>Egoism eller äkta hjälpsamhet?</h3>
        <div class="tablewrap"><table>
          <tr><th>Egoistisk förklaring</th><th>Altruistisk förklaring</th></tr>
          <tr><td>Vi hjälper för att den vi hjälper sedan känner sig skyldig oss en gentjänst.</td><td>Människor kan vara genuint hjälpsamma. Denna "rena" form av prosocialt beteende kallas altruism.</td></tr>
        </table></div>
        <p>Det är svårt att dra en gräns mellan prosocialt och altruistiskt beteende. Det som ser helt altruistiskt ut är kanske inte det till 100 %, eftersom det kan ge en <b>inre belöning</b>: du tycker att du är en bra person när du hjälper.</p>
        <p>Forskare har funderat på om prosocialt beteende och altruism är <b>medfött</b>, <b>inlärt</b> eller beror på <b>kognitiva faktorer</b>. Det tar nästa kapitel upp.</p>
        <p class="task">Ge exempel på hur du hjälper andra, och på hur din familj eller dina vänner hjälper andra eller samhället.</p>`,
      check: [
        { q: "Vad är skillnaden mellan prosocialt beteende och altruism?", a: "Prosocialt beteende är allt hjälpande som gynnar andra men inte en själv direkt. Altruism är den \"rena\" formen där man hjälper helt osjälviskt, utan att vänta sig något tillbaka." },
        { q: "Varför är det svårt att veta om något är helt altruistiskt?", a: "För att hjälpandet kan ge en inre belöning: man tycker att man är en bra person." },
        { q: "Varför finns inte prosocialt beteende i de flesta ordböcker?", a: "Begreppet skapades av forskare som motsatsen till antisocialt beteende." }
      ]
    }
  ],

  terms: [
    { t: "Norm", d: "Det du bör göra. Normer ger trygghet och samhörighet, hjälper oss kontrollera vårt beteende, skapar ordning och gör det möjligt att bygga relationer.", src: "s. 195" },
    { t: "Sociala normer", d: "Positiva normer som gör att relationer fungerar bättre, till exempel ordning och reda (kö), hjälpsamhet (visa vägen) och trevlig atmosfär (hälsa).", src: "s. 195" },
    { t: "Social inlärningsteori", d: "Teorin om att vi lär oss, till exempel normer, genom att observera och imitera andra människor.", src: "s. 195, 200" },
    { t: "Normen om ömsesidighet", d: "En grundläggande norm i många kulturer: tjänster och gentjänster, ge och ta, quid pro quo. Bidrar till ett socialt hållbart samhälle.", src: "s. 195" },
    { t: "Den gyllene regeln", d: "Positivt: behandla andra såsom du själv vill bli behandlad. Negativt: behandla inte andra som du inte själv vill bli behandlad. Finns i religioner, filosofi och etik.", src: "s. 196" },
    { t: "Quid pro quo", d: "Latinskt uttryck för normen om ömsesidighet, ungefär \"något för något\".", src: "s. 195" },
    { t: "Reciprocitetsprincipen", d: "En norm som många andra bygger på: om någon gör något mot dig förväntas du, eller har du rätt, att göra samma sak tillbaka (APA).", src: "s. 196" },
    { t: "Kitty Genovese", d: "Kvinna som våldtogs och mördades i New York 1964. 38 grannar hörde eller såg brottet men ingen ingrep. Fallet startade forskningen om när vi hjälper.", src: "s. 196" },
    { t: "Ansvarsspridning (åskådareffekten)", d: "Darley och Latané: ju fler åskådare, desto mindre chans att någon ingriper, eftersom alla tror att någon annan ska göra det.", src: "s. 196–197" },
    { t: "Darley och Latané", d: "Psykologerna John Darley och Bibb Latané förklarade fallet Kitty Genovese med teorin om ansvarsspridning.", src: "s. 196" },
    { t: "Prosocialt beteende", d: "Olika beteenden där man hjälper en eller flera andra, vilket gynnar andra men inte en själv direkt. Till exempel att ge blod eller vara volontär.", src: "s. 197" },
    { t: "Antisocialt beteende", d: "Beteenden där personen inte respekterar sociala normer när de står i vägen för personens impulser och mål.", src: "s. 197" },
    { t: "Altruism", d: "Att hjälpa osjälviskt, utan att vänta sig något tillbaka, och kanske till en kostnad i tid, risk eller pengar. Den \"rena\" formen av prosocialt beteende.", src: "s. 197" },
    { t: "Inre belöning", d: "Känslan av att vara en bra person när man hjälper. Gör att det är svårt att veta om ett beteende är helt altruistiskt.", src: "s. 197" }
  ],

  quiz: [
    { t: "mc", q: "Vad är en norm enkelt uttryckt?", o: ["Det du bör göra", "En lag med straff", "En personlig åsikt", "En vetenskaplig teori"], a: 0, why: "Boken beskriver normer som det du bör göra.", src: "Bok s. 195" },
    { t: "match", q: "Para ihop varifrån normen kommer med förklaringen.", pairs: [["Heliga skrifter", "Fasta normer som ger trygghet och samhörighet"], ["Social inlärningsteori", "Vi observerar och imiterar andra"], ["Social identitetsteori", "Normer uppstår i våra innegrupper"]], why: "Boken ger tre förklaringar till hur normer uppstår.", src: "Bok s. 195" },
    { t: "mc", q: "Du hälsar på läraren när lektionen börjar. Vilken sorts social norm är det?", o: ["Sådant som skapar en trevlig atmosfär", "Ordning och reda", "Hjälpsamhet", "Reciprocitet"], a: 0, why: "Boken använder just det exemplet för trevlig atmosfär.", src: "Bok s. 195" },
    { t: "mc", q: "Vilket latinskt uttryck används för normen om ömsesidighet?", o: ["Quid pro quo", "Carpe diem", "Cogito ergo sum", "In vino veritas"], a: 0, why: "Quid pro quo betyder ungefär \"något för något\", alltså tjänster och gentjänster.", src: "Bok s. 195" },
    { t: "tf", q: "\"Den gyllene regeln kan bara formuleras positivt.\"", a: false, why: "Falskt. Den finns också negativt: behandla inte andra som du inte själv vill bli behandlad.", src: "Bok s. 196" },
    { t: "mc", q: "Vad innebär reciprocitetsprincipen?", o: ["Gör någon något mot dig förväntas du göra detsamma tillbaka", "Ju fler åskådare, desto mindre hjälp", "Man hjälper utan att vänta sig något", "Man följer alltid lagen"], a: 0, why: "Det är en norm som många andra normer bygger på (APA).", src: "Bok s. 196" },
    { t: "mc", q: "Hur många hörde eller såg brottet mot Kitty Genovese utan att ingripa?", o: ["38", "3", "12", "100"], a: 0, why: "38 människor i närliggande bostäder, och ingen hjälpte henne.", src: "Bok s. 196" },
    { t: "mc", q: "Vilka förklarade fallet Kitty Genovese med ansvarsspridning?", o: ["John Darley och Bibb Latané", "Hazan och Shaver", "Hersey och Blanchard", "Main och Solomon"], a: 0, why: "Alla tror att någon annan ska ingripa, så ingen tar ansvar.", src: "Bok s. 196" },
    { t: "tf", q: "\"Ju fler åskådare som finns, desto större är chansen att någon hjälper.\"", a: false, why: "Falskt. Enligt teorin om ansvarsspridning minskar chansen ju fler åskådarna är.", src: "Bok s. 196–197" },
    { t: "mc", q: "Vilket av följande gör att människor hjälper MINDRE enligt forskarna?", o: ["Stor fara för en själv", "Att någon annan redan ingripit", "Att man kan identifiera sig med offret", "Att man kan sjukvård"], a: 0, why: "Ju större fara för en själv, desto mindre hjälper man. De andra alternativen ökar hjälpsamheten.", src: "Bok s. 197" },
    { t: "match", q: "Para ihop begreppet med definitionen.", pairs: [["Prosocialt beteende", "Hjälper andra, gynnar inte en själv direkt"], ["Antisocialt beteende", "Respekterar inte normer som står i vägen för ens mål"], ["Altruism", "Osjälvisk hjälp utan att vänta sig något tillbaka"]], why: "Altruism är den \"rena\" formen av prosocialt beteende.", src: "Bok s. 197" },
    { t: "mc", q: "Varför är det svårt att avgöra om en handling är helt altruistisk?", o: ["Den kan ge en inre belöning", "Altruism finns inte", "Det står inte i ordböcker", "Den är alltid olaglig"], a: 0, why: "Man kan känna att man är en bra person när man hjälper, och det är en sorts belöning.", src: "Bok s. 197" }
  ],

  essays: [
    {
      kind: "Förklara", q: "Förklara varför människor följer normer och hur normen om ömsesidighet kan bidra till ett socialt hållbart samhälle.",
      src: "Bok s. 195–196",
      model: `<p>Normer är det vi bör göra. Många kommer från heliga skrifter och lever kvar för att de ger <b>trygghet och samhörighet</b>. Normer lärs också in genom att vi observerar och imiterar andra (social inlärningsteori), och de uppstår i våra innegrupper (social identitetsteori). Vi behöver normer för att kontrollera vårt beteende, skapa ordning och bygga relationer. Normerna är en gemensam grund i grupper, samhällen och kulturer, och därför följer de flesta dem.</p>
        <p><b>Normen om ömsesidighet</b>, den gyllene regeln, quid pro quo eller ge och ta, går tillbaka på reciprocitetsprincipen: gör någon något för dig förväntas du göra detsamma tillbaka. När människor hjälper varandra och vet att de får hjälp tillbaka skapas tillit och goda relationer. Det gör samhället mer <b>socialt hållbart</b>.</p>`,
      levels: {
        E: ["Beskriver vad normer är och ger exempel", "Nämner den gyllene regeln"],
        C: ["Förklarar flera orsaker till att normer uppstår och följs", "Förklarar reciprocitetsprincipen och kopplar den till hållbarhet"],
        A: ["Använder teorierna (social inlärning, social identitet) säkert", "Resonerar nyanserat, till exempel om föråldrade normer eller om ömsesidighet är egoistiskt"]
      }
    },
    {
      kind: "Förklara och tillämpa", q: "Förklara ansvarsspridning med hjälp av fallet Kitty Genovese. Vad avgör om människor hjälper eller inte?",
      src: "Bok s. 196–197",
      model: `<p>1964 våldtogs och mördades Kitty Genovese i New York. 38 grannar hörde eller såg brottet, men ingen ingrep. Psykologerna <b>Darley och Latané</b> förklarade det med <b>ansvarsspridning</b>: ju fler åskådare, desto mindre chans att någon reagerar, eftersom alla tror att någon annan ska göra det.</p>
        <p>Forskarna har också visat att vi hjälper <b>mer</b> om någon annan redan ingripit, om vi kan identifiera oss med den som behöver hjälp och om vi har kunskaper som sjukvård eller självförsvar. Vi hjälper <b>mindre</b> om faran för oss själva är stor.</p>
        <p>Exempel: om någon svimmar på en full perrong kan alla tro att någon annan ringer 112. Om en person går fram följer andra efter.</p>`,
      levels: {
        E: ["Återberättar fallet och nämner ansvarsspridning"],
        C: ["Förklarar ansvarsspridning korrekt med Darley och Latané", "Tar med faktorer som ökar och minskar hjälpandet"],
        A: ["Använder ett eget, välvalt exempel", "Resonerar om hur man kan motverka åskådareffekten"]
      }
    }
  ]
},
{
  id: "perspektiv", ready: true, short: "Tre förklaringar",
  label: "Kap 11.2–11.5 · s. 198–200",
  title: "Varför hjälper vi? Tre perspektiv",
  desc: "Biologiskt, behavioristiskt och kognitivt perspektiv på prosocialt beteende, med empati, Beama-studien, självschema och kognitiv dissonans.",
  sections: [
    {
      id: "fragan", title: "Medfött, inlärt eller tänkt? Perspektivkartan",
      why: "Provet vill att du har en helhetssyn: kan förklara prosocialt beteende utifrån alla tre perspektiven och jämföra dem.",
      src: "Bok s. 198, 200 · PPT kap 11, bild 5 och 9–10",
      html: `
        <p>Forskare har funderat på om prosocialt beteende och altruism är <b>medfött</b>, <b>inlärt</b> eller beror på <b>kognitiva faktorer</b>. De har alltså undersökt om prosocialt beteende beror på</p>
        <ul><li><b>medfödda instinkter</b> (biologiskt perspektiv)</li><li><b>inlärda beteenden</b> (behavioristiskt perspektiv)</li><li><b>logiska resonemang</b> (kognitivt perspektiv).</li></ul>
        <p>För att få en <b>helhetssyn</b> behöver du kunna alla tre förklaringarna.</p>
        [[fig:perspektiv]]
        <p class="task">Vad tror du? Vilket perspektiv förklarar bäst varför vi är prosociala: det biologiska, det behavioristiska eller det kognitiva? (fråga från PowerPointen)</p>`,
      check: [
        { q: "Vilka tre förklaringar till prosocialt beteende tar boken upp?", a: "Medfödda instinkter (biologiskt), inlärda beteenden (behavioristiskt) och logiska resonemang eller tankar (kognitivt)." },
        { q: "Vad menas med helhetssyn?", a: "Att man använder flera perspektiv tillsammans för att förklara ett beteende, i stället för bara ett." }
      ]
    },
    {
      id: "biologiskt", title: "Biologiska principer och processer",
      why: "Det biologiska perspektivet förklarar hjälpsamhet med evolutionen: det har lönat sig att hjälpa.",
      src: "Bok s. 198 · PPT kap 11, bild 6",
      html: `
        <p><b>Evolutionspsykologer</b> menar att prosocialt beteende är <b>medfött och nedärvt</b> från generationerna långt före oss. Det var nämligen gynnsamt att hjälpa andra, eftersom det gjorde att <b>gruppen överlevde</b>.</p>
        <p>Många menar också att förmågan att känna <b>empati</b> leder till prosocialt beteende. Även empatin är nedärvd, eftersom den fick gruppen att överleva.</p>
        <div class="def"><b>Empati</b>Förmågan att leva sig in i andra människors lycka eller olycka. Inlevelsen leder till ett behov av att stödja, trösta och hjälpa.<cite>psykologiguiden.se</cite></div>
        <p>Enligt evolutionspsykologerna var livet hårt i förhistorisk tid, och det var nödvändigt att hålla goda relationer för att överleva. Så uppstod empati och sociala normer som skapade sammanhållning i gruppen, i samhället och i kulturer. Hjälpsamheten finns alltså <b>nedärvd i våra gener</b>.</p>
        <div class="note">Koppling bakåt: Bowlby förklarade anknytningen på samma biologiska sätt (kap 10.2). Spädbarn är söta så att föräldrarna tar hand om dem.</div>`,
      check: [
        { q: "Hur förklarar evolutionspsykologer prosocialt beteende?", a: "Det är medfött och nedärvt, eftersom det var gynnsamt att hjälpa andra: det gjorde att gruppen överlevde." },
        { q: "Vad är empati, och varför är den nedärvd enligt det biologiska perspektivet?", a: "Förmågan att leva sig in i andras lycka eller olycka, vilket ger ett behov av att hjälpa. Den är nedärvd eftersom den hjälpte gruppen att överleva." }
      ]
    },
    {
      id: "inlart", title: "Inlärda beteenden (behaviorismen)",
      why: "Det behavioristiska perspektivet säger att hjälpsamhet kan läras in, och Beamas experiment ger stöd för det.",
      src: "Bok s. 199 · PPT kap 11, bild 7",
      html: `
        <p>Enligt <b>behaviorismen</b> och anhängarna av social inlärning beror prosocialt beteende på din <b>uppväxt och inlärning</b>. Din förmåga till empati och hur hjälpsam du är har formats av att omgivningen <b>uppskattat</b> när du visat sådana beteenden. Därmed har beteendena <b>förstärkts</b>.</p>
        <p>Att prosocialt beteende är inlärt får stöd i den här studien:</p>
        [[study:beama]]
        <p>Bokens sammanfattning nämner också <b>social inlärningsteori</b>, att vi lär oss genom att se och härma andra, och <b>behovet att passa in i innegrupper</b> som delar av inlärningsförklaringen. Inlärningen sker både i barndomen och i vuxenlivet.</p>
        <p class="task">Värdera studien med hjälp av kritiskt tänkande.</p>`,
      check: [
        { q: "Hur förklarar behaviorismen att en person är hjälpsam?", a: "Hjälpsamheten har lärts in under uppväxten. Omgivningen har uppskattat när personen hjälpt till, och det har förstärkt beteendet." },
        { q: "Vad visade Beamas experiment?", a: "Studenter som sett en film om prosocialt beteende hjälpte till mer vid en fejkad olycka (43 %) än en kontrollgrupp (25 %). Det stödjer att hjälpsamhet kan läras in." }
      ]
    },
    {
      id: "kognitivt", title: "Kognitiva principer och processer",
      why: "Det kognitiva perspektivet säger att vi hjälper på grund av hur vi tänker om oss själva.",
      src: "Bok s. 199–200 · PPT kap 11, bild 8",
      html: `
        <p>Prosocialt beteende kan också bero på dina <b>tankar och uppfattningar</b> om att hjälpa andra. Att vara empatisk och hjälpsam värderas högt i vårt samhälle. När du är det stärker du en positiv bild av dig själv, ditt <b>självschema</b>.</p>
        <p>Det kan också vara så att vi vill undvika <b>kognitiv dissonans</b>, och därför hjälper vi andra. Psykologen <b>Leon Festinger</b> skapade begreppet <b>1957</b>.</p>
        <div class="def"><b>Kognitiv dissonans</b>Vi strävar efter att våra värderingar, attityder, tankar, uppfattningar och handlingar ska stämma överens. När de inte gör det upplever vi dissonans.<cite>psykologiguiden.se</cite></div>
        <p>Att <b>inte</b> hjälpa skulle skapa en dissonans, alltså brist på överensstämmelse, mellan dina <b>värderingar</b> (det finns en "status" i att vara hjälpsam) och dina <b>uppfattningar</b> (det går emot normen om tjänster och gentjänster). Därför visar du empati och hjälpsamhet.</p>
        <div class="note">Exempel: du tycker att du är en schysst person, men du går förbi en kompis som tappat alla sina böcker. Det skaver, och det skavet är dissonansen. Att hjälpa till får tanke och handling att stämma igen.</div>`,
      check: [
        { q: "Vad är ett självschema i det här sammanhanget?", a: "Bilden du har av dig själv. När du är hjälpsam stärker du en positiv bild av dig själv som en bra och empatisk person." },
        { q: "Vem skapade begreppet kognitiv dissonans, och när?", a: "Leon Festinger, 1957." },
        { q: "Varför skulle kognitiv dissonans få oss att hjälpa?", a: "Att inte hjälpa skulle krocka med våra värderingar och med normen om tjänster och gentjänster. För att slippa den obehagliga känslan hjälper vi." }
      ]
    },
    {
      id: "jamfor", title: "Jämför och värdera de tre förklaringarna",
      why: "Boken ber dig jämföra och värdera förklaringarna. Det är en typisk A-fråga på provet.",
      src: "Bok s. 200 · PPT kap 11, bild 10",
      html: `
        <div class="tablewrap"><table>
          <tr><th></th><th>Biologiskt</th><th>Behavioristiskt</th><th>Kognitivt</th></tr>
          <tr><th>Grundidé</th><td>Medfött och nedärvt</td><td>Inlärt genom uppväxt och förstärkning</td><td>Beror på tankar och uppfattningar</td></tr>
          <tr><th>Varför vi hjälper</th><td>Gruppen överlevde, empati finns i generna</td><td>Omgivningen har uppskattat och förstärkt hjälpsamhet. Vi härmar andra och vill passa in</td><td>Stärker självschemat, undviker kognitiv dissonans</td></tr>
          <tr><th>Nyckelord</th><td>Evolutionspsykologi, empati</td><td>Förstärkning, social inlärning, innegrupp</td><td>Självschema, Festinger, dissonans</td></tr>
          <tr><th>Stöd i boken</th><td>Evolutionsteorin</td><td>Beamas experiment (43 % mot 25 %)</td><td>Festingers begrepp</td></tr>
          <tr><th>Styrka</th><td>Förklarar varför hjälpsamhet finns i alla kulturer</td><td>Visar att hjälpsamhet går att lära ut, och det stöds av ett experiment</td><td>Förklarar varför vi hjälper även när ingen ser oss</td></tr>
          <tr><th>Svaghet</th><td>Svårt att bevisa med experiment, och förklarar inte varför vissa inte hjälper</td><td>Förklarar inte varför små barn hjälper innan de hunnit lära sig så mycket</td><td>Tankar är svåra att mäta, och vi hjälper ibland blixtsnabbt utan att tänka</td></tr>
        </table></div>
        <div class="note">Raderna Styrka och Svaghet är mina egna förslag. Boken ber dig själv värdera förklaringarna med avsnitt 1.5 Kritiskt tänkande.</div>
        <h3>Bokens sammanfattning</h3>
        <p>Att vara hjälpsam och visa empati bygger på att vi människor är <b>sociala varelser</b>. Att uppmuntra allt prosocialt beteende kan leda till ett mer <b>socialt hållbart samhälle</b>, eftersom sådana beteenden skapar goda relationer. Vårt prosociala beteende verkar komma från</p>
        <ul>
          <li>vårt behov av att <b>överleva som grupp</b> (biologisk förklaring med evolutionsteorin)</li>
          <li><b>inlärning</b> både i barndomen och i vuxenlivet (behaviorism, social inlärningsteori och behovet av att passa in i innegrupper)</li>
          <li>dina <b>upplevelser och tankar</b> (kognitiva förklaringar).</li>
        </ul>
        <div class="note">Helhetssyn i praktiken: troligen samverkar alla tre. Vi föds med en förmåga till empati (biologi), den förstärks när vi blir uppskattade för att hjälpa (inlärning), och vi fortsätter för att det passar vår bild av oss själva (kognition).</div>`,
      check: [
        { q: "Vilket perspektiv får stöd av ett experiment i boken?", a: "Det behavioristiska (inlärning), genom Beamas studie." },
        { q: "Hur kan prosocialt beteende bidra till ett socialt hållbart samhälle?", a: "Det skapar goda sociala relationer, och sådana relationer gör samhället hållbart." }
      ]
    }
  ],

  terms: [
    { t: "Evolutionspsykologi", d: "Synsättet att beteenden som hjälpsamhet är medfödda och nedärvda, eftersom de gjorde att gruppen överlevde.", src: "s. 198" },
    { t: "Empati", d: "Förmågan att leva sig in i andras lycka eller olycka, vilket leder till ett behov av att stödja, trösta och hjälpa. Enligt det biologiska perspektivet nedärvd.", src: "s. 198" },
    { t: "Biologiskt perspektiv (prosocialt)", d: "Prosocialt beteende är medfött. Att hjälpa andra gjorde att gruppen överlevde, och hjälpsamheten finns i generna.", src: "s. 198" },
    { t: "Behaviorism (prosocialt)", d: "Prosocialt beteende är inlärt. Omgivningens uppskattning har förstärkt empati och hjälpsamhet under uppväxten.", src: "s. 199" },
    { t: "Förstärkning", d: "När ett beteende uppskattas, till exempel att hjälpa till, blir det vanligare. Det är kärnan i behaviorismens förklaring.", src: "s. 199" },
    { t: "Beama m.fl. (1978)", d: "Experiment: studenter som sett en film om prosocialt beteende hjälpte mer vid en fejkad olycka två veckor senare (43 %) än en kontrollgrupp (25 %).", src: "s. 199" },
    { t: "Kognitivt perspektiv (prosocialt)", d: "Prosocialt beteende beror på våra tankar och uppfattningar. Vi hjälper för att stärka vårt självschema och undvika kognitiv dissonans.", src: "s. 199–200" },
    { t: "Självschema", d: "Den bild du har av dig själv. Att vara hjälpsam stärker en positiv bild av dig själv, eftersom hjälpsamhet värderas högt.", src: "s. 199" },
    { t: "Kognitiv dissonans", d: "Obehaget när värderingar, attityder, tankar, uppfattningar och handlingar inte stämmer överens. Vi strävar efter att de ska stämma (Festinger 1957).", src: "s. 199" },
    { t: "Leon Festinger", d: "Psykolog som skapade begreppet kognitiv dissonans 1957.", src: "s. 199" },
    { t: "Helhetssyn", d: "Att förklara ett beteende med flera perspektiv tillsammans. För prosocialt beteende: biologiskt, behavioristiskt och kognitivt.", src: "s. 198, 200" },
    { t: "Socialt hållbart samhälle", d: "Ett samhälle med goda sociala relationer. Prosocialt beteende, empati och normen om ömsesidighet bidrar till det.", src: "s. 195, 200" }
  ],

  quiz: [
    { t: "match", q: "Para ihop perspektivet med förklaringen till prosocialt beteende.", pairs: [["Biologiskt", "Medfött, gruppen överlevde"], ["Behavioristiskt", "Inlärt, förstärkt av omgivningens uppskattning"], ["Kognitivt", "Tankar, självschema och dissonans"]], why: "Tre perspektiv ger en helhetssyn.", src: "Bok s. 198–200" },
    { t: "mc", q: "\"Människor hjälper varandra för att hjälpsamma grupper överlevde i förhistorisk tid.\" Vilket perspektiv?", o: ["Biologiskt", "Behavioristiskt", "Kognitivt", "Psykodynamiskt"], a: 0, why: "Evolutionspsykologerna menar att hjälpsamheten är nedärvd i generna.", src: "Bok s. 198" },
    { t: "mc", q: "\"Leo hjälper till hemma för att han alltid fått beröm när han gjort det.\" Vilket perspektiv?", o: ["Behavioristiskt", "Biologiskt", "Kognitivt", "Evolutionspsykologiskt"], a: 0, why: "Beröm är en förstärkning, och det är behaviorismens förklaring.", src: "Bok s. 199" },
    { t: "mc", q: "\"Sara hjälper en främling för att hon ser sig själv som en snäll person.\" Vilket perspektiv?", o: ["Kognitivt", "Biologiskt", "Behavioristiskt", "Social identitetsteori"], a: 0, why: "Hon stärker sitt självschema, vilket är en kognitiv förklaring.", src: "Bok s. 199" },
    { t: "mc", q: "Vad är empati enligt psykologiguiden?", o: ["Förmågan att leva sig in i andras lycka eller olycka", "Att hjälpa utan att vänta sig något", "Obehaget när tankar och handlingar krockar", "Att följa normer"], a: 0, why: "Inlevelsen leder till ett behov av att stödja, trösta och hjälpa.", src: "Bok s. 198" },
    { t: "tf", q: "\"Enligt det biologiska perspektivet är också vår förmåga till empati nedärvd.\"", a: true, why: "Sant. Empatin fick gruppen att överleva och är därför nedärvd.", src: "Bok s. 198" },
    { t: "mc", q: "Vad var syftet med Beamas studie (1978)?", o: ["Undersöka om vi kan lära människor att bli hjälpsamma", "Mäta hur mycket empati som är ärftligt", "Undersöka ansvarsspridning", "Mäta kognitiv dissonans"], a: 0, why: "Studien stödjer att prosocialt beteende är inlärt.", src: "Bok s. 199" },
    { t: "match", q: "Para ihop siffrorna i Beamas studie.", pairs: [["Sett filmen om prosocialt beteende", "43 % hjälpte"], ["Kontrollgruppen", "25 % hjälpte"], ["Tid mellan film och olycka", "Två veckor"]], why: "Skillnaden mellan grupperna tyder på att filmen påverkade hjälpsamheten.", src: "Bok s. 199" },
    { t: "mc", q: "Vem skapade begreppet kognitiv dissonans?", o: ["Leon Festinger (1957)", "John Bowlby (1950)", "Erik H. Erikson (1959)", "Bibb Latané (1964)"], a: 0, why: "Festinger, 1957.", src: "Bok s. 199" },
    { t: "tf", q: "\"Kognitiv dissonans innebär att vi strävar efter att tankar och handlingar ska stämma överens.\"", a: true, why: "Sant. När de inte stämmer upplever vi dissonans, och då kan vi till exempel börja hjälpa till.", src: "Bok s. 199" },
    { t: "mc", q: "Varför skulle det skapa dissonans att INTE hjälpa enligt boken?", o: ["Det krockar med att hjälpsamhet ger status och med normen om tjänster och gentjänster", "Det krockar med våra gener", "Det är olagligt", "Det ger ingen förstärkning"], a: 0, why: "Värderingar och uppfattningar går emot handlingen, så vi hjälper hellre.", src: "Bok s. 199–200" },
    { t: "mc", q: "Enligt bokens sammanfattning kommer prosocialt beteende från tre saker. Vilken hör INTE dit?", o: ["Straff från samhället", "Behovet av att överleva som grupp", "Inlärning i barndom och vuxenliv", "Upplevelser och tankar"], a: 0, why: "Straff nämns inte. De tre ursprungen är biologi, inlärning och tankar.", src: "Bok s. 200" }
  ],

  essays: [
    {
      kind: "Jämför och värdera", q: "Jämför de tre förklaringarna till prosocialt beteende (biologisk, behavioristisk och kognitiv). Värdera förklaringarna och diskutera vilken som är mest övertygande.",
      src: "Bok s. 198–200",
      model: `<p><b>Biologiskt</b> menar evolutionspsykologer att prosocialt beteende är medfött. Att hjälpa andra gjorde att gruppen överlevde, och även empatin, förmågan att leva sig in i andras lycka eller olycka, är nedärvd. Hjälpsamheten finns alltså i generna.</p>
        <p><b>Behavioristiskt</b> är hjälpsamhet inlärd. När omgivningen uppskattat att vi hjälper har beteendet förstärkts. Vi lär oss också genom att härma andra (social inlärningsteori) och för att passa in i innegrupper. Beama m.fl. (1978) visade att studenter som sett en film om att hjälpa hjälpte mer vid en fejkad olycka (43 %) än en kontrollgrupp (25 %).</p>
        <p><b>Kognitivt</b> hjälper vi på grund av våra tankar. Det stärker vårt självschema, och vi slipper kognitiv dissonans (Festinger 1957) mellan värderingar och handling.</p>
        <p><b>Värdering:</b> den behavioristiska förklaringen har stöd av ett experiment med kontrollgrupp, men bara med studenter, och de flesta hjälpte ändå inte. Den biologiska förklarar varför hjälpsamhet finns överallt men är svår att testa. Den kognitiva förklarar varför vi hjälper även när ingen ser oss, men tankar är svåra att mäta. <b>Slutsats:</b> ingen förklaring räcker ensam. En helhetssyn är mest övertygande: vi föds med en förmåga till empati, den förstärks genom inlärning och den upprätthålls av hur vi ser på oss själva.</p>`,
      levels: {
        E: ["Beskriver de tre förklaringarna översiktligt", "Gör en enkel värdering"],
        C: ["Förklarar varje perspektiv med begrepp (evolution, förstärkning, dissonans)", "Använder Beamas studie", "Jämför och väger styrkor mot svagheter"],
        A: ["Värderar nyanserat, inklusive studiens begränsningar", "Argumenterar för en helhetssyn eller ett välmotiverat val", "Säker begreppsanvändning och tydlig struktur"]
      }
    },
    {
      kind: "Tillämpa", q: "Välj ett exempel på prosocialt beteende (till exempel att ge blod eller hjälpa en främling). Förklara det utifrån alla tre perspektiven.",
      src: "Bok s. 197–200",
      model: `<p><i>Exempel: Amir ger blod varje halvår.</i></p>
        <p><b>Biologiskt:</b> Amirs empati gör att han kan leva sig in i hur det är att behöva blod. Enligt evolutionspsykologin är empatin nedärvd, eftersom grupper där man hjälpte varandra överlevde.</p>
        <p><b>Behavioristiskt:</b> Amirs föräldrar gav blod och fick beröm för det, och Amir har sett och härmat dem (social inlärning). Själv får han tack och uppskattning när han lämnar blod, vilket förstärker beteendet.</p>
        <p><b>Kognitivt:</b> Amir ser sig själv som en ansvarsfull person (självschema). Om han slutade skulle det krocka med hans värderingar, och den kognitiva dissonansen får honom att fortsätta.</p>
        <p><b>Är det altruism?</b> Kanske inte helt, eftersom han kan få en inre belöning av att känna sig som en bra person.</p>`,
      levels: {
        E: ["Förklarar exemplet med minst två perspektiv"],
        C: ["Förklarar exemplet med alla tre perspektiv och rätt begrepp"],
        A: ["Kopplar till altruism och inre belöning", "Resonerar om vilket perspektiv som förklarar exemplet bäst"]
      }
    }
  ]
}
]
};

/* Korta namn i kapitelmenyn och minnesknep för varje kapitel */
window.ATLAS.nav = {
  identitet: { vad: "Vad är identitet?", stern: "Daniel Stern", erikson: "Eriksons femte fas", marcia: "Marcias statusar", livet: "Genom livet", sjalvbild: "Självbild & självkänsla" },
  anknytning: { bowlby: "Oxytocin & Bowlby", ainsworth: "Ainsworth", stilar: "Stilarna A–D", hazan: "Hazan & Shaver", lek: "Lek & jämnåriga", vuxen: "Hela livet" },
  grupper: { grupp: "Inne- & utegrupper", storlek: "Gruppstorlek", firo: "FIRO", tuckman: "Tuckman", sjufas: "Sjufasmodellen", jamfor: "Jämför modellerna" },
  ledarskap: { fodd: "Född till ledare?", stilar: "Tre ledarstilar", typer: "Ledartyper A–E", situation: "Situationsanpassat", tafvelin: "Tafvelin (2022)" },
  normer: { normer: "Normer", omsesidighet: "Gyllene regeln", genovese: "Kitty Genovese", prosocialt: "Prosocialt & altruism" },
  perspektiv: { fragan: "Perspektivkartan", biologiskt: "Biologiskt", inlart: "Inlärt (Beama)", kognitivt: "Kognitivt", jamfor: "Jämför & värdera" }
};
window.ATLAS.tricks = {
  identitet: "<p><b>Stern</b> = K-S-V-B: kärnsjälv → subjektivt → verbalt → berättande. · <b>Erikson</b> = femte fasen 13–19 år: identitet eller rollförvirring. · <b>Marcia</b> = två frågor: har hen utforskat? har hen engagemang? Nej/ja = förutfattad, nej/nej = förvirring, ja/vagt = moratorium, ja/ja = etablerad. · <b>Självkänsla</b> = vem jag är värd, <b>självförtroende</b> = vad jag klarar.</p>",
  anknytning: "<p><b>Bowlby</b> = biologin: evolution och fyra stadier. · <b>Ainsworth</b> = observationen: Strange Situation i 7 steg. · Stilar: <b>A</b> = avstånd, <b>B</b> = trygg bas, <b>C</b> = kluven, <b>D</b> = desorganiserad. · <b>Hazan & Shaver</b> = barndom → kärlek: 56/20/24 %. · Lek: bredvid → öva → vild → roll → regler → klick.</p>",
  grupper: "<p><b>3 → 5 → 7:</b> FIRO har 3 faser, Tuckman 5, sjufasmodellen 7. · Tuckman rimmar: <b>forming, storming, norming, performing</b> … och sist <b>adjourning</b>. · Gemyt och idyll = skenfaser där man låtsas att allt är bra. · Samspelet beror på gruppens <b>storlek</b> och <b>ledare</b>.</p>",
  ledarskap: "<p>Klassiskt: <b>auktoritär</b> (order), <b>demokratisk</b> (samråd), <b>låt-gå</b> (passiv). · Hersey & Blanchard: <b>I-T-D-D</b>, alltså instruera, träna, delta, delegera, när gruppen mognar från nivå 1 till 4. · Tafvelin: <b>förebild, vision, idéer, omtanke</b> = transformerande ledarskap.</p>",
  normer: "<p><b>Norm</b> = det du bör göra. · <b>Reciprocitet</b> = ge och ta, quid pro quo, den gyllene regeln. · <b>Fler åskådare = mindre hjälp</b> (Darley & Latané, Kitty Genovese 1964, 38 vittnen). · <b>Prosocialt</b> = all hjälp, <b>altruism</b> = den osjälviska formen, <b>antisocialt</b> = motsatsen.</p>",
  perspektiv: "<p><b>Bio</b> = medfött: gruppen överlevde, empatin finns i generna. · <b>Behaviorism</b> = inlärt: förstärkning, Beama 43 % mot 25 %. · <b>Kognition</b> = tankar: självschema och kognitiv dissonans (Festinger 1957). · Alla tre tillsammans = <b>helhetssyn</b>.</p>"
};

/* Den röda tråden på sidan Studier: teori → studie → slutsats. Kopplingarna följer bokens text. */
window.ATLAS.thread = [
  {
    ch: "identitet", q: "Går alla tonåringar igenom en identitetskris?",
    steps: [
      { type: "teori", title: "Erik H. Erikson: psykosocial utveckling", text: "Vi utvecklas genom kriser. I den <b>femte fasen (13–19 år)</b> blir identiteten fast genom krisen <b>identitet eller rollförvirring</b>. Erikson såg krisen hos ungdomar i två ursprungsfolk i USA.", src: "s. 174–175" },
      { link: "Stämmer det? Kidwell testade teorin", rel: "stödjer", study: "kidwell" },
      { link: "Men Rutter kom fram till något annat", rel: "säger emot", study: "rutter" },
      { type: "slutsats", text: "Det finns få studier som stödjer Erikson, och teorin kritiseras för <b>fasta faser</b> och <b>strikt åldersindelning</b>.", src: "s. 175" },
      { link: "Därför byggde Marcia vidare", type: "teori", title: "James Marcia: fyra identitetsstatusar", text: "Kris, utforskning och engagemang ger fyra statusar: <b>förutfattad, identitetsförvirring, moratorium och etablerad</b>. De kommer <b>inte i bestämd ordning</b> och är inte bestående, så alla behöver inte ha samma kris.", src: "s. 176–177" },
      { link: "Klimstra testade Erikson och Marcia", rel: "stödjer", study: "klimstra" },
      { type: "slutsats", text: "Att testa roller och hitta engagemang verkar vara något 12–16-åringar håller på med. Ungdomar med etablerad identitet har fler engagemang och högre självförtroende.", src: "s. 177–178" }
    ]
  },
  {
    ch: "anknytning", q: "Påverkar de första banden resten av livet?",
    steps: [
      { type: "teori", title: "John Bowlby: anknytningsteorin", text: "Spädbarn är genom evolutionen hjälplösa men söta, och föräldrar har medfödda mekanismer för att ta hand om dem. Anknytningen följer <b>fyra stadier</b>, och en god anknytning ger goda <b>relationsscheman</b> inför senare relationer.", src: "s. 179" },
      { link: "Ainsworth gjorde teorin mätbar", rel: "bygger vidare", study: "ainsworth" },
      { type: "slutsats", text: "Fyra stilar: <b>A undvikande, B trygg, C ambivalent, D oorganiserad</b> (D lades till av Main och Solomon 1986). Trygga barn har ett mognare samspel med jämnåriga.", src: "s. 180–181" },
      { link: "Följer stilen med in i vuxenlivet?", rel: "stödjer", study: "hazan" },
      { type: "slutsats", text: "Anknytningsstilen från barndomen kan påverka relationerna som vuxen. Tråden går alltså från Bowlbys teori, via Ainsworths observationer, till vuxnas kärleksrelationer.", src: "s. 182" }
    ]
  },
  {
    ch: "ledarskap", q: "Vilket ledarskap fungerar bäst för gruppen?",
    steps: [
      { type: "teori", title: "Från \"född till ledare\" till situationsanpassat", text: "Först trodde man att ledare var <b>födda till ledare</b> (intelligenta och talföra), men det fick inget stort stöd. Sedan kom de klassiska stilarna (<b>auktoritär, demokratisk, låt-gå</b>) och Hersey och Blanchards <b>situationsanpassade ledarskap</b>.", src: "s. 191–193" },
      { link: "Vad säger dagens forskning?", rel: "svarar", study: "tafvelin" },
      { type: "slutsats", text: "Det <b>transformerande ledarskapet</b> (förebild, vision, nya idéer, omtanke) ger både välmående och bättre prestation. En destruktiv ledare får medarbetarna att må dåligt.", src: "s. 193–194" }
    ]
  },
  {
    ch: "perspektiv", q: "Varför hjälper vi andra?",
    steps: [
      { type: "händelse", title: "Kitty Genovese, New York 1964", text: "38 grannar hörde eller såg brottet, men ingen ingrep. Darley och Latané förklarade det med <b>ansvarsspridning</b>: ju fler åskådare, desto mindre hjälp. Fallet fick psykologer att forska om när och varför vi hjälper.", src: "s. 196–197" },
      { link: "Tre möjliga förklaringar", type: "teori", title: "Medfött, inlärt eller tankar?", text: "<b>Biologiskt:</b> hjälpsamhet är nedärvd eftersom gruppen överlevde. <b>Behavioristiskt:</b> den är inlärd genom förstärkning. <b>Kognitivt:</b> vi hjälper för att stärka vårt självschema och undvika kognitiv dissonans.", src: "s. 198–200" },
      { link: "Kan man lära sig att hjälpa?", rel: "stödjer inlärning", study: "beama" },
      { type: "slutsats", text: "Prosocialt beteende verkar komma från alla tre: behovet att överleva som grupp, inlärning och våra tankar. Det kallas en <b>helhetssyn</b>, och prosocialt beteende bidrar till ett socialt hållbart samhälle.", src: "s. 200" }
    ]
  }
];

/* Modeller att träna på: varje steg har namn, en ledtråd (ålder, nivå eller position) och en beskrivning.
   ordered = stegen har en bestämd ordning. fig/sec = var modellen finns i kapitlet. */
window.ATLAS.models = [
  { id: "stern", ch: "identitet", sec: "stern", title: "Daniel Sterns fem stadier", ordered: true, hintName: "Ålder", src: "Bok s. 173–174",
    steps: [
      { label: "Inget sammanhållet själv", hint: "0–2 mån", desc: "Känner igen mammas röst och föräldrarnas ansikten och uppskattar dagliga rutiner. Grunden för självuppfattningen." },
      { label: "Kärnsjälvet", hint: "2–6 mån", desc: "Medveten ögonkontakt och det första sociala leendet. Byggs av intryck, enkla minnesbilder, egna känslor och rörelser." },
      { label: "Det subjektiva självet", hint: "7–15 mån", desc: "Knyter an till den som tar hand om en och uppfattar samspelet, ett växelspel med föräldrarna." },
      { label: "Det verbala självet", hint: "16 mån–3 år", desc: "Språket gör att barnet kan hantera sig själv. Symbollekar, säger sitt namn och känner igen spegelbilden." },
      { label: "Det berättande självet", hint: "4 år –", desc: "Tal och minne gör att barnet kan berätta sammanhängande historier. Samtal formar identiteten." }
    ] },
  { id: "erikson", ch: "identitet", sec: "erikson", title: "Eriksons femte fas", ordered: false, qa: true, hintName: "Fråga", src: "Bok s. 174–175, 185",
    steps: [
      { label: "Psykosocial utveckling", hint: "Vad heter Eriksons teori", desc: "Vi utvecklas genom hela livet med hjälp av viktiga människor omkring oss och genom att gå igenom kriser." },
      { label: "13–19 år", hint: "Vilken ålder gäller den femte fasen", desc: "Då blir identiteten fast och konsistent, enligt Erikson." },
      { label: "Identitet eller rollförvirring", hint: "Vad heter krisen i femte fasen", desc: "Krisen som tonåringen går igenom i den femte fasen." },
      { label: "Testa och utforska olika identiteter", alt: ["testa roller", "utforska roller", "prova olika roller"], hint: "Vad är viktigt att göra i krisen", desc: "Den unga behöver pröva många olika roller och identiteter." },
      { label: "En fast och konsistent identitet", hint: "Vad är målet med femte fasen", desc: "Identiteten blir fast och hänger ihop." },
      { label: "Ungdomar i två ursprungsfolk i USA", alt: ["indianstammar", "indianer", "två indianstammar"], hint: "Vilka observerade Erikson", desc: "Där såg Erikson själv identitetskrisen (boken skriver \"indianstammar\")." },
      { label: "Kidwell (1995)", hint: "Vilken studie stödjer Erikson", desc: "82 studenter 14–17 år. De utan fast identitet mådde sämre, var mer förvirrade och olyckliga." },
      { label: "Rutter (1976)", hint: "Vilken studie talar emot Erikson", desc: "2 030 elever 14–15 år. Lärare och föräldrar ansåg att bara ett fåtal hade en identitetskris." },
      { label: "Fasta faser och strikt åldersindelning", hint: "Vilken kritik har teorin fått", desc: "Få studier stödjer teorin, och den kritiseras för att faserna och åldrarna är för fasta." },
      { label: "Närhet och intimitet", hint: "Vad är viktigt i tidig vuxenålder", desc: "Målen är ofta utbildning, arbete och en parrelation, och att känna sig behövd." }
    ] },
  { id: "marcia", ch: "identitet", sec: "marcia", title: "Marcias fyra identitetsstatusar", ordered: false, hintName: "Utforskning / engagemang", src: "Bok s. 176–177",
    steps: [
      { label: "Förutfattad identitet", hint: "Utforskat: nej · Engagemang: ja", desc: "Säker men \"lånad\" identitet, övertagen från föräldrarna utan egen reflektion. Ingen stor kris." },
      { label: "Identitetsförvirring", hint: "Utforskat: nej · Engagemang: nej", desc: "Diffus och obestämd (fluid identity). Ingen utforskning av roller och inga bestående engagemang." },
      { label: "Moratorium", hint: "Utforskat: ja, mitt i kris · Engagemang: vagt", desc: "Söker aktivt och prövar alternativ. Kriser kan ge ångest och förtvivlan." },
      { label: "Etablerad identitet", hint: "Utforskat: ja · Engagemang: ja", desc: "Klar och konsistent identitet som man själv har format. Kan se andras perspektiv." }
    ] },
  { id: "bowlby", ch: "anknytning", sec: "bowlby", title: "Bowlbys fyra stadier", ordered: true, hintName: "Ålder", src: "Bok s. 179",
    steps: [
      { label: "Signalerar behov", hint: "0–2 mån", desc: "Barnet signalerar behov och känslor och reagerar på kontakt, vilket ger närhet till vårdarna." },
      { label: "Känner igen, trygghet växer", hint: "2–7 mån", desc: "Barnet känner igen vissa människor. Om de är pålitliga växer en trygghet fram." },
      { label: "Protesterar, trygg bas", hint: "7 mån–2 år", desc: "Protesterar när trygghetspersonen försvinner, svårt att tröstas av andra, utforskar med den trygga vuxna som bas." },
      { label: "Förstår andras känslor", hint: "2 år –", desc: "Börjar förstå andra människors känslor och behov, så samspelet kan utvecklas vidare." }
    ] },
  { id: "strange", ch: "anknytning", sec: "ainsworth", title: "The Strange Situation i sju steg", ordered: true, hintName: "Steg", src: "Bok s. 180",
    steps: [
      { label: "Barnet och mamman leker", hint: "Steg 1", desc: "Använder barnet mamman som trygg bas och utforskar rummet?" },
      { label: "En främling kommer in", hint: "Steg 2", desc: "Leker barnet med främlingen?" },
      { label: "Mamman lämnar rummet", hint: "Steg 3", desc: "Hur reagerar barnet när mamman går?" },
      { label: "Mamman tillbaka, främlingen går", hint: "Steg 4", desc: "Låter sig barnet tröstas lätt av mamman?" },
      { label: "Mamman går, barnet är ensamt", hint: "Steg 5", desc: "Här blir stressen störst." },
      { label: "Främlingen kommer in", hint: "Steg 6", desc: "Låter sig barnet tröstas av främlingen?" },
      { label: "Mamman tillbaka, främlingen går ut", hint: "Steg 7", desc: "Hur tar barnet emot mamman den andra gången?" }
    ] },
  { id: "stilar", ch: "anknytning", sec: "stilar", title: "Anknytningsstilarna A–D", ordered: false, hintName: "Typ och andel", src: "Bok s. 180–181",
    steps: [
      { label: "Undvikande", hint: "Typ A · 10 %", desc: "Stänger av när mamman går, visar ingen stress och bryr sig inte om henne när hon kommer tillbaka." },
      { label: "Trygg", hint: "Typ B · 60–70 %", desc: "Leker med mamman som trygg bas, blir ledsen när hon går och tröstas lätt när hon kommer." },
      { label: "Ambivalent", hint: "Typ C · 10 %", desc: "Ledsen när mamman går, men både vill och inte vill bli tröstad. Mamman är ingen trygg bas." },
      { label: "Oorganiserad/osäker", hint: "Typ D · 5–10 %", desc: "Ingen konsekvent strategi: ibland lätt att trösta, ibland tvekar barnet att söka tröst." }
    ] },
  { id: "hazan", ch: "anknytning", sec: "hazan", title: "Hazan och Shaver: vuxna relationer", ordered: false, hintName: "Andel", src: "Bok s. 182",
    steps: [
      { label: "Trygg anknytning", hint: "56 %", desc: "Lätt att vara nära, litar på partnern, inte rädd att bli övergiven, lägst andel skilsmässor." },
      { label: "Ambivalent anknytning", hint: "20 %", desc: "Rädd att bli avvisad, ser relationen som instabil, svartsjuk." },
      { label: "Undvikande anknytning", hint: "24 %", desc: "Svårt att vara nära andra. Relationen saknar närhet och tillit." }
    ] },
  { id: "lek", ch: "anknytning", sec: "lek", title: "Lekens och relationernas utveckling", ordered: true, hintName: "Ålder", src: "Bok s. 182–185",
    steps: [
      { label: "Ler och sträcker sig mot andra barn", hint: "6–12 mån", desc: "Ler mot andra barn och sträcker sig mot dem för att röra vid dem." },
      { label: "Lek vid sidan om varandra", hint: "1 år", desc: "Delar leksaker men mest konflikter. Leker bredvid men inte tillsammans." },
      { label: "Övningslekar", hint: "1–2 år", desc: "Roligt att behärska leken, inte att förstå den. Tränar impulskontroll." },
      { label: "Aktionslekar (vild lek)", hint: "2–6 år", desc: "Leker mer i grupp, till exempel springa och jaga varandra utan mål." },
      { label: "Rollekar (symbollekar)", hint: "3–4 år", desc: "Leker doktor eller mamma-pappa-barn. Vänskap formas, ofta med samma kön." },
      { label: "Regelstyrd lek", hint: "6–12 år", desc: "Formella regler (fotboll) eller informella (kurragömma). Grupphierarkier uppstår." },
      { label: "Klickar", hint: "12–18 år", desc: "Umgås i grupper med samma intressen: 29 % av tiden med kompisar, 13 % med föräldrar." }
    ] },
  { id: "firo", ch: "grupper", sec: "firo", title: "FIRO-modellen (Schultz)", ordered: true, hintName: "Fas", src: "Bok s. 188",
    steps: [
      { label: "Tillhörandefasen", hint: "Fas 1", desc: "Ser sig inte som en grupp än, men börjar skapa ett sammanhang." },
      { label: "Rollsökningsfasen", hint: "Fas 2", desc: "Bestämmer roller och status, mäter kompetens, konflikter. Vissa grupper fastnar här." },
      { label: "Samhörighetsfasen", hint: "Fas 3", desc: "Rollerna är klara och gruppen bygger relationer. Samarbete och bättre resultat." }
    ] },
  { id: "tuckman", ch: "grupper", sec: "tuckman", title: "Tuckmans fem faser", ordered: true, hintName: "Fas", src: "Bok s. 188–189",
    steps: [
      { label: "Forming", hint: "Fas 1", desc: "Positiva och engagerade, men lite förvirrande eftersom samspelet inte är klart." },
      { label: "Storming", hint: "Fas 2", desc: "Alla söker sin plats, vilket ger konflikter. Energin är som lägst." },
      { label: "Norming", hint: "Fas 3", desc: "Medlemmarna känner varandra och börjar samspela. Normer skapas." },
      { label: "Performing", hint: "Fas 4", desc: "Sammansvetsad grupp med fokus på samspel, mål och arbete." },
      { label: "Adjourning", hint: "Fas 5", desc: "Gruppen upplöses när målen är nådda." }
    ] },
  { id: "sjufas", ch: "grupper", sec: "sjufas", title: "Sjufasmodellen (Lennéer Axelson och Thylefors)", ordered: true, hintName: "Fas", src: "Bok s. 189–190",
    steps: [
      { label: "Initialfas", hint: "Fas 1", desc: "Osäkra medlemmar, inga tydliga normer eller roller, alla visar sina bästa sidor." },
      { label: "Smekmånadsfas", hint: "Fas 2", desc: "\"Den rätta\" gruppen. Avslappnat, mer kommunikation, man känner sig trygg." },
      { label: "Integrationsfas", hint: "Fas 3", desc: "Visar även dåliga sidor men undviker konflikt genom att fokusera på uppgiften. Vi-känsla." },
      { label: "Konfliktfas", hint: "Fas 4", desc: "Undvikna konflikter blir tydliga. Vissa vill vinna, andra vill tillbaka." },
      { label: "Platåfas", hint: "Fas 5", desc: "Det står still, medlemmarna är likgiltiga och gruppen utvecklas inte." },
      { label: "Mognadsfas", hint: "Fas 6", desc: "Självständiga medlemmar, genuin respekt, klara mål och roller." },
      { label: "Separationsfas", hint: "Fas 7", desc: "Gruppen upphör, och känslor som ångest, ilska, glädje eller sorg kan dyka upp." }
    ] },
  { id: "ledarstilar", ch: "ledarskap", sec: "stilar", title: "Tre klassiska ledarstilar", ordered: false, hintName: "Stil", src: "Bok s. 191",
    steps: [
      { label: "Auktoritär ledare", hint: "Ger order", desc: "Lyssnar inte. Hög produktivitet när ledaren är där, men gruppen blir beroende och uppskattar inte ledaren." },
      { label: "Demokratisk ledare", hint: "Samråder", desc: "Gruppen kan arbeta utan ledaren, oftast mer produktiv, och ledaren uppskattas." },
      { label: "Låt-gå-ledare", hint: "Passiv", desc: "Ointresserad och leder inte. Låg produktivitet med och utan ledaren." }
    ] },
  { id: "hersey", ch: "ledarskap", sec: "situation", title: "Hersey och Blanchard: situationsanpassat ledarskap", ordered: true, hintName: "Mognadsnivå", src: "Bok s. 192–193",
    steps: [
      { label: "Instruerande ledarstil", hint: "Nivå 1 · kan inte", desc: "Auktoritär och beordrande, envägskommunikation, exakta instruktioner och noggrann uppföljning." },
      { label: "Tränande ledarstil", hint: "Nivå 2 · kan lite, vill mycket", desc: "Mycket förklaring och motivering, tvåvägskommunikation." },
      { label: "Deltagande ledarstil", hint: "Nivå 3 · kan, men vill inte alltid", desc: "Lockar med medbestämmande och samarbete, gruppen får känna tillit." },
      { label: "Delegerande ledarstil", hint: "Nivå 4 · kan och vill", desc: "Ger gruppen ansvar för beslut och genomförande." }
    ] },
  { id: "tafvelin", ch: "ledarskap", sec: "tafvelin", title: "Transformerande ledarskap (Tafvelin)", ordered: false, hintName: "Beteende", src: "Bok s. 193",
    steps: [
      { label: "Vara en förebild", hint: "1", desc: "Leva som man lär, så att medarbetarna kan se upp till och lita på chefen." },
      { label: "Positiv framtidsvision", hint: "2", desc: "Skapa mening och motivation." },
      { label: "Stimulera nya idéer", hint: "3", desc: "Ge förutsättningar och handlingsutrymme." },
      { label: "Visa omtanke", hint: "4", desc: "Lyssna och coacha." }
    ] },
  { id: "perspektiv", ch: "perspektiv", sec: "fragan", title: "Tre förklaringar till prosocialt beteende", ordered: false, hintName: "Nyckelord", src: "Bok s. 198–200",
    steps: [
      { label: "Biologiskt perspektiv", hint: "Medfött · evolution", desc: "Att hjälpa gjorde att gruppen överlevde. Empatin är nedärvd i generna." },
      { label: "Behavioristiskt perspektiv", hint: "Inlärt · förstärkning", desc: "Omgivningens uppskattning har förstärkt hjälpsamheten. Stöds av Beamas experiment." },
      { label: "Kognitivt perspektiv", hint: "Tankar · dissonans", desc: "Vi hjälper för att stärka vårt självschema och undvika kognitiv dissonans (Festinger 1957)." }
    ] }
];
