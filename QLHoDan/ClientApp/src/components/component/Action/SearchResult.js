
const FormsAction = [
    {
        title: 'Đơn xin thêm hộ khẩu',
        value: 'don xin them ho khau',
        link: '/addnew/them_ho_khau',
    },
    {
        title: 'Đơn xin thêm nhân khẩu',
        value: 'don xin them nhan khau',
        link: '/addnew/them_nhan_khau',
    },
    {
        title: 'Đơn xin chuyển đi',
        value: 'don xin chuyen di',
        link: '/addnew/don_xin_chuyen_di',
    },
    {
        title: 'Đơn xin chứng tử',
        value: 'don xin chung tu',
        link: '/addnew/don_chung_tu',
    },
    {
        title: 'Đơn xin tách hộ khẩu',
        value: 'don xin tach ho khau',
        link: '/addnew/don_tach_ho_khau',
    },
    {
        title: 'Đơn xin chuyển đổi nhân khẩu',
        value: 'don xin chuyen doi nhan khau',
        link: '/addnew/don_chuyen_doi_nhan_khau',
    },
    {
        title: 'Đơn xin thay đổi hộ khẩu',
        value: 'don xin thay doi ho khau',
        link: '/addnew/don_thay_doi_ho_khau',
    }
];

const TableAction = [
    {
        title: 'Hộ khẩu',
        link: '/table/ho_khau',
    },
    {
        title: 'Nhân khẩu',
        link: '/table/nhan_khau',
    }
]

const filterByTitle = (arr, title) => {
    if (title !== '') {
        return arr.filter(item => {
            return item.value.toLowerCase().includes(title.toLowerCase()) || item.title.toLowerCase().includes(title.toLowerCase());
        });
    }
    else {
        return arr.filter((item, index) => index < 4);
    }
}

export { FormsAction, TableAction, filterByTitle }