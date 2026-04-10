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

export const RECIPIENT_NAME = "Sara";

export const PHOTOS: Photo[] = [
  { id: '1', url: 'https://picsum.photos/seed/love1/800/600', caption: 'Our first date at the park' },
  { id: '2', url: 'https://picsum.photos/seed/love2/800/1000', caption: 'That sunset we watched together' },
  { id: '3', url: 'https://picsum.photos/seed/love3/800/600', caption: 'Coffee mornings are the best' },
  { id: '4', url: 'https://picsum.photos/seed/love4/800/800', caption: 'Exploring the city' },
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
  { id: '1', date: 'March 2023', title: 'The Day We Met', description: 'At that small cafe, I knew there was something special about you.' },
  { id: '2', date: 'April 2023', title: 'Our First Date', description: 'Walking through the botanical gardens, talking for hours.' },
  { id: '3', date: 'June 2023', title: 'First "I Love You"', description: 'Under the stars, it felt like the most natural thing to say.' },
  { id: '4', date: 'September 2023', title: 'Our First Trip', description: 'Exploring the mountains and making so many memories.' },
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
    question: 'Where was our very first date?',
    options: ['Botanical Gardens', 'The Cinema', 'A Cafe', 'The Beach'],
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
];
