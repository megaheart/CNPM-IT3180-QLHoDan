import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './DU.module.scss';
const cx = classNames.bind(styles);

export default function DashboardForUser() {
    return (
        <div>
            <h1>Chào mừng trở lại với website của chúng tôi</h1>
            <h2 align='center' >Các tính năng của website cho người dùng :</h2>
            <div>
                <ul className={cx('user-todolist')}>
                    <li>
                        <NavLink to='/addnew/them_ho_khau'>
                            Viết đơn đăng ký hộ khẩu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/addnew/don_xin_chuyen_di'>
                            Viết đơn xin chuyển đi
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/addnew/don_chung_tu'>
                            Viết đơn chứng từ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/addnew/don_xac_nhan_thanh_tich'>
                            Viết đơn xác nhận thành tích
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/addnew/don_chonn_qua'>
                            Viết đơn chọn quà cho dịp đặc biệt
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='don_chuyen_doi_nhan_khau'>
                            Viết đơn thay đổi nhân khẩu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/notification'>
                            Xem thông báo
                        </NavLink>
                    </li>

                </ul>
            </div>

        </div >
    );
}