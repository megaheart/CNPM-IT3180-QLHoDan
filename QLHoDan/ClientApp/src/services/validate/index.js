function checkUsernameValidation(value) {
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
        return {
            isValid: false,
            message: "Tên đăng nhập không được chứa khoảng trắng.",
        };
    }

    const isValidLength = /^.{6,16}$/;
    if (!isValidLength.test(value)) {
        return {
            isValid: false,
            message: "Tên đăng nhập phải có ít nhất 6 ký tự và tối đa 16 ký tự.",
        };
    }
    return {
        isValid: true,
        message: "",
    };
}

function checkPasswordValidation(value) {
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
        return {
            isValid: false,
            message: "Mật khẩu không được chứa khoảng trắng.",
        };
    }


    // const isContainsUppercase = /^(?=.*[A-Z])/;
    // if (!isContainsUppercase.test(value)) {
    //     return {
    //         isValid: false,
    //         message: "Password must have at least one Uppercase Character.",
    //     };
    // }

    // const isContainsLowercase = /^(?=.*[a-z])/;
    // if (!isContainsLowercase.test(value)) {
    //     return {
    //         isValid: false,
    //         message: "Password must have at least one Lowercase Character.",
    //     };
    // }

    // const isContainsNumber = /^(?=.*[0-9])/;
    // if (!isContainsNumber.test(value)) {
    //     return {
    //         isValid: false,
    //         message: "Password must have at least one Number.",
    //     };
    // }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
        return {
            isValid: false,
            message: "Mật khẩu phải có ít nhất 8 ký tự và tối đa 16 ký tự.",
        };
    }
    return {
        isValid: true,
        message: "",
    };
};

function checkIdentification(s) {
    const isIdentification = /^[0-9]{12}$/;
    if (!isIdentification.test(s)) {
        return {
            isValid: false,
            message: "Số chứng minh nhân dân phải có 12 chữ số.",
        };
    }
    return {
        isValid: true,
        message: "",
    };
}
function checkEmail(s) {
    const isEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!isEmail.test(s)) {
        return {
            isValid: false,
            message: "Email không hợp lệ.",
        };
    }
    return {
        isValid: true,
        message: "",
    };
}
class Validator {
    checkPassword = (value) => checkPasswordValidation(value);
    checkUsername = (value) => checkUsernameValidation(value);
    checkIdentifi = (value) => checkIdentification(value);
    checkEmail = (value) => checkEmail(value);
}
const validation = new Validator();
export default validation;