'use client'
import BaseIcon from '../icon/BaseIcon'

const Modal = ({ modalTitle, onClose, children, isOpen = false, width = "700px", height = "500px" }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[20px] bg-black/30"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose} // کلیک روی overlay مودال رو می‌بنده
    >
      <div
        className={`bg-white shadow-xl rounded-2xl p-6 overflow-y-auto overflow-x-hidden`}
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن مودال هنگام کلیک داخل
      >
        {/* header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 id="modal-title" className="font-bold text-xl">{modalTitle}</h3>
          <button onClick={onClose} className="cursor-pointer">
            <BaseIcon id="Close" disableGradient={true} fillColor="#000" size={20} />
          </button>
        </div>

        {/* body */}
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
