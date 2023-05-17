const express = require("express");

const auth = require("../middleware/auth");
const { admin, editor, viewer } = require("../middleware/rols");

//dummy data again, this would normally be the database
let messages = [{ id: 1, name: "Lorem ipsum", content: "lorem ipsum dolor sit amet"}];

//setup the router
const router = express.Router();

//setup the route hnadlers
//auth and viewer are the middleware functions that are run before callback
//auth will authenticate the user, and if it is valid, it will return one user type
router.get("/", [auth, viewer], (req,res) =>{
    res.send({
        ok: true,
        result: messages
    });
}).post("/", [auth, editor], async (req,res) => {
    //make a new message and add it. this would normally be  database, but here it's a local array
    messages.push({ id: messages.length+1, name: req.body.name, content: req.body.content });

    //send a response
    res.status(200).send({
        ok:true,
        result: messages
    });
}).put("/", [auth, editor], async (req,res) => {
    //update the message, not implemented
    res.status(200).send({
        ok: true,
        result: messages
    });
}).delete("/", [auth, admin], async (req, res) => {
    //delete the msg
    messages = messages.filter((message) => { message.id !== req.body.id});

    //send a response
    res.status(200).send({
        ok: true,
        result: messages
    });
});

module.exports = router;

