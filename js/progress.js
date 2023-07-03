var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var DOM = {
    timeline: "timeline",
    timelineStepper: "timeline__stepper",
    timelineStep: "timeline__step",
    timelineStepTitle: "timeline__step-title",
    timelineStepActive: "is-active",
    timelineStepActiveMarker: "timeline__step-active-marker",
    timelineSlidesContainer: "timeline__slides",
    timelineSlide: "timeline__slide",
    timelineSlideActive: "is-active",
};
var STEP_ACTIVE_MARKEP_CUSTOM_PROPS = {
    width: "--slide-width",
    posX: "--slide-pos-x",
    posY: "--slide-pos-y",
};
var SLIDES_CONTAINER_CUSTOM_PROPS = {
    height: "--slides-container-height",
};
var timeline = document.querySelector(".".concat(DOM.timeline));
var timelineStepper = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(".".concat(DOM.timelineStepper));
var timelineStepTitle = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(".".concat(DOM.timelineStepTitle));
var timelineSlidesContainer = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(".".concat(DOM.timelineSlidesContainer));
var timelineSlides = timeline && Array.from(timeline.querySelectorAll(".".concat(DOM.timelineSlide)));
window.addEventListener("load", function () {
    createStepActiveMarker();
    activateCurrentSlide();
});
window.addEventListener("resize", function () {
    recalcStepActiveMarkerProps();
});
timeline === null || timeline === void 0 ? void 0 : timeline.addEventListener("click", function (event) {
    var target = event.target;
    if (!target ||
        !(target instanceof Element) ||
        !target.closest(".".concat(DOM.timelineStep))) {
        return;
    }
    var currentStep = target.closest(".".concat(DOM.timelineStep));
    if (!currentStep) {
        return;
    }
    deactivateSteps();
    activateCurrentStep(currentStep);
    recalcStepActiveMarkerProps();
    deactivateSlides();
    activateCurrentSlide();
});
function deactivateSteps() {
    var steps = document.querySelectorAll(".".concat(DOM.timelineStep));
    steps === null || steps === void 0 ? void 0 : steps.forEach(function (elem) { return elem.classList.remove("".concat(DOM.timelineStepActive)); });
}
function activateCurrentStep(currentStep) {
    currentStep === null || currentStep === void 0 ? void 0 : currentStep.classList.add("".concat(DOM.timelineStepActive));
}
function deactivateSlides() {
    timelineSlides === null || timelineSlides === void 0 ? void 0 : timelineSlides.forEach(function (elem) {
        return elem.classList.remove("".concat(DOM.timelineSlideActive));
    });
}
function activateCurrentSlide() {
    var currentSlide = getCurrentSlide();
    if (!currentSlide) {
        return;
    }
    var currentSlideHeight = getCurrentSlideHeight(currentSlide);
    setSlideContainerHeight(currentSlideHeight);
    currentSlide.classList.add("".concat(DOM.timelineSlideActive));
}
function createStepActiveMarker() {
    var stepActiveMarker = document.createElement("div");
    stepActiveMarker.classList.add("".concat(DOM.timelineStepActiveMarker));
    timelineStepper === null || timelineStepper === void 0 ? void 0 : timelineStepper.appendChild(stepActiveMarker);
    var positionProps = getStepActiveMarkerProps();
    if (!positionProps) {
        return;
    }
    setStepActiveMarkerProps(__assign({ stepActiveMarker: stepActiveMarker }, positionProps));
}
function recalcStepActiveMarkerProps() {
    var stepActiveMarker = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(".".concat(DOM.timelineStepActiveMarker));
    var stepActiveMarkerProps = getStepActiveMarkerProps();
    if (!stepActiveMarkerProps) {
        return;
    }
    setStepActiveMarkerProps(__assign({ stepActiveMarker: stepActiveMarker }, stepActiveMarkerProps));
}
function setStepActiveMarkerProps(_a) {
    var stepActiveMarker = _a.stepActiveMarker, posX = _a.posX, posY = _a.posY, width = _a.width;
    stepActiveMarker.style.setProperty("".concat(STEP_ACTIVE_MARKEP_CUSTOM_PROPS.width), "".concat(width, "px"));
    stepActiveMarker.style.setProperty("".concat(STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posX), "".concat(posX, "px"));
    if (typeof posY === "number") {
        stepActiveMarker.style.setProperty("".concat(STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posY), "".concat(posY, "px"));
    }
}
function getStepActiveMarkerProps() {
    var currentStep = getCurrentStep().currentStep;
    if (!currentStep) {
        return null;
    }
    var width = getElementWidth(currentStep);
    var posX = getStepActiveMarkerPosX(currentStep);
    var posY = getStepActiveMarkerPosY();
    if (typeof posX !== "number" || typeof posY !== "number") {
        return null;
    }
    return { posX: posX, posY: posY, width: width };
}
function getCurrentStep() {
    var timelineSteps = Array.from(document.querySelectorAll(".".concat(DOM.timelineStep)));
    var currentStep = timelineSteps.find(function (element) {
        return element.classList.contains("".concat(DOM.timelineStepActive));
    });
    var currentStepIndex = currentStep &&
        timelineSteps.findIndex(function (element) {
            return element.classList.contains("".concat(DOM.timelineStepActive));
        });
    return { currentStep: currentStep, currentStepIndex: currentStepIndex };
}
function getCurrentSlide() {
    var currentStepIndex = getCurrentStep().currentStepIndex;
    if (typeof currentStepIndex !== "number" || !timelineSlides) {
        return null;
    }
    return timelineSlides[currentStepIndex];
}
function setSlideContainerHeight(height) {
    timelineSlidesContainer === null || timelineSlidesContainer === void 0 ? void 0 : timelineSlidesContainer.style.setProperty("".concat(SLIDES_CONTAINER_CUSTOM_PROPS.height), "".concat(height, "px"));
}
function getCurrentSlideHeight(currentSlide) {
    return currentSlide.clientHeight;
}
function getStepActiveMarkerPosY() {
    var timelineTitlePosY = timelineStepTitle === null || timelineStepTitle === void 0 ? void 0 : timelineStepTitle.getBoundingClientRect().top;
    var timelineStepperPosY = timelineStepper === null || timelineStepper === void 0 ? void 0 : timelineStepper.getBoundingClientRect().top;
    if (!timelineTitlePosY || !timelineStepperPosY) {
        return null;
    }
    return timelineTitlePosY - timelineStepperPosY;
}
function getStepActiveMarkerPosX(currentStep) {
    var timelineStepperPosX = timelineStepper === null || timelineStepper === void 0 ? void 0 : timelineStepper.getBoundingClientRect().left;
    var currentStepPosX = currentStep.getBoundingClientRect().left;
    if (!timelineStepperPosX) {
        return null;
    }
    return currentStepPosX - timelineStepperPosX;
}
function getElementWidth(elem) {
    return elem.clientWidth;
}
