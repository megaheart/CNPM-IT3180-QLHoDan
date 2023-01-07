import styles from './AuthenticationLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function AuthenticationLayout({ children }) {
    return (
        <div className={cx('author-layout')} >
            {children}
        </div>
    )
}