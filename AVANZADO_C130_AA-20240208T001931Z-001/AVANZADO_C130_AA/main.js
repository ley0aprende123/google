function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded(){
  console.log('Modelo cargado...');
}

function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotResults);
}

function gotResults(error,results){
  if (error) {
    console.log(error);
  } else{
    console.log(results);

    if((results[0].confidence > 0.5) && (previous_result !=results[0].label)){
console.log(results[0].label);
previous_results = results[0].label;
var synth = window.speechSynthesis;
speak_data ="El objeto detectado es" + results[0].label;
var utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);

document.getElementById("results_object_name").innerHTML = results[0].label;
document.getElementById("result_objct_accurancy").innerHTML = results[0].confidence;
    }
  }

  console.log(results);
}
