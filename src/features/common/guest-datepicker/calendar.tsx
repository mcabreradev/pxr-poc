import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import { useLocale, useMediaQuery, useWindowSize } from '@/hooks';

import { Icon, Typography } from '@/components';

import { MOBILE_DEVICE_CSS_QUERY } from '@/constants';

interface CalendarComponentProps {
  planDays: number;
  dayMonthYear: string | null;
  handleCalendarOpen: () => void;
  handleCalendarClose: () => void;
  startDate: Date | null;
  endDate: Date | null;
  onChange: (date: Date) => void;
}

export default function CalendarComponent({
  planDays,
  dayMonthYear,
  handleCalendarOpen,
  handleCalendarClose,
  startDate,
  endDate,
  onChange,
}: CalendarComponentProps) {
  const { t } = useTranslation();
  const { size } = useWindowSize();
  const { locale } = useLocale();
  const isSmallDevice = useMediaQuery(MOBILE_DEVICE_CSS_QUERY);

  const today = dayjs();

  const DayPickerText = ({
    value,
    onClick,
  }: {
    value?: string;
    onClick?: () => void;
  }) => (
    <Typography
      variant='sm'
      weight='normal'
      className='flex underline'
      onClick={onClick}
    >
      {value}
      <Icon variant='dot' width={20} height={20} color='#000' />
    </Typography>
  );

  const DatePickerDay = (day: string) => (
    <span className='flex items-center justify-center'>{`${day}`}</span>
  );

  const Calendar = () => (
    <DatePicker
      onCalendarOpen={handleCalendarOpen}
      onCalendarClose={handleCalendarClose}
      showPopperArrow={false}
      locale={locale}
      selected={startDate}
      onChange={onChange}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      monthsShown={isSmallDevice ? 2 : 3}
      customInput={<DayPickerText />}
      renderDayContents={DatePickerDay}
      dateFormat='MMM dd'
      minDate={today.toDate()}
      calendarClassName='!flex flex-col md:flex-row gap-0 md:gap-2 !font-sans md:justify-around'
      wrapperClassName='w-full'
      selectsRange
      selectsDisabledDaysInRange
      disabledKeyboardNavigation
      shouldCloseOnSelect={false}
      inline
    />
  );

  return (
    <div className='rounded-[24px] border-solid border-white bg-white py-3 pl-4 drop-shadow'>
      {size.height > 700 && (
        <div className='m-2 my-2 flex-none'>
          <Typography variant='h1'>
            {planDays
              ? `${planDays} ${t('night.plural')}`
              : t('info.when-is-the-travel')}
          </Typography>

          <Typography
            variant='sm2'
            weight='medium'
            className='lowercase text-neutral-400'
          >
            {dayMonthYear ? dayMonthYear : t('info.select-your-date')}
          </Typography>
        </div>
      )}
      <Calendar />
    </div>
  );
}
