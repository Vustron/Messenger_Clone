import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthContext from '@/lib/context/AuthContext';
import ActiveStatus from '@/components/ui/ActiveStatus';
import ToasterContext from '@/lib/context/ToasterContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Messenger Clone',
	description: 'Messenger Clone',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthContext>
					<ToasterContext />
					<ActiveStatus />
					{children}
				</AuthContext>
			</body>
		</html>
	);
}
