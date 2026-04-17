import { Photo, TimelineEvent, Reason, PromiseItem, QuizQuestion } from './types';

export const COLORS = {
  primary: '#D4537E',
  primaryLight: '#F4C0D1',
  primaryDark: '#4B1528',
  accent: '#FAC775',
  background: '#FFFAF9',
  card: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
};

export const RECIPIENT_NAME = "Amna";

// Original Gallery Photos
export const PHOTOS: Photo[] = [
  { id: 'featured', url: '/birthday-photo.jpeg', caption: 'Happy Birthday, Amna! 🎂' },
  { id: '1', url: '/1.jpeg', caption: 'First Meetup at GIKI on Media Fest 25' },
  { id: '2', url: '/2.jpeg', caption: 'The laughter' },
  { id: '3', url: '/3.jpeg', caption: 'Morning Talks' },
  { id: '4', url: '/4.jpeg', caption: 'Exploring with you' },
  { id: '5', url: '/5.jpeg', caption: 'Your beautiful smile' },
  { id: '6', url: '/6.jpeg', caption: 'A memory I will cherish forever' },
];

// Personal Memory Photos (used for reasons, timeline, and scattering)
export const MEMORY_PHOTOS: Photo[] = [
  { id: 'm1', url: '/memories/img_1.jpeg', caption: 'That beautiful smile that lights up my world.' },
  { id: 'm2', url: '/memories/img_2.jpeg', caption: 'A moment captured in time, forever in my heart.' },
  { id: 'm3', url: '/memories/img_3.jpeg', caption: 'Every picture tells a story of us.' },
  { id: 'm4', url: '/memories/img_4.jpeg', caption: 'Looking back at our wonderful moments together.' },
  { id: 'm5', url: '/memories/img_5.jpeg', caption: 'The way you look at the world is so inspiring.' },
  { id: 'm6', url: '/memories/img_6.jpeg', caption: 'Capturing the joy of being with you.' },
  { id: 'm7', url: '/memories/img_7.jpeg', caption: 'Simplicity and beauty in one frame.' },
  { id: 'm8', url: '/memories/img_8.jpeg', caption: 'Another memory to cherish forever.' },
  { id: 'm9', url: '/memories/img_9.jpeg', caption: 'You make every day feel like a celebration.' },
  { id: 'm10', url: '/memories/img_10.jpeg', caption: 'The best parts of my life are spent with you.' },
  { id: 'm11', url: '/memories/img_11.jpeg', caption: 'Radiating happiness, as always.' },
  { id: 'm12', url: '/memories/img_12.jpeg', caption: 'A candid moment of pure happiness.' },
  { id: 'm13', url: '/memories/img_13.jpeg', caption: 'Always my favorite view.' },
  { id: 'm14', url: '/memories/img_14.jpeg', caption: 'To many more memories like this.' },
  { id: 'm15', url: '/memories/img_15.jpeg', caption: 'Ending the year with the best person.' },
];

export const REASONS: Reason[] = [
  { id: '1', text: 'Because you still check on your friends even when you are exhausted.', imageUrl: '/memories/img_1.jpeg' },
  { id: '2', text: 'The way your eyes light up when you talk about something you love.', imageUrl: '/memories/img_2.jpeg' },
  { id: '3', text: 'How you always know exactly how to make me laugh.', imageUrl: '/memories/img_3.jpeg' },
  { id: '4', text: 'Your incredible kindness towards everyone you meet.', imageUrl: '/memories/img_11.jpeg' },
  { id: '5', text: 'The way you handle challenges with such grace and strength.', imageUrl: '/memories/img_4.jpeg' },
  { id: '6', text: 'Because you make the best cup of tea in the world.', imageUrl: '/memories/img_12.jpeg' },
  { id: '7', text: 'Your passion for life and everything you do.', imageUrl: '/memories/img_5.jpeg' },
  { id: '8', text: 'The way you look at me when you think I am not looking.', imageUrl: '/memories/img_13.jpeg' },
  { id: '9', text: 'Because you are my best friend and my greatest support.', imageUrl: '/memories/img_6.jpeg' },
  { id: '10', text: 'Simply because you are you, and that is more than enough.', imageUrl: '/memories/img_14.jpeg' },
];

export const TIMELINE: TimelineEvent[] = [
  { id: '1', date: '24th January 2025', title: 'The Day We Met', description: 'At GIKI, I knew there was something special about you.', imageUrl: '/memories/img_7.jpeg' },
  { id: '2', date: 'February 2025', title: 'Our First Call', description: 'Talking for hours on the phone, getting to know each other deeply.', imageUrl: '/memories/img_8.jpeg' },
  { id: '3', date: 'June 2025', title: 'First "I Love You"', description: 'Under the stars, it felt like the most natural thing to say.', imageUrl: '/memories/img_9.jpeg' },
  { id: '4', date: 'September 2025', title: 'Special Messages', description: 'Waking up to your sweet messages made my day so much better.', imageUrl: '/memories/img_10.jpeg' },
  { id: '5', date: 'April 2026', title: 'Today', description: 'Celebrating you and the beautiful person you are. Happy Birthday!', imageUrl: '/birthday-photo.jpeg' },
];

export const PROMISES: PromiseItem[] = [
  { id: '1', text: 'I promise to always be your biggest cheerleader.' },
  { id: '2', text: 'I promise to listen, even when we disagree.' },
  { id: '3', text: 'I promise to keep making you laugh every single day.' },
  { id: '4', text: 'I promise to grow with you and support your dreams.' },
  { id: '5', text: 'I promise to always choose us.' },
];

export const QUIZ: QuizQuestion[] = [
  {
    id: '1',
    question: 'Where was our very first meetup?',
    options: ['GIKI', 'The Cinema', 'A Cafe', 'The Beach'],
    correctAnswer: 0,
  },
  {
    id: '2',
    question: 'What is my favorite thing about you?',
    options: ['Your Smile', 'Your Kindness', 'Your Laugh', 'Everything'],
    correctAnswer: 3,
  },
  {
    id: '3',
    question: 'Which song is "our" song?',
    options: ['Perfect', 'All of Me', 'Lover', 'Thinking Out Loud'],
    correctAnswer: 2,
  },
  {
    id: '4',
    question: 'When did we first meet?',
    options: ['24th January 2025', '1st January 2025', '14th February 2025', '25th December 2024'],
    correctAnswer: 0,
  },
  {
    id: '5',
    question: 'Where did Media Fest 25 take place?',
    options: ['GIKI', 'NUST', 'LUMS', 'FAST'],
    correctAnswer: 0,
  },
  {
    id: '6',
    question: 'What is my favorite color on you?',
    options: ['Red', 'Black', 'White', 'Blue'],
    correctAnswer: 1,
  },
  {
    id: '7',
    question: 'Which ice cream flavor do we both love?',
    options: ['Chocolate', 'Vanilla', 'Mango', 'Kulfa'],
    correctAnswer: 0,
  },
  {
    id: '8',
    question: 'What was the first movie we watched together?',
    options: ['Munna Micheal', 'The Notebook', 'Spider-Man', 'Inception'],
    correctAnswer: 0,
  },
  {
    id: '9',
    question: 'Who is more likely to fall asleep during a movie?',
    options: ['Me', 'You', 'Both', 'Neither'],
    correctAnswer: 1,
  },
  {
    id: '10',
    question: 'What is our dream travel destination?',
    options: ['Switzerland', 'Turkey', 'Japan', 'Maldives'],
    correctAnswer: 1,
  },
];
