<?php

namespace App\Http\Controllers;

use App\Models\ApiAuth;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ApiAuthController extends Controller
{
    public function register(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required|min:6|max:20|unique:users',
            'email' => 'required|email|unique:users',
            'phone' => 'required|max:11',
            'password' => 'required|string|min:8|',
        ]);

        if($validator->fails()) {

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);

        } else {

            try {
                $user = ApiAuth::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'password' => bcrypt($request->password),
                ]);
            
                $token = $user->createToken('authToken')->plainTextToken;
            
                return response()->json([
                    'status' => 200,
                    'success' => true,
                    'user' => $user,
                    'token' => $token,
                    'message' => "Account created successfully"
                ], 200);
            
            } catch (\Illuminate\Database\QueryException $e) {
                $errorCode = $e->errorInfo[1];
                if($errorCode == 1062){
                    if (strpos($e->getMessage(), 'api_auths_email_unique') !== false) {
                        return response()->json([
                            'status' => 409, // conflict status code
                            'message' => 'Email already in use'
                        ], 409);
                    } elseif (strpos($e->getMessage(), 'api_auths_phone_unique') !== false) {
                        return response()->json([
                            'status' => 409, // conflict status code
                            'message' => 'Phone number already in use'
                        ], 409);
                    }
                }
                return response()->json([
                    'status' => 500,
                    'message' => "Something Went Wrong"
                ], 500);
            }

        }

        
    }


    public function login(Request $request) {
        
        // Validate request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8'
        ]);

        // If validation fails, return the error messages
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()
            ], 422);
        }

        // Fetch user by email
        $user = ApiAuth::where('email', $request->email)->first();

        // If user found and password matches
        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $token
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid login credentials'
            ], 401);
        }
    }


    // public function logout() {
    //     // Get the currently authenticated user
    //     $user = ApiAuth::user();
    
    //     // Revoke the user's token
    //     $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
    
    //     return response()->json(['success' => true, 'message' => 'Logged out successfully']);
    // }

    // public function logout(Request $request) {
    //     // Get the currently authenticated user
    //     $user = ApiAuth::user();
    
    //     // Revoke the user's token
    //     $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
    
    //     return response()->json(['success' => true, 'message' => 'Logged out successfully']);
    // }

    public function logout(Request $request) {
        // Revoke the user's current token
        $request->user()->currentAccessToken()->delete();
    
        // Return a successful response
        return response()->json(['message' => 'Successfully logged out']);
    }
    
    











}
