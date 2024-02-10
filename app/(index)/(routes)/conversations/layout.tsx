import ConversationList from '@/components/conversations/ConversationList';
import getConversations from '@/lib/actions/getConversations';
import Sidebar from '@/components/sidebar/Sidebar';

export default async function ConversationsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// fetch conversations
	const conversations = await getConversations();

	return (
		// @ts-expect-error Server Component
		<Sidebar>
			<div className='h-full'>
				<ConversationList initialItems={conversations} />
				{children}
			</div>
		</Sidebar>
	);
}
