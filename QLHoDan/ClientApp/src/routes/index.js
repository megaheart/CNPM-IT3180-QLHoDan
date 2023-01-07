//page
import { NKTable, HKTable } from '~/page/Table';
import { HKForm, NKForm, RequireRemoving, DeathConfirm, SeparateHousehold, ChangePopulation, ChangeHousehold } from '~/page/Form';
import Authentication from '~/page/Authentication';
import Profile from '~/page/Account';
import Start from '~/page/StartPage';
import Notification from '~/page/Notification';
// import ErrorLogin from '~/page/Error'
//layout
import DefaultLayout from '~/components/Layout/DefaultLayout'
import AuthenticationLayout from '~/components/Layout/AuthenticationLayout'

const routes = [
    // { path: '/dashboard', element: DashboardComponent, layout: DefaultLayout, id: 'db' },
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
        ],
        id: 'tb',
        layout: DefaultLayout
    },
    {
        path: '/table', subRoutes: [
            { subpath: '/table/ho_khau', element: HKTable, id: 'tb1' },
            { subpath: '/table/nhan_khau', element: NKTable, id: 'tb2' },
        ],
        layout: DefaultLayout, id: 'add'
    },
    { path: '/notification', element: Notification, layout: DefaultLayout, id: 'noti' },
    { path: '/profile', element: Profile, layout: DefaultLayout, id: 'pro' },
    { path: '/logout', element: NKTable, layout: DefaultLayout, id: 'log' },
    { path: '/error', element: Error, layout: DefaultLayout, id: 'log' },

]
const loginRoute = [
    { path: '/', element: Start, layout: AuthenticationLayout, id: 'start' },
    {
        path: '/authenticate', element: Authentication, layout: AuthenticationLayout, id: 'default'
    }];
// const errorRoute = { path: '/error', element: ErrorLogin, layout: AuthenticationLayout, id: 'error' };
export { routes, loginRoute }