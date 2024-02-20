import getCurrentUser from '@/lib/actions/getCurrentUser';
import { DeleteProps } from '@/lib/interfaces';
import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';
import db from '@/lib/db';

export async function DELETE(
	req: Request,
	{ params }: { params: DeleteProps }
) {
	try {
		// get user
		const currentUser = await getCurrentUser();

		// fetch conversation id
		const { conversationId } = params;

		// check user
		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const existingConversation = await db.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: true,
			},
		});

		// check user
		if (!existingConversation) {
			return new NextResponse('Invalid ID', { status: 400 });
		}

		const deleteConversation = await db.conversation.deleteMany({
			where: {
				id: conversationId,
				userIds: {
					hasSome: [currentUser.id],
				},
			},
		});

		existingConversation.users.forEach((user) => {
			if (user.email) {
				pusherServer.trigger(
					user.email,
					'conversation:remove',
					existingConversation
				);
			}
		});

		return NextResponse.json(deleteConversation);
	} catch (error: any) {
		console.log(error, 'ERROR_CONVERSATION_DELETE');
		return new NextResponse('Internal Error', { status: 500 });
	}
}
