const {db} = require("./admin");
exports.getTeachers = (req, res, next)=>{
  (async ()=>{
    try {

      

      const query = db.collection("teachers");
      const response = [];

      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          response.push(doc.data());
        }
      });

      return res.status(200).json({
        "statusCode": 200,
        "message": "fetch successfully",
        "response": response
      });
    } catch (error) {
      return res.status(500).json({
        "statusCode": error.statusCode,
        "message": error.message,
      });
    }
  })();
};
