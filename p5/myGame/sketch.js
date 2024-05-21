count = 0.0;
a = 0.0;
inc = 0.0;
y = 0
loopCount = 0;


function setup() {
    var canvas = createCanvas(windowWidth-50, windowHeight-50);
    background('#FFFFFF');
    inc = TWO_PI / 100.0;
    y = random(height);
}

function draw() {
    stroke('#7B7FBD');
    strokeWeight(.5);
    noFill();

    if(count < (width/2)){
        if(count%4 == 0){
            ellipse(count*2, y + sin(a) * 50.0, 150.0);
        }
        a += inc;
        count += 2;
    } else {
        count = 0;
        a = random(TWO_PI);
        y = random(height);
        loopCount += 1;
        if(loopCount > 7){
            background('#FFFFFF');
            loopCount = 0;
        }
    }
    
}

function windowResized(){
    resizeCanvas(windowWidth-50, windowHeight-50);
    background('#FFFFFF');
}