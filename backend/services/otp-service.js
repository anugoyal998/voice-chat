const crypto = require('crypto');
// const smssid = process.env.SMS_SID
// const smsAuthToken = process.env.SMS_AUTH_TOKEN
// const twilio = require('twilio')(smssid,smsAuthToken,{lazyLoading: true})
const hashService = require('./hash-service')

class OtpService{
    async generateOtp(){
        const otp = crypto.randomInt(1000,9999)
        return otp
    }
    // async sendBySms(phone,otp){
    //     return await  twilio.messages.create({
    //         to: phone,
    //         from: process.env.SMS_FROM_NUMBER,
    //         body: `Your otp for Voice Chat is ${otp}`
    //     })
    // }
    async verifyOtp(hashedOtp,data){
        let computedHash = hashService.hashOtp(data)
        return hashedOtp === computedHash
    }
}

module.exports = new OtpService()