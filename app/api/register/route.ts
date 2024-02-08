import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, name, password } = body;

		if (!email || !name || !password) {
			return new NextResponse('Missing Info', { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await db.user.create({
			data: {
				email,
				name,
				hashedPassword,
			},
		});

		return NextResponse.json(user);
	} catch (error: any) {
		console.log(error, 'REGISTRATION_ERROR');
		return new NextResponse('Internal Error', { status: 500 });
	}
}
