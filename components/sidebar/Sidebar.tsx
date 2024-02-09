import DesktopSidebar from '@/components/sidebar/DesktopSidebar';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='h-full'>
			<DesktopSidebar />
			<main className='lg:pl-20 h-full'>{children}</main>
		</div>
	);
};

export default Sidebar;
