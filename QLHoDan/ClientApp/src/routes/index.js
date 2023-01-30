//page
import { NKTable, HKTable, ResidentHistory, ManagerAccountResident } from '~/page/Table';
import { HKForm, NKForm, RequireRemoving, DeathConfirm, SeparateHousehold, ChangePopulation, ChangeHousehold, FixHouseholdNumber, ConfirmAchievement } from '~/page/Form';
import ForgetPassword from '~/page/Authentication/ForgetPassword';
import { Login, Register, Authentication } from '~/page/Authentication';
import Profile from '~/page/Account';
import Notification from '~/page/Notification';
import Guest, { Guest_Add_Household, Guest_Add_Resident } from '~/page/GuestUI';
import DashboardComponent from '~/page/Dashboard';
// import ErrorLogin from '~/page/Error'
//layout
import DefaultLayout from '~/components/Layout/DefaultLayout'
import AuthenticationLayout from '~/components/Layout/AuthenticationLayout'
import GuestLayout from '~/components/Layout/GuestLayout';

const ROLES = {
    ADMIN: "CommitteeChairman",
    MANAGER: "Accountant" | "ScopeLeader",
    USER: "Household"
}

const routes = [
    { path: '/dashboard', element: DashboardComponent, layout: DefaultLayout, id: 'db', role: [ROLES.ADMIN, ROLES.MANAGER] },
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
        layout: DefaultLayout,
        role: [ROLES.USER]
    },
    {
        path: '/table', subRoutes: [
            { subpath: '/table/ho_khau', element: HKTable, id: 'tb1' },
            { subpath: '/table/nhan_khau', element: NKTable, id: 'tb2' },
            { subpath: '/table/lich_su_nhan_khau', element: ResidentHistory, id: 'tb3' },
            { subpath: '/table/danh_sach_tai_khoan_ho_dan', element: ManagerAccountResident, id: 'tb4' }
        ],
        layout: DefaultLayout, id: 'add', role: [ROLES.ADMIN, ROLES.MANAGER]
    },
    { path: '/notification', element: Notification, layout: DefaultLayout, id: 'noti', role: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER] },
    { path: '/profile', element: Profile, layout: DefaultLayout, id: 'pro', role: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER] },
    { path: '/error', element: Error, layout: DefaultLayout, id: 'log', role: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER] },

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