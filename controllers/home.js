module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },

    getMain: (req,res)=>{
        res.send(req.user)
    }
}
