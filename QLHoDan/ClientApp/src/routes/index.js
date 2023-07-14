//page
import { NKTable, HKTable, ResidentHistory, ManagerAccountResident, ManagerSpecialAccount } from '~/page/Table';
import { HKForm, NKForm, RequireRemoving, DeathConfirm, SeparateHousehold, ChangePopulation, ChangeHousehold, FixHouseholdNumber, ConfirmAchievement } from '~/page/Form';
import ForgetPassword from '~/page/Authentication/ForgetPassword';
import DashboardForUser from '~/page/DashboardForUser';
import { Login, Register, Authentication } from '~/page/Authentication';
import Profile from '~/page/Account';
import Notification from '~/page/Notification';
import Guest, { Guest_Add_Household, Guest_Add_Resident } from '~/page/GuestUI';
import DashboardComponent from '~/page/Dashboard';
import PersistentDrawerRight from '~/features/Award';
import HistoryAward from '~/features/Award/HistoryAward';
import EnvidenceAward from '~/features/Award/EnvidenceAward';
import ListFormAward from '~/features/FormList/ListFormChoosingAward';
import FormChoosingAward from '~/page/Form/FormChoosingAward';
// import ErrorLogin from '~/page/Error'
import ErrorLogin from '~/page/ErrorLogin';
//layout
import DefaultLayout from '~/components/Layout/DefaultLayout'
import AuthenticationLayout from '~/components/Layout/AuthenticationLayout'
import GuestLayout from '~/components/Layout/GuestLayout';
import FormChecking from '~/page/Form/FormChecking';

import FormDetail from '~/page/Table/Form/form'

const ROLES = {
    ADMIN: "CommitteeChairman",
    ACCOUNTANT: "Accountant",
    MANAGER: "ScopeLeader",
    USER: "Household"
}

const routes = [
    { path: '/dashboard', element: DashboardComponent, layout: DefaultLayout, id: 'db', role: [ROLES.ADMIN, ROLES.MANAGER, ROLES.ACCOUNTANT] },
    { path: '/dashboard_residentOrGuest', element: DashboardForUser, layout: DefaultLayout, id: 'dbu', role: [ROLES.USER] },
    { path: '/envidence/award', element: EnvidenceAward, layout: DefaultLayout, id: 'e-a', role: [ROLES.ACCOUNTANT, ROLES.ADMIN, ROLES.USER, ROLES.MANAGER] },
    { path: '/household/choosing', element: ListFormAward, layout: DefaultLayout, id: 'e-a-c', role: [ROLES.USER] },
    {
        path: '/addnew',
        subRoutes: [
            { subpath: '/addnew/them_ho_khau', element: HKForm, id: 'ad1' },
            { subpath: '/addnew/them_nhan_khau', element: NKForm, id: 'ad2' },
            { subpath: '/addnew/don_xin_chuyen_di', element: RequireRemoving, id: 'rm' },
            { subpath: '/addnew/don_chung_tu', element: DeathConfirm, id: 'dc' },
            { subpath: '/addnew/don_tach_ho_khau', element: SeparateHousehold, id: 'sh' },
            { subpath: '/addnew/don_chuyen_doi_nhan_khau', element: ChangePopulation, id: 'cp' },
            { subpath: '/addnew/don_thay_doi_ho_khau', element: ChangeHousehold, id: 'ch' },
            { subpath: '/addnew/don_sua_so_ho_khau', element: FixHouseholdNumber, id: 'fh' },
            { subpath: '/addnew/don_xac_nhan_thanh_tich', element: ConfirmAchievement, id: 'ca' },
            { subpath: '/addnew/don_chonn_qua', element: FormChoosingAward, id: 'ca' },
        ],
        id: 'tb',
        layout: DefaultLayout,
        role: [ROLES.USER]
    },
    { path: '/choosing_award', element: ListFormAward, layout: DefaultLayout, id: 'choose1', role: [ROLES.ACCOUNTANT, ROLES.ADMIN, ROLES.USER, ROLES.MANAGER] },
    {
        path: '/table', subRoutes: [
            { subpath: '/table/ho_khau', element: HKTable, id: 'tb1' },
            { subpath: '/table/nhan_khau', element: NKTable, id: 'tb2' },
            { subpath: '/table/lich_su_nhan_khau', element: ResidentHistory, id: 'tb3' },
            { subpath: '/table/danh_sach_tai_khoan_ho_dan', element: ManagerAccountResident, id: 'tb4' },
            { subpath: '/table/danh_sach_tai_khoan_can_bo', element: ManagerSpecialAccount, id: 'tb5' },
            { subpath: '/table/form', element: FormDetail, id: 'tb6' },
        ],
        layout: DefaultLayout, id: 'add', role: [ROLES.ADMIN, ROLES.MANAGER, ROLES.ACCOUNTANT]
    },
    {
        path: '/award-route', subRoutes: [
            { subpath: '/award', element: PersistentDrawerRight, id: 'a1' },
            { subpath: '/historyAward', element: HistoryAward, id: 'a2' }
        ],
        layout: DefaultLayout, id: 'add', role: [ROLES.ADMIN, ROLES.MANAGER, ROLES.ACCOUNTANT]
    },
    { path: '/notification', element: Notification, layout: DefaultLayout, id: 'noti', role: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.MANAGER, ROLES.USER] },
    { path: '/profile', element: Profile, layout: DefaultLayout, id: 'pro', role: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.MANAGER, ROLES.USER] },
    { path: '/error', element: ErrorLogin, layout: DefaultLayout, id: 'log', role: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.MANAGER, ROLES.USER] },
    { path: '/checkform', element: FormChecking, layout: DefaultLayout, id: 'db', role: [ROLES.ADMIN, ROLES.MANAGER, ROLES.ACCOUNTANT] },
];

