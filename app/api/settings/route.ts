import getCurrentUser from '@/lib/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
	try {
		// get user
		const currentUser = await getCurrentUser();

		// parse body
		const body = await req.json();

		const { name, image } = body;

		// check user
		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const updatedUser = await db.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				name: name,
				image: image,
			},
		});

		return NextResponse.json(updatedUser);
	} catch (error: any) {
		console.log(error, 'ERROR_SETTINGS');
		return new NextResponse('Internal Error', { status: 500 });
	}
}
