import { motion, useDragControls } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import React, { useState, useEffect, useMemo } from 'react'
const measureScrollbar = require('measure-scrollbar').default

interface WebfontFamily {
  category?: string | undefined
  kind: string
  family: string
  subsets: string[]
  variants: string[]
  version: string
  lastModified: string
  files: { [variant: string]: string }
}

export type sort = 'alpha' | 'date' | 'popularity' | 'style' | 'trending'

interface Props {
  onCloseClick: () => void
  family: string
  onChangeFamily(font: string): void
  sort?: sort
  fontNumber?: number
}

const FamilyPicker = ({
  onCloseClick,
  family,
  onChangeFamily,
  sort,
  fontNumber,
}: Props) => {
  sort ??= 'popularity'
  fontNumber ??= 10

  const defaultScrollSize: number = useMemo(measureScrollbar, [])

  const getFonts = async () => {
    const data = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDjhkweWT7xAh83BqLHHUc4c_ijN14xl9I&sort=${sort}`
    ).then((response) => response.json())
    return data
  }
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const dragControls = useDragControls()
  const { data, status, isLoading, isFetching } = useQuery(['fonts'], getFonts)
  const fonts = useMemo(() => data?.items || [], [data])

  useEffect(() => {
    if (status !== 'success' || fontsLoaded) {
      return
    }
    fonts
      .slice(0, fontNumber)
      .forEach((font: WebfontFamily, index: number, array: []) => {
        const fontFace = new FontFace(font.family, `url(${font.files.regular})`)
        fontFace
          .load()
          .then(function (loadedFface) {
            document.fonts.add(loadedFface)
            if (index === array.length - 1) {
              setFontsLoaded(true)
            }
          })
          .catch(function (error) {
            throw error
          })
      })
  }, [fonts, data, status, isLoading, isFetching, fontsLoaded, fontNumber])

  return (
    <motion.div
      className='popup widget widget--family-picker'
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={(e: any) => {
        ;(e.target as HTMLDivElement).offsetParent?.classList.add(
          'popup__dragged'
        )
      }}
      onDragEnd={(e: any) => {
        ;(e.target as HTMLDivElement).offsetParent?.classList.remove(
          'popup__dragged'
        )
      }}
      onMouseDown={(e: any) => {
        let scrollBarWidth: number =
          (e.currentTarget?.lastChild as HTMLDivElement)?.offsetWidth -
          (e.currentTarget?.lastChild as HTMLDivElement)?.clientWidth
        const resizerSize: number =
          scrollBarWidth === 0 ? defaultScrollSize : scrollBarWidth
        let currentTargetRect = e.currentTarget.getBoundingClientRect()
        if (
          currentTargetRect.right - e.clientX > resizerSize ||
          currentTargetRect.bottom - e.clientY > resizerSize
        ) {
          dragControls.start(e)
        }
      }}
    >
      <div className='widget__draghandle'>
        <button className='popup__close' onClick={onCloseClick}>
          <FaTimes />
        </button>
      </div>
      <div
        className='widget--family-picker__content'
        onKeyDown={(e) => {
          if (['w', 'W', 'ArrowUp'].includes(e.key)) {
            ;(
              (e.target as HTMLDivElement)
                .previousElementSibling as HTMLDivElement
            )?.focus()
          } else if (['s', 'S', 'ArrowDown'].includes(e.key)) {
            ;(
              (e.target as HTMLDivElement).nextElementSibling as HTMLDivElement
            )?.focus()
          }
        }}
      >
        {fonts.slice(0, fontNumber).map((font: WebfontFamily, i: number) => {
          return (
            <div
              key={font.family}
              tabIndex={i}
              className={`widget--family-picker__font-name${
                family !== font.family
                  ? ''
                  : ' widget--family-picker__font-name--selected'
              }`}
              style={{ fontFamily: font.family }}
              onFocus={() => {
                onChangeFamily(font.family)
              }}
            >
              {font.family}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default FamilyPicker
