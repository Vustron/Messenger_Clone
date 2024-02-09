import { User } from '@prisma/client';
import { IconType } from 'react-icons';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface InputProps {
	label: string;
	id: string;
	type?: string;
	required?: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	disabled?: boolean;
}

export interface ButtonProps {
	type?: 'button' | 'submit' | 'reset' | undefined;
	fullWidth?: boolean;
	children?: React.ReactNode;
	onClick?: () => void;
	secondary?: boolean;
	danger?: boolean;
	disabled?: boolean;
}

export interface AuthSocialButtonProps {
	icon: IconType;
	onClick: () => void;
}

export interface AuthContextProps {
	children: React.ReactNode;
}

export interface DesktopItemProps {
	label: string;
	icon: any;
	href: string;
	onClick?: () => void;
	active?: boolean;
}

export interface MobileItemProps {
	icon: any;
	href: string;
	onClick?: () => void;
	active?: boolean;
}

export interface DesktopSidebarProps {
	currentUser: User;
}

export interface AvatarProps {
	user?: User;
}

export interface UserListProps {
	items: User[];
}

export interface UserBoxProps {
	data: User;
}
