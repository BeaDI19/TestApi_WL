//pong
this.pong = (req, res) => {
    try 
    { 
        return res.json({message: "pong"});
    } 
    catch (error) {
        console.log('ping - pong failure (but API respond): ', error);
        return res.json('ping - pong failure (but API respond): ', error);
    }
}