/* eslint-disable no-console */
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { formatCurrency } from '@/lib/number';

import { Button, Icon, Typography } from '@/components';

import { useReservationStore, useSessionStore, useUserStore } from '@/store';

import { PAYMENT_STATUS } from '@/constants';
import HotelRules from '@/features/components/hotel-rules';

import data from './data.json';

type Props = {
  roomTypeId: number;
};

const HR = tw.div`
  hr border-t-[10px] border-neutral-60
`;

export default function CheckoutForm({ roomTypeId }: Props) {
  const { t } = useTranslation();

  const stripe = useStripe();
  const elements = useElements();
  const { session } = useSessionStore();
  const { reservation } = useReservationStore();
  const { user } = useUserStore();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // @TODO chekear esto
    // if (!session) {
    //   redirect('/');
    // }

    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      PAYMENT_STATUS.REQUIER_INTENT_CLIENT_SECRET,
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return setMessage('');
      }
      switch ((paymentIntent as { status: string }).status) {
        case PAYMENT_STATUS.SUCCEEDED:
          console.log('paymentIntent', paymentIntent);
          setMessage(t('status.payment-succeeded'));
          break;
        case PAYMENT_STATUS.PROCESSING:
          setMessage(t('status.payment-processing'));
          break;
        case PAYMENT_STATUS.REQUIRE_PAYMENT_METHOD:
          setMessage(t('status.requires_payment_method'));
          break;
        default:
          setMessage(t('status.wrong'));
          break;
      }
    });
  }, [session, stripe, t]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log('stripe', stripe, elements);

      if (!stripe || !elements) return;

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:3000/room-type/${roomTypeId}/summary${window.location.search}`,
        },
      });

      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error?.message || t('status.unexpected-error'));
      } else {
        setMessage(t('status.unexpected-error'));
      }
      setIsLoading(false);
    },
    [elements, roomTypeId, stripe, t],
  );

  return (
    <>
      <form id='payment-form' onSubmit={handleSubmit}>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className=''
        >
          <Typography variant='h2' weight='normal'>
            {t('info.payment-details')}
          </Typography>

          <Typography className='py-4'>
            {t('info.hello-customer', {
              name: user?.given_name || t('info.customer'),
              lastname: user?.family_name || '',
            })}
          </Typography>
          <Typography className='pb-4'>
            {t('info.payment-booking-notification-email', {
              email: user?.email,
            })}
          </Typography>

          {reservation?.totalCost && (
            <Typography className='pb-4'>
              {t('info.payment-cancellation-policy', {
                amount: formatCurrency(reservation?.totalCost ?? 0, 'EUR'),
              })}
            </Typography>
          )}

          {reservation?.taxes && (
            <Typography className='pb-4'>
              {t('info.payment-taxes-description', {
                amount: formatCurrency(reservation?.taxes ?? 0, 'EUR'),
              })}
            </Typography>
          )}

          <PaymentElement
            id='payment-element'
            options={{ layout: 'accordion' }}
          />
        </motion.section>

        <HR />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className=''
        >
          <Typography variant='h2' weight='normal'>
            {t('info.payment-share')}
          </Typography>
          <Typography variant='sm' className='my-[20px] text-neutral-500'>
            {t('info.payment-comments')}
          </Typography>
          <textarea
            id='story'
            name='story'
            rows={5}
            className='w-full'
            placeholder={t('form.textarea.placeholder')}
          />
        </motion.section>

        <HR />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className=''
        >
          <Typography variant='h2' weight='normal'>
            {t('info.taxes-details')}
          </Typography>
          <Typography variant='sm' className='my-[20px] text-neutral-500'>
            {t('info.taxes-description')}
          </Typography>
        </motion.section>

        <HR />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className=''
        >
          <div className='py-4 pb-7'>
            <HotelRules rules={data.rules} />
          </div>
        </motion.section>

        <HR />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='pb-8'
        >
          <Typography variant='sm' className='my-[20px] mb-10 text-neutral-500'>
            {t('info.payment-termsandconditions-1')}{' '}
            <Link href='' className='underline'>
              {t('info.payment-termsandconditions-2')}
            </Link>
          </Typography>
          <Button
            type='submit'
            disabled={isLoading || !stripe || !elements}
            id='submit'
            className='w-full'
          >
            {isLoading ? (
              <span className='flex items-center justify-between'>
                <Icon
                  variant='three-dots-loading'
                  width={24}
                  height={24}
                  color='#fff'
                />
                <span className='ml-2 flex-grow animate-pulse text-center'>
                  {t('button.processing')}
                </span>
              </span>
            ) : (
              t('button.confirm-pay')
            )}
          </Button>
          {message && (
            <div id='payment-message' className='pt-1 text-error-500'>
              {message}
            </div>
          )}
        </motion.section>
      </form>
    </>
  );
}
