var baseYield = 50,
heavyRainThreshold = 20,
lightRainThreshold = 10,
heavyRainModifer = .1,
lightRainModifer = .2,
fertilizerTypes = [
    {
        name: 'premium',
        modifier: .15
    }, {
        name: 'regular',
        modifier: .10
    }
];

function getRainfall(message, cb){
    let value = prompt(message).replace(/ /g,'');
    if(value == null || isNaN(value) || value == undefined || value === ""){
        getRainfall('Sorry, your input was incorrect. Please enter how many inches of rainfall? ex: 10 inchs is 10', cb);
    } else {
        cb(value);
    };
};

function getRainfallCount(amount){
    let value = 'Rain: ';
    for (i = 0; i < amount; i++){
        value = value + '*';
    };
    return value;
};

function usedFertilizer(message, cb){
    let value = prompt(message);
    if (value === 'yes' || value === 'no'){
        cb(value)
    } else {
        usedFertilizer('Sorry please answer yes or no. Did you use fertilizer?', cb);
    };
};

function getFertilizerType(message, cb){
    let value = prompt(message);
    let foundType = false;
    for(let i = 0; i < fertilizerTypes.length; i++){
        if(value == fertilizerTypes[i].name){
            foundType = true;
            cb(fertilizerTypes[i].modifier);
        }
    }
    if(foundType === false){
        getFertilizerType('Sorry your input was incorrect, please enter premium or regular.', cb);
    }
}

var yield = baseYield;
getRainfall('How many inches of rainfall?', function(value){
    var rainfall = value;
    console.log(getRainfallCount(rainfall));
    if(rainfall >= heavyRainThreshold){
        yield = (yield - (yield * heavyRainModifer));
    } else if (rainfall <= lightRainThreshold){
        yield = (yield - (yield * lightRainModifer));
    };

    usedFertilizer('Did you use fertilizer?', function(value){
        if( value == "yes"){
            getFertilizerType('Did you use premium or regular?', function(modifierValue){
                yield = (yield + (yield * modifierValue));
            });
        };

        console.log('The yield should be ' + yield + ' bushels per acre.');
    });
});