import db from '@/lib/db';
import getSession from '@/lib/actions/getSession';

const getCurrentUser = async () => {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const currentUser = await db.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		});

		if (!currentUser) {
			return null;
		}

		return currentUser;
	} catch (error: any) {
		return null;
	}
};

export default getCurrentUser;
