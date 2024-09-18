import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { Loading, sendOTPemail, toast } from '../../myTools'
import axios from 'axios'
import { LockKeyholeIcon } from 'lucide-react'
import useTitle from '../../components/useTitle'

const ChangePassword = () => {

    useTitle("Change Password")
    const user = useSelector(state => state.user.userData)
    const [inputOTP, setInputOTP] = useState("")
    const [isOTPsent, setIsOTPsent] = useState(false)
    const [isOTPvalid, setIsOTPvalid] = useState(false)
    const [password, setPassword] = useState("")


    const handleSendOTP = async () => {

        Loading("Sending OTP")
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/send-otp`, {}, { withCredentials: true })
                .then((val) => val.data.data.otp.tempOTP)
                .then((val) =>
                    (async () => {
                        await sendOTPemail(user.username, val, user.email)
                    })()
                )

            setIsOTPsent(true)
            Loading().close()
            toast.fire({
                icon: "success",
                title: "OTP sent successfully"
            })
        } catch (error) {
            Loading().close()
            toast.fire({
                icon: "error",
                title: `${error.response?.data?.message || "Something went wrong"}`
            })
        }
    }

    const handleVerifyOTP = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/verifyotp`, { tempOTP: inputOTP }, { withCredentials: true })

            setIsOTPvalid(true)
            toast.fire({
                icon: "success",
                title: "OTP successfully verified"
            })
        } catch (error) {
            toast.fire({
                icon: "error",
                title: "Invalid or expired OTP"
            })
        }
    }

    const handlePassword = async (e) => {
        e.preventDefault()

        if (!password) {
            toast.fire({
                icon: "warning",
                title: "Please enter valid password"
            })
            return
        }

        try {
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/updateprofile`, { password }, { withCredentials: true })

            toast.fire({
                icon: "success",
                title: "Password updated successfully"
            })
            // Clearing the fields 
            setInputOTP("");
            setIsOTPsent(false);
            setIsOTPvalid(false);
            setPassword("");

        } catch (error) {
            toast.fire({
                icon: "error",
                title: `${error.response?.data?.message || "Failed To Update Password"}`
            })
        }
    }

    return (
        <>
            <section className='p-6'>

                {/* Headings */}
                <div className="headings">
                    <h1 className='text-primaryBlue text-2xl sm:text-4xl capitalize font-bold'>Change Password</h1>
                    <p className='sm:text-xl mt-3 my-1'>If you want to change your password, click the button below, and we will send an OTP to your email address.</p>
                    <p className='text-xs text-primaryGrey flex items-center'><LockKeyholeIcon height={15} /> Your password will always remain private.</p>
                </div>

                {/* Send OTP */}
                <div className='mt-8 space-y-4'>
                    <button onClick={handleSendOTP} className='primaryBtn rounded-none'>Send OTP</button>

                    {isOTPsent && <div>
                        {!isOTPvalid ?
                            <> {/* OTP enter */}
                                <p>Please enter the OTP, It'll expire in 5mins <span className='text-primaryGrey italic'>(Please don't refresh or change the page).</span></p>
                                <div className='flex'>
                                    <input type="number" value={inputOTP} onChange={(e) => setInputOTP(e.target.value)} className='p-2 text-2xl w-24 outline-primaryBlue border-2 border-black' placeholder="123456" />
                                    <button onClick={handleVerifyOTP} className={`${inputOTP?.toString().length === 6 ? "" : "hidden"} primaryBtn rounded-none`}>Verify</button>
                                </div>
                            </>
                            : <> {/* Enter password */}
                                <label htmlFor='updatePassword' className='font-bold text-xl'>Enter new password</label>
                                <form onSubmit={handlePassword} className='update-password flex'>
                                    <input id='updatePassword' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className='p-2 outline-primaryBlue border-2 border-black' placeholder='New password' />
                                    <button type="submit" className='w-24 mx-1 primaryBtn rounded-none'>Save</button>
                                    <button onClick={() => { setInputOTP(""); setIsOTPsent(false); setIsOTPvalid(false); setPassword(""); }} className='p-2 px-5 uppercase border-2 border-black hover:bg-gray-200'>Cancel</button>
                                </form>
                            </>
                        }
                    </div>}
                </div>

            </section >
        </>
    )
}

export default ChangePassword