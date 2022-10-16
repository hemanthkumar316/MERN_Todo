const express=require('express')
const router=express.Router()
const Todo=require('../Models/TODO')

//create Todo

router.post('/todo',async(req,res)=>{
 try{
  const newtodo= new Todo({
   todo:req.body.todo
  })
  console.log(newtodo)
  const savetodo=await newtodo.save()
  res.status(200).json({result:'todo is added',savetodo})
 }
 catch(err){
   res.status(500).json(err)
   console.log(err)
 }
})

// get  todo

router.get('/getdata',async(req,res)=>{
  try{
   const alldata = Todo.find();
   return res.json(await alldata)
  }
  catch(err){
    res.status(500).json(err)
    console.log(err)
  }
 })


//delete todo

router.delete("/todo/:id",async(req,res)=>{
  try{
 let todoId=req.params.id
    todo= await Todo.findByIdAndDelete(todoId)
 res.status(200).json({result:"todo is  deleted "})
  }
  catch(err){
console.log(err)
return res.status(500).json(err)
  }
})

//update todo


router.put('/todo/:id', async (request , response) => {
  let todoId = request.params.id;
  try {
      let updatedtodo = {
          todo : request.body.todo,
          
      };
      //  check todo is exists or not
         let  todo = await Todo.findById(todoId);
      if(!todo){
          return response.status(401).json({
              msg : 'No Todo Found'
          });
      }
      // update
      todo= await Todo.findByIdAndUpdate(todoId , {
          $set : updatedtodo
      }, { new : true});
      response.status(200).json({
          result : 'todo is Updated',
          todo : todo
      });
  }
  catch (err) {
      console.error(err);
      response.status(500).json({
          msg : err.message
      });
  }
});


module.exports=router