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
        "scope": number,
        "avatarLink": "string",
        "wallpaperLink": "string"
    }
    ```
    |Tham số|Miêu tả|
    |-------|-------|
    |fullName|Tên đầy đủ của người sở hữu tài khoản|
    |scope|Tổ phụ trách quản lý tài khoản|
    |avatarLink|Id của bức ảnh đại diện|
    |wallpaperLink|Id của bức ảnh tường|

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

## Quản lý tài khoản hộ dân
### Lấy ra tất cả danh sách tài khoản hộ dân

<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/account/household/AccountList```

*Lấy ra tất cả danh sách tài khoản hộ dân, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ lấy ra danh sách tài khoản hộ dân thuộc tổ quản lý, thư kí, chủ tịch phường có thể lấy được tất cả danh sách tài khoản của toàn phường.*

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

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*
        
### Thêm tài khoản hộ dân
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/household/addAccount```

*Thêm tài khoản hộ dân, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ thêm được tài khoản hộ dân thuộc tổ quản lý.*

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

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể tạo tài khoản hộ dân thuộc phạm vi quản lý của tổ khác*

### Thay đổi thông tin tài khoản hộ dân
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/household/addAccount```

*Thay đổi thông tin tài khoản hộ dân, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ sửa được tài khoản hộ dân thuộc tổ quản lý. Thư kí, chủ tịch phường có thể sửa được tài khoản hộ dân của toàn phường*

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

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*
    
    - [400 BadRequest] IdS_UsernameNotExist

        *Tài khoản mà tổ trưởng muốn sửa không tồn tại*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể sửa thông tin tài khoản hộ dân thuộc phạm vi quản lý của tổ khác*

## Quản lý tài khoản đặc biệt
### Lấy ra tất cả danh sách tài khoản cấp đặc biệt

<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/account/household/AccountList```

*Lấy ra tất cả danh sách tài khoản cấp đặc biệt (Tổ trưởng, thư kí, chủ tịch phường), chỉ thư kí, chủ tịch phường mới dùng được.*

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

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch phường.*
        
### Thêm tài khoản cấp đặc biệt
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/household/addAccount```

*Thêm tài khoản tài khoản cấp đặc biệt (Tổ trưởng, thư kí, chủ tịch phường), chỉ thư kí, chủ tịch phường mới dùng được.*

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

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch phường.*

### Thay đổi thông tin tài khoản cấp đặc biệt
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/household/addAccount```

*Thay đổi thông tin tài khoản tài khoản cấp đặc biệt (Tổ trưởng, thư kí, chủ tịch phường), chỉ thư kí, chủ tịch phường mới dùng được.*

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

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch phường.*

## Cấp người quản trị
### Thay đổi thông tin tài khoản bất kì
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/admin/changeAccountProfile```

*Thay đổi thông tin tài khoản bất kì (kể cả chính bản thân mình), chỉ chủ tịch phường mới dùng được*

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

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải chủ tịch phường.*

# Module Quản lý hộ khẩu nhân khẩu
## Quản lý hộ khẩu
### Lấy danh sách hộ khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/Households```

*Lấy ra danh sách hộ khẩu (thông tin khá sơ lược), chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ lấy ra danh sách hộ khẩu thuộc tổ quản lý, thư kí, chủ tịch phường có thể lấy được tất cả danh sách hộ khẩu của toàn phường.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Response Body khi thành công**
    ```json
    [
        {
            "householdId": "string",
            "scope": number,
            "ownerFullName": "string",
            "ownerIDCode": "string"
        },
        ...
    ]
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |householdId|Số hộ khẩu|
    |scope|Tổ phụ trách quản lý hộ khẩu|
    |ownerFullName|Tên chủ hộ|
    |ownerIDCode|Số CMND/CCCD của chủ hộ|

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

### Lấy thông tin chi tiết của hộ khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span>
```https://localhost:7265/api/Households/{householdId}```

