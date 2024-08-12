import { useUserStore } from '@/store/user/userStore';
import { useEffect, useRef } from 'react';

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
          image: "/qr-logo.png",
          data: `https://mind-ar-backend-1.onrender.com/ar-app?id=${user?._id}`,
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

  return <div ref={ref} />;
};

export default QRCodeComponent;