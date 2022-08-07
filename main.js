objects = [];
video = "";
status = "";

function setup(){
    var canvas = createCanvas(500, 500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();
}

function draw(){
    image(video, 0, 0, 500, 500);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("objects_status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "The number of objects that are found are : " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == object_name){
                
            }
            synth = window.speechSynthesis;
            speak_data = objects[i].label;
        }
    }
}
var previous_result = ''; 

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("object_status").innerHTML = object_name + "Found";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(3);
    video.volume(0);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    } else {
        console.log(results);
        previous_result = objects[i].label;
        var synth = window.speechSynthesis;
        speak_data = 'Object detected is a -'+ objects[i].label;
        var utterThis =  new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    }
    objects = results;
}