import { LucideIcon } from 'lucide-react';

export enum SectionId {
  INTRO = 'INTRO',
  COMPONENTS = 'COMPONENTS',
  HISTORY = 'HISTORY',
  SUBJECTS = 'SUBJECTS',
  MODERN = 'MODERN',
  REVIEW = 'REVIEW',
  SUMMARY = 'SUMMARY',
  EXIT_TICKET = 'EXIT_TICKET'
}

export interface NavItem {
  id: SectionId;
  label: string;
  icon: LucideIcon;
  duration?: string;
}

export interface ComparisonRow {
  criteria: string;
  national: string;
  international: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LockedQuestion {
  id?: string;
  type: 'comprehension' | 'critical';
  question: string;
  modelAnswer: string;
}

export interface HistoryEvent {
  civilization: string;
  period: string;
  treatyName: string;
  details: {
    parties: string;
    topic: string;
    solution: string;
    extraInfo?: string;
  };
  achievements: string[];
  modernImpact: string;
  icon: string;
  quiz: QuizQuestion;
  enrichment?: string;
  discussionQuestions?: LockedQuestion[];
}

export interface ComponentCard {
  title: string;
  description: string;
  examples: string[];
  realWorld: string;
}

export interface GameItem {
  name: string;
  type: 'state' | 'org' | 'special';
  feedback: string;
}

export interface ReviewItem {
  statement: string;
  isTrue: boolean;
  correction: string;
}

export interface DiscussionTopic {
  title: string;
  points: string[];
  teacherNotes?: string;
}

export interface SectionEnrichment {
  content: string;
  sourcePage?: string;
}

export interface ModernExampleItem {
  old: string;
  new: string;
  period: string;
}