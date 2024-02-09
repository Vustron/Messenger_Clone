'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthContextProps } from '@/lib/interfaces';

export default function AuthContext({ children }: AuthContextProps) {
	return <SessionProvider>{children}</SessionProvider>;
}