*Lấy ra thông tin chi tiết của hộ khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ lấy ra thông tin chi tiết của hộ khẩu thuộc tổ quản lý, thư kí, chủ tịch phường có thể lấy được thông tin chi tiết của hộ khẩu của toàn phường.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |householdId|Số hộ khẩu mà muốn lấy thông tin ra|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Response Body khi thành công**
    ```json
    {
        "householdId": "string",
        "address": "string",
        "scope": number,
        "memberIdCodes": string[],
        "createdTime": "DateTime",
        "moveOutPlace": "string"|null|undefined,
        "moveOutDate": "DateTime"|null|undefined,
        "moveOutReason": "string"|null|undefined
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |householdId|Số hộ khẩu|
    |address|Địa chỉ của hộ dân|
    |scope|Tổ phụ trách quản lý hộ khẩu|
    |memberIdCodes|Mảng số CMND/CCCD của tất cả thành viên trong gia đình|
    |createdTime|Ngày tạo sổ hộ khẩu|
    |moveOutPlace|Địa điểm chuyển đi|
    |moveOutDate|Ngày chuyển đi|
    |moveOutReason|Lý do chuyển đi|

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể lấy thông tin hộ khẩu thuộc phạm vi quản lý của tổ khác*

### Thêm hộ khẩu mới
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/Households```

*Thêm hộ khẩu mới, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ thêm được hộ khẩu mới thuộc tổ quản lý.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Request Body**
    ```json
    {
        "householdId": "string",
        "nonExistMembers": ResidentInfo[],
        "address": "string",
        "scope": number,
        "moveOutPlace": "string"|null|undefined,
        "moveOutDate": "DateTime"|null|undefined,
        "moveOutReason": "string"|null|undefined
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |householdId|Số hộ khẩu|
    |nonExistMembers|Danh sách thông tin về những nhân khẩu chưa có trong CSDL.<br/> Thông tin chi tiết cấu trúc đại diện cho thông tin mỗi nhân khẩu [ResidentInfo](#class-ResidentInfo)|
    |address|Địa chỉ của hộ dân|
    |scope|Tổ phụ trách quản lý hộ khẩu|
    |moveOutPlace|*[tuỳ chọn]* Địa điểm chuyển đi|
    |moveOutDate|*[tuỳ chọn]* Ngày chuyển đi|
    |moveOutReason|*[tuỳ chọn]* Lý do chuyển đi|
    <!-- |existMemberIds|Danh sách số CMND/CCCD của những nhân khẩu đã tồn tại trong CSDL nhưng chưa được thêm vào bất cứ hộ khẩu nào| -->

- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Xảy ra khi quá trình thêm hộ khẩu vào CSDL bị lỗi (cách khắc phục đó là request lại lần nữa)*

    - [409 Conflict]

        *Xảy ra khi hộ khẩu thêm vào có số hộ khẩu đã tồn tại trong CSDL hoặc số CMND/CCCD của một trong các thành viên được liệt kê trong **nonExistMembers** ở **Request body** đã tồn tại trong CSDL*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể tạo hộ khẩu thuộc phạm vi quản lý của tổ khác*

### Cập nhật hộ khẩu
<span style="color:#4285f4; width: 50px; display: inline-block">**PUT**</span>```https://localhost:7265/api/Households```

*Cập nhật thông tin hộ khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ cập nhật được thông tin hộ khẩu thuộc tổ quản lý.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Request Body**
    ```json
    {
        "householdId": "string",
        "nonExistMembers": ResidentInfo[]|null|undefined,
        "address": "string"|null|undefined,
        "scope": number|null|undefined,
        "moveOutPlace": "string"|null|undefined,
        "moveOutDate": "DateTime"|null|undefined,
        "moveOutReason": "string"|null|undefined
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |householdId|Số hộ khẩu|
    |nonExistMembers|*[tuỳ chọn]* Danh sách thông tin về những nhân khẩu chưa có trong CSDL mà bạn muốn bổ sung.<br/> Thông tin chi tiết cấu trúc đại diện cho thông tin mỗi nhân khẩu [ResidentInfo](#class-ResidentInfo)|
    |address|*[tuỳ chọn]* Địa chỉ của hộ dân|
    |scope|*[tuỳ chọn]* Tổ phụ trách quản lý hộ khẩu|
    |moveOutPlace|*[tuỳ chọn]* Địa điểm chuyển đi|
    |moveOutDate|*[tuỳ chọn]* Ngày chuyển đi|
    |moveOutReason|*[tuỳ chọn]* Lý do chuyển đi|
    <!-- |existMemberIds|Danh sách số CMND/CCCD của những nhân khẩu đã tồn tại trong CSDL nhưng chưa được thêm vào bất cứ hộ khẩu nào| -->

- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Hộ khẩu không tồn tại trong CSDL để cập nhật*
### Xoá hộ khẩu
<span style="color:#ea4335; width: 50px; display: inline-block">**DELETE**</span> ```https://localhost:7265/api/Households/{householdId}```