const adminRoutes = [
    { path: '/dashboard', element: DashboardComponent, layout: DefaultLayout, id: 'db' },
    {
        path: '/table', subRoutes: [
            { subpath: '/table/ho_khau', element: HKTable, id: 'tb1' },
            { subpath: '/table/nhan_khau', element: NKTable, id: 'tb2' },
            { subpath: '/table/lich_su_nhan_khau', element: ResidentHistory, id: 'tb3' },
            { subpath: '/table/danh_sach_tai_khoan_ho_dan', element: ManagerAccountResident, id: 'tb4' }
        ],
        layout: DefaultLayout, id: 'add'
    },
    { path: '/notification', element: Notification, layout: DefaultLayout, id: 'noti' },
    { path: '/profile', element: Profile, layout: DefaultLayout, id: 'pro' },
    { path: '/logout', element: NKTable, layout: DefaultLayout, id: 'log' },
];

const employeeRoutes = [
    { path: '/dashboard', element: DashboardComponent, layout: DefaultLayout, id: 'db' },
    {
        path: '/table', subRoutes: [
            { subpath: '/table/ho_khau', element: HKTable, id: 'tb1' },
            { subpath: '/table/nhan_khau', element: NKTable, id: 'tb2' },
            { subpath: '/table/lich_su_nhan_khau', element: ResidentHistory, id: 'tb3' }
        ],
        layout: DefaultLayout, id: 'add'
    },
    { path: '/notification', element: Notification, layout: DefaultLayout, id: 'noti' },
    { path: '/profile', element: Profile, layout: DefaultLayout, id: 'pro' },
    { path: '/logout', element: NKTable, layout: DefaultLayout, id: 'log' },
];
const residentRoutes = [
    {
        path: '/addnew',
        subRoutes: [
            { subpath: '/addnew/them_ho_khau', element: HKForm, id: 'ad1' },
            { subpath: '/addnew/them_nhan_khau', element: NKForm, id: 'ad2' },
            { subpath: '/addnew/don_xin_chuyen_di', element: RequireRemoving, id: 'rm' },
            { subpath: '/addnew/don_chung_tu', element: DeathConfirm, id: 'dc' },
            { subpath: '/addnew/don_tach_ho_khau', element: SeparateHousehold, id: 'sh' },
            { subpath: '/addnew/don_chuyen_doi_nhan_khau', element: ChangePopulation, id: 'cp' },
            { subpath: '/addnew/don_thay_doi_ho_khau', element: ChangeHousehold, id: 'ch' },
            { subpath: '/addnew/don_sua_so_ho_khau', element: FixHouseholdNumber, id: 'fh' },
            { subpath: '/addnew/don_xac_nhan_thanh_tich', element: ConfirmAchievement, id: 'ca' },
        ],
        id: 'tb',
        layout: DefaultLayout
    },
    { path: '/notification', element: Notification, layout: DefaultLayout, id: 'noti' },
    { path: '/profile', element: Profile, layout: DefaultLayout, id: 'pro' },
    { path: '/logout', element: NKTable, layout: DefaultLayout, id: 'log' },
]

const loginRoute = [
    {
        path: '/', element: Guest, layout: GuestLayout, id: 'guest'

    },

    { path: '/guest/them_ho_khau', element: Guest_Add_Household, layout: GuestLayout, id: 'ad1' },
    { path: '/guest/them_nhan_khau', element: Guest_Add_Resident, layout: GuestLayout, id: 'ad2' },

    {
        path: '/authenticate', element: ForgetPassword, layout: AuthenticationLayout, id: 'default'
    },
    {
        path: '/login', element: Login, layout: Authentication, id: 'login'
    },
    {
        path: '/register', element: Register, layout: Authentication, id: 'register'
    },
    {
        path: '/forgetpassword', element: ForgetPassword, layout: AuthenticationLayout, id: 'forget'
    }
];
export { routes, loginRoute, adminRoutes, residentRoutes, employeeRoutes }