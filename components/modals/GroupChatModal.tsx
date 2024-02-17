'use client';

import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { GroupChatModalProps } from '@/lib/interfaces';
import { useRouter } from 'next/navigation';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';

const GroupChatModal: React.FC<GroupChatModalProps> = ({
	isOpen,
	onClose,
	users,
}) => {
	// init state
	const [isLoading, setIsLoading] = useState(false);

	// init router
	const router = useRouter();

	// init form
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			members: [],
		},
	});

	const members = watch('members');

	// handle submit
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post('/api/conversations', {
				...data,
				isGroup: true,
			})
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => toast.error('Something went wrong'))
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-12'>
					<div className='border-b border-gray-900/10 pb-12'>
						<h2 className='text-base font-semibold leading-7 text-gray-900'>
							Create a group chat
						</h2>

						<span className='mt-1 text-sm leading-6 text-gray-600'>
							Create a chat with more than 2 people
						</span>

						<div className='mt-10 flex flex-col gap-y-8'>
							<Input
								register={register}
								label='Name'
								id='name'
								disabled={isLoading}
								required
								errors={errors}
							/>

							<Select
								disabled={isLoading}
								label='Members'
								options={users.map((user) => ({
									value: user.id,
									label: user.name,
								}))}
								onChange={(value) =>
									setValue('members', value, {
										shouldValidate: true,
									})
								}
								value={members}
							/>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<Button
						disabled={isLoading}
						onClick={onClose}
						type='button'
						secondary
					>
						Cancel
					</Button>
					<Button disabled={isLoading} type='submit'>
						Create
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default GroupChatModal;
