export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  price: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  rating: number;
  enrolledStudents: number;
  thumbnail: string;
  modules: Module[];
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  expertise: string[];
  rating: number;
  totalStudents: number;
  courses: Course[];
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledCourses: Course[];
  completedCourses: Course[];
  progress: {
    courseId: string;
    completion: number;
  }[];
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateEarned: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular: boolean;
  maxCourses?: number;
  maxUsers?: number;
}