tang giao tiep voi backend
 - trong do file api.js (quan trong nhat) moi request deu di qua day

 Tầng giao tiếp với Backend.

services/
│
├── api.js
├── product.service.js
├── auth.service.js
├── cart.service.js
└── order.service.js
api.js

Quan trọng nhất.

Mọi request đi qua đây

Ví dụ:

GET
POST
PUT
DELETE
product.service.js

Ví dụ:

getProducts()
getProductById()
searchProducts()
auth.service.js

Ví dụ:

login()
register()
logout()