import { Fab, Box, TextField, MenuItem, Collapse, Button, Backdrop, CircularProgress } from '@mui/material';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Add, CloseOutlined, DoneSharp } from '@mui/icons-material';
import styles from './HK.module.scss'
import classNames from 'classnames/bind';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const cx = classNames.bind(styles);
const genders = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' }
]

const columns = [
    // { field: 'id', headerName: 'ID' }, //1
    { field: 'name', headerName: 'Họ và tên', width: 150, editable: true },//2
    { field: 'alias', headerName: 'Bí danh', width: 80, editable: true },//3
    { field: 'birthday', headerName: 'Ngày sinh', type: 'date', width: 100, editable: true },//4
    { field: 'birthPlace', headerName: 'Nơi sinh', width: 90, editable: true },//5
    { field: 'domicile', headerName: 'Nguyên quán', width: 120, editable: true },//6
    { field: 'dantoc', headerName: 'Dân tộc', width: 80, editable: true },//7
    { field: 'citizenship', headerName: 'Quốc tịch', editable: true },//8
    { field: 'career', headerName: 'Nghề nghiệp', width: 100, editable: true },//9
    { field: 'workplace', headerName: 'Nơi làm việc', width: 120, editable: true },//10
    { field: 'identification', headerName: 'CCCD/CMND', width: 100, editable: true },//11
    { field: 'relationship', headerName: 'Quan hệ với chủ hộ', width: 140, editable: true },//12,
    { field: 'gender', headerName: 'Giới tính', editable: true }//13,
]
//data in each row
const rows = [
    //     { id: 1, name: 'Nguyễn Văn A', alias: 'A', birthday: '01/01/2000', birthPlace: 'Hà Nội', domicile: 'Hà Nội', dantoc: 'Kinhh', citizenship: 'Việt Nam', career: 'Sinh viên', workplace: 'Hà Nội', identification: '123456789', relationship: 'Chủ hộ', gender: 'Nam' },
    //     { id: 2, name: 'Nguyễn Văn B', alias: 'B', birthday: '01/01/2000', birthPlace: 'Hà Nội', domicile: 'Hà Nội', dantoc: 'Kignh', citizenship: 'Việt Nam', career: 'Sinh viên', workplace: 'Hà Nội', identification: '123456789', relationship: 'Con', gender: 'Nam' },
]

