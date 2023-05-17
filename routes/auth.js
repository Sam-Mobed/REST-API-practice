//json web tokens (JWT)
//used for authorization, not authentication
//authentication: taking in username and password and checking them
//authorization: the user sending requests to your server is the same 
//as the one that logged in during authentication
//JWT is used insted of web cookies (that contain sessionID and other info)
//https://www.youtube.com/watch?v=7Q17ubqLfaM 

//import JWT dependencies
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");

//setup the router
const router = express.Router();

//on post, we make the sign in information
//you put in an email and a password, and that will give you a token, that will 
//be valid for 15 minutes. there are three user levels: admin, user and editor.
//you need to have viewer and editor roles as well if you're an admin, not as solid.
router.post("/", async (req, res) => {
    //normally this login data would come from a database, but here we have dummy data
    const users = [{ email: "sam@email.com", password: "abcd", roles: ["admin", "editor", "viewer"] }];

    //get the user from the database, return error if it's not there
    let user = users.find(u => u.email === req.body.email);
    if (!user) throw new Error("Invalid email.");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign({
        id: user._id,
        roles: user.roles,
    }, "jwtPrivateKey", { express: "15m" });

    res.send({
        ok: true,
        token: token
    });
});

//note: in js, = assigns value to variables. == compares values for 
//equality, and it performs type coercion (different types converted)
//to the same type to check equality (5 == "5").
//=== also checks for equality, but doesn't perform type coercion
//for arrays and objects, == and === check if the references are the same