import getConversationById from '@/lib/actions/getConversationById';
import Header from '@/components/conversations/Header';
import { ConversationProps } from '@/lib/interfaces';
import EmptyState from '@/components/ui/EmptyState';
import getMessages from '@/lib/actions/getMessages';
import Body from '@/components/conversations/Body';
import Form from '@/components/conversations/Form';

const ConversationPage = async ({ params }: { params: ConversationProps }) => {
	// fetch conversation
	const conversation = await getConversationById(params.conversationId);

	// fetch messages
	const messages = await getMessages(params.conversationId);

	if (!conversation) {
		return (
			<div className='lg:pl-80 h-full'>
				<div className='h-full flex flex-col'>
					<EmptyState />
				</div>
			</div>
		);
	}
	return (
		<div className='lg:pl-80 h-full'>
			<div className='h-full flex flex-col'>
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Form />
			</div>
		</div>
	);
};

export default ConversationPage;
