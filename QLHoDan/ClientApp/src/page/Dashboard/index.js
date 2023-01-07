import { NavLink } from 'react-router-dom';
import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import dashboardElement from '~/assets/Image/Dashboard'
const cx = classNames.bind(styles);

export default function DashboardComponent() {
    return (
        <div className={cx('dashboard')}>
            <h1>Các chức năng chính của trang web</h1>
            <div className={cx('dashboard-container')}>
                {
                    dashboardElement.map((item, index) => {
                        return (
                            <div key={`image-div-${index}`} className={cx('item-dashboard')}>
                                <NavLink to={item.link} key={index}>
                                    <div>
                                        <img src={item.image} alt={item.name} style={{ height: 200 }} />
                                    </div>
                                </NavLink>

                                <p>{item.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}