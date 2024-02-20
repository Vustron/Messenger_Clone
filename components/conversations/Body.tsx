'use client';

import MessageBox from '@/components/conversations/MessageBox';
import useConversation from '@/lib/hooks/useConversation';
import { useEffect, useRef, useState } from 'react';
import { FullMessageType } from '@/lib/types';
import { BodyProps } from '@/lib/interfaces';
import { pusherClient } from '@/lib/pusher';
import { find } from 'lodash';
import axios from 'axios';

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

	useEffect(() => {
		pusherClient.subscribe(conversationId);
		bottomRef?.current?.scrollIntoView();

		const messageHandler = (message: FullMessageType) => {
			axios.post(`/api/conversations/${conversationId}/seen`);

			setMessages((current) => {
				if (find(current, { id: message.id })) {
					return current;
				}

				return [...current, message];
			});

			bottomRef?.current?.scrollIntoView();
		};

		const updateMessageHandler = (newMessage: FullMessageType) => {
			setMessages((current) =>
				current.map((currentMessage) => {
					if (currentMessage.id === newMessage.id) {
						return newMessage;
					}

					return newMessage;
				})
			);
		};

		pusherClient.bind('messages:new', messageHandler);
		pusherClient.bind('message:update', updateMessageHandler);

		return () => {
			pusherClient.unsubscribe(conversationId);
			pusherClient.unbind('messages:new', messageHandler);
			pusherClient.unbind('messages:update', updateMessageHandler);
		};
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
