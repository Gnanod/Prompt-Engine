export const CATEGORY_TEMPLATES = {
politics: {
    label: 'Politics',
templateName: 'Italian Political Master Prompt',
intro:
'Create a highly engaging vertical 9:16 (1080x1920) Italian political social media graphic in realistic photographic style.',

    layoutRandomization: [
      'Split vertical (classic left vs right)',
      'Split diagonal (dynamic clash composition)',
      'Top vs bottom stacked layout',
      'Center face-off (both facing each other closely)',
      'Debate stage composition (podium vs podium)',
    ],

    themeSubtextPairs: [
      ['CHI FA LA MOSSA PIÙ FORTE?', 'CHE NE PENSI DI QUESTE DUE FIGURE? COMMENTA LA TUA IDEA'],
      ['CHI SEMBRA PIÙ PRONTO PER IL RUOLO?', 'CHI SAREBBE IL MIGLIORE PER IL RUOLO? COMMENTA LA TUA IDEA'],
      ['DI CHI TI FIDI DI PIÙ OGGI?', 'DIMMI LA TUA OPINIONE NEI COMMENTI'],
      ['CHI HA LA PRESENZA PIÙ FORTE?', 'QUALE SCEGLIERESTI E PERCHÉ?'],
      ['CHI TI CONVINCE DI PIÙ ORA?', 'CHI TI IMPRESSIONA DI PIÙ OGGI?'],
      ['CHI PENSI STIA GUIDANDO MEGLIO?', 'COMMENTA IL NOME DI CHI SUPPORTI'],
      ['CHI SCEGLIERESTI PER QUESTO RUOLO?', 'QUALE PERSONA TI SEMBRA PIÙ FORTE?'],
      ['CHI SEMBRA PIÙ POTENTE IN IMMAGINE?', 'CHI PENSI ABBIA PIÙ ESPERIENZA?'],
      ['CHI LASCIA LA MIGLIORE IMPRESSIONE?', 'SCRIVI LA TUA OPINIONE IN UN BREVE COMMENTO'],
      ['CHI METTERESTI AL PRIMO POSTO?', 'CHI METTERESTI AL VERTICE?'],
    ],

    visualStoryVariation: [
      'Presidential debate stage with audience blur',
      'Stormy sky symbolic background',
      'Palazzo Chigi inspired setting',
      'Street protest vs institutional contrast',
      'Minimalist Italian flag backdrop (Green, White, Red)',
      'Dramatic spotlight darkness',
    ],

    lightingRandomization: [
      'Golden hour cinematic lighting',
      'Harsh dramatic contrast lighting',
      'Cool blue government lighting',
      'Red-tinted tension lighting',
    ],

    colorStyleRandomization: [
      'Classic blue (left) vs red (right)',
      'Inverted (red left / blue right)',
      'Neutral vs saturated contrast',
      'Monochrome + color highlight split',
    ],

    leftRoleLabels: [
      'IL PROTETTORE',
      'IL LEADER',
      "L'ESPERIENZA",
      'LA ROTTURA',
    ],

    rightRoleLabels: [
      'IL DEBOLE',
      'IL RISCHIO',
      "L'INCOGNITA",
      'LA CONTROVERSIA',
    ],

    extras: [
      'Lightning or energy split between candidates',
      'Subtle crowd silhouettes',
      'Faint Italian map overlay',
      'Motion blur to simulate tension',
      'Lens flare or spotlight beams',
      'Smoke or dramatic haze',
    ],

    groupedCharacters: {
      'Ruling Coalition (Centre-Right)': [
        'Giorgia Meloni',
        'Matteo Salvini',
        'Antonio Tajani',
        'Ignazio La Russa',
        'Lorenzo Fontana',
        'Matteo Piantedosi',
        'Roberto Occhiuto',
        'Vito Bardi',
        'Luca Zaia',
      ],
      'Main Opposition': [
        'Elly Schlein',
        'Giuseppe Conte',
        'Roberto Fico',
        'Antonio Decaro',
        'Nicola Fratoianni',
        'Angelo Bonelli',
      ],
      'Other Prominent Figures': [
        'Sergio Mattarella',
        'Mario Draghi',
        'Matteo Renzi',
        'Carlo Calenda',
        'Maurizio Landini',
        'Vincenzo De Luca',
        'Stefano Bonaccini',
        'Maurizio Gasparri',
        'Stefania Craxi',
        'Roberto Vannacci',
      ],
    },

    strictRules: [
      'Always use TWO different real political figures',
      'Keep realistic photographic faces (not illustrated)',
      'Maintain high contrast and social media virality style',
      'No watermarks or logos',
      'Ensure composition changes significantly across generations',
    ],

    goal:
      'Each generated image should feel like a DIFFERENT viral political post — not just a template swap, but a new concept (debate, clash, crisis, leadership choice, etc.).',
  },

  football: {
    label: 'Football',
    templateName: 'Italian Football Master Prompt',
    intro:
      'Create a highly engaging vertical 9:16 (1080x1920) Italian football social media graphic in realistic photographic style.',

    layoutRandomization: [
      'Split vertical (classic left vs right)',
      'Split diagonal (dynamic clash composition)',
      'Top vs bottom stacked layout',
      'Center face-off (both facing each other closely)',
      'Stadium podium vs podium composition',
    ],

    themeSubtextPairs: [
      ['CHI È IL PIÙ FORTE?', 'COMMENTA IL NOME DEL TUO PREFERITO'],
      ['CHI TI CONVINCE DI PIÙ?', 'SCRIVI LA TUA OPINIONE NEI COMMENTI'],
      ['CHI MERITA DI PIÙ?', 'CHI SCEGLI TRA QUESTI DUE?'],
      ['CHI FARESTI GIOCARE TITOLARE?', 'DIMMI LA TUA NEI COMMENTI'],
      ['CHI HA PIÙ CARISMA?', 'SCRIVI IL TUO PREFERITO QUI SOTTO'],
    ],

    visualStoryVariation: [
      'Stadium under floodlights',
      'Rainy match-night atmosphere',
      'Trophy celebration background',
      'Press conference tension scene',
      'Crowd cheering with blurred ultras',
      'Dramatic locker room showdown',
      'Classic Italian stadium backdrop',
    ],

    lightingRandomization: [
      'Golden hour cinematic lighting',
      'Harsh dramatic contrast lighting',
      'Cool blue stadium lighting',
      'Red-tinted tension lighting',
    ],

    colorStyleRandomization: [
      'Classic blue (left) vs red (right)',
      'Inverted red left / blue right',
      'Neutral vs saturated contrast',
      'Monochrome + color highlight split',
    ],

    leftRoleLabels: [
      'LA LEGENDA',
      'IL CAMPIONE',
      "L'ESPERIENZA",
      'IL DOMINATORE',
    ],

    rightRoleLabels: [
      'LA SFIDA',
      'IL RILANCIO',
      "L'INCERTEZZA",
      'LA CONTROVERSIA',
    ],

    extras: [
      'Lightning or energy split between players',
      'Subtle crowd silhouettes',
      'Faint Italian flag overlay',
      'Motion blur to simulate speed',
      'Lens flare or spotlight beams',
      'Smoke or dramatic haze',
    ],

    groupedCharacters: {
      Legends: [
        'Gianluigi Buffon',
        'Paolo Maldini',
        'Alessandro Del Piero',
        'Francesco Totti',
        'Andrea Pirlo',
        'Roberto Baggio',
        'Fabio Cannavaro',
        'Giorgio Chiellini',
      ],
      Coaches: [
        'Luciano Spalletti',
        'Carlo Ancelotti',
        'Antonio Conte',
        'Massimiliano Allegri',
        'Roberto Mancini',
        'Daniele De Rossi',
      ],
    },

    strictRules: [
      'Always use TWO different real football figures',
      'Keep realistic photographic faces (not illustrated)',
      'Maintain high contrast and social media virality style',
      'No watermarks or logos',
      'Ensure composition changes significantly across generations',
    ],

    goal:
      'Each generated image should feel like a DIFFERENT viral football post — not just a template swap, but a new concept (rivalry, legend debate, coach clash, pressure moment, etc.).',
  },
} as const

export type CategoryKey = keyof typeof CATEGORY_TEMPLATES