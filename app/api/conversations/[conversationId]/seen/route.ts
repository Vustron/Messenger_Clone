import getCurrentUser from '@/lib/actions/getCurrentUser';
import { SeenProps } from '@/lib/interfaces';
import { pusherServer } from '@/lib/pusher';
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request, { params }: { params: SeenProps }) {
	try {
		// get user
		const currentUser = await getCurrentUser();

		// fetch conversation id
		const { conversationId } = params;

		// check user
		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		// find existing conversation
		const conversation = await db.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				messages: {
					include: {
						seen: true,
					},
				},
				users: true,
			},
		});

		if (!conversation) {
			return new NextResponse('Invalid ID', { status: 400 });
		}

		// find last message
		const lastMessage = conversation.messages[conversation.messages.length - 1];

		if (!lastMessage) {
			return NextResponse.json(conversation);
		}

		// update seen last message
		const updatedMessage = await db.message.update({
			where: {
				id: lastMessage.id,
			},
			include: {
				sender: true,
				seen: true,
			},
			data: {
				seen: {
					connect: {
						id: currentUser.id,
					},
				},
			},
		});

		await pusherServer.trigger(currentUser.email, 'conversation:update', {
			id: conversationId,
			messages: [updatedMessage],
		});

		if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
			return NextResponse.json(conversation);
		}

		await pusherServer.trigger(
			conversationId!,
			'message:update',
			updatedMessage
		);

		return NextResponse.json(updatedMessage);
	} catch (error: any) {
		console.log(error, 'ERROR_MESSAGES_SEEN');
		return new NextResponse('Internal Error', { status: 500 });
	}
}
