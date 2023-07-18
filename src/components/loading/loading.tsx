export default function LoadingComponent() {
  return (
    <div
      className='flex h-screen items-center justify-center'
      data-testid='test-element'
    >
      <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-green'></div>
    </div>
  );
}
