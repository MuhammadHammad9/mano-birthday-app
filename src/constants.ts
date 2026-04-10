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

export const PHOTOS: Photo[] = [
  { id: '1', url: 'https://picsum.photos/seed/love1/800/600', caption: 'First Meetup at GIKI on Media Fest 25' },
  { id: '2', url: 'https://picsum.photos/seed/love2/800/1000', caption: 'The laughter' },
  { id: '3', url: 'https://picsum.photos/seed/love3/800/600', caption: 'Morning Talks' },
  { id: '4', url: 'https://picsum.photos/seed/love4/800/800', caption: 'Exploring with you' },
  { id: '5', url: 'https://picsum.photos/seed/love5/800/600', caption: 'Your beautiful smile' },
  { id: '6', url: 'https://picsum.photos/seed/love6/800/1200', caption: 'A memory I will cherish forever' },
];

export const REASONS: Reason[] = [
  { id: '1', text: 'Because you still check on your friends even when you are exhausted.' },
  { id: '2', text: 'The way your eyes light up when you talk about something you love.' },
  { id: '3', text: 'How you always know exactly how to make me laugh.' },
  { id: '4', text: 'Your incredible kindness towards everyone you meet.' },
  { id: '5', text: 'The way you handle challenges with such grace and strength.' },
  { id: '6', text: 'Because you make the best cup of tea in the world.' },
  { id: '7', text: 'Your passion for life and everything you do.' },
  { id: '8', text: 'The way you look at me when you think I am not looking.' },
  { id: '9', text: 'Because you are my best friend and my greatest support.' },
  { id: '10', text: 'Simply because you are you, and that is more than enough.' },
];

export const TIMELINE: TimelineEvent[] = [
  { id: '1', date: '24th January 2025', title: 'The Day We Met', description: 'At GIKI, I knew there was something special about you.' },
  { id: '2', date: 'February 2025', title: 'Our First Call', description: 'Talking for hours on the phone, getting to know each other deeply.' },
  { id: '3', date: 'June 2025', title: 'First "I Love You"', description: 'Under the stars, it felt like the most natural thing to say.' },
  { id: '4', date: 'September 2025', title: 'You sent alot of Happy birthdays', description: 'Waking up to your sweet messages made my day so much better.' },
  { id: '5', date: 'April 2026', title: 'Today', description: 'Celebrating you and the beautiful person you are. Happy Birthday!' },
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
