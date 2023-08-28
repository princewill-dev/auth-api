<?php

namespace App\Http\Controllers;

use App\Models\ApiAuth;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
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
            


            // try {
            //     $user = ApiAuth::create([
            //         'name' => $request->name,
            //         'email' => $request->email,
            //         'phone' => $request->phone,
            //         'password' => bcrypt($request->password),
            //     ]);
            
            //     $token = $user->createToken('authToken')->plainTextToken;
            
            //     return response()->json([
            //         'status' => 200,
            //         'success' => true,
            //         'user' => $user,
            //         'token' => $token,
            //         'message' => "Account created successfully"
            //     ], 200);
                
            // } catch (\Illuminate\Database\QueryException $e) {
            //     $errorCode = $e->errorInfo[1];
            //     if($errorCode == 1062){
            //         return response()->json([
            //             'status' => 409, // conflict status code
            //             'message' => 'Email already in use'
            //         ], 409);
            //     }
            //     return response()->json([
            //         'status' => 500,
            //         'message' => "Something Went Wrong"
            //     ], 500);
            // }

            // $user = ApiAuth::create([
            //     'name' => $request->name,
            //     'email' => $request->email,
            //     'phone' => $request->phone,
            //     'password' => bcrypt($request->password),
            // ]);

            // $token = $user->createToken('authToken')->plainTextToken;

            // if($user) {

            //     return response()->json([
            //         'status' => 200,
            //         'success' => true,
            //         'user' => $user,
            //         'token' => $token,
            //         'message' => "Account created successfully"
            //     ],200);

            // } else {
            //     return response()->json([
            //         'status' => 500,
            //         'message' => "Something Went Wrong"
            //     ],500);
            // }

        }

    }
}
