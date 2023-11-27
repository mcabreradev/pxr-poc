'use client';

import { Modal } from 'flowbite-react';
import tw from 'tailwind-styled-components';

interface Props {
  header?: string;
  children?: React.ReactNode | string;
  footer?: React.ReactNode | string;
  isOpen: boolean;
  onClose: () => void;
}

const Container = tw.div``;

export default function ModalComponent({
  header,
  children,
  footer,
  isOpen,
  onClose,
}: Props) {
  return (
    <Container data-testid='modal-test-element'>
      <Modal show={isOpen} onClose={onClose} popup>
        <Modal.Header className='border-l'>{header}</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>{children}</div>
        </Modal.Body>
        <Modal.Footer>{footer}</Modal.Footer>
      </Modal>
    </Container>
  );
}
