const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const Issue = require("../models/issue");





router.post("/addBook", async (req, res) => {

   const { title,author,publisher,year,copies } = req.body ;
     console.log("req.body",req.body)
    if(req.body._id){
        const obj = await Issue.find({_id:req.body._id})
        obj[0].isRecom = false 
        await obj[0].save()
    }
    const book = await new Book({ title,author,publisher,year,copies})
    await book.save()

    // const book = new Book({
    //     title,author,publisher,year,copies
    // })
    // book.save().then(result => {
    //     res.status(201).json({
    //         message: "Done upload!",
            
    //     })
    // }).catch(err => {
    //     console.log(err),
    //         res.status(500).json({
    //             error: err
    //         });
    // })
 
})
router.get("/allBook", (req, res) => {
    Book.find().sort({ createdAt: -1 }).then(data => {
        res.status(200).json(
           data
        );
    });
});

router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;