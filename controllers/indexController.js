//getAll categories
const pong = async (req, res) => {
    try 
    { 
        res.status(200).send("pong");
    } 
    catch (error) {
        console.log('ping - pong failure (but API respond): ', error);
    }
}