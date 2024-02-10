import db from '@/lib/db';
import getCurrentUser from '@/lib/actions/getCurrentUser';

const getConversations = async () => {
	// get user
	const currentUser = await getCurrentUser();

	if (!currentUser?.id) {
		return [];
	}

	try {
		// find conversation
		const conversations = db.conversation.findMany({
			orderBy: {
				lastMessageAt: 'desc',
			},
			where: {
				userIds: {
					has: currentUser.id,
				},
			},
			include: {
				users: true,
				messages: {
					include: {
						sender: true,
						seen: true,
					},
				},
			},
		});

		return conversations;
	} catch (error: any) {
		return [];
	}
};

export default getConversations;
