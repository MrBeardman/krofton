/**
 * All homepage content in one place (single language: cs). Facts (names, numbers, addresses, project names)
 * come from krofton.cz as scraped on 2026-11-08; the wording is rewritten. New copy awaiting the client's
 * approval is listed in docs/WEBSITE.md ("New copy").
 */

/** Czech typography: join one-letter prepositions/conjunctions to the next word (also two in a row). */
export function nb(s: string): string {
  let out = s;
  for (let i = 0; i < 2; i++) out = out.replace(/(^|[\s( ])([ksvzouaiKSVZOUAI])\s+/g, '$1$2 ');
  return out;
}

export const company = {
  name: 'KROFTON s.r.o.',
  short: 'KROFTON',
  street: 'Kroftova 3370/20',
  zip: '150 00',
  city: 'Praha',
  district: 'Smíchov',
  phone: '+420 608 075 884',
  phoneHref: 'tel:+420608075884',
  email: 'krofton@krofton.cz',
  ico: '24222577',
  dic: 'CZ24222577',
  register: 'Spisová značka C 190114, Městský soud v Praze',
  geo: { lat: 50.078497, lon: 14.4032145 },
  mapsHref: 'https://www.openstreetmap.org/?mlat=50.078497&mlon=14.4032145#map=17/50.078497/14.4032145',
  googleHref: 'https://www.google.com/maps/search/?api=1&query=Kroftova+3370%2F20%2C+150+00+Praha',
};

export type ServiceId = 'fasady' | 'rekonstrukce' | 'novostavby' | 'obklady' | 'interiery' | 'spoluprace';

export interface Service {
  id: ServiceId;
  title: string;
  /** who it is for */
  forWhom: string;
  text: string;
  includes: string[];
  /** link to the matching project tab, if there is one */
  projects?: string;
}

export const services: Service[] = [
  {
    id: 'fasady',
    title: 'Zateplení a opravy fasád',
    forWhom: 'Pro SVJ, bytová družstva, majitele bytových a rodinných domů i správce škol.',
    text: 'Zateplíme fasádu bytového domu, školy i rodinného domu a opravíme starou, popraskanou nebo poškozenou omítku. Dům tím dostane novou tvář i nižší tepelné ztráty. Pracujeme s certifikovanými materiály a máme certifikát způsobilosti Baumit.',
    includes: [
      'zateplení fasády včetně nové omítky',
      'opravy starších a poškozených fasád',
      'obklady fasád, například klinker',
      'podklady a administrativa k zakázce',
    ],
    projects: 'fasady',
  },
  {
    id: 'rekonstrukce',
    title: 'Rekonstrukce domů a bytů',
    forWhom: 'Pro majitele rodinných domů a bytů, školy a investory.',
    text: 'Opravíme a zmodernizujeme dům nebo byt, často rovnou i se zateplením. Naši pracovníci jsou školení v technologiích suché výstavby a stavíme z kvalitních materiálů, které s vámi předem odsouhlasíme.',
    includes: [
      'stavební úpravy domů a bytů',
      'suchá výstavba a sádrokartonové konstrukce',
      'zateplení v rámci rekonstrukce',
      'úprava terasy, zahrady a okolí domu',
    ],
    projects: 'rekonstrukce',
  },
  {
    id: 'novostavby',
    title: 'Novostavby od pozemku po interiér',
    forWhom: 'Pro stavebníky rodinných domů, investory řadové zástavby a komerčních budov.',
    text: 'Postavíme rodinný dům, řadové domy i komerční objekt podle vašeho projektu. Začínáme úpravou stavebního pozemku a končíme řemeslnými pracemi v interiéru. Když je potřeba, upravíme i zahradu a okolí stavby.',
    includes: [
      'úprava stavebního pozemku a zakládání stavby',
      'hrubá stavba',
      'dokončovací a řemeslné práce v interiéru',
      'úprava zahrady a okolí',
    ],
    projects: 'novostavby',
  },
  {
    id: 'obklady',
    title: 'Obklady a dlažby',
    forWhom: 'Pro koupelny, kuchyně a chodby v bytech, domech i komerčních prostorách.',
    text: 'Naši obkladači položí obklady a dlažbu v koupelně, kuchyni i ve společných prostorách domu. Od jednoduché bílé koupelny po dekorativní pásy a vzorovanou dlažbu.',
    includes: ['obklady koupelen a kuchyní', 'pokládka dlažby', 'dekory, pásy a vzory', 'příprava podkladu'],
    projects: 'obklady',
  },
  {
    id: 'interiery',
    title: 'Stavební práce v interiéru',
    forWhom: 'Pro byty, domy a kanceláře při rekonstrukci nebo dokončení stavby.',
    text: 'V interiéru postavíme příčky, provedeme zednické, malířské a natěračské práce a dokončíme vše, co rekonstrukce nebo nová stavba potřebuje. Jedna firma, která zkoordinuje všechny profese.',
    includes: ['výstavba příček', 'zednické práce', 'malířské a natěračské práce', 'sádrokarton a dokončovací práce'],
  },
  {
    id: 'spoluprace',
    title: 'Řemeslníci a technika pro vaši stavbu',
    forWhom: 'Pro stavební firmy, investory a stavbyvedoucí.',
    text: 'Nepotřebujete celou dodávku? Domluvíme dílčí spolupráci: dodáme odborníky na řemeslné a dokončovací práce, nebo provedeme stavební práce, na které nemáte potřebnou techniku.',
    includes: [
      'zedníci, obkladači, sádrokartonáři',
      'malíři, natěrači a lakýrníci',
      'klempíři a stavební truhláři',
      'stavební dělníci',
    ],
  },
];

export interface Project {
  title: string;
  scope: string;
  photo: string;
  alt: string;
}

export interface ProjectGroup {
  id: string;
  label: string;
  intro: string;
  projects: Project[];
}

export const projectGroups: ProjectGroup[] = [
  {
    id: 'fasady',
    label: 'Fasády',
    intro: 'Zateplení a obnova fasád bytových domů, škol a rodinných domů.',
    projects: [
      {
        title: 'Ul. Makovského, Praha',
        scope: 'Zateplení fasády panelového domu',
        photo: 'makovskeho-po',
        alt: 'Zateplený panelový dům v ulici Makovského s barevnou fasádou v odstínech cihlové a žluté',
      },
      {
        title: 'Žerotínova ul., Praha',
        scope: 'Obnova fasády činžovního domu',
        photo: 'zerotinova',
        alt: 'Obnovená žlutá fasáda činžovního domu se štukovými římsami v Žerotínově ulici',
      },
      {
        title: 'Základní škola Radlická, Praha',
        scope: 'Zateplení fasády, obklad klinker',
        photo: 'radlicka',
        alt: 'Budova základní školy v Radlické ulici s novým cihlovým obkladem klinker',
      },
      {
        title: 'Ul. Nad Přehradou, Praha',
        scope: 'Zateplení fasády bytového domu',
        photo: 'nad-prehradou',
        alt: 'Vícepodlažní bytový dům v ulici Nad Přehradou během zateplování fasády',
      },
      {
        title: 'Obytný soubor Na Radosti, Zličín',
        scope: 'Fasáda bytového domu',
        photo: 'zlicin',
        alt: 'Bytový dům v obytném souboru Na Radosti na Zličíně s bílou fasádou a cihlovými pásy',
      },
      {
        title: 'RŘD Jinočany u Prahy',
        scope: 'Zateplení fasády řadových domů',
        photo: 'jinocany-fasada',
        alt: 'Řadové rodinné domy v Jinočanech s novou světlou fasádou',
      },
      {
        title: 'RD Netřebská ul., Praha 6 – Ruzyně',
        scope: 'Fasáda rodinného domu',
        photo: 'netrebska',
        alt: 'Rodinný dům v Netřebské ulici v Ruzyni s obnovenou světlou fasádou',
      },
      {
        title: 'Rodinný dům, Hradec Králové',
        scope: 'Fasáda rodinného domu',
        photo: 'hradec-kralove',
        alt: 'Rodinný dům v Hradci Králové s bílou a cihlově červenou fasádou',
      },
    ],
  },
  {
    id: 'rekonstrukce',
    label: 'Rekonstrukce',
    intro: 'Rekonstrukce rodinných domů a škol, většinou včetně zateplení.',
    projects: [
      {
        title: 'RD Třebonice',
        scope: 'Rekonstrukce včetně zateplení, úprava zahrady a terasy',
        photo: 'trebonice',
        alt: 'Rekonstruovaný rodinný dům v Třebonicích s velkými okny a novou fasádou',
      },
      {
        title: 'RD Třebonice',
        scope: 'Nová terasa a schodiště',
        photo: 'trebonice-terasa',
        alt: 'Nová betonová terasa se schodištěm u rodinného domu v Třebonicích',
      },
      {
        title: 'ZŠ Podleskova, Praha',
        scope: 'Rekonstrukce včetně zateplení fasády',
        photo: 'podleskova',
        alt: 'Zateplená fasáda základní školy v Podleskově ulici v zelené a šedé barvě',
      },
      {
        title: 'ZŠ Podleskova, Praha',
        scope: 'Vstup a nová fasáda pavilonu',
        photo: 'podleskova-2',
        alt: 'Pavilon základní školy v Podleskově ulici se žlutou a šedou fasádou a novým vstupem',
      },
    ],
  },
  {
    id: 'novostavby',
    label: 'Novostavby',
    intro: 'Výstavba rodinných a řadových domů od základů.',
    projects: [
      {
        title: 'Novostavba RŘD Jinočany',
        scope: 'Hrubá stavba řadových rodinných domů',
        photo: 'jinocany-novostavba',
        alt: 'Hrubá stavba řadových rodinných domů v Jinočanech z cihelných bloků',
      },
      {
        title: 'RŘD Jinočany u Prahy',
        scope: 'Dokončené domy se zateplenou fasádou',
        photo: 'jinocany-fasada',
        alt: 'Dokončené řadové rodinné domy v Jinočanech se světlou fasádou',
      },
    ],
  },
  {
    id: 'obklady',
    label: 'Obklady a dlažby',
    intro: 'Koupelny, chodby a podlahy v bytech a domech.',
    projects: [
      {
        title: 'Koupelna, Vršovice',
        scope: 'Obklad a vzorovaná dlažba',
        photo: 'obklady-koupelna',
        alt: 'Koupelna s červeným obkladem a černobílou vzorovanou dlažbou',
      },
      {
        title: 'Koupelna',
        scope: 'Obklad s mozaikovým pásem',
        photo: 'obklady-travertin',
        alt: 'Sprchový kout s obkladem v odstínu travertinu a mozaikovým pásem',
      },
      {
        title: 'Podlaha',
        scope: 'Dlažba s kontrastním rámem',
        photo: 'obklady-dlazba',
        alt: 'Lesklá světlá dlažba v místnosti s tmavým kontrastním pásem',
      },
      {
        title: 'Koupelna',
        scope: 'Velkoplošný obklad s dekorem',
        photo: 'obklady-dekor',
        alt: 'Červený obklad koupelny s květinovým dekorem',
      },
    ],
  },
];

export const reasons = [
  { title: 'Hrubá stavba i dokončení', text: 'Provedeme všechny stavební práce, od zakládání stavby po interiér.' },
  { title: 'Úřady vyřídíme', text: 'Zajistíme podklady, komunikaci s úřady a potřebné administrativní úkony.' },
  { title: 'Domluvené termíny', text: 'Dodržujeme termíny, na kterých se spolu domluvíme.' },
  { title: 'Certifikované materiály', text: 'Stavíme z certifikovaných materiálů, které s vámi předem odsouhlasíme.' },
  { title: 'Školení řemeslníci', text: 'Naši pracovníci se pravidelně školí v používání nových technologií.' },
  { title: 'Jedna koordinace', text: 'Hlídáme součinnost profesí a návaznost stavebních postupů.' },
];

export const steps = [
  {
    title: 'Ozvete se',
    text: 'Zavoláte, napíšete nebo pošlete poptávku. Stačí krátce popsat, co potřebujete postavit nebo opravit a kde.',
  },
  {
    title: 'Nezávazná nabídka',
    text: 'Probereme rozsah, termíny a materiály a připravíme pro vás nezávaznou nabídku.',
  },
  {
    title: 'Podklady a úřady',
    text: 'Zajistíme podklady a administrativu, kterou stavba potřebuje, včetně komunikace s úřady.',
  },
  {
    title: 'Stavba',
    text: 'Koordinujeme všechny profese, hlídáme návaznost prací a domluvené termíny.',
  },
];

export const faq = [
  {
    q: 'Co dělá stavební firma KROFTON?',
    a: 'KROFTON s.r.o. je stavební firma z Prahy. Zatepluje a opravuje fasády, rekonstruuje domy a byty, staví novostavby rodinných a řadových domů, pokládá obklady a dlažby a provádí stavební práce v interiéru. Dodává také řemeslníky jiným stavbám.',
  },
  {
    q: 'Kde KROFTON působí?',
    a: 'Sídlíme v Praze 5 na Smíchově, Kroftova 3370/20. Stavíme v Praze a okolí, například na Zličíně, v Ruzyni nebo v Jinočanech, a realizovali jsme i rodinný dům v Hradci Králové.',
  },
  {
    q: 'Pro koho pracujete?',
    a: 'Pro společenství vlastníků a bytová družstva, majitele rodinných domů a bytů, školy, investory komerčních staveb i pro stavební firmy, které potřebují posílit řemeslné profese.',
  },
  {
    q: 'Kolik stojí zateplení fasády nebo rekonstrukce?',
    a: 'Ceník nezveřejňujeme, cena vždy záleží na rozsahu prací, materiálu a stavu objektu. Zavolejte na +420 608 075 884 nebo pošlete poptávku a připravíme vám nezávaznou nabídku.',
  },
  {
    q: 'Vyřídíte i jednání s úřady?',
    a: 'Ano. Součástí naší práce je zajištění podkladů, komunikace s úřady a nezbytné administrativní úkony.',
  },
  {
    q: 'Uděláte i jen část stavby?',
    a: 'Ano. Kromě kompletních dodávek novostaveb a rekonstrukcí domluvíme i dílčí spolupráci: dodáme řemeslníky na konkrétní práce, nebo provedeme stavební práce, na které nemáte techniku.',
  },
  {
    q: 'Jak si zakázku objednat?',
    a: 'Zavolejte na +420 608 075 884, napište na krofton@krofton.cz nebo vyplňte poptávkový formulář na této stránce. Uveďte typ práce a místo stavby, ozveme se vám zpět.',
  },
];

/** Types offered in the enquiry form; the server routes the mail by this id (see src/pages/api/contact.ts). */
export const jobTypes = [
  { id: 'fasada', label: 'Zateplení nebo oprava fasády' },
  { id: 'rekonstrukce', label: 'Rekonstrukce domu nebo bytu' },
  { id: 'novostavba', label: 'Novostavba' },
  { id: 'obklady', label: 'Obklady a dlažby' },
  { id: 'interier', label: 'Práce v interiéru' },
  { id: 'spoluprace', label: 'Řemeslníci pro jinou stavbu' },
  { id: 'jine', label: 'Něco jiného' },
] as const;
