# Tài liệu API backend của phần mềm quản lý hộ dân
## Hướng dẫn sử dục tài liệu
- Các trường mà phần miêu tả có *[tuỳ chọn]* ở đầu, các trường đấy có thể bỏ qua mà không cần cho vào json, không bắt buộc
- ```"DateTime"``` là kiểu dữ liệu json miêu tả ngày tháng, có dạng `yyyy-MM-ddTHH:mm:ss`

# Module Nền tảng
## Truy cập tài nguyên tĩnh
### Lấy nội dung ảnh
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/static/img/{id}```

*Dùng để lấy nội dung file ảnh*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|Id của bức ảnh|

- **Response Body khi thành công**
    Nội dung nhị phân của file ảnh

- **Lỗi**
    - [400 NotFound]

        *Id của hình ảnh không chính xác*
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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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
### Cập nhật avatar

<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/changeAvatar```

*Dùng để cập nhật hình đại diện của tài khoản người dùng*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|
- **Request Body (Content-Type=multipart/form-data)**

    Là dạng dữ liệu form-data với các trường bên dưới

    |Key|Value|Miêu tả|
    |-------|-------|-------|
    |file|Nội dung file ảnh|Ảnh avatar được upload lên|
- **Response Body khi thành công**
    Một chuỗi text là Id của avatar, dùng API [Lấy nội dung ảnh](#lấy-nội-dung-ảnh) và Id vừa nhận được để tải avatar xuống

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

### Cập nhật Wallpaper

<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/changeWallpaper```

*Dùng để cập nhật wallpaper của tài khoản người dùng*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|
- **Request Body (Content-Type=multipart/form-data)**

    Là dạng dữ liệu form-data với các trường bên dưới

    |Key|Value|Miêu tả|
    |-------|-------|-------|
    |file|Nội dung file ảnh|Ảnh Wallpaper được upload lên|
- **Response Body khi thành công**
    Một chuỗi text là Id của Wallpaper, dùng API [Lấy nội dung ảnh](#lấy-nội-dung-ảnh) và Id vừa nhận được để tải Wallpaper xuống

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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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

    - [400 BadRequest] IdS_DuplicateUserName

        *Tên đăng nhập đã tồn tại*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể tạo tài khoản hộ dân thuộc phạm vi quản lý của tổ khác*

### Thay đổi thông tin tài khoản hộ dân
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/household/changeAccountProfile```

*Thay đổi thông tin tài khoản hộ dân, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ sửa được tài khoản hộ dân thuộc tổ quản lý. Thư kí, chủ tịch phường có thể sửa được tài khoản hộ dân của toàn phường*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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

<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/account/special/AccountList```

*Lấy ra tất cả danh sách tài khoản cấp đặc biệt (Tổ trưởng, thư kí, chủ tịch phường), chỉ thư kí, chủ tịch phường mới dùng được.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    ```json
    [
        {
            "userName": "string",
            "fullName": "string",
            "role": number,
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
    |role|Cấp độ tài khoản (1 - Chủ tịch xã, 2 - Kế toán, 3 - Tổ trưởng)|
    |scope|Tổ phụ trách quản lý tài khoản|
    |note|Ghi chú của cấp quản lý cho tài khoản|

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch phường.*
        
### Thêm tài khoản cấp đặc biệt
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/special/addAccount```

*Thêm tài khoản tài khoản cấp đặc biệt (Tổ trưởng, thư kí, chủ tịch phường), chỉ thư kí, chủ tịch phường mới dùng được.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body**
    ```json
    {
        "userName": "string",
        "password": "string",
        "fullName": "string",
        "role": number,
        "scope": number,
        "note": "string"
    }
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |userName|Tên đăng nhập vào tài khoản|
    |password|Mật khẩu của tài khoản|
    |fullName|Tên đầy đủ của người sở hữu tài khoản|
    |role|Cấp độ tài khoản (1 - Chủ tịch xã, 2 - Kế toán, 3 - Tổ trưởng)|
    |scope|Tổ phụ trách quản lý tài khoản|
    |note|*[tuỳ chọn]* Ghi chú của cấp quản lý cho tài khoản|

- **Response Body khi thành công**

    Không có gì cả

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch phường.*
            
    - [400 BadRequest] IdS_DuplicateUserName

        *Tên đăng nhập đã tồn tại*

### Thay đổi thông tin tài khoản cấp đặc biệt
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/special/changeAccountProfile```

*Thay đổi thông tin tài khoản tài khoản cấp đặc biệt (Tổ trưởng, thư kí, chủ tịch phường), chỉ thư kí, chủ tịch phường mới dùng được.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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

## Quản lý thông báo
### Lấy số lượng thông báo chưa đọc
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/Notification/count```

*Đếm số lượng thông báo chưa đọc.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    Trả về 1 số nguyên không âm biểu thị số tin nhắn chưa đọc

    Ex:
    ```json
    3
    ```
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

### Lấy ra danh sách thông báo

<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/Notification[?isRead={boolean}]```

*Lấy ra danh sách thông báo thoả mã điều kiện cho trước.*

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |isRead|*[tuỳ chọn]* `true` để lấy danh sách thông báo đã đọc, `false` để lấy danh sách thông báo chưa đọc.<br/>Mặc định là `false`|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**

    Một danh sách các thông báo mà mỗi thông báo đều có định dạng được miêu tả ở bảng dưới:

    | Property    | Type      | Description            |
    | ----------- | --------- | ---------------------- |
    | `id`          | int       | id                     |
    | `sender `     | string    | Username Tài khoản gửi |
    | `senderFullname` | string | Tên đầy đủ của tài khoản gửi |
    | `time`        | DateTime  | Ngày giờ phút giây gửi   |
    | `content`     | string    | Nội dung thông báo       |
    | `isRead`      | boolean   | Đã đọc hay chưa        |

    Ex:
    ```json
    [
        {
            "Id": 30,
            "Sender": "admin",
            "SenderFullname": "Nguyễn Quý Sinh",
            "Time": "2022-12-31T23:59:59",
            "Content": "Các đồng chí chuẩn bị cho nghị định mới.",
            "IsRead": false
        },
        ...
    ]
    ```

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

### Đánh dấu thông báo đã đọc
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/Notification/read?msgIds={int},{int},..,{int}```

*Phê duyệt đợt thưởng, gửi thông báo mở đợt thưởng với toàn bộ người dân (nếu điền), và tài khoản đặc biệt (nếu điền).* 

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |msgIds|Danh sách các mã thông báo cần đánh dấu đã đọc, có thể gồm 1 hoặc nhiều phần tử, là các số nguyên dương cách nhau bởi dấu phẩy|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    
    Gửi về 1 danh sách Id của những thông báo đánh dấu đã đọc thành công.

    Ex:
    ```json
    [2154,2,5,45]
    ```

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [400 BadRequest] InvalidMsgIds

        *msgIds bị sai định dạng*

# Module Quản lý hộ khẩu nhân khẩu
## Quản lý hộ khẩu
### Lấy danh sách hộ khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/Households[?movedOut={boolean}]```

*Lấy ra danh sách hộ khẩu (thông tin khá sơ lược), chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ lấy ra danh sách hộ khẩu thuộc tổ quản lý, thư kí, chủ tịch phường có thể lấy được tất cả danh sách hộ khẩu của toàn phường.*

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |movedOut|*[tuỳ chọn]* `true` để lấy danh sách hộ khẩu đã chuyển đi, `false` để lấy danh sách những hộ khẩu đang thường trú<br/>Mặc định là `false`|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    ```json
    [
        {
            "householdId": "string",
            "scope": number,
            "ownerFullName": "string",
            "ownerIDCode": "string",
            "createdTime": "DateTime"
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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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
    |nonExistMembers|Danh sách thông tin về những nhân khẩu chưa có trong CSDL.<br/> Thông tin chi tiết cấu trúc đại diện cho thông tin mỗi nhân khẩu [ResidentInfo](#residentinfo)|
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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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
    |nonExistMembers|*[tuỳ chọn]* Danh sách thông tin về những nhân khẩu chưa có trong CSDL mà bạn muốn bổ sung.<br/> Thông tin chi tiết cấu trúc đại diện cho thông tin mỗi nhân khẩu [ResidentInfo](#residentinfo)|
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

    - [400 BadRequest] InvalidMoveOut

        *Phải thay đổi đồng thời cả nơi chuyển đi, ngày chuyển đi và lý do chuyển đi. Chứ thay đổi một hai cái mà không thay đổi cả thì dữ liệu sẽ không hợp lệ*

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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    
    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Hộ khẩu không tồn tại trong CSDL để xoá*

    - [400 BadRequest] ForeignKeyConstraintFailed

        *Xảy ra khi xoá một phần tử mà một số hàng trong các bảng khác có khoá ngoài trỏ đến phần tử này.*

        *Phần tử này hiện tại không thể bị xoá. Thay vào đó hãy cảnh báo người dùng rằng hộ khẩu này không thể xoá (Nó đã được các dữ liệu khác đề cập đến, cũng như điều này đảm bảo thông tin của sổ hộ khẩu này là một thông tin hợp lệ với thực tiễn, không phải một mẫu thử nghiệm.)*

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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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

    - [400 BadRequest] InvalidScope

        *Scope chưa được nhập và không tìm thấy hộ khẩu để lấy ra scope.*

        *Scope bị nhập sai định dạng (scope là 1 số nguyên dương).*

### Cập nhật nhân khẩu
<span style="color:#4285f4; width: 50px; display: inline-block">**PUT**</span>```https://localhost:7265/api/Residents```

*Cập nhật thông tin nhân khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ cập nhật được thông tin nhân khẩu thuộc tổ quản lý.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

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

        *Nhân khẩu khẩu không tồn tại trong CSDL để cập nhật*

    - [400 BadRequest] InvalidMoveOut

        *Phải thay đổi đồng thời cả nơi chuyển đi, ngày chuyển đi và lý do chuyển đi. Chứ thay đổi một hai cái mà không thay đổi cả thì dữ liệu sẽ không hợp lệ*
    
### Xoá nhân khẩu
<span style="color:#ea4335; width: 50px; display: inline-block">**DELETE**</span> ```https://localhost:7265/api/Residents/{idCode}```

*Xoá nhân khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

*Tổ trưởng chỉ xoá được nhân khẩu thuộc tổ quản lý.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |idCode|Số CMND/CCCD/Mã định danh điện tử của nhân khẩu mà muốn xoá|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    
    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Nhân khẩu không tồn tại trong CSDL để xoá*
    - [400 BadRequest] ForeignKeyConstraintFailed

        *Xảy ra khi xoá một phần tử mà một số hàng trong các bảng khác có khoá ngoài trỏ đến phần tử này.*

        *Phần tử này hiện tại không thể bị xoá. Thay vào đó hãy cảnh báo người dùng rằng hộ khẩu này không thể xoá (Nó đã được các dữ liệu khác đề cập đến, cũng như điều này đảm bảo thông tin của nhân khẩu này là một thông tin hợp lệ với thực tiễn, không phải một mẫu thử nghiệm.)*

## Form Đăng kí hộ khẩu, nhân khẩu
### Lấy ra danh sách form Đăng kí hộ khẩu, nhân khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/forms/Household[?isChecked={boolean}]```

*Lấy ra danh sách form Đăng kí hộ khẩu, nhân khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |isChecked|*[tuỳ chọn]* Đừng ghi vào nếu muốn lấy ra toàn bộ form.<br/> Để `true` nếu muốn lấy ra chỉ những form ĐÃ ĐƯỢC DUYỆT hoặc BỊ TỪ CHỐI (những form đã được các cán bộ kiểm tra qua). Để `false` nếu muốn lấy ra chỉ những form chưa được kiểm tra.|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    
    Trả về một danh sách các [FormBriefInfo](#formbriefinfo) (click vào để xem giải thích)

    Ex:
    ```json
    [
        {
            "id": 1,
            "formType": "Household",
            "title": "Form title",
            "createdTime": "2022-01-01T00:00:00",
            "isAccepted": true,
            "notAcceptedReason": "Reason for not accepting",
            "account": "user123"
        },
        ...
    ]
    ```
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*


### Lấy thông tin chi tiết của form Đăng kí hộ khẩu, nhân khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span>
```https://localhost:7265/api/forms/Household/{id}```

*Lấy ra thông tin chi tiết của form Đăng kí hộ khẩu, nhân khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form Đăng kí hộ khẩu, nhân khẩu|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    | Property Name | Type | Description |
    | --- | --- | --- |
    | id | int | ID cuar form |
    | householdId | string | Số hộ khẩu |
    | address | string | địa chỉ thường trú |
    | members | [ResidentForm](#residentform)[] | Danh sách [ResidentForm](#residentform) của tất cả các thành viên |
    | scope | int | Tổ Phụ Trách |
    | createdTime | DateTime |  |
    | imageLinks | string[] | Ảnh minh chứng (mảng danh sách các địa chỉ dẫn đến hình ảnh đó) |
    | isAccepted | bool | Đã duyệt chưa |
    | notAcceptedReason | string? | Lý do từ chối |


    - ℹ️ **Lưu ý:** Form **CHƯA** được kiểm tra khi `notAcceptedReason = null` và `isAccepted = false`. Form **ĐÃ** được duyệt khi `notAcceptedReason = null` và `isAccepted = true`. Form **BỊ TỪ CHỐI** khi `notAcceptedReason != null`.

    Ex:

    ```json
    {
        "id": 1,
        "householdId": "123456789",
        "address": "123 Main St.",
        "members": [
            {
            "id": 1,
            "fullName": "John Doe",
            "alias": "JD",
            "dateOfBirth": "1991-01-01",
            "isMale": true,
            "birthPlace": "New York",
            "nativeLand": "USA",
            "ethnic": "American",
            "nation": "USA",
            "job": "Software Engineer",
            "workplace": "Google",
            "identityCode": "123456789",
            "relationShip": "Chủ hộ",
            "academicLevel": "Bachelor's Degree",
            "criminalRecord": "None",
            "moveInDate": "1991-01-01",
            "moveInReason": "For work"
            },
            {
            "id": 2,
            "fullName": "Jane Doe",
            "alias": "JD",
            "dateOfBirth": "2002-01-01",
            "isMale": false,
            "birthPlace": "New York",
            "nativeLand": "USA",
            "ethnic": "American",
            "nation": "USA",
            "job": "Teacher",
            "workplace": "New York Public School",
            "identityCode": "987654321",
            "relationShip": "Daughter",
            "academicLevel": "Master's Degree",
            "criminalRecord": "None",
            "moveInDate": "2021-01-01",
            "moveInReason": "For work"
            }
        ],
        "scope": 1,
        "createdTime": "2022-01-01",
        "imageLinks": [
            "image1.jpg",
            "image2.jpg"
        ],
        "isAccepted": true,
        "notAcceptedReason": null
    }
    ```
    

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xem form thuộc phạm vi quản lý của tổ khác*

### Gửi form Đăng kí hộ khẩu, nhân khẩu
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/Household```

*Gửi form Đăng kí hộ khẩu, nhân khẩu.*


- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (form-data)**

    | Property         | Type | Description | Example |
    |------------------|-----------|-------------|-----|
    | HouseholdId | string | Số hộ khẩu | 123456710 |
    | Address | string | địa chỉ thường trú | XX, yy, zz |
    | Members | string (json format) | Danh sách [AddingResidentFormRequestModel](#addingresidentformrequestmodel) của tất cả các thành viên | |
    | Scope | int | Tổ Phụ Trách | 3 |
    | Images | binary | Danh sách ảnh minh chứng | binary |

- **Response Body khi thành công (Json)**

    [FormBriefInfo](#formbriefinfo) của form mới gửi lên, có chứa Id của cái form đó.

    Thuộc tính `account` có chứa token để lấy tin nhắn phê duyệt.
    
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Xảy ra khi quá trình thêm Đợt thưởng vào CSDL bị lỗi (cách khắc phục đó là request lại lần nữa)*

    - [400 BadRequest] HouseholdExist

        *Hộ khẩu đã được quản lý bởi hệ thống, không thể thêm mới.*

### Duyệt form Đăng kí hộ khẩu, nhân khẩu
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/Household/accept/{id}```

*Phê duyệt hoặc từ chối form Đăng kí hộ khẩu, nhân khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Duyệt được form minh chứng của toàn bộ phường
2. Tổ trưởng: Chỉ duyệt được form minh chứng của chỉ tổ phụ trách

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form Đăng kí hộ khẩu, nhân khẩu|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (Json)**
    | Property Name | Type | Description |
    | --- | --- | --- |
    | Accept | bool | Có chấp nhận không hay là từ chối |
    | NotAcceptReason | string | *[Tuỳ chọn]* Lý do từ chối, **bắt buộc phải có nếu như từ chối** |

    Ex:

    ```json
    //Nếu chấp nhận
    {
        "accept": true,
        "notAcceptReason": null
    }
    ```
    ```json
    //Nếu TỪ CHỐI
    {
        "accept": false,
        "notAcceptReason": "Minh chứng này đã được dùng từ năm ngoái rồi nhé :)"
    }
    ```
- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xét duyệt form thuộc phạm vi quản lý của tổ khác*

    - [400 BadRequest] CheckedForm

        *Form đã được kiểm tra (phê duyệt hoặc bị từ chối) nên không thể kiểm tra lại nữa.*

## Form Xin chuyển đi
### Lấy ra danh sách form Xin chuyển đi
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/forms/MovingOut[?isChecked={boolean}]```

*Lấy ra danh sách form Xin chuyển đi. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |isChecked|*[tuỳ chọn]* Đừng ghi vào nếu muốn lấy ra toàn bộ form.<br/> Để `true` nếu muốn lấy ra chỉ những form ĐÃ ĐƯỢC DUYỆT hoặc BỊ TỪ CHỐI (những form đã được các cán bộ kiểm tra qua). Để `false` nếu muốn lấy ra chỉ những form chưa được kiểm tra.|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    
    Trả về một danh sách các [FormBriefInfo](#formbriefinfo) (click vào để xem giải thích)

    Ex:
    ```json
    [
        {
            "id": 1,
            "formType": "MovingOut",
            "title": "Form title",
            "createdTime": "2022-01-01T00:00:00",
            "isAccepted": true,
            "notAcceptedReason": "Reason for not accepting",
            "account": "user123"
        },
        ...
    ]
    ```
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*


### Lấy thông tin chi tiết của form Xin chuyển đi
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span>
```https://localhost:7265/api/forms/MovingOut/{id}```

*Lấy ra thông tin chi tiết của form Xin chuyển đi. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form Xin chuyển đi|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    | Property Name | Data Type | Description |
    | --- | --- | --- |
    | id | int | id |
    | moveOutPlace | string | Nơi chuyển đi |
    | moveOutDate | DateTime | Ngày chuyển đi |
    | moveOutReason | string | Lý do chuyển đi |
    | resident | [ResidentBriefInfo](#formbriefinfo) | Người chuyển đi |
    | createdTime | DateTime | Thời gian tạo |
    | isAccepted | bool | Đã duyệt chưa |
    | notAcceptedReason | string | Lý do từ chối |
    | account | string | Tài khoản người gửi |


    - ℹ️ **Lưu ý:** Form **CHƯA** được kiểm tra khi `notAcceptedReason = null` và `isAccepted = false`. Form **ĐÃ** được duyệt khi `notAcceptedReason = null` và `isAccepted = true`. Form **BỊ TỪ CHỐI** khi `notAcceptedReason != null`.

    Ex:

    ```json
    {
        "id": 1,
        "moveOutPlace": "Somewhere",
        "moveOutDate": "2022-01-01T00:00:00",
        "moveOutReason": "Personal reason",
        "resident": {
            "identityCode": "000001",
            "fullName": "Nguyễn Văn Quảng",
            "dateOfBirth": "1970-10-01T00:00:00",
            "isMale": true,
            "householdId": "001",
            "relationShip": "Chủ hộ",
            "scope": 1
        },
        "createdTime": "2022-01-01T00:00:00",
        "isAccepted": true,
        "notAcceptedReason": "",
        "account": "johndoe"
    }
    ```
    

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xem form thuộc phạm vi quản lý của tổ khác*

### Gửi form Xin chuyển đi
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/MovingOut```

*Gửi form Xin chuyển đi.*


- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (form-data)**

    | Property         | Type | Description | Example |
    |------------------|-----------|-------------|-----|
    | moveOutPlace | string | Nơi chuyển đi | xã A, huyện B, tỉnh C |
    | moveOutDate | DateTime | Ngày chuyển đi | 2022-12-30 |
    | moveOutReason | string | Lý do chuyển đi | Công việc |
    | ResidentIdCode | string | Số CMND/CCCD của Người chuyển đi | 02134698722 |


- **Response Body khi thành công (Json)**

    [FormBriefInfo](#formbriefinfo) của form mới gửi lên, có chứa Id của cái form đó
    
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Xảy ra khi quá trình thêm Đợt thưởng vào CSDL bị lỗi (cách khắc phục đó là request lại lần nữa)*

    - [400 BadRequest] ResidentNotFound

        *Nhân khẩu không tồn tại trong CSDL.*

    - [400 BadRequest] ResidentMovedOut

        *Nhân khẩu đã chuyển đi rồi không chuyển đi nữa.*

### Duyệt form Xin chuyển đi
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/MovingOut/accept/{id}```

*Phê duyệt hoặc từ chối form Xin chuyển đi. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Duyệt được form minh chứng của toàn bộ phường
2. Tổ trưởng: Chỉ duyệt được form minh chứng của chỉ tổ phụ trách

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form Xin chuyển đi|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (Json)**
    | Property Name | Type | Description |
    | --- | --- | --- |
    | Accept | bool | Có chấp nhận không hay là từ chối |
    | NotAcceptReason | string | *[Tuỳ chọn]* Lý do từ chối, **bắt buộc phải có nếu như từ chối** |

    Ex:

    ```json
    //Nếu chấp nhận
    {
        "accept": true,
        "notAcceptReason": null
    }
    ```
    ```json
    //Nếu TỪ CHỐI
    {
        "accept": false,
        "notAcceptReason": "Minh chứng này đã được dùng từ năm ngoái rồi nhé :)"
    }
    ```
- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xét duyệt form thuộc phạm vi quản lý của tổ khác*

    - [400 BadRequest] CheckedForm

        *Form đã được kiểm tra (phê duyệt hoặc bị từ chối) nên không thể kiểm tra lại nữa.*

### Rút lại form Xin chuyển đi
<span style="color:#ea4335; width: 50px; display: inline-block">**DELETE**</span> ```https://localhost:7265/api/forms/MovingOut/{id}```

*Rút lại form Xin chuyển đi (có thể do thấy sai hay gì đó). Hành động này chỉ thực hiện được khi form chưa được duyệt.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form Xin chuyển đi|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    
    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Đợt thưởng không tồn tại trong CSDL để xoá*

    - [400 BadRequest] CheckedForm

        *Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại.*

## Form chứng tử
### Lấy ra danh sách form chứng tử
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/forms/Dead[?isChecked={boolean}]```

*Lấy ra danh sách form chứng tử. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |isChecked|*[tuỳ chọn]* Đừng ghi vào nếu muốn lấy ra toàn bộ form.<br/> Để `true` nếu muốn lấy ra chỉ những form ĐÃ ĐƯỢC DUYỆT hoặc BỊ TỪ CHỐI (những form đã được các cán bộ kiểm tra qua). Để `false` nếu muốn lấy ra chỉ những form chưa được kiểm tra.|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    
    Trả về một danh sách các [FormBriefInfo](#formbriefinfo) (click vào để xem giải thích)

    Ex:
    ```json
    [
        {
            "id": 1,
            "formType": "Dead",
            "title": "Form title",
            "createdTime": "2022-01-01T00:00:00",
            "isAccepted": true,
            "notAcceptedReason": "Reason for not accepting",
            "account": "user123"
        },
        ...
    ]
    ```
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*


### Lấy thông tin chi tiết của form chứng tử
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span>
```https://localhost:7265/api/forms/Dead/{id}```

*Lấy ra thông tin chi tiết của form chứng tử. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form chứng tử|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**

    | Property Name | Data Type | Description |
    | --- | --- | --- |
    | `id` | `int` | id |
    | `resident` | `ResidentBriefInfo` | người chuyển đi |
    | `createdTime` | `DateTime` | ngày tạo |
    | `isAccepted` | `bool` | Đã duyệt chưa |
    | `imageLinks` | `List<string>` | Minh chứng (đường đẫn đến ảnh của giấy chứng tử) |
    | `notAcceptedReason` | `string, nullable` | Lý do không chấp nhận |
    | `account` | `string` | Username tài khoản hộ dân gửi |



    - ℹ️ **Lưu ý:** Form **CHƯA** được kiểm tra khi `notAcceptedReason = null` và `isAccepted = false`. Form **ĐÃ** được duyệt khi `notAcceptedReason = null` và `isAccepted = true`. Form **BỊ TỪ CHỐI** khi `notAcceptedReason != null`.

    Ex:

    ```json
    {
        "id": 1,
        "resident": {
            "identityCode": "000001",
            "fullName": "Nguyễn Văn Quảng",
            "dateOfBirth": "1970-10-01T00:00:00",
            "isMale": true,
            "householdId": "001",
            "relationShip": "Chủ hộ",
            "scope": 1
        },
        "createdTime": "2022-01-01T00:00:00",
        "isAccepted": true,
        "imageLinks": [
            "link1.png",
            "link2.png"
        ],
        "notAcceptedReason": null,
        "account": "johndoe123"
    }

    ```
    

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xem form thuộc phạm vi quản lý của tổ khác*

### Gửi form chứng tử
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/Dead```

*Gửi form chứng tử.*


- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (form-data)**

    | Property         | Type | Description | Example |
    |------------------|-----------|-------------|-----|
    | ResidentIdCode | string | Số CMND/CCCD của Người chuyển đi | 02134698722 |
    | Images | binary | Danh sách ảnh minh chứng | binary |


- **Response Body khi thành công (Json)**

    [FormBriefInfo](#formbriefinfo) của form mới gửi lên, có chứa Id của cái form đó
    
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Xảy ra khi quá trình thêm Đợt thưởng vào CSDL bị lỗi (cách khắc phục đó là request lại lần nữa)*

    - [400 BadRequest] ResidentNotFound

        *Nhân khẩu không tồn tại trong CSDL.*

    - [400 BadRequest] ResidentDead

        *Nhân khẩu dã được cán bộ quản lý xác định là đã mất trước đó.*

### Duyệt form chứng tử
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/Dead/accept/{id}```

*Phê duyệt hoặc từ chối form chứng tử. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Duyệt được form minh chứng của toàn bộ phường
2. Tổ trưởng: Chỉ duyệt được form minh chứng của chỉ tổ phụ trách

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form chứng tử|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (Json)**
    | Property Name | Type | Description |
    | --- | --- | --- |
    | Accept | bool | Có chấp nhận không hay là từ chối |
    | NotAcceptReason | string | *[Tuỳ chọn]* Lý do từ chối, **bắt buộc phải có nếu như từ chối** |

    Ex:

    ```json
    //Nếu chấp nhận
    {
        "accept": true,
        "notAcceptReason": null
    }
    ```
    ```json
    //Nếu TỪ CHỐI
    {
        "accept": false,
        "notAcceptReason": "Minh chứng này đã được dùng từ năm ngoái rồi nhé :)"
    }
    ```
- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xét duyệt form thuộc phạm vi quản lý của tổ khác*

    - [400 BadRequest] CheckedForm

        *Form đã được kiểm tra (phê duyệt hoặc bị từ chối) nên không thể kiểm tra lại nữa.*

### Rút lại form chứng tử
<span style="color:#ea4335; width: 50px; display: inline-block">**DELETE**</span> ```https://localhost:7265/api/forms/Dead/{id}```

*Rút lại form chứng tử (có thể do thấy sai hay gì đó). Hành động này chỉ thực hiện được khi form chưa được duyệt.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form chứng tử|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    
    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Đợt thưởng không tồn tại trong CSDL để xoá*

    - [400 BadRequest] CheckedForm

        *Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại.*

## Form xin thay đổi thông tin nhân khẩu
### Lấy ra danh sách form xin thay đổi thông tin nhân khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/forms/ChangingResidentInfo[?isChecked={boolean}]```

*Lấy ra danh sách form xin thay đổi thông tin nhân khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |isChecked|*[tuỳ chọn]* Đừng ghi vào nếu muốn lấy ra toàn bộ form.<br/> Để `true` nếu muốn lấy ra chỉ những form ĐÃ ĐƯỢC DUYỆT hoặc BỊ TỪ CHỐI (những form đã được các cán bộ kiểm tra qua). Để `false` nếu muốn lấy ra chỉ những form chưa được kiểm tra.|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    
    Trả về một danh sách các [FormBriefInfo](#formbriefinfo) (click vào để xem giải thích)

    Ex:
    ```json
    [
        {
            "id": 1,
            "formType": "ChangingResidentInfo",
            "title": "Form title",
            "createdTime": "2022-01-01T00:00:00",
            "isAccepted": true,
            "notAcceptedReason": "Reason for not accepting",
            "account": "user123"
        },
        ...
    ]
    ```
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*


### Lấy thông tin chi tiết của form xin thay đổi thông tin nhân khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span>
```https://localhost:7265/api/forms/ChangingResidentInfo/{id}```

*Lấy ra thông tin chi tiết của form xin thay đổi thông tin nhân khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form xin thay đổi thông tin nhân khẩu|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**

    | Property Name | Property Type | Description |
    | --- | --- | --- |
    | Id | int | id của form |
    | FullName | string, nullable | Họ và tên (fullName) |
    | Alias | string, nullable | Bí danh (alias) |
    | DateOfBirth | DateTime, nullable | Ngày tháng năm sinh (dateOfBirth) |
    | IsMale | bool, nullable | Giới tính |
    | BirthPlace | string, nullable | Nơi sinh |
    | NativeLand | string, nullable | Nguyên quán |
    | Ethnic | string, nullable | Dân tộc |
    | Nation | string, nullable | Quốc tịch |
    | Job | string, nullable | Nghề nghiệp |
    | Workplace | string, nullable | Nơi làm việc |
    | Resident | [ResidentBriefInfo](#residentbriefinfo) | CMND/CCCD, số giấy khai sinh |
    | AcademicLevel | string, nullable | Trình độ học vấn |
    | CriminalRecord | string, nullable | Tiền án |
    | Reason | string | Lý do thay đổi |
    | CreatedTime | DateTime | ngày tạo |
    | IsAccepted | bool | Đã duyệt chưa |
    | NotAcceptedReason | string | lý do thay đổi |
    | Account | string | Username tài khoản hộ dân gửi |


    - ℹ️ **Lưu ý:** Form **CHƯA** được kiểm tra khi `notAcceptedReason = null` và `isAccepted = false`. Form **ĐÃ** được duyệt khi `notAcceptedReason = null` và `isAccepted = true`. Form **BỊ TỪ CHỐI** khi `notAcceptedReason != null`.

    Ex:

    ```json
    {
        "id": 1,
        "fullName": "John Doe",
        "alias": "John",
        "dateOfBirth": "2000-01-01",
        "isMale": false,
        "birthPlace": "New York",
        "nativeLand": "USA",
        "ethnic": "White",
        "nation": "American",
        "job": "Engineer",
        "workplace": "Google",
        "resident": {
            "identityCode": "000001",
            "fullName": "Nguyễn Văn Quảng",
            "dateOfBirth": "1970-10-01T00:00:00",
            "isMale": true,
            "householdId": "001",
            "relationShip": "Chủ hộ",
            "scope": 1
        },
        "academicLevel": "Bachelor's Degree",
        "criminalRecord": "",
        "reason": "Personal reason",
        "createdTime": "2022-01-01T00:00:00",
        "isAccepted": true,
        "notAcceptedReason": null,
        "account": "johndoe123"
    }

    ```
    

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xem form thuộc phạm vi quản lý của tổ khác*

### Gửi form xin thay đổi thông tin nhân khẩu
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/ChangingResidentInfo```

*Gửi form xin thay đổi thông tin nhân khẩu.*


- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (form-data)**

    | Property Name | Property Type | Description |
    | --- | --- | --- |
    | FullName | string | *[tuỳ chọn]* Họ và tên (fullName) |
    | Alias | string | *[tuỳ chọn]* Bí danh (alias) |
    | DateOfBirth | DateTime | *[tuỳ chọn]* Ngày tháng năm sinh (dateOfBirth) |
    | IsMale | bool | *[tuỳ chọn]* Giới tính |
    | BirthPlace | string | *[tuỳ chọn]* Nơi sinh |
    | NativeLand | string | *[tuỳ chọn]* Nguyên quán |
    | Ethnic | string | *[tuỳ chọn]* Dân tộc |
    | Nation | string | *[tuỳ chọn]* Quốc tịch |
    | Job | string | *[tuỳ chọn]* Nghề nghiệp |
    | Workplace | string | *[tuỳ chọn]* Nơi làm việc |
    | ResidentIdCode | string | CMND/CCCD, số giấy khai sinh |
    | AcademicLevel | string | *[tuỳ chọn]* Trình độ học vấn |
    | CriminalRecord | string | *[tuỳ chọn]* Tiền án |
    | Reason | string | Lý do thay đổi |



- **Response Body khi thành công (Json)**

    [FormBriefInfo](#formbriefinfo) của form mới gửi lên, có chứa Id của cái form đó
    
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Xảy ra khi quá trình thêm Đợt thưởng vào CSDL bị lỗi (cách khắc phục đó là request lại lần nữa)*

    - [400 BadRequest] ResidentNotFound

        *Nhân khẩu không tồn tại trong CSDL.*

### Duyệt form xin thay đổi thông tin nhân khẩu
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/ChangingResidentInfo/accept/{id}```

*Phê duyệt hoặc từ chối form xin thay đổi thông tin nhân khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Duyệt được form minh chứng của toàn bộ phường
2. Tổ trưởng: Chỉ duyệt được form minh chứng của chỉ tổ phụ trách

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form xin thay đổi thông tin nhân khẩu|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (Json)**
    | Property Name | Type | Description |
    | --- | --- | --- |
    | Accept | bool | Có chấp nhận không hay là từ chối |
    | NotAcceptReason | string | *[Tuỳ chọn]* Lý do từ chối, **bắt buộc phải có nếu như từ chối** |

    Ex:

    ```json
    //Nếu chấp nhận
    {
        "accept": true,
        "notAcceptReason": null
    }
    ```
    ```json
    //Nếu TỪ CHỐI
    {
        "accept": false,
        "notAcceptReason": "Minh chứng này đã được dùng từ năm ngoái rồi nhé :)"
    }
    ```
- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xét duyệt form thuộc phạm vi quản lý của tổ khác*

    - [400 BadRequest] CheckedForm

        *Form đã được kiểm tra (phê duyệt hoặc bị từ chối) nên không thể kiểm tra lại nữa.*

### Rút lại form xin thay đổi thông tin nhân khẩu
<span style="color:#ea4335; width: 50px; display: inline-block">**DELETE**</span> ```https://localhost:7265/api/forms/ChangingResidentInfo/{id}```

*Rút lại form xin thay đổi thông tin nhân khẩu (có thể do thấy sai hay gì đó). Hành động này chỉ thực hiện được khi form chưa được duyệt.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form xin thay đổi thông tin nhân khẩu|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    
    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Đợt thưởng không tồn tại trong CSDL để xoá*

    - [400 BadRequest] CheckedForm

        *Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại.*

## Form xin thay đổi thông tin hộ khẩu
### Lấy ra danh sách form xin thay đổi thông tin hộ khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/forms/ChangingHouseholdInfo[?isChecked={boolean}]```

*Lấy ra danh sách form xin thay đổi thông tin hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |isChecked|*[tuỳ chọn]* Đừng ghi vào nếu muốn lấy ra toàn bộ form.<br/> Để `true` nếu muốn lấy ra chỉ những form ĐÃ ĐƯỢC DUYỆT hoặc BỊ TỪ CHỐI (những form đã được các cán bộ kiểm tra qua). Để `false` nếu muốn lấy ra chỉ những form chưa được kiểm tra.|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    
    Trả về một danh sách các [FormBriefInfo](#formbriefinfo) (click vào để xem giải thích)

    Ex:
    ```json
    [
        {
            "id": 1,
            "formType": "ChangingHouseholdInfo",
            "title": "Form title",
            "createdTime": "2022-01-01T00:00:00",
            "isAccepted": true,
            "notAcceptedReason": "Reason for not accepting",
            "account": "user123"
        },
        ...
    ]
    ```
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*


### Lấy thông tin chi tiết của form xin thay đổi thông tin hộ khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span>
```https://localhost:7265/api/forms/ChangingHouseholdInfo/{id}```

*Lấy ra thông tin chi tiết của form xin thay đổi thông tin hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form xin thay đổi thông tin hộ khẩu|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    | Property name | Type | Description |
    | --- | --- | --- |
    | id | int | Id |
    | householdId | string | Số hộ khẩu |
    | address | string, nullable | Địa chỉ Thường trú mới |
    | owner | [ResidentBriefInfo](#formbriefinfo), nullable | Chủ hộ mới |
    | scope | int, nullable | Tổ Phụ Trách mới |
    | reason | string | Lý do thay đổi |
    | createdTime | DateTime | Created time |
    | isAccepted | bool | Đã duyệt chưa |
    | notAcceptedReason | string | Lý do không duyệt |
    | account | string | Tài khoản hộ dân gửi |


    - ℹ️ **Lưu ý:** Form **CHƯA** được kiểm tra khi `notAcceptedReason = null` và `isAccepted = false`. Form **ĐÃ** được duyệt khi `notAcceptedReason = null` và `isAccepted = true`. Form **BỊ TỪ CHỐI** khi `notAcceptedReason != null`.

    Ex:

    ```json
    {
        "id": 1,
        "householdId": "123456789",
        "address": "1234 Main St.",
        "owner": {
            "identityCode": "000001",
            "fullName": "Nguyễn Văn Quảng",
            "dateOfBirth": "1970-10-01T00:00:00",
            "isMale": true,
            "householdId": "001",
            "relationShip": "Chủ hộ",
            "scope": 1
        },
        "scope": 1,
        "reason": "Moving to a new address",
        "createdTime": "2022-01-01T00:00:00",
        "isAccepted": true,
        "notAcceptedReason": null,
        "account": "household123"
    }

    ```
    

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xem form thuộc phạm vi quản lý của tổ khác*

### Gửi form xin thay đổi thông tin hộ khẩu
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/ChangingHouseholdInfo```

*Gửi form xin thay đổi thông tin hộ khẩu.*


- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (form-data)**

    | Property         | Type | Description | Example |
    |------------------|-----------|-------------|-----|
    | HouseholdId | string | Số hộ khẩu | 002452315 |
    | Address | string | *[tuỳ chọn]* Địa chỉ Thường trú mới | xóm 4, xã XX, huyện YY, tỉnh ZZ |
    | Owner | string | *[tuỳ chọn]* số CMND, CCCD của Chủ hộ mới | 414561546515 |
    | Scope | int | *[tuỳ chọn]* Tổ Phụ Trách mới | 3 |
    | Reason | string | Lý do thay đổi |


- **Response Body khi thành công (Json)**

    [FormBriefInfo](#formbriefinfo) của form mới gửi lên, có chứa Id của cái form đó
    
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Xảy ra khi quá trình thêm Đợt thưởng vào CSDL bị lỗi (cách khắc phục đó là request lại lần nữa)*

    - [400 BadRequest] HouseholdNotFound

        *Hộ khẩu không tồn tại trong CSDL.*

    - [400 BadRequest] OwnerNotFound

        *Chủ hộ không tồn tại trong CSDL.*

    - [400 BadRequest] InvalidOwner

        *Chủ hộ không nằm trong sổ hộ khẩu.*

### Duyệt form xin thay đổi thông tin hộ khẩu
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/ChangingHouseholdInfo/accept/{id}```

*Phê duyệt hoặc từ chối form xin thay đổi thông tin hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Duyệt được form minh chứng của toàn bộ phường
2. Tổ trưởng: Chỉ duyệt được form minh chứng của chỉ tổ phụ trách

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form xin thay đổi thông tin hộ khẩu|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (Json)**
    | Property Name | Type | Description |
    | --- | --- | --- |
    | Accept | bool | Có chấp nhận không hay là từ chối |
    | NotAcceptReason | string | *[Tuỳ chọn]* Lý do từ chối, **bắt buộc phải có nếu như từ chối** |

    Ex:

    ```json
    //Nếu chấp nhận
    {
        "accept": true,
        "notAcceptReason": null
    }
    ```
    ```json
    //Nếu TỪ CHỐI
    {
        "accept": false,
        "notAcceptReason": "Minh chứng này đã được dùng từ năm ngoái rồi nhé :)"
    }
    ```
- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xét duyệt form thuộc phạm vi quản lý của tổ khác*

    - [400 BadRequest] CheckedForm

        *Form đã được kiểm tra (phê duyệt hoặc bị từ chối) nên không thể kiểm tra lại nữa.*

### Rút lại form xin thay đổi thông tin hộ khẩu
<span style="color:#ea4335; width: 50px; display: inline-block">**DELETE**</span> ```https://localhost:7265/api/forms/ChangingHouseholdInfo/{id}```

*Rút lại form xin thay đổi thông tin hộ khẩu (có thể do thấy sai hay gì đó). Hành động này chỉ thực hiện được khi form chưa được duyệt.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form xin thay đổi thông tin hộ khẩu|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    
    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Đợt thưởng không tồn tại trong CSDL để xoá*

    - [400 BadRequest] CheckedForm

        *Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại.*

## Form xin chuyển hộ khẩu
### Lấy ra danh sách form xin chuyển hộ khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/forms/ChangingHousehold[?isChecked={boolean}]```

*Lấy ra danh sách form xin chuyển hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |isChecked|*[tuỳ chọn]* Đừng ghi vào nếu muốn lấy ra toàn bộ form.<br/> Để `true` nếu muốn lấy ra chỉ những form ĐÃ ĐƯỢC DUYỆT hoặc BỊ TỪ CHỐI (những form đã được các cán bộ kiểm tra qua). Để `false` nếu muốn lấy ra chỉ những form chưa được kiểm tra.|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    
    Trả về một danh sách các [FormBriefInfo](#formbriefinfo) (click vào để xem giải thích)

    Ex:
    ```json
    [
        {
            "id": 1,
            "formType": "ChangingHousehold",
            "title": "Form title",
            "createdTime": "2022-01-01T00:00:00",
            "isAccepted": true,
            "notAcceptedReason": "Reason for not accepting",
            "account": "user123"
        },
        ...
    ]
    ```
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*


### Lấy thông tin chi tiết của form xin chuyển hộ khẩu
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span>
```https://localhost:7265/api/forms/ChangingHousehold/{id}```

*Lấy ra thông tin chi tiết của form xin chuyển hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form xin chuyển hộ khẩu|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**

    | Property name | Data type | Description |
    |--------------|-----------|-------------|
    | id           | int       | id          |
    | resident     | [ResidentBriefInfo](#formbriefinfo) | CMND/CCCD, số giấy khai sinh |
    | newHousehold | Tương tự các phần tử trong [danh sách hộ khẩu](#lấy-danh-sách-hộ-khẩu) | Thông tin hộ khẩu mới |
    | createdTime  | DateTime  | Thời gian tạo |
    | isAccepted   | bool      | Đã duyệt chưa |
    | notAcceptedReason | string | Lý do từ chối |
    | account      | string    | Tài khoản hộ dân gửi |

    - ℹ️ **Lưu ý:** Form **CHƯA** được kiểm tra khi `notAcceptedReason = null` và `isAccepted = false`. Form **ĐÃ** được duyệt khi `notAcceptedReason = null` và `isAccepted = true`. Form **BỊ TỪ CHỐI** khi `notAcceptedReason != null`.

    Ex:

    ```json
    {
        "id": 1,
        "resident": {
            "identityCode": "000001",
            "fullName": "Nguyễn Văn Quảng",
            "dateOfBirth": "1970-10-01T00:00:00",
            "isMale": true,
            "householdId": "001",
            "relationShip": "Chủ hộ",
            "scope": 1
        },
        "newHousehold": {
            "householdId": "541654164",
            "scope": 3,
            "ownerFullName": "Nguyễn Văn Củ",
            "ownerIDCode": "000003",
            "createdTime": "2020-05-01T00:00:00"
        },
        "createdTime": "2022-05-01T00:00:00",
        "isAccepted": false,
        "notAcceptedReason": null,
        "account": "nguyenvana"
    }
    ```
    

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xem form thuộc phạm vi quản lý của tổ khác*

### Gửi form xin chuyển hộ khẩu
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/ChangingHousehold```

*Gửi form xin chuyển hộ khẩu.*


- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (form-data)**

    | Property         | Type | Description | Example |
    |------------------|-----------|-------------|-----|
    | NewHouseholdId | string | Số hộ khẩu mới | 545655412 |
    | ResidentIdCode | string | Số CMND/CCCD của Người chuyển đi | 02134698722 |


- **Response Body khi thành công (Json)**

    [FormBriefInfo](#formbriefinfo) của form mới gửi lên, có chứa Id của cái form đó
    
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Xảy ra khi quá trình thêm Đợt thưởng vào CSDL bị lỗi (cách khắc phục đó là request lại lần nữa)*

    - [400 BadRequest] ResidentNotFound

        *Nhân khẩu không tồn tại trong CSDL.*

    - [400 BadRequest] HouseholdNotFound

        *Hộ khẩu không tồn tại trong CSDL.*

    - [400 BadRequest] InvalidHouseholdId

        *Hộ khẩu mới phải khác hộ khẩu cũ.*

    - [400 BadRequest] InvalidResident

        *Nhân khẩu không được phép là chủ hộ cũ.*

### Duyệt form xin chuyển hộ khẩu
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/ChangingHousehold/accept/{id}```

*Phê duyệt hoặc từ chối form xin chuyển hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Duyệt được form minh chứng của toàn bộ phường
2. Tổ trưởng: Chỉ duyệt được form minh chứng của chỉ tổ phụ trách

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form xin chuyển hộ khẩu|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (Json)**
    | Property Name | Type | Description |
    | --- | --- | --- |
    | Accept | bool | Có chấp nhận không hay là từ chối |
    | NotAcceptReason | string | *[Tuỳ chọn]* Lý do từ chối, **bắt buộc phải có nếu như từ chối** |

    Ex:

    ```json
    //Nếu chấp nhận
    {
        "accept": true,
        "notAcceptReason": null
    }
    ```
    ```json
    //Nếu TỪ CHỐI
    {
        "accept": false,
        "notAcceptReason": "Minh chứng này đã được dùng từ năm ngoái rồi nhé :)"
    }
    ```
- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xét duyệt form thuộc phạm vi quản lý của tổ khác*

    - [400 BadRequest] CheckedForm

        *Form đã được kiểm tra (phê duyệt hoặc bị từ chối) nên không thể kiểm tra lại nữa.*

### Rút lại form xin chuyển hộ khẩu
<span style="color:#ea4335; width: 50px; display: inline-block">**DELETE**</span> ```https://localhost:7265/api/forms/ChangingHousehold/{id}```

*Rút lại form xin chuyển hộ khẩu (có thể do thấy sai hay gì đó). Hành động này chỉ thực hiện được khi form chưa được duyệt.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form xin chuyển hộ khẩu|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    
    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Đợt thưởng không tồn tại trong CSDL để xoá*

    - [400 BadRequest] CheckedForm

        *Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại.*



# Module Phát thưởng
## Quản lý đợt trao thưởng
### Lấy ra danh sách các đợt trao thưởng
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/RewardCeremonies[?allowPostingForm={boolean}&type={string}]```

*Lấy ra danh sách dịp trao thưởng (thông tin khá sơ lược), chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |allowPostingForm|*[tuỳ chọn]* `true` để lấy danh sách dịp trao thưởng còn cho phép gửi form, `false` để lấy danh sách dịp trao thưởng KHÔNG cho phép gửi form, `null` hoặc bỏ qua để lấy toàn bộ danh sách đợt trao thưởng.<br/>Mặc định là `null`.|
    |type|*[tuỳ chọn]* Loại form (TTHT – phát thưởng cho thành tích học tập, TT – phát thưởng trung thu) muốn lấy danh sách.<br/>Đừng ghi vào nếu muốn lấy ra toàn bộ form.|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**

    Trả về danh sách các [RewardCeremonyBriefInfo](#rewardceremonybriefinfo)

    Ex:

    ```json
    [
        {
            "id": 1,
            "title": "First Reward Ceremony",
            "time": "2022-12-25T12:00:00Z",
            "type": "TTHT",
            "totalValue": 10000,
            "isAccepted": true,
            "isDone": true,
            "closingFormDate": "2022-12-30T12:00:00Z",
            "rewardDate": "2022-12-31T12:00:00Z"
        },
        ...
    ]
    ```
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

### Lấy thông tin chi tiết của đợt thưởng
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span>
```https://localhost:7265/api/RewardCeremonies/{id}```

*Lấy ra thông tin chi tiết của đợt thưởng, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh đợt thưởng|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    ```json
    [
        {
            "id": number,
            "title": "string",
            "description": "string",
            "time": "DateTime",
            "type": "string",
            "totalValue": number,
            "isAccepted": boolean,
            "isDone": boolean,
            "closingFormDate": "DateTime",
            "rewardDate": "DateTime",
            "achievementRewardPairs":[
                {
                    "achievementType": number,
                    "achievementName": "string",
                    "rewardName": "string",
                    "rewardValue": number
                },
                ...
            ]
        },
        ...
    ]
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |id|mã định danh đợt thưởng|
    |title|Tên đợt thưởng|
    |description|Miêu tả đợt thưởng|
    |time|Ngày giờ phút giây chủ tịch đề xuất kế hoạch phát thưởng|
    |type|TTHT – phát thưởng cho thành tích học tập, TT – phát thưởng trung thu|
    |totalValue|Tổng tiền cho việc phát thưởng|
    |isAccepted|Chủ tịch phường đã duyệt danh sách phát thưởng chưa|
    |isDone|Đã phát thưởng chưa|
    |closingFormDate|Ngày đóng nhận form minh chứng|
    |rewardDate|Thời gian nhận thưởng|   
    |achievementRewardPairs|Bảng chuyển đổi loại thành tích thành giá trị phần thưởng, miêu tả kĩ hơn tại [đây](#thiết-lập-bảng-chuyển-đổi-loại-thành-tích-thành-giá-trị-phần-thưởng-cho-đợt-thưởng)|

    Ex:

    ```json
    //Ví dụ cho đợt thưởng thành tích
    [
        {
            "id": 1,
            "title": "First Reward Ceremony",
            "time": "2022-12-25T12:00:00Z",
            "type": "TTHT",
            "totalValue": 10000,
            "isAccepted": true,
            "isDone": true,
            "closingFormDate": "2022-12-30T12:00:00Z",
            "rewardDate": "2022-12-31T12:00:00Z",
            "achievementRewardPairs":[
                {
                    "achievementType": 1,
                    "achievementName": "Học sinh khá trường",
                    "rewardName": "Bút bi",
                    "rewardValue": 5000
                },
                {
                    "achievementType": 2,
                    "achievementName": "Học sinh giỏi trường",
                    "rewardName": "Bút máy",
                    "rewardValue": 10000
                },
                {
                    "achievementType": 3,
                    "achievementName": "Học sinh giỏi huyện",
                    "rewardName": "Bút máy pro max",
                    "rewardValue": 20000
                }
            ]
        },
        ...
    ]
    ```
    ```json
    //Ví dụ cho đợt thưởng trung thu
    //Đợt thưởng trung thu không cần quan tâm đến achievementName vì chả có thành tích gì ở đây cả, còn achievementType không phải là phân thứ hạng mà phân biệt các phần quà khác nhau tuỳ theo sở thích mỗi cháu
    [
        {
            "id": 1,
            "title": "First Reward Ceremony",
            "time": "2022-12-25T12:00:00Z",
            "type": "TT",
            "totalValue": 10000,
            "isAccepted": true,
            "isDone": true,
            "closingFormDate": "2022-12-30T12:00:00Z",
            "rewardDate": "2022-12-31T12:00:00Z",
            "achievementRewardPairs":[
                {
                    "achievementType": 1,
                    "achievementName": "",
                    "rewardName": "3 cái kẹo mút chúp ba chúp",
                    "rewardValue": 3000
                },
                {
                    "achievementType": 2,
                    "achievementName": "",
                    "rewardName": "1 bánh chocopie",
                    "rewardValue": 3000
                }
            ]
        },
        ...
    ]
    ```

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Không tìm thấy đợt thưởng có id như đầu vào*

### Thêm đợt thưởng mới
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/RewardCeremonies```

*Thêm đợt thưởng mới, chỉ chủ tịch phường mới dùng được.*

*Sau khi thêm đợt thưởng mới, có thể gửi tin nhắn (nếu điền) đến tất cả tài khoản đặc biệt trừ bản thân.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (Json)**
    | Property | Type | Description |
    | -------- | ---- | ----------- |
    | `title` | string | Tên đợt thưởng |
    | `description` | string | Miêu tả đợt thưởng |
    | `type` | string | Loại phát thưởng (TTHT – phát thưởng cho thành tích học tập, TT – phát thưởng trung thu) |
    | `closingFormDate` | string (date-time format) | Ngày đóng nhận form minh chứng |
    | `rewardDate` | string (date-time format) | Thời gian nhận thưởng |
    | `messageToSpecialAccount` | string | *[Tuỳ chọn]* Tin nhắn gửi đến các tài khoản đặc biệt, gửi ngay tại thời điểm request |

    Ex:
    ```json
    {
        "title": "Academic Achievement Award",
        "description": "Academic Achievement Award is an event which celebrate by committee to give good student some presents.",
        "type": "TTHT",
        "closingFormDate": "2022-12-31T23:59:59",
        "rewardDate": "2023-01-15T10:00:00",
        "messageToSpecialAccount": "Congratulations on your academic success!"
    }

    ```

- **Response Body khi thành công (Json)**
    
    Nội dung trả về tương tự như 1 phần tử trong danh sách trả về của [API Lấy ra danh sách các đợt trao thưởng](#lấy-ra-danh-sách-các-đợt-trao-thưởng)

    | Property | Type | Description |
    | -------- | ---- | ----------- |
    |id|number|mã định danh đợt thưởng|
    |title|string|Tên đợt thưởng|
    |time|string (date-time format)|Ngày giờ phút giây chủ tịch đề xuất kế hoạch phát thưởng|
    |type|string|TTHT – phát thưởng cho thành tích học tập, TT – phát thưởng trung thu|
    |totalValue|number|Tổng tiền cho việc phát thưởng|
    |isAccepted|boolean|Chủ tịch phường đã duyệt danh sách phát thưởng chưa|
    |isDone|boolean|Đã phát thưởng chưa|
    |closingFormDate|string (date-time format)|Ngày đóng nhận form minh chứng|
    |rewardDate|string (date-time format)|Thời gian nhận thưởng|

    Ex:

    ```json
    [
        {
            "id": 1,
            "title": "First Reward Ceremony",
            "time": "2022-12-25T12:00:00Z",
            "type": "TTHT",
            "totalValue": 10000,
            "isAccepted": true,
            "isDone": true,
            "closingFormDate": "2022-12-30T12:00:00Z",
            "rewardDate": "2022-12-31T12:00:00Z"
        },
        ...
    ]
    ```

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải chủ tịch phường*

    - [404 NotFound]

        *Xảy ra khi quá trình thêm Đợt thưởng vào CSDL bị lỗi (cách khắc phục đó là request lại lần nữa)*

    - [409 Conflict]

        *Tên đợt thưởng đã tồn tại trong CSDL*

    - [400 BadRequest] InvalidClosingFormDate

        *`ClosingFormDate` không được phép lớn hơn `RewardDate`.*

### Cập nhật đợt thưởng
<span style="color:#4285f4; width: 50px; display: inline-block">**PUT**</span>```https://localhost:7265/api/RewardCeremonies```

*Cập nhật thông tin đợt thưởng, chỉ thư kí, chủ tịch phường mới dùng được.*

*Sau khi cập nhật thông tin đợt thưởng, có thể gửi tin nhắn (nếu điền) đến tất cả tài khoản đặc biệt trừ bản thân.*

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (Json)**
    | Property | Type | Description |
    | -------- | ---- | ----------- |
    | `id` | int | Mã đợt thưởng |
    | `title` | string | *[Tuỳ chọn]* Tên đợt thưởng |
    | `description` | string | *[Tuỳ chọn]* Miêu tả đợt thưởng |
    | `type` | string | *[Tuỳ chọn]* Loại phát thưởng (TTHT – phát thưởng cho thành tích học tập, TT – phát thưởng trung thu) |
    | `closingFormDate` | string (date-time format) | *[Tuỳ chọn]* Ngày đóng nhận form minh chứng |
    | `rewardDate` | string (date-time format) | *[Tuỳ chọn]* Thời gian nhận thưởng |
    | `messageToSpecialAccount` | string | *[Tuỳ chọn]* Tin nhắn gửi đến các tài khoản đặc biệt, gửi ngay tại thời điểm request |

    Ex:
    ```json
    {
        "id": 6,
        "title": "Academic Achievement Award",
        "description": "Academic Achievement Award is an event which celebrate by committee to give good student some presents.",
        "type": "TTHT",
        "closingFormDate": "2022-12-31T23:59:59",
        "rewardDate": "2023-01-15T10:00:00",
        "messageToSpecialAccount": "Congratulations on your academic success!"
    }

    ```

- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Đợt thưởng không tồn tại trong CSDL để cập nhật*

    - [400 BadRequest] InvalidClosingFormDate

        *`ClosingFormDate` không được phép lớn hơn `RewardDate`.*

### Thiết lập Bảng chuyển đổi loại thành tích thành giá trị phần thưởng cho đợt thưởng
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/RewardCeremonies/setARPairs/{id}```

*Thiết lập Bảng chuyển đổi loại thành tích thành giá trị phần thưởng cho đợt thưởng, tạo mới nếu không có, ghi đè bảng cũ nếu có.* 

*Chỉ thư kí, chủ tịch phường mới dùng được.*

✅ *Phải sắp xếp sẵn danh sách trước. (Sắp xếp theo thứ tự tăng dần của `achievementType`)*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh đợt thưởng|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (Json)**

    Một danh sách các `AchievementRewardPair` được miêu tả như bên dưới:

    | Property | Type | Description |
    | -------- | ---- | ----------- |
    | `achievementType` | number | Loại thành tích |
    | `achievementName` | string | Miêu tả loại thành tích |
    | `rewardName` | string |  Miêu tả Phần thưởng (dạng text) |
    | `rewardValue` | number | Giá trị phần thưởng (số tiền) |

    ✅ *Phải sắp xếp sẵn danh sách trước. (Sắp xếp theo thứ tự tăng dần của `achievementType`)*

    Ex:
    ```json
    //Ví dụ cho đợt thưởng thành tích học tập
    [
        {
            "achievementType": 1,
            "achievementName": "Hsg trường",
            "rewardName": "3 cái kẹo mút chúp ba chúp",
            "rewardValue": 3000
        },
        {
            "achievementType": 2,
            "achievementName": "Hsg huyện",
            "rewardName": "5 cái kẹo mút chúp ba chúp",
            "rewardValue": 5000
        },
        ...
    ]
    ```

- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Đợt thưởng không tồn tại trong CSDL để cập nhật*

    - [400 BadRequest] ZeroList

        *Danh sách không chứa phần tử nào*

    - [400 BadRequest] InvalidAchievementRewardList

        *Danh sách chưa được sắp xếp trước theo AchievementType tăng dần*

        *Danh sách không bắt đầu với AchievementType đầu tiên bằng 1*

        *AchievementType của các phần tử trong Danh sách không liên tục (1,2,4 nhưng thiếu 3 chẳng hạn)*

### Phê duyệt đợt thưởng
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/RewardCeremonies/accept/{id}```

*Phê duyệt đợt thưởng, gửi thông báo mở đợt thưởng với toàn bộ người dân (nếu điền), và tài khoản đặc biệt (nếu điền).* 

*Chỉ chủ tịch phường mới dùng được.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh đợt thưởng|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (Json)**

    | Property | Type | Description |
    | --- | --- | --- |
    | MessageToSpecialAccount | string | Tin nhắn gửi đến các tài khoản đặc biệt |
    | MessageToHousehold | string | Tin nhắn gửi đến các tài khoản hộ dân |

    Ex:
    ```json
    {
        "MessageToSpecialAccount": "Chuẩn bị xét duyệt minh chứng nhé các đồng chí.",
        "MessageToHousehold": "Mọi người chuẩn bị gửi minh chứng thành tích học tập của con em để con em có thể nhận quà nhé."
    }
    ```

- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Đợt thưởng không tồn tại trong CSDL để cập nhật*
### Đánh dấu đợt thưởng đã xong
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/RewardCeremonies/done/{id}```

*Đánh dấu đợt thưởng đã được thực hiện xong.* 

*Chỉ chủ tịch phường mới dùng được.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh đợt thưởng|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Đợt thưởng không tồn tại trong CSDL để cập nhật*

    - [400 BadRequest] RewardCeremonyNotAccept

        *Đợt thưởng chưa được phê duyệt, vậy nên nó chưa thể được hoàn thành*

### Xoá đợt thưởng
<span style="color:#ea4335; width: 50px; display: inline-block">**DELETE**</span> ```https://localhost:7265/api/RewardCeremonies/{id}```

*Xoá đợt thưởng, chỉ chủ tịch phường mới dùng được.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|Mã đợt thưởng mà muốn xoá|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    
    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Đợt thưởng không tồn tại trong CSDL để xoá*

    - [400 NotFound] CannotDeleteAcceptedRewardCeremony

        *Đợt thưởng đã được phê duyệt và thông báo đến toàn thể người dân nên không thể rút lại.*

    - [400 BadRequest] ForeignKeyConstraintFailed

        *Xảy ra khi xoá một phần tử mà một số hàng trong các bảng khác có khoá ngoài trỏ đến phần tử này.*

        *Phần tử này hiện tại không thể bị xoá. Thay vào đó hãy cảnh báo người dùng rằng đợt thưởng này không thể xoá (Nó đã được các dữ liệu khác đề cập đến, cũng như điều này đảm bảo thông tin của đợt thưởng này là một thông tin hợp lệ với thực tiễn, không phải một mẫu thử nghiệm.)*

## Form minh chứng thành tích
### Lấy ra danh sách form minh chứng thành tích
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/forms/AchievementEvidence[?rewardCeremonyId={int}&isChecked={boolean}]```

*Lấy ra danh sách form minh chứng thành tích. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |rewardCeremonyId|*[tuỳ chọn]* Để lấy danh sách form minh chứng thành tích của đợt thưởng có Id bằng `rewardCeremonyId`.<br/> Đừng ghi vào nếu muốn lấy ra toàn bộ đợt thưởng|
    |isChecked|*[tuỳ chọn]* Đừng ghi vào nếu muốn lấy ra toàn bộ form.<br/> Để `true` nếu muốn lấy ra chỉ những form ĐÃ ĐƯỢC DUYỆT hoặc BỊ TỪ CHỐI (những form đã được các cán bộ kiểm tra qua). Để `false` nếu muốn lấy ra chỉ những form chưa được kiểm tra.|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    
    Trả về một danh sách các [FormBriefInfo](#formbriefinfo) (click vào để xem giải thích)

    Ex:
    ```json
    [
        {
            "id": 1,
            "formType": "AchievementEvidence",
            "title": "Form title",
            "createdTime": "2022-01-01T00:00:00",
            "isAccepted": true,
            "notAcceptedReason": "Reason for not accepting",
            "account": "user123"
        },
        ...
    ]
    ```
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*


### Lấy thông tin chi tiết của form minh chứng thành tích
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span>
```https://localhost:7265/api/forms/AchievementEvidence/{id}```

*Lấy ra thông tin chi tiết của form minh chứng thành tích. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form minh chứng thành tích|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
    | Property Name | Data Type | Description |
    | --- | --- | --- |
    | id | number | ID của form |
    | resident | [ResidentBriefInfo](#residentbriefinfo) | Thông tin tóm tắt của các cháu (có bao gồm Id, ngày sinh, họ và tên) |
    | rewardCeremony | [RewardCeremonyBriefInfo](#rewardceremonybriefinfo) | Dịp thưởng muốn nộp minh chứng đến |
    | achievementName | string | Tiêu đề thành tích |
    | achievementType | number, nullable | Phân loại thành tích (dạng số nguyên dương) |
    | imageLinks | string[] | Danh sách các đường dẫn đến ảnh minh chứng |
    | createdTime | string (date-time format) | Giờ phút ngày tháng năm form được gửi lên |
    | isAccepted | boolean | Trạng thái đã duyệt hay chưa |
    | notAcceptedReason | string, nullable | Lý do không duyệt |
    | account | string | Tài khoản người gửi form |

    - ℹ️ **Lưu ý:** Form **CHƯA** được kiểm tra khi `notAcceptedReason = null` và `isAccepted = false`. Form **ĐÃ** được duyệt khi `notAcceptedReason = null` và `isAccepted = true`. Form **BỊ TỪ CHỐI** khi `notAcceptedReason != null`.

    Ex:

    ```json
    //Ví dụ cho đợt thưởng thành tích
    {
        "id": 0,
        "resident": {
            "identityCode": "000001",
            "fullName": "Nguyễn Văn Quảng",
            "dateOfBirth": "1970-10-01T00:00:00",
            "isMale": true,
            "householdId": "001",
            "relationShip": "Chủ hộ",
            "scope": 1
        },
        "rewardCeremony": {
            "id": 1,
            "title": "First Reward Ceremony",
            "time": "2022-12-25T12:00:00Z",
            "type": "TTHT",
            "totalValue": 10000,
            "isAccepted": true,
            "isDone": true,
            "closingFormDate": "2022-12-30T12:00:00Z",
            "rewardDate": "2022-12-31T12:00:00Z"
        },
        "achievementName": "Hsg quốc gia hoá",
        "achievementType": null,
        "imageLinks": [
            "hdbhsgb.png"
        ],
        "createdTime": "2022-06-07T19:06:58.209Z",
        "isAccepted": false,
        "notAcceptedReason": null,
        "account": "acc2"
    }
    ```
    

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xem form thuộc phạm vi quản lý của tổ khác*

### Gửi form minh chứng thành tích
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/AchievementEvidence```

*Gửi form minh chứng thành tích.*


- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (form-data)**

    | Property         | Type | Description | Example |
    |------------------|-----------|-------------|-----|
    | `ResidentIdCode`   | string    | ID của các cháu (vì các cháu chưa có CMND) | 123456789123 |
    | `RewardCeremonyId` | number    | ID của dịp thưởng muốn nộp minh chứng đến | 2 |
    | `AchievementName`  | string    | Tiêu đề thành tích | Học sinh giỏi huyện |
    | `Images`       | IFormFileCollection | danh sách Ảnh minh chứng | (binary) |


- **Response Body khi thành công (Json)**

    [FormBriefInfo](#formbriefinfo) của form mới gửi lên, có chứa Id của cái form đó
    
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Xảy ra khi quá trình thêm Đợt thưởng vào CSDL bị lỗi (cách khắc phục đó là request lại lần nữa)*

    - [400 BadRequest] ResidentNotFound

        *Nhân khẩu không tồn tại trong CSDL.*

    - [400 BadRequest] RewardCeremonyNotFound

        *Đợt thưởng không tồn tại trong CSDL.*

    - [400 BadRequest] RewardCeremonyNotBeAccepted

        *Đợt thưởng chưa được duyệt nên không nhận form.*

    - [400 BadRequest] OverDue

        *Thời gian nhận form của đợt thưởng đã hết.*

    - [400 BadRequest] InvalidRewardCeremony

        *Đợt thưởng dịp đặc biệt không nhận form học tập.*

### Duyệt form minh chứng thành tích
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/AchievementEvidence/accept/{id}```

*Phê duyệt hoặc từ chối form minh chứng thành tích. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Duyệt được form minh chứng của toàn bộ phường
2. Tổ trưởng: Chỉ duyệt được form minh chứng của chỉ tổ phụ trách

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form minh chứng thành tích|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (Json)**
    | Property Name | Type | Description |
    | --- | --- | --- |
    | Accept | bool | Có chấp nhận không hay là từ chối |
    | NotAcceptReason | string | *[Tuỳ chọn]* Lý do từ chối, **bắt buộc phải có nếu như từ chối** |
    | AchievementType | number | *[Tuỳ chọn]* (Dạng số nguyên dương) Phân loại thành tích, **bắt buộc phải có nếu như chấp nhận** |

    Ex:

    ```json
    //Nếu chấp nhận
    {
        "accept": true,
        "notAcceptReason": null,
        "achievementType": 1
    }
    ```
    ```json
    //Nếu TỪ CHỐI
    {
        "accept": false,
        "notAcceptReason": "Minh chứng này đã được dùng từ năm ngoái rồi nhé :)",
        "achievementType": null
    }
    ```
- **Response Body khi thành công**
    
    Không có gì

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường)*

    - [404 NotFound]

        *Không tìm thấy form có id như đầu vào*

    - [400 BadRequest] IdS_ScopeOutOfManagement

        *Tổ trưởng không thể xét duyệt form thuộc phạm vi quản lý của tổ khác*

    - [400 BadRequest] CheckedForm

        *Form đã được kiểm tra (phê duyệt hoặc bị từ chối) nên không thể kiểm tra lại nữa.*

### Rút lại form minh chứng thành tích
<span style="color:#ea4335; width: 50px; display: inline-block">**DELETE**</span> ```https://localhost:7265/api/forms/AchievementEvidence/{id}```

*Rút lại form minh chứng thành tích (có thể do thấy sai hay gì đó). Hành động này chỉ thực hiện được khi form chưa được duyệt.*

- **Route Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |id|mã định danh của form minh chứng thành tích|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    
    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [404 NotFound]

        *Đợt thưởng không tồn tại trong CSDL để xoá*

    - [400 BadRequest] CheckedForm

        *Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại.*

## Form chọn quà cho dịp đặc biệt
### Lấy ra danh sách form chọn quà cho dịp đặc biệt
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/forms/ChoosingPresents[?rewardCeremonyId={int}]```

*Lấy ra danh sách form chọn quà cho dịp đặc biệt. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form của chỉ cá nhân tài khoản đó gửi lên

- **Query Params**
  |Tham số|Miêu tả|
  |-------|-------|
  |rewardCeremonyId|*[tuỳ chọn]* Để lấy danh sách form chọn quà cho dịp đặc biệt của đợt thưởng có Id bằng `rewardCeremonyId`.<br/> Đừng ghi vào nếu muốn lấy ra toàn bộ đợt thưởng|

- **Request Header**
  |Tham số|Miêu tả|
  |-------|-------|
  |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
  
  Trả về một danh sách các [FormBriefInfo](#formbriefinfo) (click vào để xem giải thích)

  Ex:
  ```json
  [
    {
      "id": 1,
      "formType": "ChoosingPresents",
      "title": "Form title",
      "createdTime": "2022-01-01T00:00:00",
      "isAccepted": true,
      "notAcceptedReason": "Reason for not accepting",
      "account": "user123"
    },
    ...
  ]
  ```
- **Lỗi**
  - [401 Unauthorized]

    *JWT Token không hợp lệ*


### Lấy thông tin chi tiết của form chọn quà cho dịp đặc biệt
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span>
```https://localhost:7265/api/forms/ChoosingPresents/{id}```

*Lấy ra thông tin chi tiết của form chọn quà cho dịp đặc biệt. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:*

1. Chủ tịch phường, kế toán: Sẽ trả về form của toàn bộ phường
2. Tổ trưởng: Sẽ trả về form của chỉ tổ phụ trách
3. Hộ dân: Sẽ trả về form của chỉ cá nhân tài khoản đó gửi lên

- **Route Params**
  |Tham số|Miêu tả|
  |-------|-------|
  |id|mã định danh của form chọn quà cho dịp đặc biệt|

- **Request Header**
  |Tham số|Miêu tả|
  |-------|-------|
  |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công (Json)**
  | Property Name | Data Type | Description |
  | --- | --- | --- |
  | id | number | ID của form |
  | resident | [ResidentBriefInfo](#residentbriefinfo) | Thông tin tóm tắt của các cháu (có bao gồm Id, ngày sinh, họ và tên) |
  | rewardCeremony | [RewardCeremonyBriefInfo](#rewardceremonybriefinfo) | Dịp thưởng muốn nộp đến |
  | presentsType | number | Loại quà cháu muốn nhận |
  | presentsName | string | Tên của loại quà cháu muốn nhận |
  | createdTime | string (date-time format) | Giờ phút ngày tháng năm form được gửi lên |
  | account | string | Tài khoản người gửi form |


  Ex:

  ```json
  //Ví dụ cho đợt phát quà dịp đặc biệt
  {
    "id": 0,
    "resident": {
      "identityCode": "000001",
      "fullName": "Nguyễn Văn Quảng",
      "dateOfBirth": "1970-10-01T00:00:00",
      "isMale": true,
      "householdId": "001",
      "relationShip": "Chủ hộ",
      "scope": 1
    },
    "rewardCeremony": {
      "id": 1,
      "title": "First Reward Ceremony",
      "time": "2022-12-25T12:00:00Z",
      "type": "TT",
      "totalValue": 10000,
      "isAccepted": true,
      "isDone": true,
      "closingFormDate": "2022-12-30T12:00:00Z",
      "rewardDate": "2022-12-31T12:00:00Z"
    },
    "presentsType": 1,
    "presentsName": "1 Kẹo mút",
    "createdTime": "2022-06-07T19:06:58.209Z",
    "account": "acc2"
  }
  ```
  

- **Lỗi**
  - [401 Unauthorized]

    *JWT Token không hợp lệ*

  - [404 NotFound]

    *Không tìm thấy form có id như đầu vào*

  - [400 BadRequest] IdS_ScopeOutOfManagement

    *Tổ trưởng không thể xem form thuộc phạm vi quản lý của tổ khác*

### Gửi form chọn quà cho dịp đặc biệt
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/forms/ChoosingPresents```

*Gửi form chọn quà cho dịp đặc biệt.*


- **Request Header**
  |Tham số|Miêu tả|
  |-------|-------|
  |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Request Body (form-data)**

  | Property     | Type | Description | Example |
  |------------------|-----------|-------------|-----|
  | `ResidentIdCode`  | string  | ID của các cháu (vì các cháu chưa có CMND) | 123456789123 |
  | `RewardCeremonyId` | number  | ID của dịp thưởng muốn nộp đến | 2 |
  | `PresentsType` | number  | Loại phần quà muốn nhận | 1 |

  - ℹ️ **Lưu ý:** Danh sách các số `PresentsType` hợp lệ chính là danh sách giá trị của thuộc tính `achievementType` của các phần tử trong [Bảng chuyển đổi loại thành tích thành giá trị phần thưởng cho đợt thưởng](#thiết-lập-bảng-chuyển-đổi-loại-thành-tích-thành-giá-trị-phần-thưởng-cho-đợt-thưởng). Giải thích cho dễ hiểu thì ta xem **loại thành tích** trong đợt thưởng thành tích (`achievementType`) là **loại quà** (`PresentsType`) trong đợt thưởng dịp đặc biệt. Tức là nói, được loại thành tích là A thì nhận quà là B trong đợt thưởng thành tích, tương ứng với đợt thưởng dịp đặc biệt thì nếu chọn loại quà là A thì sẽ nhận quà là B (quà khác với loại quà).

- **Response Body khi thành công (Json)**

  [FormBriefInfo](#formbriefinfo) của form mới gửi lên, có chứa Id của cái form đó
  
- **Lỗi**
  - [401 Unauthorized]

    *JWT Token không hợp lệ*

  - [404 NotFound]

    *Xảy ra khi quá trình thêm Đợt thưởng vào CSDL bị lỗi (cách khắc phục đó là request lại lần nữa)*

  - [400 BadRequest] ResidentNotFound

    *Nhân khẩu không tồn tại trong CSDL.*

  - [400 BadRequest] RewardCeremonyNotFound

    *Đợt thưởng không tồn tại trong CSDL.*

  - [400 BadRequest] RewardCeremonyNotBeAccepted

    *Đợt thưởng chưa được duyệt nên không nhận form.*

  - [400 BadRequest] OverDue

    *Thời gian nhận form của đợt thưởng đã hết.*

    - [400 BadRequest] InvalidRewardCeremony

        *Đợt thưởng thành tích học tập không nhận form chọn quà dịp đặc biệt.*


### Rút lại form chọn quà cho dịp đặc biệt
<span style="color:#ea4335; width: 50px; display: inline-block">**DELETE**</span> ```https://localhost:7265/api/forms/ChoosingPresents/{id}```

*Rút lại form chọn quà cho dịp đặc biệt (có thể do thấy sai hay gì đó). Hành động này chỉ thực hiện được khi form chưa được duyệt.*

- **Route Params**
  |Tham số|Miêu tả|
  |-------|-------|
  |id|mã định danh của form chọn quà cho dịp đặc biệt|

- **Request Header**
  |Tham số|Miêu tả|
  |-------|-------|
  |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
  
  Không có

- **Lỗi**
  - [401 Unauthorized]

    *JWT Token không hợp lệ*

  - [404 NotFound]

    *Đợt thưởng không tồn tại trong CSDL để xoá*
## Quản lý lịch sử phát thưởng
### Lấy danh sách phát thưởng dự kiến của một đợt trao thưởng
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/RewardRecords/preview?rewardCeremonyId={number}```

*Lấy danh sách phát thưởng dự kiến của một đợt trao thưởng, chỉ thư kí, chủ tịch phường mới dùng được.*

*Danh sách phát thưởng dự kiến phải dựa trên form minh chứng đã được phê duyệt (với đợt trao thưởng thành tích) hoặc form chọn phần quà (với đợt trao thưởng dịp đặc biệt).*

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |rewardCeremonyId| mã của đợt trao thưởng |
    |ageFrom| *[tuỳ chọn]* (chỉ dùng với đợt trao thưởng dịp đặc biệt) từ mấy tuổi (mặc định là 0) |
    |ageTo| *[tuỳ chọn]* (chỉ dùng với đợt trao thưởng dịp đặc biệt) đến mấy tuổi (mặc định là 18) |

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    | Property Name | Data Type | Description |
    | --- | --- | --- |
    | resident | [ResidentBriefInfo](#residentbriefinfo) | Thông tin tóm tắt của các cháu (có bao gồm Id, ngày sinh, họ và tên) |
    | rewardCeremony | [RewardCeremonyBriefInfo](#rewardceremonybriefinfo) | Dịp thưởng muốn nộp minh chứng đến |
    | achievementName | string | Tiêu đề thành tích |
    | achievementType | number, nullable | Phân loại thành tích (dạng số nguyên dương) |
    | rewardName | string | Tên phần thưởng - Miêu tả Phần thưởng |
    | rewardValue | string | Giá trị phần thưởng (số tiền) |

    Ex:
    ```json
    {
        "resident": {
            "identityCode": "000001",
            "fullName": "Nguyễn Văn Quảng",
            "dateOfBirth": "1970-10-01T00:00:00",
            "isMale": true,
            "householdId": "001",
            "relationShip": "Chủ hộ",
            "scope": 1
        },
        "rewardCeremony": {
            "id": 1,
            "title": "First Reward Ceremony",
            "time": "2022-12-25T12:00:00Z",
            "type": "TTHT",
            "totalValue": 10000,
            "isAccepted": true,
            "isDone": true,
            "closingFormDate": "2022-12-30T12:00:00Z",
            "rewardDate": "2022-12-31T12:00:00Z"
        },
        "achievementName": "Hsg quốc gia hoá",
        "achievementType": null,
        "rewardName": "Bút bi thiên long",
        "rewardValue": 5000
    }
    ```
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch phường.*

    - [400 BadRequest] RewardCeremonyNotFound

        *Đợt thưởng không tồn tại trong CSDL.*

    - [400 BadRequest] RewardCeremonyNotHaveAchievementRewardPairs

        *Đợt thưởng không có Bảng chuyển đổi loại thành tích thành giá trị phần thưởng.*

### Lưu danh sách phát thưởng dự kiến của một đợt trao thưởng vào lịch sử trao thưởng
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/RewardRecords/savePreview?rewardCeremonyId={number}```

*Lưu danh sách phát thưởng dự kiến của một đợt trao thưởng vào lịch sử trao thưởng, chỉ thư kí, chủ tịch phường mới dùng được.*

*Quá trình lưu vào này đại diện cho quá trình phê duyệt chấp nhận danh sách trao thưởng, danh sách này sẽ được sử dụng như danh sách chính thức cho việc trao thưởng thực tế. Người dân lúc này có thể kiểm tra được phần quà mà con em mình nhận được.*

*Danh sách phát thưởng dự kiến phải dựa trên form minh chứng đã được phê duyệt (với đợt trao thưởng thành tích) hoặc form chọn phần quà (với đợt trao thưởng dịp đặc biệt).*

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |rewardCeremonyId| mã của đợt trao thưởng |
    |ageFrom| *[tuỳ chọn]* (chỉ dùng với đợt trao thưởng dịp đặc biệt) từ mấy tuổi (mặc định là 0) |
    |ageTo| *[tuỳ chọn]* (chỉ dùng với đợt trao thưởng dịp đặc biệt) đến mấy tuổi (mặc định là 18) |

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**

    Không có

- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch phường.*

    - [400 BadRequest] RewardCeremonyNotFound

        *Đợt thưởng không tồn tại trong CSDL.*

    - [400 BadRequest] RewardCeremonyNotHaveAchievementRewardPairs

        *Đợt thưởng không có Bảng chuyển đổi loại thành tích thành giá trị phần thưởng.*

### Lấy lịch sử trao thưởng
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/RewardRecords?[rewardCeremonyId={number}&residentId={string}]```

*Lấy lịch sử trao thưởng.*

- **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |rewardCeremonyId| *[tuỳ chọn]* mã của đợt trao thưởng , nếu bỏ qua thì trả về toàn bộ|
    |residentId| *[tuỳ chọn]* số định danh điện tử của cháu được phát quà, nếu bỏ qua thì trả về toàn bộ|

- **Request Header**
    |Tham số|Miêu tả|
    |-------|-------|
    |Authorization|"Bearer " + &lt;Một chuỗi kí tự là token nhận được sau khi đăng nhập&gt;|

- **Response Body khi thành công**
    | Property Name | Data Type | Description |
    | --- | --- | --- |
    | id | number | ID của bản ghi lịch sử |
    | resident | [ResidentBriefInfo](#residentbriefinfo) | Thông tin tóm tắt của các cháu (có bao gồm Id, ngày sinh, họ và tên) |
    | rewardCeremony | [RewardCeremonyBriefInfo](#rewardceremonybriefinfo) | Dịp thưởng muốn nộp minh chứng đến |
    | achievementName | string | Tiêu đề thành tích |
    | achievementType | number, nullable | Phân loại thành tích (dạng số nguyên dương) |
    | rewardName | string | Tên phần thưởng - Miêu tả Phần thưởng |
    | rewardValue | string | Giá trị phần thưởng (số tiền) |

    Ex:
    ```json
    {
        "id": 3,
        "resident": {
            "identityCode": "000001",
            "fullName": "Nguyễn Văn Quảng",
            "dateOfBirth": "1970-10-01T00:00:00",
            "isMale": true,
            "householdId": "001",
            "relationShip": "Chủ hộ",
            "scope": 1
        },
        "rewardCeremony": {
            "id": 1,
            "title": "First Reward Ceremony",
            "time": "2022-12-25T12:00:00Z",
            "type": "TTHT",
            "totalValue": 10000,
            "isAccepted": true,
            "isDone": true,
            "closingFormDate": "2022-12-30T12:00:00Z",
            "rewardDate": "2022-12-31T12:00:00Z"
        },
        "achievementName": "Hsg quốc gia hoá",
        "achievementType": null,
        "rewardName": "Bút bi thiên long",
        "rewardValue": 5000
    }
    ```
- **Lỗi**
    - [401 Unauthorized]

        *JWT Token không hợp lệ*

    - [403 Forbidden]

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch phường.*

    - [400 BadRequest] RewardCeremonyNotFound

        *Đợt thưởng không tồn tại trong CSDL.*

# Các kiểu dữ liệu được sử dụng nhiều lần

## ResidentInfo
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

## FormBriefInfo
| Property | Type | Description |
| --- | --- | --- |
| `id` | int | Id của form (cùng loại form thì id luôn khác nhau, nhưng khác loại form thì id có thể trùng) |
| `formType` | string | Loại form |
| `title` | string | Tiêu đề của form |
| `createdTime` | DateTime | Giờ phút ngày tháng năm form được gửi lên |
| `isAccepted` | bool | Đã duyệt chưa |
| `notAcceptedReason` | string | Lý do không duyệt |
| `account` | string | Tài khoản người gửi (Phải là Tài Khoản được chủ hộ sử dụng) |

- ℹ️ **Lưu ý:** 
    1. Form **CHƯA** được kiểm tra khi `notAcceptedReason = null` và `isAccepted = false`. Form **ĐÃ** được duyệt khi `isAccepted = true`. Form **BỊ TỪ CHỐI** khi `notAcceptedReason != null`.
    2. `formType` và `id` có thể được sử dụng khi cần lấy thông tin chi tiết của form hoặc rút lại (xoá) form bằng cách dùng sau `api/forms/<formType>/<id>`


Ex:

```json
{
  "id": 1,
  "formType": "AchievementEvidence",
  "title": "Form title",
  "createdTime": "2022-01-01T00:00:00",
  "isAccepted": true,
  "notAcceptedReason": "Reason for not accepting",
  "account": "user123"
}
```
## ResidentBriefInfo

| Property | Type | Description |
| --- | --- | --- |
|identityCode|string|Số CMND/CCCD/Mã định danh điện tử của nhân khẩu|
|fullName|string|Họ và tên nhân khẩu|
|dateOfBirth|string (date-time format)|Ngày tháng năm sinh|
|isMale|boolean|Giới tính **(Nam: *true*/ Nữ: *false*)**|
|householdId|string|Số hộ khẩu mà nhân khẩu thuộc về|
|relationShip|string|Quan hệ của nhân khẩu với chủ hộ|
|scope|number|Tổ phụ trách quản lý nhân khẩu|

Ex:
```json
{
    "identityCode": "000001",
    "fullName": "Nguyễn Văn Quảng",
    "dateOfBirth": "1970-10-01T00:00:00",
    "isMale": true,
    "householdId": "001",
    "relationShip": "Chủ hộ",
    "scope": 1
}
```

## RewardCeremonyBriefInfo
| Property | Type | Description |
| --- | --- | --- |
|id|number|mã định danh đợt thưởng|
|title|string|Tên đợt thưởng|
|time|string (date-time format)|Ngày giờ phút giây chủ tịch đề xuất kế hoạch phát thưởng|
|type|string|TTHT – phát thưởng cho thành tích học tập, TT – phát thưởng trung thu|
|totalValue|number|Tổng tiền cho việc phát thưởng|
|isAccepted|boolean|Chủ tịch phường đã duyệt danh sách phát thưởng chưa|
|isDone|boolean|Đã phát thưởng chưa|
|closingFormDate|string (date-time format)|Ngày đóng nhận form minh chứng|
|rewardDate|string (date-time format)|Thời gian nhận thưởng|

Ex:

```json
{
    "id": 1,
    "title": "First Reward Ceremony",
    "time": "2022-12-25T12:00:00Z",
    "type": "TTHT",
    "totalValue": 10000,
    "isAccepted": true,
    "isDone": true,
    "closingFormDate": "2022-12-30T12:00:00Z",
    "rewardDate": "2022-12-31T12:00:00Z"
}
```

## ResidentForm

| Property Name | Data Type | Description |
| ------------ | -------- | ----------- |
| id | int | id của form |
| fullName | string | Họ và tên |
| alias | string | Bí danh |
| dateOfBirth | DateTime | Ngày tháng năm sinh |
| isMale | bool | Giới tính |
| birthPlace | string | Nơi sinh |
| nativeLand | string | Nguyên quán |
| ethnic | string | Dân tộc |
| nation | string | Quốc tịch |
| job | string | Nghề nghiệp |
| workplace | string | Nơi làm việc |
| identityCode | string | CMND/CCCD, số giấy khai sinh |
| relationShip | string | Quan hệ với chủ hộ |
| academicLevel | string | Trình độ học vấn |
| criminalRecord | string | Tiền án |
| moveInDate | DateTime | Ngày chuyển đến |
| moveInReason | string | Lý do chuyển đến |

Ex:
```json
{
  "id": 1,
  "fullName": "John Doe",
  "alias": "JD",
  "dateOfBirth": "2000-01-01",
  "isMale": true,
  "birthPlace": "New York",
  "nativeLand": "USA",
  "ethnic": "Caucasian",
  "nation": "American",
  "job": "Engineer",
  "workplace": "Google",
  "identityCode": "1234567890",
  "relationShip": "Son",
  "academicLevel": "Bachelor",
  "criminalRecord": "None",
  "moveInDate": "2022-01-01",
  "moveInReason": "For work"
}

```

## AddingResidentFormRequestModel

| Property Name | Data Type | Description |
| ------------ | -------- | ----------- |
| fullName | string | Họ và tên |
| alias | string | Bí danh |
| dateOfBirth | DateTime | Ngày tháng năm sinh |
| isMale | bool | Giới tính |
| birthPlace | string | Nơi sinh |
| nativeLand | string | Nguyên quán |
| ethnic | string | Dân tộc |
| nation | string | Quốc tịch |
| job | string | Nghề nghiệp |
| workplace | string | Nơi làm việc |
| identityCode | string | CMND/CCCD, số giấy khai sinh |
| relationShip | string | Quan hệ với chủ hộ |
| academicLevel | string | Trình độ học vấn |
| criminalRecord | string | Tiền án |
| moveInDate | DateTime | Ngày chuyển đến |
| moveInReason | string | Lý do chuyển đến |

Ex:
```json
{
  "fullName": "John Doe",
  "alias": "JD",
  "dateOfBirth": "2000-01-01",
  "isMale": true,
  "birthPlace": "New York",
  "nativeLand": "USA",
  "ethnic": "Caucasian",
  "nation": "American",
  "job": "Engineer",
  "workplace": "Google",
  "identityCode": "1234567890",
  "relationShip": "Chủ hộ",
  "academicLevel": "Bachelor",
  "criminalRecord": "None",
  "moveInDate": "2022-01-01",
  "moveInReason": "For work"
}

```