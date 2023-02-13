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

    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(value)) {
        return {
            isValid: false,
            message: "Mật khẩu phải có ít nhất 1 chữ cái in thường .",
        };
    }

    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
        return {
            isValid: false,
            message: "Mật khẩu phải có ít nhất 1 chữ số.",
        };
    }

    const isValidLength = /^.{8,50}$/;
    if (!isValidLength.test(value)) {
        return {
            isValid: false,
            message: "Mật khẩu phải có ít nhất 8 ký tự và tối đa 50 ký tự.",
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

// function validateIdCard(idCard) {
//     if (nid.length !== 12 && nid.length !== 9) return false;
//     if (nid.length === 9) {
//         const idCardPattern = /^\d{9}$/;
//         return idCardPattern.test(idCard);
//     }
//     if (nid.length === 12) {
//         const idCardPattern = /^\d{12}$/;
//         return idCardPattern.test(idCard);
//     }
// }

const checkName = (s) => {
    const isFullName = /^([a-z]{1,10})(\s[a-z]{1,10})*$/;
    let str = s;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    if (!isFullName.test(str)) {
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