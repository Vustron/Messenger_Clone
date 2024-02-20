import getCurrentUser from '@/lib/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';
import db from '@/lib/db';

export async function POST(req: Request) {
	try {
		// get user
		const currentUser = await getCurrentUser();

		// parse body
		const body = await req.json();

		const { userId, isGroup, members, name } = body;

		// check user
		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		// check group members
		if (isGroup && (!members || members.length < 2 || !name)) {
			return new NextResponse('Invalid data', { status: 400 });
		}

		if (isGroup) {
			const newConversation = await db.conversation.create({
				data: {
					name,
					isGroup,
					users: {
						connect: [
							...members.map((member: { value: string }) => ({
								id: member.value,
							})),
							{
								id: currentUser.id,
							},
						],
					},
				},
				include: {
					users: true,
				},
			});

			newConversation.users.forEach((user) => {
				if (user.email) {
					pusherServer.trigger(user.email, 'conversation:new', newConversation);
				}
			});

			return NextResponse.json(newConversation);
		}

		const existingConversations = await db.conversation.findMany({
			where: {
				OR: [
					{
						userIds: {
							equals: [currentUser.id, userId],
						},
					},
					{
						userIds: {
							equals: [userId, currentUser.id],
						},
					},
				],
			},
		});

		const singleConversation = existingConversations[0];

		if (singleConversation) {
			return NextResponse.json(singleConversation);
		}

		const newConversation = await db.conversation.create({
			data: {
				users: {
					connect: [
						{
							id: currentUser.id,
						},
						{
							id: userId,
						},
					],
				},
			},
			include: {
				users: true,
			},
		});

		newConversation.users.map((user) => {
			if (user.email) {
				pusherServer.trigger(user.email, 'conversation:new', newConversation);
			}
		});

		return NextResponse.json(newConversation);
	} catch (error: any) {
		console.log(error, 'REGISTRATION_ERROR');
		return new NextResponse('Internal Error', { status: 500 });
	}
}
