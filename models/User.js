
 const { model, Schema } = require('mongoose');

 const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      minlength:3,
      maxlength:20
    },
    email:{
      type: String,
      required: true,
      validate:{
         validator: function(v){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
         },
         message: prop => `Invalid email address: ${prop.value}`
      }
    },
    password: {
      type:String,
      minlength:[6, "Password must be at least 6 characters"],
      required:true
    },
    roles:{
      type: [String],
      required:true,
      default:['Student']
    },
    accountStatus:{
      type: String,
      enum:["PENDING","ACTIVE", "REJECTED" ],
      default:"PENDING",
      required:true,
    },
 });

 const User = model('User', userSchema);

 module.exports = User;