import React, { useState } from 'react'
import ToolPicker, { visibility } from './ToolPicker'
import FamilyPicker, { sort } from './FamilyPicker'
import ColorPicker from './ColorPicker'
import SizePicker from './SizePicker'
import './FontPicker.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
export type { sort } from './FamilyPicker'

interface Props {
  sort?: sort
  fontNumber?: number
  children: React.ReactNode
}

const FontPicker: React.FC<Props> = ({ sort, fontNumber, children }) => {
  const [family, setFamily] = useState<string>('')
  const [color, setColor] = useState<string>('#ffffffff')
  const [size, setSize] = useState<number>(1)

  const [familyPickerVisibility, setFamilyPickerVisibility] =
    useState<visibility>('visible')
  const [colorPickerVisibility, setColorPickerVisibility] =
    useState<visibility>('visible')
  const [sizePickerVisibility, setSizePickerVisibility] =
    useState<visibility>('visible')

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <>
      <div style={{ fontFamily: family, color, fontSize: `${size}em` }}>
        {children}
      </div>
      <QueryClientProvider client={queryClient}>
        <div style={{ visibility: familyPickerVisibility }}>
          <FamilyPicker
            {...{
              onCloseClick: () => {
                setFamilyPickerVisibility('hidden')
              },
              family,
              onChangeFamily: setFamily,
              sort,
              fontNumber,
            }}
          />
        </div>
      </QueryClientProvider>
      <ToolPicker
        {...{
          setFamilyPickerVisibility,
          setColorPickerVisibility,
          setSizePickerVisibility,
        }}
      />
      <div style={{ visibility: colorPickerVisibility }}>
        <ColorPicker
          {...{
            onCloseClick: () => {
              setColorPickerVisibility('hidden')
            },
            color,
            onChangeColor: setColor,
          }}
        />
      </div>
      <div style={{ visibility: sizePickerVisibility }}>
        <SizePicker
          {...{
            onCloseClick: () => {
              setSizePickerVisibility('hidden')
            },
            size,
            onSizeChange: setSize,
          }}
        />
      </div>
    </>
  )
}
export default FontPicker
