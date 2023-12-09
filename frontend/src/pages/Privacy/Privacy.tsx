import {FC} from 'react'
import './Privacy.scss'
import { useTranslation } from 'react-i18next'

export const Privacy:FC = () => {
    const {t} = useTranslation()

    return (
        <main>
            <h3>{t('privacy')}</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, nostrum sed consequatur non cupiditate autem quaerat repudiandae cum quo dolores earum temporibus eum! Vel animi numquam asperiores cumque? Iusto, culpa!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, nostrum sed consequatur non cupiditate autem quaerat repudiandae cum quo dolores earum temporibus eum! Vel animi numquam asperiores cumque? Iusto, culpa!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, nostrum sed consequatur non cupiditate autem quaerat repudiandae cum quo dolores earum temporibus eum! Vel animi numquam asperiores cumque? Iusto, culpa!</p>
        </main>
    )
}
