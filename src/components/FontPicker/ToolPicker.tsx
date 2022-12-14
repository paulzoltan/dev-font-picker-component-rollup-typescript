import React from 'react'
import { FaTextHeight } from 'react-icons/fa'

export type visibility = 'visible' | 'hidden'
interface Props {
  setFamilyPickerVisibility: React.Dispatch<React.SetStateAction<visibility>>
  setColorPickerVisibility: React.Dispatch<React.SetStateAction<visibility>>
  setSizePickerVisibility: React.Dispatch<React.SetStateAction<visibility>>
}

type toggleVisibilityType = (visibility: visibility) => visibility

const toggleVisibility: toggleVisibilityType = (visibility) =>
  visibility === 'visible' ? 'hidden' : 'visible'

const ToolPicker: React.FC<Props> = ({
  setFamilyPickerVisibility,
  setColorPickerVisibility,
  setSizePickerVisibility,
}) => {
  return (
    <div className='tool-picker'>
      <button
        className='tool-picker__button tool-picker__button--size'
        onClick={() => setSizePickerVisibility(toggleVisibility)}
      >
        {' '}
        <FaTextHeight />
      </button>
      <button
        className='tool-picker__button tool-picker__button--color'
        onClick={() => setColorPickerVisibility(toggleVisibility)}
      >
        c
      </button>
      <button
        className='tool-picker__button tool-picker__button--family'
        onClick={() => setFamilyPickerVisibility(toggleVisibility)}
      >
        f
      </button>
    </div>
  )
}

export default ToolPicker