export default function FormHKComponent() {
    const [rowstable, setRows] = useState(rows);

    const [visible, setVisible] = useState(false);
    const [visibleDes, setVisibleDes] = useState(false);
    // const [NK, setNK] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const [openImg, setOpenImg] = useState(false);
    const [birthday, setBirthday] = useState(null);
    // const [name, setName] = useState('');
    // const [alias, setAlias] = useState('');
    // const [birthPlace, setBirthPlace] = useState('');
    // const [domicile, setDomicile] = useState('');
    // const [dantoc, setDantoc] = useState('');
    // const [citizenship, setCitizenship] = useState('');
    // const [career, setCareer] = useState('');
    // const [workplace, setWorkplace] = useState('');
    // const [identification, setIdentification] = useState('');
    // const [relationship, setRelationship] = useState('');
    // const [gender, setGender] = useState('');
    const nameRef = useRef();
    const aliasRef = useRef();
    const birthdayRef = useRef();
    const birthPlaceRef = useRef();
    const domicileRef = useRef();
    const dantocRef = useRef();
    const citizenshipRef = useRef();
    const careerRef = useRef();
    const workplaceRef = useRef();
    const identificationRef = useRef();
    const relationshipRef = useRef();
    const genderRef = useRef();


    const handleNKFrom = useCallback(() => {
        setVisible(true);
        if (visibleDes === false) {
            setVisibleDes(true)
        }
    }, [visibleDes])

    const removeImageByClick = (index) => {
        setArrImg(prev => prev.filter((item, i) => i !== index) || [])
    }

    const handleBtnDes = useCallback(() => {
        if (visible === true) {
            setVisible(false);
            setVisibleDes(false)
        }
    }, [visible])
    const handleAddNK = () => {
        setRows(prev => [...prev, {
            id: prev.length + 1,
            name: nameRef.current.value,
            alias: aliasRef.current.value,
            birthday: birthdayRef.current.value.toString(),
            birthPlace: birthPlaceRef.current.value,
            domicile: domicileRef.current.value,
            dantoc: dantocRef.current.value,
            citizenship: citizenshipRef.current.value,
            career: careerRef.current.value,
            workplace: workplaceRef.current.value,
            identification: identificationRef.current.value,
            relationship: relationshipRef.current.value,
            gender: genderRef.current.value,
        }]);
        nameRef.current.value = '';
        aliasRef.current.value = '';
        birthPlaceRef.current.value = '';
        domicileRef.current.value = '';
        dantocRef.current.value = '';
        citizenshipRef.current.value = '';
        careerRef.current.value = '';
        workplaceRef.current.value = '';
        identificationRef.current.value = '';
        relationshipRef.current.value = '';
        genderRef.current.value = '';
        if (visible === true) {
            setVisible(false);
            setVisibleDes(false)
        }
    };
    const handleRequestFullScreen = useCallback((e) => {
        e.target.requestFullscreen();
    }, []);

    const [arrImg, setArrImg] = useState([]);

    const handleFileImage = useCallback((e) => {
        let files = [...e.target.files].map((file) => {
            file.preview = URL.createObjectURL(file);
            return file;
        })
        setArrImg([...arrImg, ...files]);
        e.target.value = null;

        return () => {
            arrImg && arrImg.forEach((file) => URL.revokeObjectURL(file.preview))
            //remvove the temporary url if avatar exists
        }

    }, [arrImg]);
    return (
        <div className={cx('container')}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={() => { setOpen(false) }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #ccc',
                    borderRadius: 5,
                    padding: 2,
                    marginBottom: 1, backgroundColor: '#fff',
                }}
                noValidate
                autoComplete="off"
            >
                <h1 className={cx('title')}>Đơn đăng ký hộ khẩu</h1>
                <div className={cx('input-text-area')}>
                    <TextField helperText='' required label="Số hộ khẩu" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField helperText='' required label="Nơi thường trú" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField helperText='' required label="Tổ phụ trách" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField helperText='' required label="Họ và tên chủ hộ" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                </div>
                <div className={cx('input-image-area')}>
                    <label htmlFor="upload-photo" style={{ marginLeft: 10 }}>
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            multiple="multiple"
                            onChange={handleFileImage}
                        />
                        <Fab
                            color="secondary"
                            size="small"
                            component="span"
                            aria-label="add"
                            variant="extended"
                        >
                            <Add /> Ảnh minh chứng
                        </Fab>
                        {openImg && <CircularProgress size={10} sx={{
                            marginLeft: '10px',
                        }} color="inherit" />}
                    </label>
                    {(arrImg.length > 0) && <div className={cx('img-render')}>{arrImg.map((item, index) => (
                        <div key={"image" + index} style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: 'auto' }}>
                            <img src={item.preview}
                                style={{ width: 'auto', height: '150px', marginRight: 5, marginBottom: 5, cursor: 'pointer' }}
                                alt="evidence"
                                onClick={handleRequestFullScreen} />
                            <Fab
                                sx={{ position: 'absolute', right: -5, top: -7, backgroundColor: 'transparent' }}
                                color="error"
                                size="small"
                                component="span"
                                aria-label="add"
                                variant="extended"
                                onClick={() => removeImageByClick(index)}
                            >
                                <CloseOutlined />
                            </Fab>
                        </div>
                    ))}
                    </div>}
                </div>
                <div className={cx('add-nk-area')}>
                    <Fab
                        color="primary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                        onClick={handleNKFrom}
                    >
                        <Add /> Thêm nhân khẩu
                    </Fab>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={visible}
                    >
                        <div className={cx('backdrop-add')}>
                            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
                                <TextField helperText='' required inputRef={nameRef} label="Họ và tên"
                                    variant="standard" />
                                <TextField helperText='' required inputRef={aliasRef} label="Bí danh"
                                    variant="standard" />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        required
                                        label="Ngày sinh"
                                        value={birthday}
                                        inputRef={birthdayRef}
                                        onChange={(newValue) => {
                                            setBirthday(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField helperText='' required inputRef={birthPlaceRef} label="Nơi sinh"
                                    variant="standard" />
                                <TextField helperText='' required inputRef={domicileRef} label="Nguyên quán"
                                    variant="standard" />
                                <TextField helperText='' required inputRef={dantocRef} label="Dân tộc"
                                    variant="standard" />
                                <TextField helperText='' required inputRef={citizenshipRef} label="Quốc tịch"
                                    variant="standard" />
                                <TextField helperText='' required inputRef={careerRef} label="Nghề nghiệp"
                                    variant="standard" />
                                <TextField helperText='' required inputRef={workplaceRef} label="Nơi làm việc"
                                    variant="standard" />
                                <TextField helperText='' required inputRef={identificationRef} label="CMND/CCCD"
                                    variant="standard" />
                                <TextField helperText='' required inputRef={relationshipRef} label="Quan hệ với chủ hộ"
                                    variant="standard" />
                                <TextField helperText='' required
                                    id="standard-select-gender"
                                    select
                                    label="Giới tính"
                                    variant="standard"
                                    inputRef={genderRef}
                                    defaultValue=""
                                >
                                    {genders.map((option) => (
                                        <MenuItem key={option.value} value={option.label}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            {visibleDes &&
                                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
                                    <Fab
                                        sx={{ marginLeft: 1, width: 100 }}
                                        color="success"
                                        size="small"
                                        component="span"
                                        aria-label="add"
                                        variant="extended"
                                        onClick={handleAddNK}
                                    >
                                        <DoneSharp /> Đồng ý
                                    </Fab>
                                    <Fab
                                        sx={{ marginLeft: 1, width: 100 }}
                                        color="error"
                                        size="small"
                                        component="span"
                                        aria-label="add"
                                        variant="extended"
                                        onClick={handleBtnDes}
                                    >
                                        <CloseOutlined /> Hủy
                                    </Fab>
                                </div>
                            }
                        </div>
                    </Backdrop>

                    <div style={{ width: '100%' }}>
                        <h3>Danh sách nhân khẩu</h3>
                        <DataGrid
                            sx={{ fontSize: 13, margin: '10 0' }}
                            rows={rowstable}
                            columns={columns}
                            autoPageSize={true}
                            autoHeight={true}
                            pageSize={3}
                            rowsPerPageOptions={[5]}
                            aria-label="Nhân khẩu"
                            disableSelectionOnClick
                        />
                    </div>
                </div>
            </Box>
            <Button onClick={handleToggle} color="primary" variant="contained">Gửi</Button>
        </div>
    );
}