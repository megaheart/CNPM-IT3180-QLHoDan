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
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/household/addAccount```

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

<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/account/household/AccountList```

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

        *Tài khoản không đủ quyền để truy cập. Tài khoản không phải thư kí, chủ tịch phường.*
            
    - [400 BadRequest] IdS_DuplicateUserName

        *Tên đăng nhập đã tồn tại*

### Thay đổi thông tin tài khoản cấp đặc biệt
<span style="color:#fbbc05; width: 50px; display: inline-block">**POST**</span> ```https://localhost:7265/api/account/household/addAccount```

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

*Chỉ chủ tịch phường mới dùng được.*

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

# Module Phát thưởng
## Quản lý đợt trao thưởng
### Lấy ra danh sách các đợt trao thưởng
<span style="color:#34a853; width: 50px; display: inline-block">**GET**</span> ```https://localhost:7265/api/RewardCeremonies```

*Lấy ra danh sách dịp trao thưởng (thông tin khá sơ lược), chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.*

<!-- - **Query Params**
    |Tham số|Miêu tả|
    |-------|-------|
    |movedOut|*[tuỳ chọn]* `true` để lấy danh sách hộ khẩu đã chuyển đi, `false` để lấy danh sách những hộ khẩu đang thường trú<br/>Mặc định là `false`| -->

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
            "time": "DateTime",
            "type": "string",
            "totalValue": number,
            "isAccepted": boolean,
            "isDone": boolean,
            "closingFormDate": "DateTime",
            "rewardDate": "DateTime"
        },
        ...
    ]
    ```
    |Tham số  |Miêu tả  |
    |---------|---------|
    |id|mã định danh đợt thưởng|
    |title|Tên đợt thưởng|
    |time|Ngày giờ phút giây chủ tịch đề xuất kế hoạch phát thưởng|
    |type|TTHT – phát thưởng cho thành tích học tập, TT – phát thưởng trung thu|
    |totalValue|Tổng tiền cho việc phát thưởng|
    |isAccepted|Chủ tịch phường đã duyệt danh sách phát thưởng chưa|
    |isDone|Đã phát thưởng chưa|
    |closingFormDate|Ngày đóng nhận form minh chứng|
    |rewardDate|Thời gian nhận thưởng|

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

    - [409 Conflict]

        *Đợt thưởng thêm vào trùng tên với đợt thưởng đã tồn tại trong CSDL*

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

    - [400 BadRequest] ForeignKeyConstraintFailed

        *Xảy ra khi xoá một phần tử mà một số hàng trong các bảng khác có khoá ngoài trỏ đến phần tử này.*

        *Phần tử này hiện tại không thể bị xoá. Thay vào đó hãy cảnh báo người dùng rằng đợt thưởng này không thể xoá (Nó đã được các dữ liệu khác đề cập đến, cũng như điều này đảm bảo thông tin của đợt thưởng này là một thông tin hợp lệ với thực tiễn, không phải một mẫu thử nghiệm.)*



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