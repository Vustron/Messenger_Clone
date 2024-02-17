import ConversationList from '@/components/conversations/ConversationList';
import getConversations from '@/lib/actions/getConversations';
import Sidebar from '@/components/sidebar/Sidebar';
import getUsers from '@/lib/actions/getUsers';

export default async function ConversationsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// fetch conversations
	const conversations = await getConversations();

	// fetch users
	const users = await getUsers();

	return (
		// @ts-expect-error Server Component
		<Sidebar>
			<div className='h-full'>
				<ConversationList users={users} initialItems={conversations} />
				{children}
			</div>
		</Sidebar>
	);
}
