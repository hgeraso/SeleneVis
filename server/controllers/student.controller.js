const student = require('../models/estudents');


var controller = {

    test: (req, res) => {
        return res.status(200).send({
            menssaje: 'Probando desde controller student'
        });
    },

    save: (req, res) => {


        const modelstudent = new student({

            name: req.body.name
        });
        console.log(modelstudent.name);
        
        //verified if student exist
         student.findOne({ name: modelstudent.name }, async (err, issetName) => {
            if (err) {
                return res.status(500).send({
                    menssaje: "error on server"
                });
            }
            if (issetName) {
                console.log(issetName);
                
                return res.status(200).send({
                    menssaje: "student already exist"
                });

            } else {

                await modelstudent.save((err, success) => {
                    if (err) {
                        return res.status(500).send({
                            menssaje: "error create student",
                        });
                    }

                    if (!success) {
                        return res.status(400).send({
                            menssaje: "student not created",
                        });
                    }

                    return res.status(200).send({
                        menssaje: "student created",
                    });
                });
            }
        })

        // await modelstudent.save( (err, success)=>{
        //     if (err){
        //         return res.status(500).send({
        //             menssaje: "error create student",
        //         });
        //     }

        //     if (!success){
        //         return res.status(400).send({
        //             menssaje: "student not created",
        //         });
        //     }

        //     return res.status(200).send({
        //         menssaje: "student created",
        //     });
        // } );


    }
}

module.exports = controller;