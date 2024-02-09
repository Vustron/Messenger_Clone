'use client';

import DesktopItem from '@/components/sidebar/DesktopItem';
import useRoutes from '@/lib/hooks/useRoutes';
import { useState } from 'react';

const DesktopSidebar = () => {
	// init route hook
	const routes = useRoutes();

	// init state
	const [isOpen, SetIsOpen] = useState(false);

	return (
		<div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between'>
			<nav className='mt-4 flex flex-col justify-between'>
				<ul className='flex flex-col items-center space-y-1' role='list'>
					{routes.map((item) => (
						<DesktopItem
							key={item.label}
							href={item.href}
							label={item.label}
							icon={item.icon}
							active={item.active}
							onClick={item.onClick}
						/>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default DesktopSidebar;
