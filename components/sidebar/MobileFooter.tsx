'use client';

import useConversation from '@/lib/hooks/useConversation';
import MobileItem from '@/components/sidebar/MobileItem';
import useRoutes from '@/lib/hooks/useRoutes';

const MobileFooter = () => {
	// init route hook
	const routes = useRoutes();

	// init conversation hook
	const { isOpen } = useConversation();

	if (isOpen) {
		return null;
	}

	return (
		<div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'>
			{routes.map((item) => (
				<MobileItem
					key={item.label}
					href={item.href}
					icon={item.icon}
					active={item.active}
					onClick={item.onClick}
				/>
			))}
		</div>
	);
};

export default MobileFooter;
