import { HKForm, NKForm } from '../Form'
function Guest() {
    return (
        <div>
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