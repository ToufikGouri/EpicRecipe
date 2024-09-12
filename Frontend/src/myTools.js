import LoadingGif from "./assets/Loading.gif"
import SweetAlert from "sweetalert2"
import emailjs from "emailjs-com"

export const toast = SweetAlert.mixin({
    toast: true,
    position: "top",
    timer: 2000,
    showConfirmButton: false,
})

export const modal = (msg, confText = "Ok", canText = "Cancel", confBtnColor = "#3085d6") => {
    return SweetAlert.fire({
        title: `${msg}`,
        showCancelButton: true,
        confirmButtonText: `${confText}`,
        confirmButtonColor: `${confBtnColor}`,
        cancelButtonText: `${canText}`,
    })
}

export const Loading = (msg = "Loading") => {
    return toast.fire({
        html: `<div style='display: flex; align-items: center; font-weight: bold'><h1>${msg}</h1><img src="${LoadingGif}" alt="..." style='height: 50px; margin: 0 10px;' /></div>`,
        position: "center",
        width: 'auto',
        timer: 8000,
    })
}

export const sendOTPemail = async (username, otp, email) => {

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    const emailData = {
        to_name: `${username}`,
        otp: `${otp}`,
        mail_to: `${email}`
    }

    try {
        await emailjs.send(serviceId, templateId, emailData, publicKey)
        return true
    } catch (error) {
        return false
    }
}