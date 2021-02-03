const nodemailer = require ("nodemailer")


const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
})


const sendMail = async (from,to,subject,html)=> {
    try {
        let info = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: html
        })
    
        return info
    } catch(error){
        console.log("error for nodemailer")
        console.log(error)
    }
}

module.exports = sendMail