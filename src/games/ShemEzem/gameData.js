// ==========================================
// GAME DATA - All stages, explanations & questions (with nikud)
// ==========================================

export const LEADERBOARD_RIVALS = [
  { name: 'נוֹעָה', avatar: '👧', score: 88 },
  { name: 'אָלוֹן', avatar: '👦', score: 76 },
  { name: 'מַיָּה', avatar: '🧒', score: 60 },
  { name: 'יוֹנָתָן', avatar: '👦', score: 44 },
  { name: 'שִׁירָה', avatar: '👧', score: 20 },
]

export const CORRECT_MESSAGES = [
  '🎉 כׇּל הַכָּבוֹד! אַתָּה מַמָּשׁ חָכָם!',
  '⭐ וָואוּ! תְּשׁוּבָה מֻשְׁלֶמֶת!',
  '🔥 אֵשׁ! הַמְשֵׁךְ כָּךְ!',
  '🏆 גָּאוֹן אֲמִתִּי!',
  '✨ פַּנְטַסְטִי! אַתָּה הַטּוֹב בְּיוֹתֵר!',
  '💪 עָצוּם! אַתָּה מַדְהִים!',
  '🌟 בְּרִילְיַנְט! תְּשׁוּבָה נְכוֹנָה!',
  '🚀 אַתָּה עָף! מְדַהֵּם!',
]

export const WRONG_MESSAGES = [
  '😊 כִּמְעַט! תִּרְאֶה אֶת הַהֶסְבֵּר וְנַמְשִׁיךְ',
  '💙 לֹא נוֹרָא! קְרָא אֶת הַהֶסְבֵּר',
  '🤔 קָרוֹב מְאֹד! בֹּא נִבְדֹּק יַחַד',
  '💪 זֶה בְּסֵדֶר! לוֹמְדִים מִטָּעֻיּוֹת',
]

export const STREAK_MESSAGES = {
  3: '🔥 רֶצֶף שֶׁל 3! אַתָּה בּוֹעֵר!',
  5: '⚡ רֶצֶף שֶׁל 5! סוּפֶּר-גִּבּוֹר!',
  7: '🌈 רֶצֶף שֶׁל 7! אַגָּדִי!',
}

