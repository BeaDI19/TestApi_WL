//pong
this.pong = (req, res) => {
    try 
    { 
        return res.json('pong');
    } 
    catch (error) {
        console.log('ping - pong failure (but API respond): ', error);
        return res.json('ping - pong failure (but API respond): ', error);
    }
}

//autre route pour l'api
//TODO faire les routes...