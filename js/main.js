var jobTitles = ['Front-end','Web', 'Mobile'];
var currentJobTitleIndex = 0;

function typeJobTitle(element, text, callback) {
    var currentText = '';
    var currentIndex = 0;
    var space = "&nbsp;&nbsp;";

    var intervalId = setInterval(function() {
        if (currentIndex < text.length) {
            currentText += text[currentIndex];
            element.innerHTML = currentText + space;
            currentIndex++;
        } else {
            clearInterval(intervalId);
            callback();
        }
    }, 100);
}

function changeJobTitle() {
    var jobTitleElement = document.getElementById('job-title');
    var nextJobTitle = jobTitles[currentJobTitleIndex];

    typeJobTitle(jobTitleElement, nextJobTitle, function() {
        setTimeout(function() {
            currentJobTitleIndex = (currentJobTitleIndex + 1) % jobTitles.length;
            changeJobTitle();
        }, 3000);
    });
}

$(window).on("load", function(){
    changeJobTitle();
 });

