'use client'
import BaseIcon from '../icon/BaseIcon'

const Modal = ({modalTitle , onClose , children}) => {

  return (
    <div className='py-6 px-4 fixed w-screen h-screen inset-0 backdrop-blur-[20px] bg-white/5'>
        <div className='w-full h-full flex items-center justify-center'>
            <div className='w-[700px] h-[500px] overflow-y-auto overflow-x-hidden bg-white shadow-xl rounded-2xl p-6'>
                {/* header */}
                <div className='mb-6'>
                    <div className='flex items-center justify-between'>
                        <h3 className='font-bold text-xl'>{modalTitle}</h3>

                        <button onClick={onClose} className='cursor-pointer'>
                            <BaseIcon id="Close" disableGradient={true} fillColor='#000' size={20}/>
                        </button>
                    </div>
                </div>
                {/* body */}
                <div>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}



export default Modal