const fetch = require('node-fetch');
const key = process.env.PETFINDER_KEY;
const secret = process.env.PETFINDER_SECRET;
const accessToken = process.env.PETFINDER_ACCESS_TOKEN;

//delete this eventually 
exports.getAnimals = (req, res, next) => {
    res.status(200).json({
        animals: [{id: '1234', type: 'Cat', description: 'Milo is a cow kitty looking for her furever home!'}] //localhost /index/animals (shows this json data in browser)
    });
};

//delete this eventually--
exports.postAnimals = (req, res, next) => {
    const id = req.body.id;
    const type = req.body.type;
    const description = req.body.description;
    //create post in the db
    res.status(201).json({
        message: 'Animal created successfully',
        animals: { id: new Date().toISOString(), id: id, type: type, description: description }
    });
};

exports.getPetFinder = async (req, res, next) => {
    try {
        const tokenRes = await fetch('https://api.petfinder.com/v2/oauth2/token', {
            method: 'POST',
            body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
  
        const { access_token } = await tokenRes.json();
  
        //access the petfinder API 
        const petType = await fetch(
            `https://api.petfinder.com/v2/animals/?limit=1`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        
        //take the response from petfinder api and make it a json 
        .then(res => res.json())
        
        //then stringify the data from the response 
        .then(data => {
            const animals = JSON.stringify(data);
            res.render('pets/index',  { animals : data.animals });
        });

    //catch if any errors  
    } catch (error) {
        console.log(error);
    }
 };


 //display only 1 image 
 exports.postImage = (req, res, next) => {
     
 }