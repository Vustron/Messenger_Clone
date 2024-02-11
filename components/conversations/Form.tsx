'use client';

import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import MessageInput from '@/components/conversations/MessageInput';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import useConversation from '@/lib/hooks/useConversation';
import { CldUploadButton } from 'next-cloudinary';
import axios from 'axios';

const Form = () => {
	// fetch conversation id
	const { conversationId } = useConversation();

	// init form
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			message: '',
		},
	});

	// submit handler
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		try {
			setValue('message', '', { shouldValidate: true });

			axios.post('/api/messages', {
				...data,
				conversationId,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// image upload handler
	const handleUpload = (result: any) => {
		try {
			axios.post('/api/messages', {
				image: result?.info?.secure_url,
				conversationId,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
			<CldUploadButton
				options={{ maxFiles: 1 }}
				onUpload={handleUpload}
				uploadPreset='mq5j5tfl'
			>
				<HiPhoto size={30} className='text-sky-500' />
			</CldUploadButton>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex items-center gap-2 lg:gap-4 w-full'
			>
				<MessageInput
					id='message'
					register={register}
					errors={errors}
					required
					placeholder='Write a message'
				/>

				<button
					type='submit'
					className='rounded-full p-2 bg-sky-500 hover:bg-sky-600 transition'
				>
					<HiPaperAirplane size={18} className='text-white' />
				</button>
			</form>
		</div>
	);
};

export default Form;
