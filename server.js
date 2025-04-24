const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const mongoose = require("mongoose");
const app = express();
//const path = require("path");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

mongoose
.connect("mongodb+srv://vfisher084:snA7PktVy1WB05BG@cluster0.ksvotal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log("Could not connect to MongoDB", error);
});

const bookSchema = new mongoose.Schema({
    isbn: Number,
    title: String,
    author: String,
    image: String,
    description: String,
    price: Number,
    format: [String],
    genre: [String],
    category: String,
    year: String,
    reviews: [String],
    rating: String,
    quantity: Number
});

const Book = mongoose.model("Book", bookSchema);

app.get("/books", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

//app.use('/images', express.static(path.join(__dirname, 'images')));


app.get("/api/books", async(req, res) => {
    const books = await Book.find();
    console.log(books);
    res.send(books);
});

app.post("/api/books", upload.single("img"), async(req,res)=>{
    const result = validateBook(req.body);

    if(result.error){
        console.log("I have an error");
        res.status(400).send(result.error.details[0].message);
        return;
    }

    console.log("I have a book");
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
    });

    console.log(req.file.filename);

    //adding image
    if(req.file){
        console.log("I have an image");
        book.image = `images/${req.file.filename}`;
    }

    const newBook = await book.save();
    res.status(200).send(book);
});

app.put("/api/books/:id", upload.single("img"), async(req,res)=> {
    /*
    const book = books.find((book)=>book._id.toString()===(req.params.id));

    if(!book){
        res.status(404).send("The book with the provided id was not found");
        return;
    }
        */
    
    const result = validateBook(req.body);
    console.log("I am in edit");

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const fieldsToUpdate = {
        title: req.body.title,
        author: req.body.author,
    }

    /*
    book.title = req.body.title;
    book.author = req.body.author;
    */

    if(req.file){
        fieldsToUpdate.image = `images/${req.file.filename}`;
    }

    // console.log("Updating book" + req.params.id);
    // console.log(fieldsToUpdate);
    
    const wentThrough = await Book.updateOne({_id:req.params.id}, fieldsToUpdate);
    const book = await Book.findOne({_id:req.params.id});

    res.status(200).send(book);
});

app.delete("/api/books/:id", async(req,res)=> {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).send(book);
    /*
    console.log("I'm trying to delete" + req.params.id);
    const book = books.find((book)=>book._id.toString()===(req.params.id));

    if(!book){
        console.log("Cannot find book");
        res.status(404).send("The book with the provided id was not found");
        return;
    }
    console.log("Found book" + book.title);
    console.log("Deleting book" + book.title);
    const index = books.indexOf(book);
    books.splice(index,1);
    */
    
});

const validateBook = (book) => {
    const schema = Joi.object({
        _id:Joi.allow(""),
        title:Joi.string().min(3).required(),
        author:Joi.string().min(3).required(),
    });
    return schema.validate(book);
}

app.listen(3001, () => {
    console.log("I'm listening");

});