export interface Course {
  id: string;
  title: string;
  description: string;
  skills: string[];
  modules: Module[];
  imageUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  content: string;
  quiz?: Quiz;
  videoUrl?: string;
}

export interface Quiz {
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface UserProgress {
  completedModules: string[];
  quizScores: Record<string, number>;
  canMint: boolean;
}

export interface Certificate {
  tokenId: number;
  courseName: string;
  completionDate: number;
  skills: string[];
  recipient: string;
  metadataURI: string;
  txHash: string;
}
