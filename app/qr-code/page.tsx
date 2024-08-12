
"use client";
import QRCodeComponent from '@/components/QRCodeComponent/QRCodeComponent'
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
const QRCodePage = () => {
  return (
    <div className='px-[10%] py-8 bg-[#CBE9EF]  flex flex-col justify-center items-center'>
         <h1 className="text-[30px] font-bold">All Done!</h1>
         <p className="font-medium">Download your QR Code and share with family</p>
         <div className='qr-code-container mt-20 flex flex-col gap-y-5   bg-white w-[90%] shadow-lg px-3 py-10 rounded-[31px]'>
            
            <div className='flex gap-x-5 items-center self-center translate-x-[12%] '>
         <QRCodeComponent />
         <div className='flex flex-col items-center gap-y-4'>
            <Button className='bg-white border-2 border-[#7D9F0C] text-[#7D9F0C] '>Download <Download /></Button>
            <Button className='bg-[#E7FBFF] border-2 border-[#2AA1B7] text-[#2AA1B7] w-fit '>Print <Printer /></Button>
         </div>
         </div>
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