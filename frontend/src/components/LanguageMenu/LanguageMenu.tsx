import {FC, useState, useEffect, useRef, CSSProperties} from 'react'
import i18n from '../../i18n'
import {useTranslation} from 'react-i18next'
import {languages} from '../../constants/languages'
import {Tooltip} from 'antd'
import {language} from '../../constants/languages'
import {setCookie} from '../../utils/cookies'
import './LanguageMenu.scss'

interface LanguageMenuProps {
    listAlign?:string
}

export const LanguageMenu:FC<LanguageMenuProps> = (props) => {
    const {t} = useTranslation()
    const [isListOpen, openList] = useState(false)
    const currentLang:language = languages.find((lang) => lang.code === i18n.language) || languages[0]
    const languageMenuRef = useRef<HTMLDivElement | null>(null)

    const setListState = (isOpen:boolean):void => {
        openList(isOpen)
    }

    useEffect(() => {
        const clickOutside = (event:MouseEvent) => {
            if(
                languageMenuRef.current 
                && event.target instanceof HTMLDivElement 
                && !languageMenuRef.current.contains(event.target)
            ) openList(false)
        }

        document.addEventListener('click', clickOutside)

        return () => document.removeEventListener('click', clickOutside)
    }, [])

    const classes = ['language-menu', props.listAlign === 'left' ? 'list-left' : 'list-right']
    if(isListOpen) classes.push('open')

    return (
        <div className={classes.join(' ')} ref={languageMenuRef}>
            <Tooltip title={t('chooselang')}>
                <span className='active-lang' onClick={() => {setListState(isListOpen ? false : true)}}>{currentLang.label}</span>
            </Tooltip>

            {languages.map((lang, index) =>
                <div 
                    key={lang.code}
                    className={lang.code === currentLang.code ? 'lang-icon active' : 'lang-icon'}

                    style={{
                        backgroundImage: `url(${lang.flagurl})`,
                        '--index': index,
                    } as CSSProperties}

                    onClick={() => {
                        i18n.changeLanguage(lang.code)
                        setCookie('userLanguage', lang.code, 1000)
                        setListState(false)
                    }}
                >
                    <span>{lang.code}</span>
                </div>
            )}
        </div>
    )
}
