'use client';

import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from '@/components/conversations/ProfileDrawer';
import useOtherUser from '@/lib/hooks/useOtherUser';
import { HeaderProps } from '@/lib/interfaces';
import Avatar from '@/components/ui/Avatar';
import { useMemo, useState } from 'react';
import Link from 'next/link';

const Header: React.FC<HeaderProps> = ({ conversation }) => {
	// init state
	const [drawerOpen, setDrawerOpen] = useState(false);

	// init user hook
	const otherUser = useOtherUser(conversation);

	// init status
	const statusText = useMemo(() => {
		if (conversation.isGroup) {
			return `${conversation.users.length} members`;
		}

		return 'Active';
	}, [conversation]);

	return (
		<>
			<ProfileDrawer
				data={conversation}
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			/>

			<div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
				<div className='flex gap-3 items-center'>
					<Link
						href='/conversations'
						className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
					>
						<HiChevronLeft size={32} />
					</Link>

					<Avatar user={otherUser} />
					<div className='flex flex-col'>
						<span>{conversation.name || otherUser.name}</span>
						<span className='text-sm font-light text-neutral-500'>
							{statusText}
						</span>
					</div>
				</div>

				<HiEllipsisHorizontal
					size={32}
					onClick={() => setDrawerOpen(true)}
					className='text-sky-500 cursor-pointer hover:text-sky-600 transition'
				/>
			</div>
		</>
	);
};

export default Header;
