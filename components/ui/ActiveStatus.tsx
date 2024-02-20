'use client';

import useActiveChannel from '@/lib/hooks/useActiveChannel';

const ActiveStatus = () => {
	// use active channel hook
	useActiveChannel();

	return null;
};

export default ActiveStatus;
