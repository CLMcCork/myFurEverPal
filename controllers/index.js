const fetch = require('node-fetch');
const key = process.env.PETFINDER_KEY;
const secret = process.env.PETFINDER_SECRET;
const accessToken = process.env.PETFINDER_ACCESS_TOKEN;
const Animals = require('../models/animals');
// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window ); 
//testing
// const changeColor = require('../public/javascripts/changeColor');

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
            //`https://api.petfinder.com/v2/animals`,
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
         
        //THIS HELPS w/ UNDERSTANDING THE DATA!!
        // Object.entries(data).map(data => {
        //     const key   = data[0]; //animals
        //     const value = data[1]; //array of all the objects 
        //     const dunno = data[1][1];
        //    //console.log(key);
        //    //console.log(value);
        //    console.log(dunno); //prints [1] item in the array and undefined 
        //  });
        
        console.log(data.animals[0].id) //prints animal [0]'s id
            //const animals = JSON.stringify(data);
            res.render('pets/index',  { animals : data.animals });
        });

    

    //catch if any errors  
    } catch (error) {
        console.log(error);
    }

    next(); //do i need to call next?
 };


 //display next image 

 


 exports.getNextPet = async (req, res, next) => {
    //onclick of arrow, redirect to getPetFinder
    //const html = res.render({ arrowButton: "getNexPetFunction();"})
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
                //`https://api.petfinder.com/v2/animals`,
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
             
                res.render('pets/index',  { animals : data.animals });
            });
    
        
    
        //catch if any errors  
        } catch (error) {
            console.log(error);
        }
    
        next(); //do i need to call next?
     };


//sends the R click animal info to the View Matches show page
exports.swipeRight = async (req, res) => {
    let matches = [];
    let newmatches = matches.push(req.animals);
    
    //console.log(res);
    // console.log(matches);
    // console.log(newmatches); 


    //maybe in index.ejs, make link to getNextPetR and getNextPetL depending on the arrow clicked ,
    //then create functions for these in the the controllers file 
    //then push onto the swipeR array the item 
    //then in viewMatches, can res.render swipeRight matches 

    
    //for each swipe right click, push the animal photo (for now just photo--eventualy other details)
    //into the array 
    //then view the next pet (getNextPet)

    //res.redirect('/getnextpet');
};
   

//on click of "View Matches" button, render the view matches page 
exports.viewMatches = async (req, res) => {
    res.render('pets/viewmatches');
     //res.send("you made it!")
}; 


//TESTING 
exports.submitData = (req, res) => {
    const animal = new Animals;
    const name = req.body.firstName; 
    animal.save();
    console.log(animal.description);
    console.log(name);
    res.redirect('/getnextpet')
};


//******** */
//what if, instead of getting whole animals object in export getPetFinder, just got the pet photos object?
//then in ejs --loop over and show the first one only
//then when click on slider can add that photo to results page or notresults page and 
//call the function to viewNextPet (which just loops throught the array of photos that 
//have been called from animals)




