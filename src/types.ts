export interface Photo {
  id: string;
  url: string;
  caption: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Reason {
  id: string;
  text: string;
}

export interface PromiseItem {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface GuestbookMessage {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  emoji?: string;
  createdAt: any;
}
