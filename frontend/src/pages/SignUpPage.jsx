import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import {useMutation,useQueryClient} from "@tanstack/react-query"
import {axiosInstance} from "../lib/axios.js"
import { signup } from "../lib/api.js";
import useSignUp from "../hooks/useSignUp.js";
import videoCallImage from '../assets/Video call-pana.png';
const SignUpPage = () => {
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

    return (
        <div className="h-screen flex items-center justify-center p-4 sm:p-8" >

            <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

                {/* signupform leftside */}

                <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">

                    <div className="mb-4 flex items-center justify-start gap-2">
                        <ShipWheelIcon className="size-9 " />
                        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">PolyChat</span>
                    </div>

                    <div className="w-full">
                        <form onSubmit={handleSignup}>
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold ">Create an Account</h2>
                                    <p className="text-sm opacity-70">
                    
                    
                    
                    
                                        Join polychat and start your language learning adventure
                                    </p>
                                </div>

                                <div className="space-y-3">

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Full Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="input input-bordered w-full"
                                            value={signupData.fullName}
                                            onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                                            required
                                        />

                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="user@gmail.com"
                                            className="input input-bordered w-full"
                                            value={signupData.email}
                                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                            required
                                        />

                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="******"
                                            className="input input-bordered w-full"
                                            value={signupData.password}
                                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                            required
                                        />
                                        <p className="text-xs opacity-70 mt-1">
                                            Password must be at least 6 characters long
                                        </p>

                                    </div>


                                    <div className="form-control">
                                        <label className="label cursor-pointer justify-start gap-2">
                                            <input type="checkbox" className="checkbox checkbox-sm" required />
                                            <span className="text-xs leading-tight">
                                                I agree to the{" "}
                                                <span className="text-primary hover:underline">terms of service</span> and{" "}
                                                <span className="text-primary hover:underline">privacy policy</span>
                                            </span>
                                        </label>
                                    </div>








                                </div>

                                <button className="btn btn-primary w-full" type="submit">
                                    {isPending?"SigninUp":"SignUp"}
                                </button>
                                <div className="text-center mt-4">
                                    <p className="text-sm">
                                        Already have an account?{" "}
                                        <Link to="/login" className="text-primary hover:underline">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>


                            </div>


                        </form>

                    </div>
                </div>

                {/* signup rightside */}
                <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
                    <div className="max-w-md p-8">
                        {/* Illustration */}
                        <div className="relative aspect-square max-w-sm mx-auto">
                            <img src={videoCallImage} alt="Language connection illustration" className="w-full h-full" />
                        </div>

                        <div className="text-center space-y-3 mt-6">
                            <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
                            <p className="opacity-70">
                                Practice conversations, make friends, and improve your language skills together
                            </p>
                        </div>
                    </div>
                </div>

        </div>




        </div>
      
   )
   
}
export default SignUpPage;