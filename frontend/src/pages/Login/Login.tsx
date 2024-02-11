import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Login.scss';

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
