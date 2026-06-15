styles/

CSS dùng chung toàn hệ thống.

styles/
│
├── global.css
└── tailwind.css
global.css
*{
   margin:0;
   padding:0;
}

Chứa:

Reset CSS
Body
Typography
Animation
tailwind.css

Sau này dùng khi build Tailwind.

@tailwind base;
@tailwind components;
@tailwind utilities;