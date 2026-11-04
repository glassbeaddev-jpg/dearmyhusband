export type ThemeName = 'strawberry' | 'lavender' | 'peach' | 'ocean' | 'sage' | 'midnight';

export interface HeartItem {
  id: number;
  xPercent: number; // 0 - 100
  yPercent: number; // 0 - 100
  note: string;
  emoji?: string;
}

export interface QuizQuestionItem {
  id: number;
  question: string;
  options: [string, string, string];
  correctIndex: number;
  correctFeedback: string;
  alternateFeedback: string;
  nextText: string;
}

export interface GiftItem {
  id: number;
  title: string;
  icons: string;
  letterText: string;
}

export interface GameConfig {
  theme: ThemeName;
  brand: string;
  partnerTitle: string;
  senderTitle: string;
  footerText: string;

  // Level 1: Mystery Envelope
  level1: {
    kicker: string;
    title: string;
    prompt: string;
    welcomeMessage: string;
    buttonText: string;
  };

  // Level 2: Heart Hunt
  level2: {
    kicker: string;
    title: string;
    instructions: string;
    hearts: HeartItem[];
    celebrationText: string;
    buttonText: string;
  };

  // Level 3: Quiz
  level3: {
    kicker: string;
    title: string;
    intro: string;
    questions: QuizQuestionItem[];
  };

  // Level 4: Love Letter
  level4: {
    kicker: string;
    title: string;
    paragraphs: string[];
    signoff: string;
    buttonText: string;
  };

  // Level 5: 4 Gift Letters
  level5: {
    kicker: string;
    title: string;
    instructions: string;
    gifts: GiftItem[];
    completionTitle: string;
    completionText: string;
    buttonText: string;
  };

  // Finale: Big Hug
  finale: {
    kicker: string;
    title: string;
    message: string;
    illustration: string;
  };
}

export interface PlayState {
  level: number; // 1 to 6
  envelopeOpened: boolean;
  hearts: number[];
  answers: Record<number, number>;
  quizStep: number;
  quizComplete: boolean;
  letterRead: boolean;
  giftReads: number[];
  giftLocks: number[];
}