*Xoá hộ khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ xoá được hộ khẩu thuộc tổ quản lý.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |householdId|Số hộ khẩu mà muốn xoá|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Response Body khi thành công**
    
    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Hộ khẩu không tồn tại trong CSDL để xoá*

## Quản lý nhân khẩu
### Lấy danh sách nhân khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/Residents[?isDead={boolean}&movedOut={boolean}]```

*Lấy ra danh sách nhân khẩu (thông tin khá sơ lược), chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ lấy ra danh sách nhân khẩu thuộc tổ quản lý, thư kí, chủ tịch phường có thể lấy được tất cả danh sách nhân khẩu của toàn phường.*

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |isDead|*[tuỳ chọn]* `true` để lấy danh sách người đã chết, `false` để lấy danh sách những nhân khẩu bình thường<br/>Mặc định là `false`|
    |movedOut|*[tuỳ chọn]* `true` để lấy danh sách người đã chuyển đi, `false` để lấy danh sách những nhân khẩu đang thường trú/tạm trú<br/>Mặc định là `false`|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Response Body khi thành công**
    ```json
    [
        {
            "identityCode": "string",
            "fullName": "string",
            "dateOfBirth": "DateTime",
            "isMale": boolean,
            "householdId": "string",
            "relationShip": "string",
            "scope": 0
        },
        ...
    ]
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |identityCode|Số CMND/CCCD/Mã định danh điện tử của nhân khẩu|
    |fullName|Họ và tên nhân khẩu|
    |dateOfBirth|Ngày tháng năm sinh|
    |isMale|Giới tính **(Nam: *true*/ Nữ: *false*)**|
    |householdId|Số hộ khẩu mà nhân khẩu thuộc về|
    |relationShip|Quan hệ của nhân khẩu với chủ hộ|
    |scope|Tổ phụ trách quản lý nhân khẩu|

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

### Lấy thông tin chi tiết của nhân khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span>
```https://localhost:7265/api/Residents/{idCode}```

*Lấy ra thông tin chi tiết của nhân khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ lấy ra thông tin chi tiết của nhân khẩu thuộc tổ quản lý, thư kí, chủ tịch phường có thể lấy được thông tin chi tiết của nhân khẩu của toàn phường.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |householdId|Số nhân khẩu mà muốn lấy thông tin ra|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Response Body khi thành công**
    ```json
    {
        "fullName": "string",
        "alias": "string",
        "dateOfBirth": "DateTime",
        "isMale": boolean,
        "birthPlace": "string",
        "nativeLand": "string",
        "ethnic": "string",
        "nation": "string",
        "job": "string",
        "workplace": "string",
        "identityCode": "string",
        "idCardDate": "DateTime"|null|undefined,
        "idCardPlace": "string"|null|undefined,
        "relationShip": "string",
        "isManaged": boolean,
        "isDead": boolean,
        "moveOutPlace": "string"|null|undefined,
        "moveOutDate": "DateTime"|null|undefined,
        "moveOutReason": "string"|null|undefined,
        "academicLevel": "string",
        "criminalRecord": "string",
        "moveInDate": "DateTime",
        "moveInReason": "string",
        "householdId": "string"|null|undefined
    }

    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |fullName|Họ và tên|
    |alias|Bí danh|
    |dateOfBirth|Ngày tháng năm sinh|
    |isMale|Giới tính|
    |birthPlace|Nơi sinh|
    |nativeLand|Nguyên quán|
    |ethnic|Dân tộc|
    |nation|Quốc tịch|
    |job|Nghề nghiệp|
    |workplace|Nơi làm việc|
    |identityCode|CMND/CCCD, số định danh điện tử|
    |idCardDate|cmnd ngày cấp|
    |idCardPlace|cmnd nơi cấp|
    |relationShip|Quan hệ với chủ hộ|
    |moveOutPlace|Địa điểm chuyển đi|
    |moveOutDate|Ngày chuyển đi|
    |moveOutReason|Lý do chuyển đi|
    |academicLevel|trình độ học vấn|
    |criminalRecord|Tiền án|
    |moveInDate|ngày chuyển đến|
    |moveInReason|lý do chuyển đến|
    |householdId|Số hộ khẩu mà nhân khẩu thuộc về|

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể lấy thông tin nhân khẩu thuộc phạm vi quản lý của tổ khác*

### Thêm nhân khẩu mới
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/Residents```

