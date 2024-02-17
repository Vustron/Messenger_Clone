'use client';

import LoadingModal from '@/components/modals/LoadingModal';
import { UserBoxProps } from '@/lib/interfaces';
import { useCallback, useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
	// init router
	const router = useRouter();

	// init state
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = useCallback(() => {
		setIsLoading(true);

		axios
			.post('/api/conversations', {
				userId: data.id,
			})
			.then((data) => {
				router.push(`/conversations/${data.data.id}`);
			})
			.finally(() => setIsLoading(false));
	}, [data, router]);

	return (
		<>
			{isLoading && <LoadingModal />}

			<div
				className='w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
				onClick={handleClick}
			>
				<Avatar user={data} />
				<div className='min-w-0 flex-1'>
					<div className='focus:outline-none'>
						<div className='flex justify-between items-center mb-1'>
							<span className='text-sm font-medium text-gray-900'>
								{data.name}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserBox;
