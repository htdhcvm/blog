const multer  = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/img')
    },
    filename: function (req, file, cb) {
        switch(file.mimetype){
            case("image/jpeg") : {
                cb(null, `${file.fieldname}-${Date.now()}.jpg`);
                break;
            }

            case("image/png") : {
                cb(null, `${file.fieldname}-${Date.now()}.png`);
                break;
            }

            case("image/svg+xml") : {
                cb(null, `${file.fieldname}-${Date.now()}.svg`);
                break;
            }
        }
    }
})
   
let upload = multer({ storage: storage });

module.exports = upload;
