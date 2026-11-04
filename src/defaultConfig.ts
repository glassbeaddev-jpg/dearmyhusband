import { GameConfig } from './types';

export const DEFAULT_CONFIG: GameConfig = {
  theme: 'strawberry',
  brand: '♡ a little love game',
  partnerTitle: 'Husband',
  senderTitle: 'your girl',
  footerText: 'made with a little love ♡',

  level1: {
    kicker: 'A TOP SECRET LOVE MISSION ✧',
    title: 'Make My Husband Smile ♡',
    prompt: 'Pssttt... i made a little something for you.',
    welcomeMessage: 'Welcome to Operation: Make My Husband Smile!',
    buttonText: 'START THE MISSION ♡',
  },

  level2: {
    kicker: 'LEVEL TWO',
    title: 'A little heart hunt 💗',
    instructions: 'Find all five hearts. Each one is a tiny thing I want you to know.',
    hearts: [
      { id: 1, xPercent: 12, yPercent: 16, note: 'You are appreciated.', emoji: '♥' },
      { id: 2, xPercent: 86, yPercent: 20, note: 'Your patience means a lot to me.', emoji: '♥' },
      { id: 3, xPercent: 50, yPercent: 48, note: 'I notice the little things you do.', emoji: '♥' },
      { id: 4, xPercent: 18, yPercent: 82, note: 'Thank you for understanding me.', emoji: '♥' },
      { id: 5, xPercent: 85, yPercent: 84, note: 'You make my days sweeter.', emoji: '♥' },
    ],
    celebrationText: 'You found them all! ✨\nMy heart is very proud of you.',
    buttonText: 'NEXT LEVEL ♡',
  },

  level3: {
    kicker: 'LEVEL THREE · NO PRESSURE, JUST FUN',
    title: 'How well do you know your wifey?',
    intro: 'There are no grades here, promise. ♡',
    questions: [
      {
        id: 1,
        question: 'What does your girlfriend want to get better at?',
        options: [
          'Communicating her feelings ♡',
          'Winning every argument',
          'Becoming a professional sleeper',
        ],
        correctIndex: 0,
        correctFeedback: "Yes! I'm learning to say what's on my heart more gently. ♡",
        alternateFeedback: "Hehe, tempting! But I'm working on communicating my feelings. ♡",
        nextText: 'ONE MORE ♡',
      },
      {
        id: 2,
        question: 'What does she appreciate most about you?',
        options: [
          'Your patience and understanding',
          'Your ability to read her mind',
          'Your cooking skills',
        ],
        correctIndex: 0,
        correctFeedback: 'Exactly. Your patience and understanding mean so much to me. ♡',
        alternateFeedback: "Cute guess! It's your patience and understanding. ♡",
        nextText: 'LAST QUESTION ♡',
      },
      {
        id: 3,
        question: "What should she remember when she's upset?",
        options: [
          'To communicate more gently',
          'To disappear for three business days',
          'To pretend nothing happened',
        ],
        correctIndex: 0,
        correctFeedback: "That's the one. I'm going to keep trying. ♡",
        alternateFeedback: 'Not quite, hehe. Gentle communication is my mission. ♡',
        nextText: 'OPEN THE LETTER ♡',
      },
    ],
  },

  level4: {
    kicker: 'LEVEL FOUR · FROM MY HEART',
    title: 'LETTER TO MY HUSBAND',
    paragraphs: [
      "Sayaangggggg I know I wasn't very nice last night, and I'm sorry. I made a mistake, and you didn't deserve that.",
      "Sometimes I don't express myself as well as I should, but I want you to know that I recognize it and I'm trying to do better.",
      'Thank you for being patient with me, for understanding me, and for giving me space to learn. I really appreciate you, more than I probably say.',
    ],
    signoff: 'With love, me ♡',
    buttonText: "THERE'S ONE MORE THING 🎀",
  },

  level5: {
    kicker: 'LEVEL FIVE · PICK YOUR PRESENT',
    title: 'One last mission!',
    instructions: 'Some little things I want you to remember...',
    gifts: [
      {
        id: 1,
        title: 'YOU ARE APPRECIATED',
        icons: '🎀 ✿',
        letterText: `my love,\n\nI hope you know that I notice you. Not just the big things, but the little ones that sometimes go unmentioned. The way you check on me even when your own day has been busy. The way you remember something I casually told you. The effort you make to understand me, even when I struggle to explain what I mean.\n\nSometimes I wonder if I say thank you enough. I get caught up in my feelings and forget that love also means making sure you feel appreciated. So I want to say it properly here: I see how much you try, and it matters to me. You are never just someone who happens to be in my life. You are someone I am genuinely grateful to have.\n\nThank you for making room for the ordinary parts of me, not only the happy and easy ones. Thank you for sharing your time, your thoughts, and the smallest stories from your day. Those moments make the distance between us feel a little less far.\n\nI want to keep noticing you, celebrating you, and reminding you that your efforts are never invisible to me. You deserve kindness and appreciation, too. Especially from me.\n\nwith love, your girl ♡`,
      },
      {
        id: 2,
        title: 'YOUR PATIENCE MEANS A LOT',
        icons: '✿ ♡',
        letterText: `sayaang,\n\nThank you for being patient with me, especially during moments when my feelings are louder than my words. I know it is not always easy to understand what I need when I am still trying to understand it myself. Sometimes I get upset too quickly, and sometimes I wish you could hear everything I am trying to say without me having to explain it. But I know that is not fair to ask of you.\n\nI notice the times you listen even when a conversation is uncomfortable. I notice when you try to make sense of my worries instead of simply walking away from them. I never want your patience to feel like something I expect or take for granted. It is a gift, and I want to treat it with care.\n\nBeing far from each other makes misunderstandings feel bigger than they should. We cannot always fix a difficult moment with a hug or a quiet look. All we have sometimes are words, and I am learning to use mine more thoughtfully.\n\nThank you for trying with me. I hope I can give you that same patience when you need it. I want us both to feel heard, understood, and loved, especially on the days that are not so easy.\n\nwith love, your girl ♡`,
      },
      {
        id: 3,
        title: "I'M STILL LEARNING",
        icons: '✧ 🎀',
        letterText: `my favorite person,\n\nI am still learning how to love you better. I am learning how to talk about my feelings without letting them turn into frustration. I am learning that being understood starts with explaining what is in my heart, and that listening is just as important as being listened to.\n\nI know I do not always get it right. There are times when I react too fast, become quiet when I should speak, or make a small misunderstanding feel bigger than it really is. I want to take responsibility for those moments rather than pretending they never happened. I cannot promise that I will suddenly become perfect, but I can promise that I genuinely want to grow.\n\nI want us to be able to disagree without feeling like we are on opposite teams. I want us to say sorry when we need to, ask questions before making assumptions, and remember that the person on the other side of the screen is someone we love.\n\nThank you for allowing our relationship to be a place where we can both learn. I hope we keep choosing honest conversations, gentler words, and little changes that eventually become something meaningful.\n\nI am still learning, but I am happy that I get to learn with you.\n\nwith love, your girl ♡`,
      },
      {
        id: 4,
        title: "I'M GLAD IT'S YOU",
        icons: '♡ ✿',
        letterText: `to my person,\n\nSometimes I think about how many tiny things had to happen for our paths to cross. Out of all the people in this world, somehow I got to know you. And now you are the person I want to tell about a funny little moment, a tiring afternoon, or something exciting that happened when you were not there to see it.\n\nI love the ordinary things we share. Our silly conversations, the plans we make, the way we imagine places we want to visit together. Even on days when we are far apart, knowing you are somewhere out there makes me feel like there is something lovely to look forward to.\n\nI do not think love means that everything will always be easy. We are two different people, with different habits, worries, and ways of expressing ourselves. But I like that we are learning each other. I like that there are still so many stories for us to tell, things to discover, and memories we have not made yet.\n\nI want more little adventures with you. More photos, more shared meals, more laughter over absolutely nothing. I want us to grow into the kind of love that feels kind, comfortable, and real.\n\nOf all the people I could have found, I am so glad it was you. I would choose to know you all over again.\n\nwith love, your girl ♡`,
      },
    ],
    completionTitle: 'You opened all four letters! ♡',
    completionText: 'I hope these words gave you even a tiny reason to smile. There is one last little surprise for you.',
    buttonText: 'OPEN YOUR LAST SURPRISE ♡',
  },

  finale: {
    kicker: 'SPECIAL DELIVERY · JUST FOR YOU',
    title: 'The biggest hug, for you. ♡',
    message: "Thank you for being you. I'm so lucky to have you.",
    illustration: '🫂💕',
  },
};

