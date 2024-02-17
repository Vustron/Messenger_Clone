'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { SettingsModalProps } from '@/lib/interfaces';
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const SettingsModal: React.FC<SettingsModalProps> = ({
	isOpen,
	onClose,
	currentUser,
}) => {
	// init router
	const router = useRouter();

	// init state
	const [isLoading, setIsLoading] = useState(false);

	// init form
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: currentUser?.name,
			image: currentUser?.image,
		},
	});

	const image = watch('image');

	const handleUpload = (result: any) => {
		setValue('image', result?.info?.secure_url, {
			shouldValidate: true,
		});
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post('/api/settings', data)
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => toast.error('Something went wrong!'))
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-12'>
					<div className='border-b border-gray-900/10 pb-12'>
						<h2 className='text-base font-semibold leading-7 text-gray-900'>
							Profile
						</h2>

						<span className='mt-1 text-sm leading-6 text-gray-600'>
							Edit your public information
						</span>

						<div className='mt-10 flex flex-col gap-y-8'>
							<Input
								disabled={isLoading}
								label='Name'
								id='name'
								errors={errors}
								required
								register={register}
							/>

							<div>
								<label className='block text-sm font-medium leading-6 text-gray-900'>
									Profile Picture
								</label>

								<div className='mt-2 flex items-center gap-x-3'>
									<Image
										width='48'
										height='48'
										className='rounded-full'
										src={
											image || currentUser?.image || '/images/placeholder.jpg'
										}
										alt='Avatar'
									/>
									<CldUploadButton
										options={{ maxFiles: 1 }}
										onUpload={handleUpload}
										uploadPreset='mq5j5tfl'
									>
										<a className='font-semibold'>Change Profile Picture</a>
									</CldUploadButton>
								</div>
							</div>
						</div>
					</div>

					<div className='mt-6 flex items-center justify-end gap-x-6'>
						<Button disabled={isLoading} secondary onClick={onClose}>
							Cancel
						</Button>
						<Button disabled={isLoading} type='submit'>
							Save
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	);
};

export default SettingsModal;
