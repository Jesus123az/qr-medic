import { useEffect, useRef } from 'react';

const QRCodeComponent = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      if (typeof window !== 'undefined') {
        const QRCodeStyling = (await import('qr-code-styling')).default;
        const qrCode = new QRCodeStyling({
          width: 300,
          height: 300,
          image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
          data: "http://localhost:3000/api/users/66ad5b216e710ad2464f4ced",
          dotsOptions: {
            color: "#072138",
            type: "rounded"
          },
          cornersSquareOptions:{
            color: "#7A914B",
            type: "extra-rounded"
          },
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
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