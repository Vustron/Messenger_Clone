import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { IconType } from 'react-icons';

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
