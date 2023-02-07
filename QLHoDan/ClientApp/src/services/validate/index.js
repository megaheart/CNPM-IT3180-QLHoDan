function checkUsernameValidation(value) {
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
        return {
            isValid: false,
            message: "Tên đăng nhập không được chứa khoảng trắng.",
        };
    }

    const isValidLength = /^.{2,50}$/;
    if (!isValidLength.test(value)) {
        return {
            isValid: false,
            message: "Tên đăng nhập phải có ít nhất 2 ký tự và tối đa 16 ký tự.",
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


    const isContainsUppercase = /^(?=.*[A-Z])/;
    if (!isContainsUppercase.test(value)) {
        return {
            isValid: false,
            message: "Mật khẩu phải có ít nhất 1 chữ cái in hoa .",
        };
    }

    // const isContainsLowercase = /^(?=.*[a-z])/;
    // if (!isContainsLowercase.test(value)) {
    //     return {
    //         isValid: false,
    //         message: "Password must have at least one Lowercase Character.",
    //     };
    // }

    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
        return {
            isValid: false,
            message: "Mật khẩu phải có ít nhất 1 chữ số.",
        };
    }

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

const checkIdentification = (s) => {
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
};

const checkName = (s) => {
    const isFullName = /^([A-Z][a-z]{1,10})(\s[A-Z][a-z]{1,10})*$/;
    if (!isFullName.test(s)) {
        return {
            isValid: false,
            message: "Họ tên không hợp lệ.",
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

const scope = (s) => {
    const isScope = /^[0-9]+$/;
    if (!isScope.test(s)) {
        return {
            isValid: false,
            message: "Tổ quản lý không hợp lệ.",
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
    checkName = (value) => checkName(value);
    checkScope = (value) => scope(value);
}
const validation = new Validator();
export default validation;