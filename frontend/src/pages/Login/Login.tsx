import {FC} from 'react'
import { useTranslation } from 'react-i18next'
import './Login.scss'
import 'bootstrap/scss/bootstrap.scss'

export const Login:FC = () => {
    const {t} = useTranslation()

    return (
        <>
            <h3>Admin Login</h3>
            <form>
                <input type='text' id='username' placeholder={t()}/>
                <input type='text' id='password' />
                <button type='submit'>{t('login')}</button>
            </form>
        </>
    )
}
