'use client';

import { ButtonProps } from '@/lib/interfaces';
import clsx from 'clsx';

const Button: React.FC<ButtonProps> = ({
	type,
	fullWidth,
	children,
	onClick,
	secondary,
	danger,
	disabled,
}) => {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={clsx(
				`
        flex
        justify-center
        rounded-md
        px-3
        py-2
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        `,
				disabled && 'opacity-50 cursor-default',
				fullWidth && 'w-full',
				secondary ? 'text-gray-900' : 'text-white',
				danger && 'bg-red-500 hover:bg-red-600 focus-visible:outline-red-600',
				!secondary &&
					!danger &&
					'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
			)}
		>
			{children}
		</button>
	);
};

export default Button;
