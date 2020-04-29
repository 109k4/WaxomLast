$(document).ready(function(){
    // color picker---------------------------------------
    
    // autorization menus----------------------------------
    $('.authorization').click(function(){
        $('.authorization__menu').slideToggle('fast');
        $('.authorization__menu').css("display", "flex");
    });
    $('body').click(function(){
        if($('.authorization__menu').css("height") == "100px"){
            $('.authorization__menu').slideUp('fast');
        }
    });
    // Components and Flask ----------------------------------------------------------
    //Component color and numbers
    // let colors = Array.from(document.getElementsByClassName('component__color'));
    let numbers = Array.from(document.getElementsByClassName('component__number'));
    // // display colors
    // colors.forEach(function(color){
    //     let val = color.innerText;
    //     color.style.backgroundColor = val;
    // });
    // display numbers
    numbers.forEach(function(number, i){
        number.innerText = i+1;
    });
    // scale-----------------------
let addButtons = Array.from(document.getElementsByClassName('add'));
let removeButtons = Array.from(document.getElementsByClassName('remove'));

let scl = $('.flask__scale');


// add button
addButtons.forEach(function(elem){
 elem.addEventListener('click', event => {
    let f = elem.closest(".component");
    // value
    let valDiv = f.querySelector('.component__value');
    let val = valDiv.value;
    // color
    let colorDiv = f.querySelector('.pcr-button');       //???
    let color = colorDiv.style.color;
    // number
    let numberDiv = f.querySelector('.component__number');
    let number = numberDiv.innerText;
    // name
    let nameDiv = f.querySelector('.component__name');
    let name = nameDiv.innerText;

        let stringValid = true;
        if(val == "%" || isNaN(Number(val.slice(0, -1))) || val.slice(-1) !== "%" || val.slice(-1) == ""||val == ""){
            stringValid = false;
        }

if(stringValid){                                                               //test string if(for click)
    valDiv.style.backgroundColor = "white";

        let validator = true;
        let flaskSize = 0;
    
        let sclElements = Array.from(document.querySelectorAll('.flask__scale>div'));
        sclElements.forEach(function(elem){
            // flask size 
            counter = Number(elem.style.height.slice(0, -1));
            flaskSize = flaskSize + counter;
            // validation
            ID = elem.id;
            
            if(ID == number){
                validator = false;
            }
        });
        let valNumber = Number(val.slice(0, -1));
            if((flaskSize+valNumber) > 100){
                validator = false;
            }
        // adding elem on click
        if(validator == true){
            
            f.querySelector('.remove').style.display = "flex";
            elem.style.display = "none";
            f.style.backgroundColor = "rgb(216, 214, 209)";
            scl.prepend('<div style="height:'+val+'; background-color: '+color+';" id="'+number+'" class="scale-elem"><div class="hovering-elem"><div class="hovering-line"><div class="hovering-name"><div class="specialDiv">'+name+'</div></div></div></div>');
            
            valDiv.style.backgroundColor = "white";

            document.getElementById('scaleValue').innerText = flaskSize+valNumber;
        }
        if((flaskSize+valNumber) > 100){
            valDiv.style.backgroundColor = "white";
        }
   
    }
    else{                                                            //test string else(for click)
        valDiv.style.backgroundColor = "red";
    }  
    
    });
    // updating elem with input change
    let f = elem.closest(".component");
    let valDiv = f.querySelector('.component__value');
    
    valDiv.addEventListener('input', () => iChange(f));
});
// remove button
removeButtons.forEach(function(elem){
    elem.addEventListener('click', event => {
        let f = elem.closest(".component");

        let valDiv = f.querySelector('.component__value');
        valDiv.style.backgroundColor = "white";

        // number
        let numberDiv = f.querySelector('.component__number');
        let number = numberDiv.innerText;
        
        f.querySelector('.add').style.display = "flex";
        elem.style.display = "none";
        let blockNeedRemove = scl.find("#"+number);
        blockNeedRemove.remove();
        f.style.backgroundColor = "white";

        // flask size 
        let flaskSize = 0;
        let sclElements = Array.from(document.querySelectorAll('.flask__scale>div'));
        sclElements.forEach(function(elem){
            
            counter = Number(elem.style.height.slice(0, -1));
            flaskSize = flaskSize + counter;
        });

        document.getElementById('scaleValue').innerText = flaskSize;  
    });
});
// visibiliti hidden before load js-------------------------------------------------------------------
$('.components').css("visibility", "visible");
$('.flask-wrraper').css("visibility", "visible");

// color picker--------------------------------------------------------------------------------------
let components = Array.from(document.getElementsByClassName('component'));

components.forEach(function(component){
    // color
    let cl = component.querySelector('.component__color');
    let clVal = cl.innerText;
       // number
       let numberDiv = component.querySelector('.component__number');
       let number = numberDiv.innerText;


       let Pi = component.querySelector('.picker-wrraper');

        const pickr = Pickr.create({
            el: Pi,
            theme: 'nano', // style
            showAlways: false,
            default: clVal,
        
            swatches: [
                'rgba(244, 67, 54, 1)',
                'rgba(233, 30, 99, 0.95)',
                'rgba(156, 39, 176, 0.9)',
                'rgba(103, 58, 183, 0.85)',
                'rgba(63, 81, 181, 0.8)',
                'rgba(33, 150, 243, 0.75)',
                'rgba(3, 169, 244, 0.7)',
                'rgba(0, 188, 212, 0.7)',
                'rgba(0, 150, 136, 0.75)',
                'rgba(76, 175, 80, 0.8)',
                'rgba(139, 195, 74, 0.85)',
                'rgba(205, 220, 57, 0.9)',
                'rgba(255, 235, 59, 0.95)',
                'rgba(255, 193, 7, 1)'
            ],
        
            components: {
        
                // Main components
                preview: true,
                opacity: true,
                hue: true,
        
                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: true,
                    hsla: true,
                    hsva: true,
                    cmyk: true,
                    input: true,
                    clear: false,
                    save: false
                }
            }
        });

        let elemenNeedRepaint;
        let panel = component.querySelector('.pcr-button');

        pickr.on('change', instance => {
            let c = instance.toRGBA();
            
            panel.style.color = "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";

            elemenNeedRepaint =  document.getElementById(number);
            elemenNeedRepaint.style.backgroundColor = "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";  
        });

});
// main functions -----------------------------------------------------------------------------
// when input change
function  iChange (f){
     // value
     let valDiv = f.querySelector('.component__value');
     let val = valDiv.value;
     // color
    let colorDiv = f.querySelector('.component__color');
    let color = colorDiv.innerText;
    // number
    let numberDiv = f.querySelector('.component__number');
    let number = numberDiv.innerText;

    stringValid = true;
    if(val == "%" || isNaN(Number(val.slice(0, -1))) || val.slice(-1) !== "%" || val.slice(-1) == ""||val == ""){
        stringValid = false;
    }

if(stringValid){                                                   //test string if(for input)
    valDiv.style.backgroundColor = "white"; 

    let valNumber = Number(val.slice(0, -1));
    
    let valEfR = document.getElementById(number);
    let elemForRefresh = Number(valEfR.style.height.slice(0, -1));

      let sclElements = Array.from(document.querySelectorAll('.flask__scale>div'));
      let flaskSize = 0;
    sclElements.forEach(function(elem){
        let counter = Number(elem.style.height.slice(0, -1));
        flaskSize = flaskSize + counter;
    });
    
      if((flaskSize + valNumber - elemForRefresh) <= 100){
        scl.find('#'+number).attr('style', 'height:'+val+'; background-color: '+color+';" ');
        valDiv.style.backgroundColor = "white";

        document.getElementById('scaleValue').innerText = flaskSize+valNumber-elemForRefresh;

        valDiv.style.backgroundColor = "white";
      }
      else{
        valDiv.style.backgroundColor = "orange";
      }
}
else{
    valDiv.style.backgroundColor = "red";                 //test string else(for input)
}
}

});