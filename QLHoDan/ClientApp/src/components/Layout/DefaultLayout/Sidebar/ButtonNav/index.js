//icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewIcon from '@mui/icons-material/TableView';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { FindInPage } from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import authenticationService from '~/services/account/authentication';

const loggout = () => {
    authenticationService.logOut();
}

const buttons = [
    { icon: <DashboardIcon />, title: 'Hệ thống', link: '/dashboard', id: 'dashboard' },
    {
        icon: <PlaylistAddIcon />, title: 'Gửi đơn', link: '/addnew/them_ho_khau',
        collapse: [
            { title: 'Đăng ký', id: 'addnew1', linkCol: '/addnew/them_ho_khau' },
            { title: 'Thêm nhân khẩu', id: 'addnew2', linkCol: '/addnew/them_nhan_khau' },
            { title: 'Xin chuyển đi', id: 'addnew3', linkCol: '/addnew/don_xin_chuyen_di' },
            { title: 'Chứng tử', id: 'addnew4', linkCol: '/addnew/don_chung_tu' },
            { title: 'Tách hộ khẩu', id: 'addnew5', linkCol: '/addnew/don_tach_ho_khau' },
            { title: 'Minh chứng thành tích', id: 'addnew9', linkCol: '/addnew/don_xac_nhan_thanh_tich' },
            { title: 'Xin chuyển hộ khẩu', id: 'addnew8', linkCol: '/addnew/don_sua_so_ho_khau' },
            { title: 'Thay đổi nhân khẩu', id: 'addnew6', linkCol: '/addnew/don_chuyen_doi_nhan_khau' },
            { title: 'Thay đổi hộ khẩu', id: 'addnew7', linkCol: '/addnew/don_thay_doi_ho_khau' },
        ],
        id: 'addnew'
    },
    {
        icon: <FindInPage />, title: 'Quản lý', link: '/table/ho_khau', id: 'table',
        collapse: [
            { icon: <TableViewIcon />, title: 'Danh sách hộ khẩu', id: 'table1', linkCol: '/table/ho_khau' },
            { icon: <TableViewIcon />, title: 'Hồ sơ nhân khẩu', id: 'table2', linkCol: '/table/nhan_khau' },
            { icon: <TableViewIcon />, title: 'Lịch sử biến đổi nhân khẩu', id: 'table3', linkCol: '/table/lich_su_nhan_khau' },
        ]
    },
    {
        icon: <EmojiEventsIcon />, title: 'Trao thưởng', link: '/award', id: 'award'
    },
    { icon: <AccountBoxIcon />, title: 'Tài khoản', link: '/profile', id: 'profile' },
    { icon: <NotificationsNoneIcon />, title: 'Thông báo', link: '/notification', id: 'notification' },
    { icon: <LogoutIcon />, title: 'Đăng xuất', link: '/login', id: 'logout', isLogout: true, action: loggout },
]
const navForResident = [
    { icon: <DashboardIcon />, title: 'Hệ thống', link: '/dashboard_residentOrGuest', id: 'dashboard_residentOrGuest' },
    {
        icon: <PlaylistAddIcon />, title: 'Gửi đơn', link: '/addnew/them_ho_khau',
        collapse: [
            { title: 'Đăng ký', id: 'addnew1', linkCol: '/addnew/them_ho_khau' },
            { title: 'Thêm nhân khẩu', id: 'addnew2', linkCol: '/addnew/them_nhan_khau' },
            { title: 'Xin chuyển đi', id: 'addnew3', linkCol: '/addnew/don_xin_chuyen_di' },
            { title: 'Chứng tử', id: 'addnew4', linkCol: '/addnew/don_chung_tu' },
            { title: 'Xin chuyển hộ khẩu', id: 'addnew8', linkCol: '/addnew/don_sua_so_ho_khau' },
            { title: 'Thay đổi nhân khẩu', id: 'addnew6', linkCol: '/addnew/don_chuyen_doi_nhan_khau' },
            { title: 'Thay đổi hộ khẩu', id: 'addnew7', linkCol: '/addnew/don_thay_doi_ho_khau' },
        ],
        id: 'addnew'
    },
    {
        icon: <ForwardToInboxIcon />, title: 'Phần thưởng', link: '/award', id: 'award',
        collapse: [
            { title: 'Đơn minh chứng thành tích', id: 'addnew10', linkCol: '/addnew/don_xac_nhan_thanh_tich' },
            { title: 'Minh chứng thành tích', id: 'addnew9', linkCol: '/envidence/award' },
            { title: 'Đơn chọn quà', id: 'addnew11', linkCol: '/addnew/don_chonn_qua' },
            { title: 'Danh sách chọn quà', id: 'addnew12', linkCol: '/household/choosing' },
        ]
    },
    { icon: <AccountBoxIcon />, title: 'Tài khoản', link: '/profile', id: 'profile' },
    { icon: <NotificationsNoneIcon />, title: 'Thông báo', link: '/notification', id: 'notification' },
    { icon: <LogoutIcon />, title: 'Đăng xuất', link: '/login', id: 'logout', isLogout: true, action: loggout },
];
const navForAdmin = [
    { icon: <DashboardIcon />, title: 'Hệ thống', link: '/dashboard', id: 'dashboard' },
    {
        icon: <FindInPage />, title: 'Quản lý', link: '/table/ho_khau', id: 'table',
        collapse: [
            { title: 'Danh sách hộ khẩu', id: 'table1', linkCol: '/table/ho_khau' },
            { title: 'Hồ sơ nhân khẩu', id: 'table2', linkCol: '/table/nhan_khau' },
            { title: 'Lịch sử biến đổi nhân khẩu', id: 'table3', linkCol: '/table/lich_su_nhan_khau' },
            { title: 'Tài khoản hộ dân', id: 'table4', linkCol: '/table/danh_sach_tai_khoan_ho_dan' },
            { title: 'Tài khoản cán bộ', id: 'table5', linkCol: '/table/danh_sach_tai_khoan_can_bo' },
        ]
    },
    {
        icon: <EmojiEventsIcon />, title: 'Trao thưởng', link: '/awa', id: 'award',
        collapse: [
            { title: 'Danh sách dịp', id: 'award1', linkCol: '/award' },
            { title: 'Lịch sử', id: 'award2', linkCol: '/historyAward' },
            { title: 'Minh chứng', linkCol: '/envidence/award', id: 'award4' },
            { title: 'Đơn chọn quà', linkCol: '/choosing_award', id: 'award3' },
        ]
    },
    { icon: <AccountBoxIcon />, title: 'Tài khoản', link: '/profile', id: 'profile' },
    { icon: <NotificationsNoneIcon />, title: 'Thông báo', link: '/notification', id: 'notification' },
    { icon: <LogoutIcon />, title: 'Đăng xuất', link: '/login', id: 'logout', isLogout: true, action: loggout },
];

