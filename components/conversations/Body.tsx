'use client';

import MessageBox from '@/components/conversations/MessageBox';
import useConversation from '@/lib/hooks/useConversation';
import { BodyProps } from '@/lib/interfaces';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
	// init state
	const [messages, setMessages] = useState(initialMessages);

	// init latest message
	const bottomRef = useRef<HTMLDivElement>(null);

	// init conversation hook
	const { conversationId } = useConversation();

	// seen update
	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	return (
		<div className='flex-1 overflow-y-auto'>
			{messages.map((message, i) => (
				<MessageBox
					isLast={i === messages.length - 1}
					key={message.id}
					data={message}
				/>
			))}

			<div ref={bottomRef} className='pt-24' />
		</div>
	);
};

export default Body;
