import db from '@/lib/db';

const getMessages = async (conversationId: string) => {
	try {
		// fetch messages
		const messages = await db.message.findMany({
			where: {
				conversationId: conversationId,
			},
			include: {
				sender: true,
				seen: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});

		return messages;
	} catch (error: any) {
		return [];
	}
};

export default getMessages;
