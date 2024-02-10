import { Conversation, Message, User } from '@prisma/client';

export type Variant = 'LOGIN' | 'REGISTER';

export type FullMessageType = Message & {
	sender: User;
	seen: User[];
};

export type FullConversationType = Conversation & {
	users: User[];
	messages: FullMessageType[];
};
