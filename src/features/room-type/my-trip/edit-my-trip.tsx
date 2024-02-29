import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Modal from '@/components/modal';
import Typography from '@/components/typography';

import DatepickerComponent from '@/features/property/datepicker/desktop-datepicker';

import EditGuestsComponent from './edit-guests';

type Props = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};

const Container = tw.div``;

export default function EditTripComponent({
  className,
  isOpen,
  onClose,
}: Props) {
  const { t } = useTranslation();

  return (
    <Container className={cn(className)} data-testid='test-element'>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='md'
        footerClassName='p-2'
        headerClassName='p-6'
        header={
          <Typography variant='h2' weight='normal' className=''>
            {t('title.edit-my-trip')}
          </Typography>
        }
      >
        {/* <EditDatesComponent /> */}
        <DatepickerComponent />
        <EditGuestsComponent onClose={onClose} />
      </Modal>
    </Container>
  );
}
