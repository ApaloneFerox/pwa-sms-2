document.addEventListener(
  'DOMContentLoaded',
   (event) => {
      //the event occurred
      keyboard = document.querySelector("#keyboard-button");
      sendBtn = document.querySelector("#send-button");
      message = document.querySelector("#message p");
      restartBtn = document.querySelector("#restart-button");
      theBody = document.querySelector("body");

      keyboard.addEventListener("touchend", keyboardHandler, false);
      sendBtn.addEventListener("touchend", sendHandler, false);
      restartBtn.addEventListener("touchend", restartHandler, false);

      featToScrean();
      init();
  }
)

  // L'ANIMATION :

  // ---
  var text1 = "Quand tu sortiras de la bibliothèque, sache que tu dors dans le salon. Y' a un de mes élèves qui squatte ta chambre !!",
      text2 = "Combien ils te payent, déjà, pour pas dormir ??",
      keyboard,
      restartBtn,
      message,
      theBody,
      step=1,
      tmp=0,
      actualText = text1,
      nextStep=false;
  // ---


  function init(){
    step=1,
    tmp=0,
    actualText = text1,
    nextStep=false;
    message.innerHTML = "|";
    theBody.classList.add("step1");
    theBody.classList.remove("step2");
    theBody.classList.remove("sended");
    keyboard.classList.remove("hidden");
  }

  function restartHandler(e){
    e.preventDefault();
    e.stopPropagation();

    if(!nextStep){
      init();
      theBody.classList.remove("step1");
      theBody.classList.remove("step2");
      theBody.classList.add("step1");
    }else{
      switch (step) {
        case 1:
          step=2;
          tmp=0;
          actualText = text2;
          nextStep=false;
          theBody.classList.remove("step1");
          theBody.classList.remove("sended");
          theBody.classList.add("step2");
          keyboard.classList.remove("hidden");
          break;
        case 2:
          init();
          break;
        default:

      }
    }

  }


  function keyboardHandler(e){
    e.preventDefault();
    e.stopPropagation();

    var totalCarc = actualText.length;
    if(tmp<totalCarc+1){
      tmp++;
      var newText = actualText.substr(0, tmp)+"|";
      message.innerHTML = newText;
    }else{
      keyboard.classList.add("hidden");
      nextStep = true;
    }
  }

  function sendHandler(e){
    e.preventDefault();
    e.stopPropagation();

    if(nextStep){
      message.innerHTML = "|";
      theBody.classList.add("sended");
    }

  }



  function featToScrean(){
    var availableHeight = getWindowHeight(),
        availableWidth = getWindowWidth(),
        contentWidth = 375,
        contentHeight = 667,
        scale = Math.min(
          availableWidth / contentWidth,
          availableHeight / contentHeight),
        theBody,
        translatex;
    translatex = -((availableWidth - availableWidth*scale)/2 + 3);
    theBody = document.querySelector("body");
    if(scale>=1){
        translatex = 0;
        scale=1;
    }
    theBody.style.transform="scale("+scale+") translateX("+translatex+"px)";
  }

  // RECUPERATION WIDTH - HEIGHT DU DEVICE :
    function getWindowHeight() {
      var windowHeight=0;
      if (typeof(window.innerHeight)=='number') {
          windowHeight=window.innerHeight;
      } else {
          if (document.documentElement&& document.documentElement.clientHeight) {
              windowHeight = document.documentElement.clientHeight;
          } else {
              if (document.body&&document.body.clientHeight) {
                  windowHeight=document.body.clientHeight;
              }
          }
      }
      return windowHeight;
  }
  function getWindowWidth() {
   var windowWidth=0;
   if (typeof(window.innerWidth)=='number') {
    windowWidth=window.innerWidth;
      } else {
    if (document.documentElement&& document.documentElement.clientWidth) {
     windowWidth = document.documentElement.clientWidth;
          } else {
     if (document.body&&document.body.clientWidth) {
      windowWidth=document.body.clientWidth;
              }
          }
      }
   return windowWidth;
  }
