'use client';

import clsx from 'clsx';
import EmptyState from '@/components/ui/EmptyState';
import useConversation from '@/lib/hooks/useConversation';

const ConversationPage = () => {
	// init conversation hook
	const { isOpen } = useConversation();

	return (
		<div
			className={clsx(
				`
        lg:pl-80
        h-full
        lg:block
        `,
				isOpen ? 'block' : 'hidden'
			)}
		>
			<EmptyState />
		</div>
	);
};

export default ConversationPage;
