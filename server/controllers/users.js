const mongoose = require('mongoose');
const userModel = require('../models/users');
const transporter = require('../mailing/email');
const { saveConfirmationCodeToDatabase } = require('../models/email');

// Register Function
const Register = async(req,res,next)=>{
    try {
        // generate a random confirmation code
        const confirmationCode = Math.random().toString(36).substring(2, 15);

        // save the confirmation code and user's email to your database
        await saveConfirmationCodeToDatabase(confirmationCode, req.body.email);

        // set up your email options
        const mailOptions = {
        from: 'zeineb.haraketi@esprit.tn',
        to: req.body.email,
        subject: 'Account confirmation',
        html: `Please click <a href="http://localhost:5000/confirm?code=${confirmationCode}">here</a> to confirm your account.`
        };

        // send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });

        // send a response to the user
        res.send('Please check your email to confirm your account.');

    } catch (error) {
        res.status(500).json(error.message);
    }
}

//Search User Function
const SearchUser = async(req,res,next)=>{
    // const { searchQuery } = req.query;
    const { searchQuery, tags } = req.query;


    try {
        const name = new RegExp(searchQuery, "i");
        const email = new RegExp(searchQuery, "i");

        const user = await userModel.find({
            $or: [
                {name},
                {email}
            ]
        });


        // const user = await userModel.find({
        //     $or: [
        //         { name: typeof searchQuery === 'string' ? { $regex: searchQuery, $options: 'i' } : null },
        //         { email: typeof searchQuery === 'string' ? { $regex: searchQuery, $options: 'i' } : null },
        //     ]
        // })
        // const users = await userModel.find({ $where: `this.name.indexOf('${searchQuery}') !== -1 || this.email.indexOf('${searchQuery}') !== -1` });

        // const users = await userModel.find({ $text: { $search: searchQuery, $caseSensitive: true } });

        res.status(200).json({ data: user});
    } catch (error) {
        // res.status(404).json(error.message);
        res.status(404).json({ message: error.message });
    }
}



module.exports = {
    Register,
    SearchUser
}

