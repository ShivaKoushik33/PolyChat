import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


export async function signup(req,res){
     const {email,password,fullName}=req.body;

     try{
        if(!email || !password || !fullName){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters long"});

        }
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Please enter a valid email address"});
        }
        const existingUser=await User.findOne({
            email
        });
        if(existingUser){
            return res.status(400).json({message:"Email already exists, please use  a different one"});
        }

        const index=Math.floor(Math.random()*100)+1;
        const randomAvatar=`https://avatar.iran.liara.run/public/${index}.png`

        const newUser=await User.create({
            email,password,fullName,
            profilePic:randomAvatar
        });

        try{
            
        await upsertStreamUser({
            id:newUser._id.toString(),
            name:newUser.fullName,
            image:newUser.profilePic
        });
        console.log(`Stream User Created for ${newUser.fullName}`);
        }
        catch(error){
            console.error("Error in creating Stream user:", error);
           
        }

        //need to create user in stream

        const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{
            expiresIn:"2d"
        });
        res.cookie("jwt",token,{
            maxAge:3*24*60*60*1000, // 3 days
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="production" // true in production

        });
        res.status(201).json({
            sucess:true,
            user:newUser
        });

     }
     catch(error){

        console.log("Error in signup:", error);
        res.status(500).json({message:"Internal server error"});
     }
   
}

export async function login(req,res){
   try{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400).json({message:"Please fill all the fields"});
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found, please signup"});
    }
    const isPasswordCorrect=await user.matchPassword(password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect password or email"});
    }
     const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{
            expiresIn:"2d"
        });
        res.cookie("jwt",token,{
            maxAge:3*24*60*60*1000, // 3 days
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="production" // true in production

        });
        res.status(201).json({
            sucess:true,
            user
        });

   }
   catch(error){
       console.log("Error in login:", error);
       res.status(500).json({message:"Internal server error"});
   }
}

export async function logout(req,res){
    res.clearCookie("jwt");
    res.status(200).json({success:true,message:"Logged out successfully"});
}

export async function onboard(req,res){
     try{
        const userId=req.user._id;
        const {fullName,bio,nativeLanguage,learningLanguage,location}=req.body;
        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
            return res.status(400).json({message:"Please fill all the fields",
                missingFields:[
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean)
            });
        }
    
    const updatedUser=await User.findByIdAndUpdate(userId,{
        ...req.body,
        isOnboarded:true
    },{new:true});
    if(!updatedUser){
        return res.status(404).json({message:"User not found"});
     }  
     res.status(200).json({
        success:true,
        user:updatedUser
     });

     }
    catch(error){
        console.log("Error in onboarding:", error);
        res.status(500).json({message:"Internal server error"});
    }
}

