const express = require("express");
const cors = require("cors");
const mongoose= require('mongoose');
const Profile = require("./db/Profile")
const app = express();

app.use(express.json());
app.use(cors());

const MONGODB_URL=`mongodb+srv://skpkbro:skpkbro@cluster0.r2irbcn.mongodb.net/`;
const PORT=5000 || process.env.PORT;


app.post("/add-profile", async (req, resp) => {
    let profile = new Profile(req.body);
    console.log(profile)
    let result = await profile.save();
    resp.send(result);
});

app.get("/profile", async (req, resp) => {
    const profile = await Profile.find();
    if (profile.length > 0) {
        resp.send(profile)
    } else {
        resp.send({ result: "No Profile found" })
    }
});

app.delete("/profile/:id", async (req, resp) => {
    let result = await Profile.deleteOne({ _id: req.params.id });
    resp.send(result)
}),

    app.get("/profile/:id", async (req, resp) => {
        let result = await Profile.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "result": "No Record Found." })
        }
    })

app.put("/profile/:id", async (req, resp) => {
    let result = await Profile.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.put("/profile/:id", async (req, resp) => {
    let result = await Profile.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.get("/search/:key", async (req, resp) => {
    let result = await Profile.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})




mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    console.log("connected with the database");

    app.listen(PORT, function () {
      console.log(`the server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("met with an error!");
  });


