const express = require('express');
const router = express.Router();
const axios = require('axios');
router.post('/', async (req, res) => {
    try {
        const md5 = require('blueimp-md5');
        const publickey = 'bd892fe7a91b68fe137516545a8cd748';
        const privatekey = '818a4385f3a0d65a3623e2ddec3d3888b17a1671';
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        //https://gateway.marvel.com/v1/public/characters?nameStartsWith=SEARCH_TERM_HERE&limit=20&ts=TIME_STAMP_HERE&apikey=API_KEY_HERE&hash=HASH_HERE
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
        let hero = req.body.searchTerm;
        if(typeof hero!= "string")
        {
          throw "Error: Was not given a character";
        }
        hero = hero.trim();
       
        
        if(hero.length==0)
        {
          return res.render('heroes/error',{ error: `Error: sent a empty string` });

        }
        
        const url = baseUrl + '?nameStartsWith='+hero+'&limit=20&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

        const  {data } = await axios.get(url);
        
        if(data.data.results.length==0)
        {
          return res.render('heroes/notfound',{searchTerm:hero});
        }
        res.status(500).render('heroes/search',{heroes:data.data.results,titlename:"Character Found"})
    } catch (e) {
      res.status(404).render('heroes/error',{ error: `Error: Could not find the character.`});
    }
  });



module.exports = router;