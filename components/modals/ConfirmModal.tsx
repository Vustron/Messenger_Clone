'use client';

import useConversation from '@/lib/hooks/useConversation';
import { ConfirmModalProps } from '@/lib/interfaces';
import { FiAlertTriangle } from 'react-icons/fi';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Dialog } from '@headlessui/react';
import Modal from '@/components/ui/Modal';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
	// init router
	const router = useRouter();

	// init conversation hook
	const { conversationId } = useConversation();

	// init state
	const [isLoading, setIsLoading] = useState(false);

	const onDelete = useCallback(() => {
		setIsLoading(true);

		axios
			.delete(`/api/conversations/${conversationId}`)
			.then(() => {
				onClose();
				router.push('/conversations');
				router.refresh();
			})
			.catch(() => toast.error('Something went wrong!'))
			.finally(() => setIsLoading(false));
	}, [conversationId, router, onClose]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className='sm:flex sm:items-start'>
				<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
					<FiAlertTriangle className='h-6 w-6 text-red-600' />
				</div>

				<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
					<Dialog.Title
						as='h3'
						className='text-base font-semibold leading-6 text-gray-900'
					>
						Delete Conversation
					</Dialog.Title>

					<div className='mt-2'>
						<span className='text-sm text-gray-500'>
							Are you sure you want to delete this conversation? This action
							cannot be undone.
						</span>
					</div>
				</div>
			</div>
			<div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
				<Button disabled={isLoading} danger onClick={onDelete}>
					Delete
				</Button>
				<Button disabled={isLoading} secondary onClick={onClose}>
					Cancel
				</Button>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
