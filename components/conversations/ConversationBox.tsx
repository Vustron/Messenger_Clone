'use client';

import { Conversation, Message, User } from '@prisma/client';
import { ConversationBoxProps } from '@/lib/interfaces';
import useOtherUser from '@/lib/hooks/useOtherUser';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Avatar from '@/components/ui/Avatar';
import { format } from 'date-fns';
import clsx from 'clsx';

const ConversationBox: React.FC<ConversationBoxProps> = ({
	data,
	selected,
}) => {
	// init other user hook
	const otherUser = useOtherUser(data);

	// init session
	const session = useSession();

	// init router
	const router = useRouter();

	// handle click
	const handleClick = useCallback(() => {
		router.push(`/conversations/${data.id}`);
	}, [data.id, router]);

	// init last message
	const lastMessage = useMemo(() => {
		const messages = data.messages || [];

		return messages[messages.length - 1];
	}, [data.messages]);

	// init user email
	const userEmail = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	// init seen
	const hasSeen = useMemo(() => {
		if (!lastMessage) {
			return false;
		}

		const seenArray = lastMessage.seen || [];

		if (!userEmail) {
			return false;
		}

		return seenArray.filter((user) => user.email === userEmail).length !== 0;
	}, [userEmail, lastMessage]);

	// init last message text
	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) {
			return 'Sent an image';
		}

		if (lastMessage?.body) {
			return lastMessage.body;
		}

		return 'Started a conversation';
	}, [lastMessage]);

	return (
		<div
			className={clsx(
				`
    w-full
    relative
    flex
    items-center
    space-x-3
    hover:bg-neutral-100
    rounded-lg
    transition
    cursor-pointer
    p-3
    `,
				selected ? 'bg-neutral-100' : 'bg-white'
			)}
			onClick={handleClick}
		>
			<Avatar user={otherUser} />

			<div className='min-w-0 flex-1'>
				<div className='focus:outline-none'>
					<div className='flex justify-between items-center mb-1'>
						<span className='text-md font-medium text-gray-900'>
							{data.name || otherUser.name}
						</span>

						{lastMessage?.createdAt && (
							<span className='text-xs text-gray-400 font-light'>
								{format(new Date(lastMessage.createdAt), 'p')}
							</span>
						)}
					</div>

					<span
						className={clsx(
							`
                    truncate
                    text-sm
                    `,
							hasSeen ? 'text-gray-500' : 'text-black font-semibold'
						)}
					>
						{lastMessageText}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ConversationBox;
