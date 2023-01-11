import { HKForm, NKForm } from '../Form'
function Guest() {
    return (
        <div>
            <h1>Chào mừng bạn đến với ứng dụng quản lý hộ dân của Group 1 </h1>
        </div>
    );
}
function Guest_Add_Household() {
    return (
        <HKForm />
    )
}

function Guest_Add_Resident() {
    return (
        <NKForm />
    )
}

export default Guest;
export { Guest_Add_Household, Guest_Add_Resident };