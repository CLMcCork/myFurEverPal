const fetch = require('node-fetch');
const key = process.env.PETFINDER_KEY;
const secret = process.env.PETFINDER_SECRET;
const accessToken = process.env.PETFINDER_ACCESS_TOKEN;

exports.getAnimals = (req, res, next) => {
    res.status(200).json({
        animals: [{id: '1234', type: 'Cat', description: 'Milo is a cow kitty looking for her furever home!'}] //localhost /index/animals (shows this json data in browser)
    });
};

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
            //new
            //json: true
        });
  
        const { access_token } = await tokenRes.json();
  
      
        //access the petfinder API 
        const petType = await fetch(
            `https://api.petfinder.com/v2/animals`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    //'Content-Type': 'application/x-www-form-urlencoded',
                    //json: true
                    'Content-Type': 'application/json'
                }
               
            }
        )
        //take the response from petfinder api and make it a json file 
        .then(res => res.json())
        //then stringify the data from the response 
        .then(data => {
            //console.log(data);
            // const animals = JSON.stringify(data);
            const animals = JSON.stringify(data);
            //console.log(data.animals); //prints an array of objects

            // const animals = new Animals({ data1 });
            //create a new instance of the model 
            //const animals = new Animals(); //whyyyyyyy???!!
            // console.log(animals); //prints the _id: aldsflad;fj of one 
            // const pets = data1['id'];
            // console.log(pets)
            //const pets = JSON.stringify(data.animals);
            //console.log(data);
            //console.log(data.animals)
            console.log(data.animals[0]['id']); 
            // const animals = new Animals(pets);
            // console.log(animals);
            //const pets  = data.animals;
            //console.log(pets); 
            // console.log(pets['id']); 
            //console.log(pets[0]['id', 'type'])
            //res.render('pets/index',  { animals } ); //just gives {_id: a;dkfaslldf }
            // res.render('pets/index',  { animals } ); //also try animals : data1 
           
            
            // const pets = {
            //     name: data.animals.name,
            //     id: data.animals.id,
            //     type: data.animals.type,
            //     description: data.animals.description
            // }

            // let array = data.animals;
            // for (let i = 0; i < animals.length; i++) {
            //     array[i] = animals[i]['id']
            // } 

            // console.log(array);
           
         // ******let i = 0;
             

            // let animalName = data.animals[i]['name'];
            // //console.log(typeof(animalName)) string 
            // //const animalName = data.animals['name'];
            // let animalID = data.animals[i]['id'];
            // let petType = data.animals[i]['type'];
            // // age: Number,
            // // zip: Number, //where pet is located 
            // let description = data.animals[i]['description']
            // let image = data.animals[i]['photos']


            

            //  res.status(200).json({
                // animals
                //   animals: `${animalName}, ${animalID}, ${petType}, ${description}, ${image}`
                //   animalName, animalID, petType, description
            // //     // animals: (data.animals[0]['id', 'name', 'type', 'description']) //just prints the description of one animal 
            // //     // animals: (data.animals[0].type, //this just puts whatever was last--the id prints
            // //     //             data.animals[1].id)
            //   });

            

            //res.render('pets/index', { animals });
            // res.render('pets/index',  { animals : (data.animals[0]['id']) } );
            


            //res.render('pets/index',  { animals : [`${pets}`] } );

            //THE BELOW IS WORKING THE BEST SO FAR:
             res.render('pets/index',  { animals : data.animals } );
             //res.render('pets/index',  { animals : [animalName, animalID, petType, description, image] } );
            //DON"T USE RES.RENDER and VIEWS!! 
        });
  
        
  
        //const { animals } = await petType.json();
        //KEEP below
        //const animal = await petType.json();
        //console.log(animals);
        //KEEP below
        //const animals = JSON.stringify(animal);
        // const {animals} = (JSON.stringify(animal));
       
  
        
        //KEEP below
        //console.log(animal.animals[0].id, animal.animals[0].url, animal.animals[0].type, animal.animals[0].age, animal.animals[0].gender, animal.animals[0].description)
       //^^this prints the id, url, etc for the first object in the array
       //need to figure out how to get this to display in ejs
       
       //res.render('pets/index', { animals: [{'id': id, url: url}] });
       //KEEP below
       //res.render('pets/index', { animals });
        
       
       
       //console.log(req);
       //console.log(res.data);
        //res.render('pets/index', { animals: (res.body)});
        // const data = await petType.json();
        // const newAnimals = (res.body);
        //res.render('pets/index', { animal : animals });
         //console.log(res.body);
   
   
       
    } catch (error) {
        console.log(error);
    }
 };
