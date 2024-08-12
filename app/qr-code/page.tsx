
"use client";
import QRCodeComponent from '@/components/QRCodeComponent/QRCodeComponent'

const QRCodePage = () => {
  return (
    <div className='px-[10%] py-8 bg-[#CBE9EF]  flex flex-col justify-center items-center'>
         <h1 className="text-[30px] font-bold">All Done!</h1>
         <p className="font-medium">Download your QR Code and share with family</p>
         <div className='qr-code-container mt-20 flex flex-col gap-y-5   bg-white w-[90%] shadow-lg px-3 py-10 rounded-[31px]'>
           <QRCodeComponent />
         <div className='flex gap-x-5 justify-between items-center w-full'>
         <div className='min-h-[1px] max-h-[1px] w-full bg-[#C1C1C1]'></div>
         <span className='text-nowrap text-center font-semibold text-[#6F6F6F]'>Want to redo <br />
         your information?</span>
         <div className='min-h-[1px] max-h-[1px] w-full bg-[#C1C1C1]'></div>
         </div>
         </div>
    </div>
  )
}

export default QRCodePage