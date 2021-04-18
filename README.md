# Express Dengan sqlite3

![pexels image](https://images.pexels.com/photos/4004374/pexels-photo-4004374.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500)
Apa itu sqlite, sqlite merupakan sebuah Database management system berbentuk file. Database sqlite berbentuk Relational database layaknya MYSQL.

Bedanya sqlite hanya memerlukan sebuah file dengan extensi sqlite, berbeda dengan MYSQL yang harus di jalankan servernya terlebih dahulu.

# Persiapan

Untuk memulai menggunakan SQLITE ada beberapa kebutuhan yang perlu kita install,

1. expressjs
2. cors
3. knex
4. sqlite3
5. Dbeaver (aplikasi desktop)

Buat sebuah project bernama express-sqlite dan install dependencies yang dibutuhkan.

```bash
mkdir express-sqlite && cd express-sqlite
npm init
npm install --save express cors knex sqlite3
touch server.js
```

## Structur folder

1. Buat sebuah folder bernama **models** dan **controllers**
2. Setelah itu, buat file bernama **connection.js** dan **userModel.js** di dalam folder **models**
3. Buat folder **schema** di dalam folder **models**, dan isi dengan sebuah file bernama **userSchema.js**
4. Buat file bernama **userController.js** di dalam sebuah folder bernama **controllers**
5. Buat sebuah file bernama **test.rest** untuk tester api kita, di _root directory_ kita.
6. Buat sebuah file bernama **db.sqlite** di root directory kita.
   > _ROOT DIRECTORY_ adalah folder utama project node js kita

## Import Dependencies didalam server.js

<small>./server.js</small>

```javascript
const express = require("express");
const cors = require("cors");
const user = require("./controllers/userController");
const app = express();
```

## Setup middleware di dalam server.js

<small>./server.js</small>

```javascript
app.use(cors());
app.use(express.json());
app.use(express.urlEncoded({ extended: false }));
```

## Setup Controller di dalam server.js

<small>./server.js</small>

```javascript
app.use("/api/users", user);
```

## Setup listener di server.js

<small>./server.js</small>

```javascript
app.listen(8000, () => console.log("server berjalan di port 8000"));
```

# Connection ke sqlite

Sebelumnya teman teman sudah membuat file database bernama **db.sqlite**, selanjutnya kita akan membuat connector ke database tersebut.
<small>./models/connection.js</small>

```javascript
const path = require("path")
const db = require("knex")({
  client: "sqlite3",
  connection: { filename: path.resolve(__dirname, "../db.sqlite) }
});

module.exports = db;
```

# SCHEMA

![pexels photo](https://images.pexels.com/photos/5846255/pexels-photo-5846255.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500)
Schema di gunakan untuk memudahkan kita dalam bermigrasi, maksudnya seperti apa, bisa saja kita membuat sebuah aplikasi kita di server local, dan saat deployment kita harus membuat skema yang sama dalam database kita.

Saat di production server, kita tinggal menjalankan function schema yang sudah kita buat, sehingga database di server sama persis dengan database kita di local.

Okay, tadi kita telah membuat sebuah file bernama **userSchema.js** di dalam ./models/schema,
silakan isi dengan code berikut.
<small>./models/schema/userSchema.js</small>

```javascript
const db = require("../connection");

async function createTableUsers() {
  return await db.schema
    .createTable("users", (table) => {
      table.increments("id").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(db.fn.now());
      table.unique("email");
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
}

createTableUsers().then((data) => {
  process.exit();
});
```

Bisa di lihat di code di atas, kita perintahkan KNEX untuk membuat sebuah tabel dengan nama **users** yang disi dengan kolom id, email, password, created_at.

## Mengatur NODE CLI CODE untuk membuat schema database

Schema yang sudah kita buat, harus di jalankan, kita bisa menjalankan function schema user yang sudah kita buat dengan bantuan node CLI.

Silakan teaman teman buka file bernama **package.json** dan edit bagian **_script_** dengan code berikut :

<small>./package.json</small>

```json
 "scripts": {
    "dev": "nodemon server.js --watch",
    "migration:user": "node ./models/schema/userSchema.js"
  }
```

Bisa di lihat di atas, kita menambahkan syntax untuk node cli bernama **migration:user**, selanjutnya kita tinggal jalankan pada terminal / git bash kita.

Buka terminal / gitbash dan masuk ke dalam folder kita, silakan jalankan syntax berikut :

```bash
npm run migration:user
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/99wfzm2ubacah06xcjvd.png)

# DBEAVER database management software

![dev.to](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ttnv6z92ge1w2ri6v5sq.png)
Okay teman teman, untuk menghandle database sqlite, sebaiknya kita gunakan sebuah software bernama **dbeaver**, software ini kita gunakan untuk mengatur database yang kita punya.

Silakan download [disini](https://dbeaver.io/download/)

## Membuat connection di dbeavers

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tsb6irdg7y71d9b985pd.png)
Buka aplikasi dbeaver, dipanel sebelah kiri, silakan click kanan, dan pilih **CREATE** dan pilih **CONNECTION**.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h9byxi5u11gwkf6d3pyi.png)
Akan muncul panel connect to database, panel sebelah kiri pilih **popular** dan pilih **SQLITE** lalu tekan **next**.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g604lkj28nnsqg3fbh7w.png)
Silakan click **browse** dan arahkan pada folder project kita dan pilih file bernama **db.sqlite** yang tadi sudah teman teaman buat.

lalu ketik **FINISH**

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qmw2xwasl0tdszt3vn5n.png)

Perhatikan panel sebelah kiri, dan connection ke file sqlite kita sudah berhasil di buat, dan kita sudah memiliki tabel users sesuai yang kita buat di schema.

# Model

![pexels image](https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500)

Silakan kita buat sebuah model untuk penghubung database dengan logic yang akan kita buat.

Buka file bernama userModel.js pada ./models dan isikan dengan code dibawah ini :

<small>./models/userModel.js</small>

```javascript
const db = require("./connection");

exports.createUser = async (data) => {
  return await db("users")
    .insert(data)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

exports.readUser = async () => {
  return await db("users")
    .select("*")
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
```

# Controller

Okay masuk ke selanjutnya adalah controller, silakan buat sebuah file bernama **userController.js** di ./controllers dan isi dengan code berikut :

```javascript
const { createUser, readUser } = require("../models/userModel");
const express = require("express");
const user = express.Router();

user.post("/", (req, res) => {
  createUser(req.body)
    .then((result) => {
      if (result.length > 0) {
        res.status(201).json({
          mag: "success register",
          result: result,
        });
      } else {
        res.status(401).json({
          msg: "email sudah terpakai..",
          result: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

user.get("/", (req, res) => {
  readUser()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "error",
        error: err,
      });
    });
});

module.exports = user;
```

# Test API dengan .rest

Kita tadi sudah membuat file bernama test.rest di root directory kita, silakan teman teamn isi dengan ini :

```json
###
POST http://localhost:8000/api/user
Content-Type: application/json
Accept: application/json

{
    "email" : "alif@gmail.com",
    "password" : "1qazxsw2"
}

###
GET http://localhost:8000/api/user
Content-Type: application/json
Accept: application/json
```

Silakan coba hit dan lihat hasilnya dengan dbeaver

> Apabila data belum mucul pada DBEAVER, silakan tenan teman refresh dengan cara tekan tombol **F5**
