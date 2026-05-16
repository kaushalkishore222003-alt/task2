export type Role = "ADMIN" | "MEMBER";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "BLOCKED";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  joinedAt: string;
  workspaceId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "ARCHIVED" | "COMPLETED";
  progress: number;
  deadline: string;
  members: string[]; // User IDs
  createdAt: string;
  creatorId: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignedTo?: string; // User ID
  dueDate: string;
  createdAt: string;
  comments: Comment[];
  attachments: string[];
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  isRead: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
