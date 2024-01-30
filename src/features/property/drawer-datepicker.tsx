import Drawer from '@/components/drawer';

import useReservationStore from '@/store/use-reservation-persist.store';

export default function DrawerDatepickerComponent() {
  const {
    reservation: { isOpenDatepickerDrawer },
    closeDatepickerDrawer,
  } = useReservationStore();

  return (
    <Drawer
      icon='cancel'
      open={isOpenDatepickerDrawer}
      onClose={closeDatepickerDrawer}
    >
      <h1>Holis</h1>
    </Drawer>
  );
}
