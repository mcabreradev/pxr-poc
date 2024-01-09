/* eslint-disable no-constant-condition */
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { PAYMENT_STATUS } from '@/constants';

import data from './data.json';

const HR = tw.div`
  hr border-t-[10px] border-neutral-60
`;

export default function CheckoutForm() {
  const { t } = useTranslation();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
  }, [stripe, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error?.message || t('status.unexpected-error'));
    } else {
      setMessage(t('status.unexpected-error'));
    }
    setIsLoading(false);
  };

  return (
    <>
      <form id='payment-form' onSubmit={handleSubmit}>
        <section className='p-4'>
          <Typography variant='h2' weight='normal'>
            {t('Tu información de pago')}
          </Typography>
          <Typography variant='sm' className='my-[20px] text-neutral-500'>
            <p className='pb-1'>Hola Cliente, </p>
            <p className='pb-1'>
              Luego de que coloques la información de pago se te enviará la
              confirmación de esta reserva a email@gmail.com.
            </p>
            <p className='pb-1'>
              Se te cobrará $ 400.00 en este momento de acuerdo a la política de
              cancelación escogida.
            </p>
            <p className='pb-1'>
              Le recordamos que deberá realizar el pagos de impuestos de $50.00
              al momento de su llegada al hotel.
            </p>
          </Typography>

          <PaymentElement
            id='payment-element'
            options={{ layout: 'accordion' }}
          />
        </section>

        <HR />

        <section className='px-4'>
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
        </section>

        <HR />

        <section className='px-4'>
          <Typography variant='h2' weight='normal'>
            {t('Detalles de los impuestos')}
          </Typography>
          <Typography variant='sm' className='my-[20px] text-neutral-500'>
            Los impuestos deben ser pagados a tu llegada al hotel
          </Typography>
        </section>

        <HR />

        <section className='px-4'>
          <div className='py-4 pb-7'>
            <Typography variant='h2' weight='normal'>
              {t('title.hotel-rules')}
            </Typography>

            <div className='my-4'>
              {data.rules.map((rule, key) => (
                <div
                  key={`$rules-${key}`}
                  className='flex justify-between py-2'
                >
                  <Typography>{rule.name}</Typography>
                  <Typography weight='light'>{rule.description}</Typography>
                </div>
              ))}
            </div>

            <Typography weight='semibold' className='underline'>
              {t('info.show-more')}
            </Typography>
          </div>
        </section>
        <HR />
        <section className='px-4 pb-8'>
          <Typography variant='sm' className='my-[20px] mb-10 text-neutral-500'>
            Al confirmar la reserva, acepto los{' '}
            <Link href='' className='underline'>
              términos y condiciones de Paxer.
            </Link>
          </Typography>
          <Button
            disabled={isLoading || !stripe || !elements}
            id='submit'
            className='md:w-full'
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
        </section>
      </form>
    </>
  );
}
