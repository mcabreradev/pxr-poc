import { Button, Icon } from '@/components';

import { CALENDAR, GUESTSINFO } from '@/constants';

interface Props {
  show: string | null;
  planDays: number;
  totalGuests: number;
  loading: boolean;
  setShowHandler: (value: string | null) => void;
  handleSearch: () => void;
  resetCalendarHandler: () => void;
  resetAllHandler: () => void;
}

const ButtonsComponent = ({
  show,
  planDays,
  totalGuests,
  loading,
  setShowHandler,
  handleSearch,
  resetCalendarHandler,
  resetAllHandler,
}: Props) => (
  <div className='md:layout mb-4 flex flex-none justify-between'>
    <div>
      {show === CALENDAR && !!planDays && (
        <Button
          type='button'
          variant='text'
          slim={true}
          onClick={resetCalendarHandler}
        >
          Reestableecer
        </Button>
      )}

      {!planDays && (
        <Button
          type='button'
          variant='text'
          slim={true}
          onClick={() => setShowHandler(null)}
        >
          Omitir
        </Button>
      )}

      {show === GUESTSINFO && (
        <Button
          type='button'
          variant='text'
          slim={true}
          onClick={() => setShowHandler(CALENDAR)}
        >
          Regresar
        </Button>
      )}

      {!show && planDays > 0 && totalGuests > 0 && (
        <Button
          type='button'
          variant='text'
          slim={true}
          onClick={resetAllHandler}
        >
          Borrar todo
        </Button>
      )}
    </div>

    <div>
      {show === CALENDAR && !!planDays && (
        <Button
          type='button'
          variant='primary'
          onClick={() => setShowHandler(GUESTSINFO)}
        >
          Siguiente
        </Button>
      )}

      {show === GUESTSINFO && planDays > 0 && (
        <Button
          type='button'
          variant='primary'
          disabled={!totalGuests}
          loading={loading}
          icon={<Icon variant='search' color='white' width={15} height={15} />}
          onClick={handleSearch}
        >
          Buscar
        </Button>
      )}

      {!show && (
        <Button
          type='button'
          variant='primary'
          disabled={!planDays || !totalGuests}
          loading={loading}
          icon={<Icon variant='search' color='white' width={15} height={15} />}
          onClick={handleSearch}
        >
          Buscar
        </Button>
      )}
    </div>
  </div>
);

export default ButtonsComponent;
