

exports.isAdmin = (user)=>{
  const currentCustomClaims = !user.customClaims?false:
        user.customClaims["admin"];
  return currentCustomClaims;
};

exports.alertCollection = "alert";