*Thêm nhân khẩu mới, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ thêm được nhân khẩu mới thuộc tổ quản lý.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Request Body**
    ```json
    {
        "fullName": "string",
        "alias": "string",
        "dateOfBirth": "DateTime",
        "isMale": boolean,
        "birthPlace": "string",
        "nativeLand": "string",
        "ethnic": "string",
        "nation": "string",
        "job": "string",
        "workplace": "string",
        "identityCode": "string",
        "idCardDate": "DateTime"|null|undefined,
        "idCardPlace": "string"|null|undefined,
        "relationShip": "string",
        "academicLevel": "string",
        "criminalRecord": "string",
        "moveInDate": "DateTime",
        "moveInReason": "string",
        "scope": number|null|undefined,
        "householdId": "string"|null|undefined
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |fullName|Họ và tên|
    |alias|Bí danh|
    |dateOfBirth|Ngày tháng năm sinh|
    |isMale|Giới tính|
    |birthPlace|Nơi sinh|
    |nativeLand|Nguyên quán|
    |ethnic|Dân tộc|
    |nation|Quốc tịch|
    |job|Nghề nghiệp|
    |workplace|Nơi làm việc|
    |identityCode|CMND/CCCD, số định danh điện tử|
    |idCardDate|cmnd ngày cấp|
    |idCardPlace|cmnd nơi cấp|
    |relationShip|Quan hệ với chủ hộ|
    |academicLevel|trình độ học vấn|
    |criminalRecord|Tiền án|
    |moveInDate|ngày chuyển đến|
    |moveInReason|lý do chuyển đến|
    |householdId|*[tuỳ chọn]* Số hộ khẩu mà nhân khẩu thuộc về. Nếu nhân khẩu tạm trú thì không điền|
    |scope|*[tuỳ chọn]* Tổ quản lý nhân khẩu. Nếu đã điền trường **householdId** thì có thể bỏ qua trường này vì **scope** sẽ được lấy tự động từ hộ khẩu.|

- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Xảy ra khi quá trình thêm nhân khẩu vào CSDL bị lỗi (cách khắc phục đó là request lại lần nữa)*

    - [409 Conflict]

        *Xảy ra khi nhân khẩu thêm vào có số nhân khẩu đã tồn tại trong CSDL hoặc số CMND/CCCD của một trong các thành viên được liệt kê trong **nonExistMembers** ở **Request body** đã tồn tại trong CSDL*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể tạo nhân khẩu thuộc phạm vi quản lý của tổ khác*

### Cập nhật nhân khẩu
<span style="color:#4285f4; width: 50px; display: inline-block">**PUT**</span>```https://localhost:7265/api/Residents```

