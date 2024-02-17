'use client';

import ImageModal from '@/components/modals/ImageModal';
import { MessageBoxProps } from '@/lib/interfaces';
import { useSession } from 'next-auth/react';
import Avatar from '@/components/ui/Avatar';
import { format } from 'date-fns';
import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
	// fetch session
	const session = useSession();

	// init state
	const [imageModalOpen, setImageModalOpen] = useState(false);

	// init current sender
	const isOwn = session?.data?.user?.email === data?.sender?.email;

	// init seen list
	const seenList = (data.seen || [])
		.filter((user) => user.email !== data?.sender?.email)
		.map((user) => user.name)
		.join(', ');

	// init dynamic classes
	const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');

	const avatar = clsx(isOwn && 'order-2');

	const body = clsx('flex flex-col gap-2', isOwn && 'items-end');

	const message = clsx(
		'text-sm w-fit overflow-hidden',
		isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
		data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
	);

	return (
		<div className={container}>
			<div className={avatar}>
				<Avatar user={data.sender} />
			</div>

			<div className={body}>
				<div className='flex items-center gap-1'>
					<div className='text-sm text-gray-500'>{data.sender.name}</div>
					<div className='text-xs text-gray-400'>
						{format(new Date(data.createdAt), 'p')}
					</div>
				</div>

				<div className={message}>
					<ImageModal
						src={data.image}
						isOpen={imageModalOpen}
						onClose={() => setImageModalOpen(false)}
					/>
					{data.image ? (
						<Image
							onClick={() => setImageModalOpen(true)}
							alt='image'
							height='288'
							width='288'
							src={data.image}
							className='object-cover cursor-pointer hover:scale-110 transition translate'
						/>
					) : (
						<span>{data.body}</span>
					)}
				</div>
				{isLast && isOwn && seenList.length > 0 && (
					<div className='text-xs font-light text-gray-500'>
						{`Seen by ${seenList}`}
					</div>
				)}
			</div>
		</div>
	);
};

export default MessageBox;
