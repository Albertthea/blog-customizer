import arrow from 'src/images/arrow.svg';
import { forwardRef } from 'react';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export type OnClick = (e: React.MouseEvent<HTMLDivElement>) => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

export const ArrowButton = forwardRef<HTMLDivElement, ArrowButtonProps>(
	({ isOpen, onClick }) => {
	  return (
		<div
		  role="button"
		  aria-label="Открыть/Закрыть форму параметров статьи"
		  tabIndex={0}
		  className={clsx(styles.container, {
			[styles.container_open]: isOpen,
		  })}
		  onClick={(e) => {
			onClick(e);
		  }}
		>
		  <img
			src={arrow}
			alt="иконка стрелки"
			className={clsx(styles.arrow, {
			  [styles.arrow_open]: isOpen,
			})}
		  />
		</div>
	  );
	}
);