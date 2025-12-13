
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const page=()=> {
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('عنوان پیشنهادی');
  const [isClient, setIsClient] = useState(false);
  const editorRef = useRef(null);


  useEffect(() => {
    setIsClient(true);
  }, []);

 
 const config = useMemo(() => ({
    readonly: false,
    placeholder: 'متن خود را اینجا بنویسید...',
    direction: 'rtl',
    language: 'fa',
    height: 400,
    theme: 'default',
    toolbarButtonSize: 'medium',
    
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough',
      '|', 'ul', 'ol', 'outdent', 'indent',
      '|', 'font', 'fontsize', 'brush',
      '|', 'align', 'undo', 'redo',
      '|', 'image', 'table', 'link', 'hr',
      '|', 'fullscreen', 'preview', 'print'
    ],
    
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg'],
    },
    
   
    style: {
      font: '16px "Vazir", "IranSans", Arial, Tahoma, sans-serif !important',
    },
    
    defaultStyle: `
      font-family: "Vazir",  "IranSans", Arial, Tahoma, sans-serif !important;
      font-size: 16px !important;
      line-height: 1.8 !important;
      color: #333 !important;
    `,
    
   
    editorClassName: 'vazir-font-editor',
    
 
    controls: {
      font: {
        list: {
          '': 'پیش‌فرض',
          'Vazir, Arial, sans-serif': 'وزیر',
  'IranSans, Arial, sans-serif': 'ایران سنس',
          'Arial, Helvetica, sans-serif': 'آریال',
          'Tahoma, Geneva, sans-serif': 'تهوما'
        }
      },
      fontsize: {
        list: ['8', '10', '12', '14', '16', '18', '20', '24', '28', '32']
      }
    }
  }), []);
  
 


  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);

  };

 


 


