import {FC} from 'react'
import './Imprint.scss'
import { useTranslation } from 'react-i18next'

export const Imprint:FC = () => {
    const {t} = useTranslation()

    return (
        <main>
            <h3>{t('imprint')}</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, nostrum sed consequatur non cupiditate autem quaerat repudiandae cum quo dolores earum temporibus eum! Vel animi numquam asperiores cumque? Iusto, culpa!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, nostrum sed consequatur non cupiditate autem quaerat repudiandae cum quo dolores earum temporibus eum! Vel animi numquam asperiores cumque? Iusto, culpa!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, nostrum sed consequatur non cupiditate autem quaerat repudiandae cum quo dolores earum temporibus eum! Vel animi numquam asperiores cumque? Iusto, culpa!</p>
        </main>
    )
}
