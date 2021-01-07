WEB SERVICE MAHASISWA DATA CENTER
website untuk mencari informasi mahasiswa-mahasiswa ITB!

--------------------------
--------------------------
--------------------------

APPLICATION INSTALLATION

Online
Klik tautan https://baralaut.herokuapp.com/ untuk mengakses web service secara langsung.

Offline
Pastikan bahwa Anda sudah memiliki aplikasi Docker untuk PC.
Setelah melakukan clone git repository ke local repository, buka command prompt pada directory tersebut dan jalankan "docker-compose up". Aplikasi Docker kemudian akan membangun dan menjalankan docker image untuk dapat menggunakan web service berikut di localhost Anda.

Anda juga dapat mengunduh docker image melalui tautan https://hub.docker.com/repository/docker/akbarezeki/baralaut_app untuk mengakses docker hub repository untuk web service ini.

--------------------------
--------------------------
--------------------------

WEB SERVICE ARCHITECTURE

Front-End
HTML, CSS, Javascript, Bootstrap

Back-End
Node.js, Express.js

Database Server
Atlas MongoDB

Oauth (Authentication Provider)
Google Oauth2.0

--------------------------
--------------------------
--------------------------

NODE.JS MODULES

Node.js module yang terdapat di dalam aplikasi ini

Body-parser
Modul untuk mengolah dan memanipulasi komponen pada body API request

Dotenv	
Modul untuk menggunakan .env file sehingga data pribadi/sensitif dapat dipisahkan dari kode

Ejs	
Modul untuk menggunakan .ejs, format file untuk menggunakan HTML dengan kode Javascript yang di-template

Express	
Modul untuk menggunakan Express, sebuah web application framework yang memudahkan pembagian aplikasi berdasarkan request yang dikirim. 

Express-session	
Modul untuk menyimpan data ke middleware yang akan digunakan nantinya, yang membuat pengguna tidak perlu log-in terus untuk menggunakan website

Mongoose	
Modul untuk menggunakan dan memanipulasi data dari mongoDB pada server-side web application

Nodemon	
Modul untuk mengotomasi restart aplikasi saat ada perubahan pada aplikasi

Passport
Modul untuk mengimplementasi autentikasi pada node.js

Passport-google-oauth
Modul untuk mengimplementasi Google Oauth pada node.js

Method-Override
Modul untuk mengimplementasi DELETE dan PUT request pada html

Cors
Modul untuk mengunakan CORS, sehingga suatu website dapat mengirimkan request pada website lain

Express-validator
Modul yang digunakan untuk memvalidasi input dari client sehingga tidak ada data kotor/tidak semestinya yang masuk ke dalam database

Html
Modul yang digunakan untuk memudahkan manipulasi tampilan html

--------------------------
--------------------------
--------------------------

FOLDER ARCHITECTURE

simbol "-" menandakan folder
simbol "#" menandakan file

root
    -models
        #Student.js         // Collection model untuk data mahasiswa
    -node_modules
    -public
        -css
            #style.css      // CSS style untuk web application
        -img
    -routes
        #students.js        // Router handler untuk route yang berhubungan dengan data mahasiswa
    -views
        -pages
            #auth.ejs       // halaman pertama/autentikasi pengguna menggunakan Google Oauth
            #edit.ejs       // halaman mengubah data mahasiswa
            #input.ejs      // halaman memasukkan data mahasiswa baru
            #success.ejs    // halaman utama, muncul setelah berhasil melakukan autentikasi
            #table.ejs      // halaman berisi data mahasiswa dalam bentuk tabel
        -partials
    #.dockerignore
    #.env
    #app.js                 // file yang bertindak sebagai web server untuk aplikasi ini
    #docker-compose.yaml
    #dockerfile
    #npm-shrinkwrap.json
    #package.json
    #readME.md

--------------------------
--------------------------
--------------------------

API REQUEST

API Request yang dijalankan pada aplikasi ini adalah

GET /
menampilkan halaman auth.ejs

GET /auth/google
menampilkan daftar akun google pada browser yang digunakan untuk mengautentikasi diri

GET /auth/google/callback
setelah memilih akun google atau melakukan log in dengan akun google, redirect ke GET /success jika berhasil atau /error jika gagal

GET /success
menampilkan halaman utama web application success.ejs

GET /error
menampilkan pesan error disebabkan gagal login

GET /students
menampilkan halaman table.ejs yang berisi data mahasiswa dalam bentuk tabel

GET /students/input
menampilkan halaman input.ejs untuk memasukkan data mahasiswa yang baru

POST /students/input
mengirimkan data mahasiswa yang sudah di-input ke database lalu redirect ke halaman table.ejs

DELETE /students/:studentId
menghapus data mahasiswa dengan studentId spesifik lalu redirect ke halaman table.ejs

GET /students/edit/:studentId
menampilkan halaman edit.ejs untuk mengubah atau memperbaharui data mahasiswa dengan studentId tertentu

PUT /students/:studentId
mengirimkan data mahasiswa yang sudah diubah ke database lalu redirect ke halaman table.ejs