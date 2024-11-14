import db from "../models"





export const Testing = (req,res)=>{

    db.sequelize.query(`SELECT * FROM Trucks`)
    .then((resp)=>res.status(200).json({success:true,resp}))
    .catch((err)=>res.status(500).json({success:false,error:err}))
}


export const createAdmintest = (req, res) => {
    const {
      query_type = 'insert', 
      id = null,  
      firstname = null,
      lastname = null,
      username = null,
      email = null,
      password = null,
      createdAt = null,  
      updatedAt = null  
    } = req.body;
  
  
      
      const hashedPassword =  bcrypt.hash(password, 10);
  
      db.sequelize.query(
        `CALL ManageAdmin(
        :query_type,
        :id,
        :firstname,
        :lastname,
        :username,
        :email,
        :password,
        :createdAt,
        :updatedAt)`,
        {
          replacements: {
            query_type,
            id,
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,  
            createdAt,
            updatedAt
          }
        }
      )
      .then((resp)=>res.status(200).json({ success: true, results: resp }))
    
    
  };
  