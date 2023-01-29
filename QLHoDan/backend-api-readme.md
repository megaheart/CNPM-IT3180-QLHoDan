# Tài liệu API backend của phần mềm quản lý hộ dân
# Module Quản lý tài khoản
## Truy cập Tài khoản cá nhân
### Đăng nhập

<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/signin```

*Dùng để lấy token để sử dụng cho việc xác nhận quyền truy cập*

- **Request Body**
    ```json
    {
        "userName": "string",
        "password": "string"
    }
    ```
    |Tham số|Miêu tả|
    |-------|-------|
    |userName|Tên đăng nhập vào tài khoản|
    |password|Mật khẩu đăng nhập vào tài khoản|

- **Response Body khi thành công**
    ```json
    {
        "token": "string"
    }
    ```
    |Tham số|Miêu tả|
    |-------|-------|
    |token|Bearer token để sử dụng cho việc xác nhận quyền truy cập|

- **Lỗi**
    - [400 BadRequest] IdS_InvalidAccount

        *Xảy ra khi người dùng đăng nhập không đúng tài khoản hay mật khẩu*

### Thay đổi mật khẩu

<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/changepassword```

*Dùng để thay đổi mật khẩu của tài khoản người dùng*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Request Body**
    ```json
    {
        "oldPassword": "string",
        "newPassword": "string"
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |oldPassword|Mật khẩu mà tài khoản đang sử dụng|
    |newPassword|Mật khẩu mới mà tài khoản muốn đổi thành|

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*
    - [400 BadRequest] IdS_PasswordMismatch

        *Xảy ra khi **oldPassword** không đúng*

### Lấy thông tin chi tiết của tài khoản

<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/account/profile```

*Dùng để lấy thông tin của tài khoản người dùng*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Response Body khi thành công**
    ```json
    {
        "fullName": "string",
        "scope": number
    }
    ```
    |Tham số|Miêu tả|
    |-------|-------|
    |fullName|Tên đầy đủ của người sở hữu tài khoản|
    |scope|Tổ phụ trách quản lý tài khoản|

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*


### Lấy ra tất cả danh sách tài khoản hộ dân

<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/account/household/AccountList```

*Lấy ra tất cả danh sách tài khoản hộ dân, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch xã) mới dùng được.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Response Body khi thành công**
    ```json
    [
        {
            "userName": "string",
            "fullName": "string",
            "scope": number,
            "note": "string"|null
        },
        ...
    ]
    ```
    |Tham số|Miêu tả|
    |-------|-------|
    |userName|Tên đăng nhập vào tài khoản|
    |fullName|Tên đầy đủ của người sở hữu tài khoản|
    |scope|Tổ phụ trách quản lý tài khoản|
    |note|Ghi chú của cấp quản lý cho tài khoản|

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch xã)*
        
### Thêm tài khoản hộ dân
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/household/addAccount```

*Thêm tài khoản hộ dân, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch xã) mới dùng được.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Request Body**
    ```json
    {
        "userName": "string",
        "password": "string",
        "fullName": "string",
        "scope": number,
        "note": "string"
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |userName|Tên đăng nhập vào tài khoản|
    |password|Mật khẩu của tài khoản|
    |fullName|Tên đầy đủ của người sở hữu tài khoản|
    |scope|Tổ phụ trách quản lý tài khoản|
    |note|*[tuỳ chọn]* Ghi chú của cấp quản lý cho tài khoản|

- **Response Body khi thành công**

    Không có gì cả

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch xã)*

### Thay đổi thông tin tài khoản hộ dân
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/household/addAccount```

*Thay đổi thông tin tài khoản hộ dân, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch xã) mới dùng được.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Request Body**
    ```json
    {
        "userName": "string",
        "fullName": "string",
        "scope": number,
        "note": "string"
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |userName|Tên đăng nhập vào tài khoản|
    |fullName|*[tuỳ chọn]* Tên đầy đủ của người sở hữu tài khoản|
    |scope|*[tuỳ chọn]* Tổ phụ trách quản lý tài khoản|
    |note|*[tuỳ chọn]* Ghi chú của cấp quản lý cho tài khoản|

- **Response Body khi thành công**

    Không có gì cả

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch xã)*


### Lấy ra tất cả danh sách tài khoản cấp đặc biệt

<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/account/household/AccountList```

*Lấy ra tất cả danh sách tài khoản cấp đặc biệt (Tổ trưởng, thư kí, chủ tịch xã), chỉ thư kí, chủ tịch xã mới dùng được.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Response Body khi thành công**
    ```json
    [
        {
            "userName": "string",
            "fullName": "string",
            "scope": number,
            "note": "string"|null
        },
        ...
    ]
    ```
    |Tham số|Miêu tả|
    |-------|-------|
    |userName|Tên đăng nhập vào tài khoản|
    |fullName|Tên đầy đủ của người sở hữu tài khoản|
    |scope|Tổ phụ trách quản lý tài khoản|
    |note|Ghi chú của cấp quản lý cho tài khoản|

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch xã.*
        
### Thêm tài khoản cấp đặc biệt
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/household/addAccount```

*Thêm tài khoản tài khoản cấp đặc biệt (Tổ trưởng, thư kí, chủ tịch xã), chỉ thư kí, chủ tịch xã mới dùng được.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Request Body**
    ```json
    {
        "userName": "string",
        "password": "string",
        "fullName": "string",
        "scope": number,
        "note": "string"
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |userName|Tên đăng nhập vào tài khoản|
    |password|Mật khẩu của tài khoản|
    |fullName|Tên đầy đủ của người sở hữu tài khoản|
    |scope|Tổ phụ trách quản lý tài khoản|
    |note|*[tuỳ chọn]* Ghi chú của cấp quản lý cho tài khoản|

- **Response Body khi thành công**

    Không có gì cả

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch xã.*

### Thay đổi thông tin tài khoản cấp đặc biệt
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/household/addAccount```

*Thay đổi thông tin tài khoản tài khoản cấp đặc biệt (Tổ trưởng, thư kí, chủ tịch xã), chỉ thư kí, chủ tịch xã mới dùng được.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Request Body**
    ```json
    {
        "userName": "string",
        "fullName": "string",
        "scope": number,
        "note": "string"
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |userName|Tên đăng nhập vào tài khoản|
    |fullName|*[tuỳ chọn]* Tên đầy đủ của người sở hữu tài khoản|
    |scope|*[tuỳ chọn]* Tổ phụ trách quản lý tài khoản|
    |note|*[tuỳ chọn]* Ghi chú của cấp quản lý cho tài khoản|

- **Response Body khi thành công**

    Không có gì cả

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch xã.*


### Thay đổi thông tin tài khoản bất kì
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/admin/changeAccountProfile```

*Thay đổi thông tin tài khoản bất kì (kể cả chính bản thân mình), chỉ chủ tịch xã mới dùng được*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Request Body**
    ```json
    {
        "userName": "string",
        "fullName": "string",
        "scope": number,
        "note": "string"
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |userName|Tên đăng nhập vào tài khoản|
    |fullName|*[tuỳ chọn]* Tên đầy đủ của người sở hữu tài khoản|
    |scope|*[tuỳ chọn]* Tổ phụ trách quản lý tài khoản|
    |note|*[tuỳ chọn]* Ghi chú của cấp quản lý cho tài khoản|

- **Response Body khi thành công**

    Không có gì cả

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải chủ tịch xã.*