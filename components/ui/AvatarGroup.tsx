'use client';

import { AvatarGroupProps } from '@/lib/interfaces';
import Image from 'next/image';

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
	// slice users
	const slicedUsers = users.slice(0, 3);

	const positionMap = {
		0: 'top-0 left-[12px]',
		1: 'bottom-0',
		2: 'bottom-0 right-0',
	};
	return (
		<div className='relative h-11 w-11'>
			{slicedUsers.map((user, index) => (
				<div
					key={user.id}
					className={`
            absolute
            inline-block
            rounded-full
            overflow-hidden
            h-[21px]
            w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
            `}
				>
					<Image
						alt='Avatar'
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						src={user?.image || '/images/placeholder.jpg'}
					/>
				</div>
			))}
		</div>
	);
};

export default AvatarGroup;
