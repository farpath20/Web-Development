const express = require('express');
const router = express.Router();
const axios = require('axios');
router.get('/:id', async (req, res) => {
    try {
        const md5 = require('blueimp-md5');
        const publickey = 'bd892fe7a91b68fe137516545a8cd748';
        const privatekey = '818a4385f3a0d65a3623e2ddec3d3888b17a1671';
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        if(typeof req.params.id != 'string')
        {
            throw "Error: No id recieved";
        }
        const id = req.params.id;
        //https://gateway.marvel.com/v1/public/characters/1009609?ts=TS_HERE&apikey=API_KEY_HERE&hash=HASH_HERE
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
        const url = baseUrl +"/"+id+'?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        const  {data } = await axios.get(url);
        //console.log(data.data.results[0].comics.items);
        //console.log(heroes.thumbnail.path+"/potrait_xlarge"+heroes.thumbnail.extension);
        //data.data.results[0].thumbnail.path +="/portrait_xlarge."+ data.data.results[0].thumbnail.extension;
        //console.log( data.data.results[0].thumbnail.path);
        res.status(500).render('heroes/single',{heroes:data.data.results[0],titlename: data.data.results[0].name} )
    } catch (e) {
        res.status(404).render('heroes/error',{ error: `Error: Could not find the list of characters` });
    }

})
module.exports = router;