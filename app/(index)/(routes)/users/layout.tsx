import UserList from '@/components/sidebar/UserList';
import Sidebar from '@/components/sidebar/Sidebar';
import getUsers from '@/lib/actions/getUsers';

export default async function UsersLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// fetch users
	const users = await getUsers();

	return (
		// @ts-expect-error Server Component
		<Sidebar>
			<div className='h-full'>
				<UserList items={users} />
				{children}
			</div>
		</Sidebar>
	);
}