const defaultContent = `
  <!-- هدر با طراحی رسپانسیو -->
  <div class="template-header" style="
    background: #f0f5ff;
    padding: clamp(12px, 3vw, 20px);
    border-right: 4px solid #240579;
    margin-bottom: clamp(16px, 4vw, 24px);
    border-radius: 8px;
  ">
    <h2 style="
      color: #240579; 
      margin: 0 0 clamp(8px, 2vw, 12px) 0; 
      font-size: clamp(18px, 4vw, 22px);
      line-height: 1.4;
    ">
      ساختار پیش‌فرض پروژه
    </h2>
    <p style="
      color: #666; 
      margin: 0; 
      font-size: clamp(13px, 3vw, 15px);
      line-height: 1.5;
    ">
      این بخش‌ها به عنوان راهنما نمایش داده می‌شوند
    </p>
  </div>
   <div class="section-template" style="
    background: linear-gradient(90deg, rgba(36,5,121,0.05) 0%, rgba(36,5,121,0.02) 100%);
    padding: clamp(16px, 4vw, 24px);
    margin-bottom: clamp(12px, 3vw, 20px);
    border-radius: clamp(8px, 2vw, 12px);
    border: 2px dashed rgba(36,5,121,0.2);
  ">
    <div style="
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: clamp(10px, 3vw, 16px);
      margin-bottom: clamp(12px, 3vw, 16px);
    ">
      <span style="
        background: #240579; 
        color: white; 
        width: clamp(28px, 6vw, 36px); 
        height: clamp(28px, 6vw, 36px); 
        min-width: clamp(28px, 6vw, 36px);
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: clamp(14px, 3vw, 16px);
        font-weight: bold;
        flex-shrink: 0;
      ">
        1
      </span>
      <div style="flex: 1; min-width: 0;">
        <h2 style="
          color: #240579; 
          margin: 0 0 clamp(6px, 1.5vw, 10px) 0; 
          font-size: clamp(16px, 3.5vw, 20px);
          line-height: 1.4;
        ">
عنوان         </h2>
       
      </div>
    </div>
    <!-- فضای خالی برای محتوای کاربر -->
    <div style="
      min-height: clamp(40px, 8vw, 60px); 
      padding: clamp(8px, 2vw, 12px);
      background: rgba(255,255,255,0.5);
      border-radius: 6px;
      margin-top: clamp(8px, 2vw, 12px);
    ">
    ${title}</div>
  </div>
   <div class="section-template" style="
    background: linear-gradient(90deg, rgba(36,5,121,0.05) 0%, rgba(36,5,121,0.02) 100%);
    padding: clamp(16px, 4vw, 24px);
    margin-bottom: clamp(12px, 3vw, 20px);
    border-radius: clamp(8px, 2vw, 12px);
    border: 2px dashed rgba(36,5,121,0.2);
  ">
    <div style="
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: clamp(10px, 3vw, 16px);
      margin-bottom: clamp(12px, 3vw, 16px);
    ">
      <span style="
        background: #240579; 
        color: white; 
        width: clamp(28px, 6vw, 36px); 
        height: clamp(28px, 6vw, 36px); 
        min-width: clamp(28px, 6vw, 36px);
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: clamp(14px, 3vw, 16px);
        font-weight: bold;
        flex-shrink: 0;
      ">
        2
      </span>
      <div style="flex: 1; min-width: 0;">
        <h2 style="
          color: #240579; 
          margin: 0 0 clamp(6px, 1.5vw, 10px) 0; 
          font-size: clamp(16px, 3.5vw, 20px);
          line-height: 1.4;
        ">
          خلاصه اجرایی
        </h2>
        <div style="color: #666; font-size: clamp(13px, 2.8vw, 15px); line-height: 1.6;">
          <p style="margin: 0;">در این بخش خلاصه‌ای از کل پروژه را بنویسید...</p>
        </div>
      </div>
    </div>
    <!-- فضای خالی برای محتوای کاربر -->
    <div style="
      min-height: clamp(40px, 8vw, 60px); 
      padding: clamp(8px, 2vw, 12px);
      background: rgba(255,255,255,0.5);
      border-radius: 6px;
      margin-top: clamp(8px, 2vw, 12px);
    "></div>
  </div>
  
 
  

  <div class="section-template" style="
    background: linear-gradient(90deg, rgba(36,5,121,0.05) 0%, rgba(36,5,121,0.02) 100%);
    padding: clamp(16px, 4vw, 24px);
    margin-bottom: clamp(12px, 3vw, 20px);
    border-radius: clamp(8px, 2vw, 12px);
    border: 2px dashed rgba(36,5,121,0.2);
  ">
    <div style="
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: clamp(10px, 3vw, 16px);
      margin-bottom: clamp(12px, 3vw, 16px);
    ">
      <span style="
        background: #240579; 
        color: white; 
        width: clamp(28px, 6vw, 36px); 
        height: clamp(28px, 6vw, 36px); 
        min-width: clamp(28px, 6vw, 36px);
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: clamp(14px, 3vw, 16px);
        font-weight: bold;
        flex-shrink: 0;
      ">
        3
      </span>
      <div style="flex: 1; min-width: 0;">
        <h2 style="
          color: #240579; 
          margin: 0 0 clamp(6px, 1.5vw, 10px) 0; 
          font-size: clamp(16px, 3.5vw, 20px);
          line-height: 1.4;
        ">
          معرفی پروژه
        </h2>
        <div style="color: #666; font-size: clamp(13px, 2.8vw, 15px); line-height: 1.6;">
          <p style="margin: 0;">پروژه خود را به طور کامل معرفی کنید...</p>
        </div>
      </div>
    </div>
    <!-- فضای خالی برای محتوای کاربر -->
    <div style="
      min-height: clamp(40px, 8vw, 60px); 
      padding: clamp(8px, 2vw, 12px);
      background: rgba(255,255,255,0.5);
      border-radius: 6px;
      margin-top: clamp(8px, 2vw, 12px);
    "></div>
  </div>
  
 
  <div class="section-template" style="
    background: linear-gradient(90deg, rgba(36,5,121,0.05) 0%, rgba(36,5,121,0.02) 100%);
    padding: clamp(16px, 4vw, 24px);
    margin-bottom: clamp(12px, 3vw, 20px);
    border-radius: clamp(8px, 2vw, 12px);
    border: 2px dashed rgba(36,5,121,0.2);
  ">
    <div style="
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: clamp(10px, 3vw, 16px);
      margin-bottom: clamp(12px, 3vw, 16px);
    ">
      <span style="
        background: #240579; 
        color: white; 
        width: clamp(28px, 6vw, 36px); 
        height: clamp(28px, 6vw, 36px); 
        min-width: clamp(28px, 6vw, 36px);
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: clamp(14px, 3vw, 16px);
        font-weight: bold;
        flex-shrink: 0;
      ">
        4
      </span>
      <div style="flex: 1; min-width: 0;">
        <h2 style="
          color: #240579; 
          margin: 0 0 clamp(6px, 1.5vw, 10px) 0; 
          font-size: clamp(16px, 3.5vw, 20px);
          line-height: 1.4;
        ">
          بیانیه مسئله
        </h2>
        <div style="color: #666; font-size: clamp(13px, 2.8vw, 15px); line-height: 1.6;">
          <p style="margin: 0;">مسئله یا نیاز اصلی پروژه را توضیح دهید...</p>
        </div>
      </div>
    </div>
    <!-- فضای خالی برای محتوای کاربر -->
    <div style="
      min-height: clamp(40px, 8vw, 60px); 
      padding: clamp(8px, 2vw, 12px);
      background: rgba(255,255,255,0.5);
      border-radius: 6px;
      margin-top: clamp(8px, 2vw, 12px);
    "></div>
  </div>
  
 
  <div class="section-template" style="
    background: linear-gradient(90deg, rgba(36,5,121,0.05) 0%, rgba(36,5,121,0.02) 100%);
    padding: clamp(16px, 4vw, 24px);
    margin-bottom: clamp(12px, 3vw, 20px);
    border-radius: clamp(8px, 2vw, 12px);
    border: 2px dashed rgba(36,5,121,0.2);
  ">
    <div style="
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: clamp(10px, 3vw, 16px);
      margin-bottom: clamp(12px, 3vw, 16px);
    ">
      <span style="
        background: #240579; 
        color: white; 
        width: clamp(28px, 6vw, 36px); 
        height: clamp(28px, 6vw, 36px); 
        min-width: clamp(28px, 6vw, 36px);
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: clamp(14px, 3vw, 16px);
        font-weight: bold;
        flex-shrink: 0;
      ">
        5
      </span>
      <div style="flex: 1; min-width: 0;">
        <h2 style="
          color: #240579; 
          margin: 0 0 clamp(6px, 1.5vw, 10px) 0; 
          font-size: clamp(16px, 3.5vw, 20px);
          line-height: 1.4;
        ">
          اهداف پروژه
        </h2>
        <div style="color: #666; font-size: clamp(13px, 2.8vw, 15px); line-height: 1.6;">
          <p style="margin: 0;">اهداف کوتاه‌مدت و بلندمدت پروژه را مشخص کنید...</p>
        </div>
      </div>
    </div>
    <!-- فضای خالی برای محتوای کاربر -->
    <div style="
      min-height: clamp(40px, 8vw, 60px); 
      padding: clamp(8px, 2vw, 12px);
      background: rgba(255,255,255,0.5);
      border-radius: 6px;
      margin-top: clamp(8px, 2vw, 12px);
    "></div>
  </div>
  

  <div class="section-template" style="
    background: linear-gradient(90deg, rgba(36,5,121,0.05) 0%, rgba(36,5,121,0.02) 100%);
    padding: clamp(16px, 4vw, 24px);
    margin-bottom: clamp(12px, 3vw, 20px);
    border-radius: clamp(8px, 2vw, 12px);
    border: 2px dashed rgba(36,5,121,0.2);
  ">
    <div style="
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: clamp(10px, 3vw, 16px);
      margin-bottom: clamp(12px, 3vw, 16px);
    ">
      <span style="
        background: #240579; 
        color: white; 
        width: clamp(28px, 6vw, 36px); 
        height: clamp(28px, 6vw, 36px); 
        min-width: clamp(28px, 6vw, 36px);
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: clamp(14px, 3vw, 16px);
        font-weight: bold;
        flex-shrink: 0;
      ">
        6
      </span>
      <div style="flex: 1; min-width: 0;">
        <h2 style="
          color: #240579; 
          margin: 0 0 clamp(6px, 1.5vw, 10px) 0; 
          font-size: clamp(16px, 3.5vw, 20px);
          line-height: 1.4;
        ">
          دامنه و محدوده پروژه
        </h2>
        <div style="color: #666; font-size: clamp(13px, 2.8vw, 15px); line-height: 1.6;">
          <p style="margin: 0;">محدوده کاری پروژه را مشخص کنید...</p>
        </div>
      </div>
    </div>
   
    <div style="
      min-height: clamp(40px, 8vw, 60px); 
      padding: clamp(8px, 2vw, 12px);
      background: rgba(255,255,255,0.5);
      border-radius: 6px;
      margin-top: clamp(8px, 2vw, 12px);
    "></div>
  </div>
  

  <div class="section-template" style="
    background: linear-gradient(90deg, rgba(36,5,121,0.05) 0%, rgba(36,5,121,0.02) 100%);
    padding: clamp(16px, 4vw, 24px);
    margin-bottom: clamp(12px, 3vw, 20px);
    border-radius: clamp(8px, 2vw, 12px);
    border: 2px dashed rgba(36,5,121,0.2);
  ">
    <div style="
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: clamp(10px, 3vw, 16px);
      margin-bottom: clamp(12px, 3vw, 16px);
    ">
      <span style="
        background: #240579; 
        color: white; 
        width: clamp(28px, 6vw, 36px); 
        height: clamp(28px, 6vw, 36px); 
        min-width: clamp(28px, 6vw, 36px);
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: clamp(14px, 3vw, 16px);
        font-weight: bold;
        flex-shrink: 0;
      ">
        7
      </span>
      <div style="flex: 1; min-width: 0;">
        <h2 style="
          color: #240579; 
          margin: 0 0 clamp(6px, 1.5vw, 10px) 0; 
          font-size: clamp(16px, 3.5vw, 20px);
          line-height: 1.4;
        ">
          زمان‌بندی و مراحل اجرا
        </h2>
        <div style="color: #666; font-size: clamp(13px, 2.8vw, 15px); line-height: 1.6;">
          <p style="margin: 0;">زمان‌بندی کلی پروژه را مشخص کنید...</p>
        </div>
      </div>
    </div>
    <!-- فضای خالی برای محتوای کاربر -->
    <div style="
      min-height: clamp(40px, 8vw, 60px); 
      padding: clamp(8px, 2vw, 12px);
      background: rgba(255,255,255,0.5);
      border-radius: 6px;
      margin-top: clamp(8px, 2vw, 12px);
    "></div>
  </div>
  
 
`;

  
  useEffect(() => {
    if (isClient) {
   
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/jodit/3.24.7/jodit.min.css';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری ویرایشگر...</p>
        </div>
      </div>
    );
  }
const changeTitle=()=>{
  alert('عنوان تغییر کرد.')
  setTitle('عنوان پیشنهادی')
}
  return (
    <div  className="container h-full mx-auto pb-[40px] font-iransans">
     <h3 className='mt-[10px] font-iransans font-bold md:font-semibold text-[16px] md:text-[30px] text-center'>عنوان</h3>
        <div className="bg-white md:border md:rounded-[30px]  overflow-hidden">
        
          <div className="p-2 md:p-6 flex flex-col gap-[20px]">
            
          <div className='h-[230px] flex flex-col rounded-[8px] overflow-hidden text-[16px] md:text-[24px] font-semibold '>
            <div className='bg-main-1 text-white basis-[25%] flex justify-center items-center'>
              <p >عنوان‌های پیشنهادی اکسینا</p>
            </div>
            <div className='basis-[75%] bg-[#0029BC42] py-[15px] px-[25px] grid grid-cols-12 gap-[10px]'>
              {[1,2,3,4].map(t=><button onClick={changeTitle} key={t} className='bg-main-1/25 hover:bg-main-1/35 transition-all col-span-12 md:col-span-6 text-[#240579] rounded-[8px] '>عنوان پیشنهادی</button>)}
            </div>
          </div>
    
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                {isClient && (
                  <JoditEditor
                    ref={editorRef}
                    value={editorContent || defaultContent}
                    config={config}
                    onBlur={handleEditorChange}
                    onChange={handleEditorChange}
                    className='font-iransans'
                  />
                )}
           
            </div>
        
            <div className='self-end'>
              <Image
              src={'/assets/icons/Logo.svg'}
              alt='logo'
              width={120}
              height={120}
              />
            </div>
          </div>
        </div>



    </div>
  );
}
export default page