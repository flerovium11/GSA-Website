import {FC, PropsWithChildren, useEffect, useRef} from 'react'
import './Infomessage.scss'

export type InfoMessageType = 'info'|'warning'|'success'

type InfomessageProps = {
    type:InfoMessageType
    activeTimeMS?:number
    delayMS?:number
}

export const Infomessage:FC<PropsWithChildren<InfomessageProps>> = (props) => {
    const {type, activeTimeMS, delayMS = 500, children} = props
    const messageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTimeout(() => {if(messageRef.current) messageRef.current.classList.add('show')}, delayMS)
        if(activeTimeMS) setTimeout(() => {if(messageRef.current) messageRef.current.classList.add('hide')}, activeTimeMS + delayMS)
    }, [])

    return (
        <>
            <div className={`infomessage ${type}`} ref={messageRef}>
                {children}
                <span 
                    className='close' 
                    onClick={() => {
                        if(messageRef.current) messageRef.current.classList.add('hide')
                    }}>
                x</span>
            </div>
        </>
    )
}
