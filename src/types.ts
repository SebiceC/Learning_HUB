export interface Question {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  title: string;
  content: string;
  quiz: Question;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: CourseModule[];
}

export interface RelatedStandard {
  id: string;
  reason: string;
}
