import tw from 'tailwind-styled-components';

const Container = tw.footer`
  relative
  box-border
  flex 
  h-[308px] 
  w-full 
  flex-col 
  overflow-hidden 
  border-t-[1px] 
  border-solid 
  border-gray 
  bg-white-100 
  p-4 
  text-left 
  text-sm 
  text-gray
`;
export default function FooterComponent() {
  return (
    <Container>
      <div className='flex w-full flex-col justify-around text-left text-[14px] font-semibold text-black'>
        <div className='flex-row flex'>
          <div className='w-full '>Español</div>
          <div className='w-full'>$ USD</div> 
        </div>
        <div>www.terrazasposta.com</div>
        <div>kyamashita@terrazasposta.com</div>
        <div>+54 388 490-8053</div>
        <div>Whatsapp</div>
        <div></div>
        <div>Terminos y condiciones</div>
        <div>© {new Date().getFullYear()} Paxer LLC</div>
      </div>
    </Container>
  );
}
