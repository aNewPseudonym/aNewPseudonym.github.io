function setup() {
    var canvas = createCanvas(windowWidth-50, windowHeight-50);
    canvas.position(25,25);
    canvas.style('z-index', '-1')

    var mgr = new SceneManager();
    mgr.wire();
    mgr.showScene( Walkers );

}

function windowResized(){
    resizeCanvas(windowWidth-50, windowHeight-50);
    background('#FFFFFF');
}

function SineWaves() {

    count = 0.0;
    a = 0.0;
    inc = 0.0;
    y = 0
    loopCount = 0;

    this.setup = function(){
        background('#FFFFFF');

        inc = TWO_PI / 100.0;
        y = random(height);
    }

    this.draw = function() {
        stroke('#7B7FBD');
        strokeWeight(.5);
        noFill();
        if(count < (width/2 + 140)){
            if(count%4 == 0){
                ellipse(count*2 - 70, y + sin(a) * 50.0, 150.0);
            }
            a += inc;
            count += 2;
        } else {
            count = 0;
            a = random(TWO_PI);
            y = random(height);
            loopCount += 1;
            if(loopCount > 2){
                background('#FFFFFF');
                loopCount = 0;
                this.sceneManager.showScene( Walkers );
            }
        }
        
    }
}

class Walker {
    constructor (posX, posY){
        this.position = createVector(posX,posY);
        this.prevPos = createVector(posX,posY);
        this.velocity = createVector(random(-2, 2),random(-2, 2));
    }

    update(){
        this.velocity.x += map(noise(this.position.x * 0.005, this.position.y * 0.005), 0, 1, -1, 1);
        this.velocity.y += map(noise(this.position.y * 0.005, this.position.x * 0.005), 0, 1, -1, 1);

        /*
        if(this.velocity.x > 1){this.velocity.x = 1}
        if(this.velocity.x < -1){this.velocity.x = -1}
        if(this.velocity.y > 1){this.velocity.y = 1}
        if(this.velocity.y < -1){this.velocity.y = -1}
        */

        this.prevPos.set(this.position);
        this.position.add(this.velocity);
    }

    draw(){
        stroke('#7B7FBD');
        strokeWeight(0.5);
        noFill();
        line(this.prevPos.x, this.prevPos.y, this.position.x, this.position.y);
    }
}

function Walkers() {
    var walkerArray;
    var start;

    this.setup = function(){
        reset();
    }

    this.draw = function() {
        walkerArray.forEach( walker => {
            walker.update();
            walker.draw();
        });

        if(millis() - start > 5000){
            reset();
        }
    }

    function reset (){
        background('#FFFFFF');
        start = millis();

        randomSeed(millis());
        noiseSeed(millis());

        walkerArray = [];
        var x = random(width/2 - 200, width/2 + 200)
        var y = random(height/2 - 200, height/2 + 200)
        for(i = 0; i < 133; i++){
            walkerArray.push(new Walker(x, y));
        }
    }
}
