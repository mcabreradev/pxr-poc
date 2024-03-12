/* eslint-disable no-console */
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { formatCurrency } from '@/lib/number';

import { Button, Icon, Typography } from '@/components';

import {
  useReservationRequestStore,
  useReservationStore,
  useSessionStore,
} from '@/store';

import { PAYMENT_STATUS } from '@/constants';
import HotelRules from '@/features/components/hotel-rules';
import { useReservationRequestMutation } from '@/mutations';

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
  const { reservationRequest, setReservationData } =
    useReservationRequestStore();
  const { reservation } = useReservationStore();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, data: reservationRequestResponse } =
    useReservationRequestMutation();

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
          //
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

  useEffect(() => {
    if (reservationRequest.process_state == 'SUCCESS_PAYMENT') {
      // console.log("BEFORE MUTATE");
      // console.log(reservationRequest);
      mutate(reservationRequest);
    }
  }, [reservationRequest, mutate]);

  useEffect(() => {
    // console.log("HERE IS THE SECOND RESPONSE");
    // console.log(reservationRequestResponse);

    if (
      reservationRequestResponse != undefined &&
      reservationRequestResponse.res.code == 0
    ) {
      setReservationData({
        id_public: reservationRequestResponse.res.data.id_public,
        reservation_id: reservationRequestResponse.res.data.reservation_id,
      });
      redirect(`/room-type/${roomTypeId}/summary${window.location.search}`);
    }
  }, [reservationRequestResponse, roomTypeId, setReservationData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // console.log("AM I REALLY HERE");

      if (!stripe || !elements) return;

      setIsLoading(true);

      /*completeReservationRequestData({
        payment_id: 2073,
        guest_preferred_language: 'es',
        guest_email: session?.email,
        guest_country_code: 'VEN',
      })
      console.log("ABOUT TO FORMALIZE REQUEST");
      mutate(reservationRequest);*/

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
            {t('Tu información de pago')}
          </Typography>

          <Typography className='py-4'>
            {t('info.hello-customer', {
              name: session?.given_name || t('info.customer'),
              lastname: session?.family_name || '',
            })}
          </Typography>
          <Typography className='pb-4'>
            {t('info.payment-booking-notification-email', {
              email: session?.email,
            })}
          </Typography>

          {reservation?.planCost && (
            <Typography className='pb-4'>
              {t('info.payment-cancellation-policy', {
                amount: formatCurrency(reservation?.planCost ?? 0),
              })}
            </Typography>
          )}

          {reservation?.taxes && (
            <Typography className='pb-4'>
              {t('info.payment-taxes-description', {
                amount: formatCurrency(reservation?.taxes ?? 0),
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
          className='px-4'
        >
          <Typography variant='h2' weight='normal'>
            {t('¿Alguna petición especial?')}
          </Typography>
          <Typography variant='sm' className='my-[20px] text-neutral-500'>
            Comparte por qué estás viajando, tu hora de llegada, o solicitudes
            especiales. La propiedad hará todo lo posible para satisfacer tus
            necesidades.
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
          className='px-4'
        >
          <Typography variant='h2' weight='normal'>
            {t('Detalles de los impuestos')}
          </Typography>
          <Typography variant='sm' className='my-[20px] text-neutral-500'>
            Los impuestos deben ser pagados a tu llegada al hotel
          </Typography>
        </motion.section>

        <HR />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='px-4'
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
          className='px-4 pb-8'
        >
          <Typography variant='sm' className='my-[20px] mb-10 text-neutral-500'>
            Al confirmar la reserva, acepto los{' '}
            <Link href='' className='underline'>
              términos y condiciones de Paxer.
            </Link>
          </Typography>
          <Button
            disabled={false}
            id='submit'
            onClick={handleSubmit}
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
