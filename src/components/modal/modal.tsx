'use client';

import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Modal, ModalProps } from 'flowbite-react';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

type Props = {
  header?: React.ReactNode | string;
  headerClassName?: string;
  children?: React.ReactNode | string;
  footer?: React.ReactNode | string;
  footerClassName?: string;
  isOpen: boolean;
  onClose: () => void;
};

const Container = tw.div``;

export default function ModalComponent({
  header,
  children,
  isOpen,
  footer,
  onClose,
  headerClassName,
  footerClassName,
  ...props
}: Props & ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onClose();
    }, 300);
  };

  if (!isOpen) {
    return null;
  }

  const theme: CustomFlowbiteTheme['modal'] = {
    header: {
      close: {
        base: 'hover:bg-green-100 hover:text-gray-900',
        icon: 'h-10 w-10',
      },
    },
  };

  return (
    <Container
      className={`modal ${isAnimating ? 'fade-out' : ''}`}
      data-testid='modal-test-element'
    >
      <Modal
        show={isOpen}
        onClose={handleClose}
        popup
        position='center'
        theme={theme}
        {...props}
      >
        {header && (
          <Modal.Header className={cn('border-l', headerClassName)}>
            {header}
          </Modal.Header>
        )}
        <Modal.Body className={cn('space-y-6')}>{children}</Modal.Body>
        {footer && (
          <Modal.Footer className={cn('flex justify-end', footerClassName)}>
            {footer}
          </Modal.Footer>
        )}
      </Modal>
    </Container>
  );
}
