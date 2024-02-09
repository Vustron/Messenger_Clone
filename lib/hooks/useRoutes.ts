import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import useConversation from '@/lib/hooks/useConversation';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { HiChat } from 'react-icons/hi';
import { useMemo } from 'react';

const useRoutes = () => {
	// init path
	const pathName = usePathname();

	// init id
	const { conversationId } = useConversation();

	// init routes
	const routes = useMemo(
		() => [
			{
				label: 'Chat',
				href: '/conversations',
				icon: HiChat,
				active: pathName === '/conversations' || !!conversationId,
			},
			{
				label: 'Users',
				href: '/users',
				icon: HiUsers,
				active: pathName === '/users',
			},
			{
				label: 'Logout',
				href: '#',
				onClick: () => signOut(),
				icon: HiArrowLeftOnRectangle,
			},
		],
		[pathName, conversationId]
	);

	return routes;
};

export default useRoutes;
