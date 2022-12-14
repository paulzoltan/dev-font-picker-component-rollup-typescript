import React from 'react'
import { motion, useDragControls } from 'framer-motion'
import { HexAlphaColorPicker } from 'react-colorful'
import { FaTimes } from 'react-icons/fa'

interface Props {
  onCloseClick: () => void
  color: string
  onChangeColor(color: string): void
}

const ColorPicker: React.FC<Props> = ({
  onCloseClick,
  color,
  onChangeColor: setColor,
}) => {
  const dragControls = useDragControls()

  return (
    <motion.div
      className='popup widget widget--color-picker'
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={(e) => {
        ;(e.target as HTMLDivElement).offsetParent?.classList.add(
          'popup__dragged'
        )
      }}
      onDragEnd={(e) => {
        ;(e.target as HTMLDivElement).offsetParent?.classList.remove(
          'popup__dragged'
        )
      }}
    >
      <div
        className='widget__draghandle'
        onMouseDown={(e) => {
          dragControls.start(e)
        }}
      >
        <button className='popup__close' onClick={onCloseClick}>
          <FaTimes />
        </button>
      </div>
      <HexAlphaColorPicker color={color} onChange={setColor} />
      <div className='widget--color-picker__text-display'>{color}</div>
    </motion.div>
  )
}

export default ColorPicker
