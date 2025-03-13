import { useEffect } from 'react';

export const useCloseOnOutsideClick = (
	isOpen: boolean,
	ref: React.RefObject<HTMLElement>,
	onClose: () => void
) => {
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, ref, onClose]);
};