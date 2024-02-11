import db from '@/lib/db';
import getCurrentUser from '@/lib/actions/getCurrentUser';

const getConversationById = async (conversationId: string) => {
	try {
		// fetch current user
		const currentUser = await getCurrentUser();

		if (!currentUser?.email) {
			return null;
		}

		const conversation = await db.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: true,
			},
		});

		return conversation;
	} catch (error: any) {
		return null;
	}
};

export default getConversationById;
