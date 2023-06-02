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




 function toggleMenu() {
    var menuList = document.getElementById('menuList');
    if (menuList.classList.contains('show')) {
        menuList.classList.remove('show');
        menuList.classList.add('hide');
        resetVisibility();
    } else {
        menuList.classList.remove('hide');
        menuList.classList.add('show');
        animateVisibility();
    }
}

function resetVisibility() {
    var menuItems = document.querySelectorAll('.menu-list li');
    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].style.opacity = 0;
    }
}

function animateVisibility() {
    var menuItems = document.querySelectorAll('.menu-list li');
    var delay = 200;
    for (var i = 0; i < menuItems.length; i++) {
        (function(item, index) {
            setTimeout(function() {
                item.style.opacity = 1;
            }, delay * (index + 1));
        })(menuItems[i], i);
    }
}