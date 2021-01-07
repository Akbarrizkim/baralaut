const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    nim: Number,
    nama: String,
    umur: Number,
    fakultas: String,
    jurusan: String,
    alamat: String
});

module.exports = mongoose.model('Students', StudentSchema);

// module.exports = {
//     studentCollection: mongoose.model('Students', StudentSchema)
// }