*Cập nhật thông tin nhân khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ cập nhật được thông tin nhân khẩu thuộc tổ quản lý.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Request Body**
    ```json
    {
        "fullName": "string"|null|undefined,
        "alias": "string"|null|undefined,
        "dateOfBirth": "DateTime"|null|undefined,
        "isMale": boolean|null|undefined,
        "birthPlace": "string"|null|undefined,
        "nativeLand": "string"|null|undefined,
        "ethnic": "string"|null|undefined,
        "nation": "string"|null|undefined,
        "job": "string"|null|undefined,
        "workplace": "string"|null|undefined,
        "identityCode": "string",
        "idCardDate": "DateTime"|null|undefined,
        "idCardPlace": "string"|null|undefined,
        "relationShip": "string"|null|undefined,
        "academicLevel": "string"|null|undefined,
        "criminalRecord": "string"|null|undefined,
        "moveInDate": "DateTime"|null|undefined,
        "moveInReason": "string"|null|undefined,
        "moveOutPlace": "string"|null|undefined,
        "moveOutDate": "DateTime"|null|undefined,
        "moveOutReason": "string"|null|undefined,
        "scope": number|null|undefined,
        "householdId": "string"|null|undefined
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |fullName|*[tuỳ chọn]* Họ và tên|
    |alias|*[tuỳ chọn]* Bí danh|
    |dateOfBirth|*[tuỳ chọn]* Ngày tháng năm sinh|
    |isMale|*[tuỳ chọn]* Giới tính|
    |birthPlace|*[tuỳ chọn]* Nơi sinh|
    |nativeLand|*[tuỳ chọn]* Nguyên quán|
    |ethnic|*[tuỳ chọn]* Dân tộc|
    |nation|*[tuỳ chọn]* Quốc tịch|
    |job|*[tuỳ chọn]* Nghề nghiệp|
    |workplace|*[tuỳ chọn]* Nơi làm việc|
    |identityCode|CMND/CCCD, số định danh điện tử|
    |idCardDate|*[tuỳ chọn]* cmnd ngày cấp|
    |idCardPlace|*[tuỳ chọn]* cmnd nơi cấp|
    |relationShip|*[tuỳ chọn]* Quan hệ với chủ hộ|
    |academicLevel|*[tuỳ chọn]* trình độ học vấn|
    |criminalRecord|*[tuỳ chọn]* Tiền án|
    |moveInDate|*[tuỳ chọn]* ngày chuyển đến|
    |moveInReason|*[tuỳ chọn]* lý do chuyển đến|
    |householdId|*[tuỳ chọn]* Số hộ khẩu mà nhân khẩu thuộc về. Nếu muốn chuyển nhân khẩu sang dạng tạm trú thì điền giá trị ```"delete"```|
    |scope|*[tuỳ chọn]* Tổ quản lý nhân khẩu. Nếu đã điền trường **householdId** thì có thể bỏ qua trường này vì **scope** sẽ được lấy tự động từ hộ khẩu.<br/>✅ Chỉ thay đổi được scope khi một trong hai điều kiện trên thoả mãn: 1️⃣ *Hành động cập nhật này thay đổi **householdId** sang một giá trị rỗng*, hoặc 2️⃣ *Ban đầu **householdId** rỗng và hành động cập nhật này không thay đổi **householdId*** <br/> 🚫 Khi đối tượng ban đầu có trường **householdId** khác rỗng, mà hành động cập nhật nhật này không làm thay đổi **householdId** hoặc thay đổi sang một giá trị khác rỗng thì tuyệt đối không được thay đổi scope.|

- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Hộ khẩu không tồn tại trong CSDL để cập nhật*
### Xoá nhân khẩu
<span style="color:#ea4335; width: 50px; display: inline-block">**DELETE**</span> ```https://localhost:7265/api/Residents/{idCode}```

*Xoá nhân khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ xoá được nhân khẩu thuộc tổ quản lý.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |householdId|Số nhân khẩu mà muốn xoá|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|Một chuỗi kí tự là token nhận được sau khi đăng nhập|

- **Response Body khi thành công**
    
    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Hộ khẩu không tồn tại trong CSDL để xoá*

# Các kiểu dữ liệu được sử dụng nhiều lần

## <span id="class-ResidentInfo">ResidentInfo</span>
```json
{
  "fullName": "string",
  "alias": "string",
  "dateOfBirth": "DateTime",
  "isMale": boolean,
  "birthPlace": "string",
  "nativeLand": "string",
  "ethnic": "string",
  "nation": "string",
  "job": "string",
  "workplace": "string",
  "identityCode": "string",
  "idCardDate": "DateTime"|null|undefined,
  "idCardPlace": "string"|null|undefined,
  "relationShip": "string",
  "academicLevel": "string",
  "criminalRecord": "string",
  "moveInDate": "DateTime",
  "moveInReason": "string"
}
```
|Tham số  |Miêu tả  |
|---------|---------|
|fullName|Họ và tên|
|alias|Bí danh|
|dateOfBirth|Ngày tháng năm sinh|
|isMale|Giới tính|
|birthPlace|Nơi sinh|
|nativeLand|Nguyên quán|
|ethnic|Dân tộc|
|nation|Quốc tịch|
|job|Nghề nghiệp|
|workplace|Nơi làm việc|
|identityCode|CMND/CCCD, số định danh điện tử|
|idCardDate|cmnd ngày cấp|
|idCardPlace|cmnd nơi cấp|
|relationShip|Quan hệ với chủ hộ|
|academicLevel|trình độ học vấn|
|criminalRecord|Tiền án|
|moveInDate|ngày chuyển đến|
|moveInReason|lý do chuyển đến|