export const PRESETS: { name: string; description: string; data: Partial<GameConfig> }[] = [
  {
    name: 'Husband (Apology & Sweet Appreciation)',
    description: 'The original loving apology and deep appreciation for your husband.',
    data: {
      partnerTitle: 'Husband',
      senderTitle: 'your wifey',
      level1: {
        ...DEFAULT_CONFIG.level1,
        title: 'Make My Husband Smile ♡',
        welcomeMessage: 'Welcome to Operation: Make My Husband Smile!',
      },
      level4: {
        ...DEFAULT_CONFIG.level4,
        title: 'LETTER TO MY HUSBAND',
      },
    },
  },
  {
    name: 'Boyfriend (Cute & Playful Love Mission)',
    description: 'A playful and romantic mission for your boyfriend.',
    data: {
      partnerTitle: 'Boyfriend',
      senderTitle: 'your girlfriend',
      level1: {
        kicker: 'TOP SECRET MISSION FOR MY FAVORITE BOY ✧',
        title: 'Operation: Make My Boy Smile ♡',
        prompt: 'Pssttt... a special mission was dispatched just for you.',
        welcomeMessage: 'Welcome to Operation: Make My Boy Smile!',
        buttonText: 'ACCEPT THE MISSION ♡',
      },
      level3: {
        kicker: 'LEVEL THREE · TRIVIA TIME',
        title: 'The Ultimate Girlfriend Quiz',
        intro: 'Only the cutest answers allowed! ♡',
        questions: [
          {
            id: 1,
            question: "Who loves you more than pizza and boba combined?",
            options: ['Your girl right here ♡', 'A cute puppy', 'Science cannot measure it'],
            correctIndex: 0,
            correctFeedback: 'Bingo! It is 1000% me! ♡',
            alternateFeedback: 'Aww, nice try, but nobody loves you like I do! ♡',
            nextText: 'NEXT QUESTION ♡',
          },
          {
            id: 2,
            question: 'What is your girlfriend’s favorite thing about you?',
            options: ['Your warm hugs & sweet smile', 'Your bad dad jokes', 'Everything you do'],
            correctIndex: 2,
            correctFeedback: 'Yes! Literally everything about you! ♡',
            alternateFeedback: 'Very true, but honestly it is EVERYTHING! ♡',
            nextText: 'FINAL QUESTION ♡',
          },
          {
            id: 3,
            question: 'What is the penalty for being this handsome?',
            options: ['Unlimited kisses forever', 'Cooking dinner tonight', 'Buying more treats'],
            correctIndex: 0,
            correctFeedback: 'Sentenced to lifetime cuddles and kisses! ♡',
            alternateFeedback: 'Good try, but unlimited kisses it is! ♡',
            nextText: 'READ YOUR SPECIAL LETTER ♡',
          },
        ],
      },
      level4: {
        kicker: 'LEVEL FOUR · STRAIGHT FROM MY HEART',
        title: 'TO MY FAVORITE HUMAN',
        paragraphs: [
          "Hey handsome, I just wanted to pause and remind you how special you are to me.",
          "You bring so much warmth, laughter, and calm into my life. Even on days when the world is chaotic, having you to talk to makes everything feel lighter.",
          "Thank you for being my teammate, my comfort person, and my favorite adventure buddy. I love you so much!",
        ],
        signoff: 'Forever yours ♡',
        buttonText: "MORE SURPRISES AHEAD 🎀",
      },
    },
  },
  {
    name: 'Long Distance Relationship (LDR Love)',
    description: 'Special love notes bridging the miles between you two.',
    data: {
      partnerTitle: 'My Distance Love',
      senderTitle: 'your girl across the miles',
      level1: {
        kicker: 'TRANSMISSION ACROSS THE MILES ✧',
        title: 'Miles Away, Closer at Heart ♡',
        prompt: 'Even across timezones, this love reached you.',
        welcomeMessage: 'A special digital care package, just for you!',
        buttonText: 'OPEN TRANSMISSION ♡',
      },
      level4: {
        kicker: 'LEVEL FOUR · A LETTER ACROSS TIMEZONES',
        title: 'LETTER ACROSS THE MILES',
        paragraphs: [
          "Distance means so little when someone means so much. Living in different places isn't always easy, but loving you is the easiest thing I've ever done.",
          "I count down the days until we don't have to say goodbye at airports or hang up on video calls. Until then, you have my whole heart wherever you go.",
          "Thank you for showing up for us every single day. I'm cheering for you always.",
        ],
        signoff: 'Counting down the days, your love ♡',
        buttonText: 'COLLECT YOUR VIRTUAL HUGS 🎀',
      },
    },
  },
  {
    name: 'Anniversary / Valentine Celebration',
    description: 'Celebrate your anniversary, Valentine, or special milestone.',
    data: {
      partnerTitle: 'My Soulmate',
      senderTitle: 'your forever partner',
      level1: {
        kicker: 'CELEBRATING OUR BEAUTIFUL STORY ✧',
        title: 'Happy Anniversary, My Love ♡',
        prompt: 'Another milestone with my favorite person on earth.',
        welcomeMessage: 'Here is to us, our memories, and our forever!',
        buttonText: 'BEGIN CELEBRATION ♡',
      },
      level4: {
        kicker: 'LEVEL FOUR · A CELEBRATION NOTE',
        title: 'TO ANOTHER YEAR OF US',
        paragraphs: [
          "Looking back at everything we've shared, I am constantly amazed at how lucky I am.",
          "You make every ordinary Tuesday feel like an adventure, and every milestone memorable. I wouldn't trade our story for anything.",
          "Here is to all the laughs, dreams, late-night chats, and future adventures still waiting for us.",
        ],
        signoff: 'With all my heart, forever & always ♡',
        buttonText: 'SEE YOUR ANNIVERSARY GIFTS 🎀',
      },
    },
  },
];
