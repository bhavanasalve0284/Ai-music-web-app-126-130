song="";

scoreRightWrist = 0;
scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.centre();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modeLoaded);
    poseNet.on('pose',gotPoses)
}

function modeLoaded(){
    console.log('PoseNet Is Initialized');
}
function draw() {
    Image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreRightWrist > 0.2)
    {

    circle(rightWristX,rightWristY,20);

    if(rightWristY >0 && rightWrist <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY <= 200)
    {
        document.getWlementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY >200 && rightWrist <=300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY >400 && rightWrist <= 500)
    {
        document.getElementById("speed").innerHTML ="Speed = 2x";
        song.rate(2);
    }
}

    if(scoreLeftWrist > 0.2)
    {

    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML ="Volume = "+ volume;
    song.setVolume(volume);
    }
}

function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeft = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " +scoreLeftWrist);
        console.log("scoreLeftWrist = "+scoreLeftWrist);
        leftWristX = results(0).pose.leftWrist.x;
        leftWrist = results(0).pose.leftWrist.y;
        console.log("leftWrist = "+leftWrist+"leftWristY = "+leftWrist)

        rightWristX = results[0].pose.rightWrist.x;
        rightWrist = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX+"rightWristY = "+ rightWristY);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}