const navForEmplyee = [
    { icon: <DashboardIcon />, title: 'Hệ thống', link: '/dashboard', id: 'dashboard' },
    {
        icon: <FindInPage />, title: 'Quản lý', link: '/table/ho_khau', id: 'table',
        collapse: [
            { title: 'Danh sách hộ khẩu', id: 'table1', linkCol: '/table/ho_khau' },
            { title: 'Hồ sơ nhân khẩu', id: 'table2', linkCol: '/table/nhan_khau' },
            { title: 'Lịch sử biến đổi nhân khẩu', id: 'table3', linkCol: '/table/lich_su_nhan_khau' },
            { title: 'Tài khoản hộ dân', id: 'table4', linkCol: '/table/danh_sach_tai_khoan_ho_dan' },
        ]
    }, ,
    {
        icon: <EmojiEventsIcon />, title: 'Trao thưởng', link: '/awa', id: 'award',
        collapse: [
            { title: 'Danh sách dịp', id: 'award1', linkCol: '/award' },
            { title: 'Lịch sử', id: 'award2', linkCol: '/historyAward' },
            { title: 'Minh chứng', linkCol: '/envidence/award', id: 'award3' }, ,
            { title: 'Đơn chọn quà', linkCol: '/choosing_award', id: 'award4' },
        ]
    },
    { icon: <AccountBoxIcon />, title: 'Tài khoản', link: '/profile', id: 'profile' },
    { icon: <NotificationsNoneIcon />, title: 'Thông báo', link: '/notification', id: 'notification' },
    { icon: <LogoutIcon />, title: 'Đăng xuất', link: '/login', id: 'logout', isLogout: true, action: loggout },
];

export default buttons;

export { navForResident, navForAdmin, navForEmplyee }