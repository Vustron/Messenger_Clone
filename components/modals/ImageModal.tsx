'use client';

import { ImageModalProps } from '@/lib/interfaces';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
	if (!src) {
		return null;
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className='w-80 h-80'>
				<Image
					alt='Image'
					className='object-cover'
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					src={src}
				/>
			</div>
		</Modal>
	);
};

export default ImageModal;