export const stages = [
  // ==========================================
  // STAGE 1: שֵׁם עֶצֶם
  // ==========================================
  {
    id: 1,
    name: 'שֵׁם עֶצֶם',
    subtitle: 'שֵׁם שֶׁל דָּבָר, חַי, מָקוֹם אוֹ אָדָם',
    color: '#4361EE',
    lightColor: '#EEF2FF',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardGradient: 'linear-gradient(135deg, #4361EE, #7B2FBE)',
    emoji: '📦',
    heroEmoji: '🏫',

    explanation: {
      title: 'מַה זֶּה שֵׁם עֶצֶם? 📦',
      text: 'שֵׁם עֶצֶם הִיא מִלָּה שֶׁנּוֹתֶנֶת שֵׁם לַדְּבָרִים שֶׁסְּבִיבֵנוּ. יֵשׁ אַרְבָּעָה סוּגִים:',
      categories: [
        { icon: '🏠', label: 'דָּבָר', example: 'שֻׁלְחָן, סֵפֶר, כִּסֵּא' },
        { icon: '🐕', label: 'בַּעַל חַיִּים', example: 'כֶּלֶב, חָתוּל, דָּג' },
        { icon: '🌆', label: 'מָקוֹם', example: 'יְרוּשָׁלַיִם, בַּיִת, כִּיתָּה' },
        { icon: '👦', label: 'אָדָם', example: 'יֶלֶד, מוֹרָה, אִמָּא' },
      ],
      tip: '💡 שְׁאַל אֶת עַצְמְךָ: הַאִם אֲנִי יָכוֹל לִגַּע בְּזֶה, לִרְאוֹת אוֹתוֹ, לְבַקֵּר שָׁם, אוֹ שֶׁזֶּה שֵׁם שֶׁל מִישֶׁהוּ?',
      examples: [
        { word: 'סֵפֶר', emoji: '📚', isTarget: true },
        { word: 'כֶּלֶב', emoji: '🐕', isTarget: true },
        { word: 'יְרוּשָׁלַיִם', emoji: '🕍', isTarget: true },
        { word: 'יַלְדָּה', emoji: '👧', isTarget: true },
      ],
    },

    questions: [
      {
        id: 1, type: 'yesno', target: 'שֵׁם עֶצֶם',
        word: 'סֵפֶר', emoji: '📚', answer: 'yes',
        explanation: '📚 סֵפֶר הוּא דָּבָר שֶׁאֶפְשָׁר לִגַּע בּוֹ — זֶה שֵׁם עֶצֶם!',
        points: 4,
      },
      {
        id: 2, type: 'yesno', target: 'שֵׁם עֶצֶם',
        word: 'רָץ', emoji: '🏃', answer: 'no',
        explanation: '🏃 "רָץ" מְתָאֵר פְּעוּלָּה, לֹא דָּבָר — זֶה שֵׁם פֹּעַל!',
        points: 4,
      },
      {
        id: 3, type: 'yesno', target: 'שֵׁם עֶצֶם',
        word: 'כֶּלֶב', emoji: '🐕', answer: 'yes',
        explanation: '🐕 כֶּלֶב הוּא בַּעַל חַיִּים — זֶה שֵׁם עֶצֶם!',
        points: 4,
      },
      {
        id: 4, type: 'yesno', target: 'שֵׁם עֶצֶם',
        word: 'גָּדוֹל', emoji: '📏', answer: 'no',
        explanation: '📏 "גָּדוֹל" מְתָאֵר אֵיךְ נִרְאֶה דָּבָר — זֶה שֵׁם תֹּאַר!',
        points: 4,
      },
      {
        id: 5, type: 'yesno', target: 'שֵׁם עֶצֶם',
        word: 'יְרוּשָׁלַיִם', emoji: '🕍', answer: 'yes',
        explanation: '🕍 יְרוּשָׁלַיִם הִיא עִיר — זֶה שֵׁם עֶצֶם!',
        points: 4,
      },
      {
        id: 6, type: 'yesno', target: 'שֵׁם עֶצֶם',
        word: 'יָפֶה', emoji: '✨', answer: 'no',
        explanation: '✨ "יָפֶה" מְתָאֵר אֵיךְ מַשֶּׁהוּ נִרְאֶה — זֶה שֵׁם תֹּאַר!',
        points: 4,
      },
      {
        id: 7, type: 'yesno', target: 'שֵׁם עֶצֶם',
        word: 'בַּיִת', emoji: '🏠', answer: 'yes',
        explanation: '🏠 בַּיִת הוּא מָקוֹם שֶׁגָּרִים בּוֹ — זֶה שֵׁם עֶצֶם!',
        points: 4,
      },
      {
        id: 8, type: 'catch',
        instruction: 'לְחַץ עַל כׇּל שֵׁם הָעֶצֶם! 📦',
        targetType: 'שֵׁם עֶצֶם',
        words: [
          { word: 'תַּפּוּחַ', emoji: '🍎', isTarget: true },
          { word: 'קוֹפֵץ', emoji: '🏃', isTarget: false },
          { word: 'יֶלֶד', emoji: '👦', isTarget: true },
          { word: 'אָדֹם', emoji: '🔴', isTarget: false },
          { word: 'כִּיסֵּא', emoji: '🪑', isTarget: true },
          { word: 'שָׂמֵחַ', emoji: '😊', isTarget: false },
        ],
        explanation: '📦 תַּפּוּחַ, יֶלֶד וְכִּיסֵּא הֵם שֵׁמוֹת עֶצֶם — דְּבָרִים שֶׁאֶפְשָׁר לִגַּע בָּהֶם!',
        points: 4,
      },
      {
        id: 9, type: 'yesno', target: 'שֵׁם עֶצֶם',
        word: 'שֻׁלְחָן', emoji: '🪑', answer: 'yes',
        explanation: '🪑 שֻׁלְחָן הוּא דָּבָר שֶׁאֶפְשָׁר לִגַּע בּוֹ — זֶה שֵׁם עֶצֶם!',
        points: 4,
      },
      {
        id: 10, type: 'yesno', target: 'שֵׁם עֶצֶם',
        word: 'נוֹבֵחַ', emoji: '🐕', answer: 'no',
        explanation: '🐕 "נוֹבֵחַ" מְתָאֵר מַה הַכֶּלֶב עוֹשֶׂה — זֶה שֵׁם פֹּעַל!',
        points: 4,
      },
    ],
  },

  // ==========================================
  // STAGE 2: שֵׁם תֹּאַר
  // ==========================================
  {
    id: 2,
    name: 'שֵׁם תֹּאַר',
    subtitle: 'מִלָּה שֶׁמְּתָאֶרֶת שֵׁם עֶצֶם',
    color: '#7B2FBE',
    lightColor: '#F3E8FF',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cardGradient: 'linear-gradient(135deg, #7B2FBE, #E63946)',
    emoji: '🎨',
    heroEmoji: '🖌️',

    explanation: {
      title: 'מַה זֶּה שֵׁם תֹּאַר? 🎨',
      text: 'שֵׁם תֹּאַר הִיא מִלָּה שֶׁמְּתָאֶרֶת שֵׁם עֶצֶם. הוּא עוֹנֶה עַל הַשְּׁאֵלָה "אֵיזֶה?"',
      categories: [
        { icon: '🎨', label: 'צֶבַע', example: 'אָדֹם, כָּחֹל, יָרֹק' },
        { icon: '📏', label: 'גֹּדֶל', example: 'גָּדוֹל, קָטָן, עָנָק' },
        { icon: '💝', label: 'תַּחוּשָׁה', example: 'שָׂמֵחַ, עָצוּב, נֶחְמָד' },
        { icon: '✨', label: 'מַרְאֶה', example: 'יָפֶה, נָקִי, חָדָשׁ' },
      ],
      tip: '💡 שְׁאַל: אֵיזֶה ________? כַּדּוּר אָדֹם — אֵיזֶה כַּדּוּר? אָדֹם! "אָדֹם" הוּא שֵׁם הַתֹּאַר.',
      examples: [
        { word: 'כַּדּוּר אָדֹם', emoji: '🔴', isTarget: true },
        { word: 'יֶלֶד שָׂמֵחַ', emoji: '😊', isTarget: true },
        { word: 'סֵפֶר גָּדוֹל', emoji: '📚', isTarget: true },
        { word: 'חָתוּל יָפֶה', emoji: '🐱', isTarget: true },
      ],
    },

    questions: [
      {
        id: 1, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם תֹּאַר?',
        sentence: 'הַכַּדּוּר הָאָדֹם',
        options: ['כַּדּוּר', 'אָדֹם', 'לִשְׂחוֹק', 'גִּינָּה'],
        answer: 'אָדֹם', emoji: '🔴',
        explanation: '🎨 "אָדֹם" מְתָאֵר אֶת הַכַּדּוּר — אֵיזֶה כַּדּוּר? אָדֹם! זֶה שֵׁם תֹּאַר.',
        points: 4,
      },
      {
        id: 2, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם תֹּאַר?',
        sentence: 'סֵפֶר מְעַנְיֵן',
        options: ['סֵפֶר', 'לִקְרֹא', 'מְעַנְיֵן', 'שֻׁלְחָן'],
        answer: 'מְעַנְיֵן', emoji: '📚',
        explanation: '✨ "מְעַנְיֵן" מְתָאֵר אֶת הַסֵּפֶר — אֵיזֶה סֵפֶר? מְעַנְיֵן! זֶה שֵׁם תֹּאַר.',
        points: 4,
      },
      {
        id: 3, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם תֹּאַר?',
        sentence: 'כֶּלֶב גָּדוֹל',
        options: ['כֶּלֶב', 'גָּדוֹל', 'בַּיִת', 'לָרוּץ'],
        answer: 'גָּדוֹל', emoji: '🐕',
        explanation: '📏 "גָּדוֹל" מְתָאֵר אֶת הַכֶּלֶב — אֵיזֶה כֶּלֶב? גָּדוֹל! זֶה שֵׁם תֹּאַר.',
        points: 4,
      },
      {
        id: 4, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם תֹּאַר?',
        sentence: 'פֶּרַח יָפֶה',
        options: ['פֶּרַח', 'לִצְמֹחַ', 'גִּינָּה', 'יָפֶה'],
        answer: 'יָפֶה', emoji: '🌸',
        explanation: '🌸 "יָפֶה" מְתָאֵר אֶת הַפֶּרַח — אֵיזֶה פֶּרַח? יָפֶה! זֶה שֵׁם תֹּאַר.',
        points: 4,
      },
      {
        id: 5, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם תֹּאַר?',
        sentence: 'מְכוֹנִית מְהִירָה',
        options: ['מְכוֹנִית', 'כְּבִישׁ', 'מְהִירָה', 'לִנְסֹעַ'],
        answer: 'מְהִירָה', emoji: '🚗',
        explanation: '⚡ "מְהִירָה" מְתָאֶרֶת אֶת הַמְּכוֹנִית — אֵיזוֹ מְכוֹנִית? מְהִירָה! זֶה שֵׁם תֹּאַר.',
        points: 4,
      },
      {
        id: 6, type: 'catch',
        instruction: 'לְחַץ עַל כׇּל שֵׁם הַתֹּאַר! 🎨',
        targetType: 'שֵׁם תֹּאַר',
        words: [
          { word: 'כָּחֹל', emoji: '🔵', isTarget: true },
          { word: 'כֶּלֶב', emoji: '🐕', isTarget: false },
          { word: 'קָטָן', emoji: '🔍', isTarget: true },
          { word: 'רָץ', emoji: '🏃', isTarget: false },
          { word: 'חָכָם', emoji: '🎓', isTarget: true },
          { word: 'עֵץ', emoji: '🌳', isTarget: false },
        ],
        explanation: '🎨 כָּחֹל, קָטָן וְחָכָם הֵם שֵׁמוֹת תֹּאַר — הֵם מְתָאֲרִים דְּבָרִים!',
        points: 4,
      },
      {
        id: 7, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם תֹּאַר?',
        sentence: 'שָׁמַיִם כְּחֻלִּים',
        options: ['שָׁמַיִם', 'כְּחֻלִּים', 'עָנָן', 'לָעוּף'],
        answer: 'כְּחֻלִּים', emoji: '🌤️',
        explanation: '🌤️ "כְּחֻלִּים" מְתָאֵר אֶת הַשָּׁמַיִם — אֵיזֶה שָׁמַיִם? כְּחֻלִּים! זֶה שֵׁם תֹּאַר.',
        points: 4,
      },
      {
        id: 8, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם תֹּאַר?',
        sentence: 'חָתוּל שָׁחֹר',
        options: ['חָתוּל', 'שָׁחֹר', 'לֵאכֹל', 'בַּיִת'],
        answer: 'שָׁחֹר', emoji: '🐈‍⬛',
        explanation: '🐈‍⬛ "שָׁחֹר" מְתָאֵר אֶת הַחָתוּל — אֵיזֶה חָתוּל? שָׁחֹר! זֶה שֵׁם תֹּאַר.',
        points: 4,
      },
    ],
  },

  // ==========================================
  // STAGE 3: שֵׁם פֹּעַל
  // ==========================================
  {
    id: 3,
    name: 'שֵׁם פֹּעַל',
    subtitle: 'מִלָּה שֶׁמְּתָאֶרֶת פְּעוּלָּה',
    color: '#06A77D',
    lightColor: '#E8F9F5',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    cardGradient: 'linear-gradient(135deg, #06A77D, #0082B4)',
    emoji: '⚡',
    heroEmoji: '🏃',

    explanation: {
      title: 'מַה זֶּה שֵׁם פֹּעַל? ⚡',
      text: 'שֵׁם פֹּעַל הִיא מִלָּה שֶׁמְּתָאֶרֶת פְּעוּלָּה — מַה עוֹשִׂים. הוּא עוֹנֶה עַל הַשְּׁאֵלָה "מַה עוֹשֶׂה?"',
      categories: [
        { icon: '🏃', label: 'תְּנוּעָה', example: 'רָץ, קוֹפֵץ, הוֹלֵךְ' },
        { icon: '🍎', label: 'אֲכִילָה', example: 'אוֹכֵל, שׁוֹתֶה, טוֹעֵם' },
        { icon: '🎵', label: 'יְצִירָה', example: 'שָׁר, צִיֵּר, בָּנָה' },
        { icon: '😴', label: 'מְנוּחָה', example: 'יָשֵׁן, נָח, יוֹשֵׁב' },
      ],
      tip: '💡 שְׁאַל: מַה עוֹשֶׂה הַ_____? הַכֶּלֶב רָץ — מַה עוֹשֶׂה הַכֶּלֶב? רָץ! "רָץ" הוּא שֵׁם הַפֹּעַל.',
      examples: [
        { word: 'הַיֶּלֶד רָץ', emoji: '🏃', isTarget: true },
        { word: 'הַצִּפּוֹר שָׁרָה', emoji: '🐦', isTarget: true },
        { word: 'הַכֶּלֶב קוֹפֵץ', emoji: '🐕', isTarget: true },
        { word: 'אִמָּא בִּישְּׁלָה', emoji: '👩‍🍳', isTarget: true },
      ],
    },

    questions: [
      {
        id: 1, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם פֹּעַל?',
        sentence: 'הַיֶּלֶד רָץ מַהֵר',
        options: ['הַיֶּלֶד', 'רָץ', 'מַהֵר', 'שָׂדֶה'],
        answer: 'רָץ', emoji: '🏃',
        explanation: '🏃 "רָץ" מְתָאֵר מַה הַיֶּלֶד עוֹשֶׂה — זֶה שֵׁם פֹּעַל!',
        points: 4,
      },
      {
        id: 2, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם פֹּעַל?',
        sentence: 'הַכֶּלֶב נוֹבֵחַ',
        options: ['הַכֶּלֶב', 'נוֹבֵחַ', 'בַּיִת', 'חָזָק'],
        answer: 'נוֹבֵחַ', emoji: '🐕',
        explanation: '🐕 "נוֹבֵחַ" מְתָאֵר מַה הַכֶּלֶב עוֹשֶׂה — זֶה שֵׁם פֹּעַל!',
        points: 4,
      },
      {
        id: 3, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם פֹּעַל?',
        sentence: 'הַצִּפּוֹר עָפָה לַשָּׁמַיִם',
        options: ['הַצִּפּוֹר', 'עָפָה', 'שָׁמַיִם', 'גְּבוֹהָה'],
        answer: 'עָפָה', emoji: '🐦',
        explanation: '🐦 "עָפָה" מְתָאֵר מַה הַצִּפּוֹר עוֹשָׂה — זֶה שֵׁם פֹּעַל!',
        points: 4,
      },
      {
        id: 4, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם פֹּעַל?',
        sentence: 'הַיַּלְדָּה אוֹכֶלֶת תַּפּוּחַ',
        options: ['הַיַּלְדָּה', 'אוֹכֶלֶת', 'תַּפּוּחַ', 'טָעִים'],
        answer: 'אוֹכֶלֶת', emoji: '🍎',
        explanation: '🍎 "אוֹכֶלֶת" מְתָאֶרֶת מַה הַיַּלְדָּה עוֹשָׂה — זֶה שֵׁם פֹּעַל!',
        points: 4,
      },
      {
        id: 5, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם פֹּעַל?',
        sentence: 'אַבָּא בִּישֵּׁל אֲרוּחָה טְעִימָה',
        options: ['אַבָּא', 'בִּישֵּׁל', 'אֲרוּחָה', 'טְעִימָה'],
        answer: 'בִּישֵּׁל', emoji: '👨‍🍳',
        explanation: '👨‍🍳 "בִּישֵּׁל" מְתָאֵר מַה אַבָּא עָשָׂה — זֶה שֵׁם פֹּעַל!',
        points: 4,
      },
      {
        id: 6, type: 'catch',
        instruction: 'לְחַץ עַל כׇּל שֵׁם הַפֹּעַל! ⚡',
        targetType: 'שֵׁם פֹּעַל',
        words: [
          { word: 'שָׁר', emoji: '🎵', isTarget: true },
          { word: 'כֶּלֶב', emoji: '🐕', isTarget: false },
          { word: 'רוֹקֵד', emoji: '💃', isTarget: true },
          { word: 'אָדֹם', emoji: '🔴', isTarget: false },
          { word: 'קוֹפֵץ', emoji: '🦘', isTarget: true },
          { word: 'יֶלֶד', emoji: '👦', isTarget: false },
        ],
        explanation: '⚡ שָׁר, רוֹקֵד וְקוֹפֵץ הֵם שֵׁמוֹת פֹּעַל — הֵם מְתָאֲרִים פְּעוּלּוֹת!',
        points: 4,
      },
      {
        id: 7, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם פֹּעַל?',
        sentence: 'הַדָּג שׁוֹחֶה בַּמַּיִם',
        options: ['הַדָּג', 'שׁוֹחֶה', 'מַיִם', 'קַר'],
        answer: 'שׁוֹחֶה', emoji: '🐟',
        explanation: '🐟 "שׁוֹחֶה" מְתָאֵר מַה הַדָּג עוֹשֶׂה — זֶה שֵׁם פֹּעַל!',
        points: 4,
      },
      {
        id: 8, type: 'choose',
        instruction: 'אֵיזוֹ מִלָּה הִיא שֵׁם פֹּעַל?',
        sentence: 'הַיֶּלֶד צָחַק חָזָק',
        options: ['הַיֶּלֶד', 'צָחַק', 'חָזָק', 'שָׂמֵחַ'],
        answer: 'צָחַק', emoji: '😂',
        explanation: '😂 "צָחַק" מְתָאֵר מַה הַיֶּלֶד עָשָׂה — זֶה שֵׁם פֹּעַל!',
        points: 4,
      },
    ],
  },

  // ==========================================
  // STAGE 4: מִיּוּן מִלִּים
  // ==========================================
  {
    id: 4,
    name: 'מִיּוּן מִלִּים',
    subtitle: 'סַוֵּג כׇּל מִלָּה לַסּוּג הַנָּכוֹן',
    color: '#F77F00',
    lightColor: '#FFF3E0',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    cardGradient: 'linear-gradient(135deg, #F77F00, #E63946)',
    emoji: '🎯',
    heroEmoji: '🏅',

    explanation: {
      title: 'זְמַן לְמִיּוּן! 🎯',
      text: 'עַכְשָׁיו אָנוּ יוֹדְעִים אֶת שְׁלֹשָׁת הַסּוּגִים. בּוֹאוּ נְסַוֵּג מִלִּים!',
      categories: [
        { icon: '📦', label: 'שֵׁם עֶצֶם', example: 'שֵׁם שֶׁל דָּבָר, חַי, מָקוֹם, אָדָם' },
        { icon: '🎨', label: 'שֵׁם תֹּאַר', example: 'מְתָאֵר שֵׁם עֶצֶם (אֵיזֶה?)' },
        { icon: '⚡', label: 'שֵׁם פֹּעַל', example: 'מְתָאֵר פְּעוּלָּה (מַה עוֹשֶׂה?)' },
      ],
      tip: '💡 זְכֹר: שֵׁם עֶצֶם = דָּבָר | שֵׁם תֹּאַר = מְתָאֵר | שֵׁם פֹּעַל = פְּעוּלָּה',
      examples: [
        { word: 'שֻׁלְחָן 📦', emoji: '🟦', isTarget: true },
        { word: 'אָדֹם 🎨', emoji: '🟣', isTarget: true },
        { word: 'קוֹפֵץ ⚡', emoji: '🟢', isTarget: true },
        { word: 'יָרֵחַ 📦', emoji: '🟦', isTarget: true },
      ],
    },

    questions: [
      {
        id: 1, type: 'sort', word: 'שֻׁלְחָן', emoji: '🪑',
        hint: 'אֶפְשָׁר לִגַּע בּוֹ, לָשֶׁבֶת לְיָדוֹ',
        answer: 'שֵׁם עֶצֶם',
        explanation: '🪑 שֻׁלְחָן הוּא דָּבָר — שֵׁם עֶצֶם!',
        points: 4,
      },
      {
        id: 2, type: 'sort', word: 'שָׂמֵחַ', emoji: '😊',
        hint: 'מְתָאֵר אֵיךְ מַרְגִּישִׁים',
        answer: 'שֵׁם תֹּאַר',
        explanation: '😊 שָׂמֵחַ מְתָאֵר אֵיךְ אֲנִי מַרְגִּישׁ — שֵׁם תֹּאַר!',
        points: 4,
      },
      {
        id: 3, type: 'sort', word: 'קוֹפֵץ', emoji: '🦘',
        hint: 'מַה שֶּׁהַקָּנְגּוּרוּ עוֹשֶׂה',
        answer: 'שֵׁם פֹּעַל',
        explanation: '🦘 קוֹפֵץ — זוֹ פְּעוּלָּה! שֵׁם פֹּעַל!',
        points: 4,
      },
      {
        id: 4, type: 'sort', word: 'יָרֵחַ', emoji: '🌙',
        hint: 'רוֹאִים אוֹתוֹ בַּלַּיְלָה',
        answer: 'שֵׁם עֶצֶם',
        explanation: '🌙 יָרֵחַ הוּא דָּבָר בַּשָּׁמַיִם — שֵׁם עֶצֶם!',
        points: 4,
      },
      {
        id: 5, type: 'sort', word: 'רוֹקֵד', emoji: '💃',
        hint: 'מַה שֶּׁעוֹשִׂים כְּשֶׁמּוּזִיקָה מִתְנַגֶּנֶת',
        answer: 'שֵׁם פֹּעַל',
        explanation: '💃 רוֹקֵד — זוֹ פְּעוּלָּה! שֵׁם פֹּעַל!',
        points: 4,
      },
      {
        id: 6, type: 'sort', word: 'קָטָן', emoji: '🔍',
        hint: 'מְתָאֵר גֹּדֶל שֶׁל דָּבָר',
        answer: 'שֵׁם תֹּאַר',
        explanation: '🔍 קָטָן מְתָאֵר גֹּדֶל — שֵׁם תֹּאַר!',
        points: 4,
      },
      {
        id: 7, type: 'catch',
        instruction: 'לְחַץ עַל כׇּל שֵׁם הַפֹּעַל! ⚡',
        targetType: 'שֵׁם פֹּעַל',
        words: [
          { word: 'שׁוֹחֶה', emoji: '🏊', isTarget: true },
          { word: 'בַּיִת', emoji: '🏠', isTarget: false },
          { word: 'אוֹכֵל', emoji: '🍽️', isTarget: true },
          { word: 'יָפֶה', emoji: '✨', isTarget: false },
          { word: 'צוֹחֵק', emoji: '😂', isTarget: true },
          { word: 'כֶּלֶב', emoji: '🐕', isTarget: false },
        ],
        explanation: '⚡ שׁוֹחֶה, אוֹכֵל וְצוֹחֵק הֵם פְּעוּלּוֹת — שֵׁמוֹת פֹּעַל!',
        points: 4,
      },
      {
        id: 8, type: 'sort', word: 'תַּפּוּחַ', emoji: '🍎',
        hint: 'פְּרִי שֶׁאֶפְשָׁר לֶאֱכֹל',
        answer: 'שֵׁם עֶצֶם',
        explanation: '🍎 תַּפּוּחַ הוּא פְּרִי, דָּבָר — שֵׁם עֶצֶם!',
        points: 4,
      },
    ],
  },

  // ==========================================
  // STAGE 5: אַתְגַּר הַגְּמָר
  // ==========================================
  {
    id: 5,
    name: 'אַתְגַּר הַגְּמָר',
    subtitle: 'זַהֵּה אֶת סוּג הַמִּלָּה בַּמִּשְׁפָּט',
    color: '#E63946',
    lightColor: '#FEECEE',
    gradient: 'linear-gradient(135deg, #fc5c7d 0%, #6a3093 100%)',
    cardGradient: 'linear-gradient(135deg, #E63946, #7B2FBE)',
    emoji: '🏆',
    heroEmoji: '🥇',

    explanation: {
      title: 'הָאַתְגַּר הַסּוֹפִי! 🏆',
      text: 'עַכְשָׁיו נִמְצָא מִלִּים בְּמִשְׁפָּטִים שְׁלֵמִים. קְרָא, מְצָא, זַהֵּה!',
      categories: [
        { icon: '🔍', label: 'שָׁלָב 1', example: 'קְרָא אֶת הַמִּשְׁפָּט' },
        { icon: '🎯', label: 'שָׁלָב 2', example: 'מְצָא אֶת הַמִּלָּה הַמְּסֻמֶּנֶת' },
        { icon: '💡', label: 'שָׁלָב 3', example: 'שְׁאַל: דָּבָר? מְתָאֵר? פְּעוּלָּה?' },
        { icon: '✅', label: 'שָׁלָב 4', example: 'בְּחַר אֶת הַסּוּג הַנָּכוֹן!' },
      ],
      tip: '🏆 אַתָּה כְּבָר יוֹדֵעַ הַכֹּל! אֵלֶּה שְׁאֵלוֹת קְצָת יוֹתֵר קָשׁוֹת — אַתָּה יָכוֹל!',
      examples: [
        { word: 'הַיֶּלֶד הַקָּטָן רָץ', emoji: '🏃', isTarget: true },
        { word: 'הַצִּפּוֹר שָׁרָה עַל עֵץ', emoji: '🐦', isTarget: true },
        { word: 'תַּפּוּחַ טָעִים', emoji: '🍎', isTarget: true },
        { word: 'הַכֶּלֶב הַשָּׂמֵחַ קָפַץ', emoji: '🐕', isTarget: true },
      ],
    },

    questions: [
      {
        id: 1, type: 'sentence',
        sentence: 'הַיֶּלֶד הַקָּטָן רָץ לַבַּיִת',
        targetWord: 'הַקָּטָן', answer: 'שֵׁם תֹּאַר', emoji: '👦',
        explanation: '👦 "קָטָן" מְתָאֵר אֶת הַיֶּלֶד — אֵיזֶה יֶלֶד? קָטָן! שֵׁם תֹּאַר.',
        points: 4,
      },
      {
        id: 2, type: 'sentence',
        sentence: 'הַכֶּלֶב הַשָּׂמֵחַ יָשַׁב בַּגִּינָּה',
        targetWord: 'יָשַׁב', answer: 'שֵׁם פֹּעַל', emoji: '🐕',
        explanation: '🐕 "יָשַׁב" מְתָאֵר מַה הַכֶּלֶב עָשָׂה — שֵׁם פֹּעַל!',
        points: 4,
      },
      {
        id: 3, type: 'sentence',
        sentence: 'הַצִּפּוֹר שָׁרָה עַל עֵץ גָּבוֹהַּ',
        targetWord: 'עֵץ', answer: 'שֵׁם עֶצֶם', emoji: '🌳',
        explanation: '🌳 "עֵץ" הוּא דָּבָר בַּטֶּבַע — שֵׁם עֶצֶם!',
        points: 4,
      },
      {
        id: 4, type: 'sentence',
        sentence: 'יַלְדָּה יָפָה רָקְדָה בֶּחָצֵר',
        targetWord: 'רָקְדָה', answer: 'שֵׁם פֹּעַל', emoji: '💃',
        explanation: '💃 "רָקְדָה" מְתָאֶרֶת מַה הַיַּלְדָּה עָשְׂתָה — שֵׁם פֹּעַל!',
        points: 4,
      },
      {
        id: 5, type: 'sentence',
        sentence: 'הַבַּיִת הַגָּדוֹל עוֹמֵד בְּקָצֵה הָרְחוֹב',
        targetWord: 'הַגָּדוֹל', answer: 'שֵׁם תֹּאַר', emoji: '🏠',
        explanation: '🏠 "גָּדוֹל" מְתָאֵר אֶת הַבַּיִת — שֵׁם תֹּאַר!',
        points: 4,
      },
      {
        id: 6, type: 'catch',
        instruction: 'לְחַץ עַל כׇּל שֵׁם הָעֶצֶם! 📦',
        targetType: 'שֵׁם עֶצֶם',
        words: [
          { word: 'סֵפֶר', emoji: '📚', isTarget: true },
          { word: 'גָּדוֹל', emoji: '📏', isTarget: false },
          { word: 'מְכוֹנִית', emoji: '🚗', isTarget: true },
          { word: 'רָץ', emoji: '🏃', isTarget: false },
          { word: 'כִּיתָּה', emoji: '🏫', isTarget: true },
          { word: 'יָפֶה', emoji: '✨', isTarget: false },
        ],
        explanation: '📦 סֵפֶר, מְכוֹנִית וְכִיתָּה הֵם שֵׁמוֹת עֶצֶם — דְּבָרִים שֶׁאֶפְשָׁר לִגַּע בָּהֶם!',
        points: 4,
      },
      {
        id: 7, type: 'sentence',
        sentence: 'הַחָתוּל הַלָּבָן יָשֵׁן עַל הַסַּפָּה',
        targetWord: 'הַלָּבָן', answer: 'שֵׁם תֹּאַר', emoji: '🐱',
        explanation: '🐱 "לָבָן" מְתָאֵר אֶת הַחָתוּל — שֵׁם תֹּאַר!',
        points: 4,
      },
      {
        id: 8, type: 'sentence',
        sentence: 'הַיְּלָדִים שִׂחֲקוּ בַּגִּינָּה הַיָּרֹק',
        targetWord: 'שִׂחֲקוּ', answer: 'שֵׁם פֹּעַל', emoji: '⚽',
        explanation: '⚽ "שִׂחֲקוּ" מְתָאֵר מַה הַיְּלָדִים עָשׂוּ — שֵׁם פֹּעַל!',
        points: 4,
      },
    ],
  },
]
