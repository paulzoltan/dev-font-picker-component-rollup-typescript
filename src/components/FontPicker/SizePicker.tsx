import React from 'react'
import { motion } from 'framer-motion'
import { roundTo } from 'round-to'
import { FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa'

interface Props {
  onCloseClick: () => void
  size: number
  onSizeChange(size: number | Function): void
}

const SizePicker: React.FC<Props> = ({
  onCloseClick,
  size,
  onSizeChange: setSize,
}) => {
  const PRECISION = 0.1
  const handleWheel: (event: React.WheelEvent<HTMLDivElement>) => void = (
    event
  ) => {
    setSize((size: number) =>
      roundTo(size - Math.sign(event.deltaY) * PRECISION, 2)
    )
  }
  return (
    <motion.div
      className='popup widget widget--size-picker'
      onWheel={handleWheel}
      drag
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
      <button className='popup__close' onClick={onCloseClick}>
        <FaTimes />
      </button>
      <div className='widget--size-picker__figures'>{size}em</div>
      <button
        className='widget--size-picker__button widget--size-picker__button--arrow-up'
        onClick={() => setSize((s: number) => roundTo(s + 1 * PRECISION, 2))}
      >
        <FaArrowUp />
      </button>
      <button
        className='widget--size-picker__button widget--size-picker__button--arrow-down'
        onClick={() => setSize((s: number) => roundTo(s - 1 * PRECISION, 2))}
      >
        <FaArrowDown />
      </button>
    </motion.div>
  )
}

export default SizePicker
