'use client';

import { MobileItemProps } from '@/lib/interfaces';
import Link from 'next/link';
import clsx from 'clsx';

const MobileItem: React.FC<MobileItemProps> = ({
	href,
	icon: Icon,
	onClick,
	active,
}) => {
	// handle click
	const handleClick = () => {
		if (onClick) {
			return onClick();
		}
	};

	return (
		<Link
			href={href}
			onClick={onClick}
			className={clsx(
				`
        group
        flex gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500
        hover:text-black
        hover:bg-gray-100
        `,
				active && 'bg-gray-100 text-black'
			)}
		>
			<Icon className='h-6 w-6' />
		</Link>
	);
};

export default MobileItem;
