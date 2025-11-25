
export type Role = 'user' | 'assistant';
// === Types gợi ý ===
type TextPart = { type: 'text'; text: string };
type FilePart = { type: 'file'; name: string; url: string };
export type ContentPart = TextPart | FilePart;

export interface Message {
  id: number;
  role: Role;
  time: string;
  content: ContentPart;
};


export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  isTyping?: boolean;
  error?: string | null;
}

export interface ChatState {
  chats: Record<string, Chat>;
  chatOrder: string[];
  selectedId: string | null;
}

export type ChatAction =
  | { type: 'CREATE_CHAT'; payload?: { title?: string } }
  | { type: 'SELECT_CHAT'; payload: { id: string } }
  | { type: 'DELETE_CHAT'; payload: { id: string } }
  | { type: 'SEND_MESSAGE'; payload: { chatId: string; content: string } }
  | { type: 'RECEIVE_MESSAGE'; payload: { chatId: string; content: string } }
  | { type: 'SET_TYPING'; payload: { chatId: string; value: boolean } }
  | { type: 'SET_ERROR'; payload: { chatId: string; error: string | null } }
  | { type: 'CLEAR_CURRENT_CHAT' }
  | { type: 'HYDRATE'; payload: ChatState };
