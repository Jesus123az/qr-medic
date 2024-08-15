import { useUserStore } from '@/store/user/userStore';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';
import { Printer } from 'lucide-react';
import qrLogo from "@/assets/qr-logo.png"

const QRCodeComponent = () => {
  const {user} = useUserStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      if (typeof window !== 'undefined') {
        const QRCodeStyling = (await import('qr-code-styling')).default;
        const qrCode = new QRCodeStyling({
          width: 300,
          height: 300,
          image: qrLogo.src,
          data: `https://mind-ar-backend-production.up.railway.app/ar-app?id=${user?._id}`,
          dotsOptions: {
            color: "#072138",
            type: "rounded"
          },
          cornersSquareOptions:{
            color: "#A20601",
            type: "extra-rounded"
          },
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 0
          }
        });

        if (ref.current) {
          ref.current.innerHTML = '';
          qrCode.append(ref.current);
        }
      }
    };

    generateQRCode();
  }, []);

  return(
    <div className=' md:flex gap-x-5  md:items-center md:self-center md:translate-x-[12%] '>
  <div className='w-40 md:w-auto' ref={ref} />
  <div className='flex mt-5 md:mt-0 flex-col items-center gap-y-4  mx-auto'>
     <Button className='bg-white border-2 border-[#7D9F0C] text-[#7D9F0C] '>Download <Download /></Button>
     <Button className='bg-[#E7FBFF] border-2 border-[#2AA1B7] text-[#2AA1B7] w-fit '>Print <Printer /></Button>
  </div>
  </div>
);
};

export default QRCodeComponent;