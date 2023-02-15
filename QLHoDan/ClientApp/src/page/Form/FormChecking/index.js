import { useState, forwardRef, useRef } from 'react';
import {
    Paper, Dialog, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button, Slide, Snackbar, Backdrop, CircularProgress, Alert
} from '@mui/material';
import ErrorData from '~/page/ErrorData';
import TableSkeleton from '~/page/Skeleton';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import Grid from '@mui/material/Grid';
import useAuth from '~/hooks/useAuth';
import axios from 'axios';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AchievementEvidenceFormView from '~/page/Form/FormChecking/AchievementEvidenceFormView';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const columns = [
    { id: 'title', label: 'Tiêu đề Form', getValue: (row) => row.title },
    { id: 'createdTime', label: 'Ngày gửi', width: 100, getValue: (row) => row.createdTime },
    { id: 'account', label: 'Tài khoản gửi', width: 100, getValue: (row) => row.account },
];
export default function FormCheckingComponent() {
    const { auth, setAuth } = useAuth();
    // const { householdForms, isLoadinghouseholdForms, error1 } = useQuery(
    //     ['gethouseholdForms'],
    //     async () => {
    //         return await axios.get(
    //             "api/forms/Household?isChecked=false",
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${auth.token}`
    //                 }
    //             }
    //         );
    //     },
    // );
    // const { movingOutForms, isLoadingmovingOutForms } = useQuery(
    //     ['user'],
    //     async () => accountApi.getProfile(auth.token),
    // );
    // const { deadForms, isLoadingdeadForms } = useQuery(
    //     ['user'],
    //     async () => accountApi.getProfile(auth.token),
    // );
    // const { changingResidentInfoForms, isLoadingchangingResidentInfoForms } = useQuery(
    //     ['user'],
    //     async () => accountApi.getProfile(auth.token),
    // );
    // const { changingHouseholdInfoForms, isLoadingchandleSendFormForms } = useQuery(
    //     ['user'],
    //     async () => accountApi.getProfile(auth.token),
    // );
    // const { changingHouseholdForms, isLoadingchangingHouseholdForms } = useQuery(
    //     ['user'],
    //     async () => accountApi.getProfile(auth.token),
    // );
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery(
        ['getAchievementEvidence'],
        async () => {
            const response = await axios.get(
                "api/forms/AchievementEvidence?isChecked=false",
                {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                }
            );
            if (response && response.data) {
                return response.data;
            }
            else {
                return [];
            }
        }
    );

    const [selection, setSelection] = useState(null);
    let formTypeTxt = "";
    let formDetailPanel = <></>;
    if (selection) {
        switch (selection.formType) {
            case "Household":
                formTypeTxt = "Đăng kí hộ khẩu, nhân khẩu";
                break;
            case "MovingOut":
                formTypeTxt = "Xin chuyển đi";
                break;
            case "Dead":
                formTypeTxt = "Chứng tử";
                break;
            case "ChangingResidentInfo":
                formTypeTxt = "Xin thay đổi thông tin nhân khẩu";
                break;
            case "ChangingHouseholdInfo":
                formTypeTxt = "Xin thay đổi thông tin hộ khẩu";
                break;
            case "ChangingHousehold":
                formTypeTxt = "Xin chuyển hộ khẩu";
                break;
            case "AchievementEvidence":
                formTypeTxt = "Minh chứng thành tích";
                formDetailPanel = <AchievementEvidenceFormView id={selection.id} />
                break;
        }
    }
    // const isLoading = isLoadinghouseholdForms 
    //                     && isLoadingachievementEvidenceForms;
    // const error = error1
    //                 && error2;

    // const data = [];

    // if(!isLoading && !error){
    //     data = [...householdForms.data, ...achievementEvidenceForms.data]
    // }

    // const isLoading = isLoadingachievementEvidenceForms;
    // const error = error2;

    // const data = achievementEvidenceForms;

    const notAcceptReasonInputRef = useRef(null);
    const [accept, setAccept] = useState(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        setSelection(null);
    };
    const mutation = useMutation({
        mutationFn: ({selection, _accept, _notAcceptReason, _achievementType}) => {
            axios.post('api/forms/' + selection.formType + "/accept/" + selection.id, {
                "accept": _accept,
                "notAcceptReason": _notAcceptReason,
                "achievementType": _achievementType
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getAchievementEvidence'] });
        },
    });
    const handleSummit = () => {
        setOpen(false);
        setSelection(null);
        mutation.mutate({
            selection: selection, 
            _accept: accept == "true", 
            _notAcceptReason: accept == "true" ? null : notAcceptReasonInputRef.current.value, 
            _achievementType: 1
        });
        
    };
    const openDetailPanel = (row) => {
        setOpen(true);
        setSelection(row);
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chi tiết Đơn {formTypeTxt}</DialogTitle>
                <DialogContent style={{ width: 600 }}>
                    {formDetailPanel}
                    <div style={{ borderBottom: "2px solid gray" }}></div>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Tuỳ chọn</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={accept}
                            onChange={(e) => setAccept(e.target.value)}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Duyệt" />
                            <FormControlLabel value={false} control={<Radio />} label="Từ chối" />
                        </RadioGroup>
                    </FormControl>
                    {/* {
                        (accept == "true" && selection && selection.formType === "AchievementEvidence") && (<>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </>)
                    } */}
                    {
                        (accept == "false") && (
                            <TextField
                                inputRef={notAcceptReasonInputRef}
                                autoFocus
                                margin="dense"
                                id="notAcceptReason"
                                label="Lý do không duyệt"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        )
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                    <Button onClick={handleSummit}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
            {error ? <ErrorData /> :
                (isLoading || !data) ? <TableSkeleton /> :
                    (data.length > 0 && <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                        <h2>Duyệt Form</h2>
                        <TableContainer sx={{ maxHeight: 600, marginRight: 10 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, width: column.width, fontSize: 15 }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                        <TableCell
                                            key="detail"
                                            style={{ minWidth: 100, width: 100, fontSize: 15 }}
                                        >
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const openDetailPanelRow = () => { openDetailPanel(row) };
                                            return (
                                                <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                                                    {columns.map((column) => (
                                                        <TableCell align={column.align} style={{ minWidth: column.minWidth, width: column.width, fontSize: 15 }}>
                                                            {column.getValue(row)}
                                                        </TableCell>
                                                    ))}
                                                    <TableCell style={{ minWidth: 100, width: 100, fontSize: 15 }}>
                                                        <Button variant="text" onClick={openDetailPanelRow}>Chi tiết</Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 100]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>)
            }
        </>
    );
}