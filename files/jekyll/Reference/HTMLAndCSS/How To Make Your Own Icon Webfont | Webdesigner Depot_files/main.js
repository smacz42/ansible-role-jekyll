jQuery(document).ready(function(){
  initLogo();
  initScroll();
  initSearch();
  initScrollTo();
  initTime();
  initControls();
  setTimeout(handleExcerpts, 1000);
  initPostLinks();
  initSbSignupForm();
  initTypewriterLinks();
  initBlog();
  initMobile();
  initMdFreebieForm();
  
  initBgEffects();
  initArticle();
  initLinks();
  initArticlesAnimation();
  
  jQuery('body').on('touchstart.dropdown', '.apps-link-wrap', function (e) {
    e.stopPropagation();
  });
  
  if(is_touch_device() ){
    jQuery('body').addClass('touch-body');
  }
  
});

function initArticlesAnimation(){
  if(!jQuery('body').hasClass('blog-body')){
    return;
  }
  
  var overlay = jQuery('#transition-overlay');
  if(!overlay.hasClass('active')){
    return;
  }
  
  setTimeout( function(){ 
      //jQuery('#to-app-icon').removeClass().addClass('app-icon');
      
      jQuery('.t-overlay-title').text('');
      jQuery('#to-app-icon').removeClass('hiding')
      jQuery('.t-overlay-title').removeClass('hiding');
      jQuery('#transition-overlay').addClass('active');
      jQuery('#transition-overlay').css('opacity', 1);
      
      
       setTimeout( function(){ jQuery('#to-app-icon').addClass('animate');
          setTimeout(function(){
              jQuery('.t-overlay-title').goTextTyping({ text : "Articles", finish: function(){
                  finishBlogTransition();     
                }
              });
          }, 600);
        
        }, 50);
  
  }, 100);
  
}

function finishBlogTransition(){
   setTimeout(function(){
      jQuery('#to-app-icon').addClass('hiding')
      jQuery('.t-overlay-title').addClass('hiding');
      
      
    jQuery('#transition-overlay').animate({ opacity: 0}, 500, function(){
               jQuery('#to-app-icon').removeClass('animate');
               jQuery('#transition-overlay').removeClass('active');
               jQuery('#to-app-icon').removeClass('hiding')
               jQuery('.t-overlay-title').removeClass('hiding');
            });
    }, 1000);
}

function initLinks(){
  jQuery('.m-contact-link').click(function(e){
  
     if(mobilecheck()){
       e.preventDefault();
       window.location = "mailto:info@webdesignerdepot.com";
       return false;
     }  
  });
} 



function submitMdFreebieSubscribe(){
   var email = document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value;
   var refID = document.forms['mighty_freebie_deals_subscribe_form'].elements['refID'].value;
   var code = document.forms['mighty_freebie_deals_subscribe_form'].elements['code'].value;
  
  if(!validateEmailForWdd(email)){
  	//alert('Please enter a valid email address');
    swal({ title:"Please enter a valid email address", text: null, type: "warning",  confirmButtonColor: null} );
  	return false;
  }
  
  
  
  var agreed = document.forms['mighty_freebie_deals_subscribe_form'].elements['agree'].checked;
  if(!agreed){
    //alert('Please agree to the terms');
    //swal("Please agree to the terms", null, "warning");
    swal({ title:"Please agree to the terms", text: null, type: "warning",  confirmButtonColor: null} );
    return false;
  }
 
  mdFreebieExternalRequest(email, refID, code);
  WDD_Popup_Set_Cookie('wdd-freebie-email', email , 365, '/' );
  
  return false;
}


function mdTweetGetFreebie(){
  var email = WDD_Popup_Get_Cookie('wdd-freebie-tweet');
  if(!email)
    email = WDD_Popup_Get_Cookie('wdd-freebie-email');

  if(!email){
    //alert('You do not have permission to access this file directly');
    //swal("You do not have permission to access this file directly", null, "warning");
    swal({ title:"You do not have permission to access this file directly", text: null, type: "warning",  confirmButtonColor: null} );
    return false;
  }

  var refID = document.forms['mighty_freebie_deals_subscribe_form'].elements['refID'].value;
  var code = document.forms['mighty_freebie_deals_subscribe_form'].elements['code'].value;
  //WDD_Popup_Set_Cookie('wdd-freebie-tweet', email , 365, '/' );
  var postId = jQuery('#might-freebie-deals-subscribe-form input[name=wdd_post_id]').val();
  WDD_Popup_Set_Cookie('wdd-freebie-tweet-' + postId, email , 365, '/');
  WDD_Popup_Set_Cookie('wdd-freebie-email', email , 365, '/' );

  jQuery.ajax({ url: '/widget/getMdFreebie.php', type : 'POST',
     data: { refID : refID, Type: 3, code : code, email: email },
     success: function(responseText){
      var matches = /^file:(.*)/i.exec(responseText); 
      if(responseText == 'error')
        //alert('Please try again');
        //swal("Please try again", null, "warning");
        swal({ title:"Please try again", text: null, type: "warning",  confirmButtonColor: null} );
      else if(matches){
        var ifrm = document.getElementById("md-download-file-frame");
        ifrm.src = matches[1];
      }
      else
        //swal("Something went wrong please try again", null, "warning");
        swal({ title:"Something went wrong please try again", text: null, type: "warning",  confirmButtonColor: null} );
     }
     
   });
}


function otoFreebieExternalRequest(email, refID, code){
 
  jQuery.ajax({ url: '/widget/subscribeOtoFreebie.php', type : 'POST',
     data: { refID : refID, Type: 3, code : code, email: email },
     success: function(responseText){
      var matches = /^file:(.*)/i.exec(responseText); 
    	if(responseText == 'error'){
        //swal("Please try again", null, "warning");
        swal({ title:"Please try again", text: null, type: "warning",  confirmButtonColor: null} );
    	}else if(matches){
    		var ifrm = document.getElementById("md-download-file-frame");
    		ifrm.src = matches[1];
    	}
    	else
        //swal("Thank you! Please check your email for the download link. Please check your spam folder as well.", null, "success");
        swal({ title:"Thank you! Please check your email for the download link. Please check your spam folder as well.", text: null, type: "success",  confirmButtonColor: null} );
    	  
    	document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = '';
     }
     
   });
  
  document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = 'Please wait...';
}

function submitWddFreebieSubscribe(){
  var email = document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value;
  var refID = document.forms['mighty_freebie_deals_subscribe_form'].elements['refID'].value;
  var file = document.forms['mighty_freebie_deals_subscribe_form'].elements['file'].value;
  
  if(!validateEmailForWdd(email)){
    //swal("Please enter a valid email address", null, "warning");
    swal({ title:"Please enter a valid email address", text: null, type: "warning",  confirmButtonColor: null} );
  	return false;
  }
  
  var agreed = document.forms['mighty_freebie_deals_subscribe_form'].elements['agree'].checked;
  if(!agreed){
    //alert('Please agree to the terms');
    //swal("Please agree to the terms", null, "warning");
    swal({ title:"Please agree to the terms", text: null, type: "warning",  confirmButtonColor: null} );
    return false;
  }
 
  wddFreebieExternalRequest(email, refID, file);
  
  
  return false;
}

function wddFreebieExternalRequest(email, refID, file){
 
  jQuery.ajax({ url: '/widget/subscribeWddFreebie.php', type : 'POST',
     data: { refID : refID, Type: 3, file : file, email: email },
     success: function(responseText){
      var matches = /^file:(.*)/i.exec(responseText); 
    	if(responseText == 'error'){
    	  
        swal({ title:"Please try again", text: null, type: "warning",  confirmButtonColor: null} );
    	}else if(matches){
    		var ifrm = document.getElementById("md-download-file-frame");
    		ifrm.src = matches[1];
    	}
    	else{
    	  //alert('Thank you! Please check your email for the download link. Please check your spam folder as well.');
        //swal("Thank you! Please check your email for the download link. Please check your spam folder as well.", null, "success");
        swal({ title:"Thank you! Please check your email for the download link. Please check your spam folder as well.", text: null, type: "success",  confirmButtonColor: null} );
      }  
    	  
    	document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = '';
     }
     
   });
  
  document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = 'Please wait...';
}

function submitOtoFreebieSubscribe(){
   var email = document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value;
   var refID = document.forms['mighty_freebie_deals_subscribe_form'].elements['refID'].value;
   var code = document.forms['mighty_freebie_deals_subscribe_form'].elements['code'].value;
  
  if(!validateEmailForWdd(email)){
  	//alert('Please enter a valid email address');
    //swal("Please enter a valid email address", null, "warning");
    swal({ title:"Please enter a valid email address", text: null, type: "warning",  confirmButtonColor: null} );
  	return false;
  }
  
  var agreed = document.forms['mighty_freebie_deals_subscribe_form'].elements['agree'].checked;
  if(!agreed){
    
    //swal("Please agree to the terms", null, "warning");
    swal({ title:"Please agree to the terms", text: null, type: "warning",  confirmButtonColor: null} );
    return false;
  }
 
  otoFreebieExternalRequest(email, refID, code);
  //WDD_Popup_Set_Cookie('wdd-oto-freebie-email', email , 365, '/' );
  
  return false;
}

function initOtoFreebieForm(){
  if( !jQuery('#oto-freebie-email-form-block').attr('id') )
    return;
    
  var emailSubscribed =  WDD_Popup_Get_Cookie('wdd-oto-freebie-email');
  
  
  var postId = jQuery('#might-freebie-deals-subscribe-form input[name=wdd_post_id]').val();
  var tweetPaid =  WDD_Popup_Get_Cookie('wdd-freebie-tweet-' + postId);
  
  if(emailSubscribed && !tweetPaid){
    jQuery('#oto-freebie-email-form-block').hide();
    jQuery('#md-freebie-twitter-form-block').show();
  }
  else if(emailSubscribed && tweetPaid){
    jQuery('#oto-freebie-email-form-block').hide();
    jQuery('#md-freebie-download-block').show();
    jQuery('#freebie-download-btn-lnk').click(function(){
      mdTweetGetFreebie();
    });

  }

  jQuery('#freebie-pay-with-tweet-lnk').click(function(){
    var link = jQuery(this);
    var url = link.attr('href');
    var leftPosition, topPosition;
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    //url += '?msg=' + link.attr('data-msg');
    window.open(url,'Twitter',windowFeatures);
    return false;
  });
}


function initWddFreebieForm(){
  if( !jQuery('#wdd-freebie-email-form-block').attr('id') )
    return;
    
  var emailSubscribed =  WDD_Popup_Get_Cookie('wdd-wdd-freebie-email');
  
  
  var postId = jQuery('#might-freebie-deals-subscribe-form input[name=wdd_post_id]').val();
  var tweetPaid =  WDD_Popup_Get_Cookie('wdd-freebie-tweet-' + postId);
  
  if(emailSubscribed && !tweetPaid){
    jQuery('#wdd-freebie-email-form-block').hide();
    jQuery('#md-freebie-twitter-form-block').show();
  }
  else if(emailSubscribed && tweetPaid){
    jQuery('#wdd-freebie-email-form-block').hide();
    jQuery('#md-freebie-download-block').show();
    jQuery('#freebie-download-btn-lnk').click(function(){
      mdTweetGetFreebie();
    });

  }

  jQuery('#freebie-pay-with-tweet-lnk').click(function(){
    var link = jQuery(this);
    var url = link.attr('href');
    var leftPosition, topPosition;
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    //url += '?msg=' + link.attr('data-msg');
    window.open(url,'Twitter',windowFeatures);
    return false;
  });
}

function initMdFreebieForm(){
  initOtoFreebieForm();
  initWddFreebieForm
  
   
  if( !jQuery('#md-freebie-email-form-block').attr('id') )
    return;
    
  var emailSubscribed =  WDD_Popup_Get_Cookie('wdd-freebie-email');
  
  
  var postId = jQuery('#might-freebie-deals-subscribe-form input[name=wdd_post_id]').val();
  var tweetPaid =  WDD_Popup_Get_Cookie('wdd-freebie-tweet-' + postId);
  
  if(emailSubscribed && !tweetPaid){
    jQuery('#md-freebie-email-form-block').hide();
    jQuery('#md-freebie-twitter-form-block').show();
  }
  else if(emailSubscribed && tweetPaid){
    jQuery('#md-freebie-email-form-block').hide();
    jQuery('#md-freebie-download-block').show();
    jQuery('#freebie-download-btn-lnk').click(function(){
      mdTweetGetFreebie();
    });

  }

  jQuery('#freebie-pay-with-tweet-lnk').click(function(){
    var link = jQuery(this);
    var url = link.attr('href');
    var leftPosition, topPosition;
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    //url += '?msg=' + link.attr('data-msg');
    window.open(url,'Twitter',windowFeatures);
    return false;
  });
}

function mdFreebieExternalRequest(email, refID, code){
 
  jQuery.ajax({ url: '/widget/subscribeMdFreebie.php', type : 'POST',
     data: { refID : refID, Type: 3, code : code, email: email },
     success: function(responseText){
      var matches = /^file:(.*)/i.exec(responseText); 
    	if(responseText == 'error'){
    	  //alert('Please try again');
        //swal("Please try again", null, "warning");
        swal({ title:"Please try again", text: null, type: "warning",  confirmButtonColor: null} );
    	}else if(matches){
    		var ifrm = document.getElementById("md-download-file-frame");
    		ifrm.src = matches[1];
    	}
    	else{
    	  
        swal({ title:"Thank you! Please check your email for the download link. Please check your spam folder as well.", text: null, type: "success",  confirmButtonColor: null} );
      }  
    	  
    	document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = '';
     }
     
   });
  
  document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = 'Please wait...';
}


function checkContactForm(jform){
  var form = jQuery(jform);
  
  var error = '';
  var name = form.find('[name=your-name]').val();
  if(!name){
    error = "Please enter your name\n";
    //swal(error, null, "warning");
    swal({ title:"Please enter your name", text: null, type: "warning",  confirmButtonColor: null} );
    return false;
  }
  
  var captchaResponse = form.find('[name=g-recaptcha-response]').val();
  if(!captchaResponse){
    error = "Please enter captcha\n";
    //swal(error, null, "warning");
    swal({ title:"Please enter captcha", text: null, type: "warning",  confirmButtonColor: null} );
    return false;
  }
    
  var email = form.find('[name=your-email]').val();
  if(!validateEmailForWdd(email)){
    error = "Please enter a valid email address\n";
    //swal(error, null, "warning");
    swal({ title:"Please enter a valid email address", text: null, type: "warning",  confirmButtonColor: null} );
    return false;
  }
    
  var subject = form.find('[name=your-subject]').val();
  if(!subject){
    error = "Please enter the subject\n";
    //swal(error, null, "warning");
    swal({ title:"Please enter the subject", text: null, type: "warning",  confirmButtonColor: null} );
    return false;
  }
    
  var msg = form.find('[name=your-message]').val();
  if(!msg){
    error = "Please enter a message";
    //swal(error, null, "warning");
    swal({ title:"Please enter a message", text: null, type: "warning",  confirmButtonColor: null} );
    return false;
  }
  
    
  if(error){
    //alert(error);
    //swal("Warning", error, "warning");
    return false;
  }
  
  jQuery('.ajax-loader').css('visibility', 'visible');
  var formData = form.serialize();
  jQuery.ajax({url: form.attr('action'), type: "POST", data: formData,
    success: function(data){
      //alert(data);
      //swal(data, null, "success");
      swal({ title:data, text: null, type: "success",  confirmButtonColor: null} );
      jQuery('.ajax-loader').css('visibility', 'hidden');
      form.find('[name=your-name]').val('');
      form.find('[name=your-email]').val('');
      form.find('[name=your-subject]').val('');
      form.find('[name=your-message]').val('');
      
      form.find('[name=code]').val('');
    }
  
  });
  
  
  return false; 
}

function onChangeSelectLink(target){
  var select = jQuery(target);
  window.location = select.val();
}  

function initArticle(){
  if( jQuery('.article-entry').length <= 0 ){
    return;
  }
  
  Prism.highlightAll();
}


function initBgEffects(){
  initPixelated();
  initPolygonsBg();
  initColorGrid();
}

function initColorGrid(){
 
 
var grid = jQuery('#color-grid');
if(!grid.attr('id')){
  return;
}

var s = 50;  //space between blocks
var n = 5;  //shadow range (space between shadow waves)
var l = 40;  //grid length
//random colors 
var rndCol = function() {
    return Math.ceil(Math.random() * 225+30);
};
for (var i = 0; i < l; i++) {
    for (var j = 0; j < l; j++) {
        var r = 255;//12;//rndCol();
        var g = 255;//127;//rndCol();
        var b = 255;//215;//rndCol();
        var a = Math.random() / 2;
        var style = {
            'top': i * (s + n) + 'px',
            'left': j * (s + n) + 'px',
            'background': 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')',
            'background-image': 'linear-gradient(top, hsla(255, 255%, 255%, .95), transparent)',
            'animation-delay': ((i + 1) + (j + 1)) * 110 + 'ms'
        };
        var block = jQuery('<div />').addClass('cg-block').css(style);
        grid.append(block);
    }
}

}

function initPolygonsBg(){

 var container = document.getElementById("polygons-bg");
  if(!container){
    return;
  }

var refreshDuration = 30000;
var refreshTimeout;
var numPointsX;
var numPointsY;
var unitWidth;
var unitHeight;
var points;

function onLoad()
{
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width',window.innerWidth);
    svg.setAttribute('height',window.innerHeight);
    svg.setAttribute('id', 'polygons-svg');
    document.querySelector('#polygons-bg').appendChild(svg);

    var unitSize = (window.innerWidth+window.innerHeight)/20;
    numPointsX = Math.ceil(window.innerWidth/unitSize)+1;
    numPointsY = Math.ceil(window.innerHeight/unitSize)+1;
    unitWidth = Math.ceil(window.innerWidth/(numPointsX-1));
    unitHeight = Math.ceil(window.innerHeight/(numPointsY-1));

    points = [];

    for(var y = 0; y < numPointsY; y++) {
        for(var x = 0; x < numPointsX; x++) {
            points.push({x:unitWidth*x, y:unitHeight*y, originX:unitWidth*x, originY:unitHeight*y});
        }
    }

    randomize();

    for(var i = 0; i < points.length; i++) {
        if(points[i].originX != unitWidth*(numPointsX-1) && points[i].originY != unitHeight*(numPointsY-1)) {
            var topLeftX = points[i].x;
            var topLeftY = points[i].y;
            var topRightX = points[i+1].x;
            var topRightY = points[i+1].y;
            var bottomLeftX = points[i+numPointsX].x;
            var bottomLeftY = points[i+numPointsX].y;
            var bottomRightX = points[i+numPointsX+1].x;
            var bottomRightY = points[i+numPointsX+1].y;

            var rando = Math.floor(Math.random()*2);

            for(var n = 0; n < 2; n++) {
                var polygon = document.createElementNS(svg.namespaceURI, 'polygon');

                if(rando==0) {
                    if(n==0) {
                        polygon.point1 = i;
                        polygon.point2 = i+numPointsX;
                        polygon.point3 = i+numPointsX+1;
                        polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+bottomRightX+','+bottomRightY);
                    } else if(n==1) {
                        polygon.point1 = i;
                        polygon.point2 = i+1;
                        polygon.point3 = i+numPointsX+1;
                        polygon.setAttribute('points',topLeftX+','+topLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
                    }
                } else if(rando==1) {
                    if(n==0) {
                        polygon.point1 = i;
                        polygon.point2 = i+numPointsX;
                        polygon.point3 = i+1;
                        polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY);
                    } else if(n==1) {
                        polygon.point1 = i+numPointsX;
                        polygon.point2 = i+1;
                        polygon.point3 = i+numPointsX+1;
                        polygon.setAttribute('points',bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
                    }
                }
                polygon.setAttribute('fill','rgba(0,0,0,'+(Math.random()/5)+')');
                polygon.setAttribute('stroke','rgba(250,250,250,'+(Math.random()/5)+')');
                var animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
                animate.setAttribute('fill','freeze');
                animate.setAttribute('attributeName','points');
                animate.setAttribute('dur',refreshDuration+'ms');
                animate.setAttribute('calcMode','linear');
                polygon.appendChild(animate);
                svg.appendChild(polygon);
            }
        }
    }
  var ktmp;
  var k;
  setInterval(function(){
      var j=document.querySelector('#polygons-bg svg').childNodes.length;
      ktmp=k;
      k=parseInt(j*Math.random());
      var polygon0 = document.querySelector('#polygons-bg svg').childNodes[ktmp];
      var polygon1 = document.querySelector('#polygons-bg svg').childNodes[k];
      var tmp=polygon1.getAttribute('fill');
      if(polygon0){
        polygon0.setAttribute('fill',tmp);
      }
      
      if(polygon1){  
        polygon1.setAttribute('fill','rgba(255,255,255,.7)');
      }  
  }
  ,500);
  refresh();
}

function randomize() {
    for(var i = 0; i < points.length; i++) {
        if(points[i].originX != 0 && points[i].originX != unitWidth*(numPointsX-1)) {
            points[i].x = points[i].originX + Math.random()*unitWidth-unitWidth/2;
        }
        if(points[i].originY != 0 && points[i].originY != unitHeight*(numPointsY-1)) {
            points[i].y = points[i].originY + Math.random()*unitHeight-unitHeight/2;
        }
    }
}

function refresh() {
    randomize();
    for(var i = 0; i < document.querySelector('#polygons-bg svg').childNodes.length; i++) {
        var polygon = document.querySelector('#polygons-bg svg').childNodes[i];
        var animate = polygon.childNodes[0];
        if(animate.getAttribute('to')) {
            animate.setAttribute('from',animate.getAttribute('to'));
        }
        animate.setAttribute('to',points[polygon.point1].x+','+points[polygon.point1].y+' '+points[polygon.point2].x+','+points[polygon.point2].y+' '+points[polygon.point3].x+','+points[polygon.point3].y);
        animate.beginElement();
    }
    refreshTimeout = setTimeout(function() {refresh();}, refreshDuration);
}

function onResizePolygons() {
    document.querySelector('#polygons-bg svg').remove();
    clearTimeout(refreshTimeout);
    onLoad();
}

  //jQuery(window).load()
  //window.onload = onLoad;
  onLoad();
  jQuery(window).resize( function(){
     onResizePolygons();
  });   

}


function initPixelated(){

  var container = document.getElementById("pixelated-bg");
  if(!container){
    return;
  }
var pixels = []

for (var i = 0; i <= 2600; i++) {
  var thisPixel = document.createElement("div");
  pixels.push(thisPixel);
  var brightness = Math.random() /2 + 0.5;
  var sourceColor = "#0c7fd7";//"#663399"
  thisPixel.className = "pixel";
  container.appendChild(thisPixel);
  thisPixel.style.backgroundColor = adjustBrightness(sourceColor, brightness)
}

animateBackground();

function animateBackground() {
  var thisPixel;
  setInterval(function() {    
    for (var i = 0; i < 50; i++) {
      thisPixel = pixels[Math.floor(Math.random() * pixels.length)]
      thisPixel.className += " twinkle";
      thisPixel.addEventListener('animationend', function(){
        this.className = "pixel";
      });
    }
  }, 5000/3);
}

function adjustBrightness(originalColor, adjustment) {
  var rgbColor = null;
  if (isHexColor(originalColor)) {
    rgbColor = hexToRGB(originalColor);
  } else if (isRGBColor(originalColor)) {
    var rgbArray = originalColor.match(/\d+/g);
    rgbColor = {
      red: rgbArray[0],
      green: rgbArray[1],
      blue: rgbArray[2]
    };
  }

  if (rgbColor) {
    
    var newColor = {
      red: clamp(Math.floor(rgbColor.red * adjustment)),
      green: clamp(Math.floor(rgbColor.green * adjustment)),
      blue: clamp(Math.floor(rgbColor.blue * adjustment))
    }
    
    return "rgb(" + newColor.red + ", " + newColor.green + ", " + newColor.blue + ")";
  }

}

function isHexColor(color) {
  return color.match(/#((\w{6})|(\w{3}))/);
}

function isRGBColor(color) {
  return color.match(/rgb\s?\(\s?\d+\s?,\s?\d+\s?,\s?\d+\s?\)/)
}

function hexToRGB(originalColor) {
  var vals = originalColor.match(/\w+/)[0];
  var retVal = {};
  if (vals.length === 3) {
    vals = vals[0] + vals[0] + vals[1] + vals[1] + vals[2] + vals[2];
  }
  retVal.red = hexToDec(vals.substr(0, 2));
  retVal.green = hexToDec(vals.substr(2, 2));
  retVal.blue = hexToDec(vals.substr(4, 2));

  return retVal;
}

function hexToDec(hexNum) {
  return parseInt(hexNum, 16);
}

function decToHex(decNum) {
  return decNum.toString(16);
}

function clamp(val) {
  if (val < 0) return 0;
  if (val > 255) return 255;
  return val;
}

}

function is_touch_device() {
 return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
}


function initMobile(){
  jQuery('.mhm-lnk').click(function(e){
    e.preventDefault();
    var lnk = jQuery(this);
    
    var anotherLink = false;
    if(!lnk.hasClass('opened-mode')){
      anotherLink = true;
    }
    
    jQuery('.mms-icon').removeClass('opened-mode');
    
    if(anotherLink){
      lnk.addClass('opened-mode');
    }
      
    
    
    var listId = lnk.attr('data-list');
    jQuery('.msml-part').removeClass('active');
    jQuery('#' + listId).addClass('active');
    
    if(jQuery('body').hasClass('m-sb-mode') && !anotherLink ){
      jQuery('body').removeClass('m-sb-mode');
      
    }
    else{
      jQuery('body').addClass('m-sb-mode');
      
      
    }
    
    /*
    var lnk = jQuery(this);
    var listId = lnk.attr('data-list');
    jQuery('.msml-part').removeClass('active');
    jQuery('#' + listId).addClass('active');
    */
    
    
    return false;
  
  });
  
  jQuery('#m-side-menu-close').click(function(e){
     e.preventDefault();
     jQuery('body').removeClass('m-sb-mode');
  });
}

function adjustDropDowns(){
   setTimeout(function(){
   
   
   var totalWidth = 0;
   jQuery('.wrap-dd-select').each(function(i,e) {
     var dropDown = jQuery(e);
     var maxWidth = 0;
     dropDown.find('li span').each(function(i,e){
       var li = jQuery(e);
       var liWidth = li.width();
       if(liWidth > maxWidth){
         maxWidth = liWidth;
       }
       
     });
     
     dropDown.css('min-width', maxWidth);
     
   });
   
   var optionsWidth = jQuery('#app-page-options').width();
   jQuery('.apdt-text').css('padding-right', optionsWidth );
   
   }, 100);
}

function openRefInPopupRaw(target){
  var width = Math.min(window.innerWidth, 980);
  var url =  jQuery(target).attr('href');
  PopupCenter(url, '', width, window.innerHeight);
  return false;
}

function initBlog(){
  if(!jQuery('body').hasClass('blog-body')){
    return;
  }
  
  
  var firstRef = jQuery('#hp-apps-list > a');
  for(var appIndex in wddAppsList){
    var wddApp = wddAppsList[appIndex];
    var newRef = firstRef.clone();
    var refVal = wddApp.ref;
    if(refVal == 'mightydeals'){
      refVal = "deals";
    }
    else if(refVal == 'code'){
       refVal = "scripts";
    }
    else if(refVal == 'conferences'){
       refVal = "events";
    }
     else if(refVal == 'dribbles'){
       refVal = "dribbbles";
     }
    
    
    if(refVal == 'home'){
      newRef.attr('href', '/'  );
    }
    else{
      newRef.attr('href', newRef.attr('href') + '/' + refVal  );
    }
    
    newRef.addClass(wddApp.id + '-icon' );
    newRef.attr('data-app-id', wddApp.id );
    newRef.attr('data-text', wddApp.title );
    var span = newRef.find('span');
    span.attr('data-tooltip', wddApp.desc );
    span.text(wddApp.title );
    
    newRef.appendTo('#hp-apps-list');
  } 
  
  firstRef.remove();
  
  
  var firstRef = jQuery('#apps-list > a');
  for(var appIndex in wddAppsList){
    var wddApp = wddAppsList[appIndex];
    var newRef = firstRef.clone();
    var refVal = wddApp.ref;
    if(refVal == 'mightydeals'){
      refVal = "deals";
    }
    else if(refVal == 'code'){
       refVal = "scripts";
    }
    else if(refVal == 'conferences'){
       refVal = "events";
    }
     else if(refVal == 'dribbles'){
       refVal = "dribbbles";
     }
    
    if(refVal == 'home'){
      newRef.attr('href', '/'  );
    }
    else{ 
      newRef.attr('href', newRef.attr('href') + '/' + refVal  );
    }
      
    newRef.attr('id', 'app-'+ wddApp.id + '-lnk' );
    var span = newRef.find('span');
    span.attr('data-tooltip', wddApp.desc );
    span.text(wddApp.title );
    
    newRef.appendTo('#apps-list');
  } 
  
  firstRef.remove();
  
  
  // search
  if(jQuery('body').hasClass('blog-body')){
  var firstRef = jQuery('#search-options > a');
  for(var appIndex in wddAppsList){
    var wddApp = wddAppsList[appIndex];
    var newRef = firstRef.clone();
    var refVal = wddApp.ref;
    if(refVal == 'mightydeals'){
      refVal = "deals";
    }
    else if(refVal == 'code'){
       refVal = "scripts";
    }
    else if(refVal == 'conferences'){
       refVal = "events";
    }
     else if(refVal == 'dribbles'){
       refVal = "dribbbles";
     }
    
    newRef.attr('href', newRef.attr('href') + '/' + refVal  );
    if(refVal  == 'home'){
      newRef.addClass('active');
      jQuery('.search-category-label').text(wddApp.title);
    }
    //newRef.attr('id', 'app-'+ wddApp.id + '-lnk' );
    var span = newRef.find('span');
    //span.attr('data-tooltip', wddApp.desc );
    span.text(wddApp.title );
    
    newRef.appendTo('#search-options');
    newRef.click(function(e){
      e.preventDefault();
      var lnk = jQuery(this);
      jQuery('.search-category-label').text(lnk.text() );
      jQuery('#search-form').attr('action', lnk.attr('href') );
      jQuery('#search-options a').removeClass('active');
      lnk.addClass('active');
      jQuery('#search-field').focus();
      
      jQuery('#search-options').css('display', 'none');
      setTimeout(function(){
        jQuery('#search-options').removeAttr('style');
      }, 100);
      
      return false;
    });
  } 
  
  firstRef.remove();
  }
  
  // mobile
  
  var firstRef = jQuery('#msml-apps > a');
  for(var appIndex in wddAppsList){
    var wddApp = wddAppsList[appIndex];
    var newRef = firstRef.clone();
     var refVal = wddApp.ref;
    if(refVal == 'mightydeals'){
      refVal = "deals";
    }
    else if(refVal == 'code'){
       refVal = "scripts";
    }
    else if(refVal == 'conferences'){
       refVal = "events";
    }
     else if(refVal == 'dribbles'){
       refVal = "dribbbles";
     }
    
    if(refVal == 'home'){
      newRef.attr('href', '/'  );
    }
    else{
      newRef.attr('href', newRef.attr('href') + '/' + refVal  );
    }
      
    
    var icon = newRef.find('.app-icon');
    icon.attr('id', 'app-'+ wddApp.id + '-lnk' );
    
    var label = newRef.find('.msmi-label');
    label.text(wddApp.title );
    
    
    
    newRef.appendTo('#msml-apps');
  } 
  
  firstRef.remove(); 
  
  
  var mSearchOptions = jQuery('#m-fastsearch-options-select');
  for(var appIndex in wddAppsList){
     var wddApp = wddAppsList[appIndex];
     var refVal = wddApp.ref;
     if(refVal == 'mightydeals'){
       refVal = "deals";
     }
     else if(refVal == 'code'){
       refVal = "scripts";
     }
     else if(refVal == 'conferences'){
       refVal = "events";
     }
     else if(refVal == 'dribbles'){
       refVal = "dribbbles";
     }
     
     
    
     var option = jQuery('<option>');
     if(refVal == 'home'){
      option.attr('value', 'http://www.webdesignerdepot.com/');
    }
    else{ 
      option.attr('value', 'http://www.webdesignerdepot.com/app#' +   refVal);
    } 
     option.attr('data-ref', wddApp.ref );
     option.text(wddApp.title);
     
     option.appendTo( mSearchOptions );
  }
  
   
  
  /*
  mSearchOptions.change(function(e){
      var selectedOption =  mSearchForm.find(":selected");
      jQuery('#m-fastsearch-label').text(selectedOption.text() );
      var ref = selectedOption.attr('data-ref');
      if(ref == 'home'){
        mSearchForm.attr('action', '/' );
      }
      else{
        mSearchForm.attr('action', selectedOption.attr('value') );
      }  
  });
  */
 
}

function mFastSearchChange(e){
   var mSearchForm = jQuery('#m-searchform');
   var selectedOption =  mSearchForm.find(":selected");
   jQuery('#m-fastsearch-label').text(selectedOption.text() );
      var ref = selectedOption.attr('data-ref');
      if(ref == 'home'){
        mSearchForm.attr('action', '/' );
      }
      else{
        mSearchForm.attr('action', selectedOption.attr('value') );
      }  
}



function initSbSignupForm(){
  
  
  
  jQuery('#footer-nl').submit(function(){
  //jQuery('#footer-subscribe-btn').click(function(e){ e.preventDefault();
      var email = jQuery('#footer-subscribe-email').val();
      
      if(!validateEmailForWdd(email)){
        //alert('Please enter a valid email address');
        //swal("Please enter a valid email address", null, "warning");
        swal({ title:"Please enter a valid email address", text: null, type: "warning",  confirmButtonColor: null} );
        return false;
      }
      
    
      
      swal({ title:"Thanks, you've been subscribed!", text: null, type: "success",  confirmButtonColor: null} );
      
      return true;
      
   });   
   
   /*
   var ipLoaded = false;
   jQuery('#footer-subscribe-email').focus(function(){
     if(!ipLoaded){
       jQuery.getJSON( "http://www.telize.com/jsonip?callback=?", function(data){  jQuery('#nl_sb_ip_field').val(data.ip) ; } );
       ipLoaded = true;
     }
   });
   */
   
   
}


function initPostLinks(){

  if( typeof is_ie_lte9 !== 'undefined' || typeof is_ie_10 !== 'undefined' )
    return;
    
  if( navigator.appVersion.indexOf("X11") != -1 || navigator.appVersion.indexOf("Linux") != -1  )
    return;  
      
    
  jQuery('.entry-content a,.author-bio-text a').each(function(i,e){
     var link = jQuery(e);
     
     if(link.hasClass('twitter-timeline-link'))
       link.html( link.text() );
       
        
     
     //link.attr('href').match(/mailto/) ||
     if(    link.html().match(/<img/gi) || link.parent().hasClass('pg-item') || link.hasClass('no-roll') 
     || ( link.html().match(/<span/gi) && !link.html().match(/<span class="s2"/gi) )
     || link.hasClass('inner-link-effect')
     )
       return;
       
     if(link.parent().attr('for') == 'mighty-deals-sub-chk'){
       return;
     }  
       
       if(link.attr('href').match(/mailto/)){
         link.find('*').remove();
       }
    
    // ??
    
      link.addClass('inner-link-effect');
      
      
      //var randClass = Math.floor((Math.random() * 3) + 1);
      //link.addClass( 'ile-' + randClass );
      
      
    
     //*/
       
       
          
  }); 
  
  
   jQuery('#footer-nav-links a').each(function(i,e){
     var link = jQuery(e);
    
     
     if(    link.html().match(/<img/gi) || link.parent().hasClass('pg-item') || link.hasClass('no-roll') 
     || ( link.html().match(/<span/gi) && !link.html().match(/<span class="s2"/gi) )
     || link.hasClass('n-inner-link-effect')
     )
     return;
       
       if(link.attr('href').match(/mailto/)){
         link.find('*').remove();
       }
    
    
      link.addClass('n-inner-link-effect');
     
     var word = link.text();
     var html = '';
     for(var i = 0; i < word.length; i++)
       html += '<span class="ae-letter">'+ word[i]  +'</span>';
       
       
     link.html(html);  
          
  }); 
 
   
  
  jQuery('a.n-inner-link-effect').each(function(i,e){
    var lnk = jQuery(this);
    var letters = lnk.find('.ae-letter');
    var lettersIndex = 0;
    var lettersIndex2 = 0;
    var lettersLength = letters.length;
    var interval;
    var secondInterval;
    var leaveInterval;
    var totalSpeed = 120;
    var speed = Math.round( totalSpeed / lettersLength );
    var step = 1;
    var minSpeed = 2;
    if( speed < minSpeed)
      step = Math.ceil(minSpeed / speed);
    
    if(step > 2)
      step = 2;
    
    lnk.mouseenter(function(e){
    
       var width = lnk.width();
       var oppositeDirection = e.offsetX > width * 0.5  ? true : false;
       
       
       clearInterval(interval);
       //clearInterval(leaveInterval);
       clearInterval(secondInterval);
       
       interval = setInterval(function(){
          for(var j = 0; j < step; j++  ){
            var tmpIndex = lettersIndex + j;
            if( tmpIndex < lettersLength ){
              //jQuery(letters[ tmpIndex ]).addClass('red-letter');
              
            if(oppositeDirection){
                  var tmpReverseIndex = lettersLength - (tmpIndex + 1);
                  jQuery(letters[ tmpReverseIndex ]).addClass('red-letter');
            }   
            else{
                  jQuery(letters[ tmpIndex ]).addClass('red-letter');
            }  
            
            }
              
            var tmpReverseIndex = lettersLength - (tmpIndex + 1);
            if(tmpReverseIndex >= 0)
              jQuery(letters[ tmpReverseIndex ]).addClass('ae-underline');
           
          }
          
          lettersIndex += step;
          if(lettersIndex >= lettersLength){
            lettersIndex = lettersLength; 
            clearInterval(interval);
            /*
            secondInterval = setInterval(function(){
               jQuery(letters[lettersIndex2]).addClass('red-bg');
               lettersIndex2++;
               if(lettersIndex2 >= lettersLength)
                 clearInterval(secondInterval);
               
            }, speed);
            */
            
          }
          
        }, speed);
        
    });
    
    lnk.mouseleave(function(e){
       
       var width = lnk.width();
       var oppositeDirection = e.offsetX > width * 0.5  ? true : false;
       
       clearInterval(interval);
       clearInterval(secondInterval);
        
       interval = setInterval(function(){
       
               /*
               jQuery(letters[lettersIndex]).removeClass('red-letter');
               jQuery(letters[lettersLength - (lettersIndex + 1)]).removeClass('ae-underline');
               */
               
            
            
            for(var j = 0; j < step; j++  ){
              var tmpIndex = lettersIndex + j;
              if( tmpIndex < lettersLength ){
                if(oppositeDirection){
                  var tmpReverseIndex = lettersLength - (tmpIndex + 1);
                  jQuery(letters[ tmpReverseIndex ]).removeClass('red-letter');
                }
                
                else{
                  jQuery(letters[ tmpIndex ]).removeClass('red-letter');
                }  
              }  
              
              var tmpReverseIndex = lettersLength - (tmpIndex + 1);
              if(tmpReverseIndex >= 0)
                jQuery(letters[ tmpReverseIndex ]).removeClass('ae-underline');
            }
               
            lettersIndex -= step;
            if(lettersIndex < -1 ){
              clearInterval(interval);
              lettersIndex = 0;
              lnk.find('.red-letter').removeClass('red-letter');
            }
            
          
          /*
          jQuery(letters[lettersIndex2]).removeClass('red-bg');
          lettersIndex2--;
          if(lettersIndex2 < 0){
            clearInterval(interval);
            
            
            secondInterval = setInterval(function(){
               jQuery(letters[lettersIndex]).removeClass('red-letter');
               lettersIndex--;
               if(lettersIndex < 0 )
                 clearInterval(secondInterval);
               
            }, speed);
            
            
            
          }
          //*/
          
        }, speed);
    });
    
  });
  
  
  
  
  
  //???
  jQuery('a.ae-link').each(function(i,e){
    var lnk = jQuery(this);
    var letters = lnk.find('.ae-letter');
    var lettersIndex = 0;
    var lettersLength = letters.length;
    var interval;
    var line = jQuery(lnk.find('.ae-line'));
    
    lnk.mouseenter(function(){
       /*lettersIndex = 0;
       
       interval = setInterval(function(){
         jQuery(letters[lettersIndex]).addClass('red');
         console.log(lettersIndex);
        
          lettersIndex++;
          if(lettersIndex >= lettersLength){
            clearInterval(interval);
            runSecondPart();
          }
        
        }, 10);
        */
        secondIndex  = 0 ;
        line.animate({width: '100%'}, 300, 'linear', function(){ runSecondPart(); });
    });
    
    
    
    lnk.mouseleave(function(){
      //clearInterval(interval);
      line.stop();
      line.css('width', 0);
      clearInterval(secondInterval);
      for(var i = 0; i< lettersLength; i++){
        jQuery(letters[i]).removeClass('red-bg');
        
        //jQuery(letters[i]).removeClass('red');
      }
    });
    
    var secondInterval;
    var secondIndex = 0;
    function runSecondPart(){
       secondInterval = setInterval(function(){
       jQuery(letters[secondIndex]).addClass('red-bg');
       
        secondIndex++;
        if(secondIndex >= lettersLength)
          clearInterval(secondInterval);
          
        }, 15);
    }
    
  });
}  

function initControls(){

  jQuery('#main-menu-select').change(function(){
    var val = jQuery(this).val();
    
    if(val.indexOf('#') >= 0){
      window.location = '/app' + val;
    }
    else{
      window.location = val;
    }
    
    
  });
   
  jQuery('#switch-to-serif-btn').click(function(e){
    e.preventDefault();
    if( jQuery('body').hasClass('tiempos-body') ){
    
      jQuery('body').removeClass('tiempos-body')
    } 
    else{
      jQuery('body').addClass('tiempos-body');
    }
    
    return false;
  });
  
  jQuery('#blog-list-grid-switcher a').click(function(e){
    e.preventDefault();
    jQuery('#blog-list-grid-switcher a').removeClass('selected');
    jQuery(this).addClass('selected');
    
    if( jQuery('.hp-left-c').hasClass('hplc-grid') ){
      jQuery('.hp-left-c').removeClass('hplc-grid');
    } 
    else{
      jQuery('.hp-left-c').addClass('hplc-grid');
    }
    
    return false;
  });
}

function doVerticalBlocksShifting(container, gap){
   doVBS(container, gap); 
   jQuery( window ).resize(function() {
     doVBS(container, gap);
   });
}

function doVBS(container, gap){
  return;
  setTimeout(function(){
  var items = jQuery(container).children();
  var list = [];
  var top = 0;
  var preTop = 0;
  items.each(function(i,e){
    jQuery(e).css('top', 0);
  });
  
  items.each(function(i,e){
    
    var item = jQuery(e);
    var itemPosition = item.position();
    if(itemPosition.top > top && preTop == top){
     preTop = itemPosition.top;
    }
    
    if(itemPosition.top == preTop){ 
      for(var j = list.length - 1; j >= 0; j--){
        var cItem = list[j];
        if(cItem.position().left == itemPosition.left){
          var cItemBottom = cItem.position().top + cItem.height() + gap;
          var delta = cItemBottom - itemPosition.top;
          item.css('top', delta);
          break;
        }
      }
    }
    else{
      top = preTop;
       for(var j = list.length - 1; j >= 0; j--){
        var cItem = list[j];
        if(cItem.position().left == itemPosition.left){
          var cItemBottom = cItem.position().top + cItem.height() + gap;
          var delta = cItemBottom - itemPosition.top;
          item.css('top', delta);
          break;
        }
      }  
      
    }
    
    
    //console.log( item.position().top )
    list.push(item);
    
  });
  }
  , 100);
}

function initTypewriterLinks(){
  
  jQuery('.app-page-title,.footer-submit-btn,#wdd-newsletter-subscribe-btn').each(function(i, e){
    var lnk = jQuery(e);
    var lnkText = lnk.attr('data-text');
    if(!lnkText){
      return;
    }
    
    
    var lnkReplacingText = lnk.attr('data-replacing-text');
    
    var lnkTextLength = lnkText.length;
    var lnkReplacingTextLength = lnkReplacingText.length;
    for(var i = 0; i < lnkReplacingTextLength - lnkTextLength; i++  )
      lnkText += ' ';
    
    var interval;
    var reverseInterval;
    var index = 0;
    var lnkTextCurent = lnkText;
    if(!lnkTextCurent)
      return;
      
    var speed = 20;  
    
    lnk.mouseenter(function(){
      
      clearInterval(reverseInterval);
      //index = 0;
      interval = setInterval(function(){
         //lnkTextCurent[index] = lnkReplacingText[index];
         lnkTextCurent = lnkTextCurent.replaceAt(index, lnkReplacingText[index] );
         
         lnk.text( lnkTextCurent );
         //console.log(index);
         index++;
         if( index >= lnkReplacingTextLength )
           clearInterval(interval);
          
      }, speed);
    });
    
    lnk.mouseleave(function(){
      clearInterval(interval);
      //var lnkTextCurent = lnkText;
      //index = 0;
      reverseInterval = setInterval(function(){
         //lnkTextCurent[index] = lnkReplacingText[index];
         index--;
         lnkTextCurent = lnkTextCurent.replaceAt(index, lnkText[index] );
         
         lnk.text( lnkTextCurent );
         //console.log(index);
         
         if( index <= 0 )
           clearInterval(reverseInterval);
          
      }, speed);
       //lnk.text( lnkText );
    });
    
  });

}

function get_time_zone_offset( ) {
     var current_date = new Date( );
     var gmt_offset = current_date.getTimezoneOffset( ) / 60;
     return gmt_offset;
}

function initTime(){

    
     var offset = get_time_zone_offset();
     var span = jQuery('#ppi-local-date');
     var stamp = parseInt(span.attr('data-time'));
     var date = new Date( ( stamp + (3600 * offset)  ) * 1000);
     span.html( dateFormat(date, "h:MMtt") ); // yyyy-mm-dd
    
}

function initScrollTo(){
   jQuery('.scroll-to').click(function(e){
     e.preventDefault();
     var link = jQuery(this);
     jQuery.scrollTo( jQuery(link.attr('href') ) , 400, { easing: "easeOutQuad" } );
   });  
}

function scrollToRef(ref){
  jQuery.scrollTo( ref , 400);
}

function scrollBottom(){
 window.scrollTo(0,document.body.scrollHeight);
}

function handleExcerpts(){

      var gap = 30;
      jQuery('.article-wdd-content .mc-item-excerpt').each(function(i,e){
           var el = jQuery(e);
           
           var tbottom = el.offset().top + el.height() + gap;
           var bottomMeta = el.parent().find('.mc-bottom-meta');
           if(bottomMeta.length <= 0){
             return;
           }
           var ttop = bottomMeta.offset().top;
           var delta = ttop - tbottom;
           
           if(delta < 0){
            //el.css('height', Math.floor(el.height() +  delta) );
            //el.dotdotdot();
             var newHeight = Math.floor(el.height() +  delta);
             
             var lineHeight = parseFloat( el.css('line-height'));
             var lines = Math.ceil(newHeight / lineHeight);
             newHeight = lines * lineHeight;
             el.css('height', newHeight );
             
             el.css('-webkit-line-clamp', lines.toString()) ;
           }
           
           el.addClass('dot-handled');
            
           //console.log(el.height());
           //console.log( el.parent().height()  - el.height() );
           /*
           var delta = el.parent().height()  - el.height();
           //console.log(delta);
           if( delta < 160){
             var sub = delta - 80;
             var cutText = el.find('.mc-item-excerpt');
             var newHeight = cutText.height() - sub
             cutText.height( newHeight);
             cutText.dotdotdot();
             
           } */
           
        });
        
        handleFeatExcerpts();
        
       
}

function handleFeatExcerpts(){
   var gapsmall = 20;
    var excerpts = jQuery('.hp-featured .mc-item-excerpt');
    if(excerpts.length < 3){
      setTimeout(handleFeatExcerpts, 1000);
    }
        
        excerpts.each(function(i,e){
          var el = jQuery(e);
           //console.log(el.height());
           /*
           if(el.height() > el.parent().height() - 90){
             el.find('.mc-item-excerpt').hide();
           }
           else{
             el.find('.mc-item-excerpt').show();
           }
           */
           var tbottom = el.offset().top + el.height() + gapsmall;
           var ttop = el.parent().parent().find('.app-all-links').offset().top;
           
           var delta = ttop - tbottom;
           
           if(delta < 0){
            var newHeight = Math.floor(el.height() +  delta);
            
            var lineHeight = parseFloat( el.css('line-height'));
            var lines = Math.floor(newHeight / lineHeight);
            el.css('-webkit-line-clamp', lines.toString()) ;
            newHeight = lineHeight * lines;
            
            el.css('height', newHeight );
            
           }
           
           el.addClass('dot-handled');
           
           
        });
}


function initSearch(){
   if( !jQuery('#search-form').hasClass('search-form-for-app') ){
   
   jQuery('#search-form').submit(function(){
     var s = jQuery('#search-field').val();
     if(s){
       var url = jQuery('#search-form').attr('action')  + '?s=' + s;
       window.location = url;
     }  
     return false;
   });
  } 
   
  
   
   
  jQuery('#main-header .icon-search').click(function(){
   
     var icon = jQuery(this);
     var header = icon.closest('header');
     if( header.hasClass('search-active') ){
       var s = jQuery('#search-form input[type=text]').val();
       if(s &&  icon.hasClass('blog-search-icon')){
         var url = jQuery('#search-form').attr('action')  + '?s=' + s;
         window.location = url;
       }
       else{
         header.removeClass('search-active');
       }  
     }
     else{
       header.addClass('search-active');
       header.find('#search-form input[type=text]').focus();
       setTimeout(
         function(){
          jQuery(document).bind('click', clickOutsideSearch);
        }, 10);  
     }
     
  });
  
  // mobile
  
  searchActivated = false;
  jQuery('#search-btn-link').click(function(e){
    e.preventDefault();
    if(jQuery('#search-box').hasClass('active')){
      jQuery('#search-box').removeClass('active');
      jQuery('#search-btn-link').addClass('icon-search');
      jQuery('#search-btn-link').removeClass('icon-cancel-circled');
    }
    else if(!searchActivated){
      jQuery('#search-box').addClass('active');
      jQuery('#search-btn-link').removeClass('icon-search');
      jQuery('#search-btn-link').addClass('icon-cancel-circled');
      jQuery('#fastsearch').focus()
      searchActivated = true;
    }  
    return false;
  });
  
  jQuery('#fastsearch').focusout(function(){
    jQuery('#search-box').removeClass('active');
    jQuery('#search-btn-link').addClass('icon-search');
    jQuery('#search-btn-link').removeClass('icon-cancel-circled');
    setTimeout(function(){
       searchActivated = false
    }, 100);
    //searchActivated = false;
  });
  
  var mSearchForm = jQuery('#m-searchform');
  mSearchForm.submit(function(e){
    e.preventDefault();
    
    window.location =  mSearchForm.attr('action') +'?s=' + jQuery('#m-fastsearch').val();
    
    return false;
  });
}

function clickOutsideSearch(event){
  var target = jQuery(event.target);
  if(!target.closest('#search-form').attr('id')){
      jQuery('#main-header').removeClass('search-active');
       
      jQuery(document).unbind('click', clickOutsideSearch);
  }
  else{
    jQuery('#search-form input[type=text]').focus();
  }
}


function atvImg(){

}

function openSuPopup(target){
  var url = jQuery(target).attr('data-url');
  window.open('http://www.stumbleupon.com/badge/?url=' + url, 'StumbleUpon', 'target=_blank,width=434,height=360, left=0, top=100 ');
}

function openGplusg(target){
  var url = jQuery(target).attr('data-url');
  window.open('https://plus.google.com/share?url=' + encodeURIComponent(url), 'Share', 'target=_blank,width=500,height=380, left=0, top=100 ');
}

function openLinkedIn(target){
  var url = jQuery(target).attr('data-url');
  window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(url), 'Share', 'target=_blank,width=500,height=380, left=0, top=100 ');
}




function openFbShare(target){
    var link = jQuery(target);
    var u = encodeURIComponent(link.attr('data-url'));
    var t = encodeURIComponent(link.attr('data-title'));
    var leftPosition, topPosition;
    //Allow for borders.
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    
    window.open('http://www.facebook.com/sharer.php?u=' + u +'&[title]=' + t,'sharer',windowFeatures);
    return false;
  };
  
function openTwShare(target){
    
    var link = jQuery(target);
    var url = link.attr('href');
    var leftPosition, topPosition;
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    //url += '?msg=' + link.attr('data-msg');
    window.open(url,'Twitter',windowFeatures);
    return false;
};
  
function openPinShare(target){
    var link = jQuery(target);
    var u = encodeURIComponent(link.attr('data-url'));
    var iu = encodeURIComponent(link.attr('data-img'));
    //var t = encodeURIComponent(link.attr('data-title'));
    var leftPosition, topPosition;
    //Allow for borders.
    var width = 750;
    var height = 550;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    window.open('//www.pinterest.com/pin/create/button/?url='+ u +'&media=' + iu ,'sharer',windowFeatures);
    return false;
};
 

function initScroll(){
  var headerHeight = 20;//jQuery('#main-header').height() + 20;
  var winHeight = jQuery(window).height();
  var winWidth = jQuery(window).width();
  
  var headerContent = jQuery('#main-header .content-block');
  var header = jQuery('#main-header');
  var headerTop = parseInt(header.css('margin-top'));
  var stickySharesWrap = jQuery('.sticky-shares-wrap');
  var stickyShares = jQuery('.sticky-shares');
  var stickySharesHeight = stickyShares.height();
  var sharesTopOffset = 50;// 
  var innerPostSb = jQuery('.inner-post-sb');
  var stickyInnerSbWrap = jQuery('.inner-post-sb-wrap');
  var afterEntryWrap = jQuery('.after-entry-wrap');
  
  checkPullQuote(0, winHeight, winHeight, winWidth);
  
  jQuery(window).scroll(function(e){
      var offsetY = jQuery(window).scrollTop();
      var bottomEdge = offsetY + winHeight;
      
      handleParallax(offsetY);
      checkPullQuote(offsetY, winHeight, bottomEdge, winWidth);
      //var swPercent = jQuery(window).height() / offsetY; 
      //console.log( );
      
      /*var topArtShift = 100 - offsetY;
      if(topArtShift < 0){
        topArtShift = 0;
      }
      */
      //var fbTo = ( jQuery(window).height() - offsetY ) / jQuery(window).height();
      //console.log( fbTo );
      var scrll = offsetY * 0.05;
      if(scrll > 100){
        scrll = 100;
      }
      
      //console.log(scrll);
      
      jQuery('.article-hp-wdd .ahc-img').css('background-position', 'center ' + scrll + '%');
      
      var scrllL = offsetY * 0.035;
      if(scrllL > 100){
        scrllL = 100;
      }
      jQuery('.article-hp-cl-content .hp-wdd-img-lnk').css('background-position', 'center ' + scrllL + '%');
      
      
      
      
       
      
      /*
      if(offsetY > headerTop){
        header.addClass('fixed');
      }
      else{
        header.removeClass('fixed');
      } */
      
      
      var edgeTop;
      
      if(stickySharesWrap.length > 0 ){
        edgeTop = afterEntryWrap.length > 0 ? afterEntryWrap.offset().top : null;
        var stickyTop = stickySharesWrap.offset().top;
      
      
      if(offsetY > stickyTop - headerHeight ){
         stickySharesWrap.addClass('fixed');
         
          
         
         
         var delta = (offsetY + sharesTopOffset + stickySharesHeight)  - edgeTop;
         
         if(delta > 0){
           stickyShares.css('margin-top', -delta); 
         }
         else{
           stickyShares.css('margin-top', 0);
         }
         
         
         
         
      }
      else{
        stickySharesWrap.removeClass('fixed');
        stickyShares.css('margin-top', 0);
      }
      
      }
    
      
      
      
  });
}

function checkPullQuote(offsetY, winHeight, bottomEdge, winWidth){
  if( winWidth < 1200 || !jQuery('.simplePullQuote').length ){
    return;
  }  
    
  jQuery('.simplePullQuote').each(function(i,e){
    var widget = jQuery(e);
    if( widget.offset().top + widget.height()  < bottomEdge ){
      widget.addClass('showed');
    }  
  });
  

}


var prevScroll = 0;
function handleParallax(offsetY){
  var imgBlock = jQuery('#ft-inner-image');
  if(!imgBlock.length)
    return;
  
  var imgWrap = jQuery('.cw-single div.article-top-block');  
    
  var imgBlockBottom =  imgWrap.offset().top + imgBlock.height();
  
  var delta = offsetY / imgBlockBottom;
  if(delta > 1 )
    delta = 1;
  
  if(delta < 0)
    delta = 0;  
    
  var backroundPos = 50 - Math.round(delta * 50);
  imgBlock.css('top', backroundPos +'px');  

  
}

function initAnimationLinks(){
  jQuery('.anim-link').each(function(i,e){
     var link = jQuery(e);
     if(link.hasClass('text-link-effect')){
       return;
     }
     
    link.addClass('inner-link-effect');
      
     var word = link.text();
     var html = '';
     for(var i = 0; i < word.length; i++)
       html += '<span class="ae-letter">'+ word[i]  +'</span>';
       
     link.html(html);
     
     
     
    var letters = link.find('.ae-letter');
    var lettersIndex = 0;
    var lettersIndex2 = 0;
    var lettersLength = letters.length;
    var interval;
    var secondInterval;
    var totalSpeed = 600;
    var speed = Math.round( totalSpeed / lettersLength );
    var step = 1;
    var minSpeed = 5;
    if( speed < minSpeed)
      step = Math.ceil(minSpeed / speed);
    
    if(step > 2)
      step = 2;
    
    link.closest('.article-wdd').mouseenter(function(){
       
       
       clearInterval(interval);
       clearInterval(secondInterval);
       
       interval = setInterval(function(){
          for(var j = 0; j < step; j++  ){
            var tmpIndex = lettersIndex + j;
            if( tmpIndex < lettersLength )
              jQuery(letters[ tmpIndex ]).addClass('blue-letter');
              
            var tmpReverseIndex = lettersLength - (tmpIndex + 1);
            //if(tmpReverseIndex >= 0)
            //  jQuery(letters[ tmpReverseIndex ]).addClass('ae-underline');
          }
          
          lettersIndex += step;
          if(lettersIndex >= lettersLength){
            lettersIndex = lettersLength; 
            clearInterval(interval);
           
          }
          
        }, speed);
        
    }); 
    
    link.closest('.article-wdd').mouseleave(function(){
       clearInterval(interval);
       clearInterval(secondInterval);
        
       interval = setInterval(function(){
       
          
               /*jQuery(letters[lettersIndex]).removeClass('red-letter');
               jQuery(letters[lettersLength - (lettersIndex + 1)]).removeClass('ae-underline');
               */
               
            for(var j = 0; j < step; j++  ){
              var tmpIndex = lettersIndex + j;
              if( tmpIndex < lettersLength )
                jQuery(letters[ tmpIndex ]).removeClass('blue-letter');
              
              var tmpReverseIndex = lettersLength - (tmpIndex + 1);
              //if(tmpReverseIndex >= 0)
              //  jQuery(letters[ tmpReverseIndex ]).removeClass('ae-underline');
            }
               
            lettersIndex -= step;
            if(lettersIndex < -1 ){
              clearInterval(interval);
              lettersIndex = 0;
            }
          
          
        }, speed);
    }); 
     
     
  });   
}


var wddWidgetsData = {};
function updateShareWidgets(){
  
  jQuery('.shares-data').each(function(i, e){
     var widget = jQuery(e);
     
     var widgetUrl = widget.attr('data-url');
     handleFacebookShares(widgetUrl, widget);
     handleTwitterShares(widgetUrl, widget);
     handleLinkedInShares(widgetUrl, widget);
     handlePlusShares(widgetUrl, widget);
     
       
  });
}

function checkWidgetReady(url,widget){
  
  if(!wddWidgetsData[url])
    return;
    
  
  var total = 0;
  if(typeof wddWidgetsData[url].facebook !== "undefined" && wddWidgetsData[url].facebook !== null){
    total += wddWidgetsData[url].facebook;
  }  
  else{
    return;
  }
    
  if(typeof wddWidgetsData[url].gplus !== "undefined" && wddWidgetsData[url].gplus !== null){
    total += wddWidgetsData[url].gplus;
  }  
  else{
    return;
  }  
  
  if(typeof wddWidgetsData[url].twitter !== "undefined" && wddWidgetsData[url].twitter !== null){
    total += wddWidgetsData[url].twitter;
  }  
  else{
    return;  
  }
    
  if(typeof wddWidgetsData[url].linkedin !== "undefined" && wddWidgetsData[url].linkedin !== null){
    total += wddWidgetsData[url].linkedin;
  }  
  else{
    return;
  }   
  
  
  
  widget.html(total);
  //widget.attr('data-total', total);  
  
  //total = formatShareNumber(total);
  //widget.find('.share-inline-label-count').text(total);  
  //widget.find('.ww-count').text(total);
    
}

function number_format (number, decimals, dec_point, thousands_sep) {
    var n = number, prec = decimals;

    var toFixedFix = function (n,prec) {
        var k = Math.pow(10,prec);
        return (Math.round(n*k)/k).toString();
    };

    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
    var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;

    var s = (prec > 0) ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec); 
    //fix for IE parseFloat(0.55).toFixed(0) = 0;

    var abs = toFixedFix(Math.abs(n), prec);
    var _, i;

    if (abs >= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;

        _[0] = s.slice(0,i + (n < 0)) +
               _[0].slice(i).replace(/(\d{3})/g, sep+'$1');
        s = _.join(dec);
    } else {
        s = s.replace('.', dec);
    }

    var decPos = s.indexOf(dec);
    if (prec >= 1 && decPos !== -1 && (s.length-decPos-1) < prec) {
        s += new Array(prec-(s.length-decPos-1)).join(0)+'0';
    }
    else if (prec >= 1 && decPos === -1) {
        s += dec+new Array(prec).join(0)+'0';
    }
    return s; 
}

function handleFacebookShares(url, widget){
  if(!wddWidgetsData[url])
      wddWidgetsData[url] = {};
  
  if(wddWidgetsData[url].facebook){
    
    //widget.find('.fb-stub').attr('data-shares', formatShareNumber(wddWidgetsData[url].facebook) );
    //widget.find('.fb-stub').attr('data-shares-init', wddWidgetsData[url].facebook );
    checkWidgetReady(url,widget);
  }
      
  jQuery.getJSON( "https://graph.facebook.com", {
    "id" : url
  })
  .done(function( data ) {
    
    wddWidgetsData[url].facebook = data.shares ? data.shares : 0;
    //widget.find('.fb-stub').attr('data-shares', formatShareNumber(wddWidgetsData[url].facebook) );
    //widget.find('.fb-stub').attr('data-shares-init', wddWidgetsData[url].facebook );
    checkWidgetReady(url,widget);
  });
}


function handleTwitterShares(url, widget){
  if(!wddWidgetsData[url])
      wddWidgetsData[url] = {};
  
  if(wddWidgetsData[url].twitter){
    //widget.find('.tw-stub').attr('data-shares', formatShareNumber(wddWidgetsData[url].twitter) );
    //widget.find('.tw-stub').attr('data-shares-init', wddWidgetsData[url].twitter );
    checkWidgetReady(url,widget);
  }
  
  var callbackName = 'twSharesCallback' + widget.attr('data-url').replace(/[\-\/:.]/g,'_');
  
  window[callbackName] = function(data){
      wddWidgetsData[url].twitter = data.count ? data.count : 0;
      //widget.find('.tw-stub').attr('data-shares', formatShareNumber(wddWidgetsData[url].twitter) );
      //widget.find('.tw-stub').attr('data-shares-init', wddWidgetsData[url].twitter);
      checkWidgetReady(url,widget);
  };
  
  
  var script = document.createElement('script');
	script.async = true;
	script.src = 'https://cdn.api.twitter.com/1/urls/count.json?url=' + encodeURIComponent(url) + '&callback=' + callbackName;
	document.body.appendChild(script);
}

function handleLinkedInShares(url, widget){
  if(!wddWidgetsData[url])
      wddWidgetsData[url] = {};
  
  if(wddWidgetsData[url].linkedin){
    //widget.find('.linkedin-stub').attr('data-shares', formatShareNumber(wddWidgetsData[url].linkedin) );
    //widget.find('.linkedin-stub').attr('data-shares-init', wddWidgetsData[url].linkedin );
    checkWidgetReady(url,widget);
  }
  
  var callbackName = 'liSharesCallback' + widget.attr('data-url').replace(/[\-\/:.]/g,'_');
  
  window[callbackName] = function(data){
      wddWidgetsData[url].linkedin = data.count ? data.count : 0;
      //widget.find('.linkedin-stub').attr('data-shares', formatShareNumber(wddWidgetsData[url].linkedin) );
      //widget.find('.linkedin-stub').attr('data-shares-init', wddWidgetsData[url].linkedin );
      checkWidgetReady(url,widget);
  };
  
  
  var script = document.createElement('script');
	script.async = true;
	script.src = "http://www.linkedin.com/countserv/count/share?url="+ encodeURIComponent(url) +"&format=jsonp&callback=" + callbackName;
	document.body.appendChild(script);
}

function handlePlusShares(url, widget){
  if(!wddWidgetsData[url])
      wddWidgetsData[url] = {};
  
  if(wddWidgetsData[url].gplus){
    //widget.find('.gplus-stub').attr('data-shares', formatShareNumber(wddWidgetsData[url].gplus) );
    //widget.find('.gplus-stub').attr('data-shares-init', wddWidgetsData[url].gplus );
    checkWidgetReady(url,widget);
  }
  
  if(! (gapi && gapi.client) )
    return;
  
  var params = {
        nolog: true,
        id: url,
        source: "widget",
        userId: "@viewer",
        groupId: "@self"
      };
      
      gapi.client.rpcRequest('pos.plusones.get', 'v1', params).execute(function(resp) {
        wddWidgetsData[url].gplus = resp.result && resp.result.metadata.globalCounts.count ? resp.result.metadata.globalCounts.count : 0;
        //widget.find('.gplus-stub').attr('data-shares', formatShareNumber(wddWidgetsData[url].gplus) );
        //widget.find('.gplus-stub').attr('data-shares-init', wddWidgetsData[url].gplus );
        checkWidgetReady(url,widget);
      });  
    
 
}

function OnGplusLoadCallback(){
  gapi.client.setApiKey('AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ');
  
  jQuery('.shares-data').each(function(i, e){
     var widget = jQuery(e);
     var url = widget.attr('data-url');
     
     if(!wddWidgetsData[url])
       wddWidgetsData[url] = {};
     
      var params = {
        nolog: true,
        id: url,
        source: "widget",
        userId: "@viewer",
        groupId: "@self"
      };
      
      gapi.client.rpcRequest('pos.plusones.get', 'v1', params).execute(function(resp) {
        wddWidgetsData[url].gplus = resp.result.metadata && resp.result.metadata.globalCounts.count ? resp.result.metadata.globalCounts.count : 0;
        //widget.find('.gplus-stub').attr('data-shares', formatShareNumber(wddWidgetsData[url].gplus) );
        //widget.find('.gplus-stub').attr('data-shares-init', wddWidgetsData[url].gplus );
        checkWidgetReady(url,widget);
      });
     
  });
  
  
}

function formatShareNumber(total){
  if(total >= 1000000 ){
    total = number_format(total / 1000000, 1, '.', ',') + 'M';
  }
  else if(total >= 1000){
    total = number_format(total / 1000, 1, '.', ',') + 'K';
  } 
  
  return total;
}

function articlesPositionGenerator(){
  
  
  
  var left = 0;
  var leftOffset = 0;
  var top  = 0;
  var posIndexes = [ 
    { end: 1, width : 45, heightRatio : 0.7, cssClass : 'wip-large' }, 
    { end: 4, width : 35, heightRatio : 0.6 },
    { width : 20, heightRatio : 0.8 }
  ];
  
  var posIndex = 0;
  
  var maxHeight = 0;
  var currentMaxHeight = 0;
  //var initWidth = jQuery('#articles-content').width();
  
  //return;
  var categoryColors = [ '#5fa3ec', '#ef707f', '#28c1f1', '#3aca63', '#5fa3ec', '#ef707f', '#ef662f' ];
  jQuery('#articles-content > article').each(function(i, e){
     var item = jQuery(e);
     var posIndexData = posIndexes[posIndex];
     
     if( !posIndexData.end || i <= posIndexData.end ){
       var newWidth = posIndexData.width + '%';//initWidth * 0.01 * posIndexData.width; 
       item.css('width', newWidth );
       item.addClass('wip-repose')
       if(posIndexData.cssClass){
         item.addClass(posIndexData.cssClass);
       }
       item.css('height', item.width() * posIndexData.heightRatio );
       item.css('top', top);
       item.css('left', leftOffset + '%');
       
       item.find('.category').css('background-color', categoryColors[Math.floor(Math.random() * categoryColors.length)] );
       
       
       
       top += item.outerHeight();
       
       currentMaxHeight += item.outerHeight();
       
       /*if(item.width() > leftOffset){
         leftOffset = item.width();
       } */
       
       if(i ==  posIndexData.end ){
         top = 0;
         //left += leftOffset;
         leftOffset += posIndexData.width;
         posIndex++;
         if(currentMaxHeight > maxHeight){
           maxHeight = currentMaxHeight;
         }
         currentMaxHeight = 0;
         
       }
       
     } 
     
     
  });
  
  jQuery('#articles-content').css('min-height', maxHeight );
  
}


function isTouchScreen(){
    if ("ontouchstart" in window || navigator.msMaxTouchPoints)
        {
            return true;
        } else {
            return false;
        }
}

function initLogo(){
  
  var current_frame, total_frames, logoPath, length, handle, logoObject, opacity, runningLogoAnimation;
  
  jQuery('#logo').mouseenter(function(){
      if(isTouchScreen() ){
        return;
      }
      rerunLogoAnimation();
  });
  
  jQuery('#logo').mouseleave(function(){
    if(isTouchScreen() ){
        return;
    }
    current_frame = total_frames;
  });
  
  if( !jQuery('#logo-svg-wrap').attr('id') )
    return;

  logoObject = document.getElementById('logo-svg-wrap').cloneNode(true);
  

var initLogoAnimation = function() {
  current_frame = 0;
  total_frames = 60;
  opacity = 0;
  
  length = new Array();
  
    logoPath = document.getElementById('logo_svg_path');
    l =logoPath.getTotalLength();
    length = l;
    logoPath.style.strokeDasharray = l + ' ' + l; 
    logoPath.style.strokeDashoffset = l;
  
  handle = 0;
}
 
 
   var drawLogoAnimation = function() {
   var progress = current_frame/total_frames;
   if (progress > 1) {
     
     opacity += 0.04;
     if(opacity >= 1){
       opacity = 1;
       window.cancelAnimationFrame(handle);
       runningLogoAnimation = false;	
     }
     else
     	handle = window.requestAnimationFrame(drawLogoAnimation);
      logoPath.style.fill = "rgba(250,178,58,"+ opacity +")";
      

   } else {
     current_frame++;
	   logoPath.style.strokeDashoffset = Math.floor(length * (1 - progress));
     handle = window.requestAnimationFrame(drawLogoAnimation);
   }
};

   var rerunLogoAnimation = function() {
    if(runningLogoAnimation)
      return;
    var old = document.getElementById('logo-svg-wrap');//document.getElementsByTagName('div')[0];
    old.parentNode.removeChild(old);
    document.getElementById('logo').appendChild(logoObject);
    document.getElementById('logo_svg_path').style.fill = "none";
    initLogoAnimation();
    drawLogoAnimation();
    runningLogoAnimation = true;
  };

}


function strip_tags( str ){	// Strip HTML and PHP tags from a string
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

	return str.replace(/<\/?[^>]+>/gi, '');
}


// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.0 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\

(function(a){var b="0.3.4",c="hasOwnProperty",d=/[\.\/]/,e="*",f=function(){},g=function(a,b){return a-b},h,i,j={n:{}},k=function(a,b){var c=j,d=i,e=Array.prototype.slice.call(arguments,2),f=k.listeners(a),l=0,m=!1,n,o=[],p={},q=[],r=h,s=[];h=a,i=0;for(var t=0,u=f.length;t<u;t++)"zIndex"in f[t]&&(o.push(f[t].zIndex),f[t].zIndex<0&&(p[f[t].zIndex]=f[t]));o.sort(g);while(o[l]<0){n=p[o[l++]],q.push(n.apply(b,e));if(i){i=d;return q}}for(t=0;t<u;t++){n=f[t];if("zIndex"in n)if(n.zIndex==o[l]){q.push(n.apply(b,e));if(i)break;do{l++,n=p[o[l]],n&&q.push(n.apply(b,e));if(i)break}while(n)}else p[n.zIndex]=n;else{q.push(n.apply(b,e));if(i)break}}i=d,h=r;return q.length?q:null};k.listeners=function(a){var b=a.split(d),c=j,f,g,h,i,k,l,m,n,o=[c],p=[];for(i=0,k=b.length;i<k;i++){n=[];for(l=0,m=o.length;l<m;l++){c=o[l].n,g=[c[b[i]],c[e]],h=2;while(h--)f=g[h],f&&(n.push(f),p=p.concat(f.f||[]))}o=n}return p},k.on=function(a,b){var c=a.split(d),e=j;for(var g=0,h=c.length;g<h;g++)e=e.n,!e[c[g]]&&(e[c[g]]={n:{}}),e=e[c[g]];e.f=e.f||[];for(g=0,h=e.f.length;g<h;g++)if(e.f[g]==b)return f;e.f.push(b);return function(a){+a==+a&&(b.zIndex=+a)}},k.stop=function(){i=1},k.nt=function(a){if(a)return(new RegExp("(?:\\.|\\/|^)"+a+"(?:\\.|\\/|$)")).test(h);return h},k.off=k.unbind=function(a,b){var f=a.split(d),g,h,i,k,l,m,n,o=[j];for(k=0,l=f.length;k<l;k++)for(m=0;m<o.length;m+=i.length-2){i=[m,1],g=o[m].n;if(f[k]!=e)g[f[k]]&&i.push(g[f[k]]);else for(h in g)g[c](h)&&i.push(g[h]);o.splice.apply(o,i)}for(k=0,l=o.length;k<l;k++){g=o[k];while(g.n){if(b){if(g.f){for(m=0,n=g.f.length;m<n;m++)if(g.f[m]==b){g.f.splice(m,1);break}!g.f.length&&delete g.f}for(h in g.n)if(g.n[c](h)&&g.n[h].f){var p=g.n[h].f;for(m=0,n=p.length;m<n;m++)if(p[m]==b){p.splice(m,1);break}!p.length&&delete g.n[h].f}}else{delete g.f;for(h in g.n)g.n[c](h)&&g.n[h].f&&delete g.n[h].f}g=g.n}}},k.once=function(a,b){var c=function(){var d=b.apply(this,arguments);k.unbind(a,c);return d};return k.on(a,c)},k.version=b,k.toString=function(){return"You are running Eve "+b},typeof module!="undefined"&&module.exports?module.exports=k:typeof define!="undefined"?define("eve",[],function(){return k}):a.eve=k})(this),function(){function cF(a){for(var b=0;b<cy.length;b++)cy[b].el.paper==a&&cy.splice(b--,1)}function cE(b,d,e,f,h,i){e=Q(e);var j,k,l,m=[],o,p,q,t=b.ms,u={},v={},w={};if(f)for(y=0,z=cy.length;y<z;y++){var x=cy[y];if(x.el.id==d.id&&x.anim==b){x.percent!=e?(cy.splice(y,1),l=1):k=x,d.attr(x.totalOrigin);break}}else f=+v;for(var y=0,z=b.percents.length;y<z;y++){if(b.percents[y]==e||b.percents[y]>f*b.top){e=b.percents[y],p=b.percents[y-1]||0,t=t/b.top*(e-p),o=b.percents[y+1],j=b.anim[e];break}f&&d.attr(b.anim[b.percents[y]])}if(!!j){if(!k){for(var A in j)if(j[g](A))if(U[g](A)||d.paper.customAttributes[g](A)){u[A]=d.attr(A),u[A]==null&&(u[A]=T[A]),v[A]=j[A];switch(U[A]){case C:w[A]=(v[A]-u[A])/t;break;case"colour":u[A]=a.getRGB(u[A]);var B=a.getRGB(v[A]);w[A]={r:(B.r-u[A].r)/t,g:(B.g-u[A].g)/t,b:(B.b-u[A].b)/t};break;case"path":var D=bR(u[A],v[A]),E=D[1];u[A]=D[0],w[A]=[];for(y=0,z=u[A].length;y<z;y++){w[A][y]=[0];for(var F=1,G=u[A][y].length;F<G;F++)w[A][y][F]=(E[y][F]-u[A][y][F])/t}break;case"transform":var H=d._,I=ca(H[A],v[A]);if(I){u[A]=I.from,v[A]=I.to,w[A]=[],w[A].real=!0;for(y=0,z=u[A].length;y<z;y++){w[A][y]=[u[A][y][0]];for(F=1,G=u[A][y].length;F<G;F++)w[A][y][F]=(v[A][y][F]-u[A][y][F])/t}}else{var J=d.matrix||new cb,K={_:{transform:H.transform},getBBox:function(){return d.getBBox(1)}};u[A]=[J.a,J.b,J.c,J.d,J.e,J.f],b$(K,v[A]),v[A]=K._.transform,w[A]=[(K.matrix.a-J.a)/t,(K.matrix.b-J.b)/t,(K.matrix.c-J.c)/t,(K.matrix.d-J.d)/t,(K.matrix.e-J.e)/t,(K.matrix.f-J.f)/t]}break;case"csv":var L=r(j[A])[s](c),M=r(u[A])[s](c);if(A=="clip-rect"){u[A]=M,w[A]=[],y=M.length;while(y--)w[A][y]=(L[y]-u[A][y])/t}v[A]=L;break;default:L=[][n](j[A]),M=[][n](u[A]),w[A]=[],y=d.paper.customAttributes[A].length;while(y--)w[A][y]=((L[y]||0)-(M[y]||0))/t}}var O=j.easing,P=a.easing_formulas[O];if(!P){P=r(O).match(N);if(P&&P.length==5){var R=P;P=function(a){return cC(a,+R[1],+R[2],+R[3],+R[4],t)}}else P=bf}q=j.start||b.start||+(new Date),x={anim:b,percent:e,timestamp:q,start:q+(b.del||0),status:0,initstatus:f||0,stop:!1,ms:t,easing:P,from:u,diff:w,to:v,el:d,callback:j.callback,prev:p,next:o,repeat:i||b.times,origin:d.attr(),totalOrigin:h},cy.push(x);if(f&&!k&&!l){x.stop=!0,x.start=new Date-t*f;if(cy.length==1)return cA()}l&&(x.start=new Date-x.ms*f),cy.length==1&&cz(cA)}else k.initstatus=f,k.start=new Date-k.ms*f;eve("raphael.anim.start."+d.id,d,b)}}function cD(a,b){var c=[],d={};this.ms=b,this.times=1;if(a){for(var e in a)a[g](e)&&(d[Q(e)]=a[e],c.push(Q(e)));c.sort(bd)}this.anim=d,this.top=c[c.length-1],this.percents=c}function cC(a,b,c,d,e,f){function o(a,b){var c,d,e,f,j,k;for(e=a,k=0;k<8;k++){f=m(e)-a;if(z(f)<b)return e;j=(3*i*e+2*h)*e+g;if(z(j)<1e-6)break;e=e-f/j}c=0,d=1,e=a;if(e<c)return c;if(e>d)return d;while(c<d){f=m(e);if(z(f-a)<b)return e;a>f?c=e:d=e,e=(d-c)/2+c}return e}function n(a,b){var c=o(a,b);return((l*c+k)*c+j)*c}function m(a){return((i*a+h)*a+g)*a}var g=3*b,h=3*(d-b)-g,i=1-g-h,j=3*c,k=3*(e-c)-j,l=1-j-k;return n(a,1/(200*f))}function cq(){return this.x+q+this.y+q+this.width+" × "+this.height}function cp(){return this.x+q+this.y}function cb(a,b,c,d,e,f){a!=null?(this.a=+a,this.b=+b,this.c=+c,this.d=+d,this.e=+e,this.f=+f):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function bH(b,c,d){b=a._path2curve(b),c=a._path2curve(c);var e,f,g,h,i,j,k,l,m,n,o=d?0:[];for(var p=0,q=b.length;p<q;p++){var r=b[p];if(r[0]=="M")e=i=r[1],f=j=r[2];else{r[0]=="C"?(m=[e,f].concat(r.slice(1)),e=m[6],f=m[7]):(m=[e,f,e,f,i,j,i,j],e=i,f=j);for(var s=0,t=c.length;s<t;s++){var u=c[s];if(u[0]=="M")g=k=u[1],h=l=u[2];else{u[0]=="C"?(n=[g,h].concat(u.slice(1)),g=n[6],h=n[7]):(n=[g,h,g,h,k,l,k,l],g=k,h=l);var v=bG(m,n,d);if(d)o+=v;else{for(var w=0,x=v.length;w<x;w++)v[w].segment1=p,v[w].segment2=s,v[w].bez1=m,v[w].bez2=n;o=o.concat(v)}}}}}return o}function bG(b,c,d){var e=a.bezierBBox(b),f=a.bezierBBox(c);if(!a.isBBoxIntersect(e,f))return d?0:[];var g=bB.apply(0,b),h=bB.apply(0,c),i=~~(g/5),j=~~(h/5),k=[],l=[],m={},n=d?0:[];for(var o=0;o<i+1;o++){var p=a.findDotsAtSegment.apply(a,b.concat(o/i));k.push({x:p.x,y:p.y,t:o/i})}for(o=0;o<j+1;o++)p=a.findDotsAtSegment.apply(a,c.concat(o/j)),l.push({x:p.x,y:p.y,t:o/j});for(o=0;o<i;o++)for(var q=0;q<j;q++){var r=k[o],s=k[o+1],t=l[q],u=l[q+1],v=z(s.x-r.x)<.001?"y":"x",w=z(u.x-t.x)<.001?"y":"x",x=bD(r.x,r.y,s.x,s.y,t.x,t.y,u.x,u.y);if(x){if(m[x.x.toFixed(4)]==x.y.toFixed(4))continue;m[x.x.toFixed(4)]=x.y.toFixed(4);var y=r.t+z((x[v]-r[v])/(s[v]-r[v]))*(s.t-r.t),A=t.t+z((x[w]-t[w])/(u[w]-t[w]))*(u.t-t.t);y>=0&&y<=1&&A>=0&&A<=1&&(d?n++:n.push({x:x.x,y:x.y,t1:y,t2:A}))}}return n}function bF(a,b){return bG(a,b,1)}function bE(a,b){return bG(a,b)}function bD(a,b,c,d,e,f,g,h){if(!(x(a,c)<y(e,g)||y(a,c)>x(e,g)||x(b,d)<y(f,h)||y(b,d)>x(f,h))){var i=(a*d-b*c)*(e-g)-(a-c)*(e*h-f*g),j=(a*d-b*c)*(f-h)-(b-d)*(e*h-f*g),k=(a-c)*(f-h)-(b-d)*(e-g);if(!k)return;var l=i/k,m=j/k,n=+l.toFixed(2),o=+m.toFixed(2);if(n<+y(a,c).toFixed(2)||n>+x(a,c).toFixed(2)||n<+y(e,g).toFixed(2)||n>+x(e,g).toFixed(2)||o<+y(b,d).toFixed(2)||o>+x(b,d).toFixed(2)||o<+y(f,h).toFixed(2)||o>+x(f,h).toFixed(2))return;return{x:l,y:m}}}function bC(a,b,c,d,e,f,g,h,i){if(!(i<0||bB(a,b,c,d,e,f,g,h)<i)){var j=1,k=j/2,l=j-k,m,n=.01;m=bB(a,b,c,d,e,f,g,h,l);while(z(m-i)>n)k/=2,l+=(m<i?1:-1)*k,m=bB(a,b,c,d,e,f,g,h,l);return l}}function bB(a,b,c,d,e,f,g,h,i){i==null&&(i=1),i=i>1?1:i<0?0:i;var j=i/2,k=12,l=[-0.1252,.1252,-0.3678,.3678,-0.5873,.5873,-0.7699,.7699,-0.9041,.9041,-0.9816,.9816],m=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],n=0;for(var o=0;o<k;o++){var p=j*l[o]+j,q=bA(p,a,c,e,g),r=bA(p,b,d,f,h),s=q*q+r*r;n+=m[o]*w.sqrt(s)}return j*n}function bA(a,b,c,d,e){var f=-3*b+9*c-9*d+3*e,g=a*f+6*b-12*c+6*d;return a*g-3*b+3*c}function by(a,b){var c=[];for(var d=0,e=a.length;e-2*!b>d;d+=2){var f=[{x:+a[d-2],y:+a[d-1]},{x:+a[d],y:+a[d+1]},{x:+a[d+2],y:+a[d+3]},{x:+a[d+4],y:+a[d+5]}];b?d?e-4==d?f[3]={x:+a[0],y:+a[1]}:e-2==d&&(f[2]={x:+a[0],y:+a[1]},f[3]={x:+a[2],y:+a[3]}):f[0]={x:+a[e-2],y:+a[e-1]}:e-4==d?f[3]=f[2]:d||(f[0]={x:+a[d],y:+a[d+1]}),c.push(["C",(-f[0].x+6*f[1].x+f[2].x)/6,(-f[0].y+6*f[1].y+f[2].y)/6,(f[1].x+6*f[2].x-f[3].x)/6,(f[1].y+6*f[2].y-f[3].y)/6,f[2].x,f[2].y])}return c}function bx(){return this.hex}function bv(a,b,c){function d(){var e=Array.prototype.slice.call(arguments,0),f=e.join("␀"),h=d.cache=d.cache||{},i=d.count=d.count||[];if(h[g](f)){bu(i,f);return c?c(h[f]):h[f]}i.length>=1e3&&delete h[i.shift()],i.push(f),h[f]=a[m](b,e);return c?c(h[f]):h[f]}return d}function bu(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return a.push(a.splice(c,1)[0])}function bm(a){if(Object(a)!==a)return a;var b=new a.constructor;for(var c in a)a[g](c)&&(b[c]=bm(a[c]));return b}function a(c){if(a.is(c,"function"))return b?c():eve.on("raphael.DOMload",c);if(a.is(c,E))return a._engine.create[m](a,c.splice(0,3+a.is(c[0],C))).add(c);var d=Array.prototype.slice.call(arguments,0);if(a.is(d[d.length-1],"function")){var e=d.pop();return b?e.call(a._engine.create[m](a,d)):eve.on("raphael.DOMload",function(){e.call(a._engine.create[m](a,d))})}return a._engine.create[m](a,arguments)}a.version="2.1.0",a.eve=eve;var b,c=/[, ]+/,d={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},e=/\{(\d+)\}/g,f="prototype",g="hasOwnProperty",h={doc:document,win:window},i={was:Object.prototype[g].call(h.win,"Raphael"),is:h.win.Raphael},j=function(){this.ca=this.customAttributes={}},k,l="appendChild",m="apply",n="concat",o="createTouch"in h.doc,p="",q=" ",r=String,s="split",t="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[s](q),u={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},v=r.prototype.toLowerCase,w=Math,x=w.max,y=w.min,z=w.abs,A=w.pow,B=w.PI,C="number",D="string",E="array",F="toString",G="fill",H=Object.prototype.toString,I={},J="push",K=a._ISURL=/^url\(['"]?([^\)]+?)['"]?\)$/i,L=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,M={NaN:1,Infinity:1,"-Infinity":1},N=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,O=w.round,P="setAttribute",Q=parseFloat,R=parseInt,S=r.prototype.toUpperCase,T=a._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0},U=a._availableAnimAttrs={blur:C,"clip-rect":"csv",cx:C,cy:C,fill:"colour","fill-opacity":C,"font-size":C,height:C,opacity:C,path:"path",r:C,rx:C,ry:C,stroke:"colour","stroke-opacity":C,"stroke-width":C,transform:"transform",width:C,x:C,y:C},V=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,W=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,X={hs:1,rg:1},Y=/,?([achlmqrstvxz]),?/gi,Z=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,$=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,_=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,ba=a._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,bb={},bc=function(a,b){return a.key-b.key},bd=function(a,b){return Q(a)-Q(b)},be=function(){},bf=function(a){return a},bg=a._rectPath=function(a,b,c,d,e){if(e)return[["M",a+e,b],["l",c-e*2,0],["a",e,e,0,0,1,e,e],["l",0,d-e*2],["a",e,e,0,0,1,-e,e],["l",e*2-c,0],["a",e,e,0,0,1,-e,-e],["l",0,e*2-d],["a",e,e,0,0,1,e,-e],["z"]];return[["M",a,b],["l",c,0],["l",0,d],["l",-c,0],["z"]]},bh=function(a,b,c,d){d==null&&(d=c);return[["M",a,b],["m",0,-d],["a",c,d,0,1,1,0,2*d],["a",c,d,0,1,1,0,-2*d],["z"]]},bi=a._getPath={path:function(a){return a.attr("path")},circle:function(a){var b=a.attrs;return bh(b.cx,b.cy,b.r)},ellipse:function(a){var b=a.attrs;return bh(b.cx,b.cy,b.rx,b.ry)},rect:function(a){var b=a.attrs;return bg(b.x,b.y,b.width,b.height,b.r)},image:function(a){var b=a.attrs;return bg(b.x,b.y,b.width,b.height)},text:function(a){var b=a._getBBox();return bg(b.x,b.y,b.width,b.height)}},bj=a.mapPath=function(a,b){if(!b)return a;var c,d,e,f,g,h,i;a=bR(a);for(e=0,g=a.length;e<g;e++){i=a[e];for(f=1,h=i.length;f<h;f+=2)c=b.x(i[f],i[f+1]),d=b.y(i[f],i[f+1]),i[f]=c,i[f+1]=d}return a};a._g=h,a.type=h.win.SVGAngle||h.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML";if(a.type=="VML"){var bk=h.doc.createElement("div"),bl;bk.innerHTML='<v:shape adj="1"/>',bl=bk.firstChild,bl.style.behavior="url(#default#VML)";if(!bl||typeof bl.adj!="object")return a.type=p;bk=null}a.svg=!(a.vml=a.type=="VML"),a._Paper=j,a.fn=k=j.prototype=a.prototype,a._id=0,a._oid=0,a.is=function(a,b){b=v.call(b);if(b=="finite")return!M[g](+a);if(b=="array")return a instanceof Array;return b=="null"&&a===null||b==typeof a&&a!==null||b=="object"&&a===Object(a)||b=="array"&&Array.isArray&&Array.isArray(a)||H.call(a).slice(8,-1).toLowerCase()==b},a.angle=function(b,c,d,e,f,g){if(f==null){var h=b-d,i=c-e;if(!h&&!i)return 0;return(180+w.atan2(-i,-h)*180/B+360)%360}return a.angle(b,c,f,g)-a.angle(d,e,f,g)},a.rad=function(a){return a%360*B/180},a.deg=function(a){return a*180/B%360},a.snapTo=function(b,c,d){d=a.is(d,"finite")?d:10;if(a.is(b,E)){var e=b.length;while(e--)if(z(b[e]-c)<=d)return b[e]}else{b=+b;var f=c%b;if(f<d)return c-f;if(f>b-d)return c-f+b}return c};var bn=a.createUUID=function(a,b){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(a,b).toUpperCase()}}(/[xy]/g,function(a){var b=w.random()*16|0,c=a=="x"?b:b&3|8;return c.toString(16)});a.setWindow=function(b){eve("raphael.setWindow",a,h.win,b),h.win=b,h.doc=h.win.document,a._engine.initWin&&a._engine.initWin(h.win)};var bo=function(b){if(a.vml){var c=/^\s+|\s+$/g,d;try{var e=new ActiveXObject("htmlfile");e.write("<body>"),e.close(),d=e.body}catch(f){d=createPopup().document.body}var g=d.createTextRange();bo=bv(function(a){try{d.style.color=r(a).replace(c,p);var b=g.queryCommandValue("ForeColor");b=(b&255)<<16|b&65280|(b&16711680)>>>16;return"#"+("000000"+b.toString(16)).slice(-6)}catch(e){return"none"}})}else{var i=h.doc.createElement("i");i.title="Raphaël Colour Picker",i.style.display="none",h.doc.body.appendChild(i),bo=bv(function(a){i.style.color=a;return h.doc.defaultView.getComputedStyle(i,p).getPropertyValue("color")})}return bo(b)},bp=function(){return"hsb("+[this.h,this.s,this.b]+")"},bq=function(){return"hsl("+[this.h,this.s,this.l]+")"},br=function(){return this.hex},bs=function(b,c,d){c==null&&a.is(b,"object")&&"r"in b&&"g"in b&&"b"in b&&(d=b.b,c=b.g,b=b.r);if(c==null&&a.is(b,D)){var e=a.getRGB(b);b=e.r,c=e.g,d=e.b}if(b>1||c>1||d>1)b/=255,c/=255,d/=255;return[b,c,d]},bt=function(b,c,d,e){b*=255,c*=255,d*=255;var f={r:b,g:c,b:d,hex:a.rgb(b,c,d),toString:br};a.is(e,"finite")&&(f.opacity=e);return f};a.color=function(b){var c;a.is(b,"object")&&"h"in b&&"s"in b&&"b"in b?(c=a.hsb2rgb(b),b.r=c.r,b.g=c.g,b.b=c.b,b.hex=c.hex):a.is(b,"object")&&"h"in b&&"s"in b&&"l"in b?(c=a.hsl2rgb(b),b.r=c.r,b.g=c.g,b.b=c.b,b.hex=c.hex):(a.is(b,"string")&&(b=a.getRGB(b)),a.is(b,"object")&&"r"in b&&"g"in b&&"b"in b?(c=a.rgb2hsl(b),b.h=c.h,b.s=c.s,b.l=c.l,c=a.rgb2hsb(b),b.v=c.b):(b={hex:"none"},b.r=b.g=b.b=b.h=b.s=b.v=b.l=-1)),b.toString=br;return b},a.hsb2rgb=function(a,b,c,d){this.is(a,"object")&&"h"in a&&"s"in a&&"b"in a&&(c=a.b,b=a.s,a=a.h,d=a.o),a*=360;var e,f,g,h,i;a=a%360/60,i=c*b,h=i*(1-z(a%2-1)),e=f=g=c-i,a=~~a,e+=[i,h,0,0,h,i][a],f+=[h,i,i,h,0,0][a],g+=[0,0,h,i,i,h][a];return bt(e,f,g,d)},a.hsl2rgb=function(a,b,c,d){this.is(a,"object")&&"h"in a&&"s"in a&&"l"in a&&(c=a.l,b=a.s,a=a.h);if(a>1||b>1||c>1)a/=360,b/=100,c/=100;a*=360;var e,f,g,h,i;a=a%360/60,i=2*b*(c<.5?c:1-c),h=i*(1-z(a%2-1)),e=f=g=c-i/2,a=~~a,e+=[i,h,0,0,h,i][a],f+=[h,i,i,h,0,0][a],g+=[0,0,h,i,i,h][a];return bt(e,f,g,d)},a.rgb2hsb=function(a,b,c){c=bs(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g;f=x(a,b,c),g=f-y(a,b,c),d=g==0?null:f==a?(b-c)/g:f==b?(c-a)/g+2:(a-b)/g+4,d=(d+360)%6*60/360,e=g==0?0:g/f;return{h:d,s:e,b:f,toString:bp}},a.rgb2hsl=function(a,b,c){c=bs(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g,h,i;g=x(a,b,c),h=y(a,b,c),i=g-h,d=i==0?null:g==a?(b-c)/i:g==b?(c-a)/i+2:(a-b)/i+4,d=(d+360)%6*60/360,f=(g+h)/2,e=i==0?0:f<.5?i/(2*f):i/(2-2*f);return{h:d,s:e,l:f,toString:bq}},a._path2string=function(){return this.join(",").replace(Y,"$1")};var bw=a._preload=function(a,b){var c=h.doc.createElement("img");c.style.cssText="position:absolute;left:-9999em;top:-9999em",c.onload=function(){b.call(this),this.onload=null,h.doc.body.removeChild(this)},c.onerror=function(){h.doc.body.removeChild(this)},h.doc.body.appendChild(c),c.src=a};a.getRGB=bv(function(b){if(!b||!!((b=r(b)).indexOf("-")+1))return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:bx};if(b=="none")return{r:-1,g:-1,b:-1,hex:"none",toString:bx};!X[g](b.toLowerCase().substring(0,2))&&b.charAt()!="#"&&(b=bo(b));var c,d,e,f,h,i,j,k=b.match(L);if(k){k[2]&&(f=R(k[2].substring(5),16),e=R(k[2].substring(3,5),16),d=R(k[2].substring(1,3),16)),k[3]&&(f=R((i=k[3].charAt(3))+i,16),e=R((i=k[3].charAt(2))+i,16),d=R((i=k[3].charAt(1))+i,16)),k[4]&&(j=k[4][s](W),d=Q(j[0]),j[0].slice(-1)=="%"&&(d*=2.55),e=Q(j[1]),j[1].slice(-1)=="%"&&(e*=2.55),f=Q(j[2]),j[2].slice(-1)=="%"&&(f*=2.55),k[1].toLowerCase().slice(0,4)=="rgba"&&(h=Q(j[3])),j[3]&&j[3].slice(-1)=="%"&&(h/=100));if(k[5]){j=k[5][s](W),d=Q(j[0]),j[0].slice(-1)=="%"&&(d*=2.55),e=Q(j[1]),j[1].slice(-1)=="%"&&(e*=2.55),f=Q(j[2]),j[2].slice(-1)=="%"&&(f*=2.55),(j[0].slice(-3)=="deg"||j[0].slice(-1)=="°")&&(d/=360),k[1].toLowerCase().slice(0,4)=="hsba"&&(h=Q(j[3])),j[3]&&j[3].slice(-1)=="%"&&(h/=100);return a.hsb2rgb(d,e,f,h)}if(k[6]){j=k[6][s](W),d=Q(j[0]),j[0].slice(-1)=="%"&&(d*=2.55),e=Q(j[1]),j[1].slice(-1)=="%"&&(e*=2.55),f=Q(j[2]),j[2].slice(-1)=="%"&&(f*=2.55),(j[0].slice(-3)=="deg"||j[0].slice(-1)=="°")&&(d/=360),k[1].toLowerCase().slice(0,4)=="hsla"&&(h=Q(j[3])),j[3]&&j[3].slice(-1)=="%"&&(h/=100);return a.hsl2rgb(d,e,f,h)}k={r:d,g:e,b:f,toString:bx},k.hex="#"+(16777216|f|e<<8|d<<16).toString(16).slice(1),a.is(h,"finite")&&(k.opacity=h);return k}return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:bx}},a),a.hsb=bv(function(b,c,d){return a.hsb2rgb(b,c,d).hex}),a.hsl=bv(function(b,c,d){return a.hsl2rgb(b,c,d).hex}),a.rgb=bv(function(a,b,c){return"#"+(16777216|c|b<<8|a<<16).toString(16).slice(1)}),a.getColor=function(a){var b=this.getColor.start=this.getColor.start||{h:0,s:1,b:a||.75},c=this.hsb2rgb(b.h,b.s,b.b);b.h+=.075,b.h>1&&(b.h=0,b.s-=.2,b.s<=0&&(this.getColor.start={h:0,s:1,b:b.b}));return c.hex},a.getColor.reset=function(){delete this.start},a.parsePathString=function(b){if(!b)return null;var c=bz(b);if(c.arr)return bJ(c.arr);var d={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},e=[];a.is(b,E)&&a.is(b[0],E)&&(e=bJ(b)),e.length||r(b).replace(Z,function(a,b,c){var f=[],g=b.toLowerCase();c.replace(_,function(a,b){b&&f.push(+b)}),g=="m"&&f.length>2&&(e.push([b][n](f.splice(0,2))),g="l",b=b=="m"?"l":"L");if(g=="r")e.push([b][n](f));else while(f.length>=d[g]){e.push([b][n](f.splice(0,d[g])));if(!d[g])break}}),e.toString=a._path2string,c.arr=bJ(e);return e},a.parseTransformString=bv(function(b){if(!b)return null;var c={r:3,s:4,t:2,m:6},d=[];a.is(b,E)&&a.is(b[0],E)&&(d=bJ(b)),d.length||r(b).replace($,function(a,b,c){var e=[],f=v.call(b);c.replace(_,function(a,b){b&&e.push(+b)}),d.push([b][n](e))}),d.toString=a._path2string;return d});var bz=function(a){var b=bz.ps=bz.ps||{};b[a]?b[a].sleep=100:b[a]={sleep:100},setTimeout(function(){for(var c in b)b[g](c)&&c!=a&&(b[c].sleep--,!b[c].sleep&&delete b[c])});return b[a]};a.findDotsAtSegment=function(a,b,c,d,e,f,g,h,i){var j=1-i,k=A(j,3),l=A(j,2),m=i*i,n=m*i,o=k*a+l*3*i*c+j*3*i*i*e+n*g,p=k*b+l*3*i*d+j*3*i*i*f+n*h,q=a+2*i*(c-a)+m*(e-2*c+a),r=b+2*i*(d-b)+m*(f-2*d+b),s=c+2*i*(e-c)+m*(g-2*e+c),t=d+2*i*(f-d)+m*(h-2*f+d),u=j*a+i*c,v=j*b+i*d,x=j*e+i*g,y=j*f+i*h,z=90-w.atan2(q-s,r-t)*180/B;(q>s||r<t)&&(z+=180);return{x:o,y:p,m:{x:q,y:r},n:{x:s,y:t},start:{x:u,y:v},end:{x:x,y:y},alpha:z}},a.bezierBBox=function(b,c,d,e,f,g,h,i){a.is(b,"array")||(b=[b,c,d,e,f,g,h,i]);var j=bQ.apply(null,b);return{x:j.min.x,y:j.min.y,x2:j.max.x,y2:j.max.y,width:j.max.x-j.min.x,height:j.max.y-j.min.y}},a.isPointInsideBBox=function(a,b,c){return b>=a.x&&b<=a.x2&&c>=a.y&&c<=a.y2},a.isBBoxIntersect=function(b,c){var d=a.isPointInsideBBox;return d(c,b.x,b.y)||d(c,b.x2,b.y)||d(c,b.x,b.y2)||d(c,b.x2,b.y2)||d(b,c.x,c.y)||d(b,c.x2,c.y)||d(b,c.x,c.y2)||d(b,c.x2,c.y2)||(b.x<c.x2&&b.x>c.x||c.x<b.x2&&c.x>b.x)&&(b.y<c.y2&&b.y>c.y||c.y<b.y2&&c.y>b.y)},a.pathIntersection=function(a,b){return bH(a,b)},a.pathIntersectionNumber=function(a,b){return bH(a,b,1)},a.isPointInsidePath=function(b,c,d){var e=a.pathBBox(b);return a.isPointInsideBBox(e,c,d)&&bH(b,[["M",c,d],["H",e.x2+10]],1)%2==1},a._removedFactory=function(a){return function(){eve("raphael.log",null,"Raphaël: you are calling to method “"+a+"” of removed object",a)}};var bI=a.pathBBox=function(a){var b=bz(a);if(b.bbox)return b.bbox;if(!a)return{x:0,y:0,width:0,height:0,x2:0,y2:0};a=bR(a);var c=0,d=0,e=[],f=[],g;for(var h=0,i=a.length;h<i;h++){g=a[h];if(g[0]=="M")c=g[1],d=g[2],e.push(c),f.push(d);else{var j=bQ(c,d,g[1],g[2],g[3],g[4],g[5],g[6]);e=e[n](j.min.x,j.max.x),f=f[n](j.min.y,j.max.y),c=g[5],d=g[6]}}var k=y[m](0,e),l=y[m](0,f),o=x[m](0,e),p=x[m](0,f),q={x:k,y:l,x2:o,y2:p,width:o-k,height:p-l};b.bbox=bm(q);return q},bJ=function(b){var c=bm(b);c.toString=a._path2string;return c},bK=a._pathToRelative=function(b){var c=bz(b);if(c.rel)return bJ(c.rel);if(!a.is(b,E)||!a.is(b&&b[0],E))b=a.parsePathString(b);var d=[],e=0,f=0,g=0,h=0,i=0;b[0][0]=="M"&&(e=b[0][1],f=b[0][2],g=e,h=f,i++,d.push(["M",e,f]));for(var j=i,k=b.length;j<k;j++){var l=d[j]=[],m=b[j];if(m[0]!=v.call(m[0])){l[0]=v.call(m[0]);switch(l[0]){case"a":l[1]=m[1],l[2]=m[2],l[3]=m[3],l[4]=m[4],l[5]=m[5],l[6]=+(m[6]-e).toFixed(3),l[7]=+(m[7]-f).toFixed(3);break;case"v":l[1]=+(m[1]-f).toFixed(3);break;case"m":g=m[1],h=m[2];default:for(var n=1,o=m.length;n<o;n++)l[n]=+(m[n]-(n%2?e:f)).toFixed(3)}}else{l=d[j]=[],m[0]=="m"&&(g=m[1]+e,h=m[2]+f);for(var p=0,q=m.length;p<q;p++)d[j][p]=m[p]}var r=d[j].length;switch(d[j][0]){case"z":e=g,f=h;break;case"h":e+=+d[j][r-1];break;case"v":f+=+d[j][r-1];break;default:e+=+d[j][r-2],f+=+d[j][r-1]}}d.toString=a._path2string,c.rel=bJ(d);return d},bL=a._pathToAbsolute=function(b){var c=bz(b);if(c.abs)return bJ(c.abs);if(!a.is(b,E)||!a.is(b&&b[0],E))b=a.parsePathString(b);if(!b||!b.length)return[["M",0,0]];var d=[],e=0,f=0,g=0,h=0,i=0;b[0][0]=="M"&&(e=+b[0][1],f=+b[0][2],g=e,h=f,i++,d[0]=["M",e,f]);var j=b.length==3&&b[0][0]=="M"&&b[1][0].toUpperCase()=="R"&&b[2][0].toUpperCase()=="Z";for(var k,l,m=i,o=b.length;m<o;m++){d.push(k=[]),l=b[m];if(l[0]!=S.call(l[0])){k[0]=S.call(l[0]);switch(k[0]){case"A":k[1]=l[1],k[2]=l[2],k[3]=l[3],k[4]=l[4],k[5]=l[5],k[6]=+(l[6]+e),k[7]=+(l[7]+f);break;case"V":k[1]=+l[1]+f;break;case"H":k[1]=+l[1]+e;break;case"R":var p=[e,f][n](l.slice(1));for(var q=2,r=p.length;q<r;q++)p[q]=+p[q]+e,p[++q]=+p[q]+f;d.pop(),d=d[n](by(p,j));break;case"M":g=+l[1]+e,h=+l[2]+f;default:for(q=1,r=l.length;q<r;q++)k[q]=+l[q]+(q%2?e:f)}}else if(l[0]=="R")p=[e,f][n](l.slice(1)),d.pop(),d=d[n](by(p,j)),k=["R"][n](l.slice(-2));else for(var s=0,t=l.length;s<t;s++)k[s]=l[s];switch(k[0]){case"Z":e=g,f=h;break;case"H":e=k[1];break;case"V":f=k[1];break;case"M":g=k[k.length-2],h=k[k.length-1];default:e=k[k.length-2],f=k[k.length-1]}}d.toString=a._path2string,c.abs=bJ(d);return d},bM=function(a,b,c,d){return[a,b,c,d,c,d]},bN=function(a,b,c,d,e,f){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*e+h*c,g*f+h*d,e,f]},bO=function(a,b,c,d,e,f,g,h,i,j){var k=B*120/180,l=B/180*(+e||0),m=[],o,p=bv(function(a,b,c){var d=a*w.cos(c)-b*w.sin(c),e=a*w.sin(c)+b*w.cos(c);return{x:d,y:e}});if(!j){o=p(a,b,-l),a=o.x,b=o.y,o=p(h,i,-l),h=o.x,i=o.y;var q=w.cos(B/180*e),r=w.sin(B/180*e),t=(a-h)/2,u=(b-i)/2,v=t*t/(c*c)+u*u/(d*d);v>1&&(v=w.sqrt(v),c=v*c,d=v*d);var x=c*c,y=d*d,A=(f==g?-1:1)*w.sqrt(z((x*y-x*u*u-y*t*t)/(x*u*u+y*t*t))),C=A*c*u/d+(a+h)/2,D=A*-d*t/c+(b+i)/2,E=w.asin(((b-D)/d).toFixed(9)),F=w.asin(((i-D)/d).toFixed(9));E=a<C?B-E:E,F=h<C?B-F:F,E<0&&(E=B*2+E),F<0&&(F=B*2+F),g&&E>F&&(E=E-B*2),!g&&F>E&&(F=F-B*2)}else E=j[0],F=j[1],C=j[2],D=j[3];var G=F-E;if(z(G)>k){var H=F,I=h,J=i;F=E+k*(g&&F>E?1:-1),h=C+c*w.cos(F),i=D+d*w.sin(F),m=bO(h,i,c,d,e,0,g,I,J,[F,H,C,D])}G=F-E;var K=w.cos(E),L=w.sin(E),M=w.cos(F),N=w.sin(F),O=w.tan(G/4),P=4/3*c*O,Q=4/3*d*O,R=[a,b],S=[a+P*L,b-Q*K],T=[h+P*N,i-Q*M],U=[h,i];S[0]=2*R[0]-S[0],S[1]=2*R[1]-S[1];if(j)return[S,T,U][n](m);m=[S,T,U][n](m).join()[s](",");var V=[];for(var W=0,X=m.length;W<X;W++)V[W]=W%2?p(m[W-1],m[W],l).y:p(m[W],m[W+1],l).x;return V},bP=function(a,b,c,d,e,f,g,h,i){var j=1-i;return{x:A(j,3)*a+A(j,2)*3*i*c+j*3*i*i*e+A(i,3)*g,y:A(j,3)*b+A(j,2)*3*i*d+j*3*i*i*f+A(i,3)*h}},bQ=bv(function(a,b,c,d,e,f,g,h){var i=e-2*c+a-(g-2*e+c),j=2*(c-a)-2*(e-c),k=a-c,l=(-j+w.sqrt(j*j-4*i*k))/2/i,n=(-j-w.sqrt(j*j-4*i*k))/2/i,o=[b,h],p=[a,g],q;z(l)>"1e12"&&(l=.5),z(n)>"1e12"&&(n=.5),l>0&&l<1&&(q=bP(a,b,c,d,e,f,g,h,l),p.push(q.x),o.push(q.y)),n>0&&n<1&&(q=bP(a,b,c,d,e,f,g,h,n),p.push(q.x),o.push(q.y)),i=f-2*d+b-(h-2*f+d),j=2*(d-b)-2*(f-d),k=b-d,l=(-j+w.sqrt(j*j-4*i*k))/2/i,n=(-j-w.sqrt(j*j-4*i*k))/2/i,z(l)>"1e12"&&(l=.5),z(n)>"1e12"&&(n=.5),l>0&&l<1&&(q=bP(a,b,c,d,e,f,g,h,l),p.push(q.x),o.push(q.y)),n>0&&n<1&&(q=bP(a,b,c,d,e,f,g,h,n),p.push(q.x),o.push(q.y));return{min:{x:y[m](0,p),y:y[m](0,o)},max:{x:x[m](0,p),y:x[m](0,o)}}}),bR=a._path2curve=bv(function(a,b){var c=!b&&bz(a);if(!b&&c.curve)return bJ(c.curve);var d=bL(a),e=b&&bL(b),f={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},g={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},h=function(a,b){var c,d;if(!a)return["C",b.x,b.y,b.x,b.y,b.x,b.y];!(a[0]in{T:1,Q:1})&&(b.qx=b.qy=null);switch(a[0]){case"M":b.X=a[1],b.Y=a[2];break;case"A":a=["C"][n](bO[m](0,[b.x,b.y][n](a.slice(1))));break;case"S":c=b.x+(b.x-(b.bx||b.x)),d=b.y+(b.y-(b.by||b.y)),a=["C",c,d][n](a.slice(1));break;case"T":b.qx=b.x+(b.x-(b.qx||b.x)),b.qy=b.y+(b.y-(b.qy||b.y)),a=["C"][n](bN(b.x,b.y,b.qx,b.qy,a[1],a[2]));break;case"Q":b.qx=a[1],b.qy=a[2],a=["C"][n](bN(b.x,b.y,a[1],a[2],a[3],a[4]));break;case"L":a=["C"][n](bM(b.x,b.y,a[1],a[2]));break;case"H":a=["C"][n](bM(b.x,b.y,a[1],b.y));break;case"V":a=["C"][n](bM(b.x,b.y,b.x,a[1]));break;case"Z":a=["C"][n](bM(b.x,b.y,b.X,b.Y))}return a},i=function(a,b){if(a[b].length>7){a[b].shift();var c=a[b];while(c.length)a.splice(b++,0,["C"][n](c.splice(0,6)));a.splice(b,1),l=x(d.length,e&&e.length||0)}},j=function(a,b,c,f,g){a&&b&&a[g][0]=="M"&&b[g][0]!="M"&&(b.splice(g,0,["M",f.x,f.y]),c.bx=0,c.by=0,c.x=a[g][1],c.y=a[g][2],l=x(d.length,e&&e.length||0))};for(var k=0,l=x(d.length,e&&e.length||0);k<l;k++){d[k]=h(d[k],f),i(d,k),e&&(e[k]=h(e[k],g)),e&&i(e,k),j(d,e,f,g,k),j(e,d,g,f,k);var o=d[k],p=e&&e[k],q=o.length,r=e&&p.length;f.x=o[q-2],f.y=o[q-1],f.bx=Q(o[q-4])||f.x,f.by=Q(o[q-3])||f.y,g.bx=e&&(Q(p[r-4])||g.x),g.by=e&&(Q(p[r-3])||g.y),g.x=e&&p[r-2],g.y=e&&p[r-1]}e||(c.curve=bJ(d));return e?[d,e]:d},null,bJ),bS=a._parseDots=bv(function(b){var c=[];for(var d=0,e=b.length;d<e;d++){var f={},g=b[d].match(/^([^:]*):?([\d\.]*)/);f.color=a.getRGB(g[1]);if(f.color.error)return null;f.color=f.color.hex,g[2]&&(f.offset=g[2]+"%"),c.push(f)}for(d=1,e=c.length-1;d<e;d++)if(!c[d].offset){var h=Q(c[d-1].offset||0),i=0;for(var j=d+1;j<e;j++)if(c[j].offset){i=c[j].offset;break}i||(i=100,j=e),i=Q(i);var k=(i-h)/(j-d+1);for(;d<j;d++)h+=k,c[d].offset=h+"%"}return c}),bT=a._tear=function(a,b){a==b.top&&(b.top=a.prev),a==b.bottom&&(b.bottom=a.next),a.next&&(a.next.prev=a.prev),a.prev&&(a.prev.next=a.next)},bU=a._tofront=function(a,b){b.top!==a&&(bT(a,b),a.next=null,a.prev=b.top,b.top.next=a,b.top=a)},bV=a._toback=function(a,b){b.bottom!==a&&(bT(a,b),a.next=b.bottom,a.prev=null,b.bottom.prev=a,b.bottom=a)},bW=a._insertafter=function(a,b,c){bT(a,c),b==c.top&&(c.top=a),b.next&&(b.next.prev=a),a.next=b.next,a.prev=b,b.next=a},bX=a._insertbefore=function(a,b,c){bT(a,c),b==c.bottom&&(c.bottom=a),b.prev&&(b.prev.next=a),a.prev=b.prev,b.prev=a,a.next=b},bY=a.toMatrix=function(a,b){var c=bI(a),d={_:{transform:p},getBBox:function(){return c}};b$(d,b);return d.matrix},bZ=a.transformPath=function(a,b){return bj(a,bY(a,b))},b$=a._extractTransform=function(b,c){if(c==null)return b._.transform;c=r(c).replace(/\.{3}|\u2026/g,b._.transform||p);var d=a.parseTransformString(c),e=0,f=0,g=0,h=1,i=1,j=b._,k=new cb;j.transform=d||[];if(d)for(var l=0,m=d.length;l<m;l++){var n=d[l],o=n.length,q=r(n[0]).toLowerCase(),s=n[0]!=q,t=s?k.invert():0,u,v,w,x,y;q=="t"&&o==3?s?(u=t.x(0,0),v=t.y(0,0),w=t.x(n[1],n[2]),x=t.y(n[1],n[2]),k.translate(w-u,x-v)):k.translate(n[1],n[2]):q=="r"?o==2?(y=y||b.getBBox(1),k.rotate(n[1],y.x+y.width/2,y.y+y.height/2),e+=n[1]):o==4&&(s?(w=t.x(n[2],n[3]),x=t.y(n[2],n[3]),k.rotate(n[1],w,x)):k.rotate(n[1],n[2],n[3]),e+=n[1]):q=="s"?o==2||o==3?(y=y||b.getBBox(1),k.scale(n[1],n[o-1],y.x+y.width/2,y.y+y.height/2),h*=n[1],i*=n[o-1]):o==5&&(s?(w=t.x(n[3],n[4]),x=t.y(n[3],n[4]),k.scale(n[1],n[2],w,x)):k.scale(n[1],n[2],n[3],n[4]),h*=n[1],i*=n[2]):q=="m"&&o==7&&k.add(n[1],n[2],n[3],n[4],n[5],n[6]),j.dirtyT=1,b.matrix=k}b.matrix=k,j.sx=h,j.sy=i,j.deg=e,j.dx=f=k.e,j.dy=g=k.f,h==1&&i==1&&!e&&j.bbox?(j.bbox.x+=+f,j.bbox.y+=+g):j.dirtyT=1},b_=function(a){var b=a[0];switch(b.toLowerCase()){case"t":return[b,0,0];case"m":return[b,1,0,0,1,0,0];case"r":return a.length==4?[b,0,a[2],a[3]]:[b,0];case"s":return a.length==5?[b,1,1,a[3],a[4]]:a.length==3?[b,1,1]:[b,1]}},ca=a._equaliseTransform=function(b,c){c=r(c).replace(/\.{3}|\u2026/g,b),b=a.parseTransformString(b)||[],c=a.parseTransformString(c)||[];var d=x(b.length,c.length),e=[],f=[],g=0,h,i,j,k;for(;g<d;g++){j=b[g]||b_(c[g]),k=c[g]||b_(j);if(j[0]!=k[0]||j[0].toLowerCase()=="r"&&(j[2]!=k[2]||j[3]!=k[3])||j[0].toLowerCase()=="s"&&(j[3]!=k[3]||j[4]!=k[4]))return;e[g]=[],f[g]=[];for(h=0,i=x(j.length,k.length);h<i;h++)h in j&&(e[g][h]=j[h]),h in k&&(f[g][h]=k[h])}return{from:e,to:f}};a._getContainer=function(b,c,d,e){var f;f=e==null&&!a.is(b,"object")?h.doc.getElementById(b):b;if(f!=null){if(f.tagName)return c==null?{container:f,width:f.style.pixelWidth||f.offsetWidth,height:f.style.pixelHeight||f.offsetHeight}:{container:f,width:c,height:d};return{container:1,x:b,y:c,width:d,height:e}}},a.pathToRelative=bK,a._engine={},a.path2curve=bR,a.matrix=function(a,b,c,d,e,f){return new cb(a,b,c,d,e,f)},function(b){function d(a){var b=w.sqrt(c(a));a[0]&&(a[0]/=b),a[1]&&(a[1]/=b)}function c(a){return a[0]*a[0]+a[1]*a[1]}b.add=function(a,b,c,d,e,f){var g=[[],[],[]],h=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],i=[[a,c,e],[b,d,f],[0,0,1]],j,k,l,m;a&&a instanceof cb&&(i=[[a.a,a.c,a.e],[a.b,a.d,a.f],[0,0,1]]);for(j=0;j<3;j++)for(k=0;k<3;k++){m=0;for(l=0;l<3;l++)m+=h[j][l]*i[l][k];g[j][k]=m}this.a=g[0][0],this.b=g[1][0],this.c=g[0][1],this.d=g[1][1],this.e=g[0][2],this.f=g[1][2]},b.invert=function(){var a=this,b=a.a*a.d-a.b*a.c;return new cb(a.d/b,-a.b/b,-a.c/b,a.a/b,(a.c*a.f-a.d*a.e)/b,(a.b*a.e-a.a*a.f)/b)},b.clone=function(){return new cb(this.a,this.b,this.c,this.d,this.e,this.f)},b.translate=function(a,b){this.add(1,0,0,1,a,b)},b.scale=function(a,b,c,d){b==null&&(b=a),(c||d)&&this.add(1,0,0,1,c,d),this.add(a,0,0,b,0,0),(c||d)&&this.add(1,0,0,1,-c,-d)},b.rotate=function(b,c,d){b=a.rad(b),c=c||0,d=d||0;var e=+w.cos(b).toFixed(9),f=+w.sin(b).toFixed(9);this.add(e,f,-f,e,c,d),this.add(1,0,0,1,-c,-d)},b.x=function(a,b){return a*this.a+b*this.c+this.e},b.y=function(a,b){return a*this.b+b*this.d+this.f},b.get=function(a){return+this[r.fromCharCode(97+a)].toFixed(4)},b.toString=function(){return a.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},b.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},b.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},b.split=function(){var b={};b.dx=this.e,b.dy=this.f;var e=[[this.a,this.c],[this.b,this.d]];b.scalex=w.sqrt(c(e[0])),d(e[0]),b.shear=e[0][0]*e[1][0]+e[0][1]*e[1][1],e[1]=[e[1][0]-e[0][0]*b.shear,e[1][1]-e[0][1]*b.shear],b.scaley=w.sqrt(c(e[1])),d(e[1]),b.shear/=b.scaley;var f=-e[0][1],g=e[1][1];g<0?(b.rotate=a.deg(w.acos(g)),f<0&&(b.rotate=360-b.rotate)):b.rotate=a.deg(w.asin(f)),b.isSimple=!+b.shear.toFixed(9)&&(b.scalex.toFixed(9)==b.scaley.toFixed(9)||!b.rotate),b.isSuperSimple=!+b.shear.toFixed(9)&&b.scalex.toFixed(9)==b.scaley.toFixed(9)&&!b.rotate,b.noRotation=!+b.shear.toFixed(9)&&!b.rotate;return b},b.toTransformString=function(a){var b=a||this[s]();if(b.isSimple){b.scalex=+b.scalex.toFixed(4),b.scaley=+b.scaley.toFixed(4),b.rotate=+b.rotate.toFixed(4);return(b.dx||b.dy?"t"+[b.dx,b.dy]:p)+(b.scalex!=1||b.scaley!=1?"s"+[b.scalex,b.scaley,0,0]:p)+(b.rotate?"r"+[b.rotate,0,0]:p)}return"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(cb.prototype);var cc=navigator.userAgent.match(/Version\/(.*?)\s/)||navigator.userAgent.match(/Chrome\/(\d+)/);navigator.vendor=="Apple Computer, Inc."&&(cc&&cc[1]<4||navigator.platform.slice(0,2)=="iP")||navigator.vendor=="Google Inc."&&cc&&cc[1]<8?k.safari=function(){var a=this.rect(-99,-99,this.width+99,this.height+99).attr({stroke:"none"});setTimeout(function(){a.remove()})}:k.safari=be;var cd=function(){this.returnValue=!1},ce=function(){return this.originalEvent.preventDefault()},cf=function(){this.cancelBubble=!0},cg=function(){return this.originalEvent.stopPropagation()},ch=function(){if(h.doc.addEventListener)return function(a,b,c,d){var e=o&&u[b]?u[b]:b,f=function(e){var f=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,i=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft,j=e.clientX+i,k=e.clientY+f;if(o&&u[g](b))for(var l=0,m=e.targetTouches&&e.targetTouches.length;l<m;l++)if(e.targetTouches[l].target==a){var n=e;e=e.targetTouches[l],e.originalEvent=n,e.preventDefault=ce,e.stopPropagation=cg;break}return c.call(d,e,j,k)};a.addEventListener(e,f,!1);return function(){a.removeEventListener(e,f,!1);return!0}};if(h.doc.attachEvent)return function(a,b,c,d){var e=function(a){a=a||h.win.event;var b=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,e=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft,f=a.clientX+e,g=a.clientY+b;a.preventDefault=a.preventDefault||cd,a.stopPropagation=a.stopPropagation||cf;return c.call(d,a,f,g)};a.attachEvent("on"+b,e);var f=function(){a.detachEvent("on"+b,e);return!0};return f}}(),ci=[],cj=function(a){var b=a.clientX,c=a.clientY,d=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,e=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft,f,g=ci.length;while(g--){f=ci[g];if(o){var i=a.touches.length,j;while(i--){j=a.touches[i];if(j.identifier==f.el._drag.id){b=j.clientX,c=j.clientY,(a.originalEvent?a.originalEvent:a).preventDefault();break}}}else a.preventDefault();var k=f.el.node,l,m=k.nextSibling,n=k.parentNode,p=k.style.display;h.win.opera&&n.removeChild(k),k.style.display="none",l=f.el.paper.getElementByPoint(b,c),k.style.display=p,h.win.opera&&(m?n.insertBefore(k,m):n.appendChild(k)),l&&eve("raphael.drag.over."+f.el.id,f.el,l),b+=e,c+=d,eve("raphael.drag.move."+f.el.id,f.move_scope||f.el,b-f.el._drag.x,c-f.el._drag.y,b,c,a)}},ck=function(b){a.unmousemove(cj).unmouseup(ck);var c=ci.length,d;while(c--)d=ci[c],d.el._drag={},eve("raphael.drag.end."+d.el.id,d.end_scope||d.start_scope||d.move_scope||d.el,b);ci=[]},cl=a.el={};for(var cm=t.length;cm--;)(function(b){a[b]=cl[b]=function(c,d){a.is(c,"function")&&(this.events=this.events||[],this.events.push({name:b,f:c,unbind:ch(this.shape||this.node||h.doc,b,c,d||this)}));return this},a["un"+b]=cl["un"+b]=function(a){var c=this.events||[],d=c.length;while(d--)if(c[d].name==b&&c[d].f==a){c[d].unbind(),c.splice(d,1),!c.length&&delete this.events;return this}return this}})(t[cm]);cl.data=function(b,c){var d=bb[this.id]=bb[this.id]||{};if(arguments.length==1){if(a.is(b,"object")){for(var e in b)b[g](e)&&this.data(e,b[e]);return this}eve("raphael.data.get."+this.id,this,d[b],b);return d[b]}d[b]=c,eve("raphael.data.set."+this.id,this,c,b);return this},cl.removeData=function(a){a==null?bb[this.id]={}:bb[this.id]&&delete bb[this.id][a];return this},cl.hover=function(a,b,c,d){return this.mouseover(a,c).mouseout(b,d||c)},cl.unhover=function(a,b){return this.unmouseover(a).unmouseout(b)};var cn=[];cl.drag=function(b,c,d,e,f,g){function i(i){(i.originalEvent||i).preventDefault();var j=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,k=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft;this._drag.x=i.clientX+k,this._drag.y=i.clientY+j,this._drag.id=i.identifier,!ci.length&&a.mousemove(cj).mouseup(ck),ci.push({el:this,move_scope:e,start_scope:f,end_scope:g}),c&&eve.on("raphael.drag.start."+this.id,c),b&&eve.on("raphael.drag.move."+this.id,b),d&&eve.on("raphael.drag.end."+this.id,d),eve("raphael.drag.start."+this.id,f||e||this,i.clientX+k,i.clientY+j,i)}this._drag={},cn.push({el:this,start:i}),this.mousedown(i);return this},cl.onDragOver=function(a){a?eve.on("raphael.drag.over."+this.id,a):eve.unbind("raphael.drag.over."+this.id)},cl.undrag=function(){var b=cn.length;while(b--)cn[b].el==this&&(this.unmousedown(cn[b].start),cn.splice(b,1),eve.unbind("raphael.drag.*."+this.id));!cn.length&&a.unmousemove(cj).unmouseup(ck)},k.circle=function(b,c,d){var e=a._engine.circle(this,b||0,c||0,d||0);this.__set__&&this.__set__.push(e);return e},k.rect=function(b,c,d,e,f){var g=a._engine.rect(this,b||0,c||0,d||0,e||0,f||0);this.__set__&&this.__set__.push(g);return g},k.ellipse=function(b,c,d,e){var f=a._engine.ellipse(this,b||0,c||0,d||0,e||0);this.__set__&&this.__set__.push(f);return f},k.path=function(b){b&&!a.is(b,D)&&!a.is(b[0],E)&&(b+=p);var c=a._engine.path(a.format[m](a,arguments),this);this.__set__&&this.__set__.push(c);return c},k.image=function(b,c,d,e,f){var g=a._engine.image(this,b||"about:blank",c||0,d||0,e||0,f||0);this.__set__&&this.__set__.push(g);return g},k.text=function(b,c,d){var e=a._engine.text(this,b||0,c||0,r(d));this.__set__&&this.__set__.push(e);return e},k.set=function(b){!a.is(b,"array")&&(b=Array.prototype.splice.call(arguments,0,arguments.length));var c=new cG(b);this.__set__&&this.__set__.push(c);return c},k.setStart=function(a){this.__set__=a||this.set()},k.setFinish=function(a){var b=this.__set__;delete this.__set__;return b},k.setSize=function(b,c){return a._engine.setSize.call(this,b,c)},k.setViewBox=function(b,c,d,e,f){return a._engine.setViewBox.call(this,b,c,d,e,f)},k.top=k.bottom=null,k.raphael=a;var co=function(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.body,e=c.documentElement,f=e.clientTop||d.clientTop||0,g=e.clientLeft||d.clientLeft||0,i=b.top+(h.win.pageYOffset||e.scrollTop||d.scrollTop)-f,j=b.left+(h.win.pageXOffset||e.scrollLeft||d.scrollLeft)-g;return{y:i,x:j}};k.getElementByPoint=function(a,b){var c=this,d=c.canvas,e=h.doc.elementFromPoint(a,b);if(h.win.opera&&e.tagName=="svg"){var f=co(d),g=d.createSVGRect();g.x=a-f.x,g.y=b-f.y,g.width=g.height=1;var i=d.getIntersectionList(g,null);i.length&&(e=i[i.length-1])}if(!e)return null;while(e.parentNode&&e!=d.parentNode&&!e.raphael)e=e.parentNode;e==c.canvas.parentNode&&(e=d),e=e&&e.raphael?c.getById(e.raphaelid):null;return e},k.getById=function(a){var b=this.bottom;while(b){if(b.id==a)return b;b=b.next}return null},k.forEach=function(a,b){var c=this.bottom;while(c){if(a.call(b,c)===!1)return this;c=c.next}return this},k.getElementsByPoint=function(a,b){var c=this.set();this.forEach(function(d){d.isPointInside(a,b)&&c.push(d)});return c},cl.isPointInside=function(b,c){var d=this.realPath=this.realPath||bi[this.type](this);return a.isPointInsidePath(d,b,c)},cl.getBBox=function(a){if(this.removed)return{};var b=this._;if(a){if(b.dirty||!b.bboxwt)this.realPath=bi[this.type](this),b.bboxwt=bI(this.realPath),b.bboxwt.toString=cq,b.dirty=0;return b.bboxwt}if(b.dirty||b.dirtyT||!b.bbox){if(b.dirty||!this.realPath)b.bboxwt=0,this.realPath=bi[this.type](this);b.bbox=bI(bj(this.realPath,this.matrix)),b.bbox.toString=cq,b.dirty=b.dirtyT=0}return b.bbox},cl.clone=function(){if(this.removed)return null;var a=this.paper[this.type]().attr(this.attr());this.__set__&&this.__set__.push(a);return a},cl.glow=function(a){if(this.type=="text")return null;a=a||{};var b={width:(a.width||10)+(+this.attr("stroke-width")||1),fill:a.fill||!1,opacity:a.opacity||.5,offsetx:a.offsetx||0,offsety:a.offsety||0,color:a.color||"#000"},c=b.width/2,d=this.paper,e=d.set(),f=this.realPath||bi[this.type](this);f=this.matrix?bj(f,this.matrix):f;for(var g=1;g<c+1;g++)e.push(d.path(f).attr({stroke:b.color,fill:b.fill?b.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(b.width/c*g).toFixed(3),opacity:+(b.opacity/c).toFixed(3)}));return e.insertBefore(this).translate(b.offsetx,b.offsety)};var cr={},cs=function(b,c,d,e,f,g,h,i,j){return j==null?bB(b,c,d,e,f,g,h,i):a.findDotsAtSegment(b,c,d,e,f,g,h,i,bC(b,c,d,e,f,g,h,i,j))},ct=function(b,c){return function(d,e,f){d=bR(d);var g,h,i,j,k="",l={},m,n=0;for(var o=0,p=d.length;o<p;o++){i=d[o];if(i[0]=="M")g=+i[1],h=+i[2];else{j=cs(g,h,i[1],i[2],i[3],i[4],i[5],i[6]);if(n+j>e){if(c&&!l.start){m=cs(g,h,i[1],i[2],i[3],i[4],i[5],i[6],e-n),k+=["C"+m.start.x,m.start.y,m.m.x,m.m.y,m.x,m.y];if(f)return k;l.start=k,k=["M"+m.x,m.y+"C"+m.n.x,m.n.y,m.end.x,m.end.y,i[5],i[6]].join(),n+=j,g=+i[5],h=+i[6];continue}if(!b&&!c){m=cs(g,h,i[1],i[2],i[3],i[4],i[5],i[6],e-n);return{x:m.x,y:m.y,alpha:m.alpha}}}n+=j,g=+i[5],h=+i[6]}k+=i.shift()+i}l.end=k,m=b?n:c?l:a.findDotsAtSegment(g,h,i[0],i[1],i[2],i[3],i[4],i[5],1),m.alpha&&(m={x:m.x,y:m.y,alpha:m.alpha});return m}},cu=ct(1),cv=ct(),cw=ct(0,1);a.getTotalLength=cu,a.getPointAtLength=cv,a.getSubpath=function(a,b,c){if(this.getTotalLength(a)-c<1e-6)return cw(a,b).end;var d=cw(a,c,1);return b?cw(d,b).end:d},cl.getTotalLength=function(){if(this.type=="path"){if(this.node.getTotalLength)return this.node.getTotalLength();return cu(this.attrs.path)}},cl.getPointAtLength=function(a){if(this.type=="path")return cv(this.attrs.path,a)},cl.getSubpath=function(b,c){if(this.type=="path")return a.getSubpath(this.attrs.path,b,c)};var cx=a.easing_formulas={linear:function(a){return a},"<":function(a){return A(a,1.7)},">":function(a){return A(a,.48)},"<>":function(a){var b=.48-a/1.04,c=w.sqrt(.1734+b*b),d=c-b,e=A(z(d),1/3)*(d<0?-1:1),f=-c-b,g=A(z(f),1/3)*(f<0?-1:1),h=e+g+.5;return(1-h)*3*h*h+h*h*h},backIn:function(a){var b=1.70158;return a*a*((b+1)*a-b)},backOut:function(a){a=a-1;var b=1.70158;return a*a*((b+1)*a+b)+1},elastic:function(a){if(a==!!a)return a;return A(2,-10*a)*w.sin((a-.075)*2*B/.3)+1},bounce:function(a){var b=7.5625,c=2.75,d;a<1/c?d=b*a*a:a<2/c?(a-=1.5/c,d=b*a*a+.75):a<2.5/c?(a-=2.25/c,d=b*a*a+.9375):(a-=2.625/c,d=b*a*a+.984375);return d}};cx.easeIn=cx["ease-in"]=cx["<"],cx.easeOut=cx["ease-out"]=cx[">"],cx.easeInOut=cx["ease-in-out"]=cx["<>"],cx["back-in"]=cx.backIn,cx["back-out"]=cx.backOut;var cy=[],cz=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){setTimeout(a,16)},cA=function(){var b=+(new Date),c=0;for(;c<cy.length;c++){var d=cy[c];if(d.el.removed||d.paused)continue;var e=b-d.start,f=d.ms,h=d.easing,i=d.from,j=d.diff,k=d.to,l=d.t,m=d.el,o={},p,r={},s;d.initstatus?(e=(d.initstatus*d.anim.top-d.prev)/(d.percent-d.prev)*f,d.status=d.initstatus,delete d.initstatus,d.stop&&cy.splice(c--,1)):d.status=(d.prev+(d.percent-d.prev)*(e/f))/d.anim.top;if(e<0)continue;if(e<f){var t=h(e/f);for(var u in i)if(i[g](u)){switch(U[u]){case C:p=+i[u]+t*f*j[u];break;case"colour":p="rgb("+[cB(O(i[u].r+t*f*j[u].r)),cB(O(i[u].g+t*f*j[u].g)),cB(O(i[u].b+t*f*j[u].b))].join(",")+")";break;case"path":p=[];for(var v=0,w=i[u].length;v<w;v++){p[v]=[i[u][v][0]];for(var x=1,y=i[u][v].length;x<y;x++)p[v][x]=+i[u][v][x]+t*f*j[u][v][x];p[v]=p[v].join(q)}p=p.join(q);break;case"transform":if(j[u].real){p=[];for(v=0,w=i[u].length;v<w;v++){p[v]=[i[u][v][0]];for(x=1,y=i[u][v].length;x<y;x++)p[v][x]=i[u][v][x]+t*f*j[u][v][x]}}else{var z=function(a){return+i[u][a]+t*f*j[u][a]};p=[["m",z(0),z(1),z(2),z(3),z(4),z(5)]]}break;case"csv":if(u=="clip-rect"){p=[],v=4;while(v--)p[v]=+i[u][v]+t*f*j[u][v]}break;default:var A=[][n](i[u]);p=[],v=m.paper.customAttributes[u].length;while(v--)p[v]=+A[v]+t*f*j[u][v]}o[u]=p}m.attr(o),function(a,b,c){setTimeout(function(){eve("raphael.anim.frame."+a,b,c)})}(m.id,m,d.anim)}else{(function(b,c,d){setTimeout(function(){eve("raphael.anim.frame."+c.id,c,d),eve("raphael.anim.finish."+c.id,c,d),a.is(b,"function")&&b.call(c)})})(d.callback,m,d.anim),m.attr(k),cy.splice(c--,1);if(d.repeat>1&&!d.next){for(s in k)k[g](s)&&(r[s]=d.totalOrigin[s]);d.el.attr(r),cE(d.anim,d.el,d.anim.percents[0],null,d.totalOrigin,d.repeat-1)}d.next&&!d.stop&&cE(d.anim,d.el,d.next,null,d.totalOrigin,d.repeat)}}a.svg&&m&&m.paper&&m.paper.safari(),cy.length&&cz(cA)},cB=function(a){return a>255?255:a<0?0:a};cl.animateWith=function(b,c,d,e,f,g){var h=this;if(h.removed){g&&g.call(h);return h}var i=d instanceof cD?d:a.animation(d,e,f,g),j,k;cE(i,h,i.percents[0],null,h.attr());for(var l=0,m=cy.length;l<m;l++)if(cy[l].anim==c&&cy[l].el==b){cy[m-1].start=cy[l].start;break}return h},cl.onAnimation=function(a){a?eve.on("raphael.anim.frame."+this.id,a):eve.unbind("raphael.anim.frame."+this.id);return this},cD.prototype.delay=function(a){var b=new cD(this.anim,this.ms);b.times=this.times,b.del=+a||0;return b},cD.prototype.repeat=function(a){var b=new cD(this.anim,this.ms);b.del=this.del,b.times=w.floor(x(a,0))||1;return b},a.animation=function(b,c,d,e){if(b instanceof cD)return b;if(a.is(d,"function")||!d)e=e||d||null,d=null;b=Object(b),c=+c||0;var f={},h,i;for(i in b)b[g](i)&&Q(i)!=i&&Q(i)+"%"!=i&&(h=!0,f[i]=b[i]);if(!h)return new cD(b,c);d&&(f.easing=d),e&&(f.callback=e);return new cD({100:f},c)},cl.animate=function(b,c,d,e){var f=this;if(f.removed){e&&e.call(f);return f}var g=b instanceof cD?b:a.animation(b,c,d,e);cE(g,f,g.percents[0],null,f.attr());return f},cl.setTime=function(a,b){a&&b!=null&&this.status(a,y(b,a.ms)/a.ms);return this},cl.status=function(a,b){var c=[],d=0,e,f;if(b!=null){cE(a,this,-1,y(b,1));return this}e=cy.length;for(;d<e;d++){f=cy[d];if(f.el.id==this.id&&(!a||f.anim==a)){if(a)return f.status;c.push({anim:f.anim,status:f.status})}}if(a)return 0;return c},cl.pause=function(a){for(var b=0;b<cy.length;b++)cy[b].el.id==this.id&&(!a||cy[b].anim==a)&&eve("raphael.anim.pause."+this.id,this,cy[b].anim)!==!1&&(cy[b].paused=!0);return this},cl.resume=function(a){for(var b=0;b<cy.length;b++)if(cy[b].el.id==this.id&&(!a||cy[b].anim==a)){var c=cy[b];eve("raphael.anim.resume."+this.id,this,c.anim)!==!1&&(delete c.paused,this.status(c.anim,c.status))}return this},cl.stop=function(a){for(var b=0;b<cy.length;b++)cy[b].el.id==this.id&&(!a||cy[b].anim==a)&&eve("raphael.anim.stop."+this.id,this,cy[b].anim)!==!1&&cy.splice(b--,1);return this},eve.on("raphael.remove",cF),eve.on("raphael.clear",cF),cl.toString=function(){return"Raphaël’s object"};var cG=function(a){this.items=[],this.length=0,this.type="set";if(a)for(var b=0,c=a.length;b<c;b++)a[b]&&(a[b].constructor==cl.constructor||a[b].constructor==cG)&&(this[this.items.length]=this.items[this.items.length]=a[b],this.length++)},cH=cG.prototype;cH.push=function(){var a,b;for(var c=0,d=arguments.length;c<d;c++)a=arguments[c],a&&(a.constructor==cl.constructor||a.constructor==cG)&&(b=this.items.length,this[b]=this.items[b]=a,this.length++);return this},cH.pop=function(){this.length&&delete this[this.length--];return this.items.pop()},cH.forEach=function(a,b){for(var c=0,d=this.items.length;c<d;c++)if(a.call(b,this.items[c],c)===!1)return this;return this};for(var cI in cl)cl[g](cI)&&(cH[cI]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a][m](c,b)})}}(cI));cH.attr=function(b,c){if(b&&a.is(b,E)&&a.is(b[0],"object"))for(var d=0,e=b.length;d<e;d++)this.items[d].attr(b[d]);else for(var f=0,g=this.items.length;f<g;f++)this.items[f].attr(b,c);return this},cH.clear=function(){while(this.length)this.pop()},cH.splice=function(a,b,c){a=a<0?x(this.length+a,0):a,b=x(0,y(this.length-a,b));var d=[],e=[],f=[],g;for(g=2;g<arguments.length;g++)f.push(arguments[g]);for(g=0;g<b;g++)e.push(this[a+g]);for(;g<this.length-a;g++)d.push(this[a+g]);var h=f.length;for(g=0;g<h+d.length;g++)this.items[a+g]=this[a+g]=g<h?f[g]:d[g-h];g=this.items.length=this.length-=b-h;while(this[g])delete this[g++];return new cG(e)},cH.exclude=function(a){for(var b=0,c=this.length;b<c;b++)if(this[b]==a){this.splice(b,1);return!0}},cH.animate=function(b,c,d,e){(a.is(d,"function")||!d)&&(e=d||null);var f=this.items.length,g=f,h,i=this,j;if(!f)return this;e&&(j=function(){!--f&&e.call(i)}),d=a.is(d,D)?d:j;var k=a.animation(b,c,d,j);h=this.items[--g].animate(k);while(g--)this.items[g]&&!this.items[g].removed&&this.items[g].animateWith(h,k,k);return this},cH.insertAfter=function(a){var b=this.items.length;while(b--)this.items[b].insertAfter(a);return this},cH.getBBox=function(){var a=[],b=[],c=[],d=[];for(var e=this.items.length;e--;)if(!this.items[e].removed){var f=this.items[e].getBBox();a.push(f.x),b.push(f.y),c.push(f.x+f.width),d.push(f.y+f.height)}a=y[m](0,a),b=y[m](0,b),c=x[m](0,c),d=x[m](0,d);return{x:a,y:b,x2:c,y2:d,width:c-a,height:d-b}},cH.clone=function(a){a=new cG;for(var b=0,c=this.items.length;b<c;b++)a.push(this.items[b].clone());return a},cH.toString=function(){return"Raphaël‘s set"},a.registerFont=function(a){if(!a.face)return a;this.fonts=this.fonts||{};var b={w:a.w,face:{},glyphs:{}},c=a.face["font-family"];for(var d in a.face)a.face[g](d)&&(b.face[d]=a.face[d]);this.fonts[c]?this.fonts[c].push(b):this.fonts[c]=[b];if(!a.svg){b.face["units-per-em"]=R(a.face["units-per-em"],10);for(var e in a.glyphs)if(a.glyphs[g](e)){var f=a.glyphs[e];b.glyphs[e]={w:f.w,k:{},d:f.d&&"M"+f.d.replace(/[mlcxtrv]/g,function(a){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[a]||"M"})+"z"};if(f.k)for(var h in f.k)f[g](h)&&(b.glyphs[e].k[h]=f.k[h])}}return a},k.getFont=function(b,c,d,e){e=e||"normal",d=d||"normal",c=+c||{normal:400,bold:700,lighter:300,bolder:800}[c]||400;if(!!a.fonts){var f=a.fonts[b];if(!f){var h=new RegExp("(^|\\s)"+b.replace(/[^\w\d\s+!~.:_-]/g,p)+"(\\s|$)","i");for(var i in a.fonts)if(a.fonts[g](i)&&h.test(i)){f=a.fonts[i];break}}var j;if(f)for(var k=0,l=f.length;k<l;k++){j=f[k];if(j.face["font-weight"]==c&&(j.face["font-style"]==d||!j.face["font-style"])&&j.face["font-stretch"]==e)break}return j}},k.print=function(b,d,e,f,g,h,i){h=h||"middle",i=x(y(i||0,1),-1);var j=r(e)[s](p),k=0,l=0,m=p,n;a.is(f,e)&&(f=this.getFont(f));if(f){n=(g||16)/f.face["units-per-em"];var o=f.face.bbox[s](c),q=+o[0],t=o[3]-o[1],u=0,v=+o[1]+(h=="baseline"?t+ +f.face.descent:t/2);for(var w=0,z=j.length;w<z;w++){if(j[w]=="\n")k=0,B=0,l=0,u+=t;else{var A=l&&f.glyphs[j[w-1]]||{},B=f.glyphs[j[w]];k+=l?(A.w||f.w)+(A.k&&A.k[j[w]]||0)+f.w*i:0,l=1}B&&B.d&&(m+=a.transformPath(B.d,["t",k*n,u*n,"s",n,n,q,v,"t",(b-q)/n,(d-v)/n]))}}return this.path(m).attr({fill:"#000",stroke:"none"})},k.add=function(b){if(a.is(b,"array")){var c=this.set(),e=0,f=b.length,h;for(;e<f;e++)h=b[e]||{},d[g](h.type)&&c.push(this[h.type]().attr(h))}return c},a.format=function(b,c){var d=a.is(c,E)?[0][n](c):arguments;b&&a.is(b,D)&&d.length-1&&(b=b.replace(e,function(a,b){return d[++b]==null?p:d[b]}));return b||p},a.fullfill=function(){var a=/\{([^\}]+)\}/g,b=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,c=function(a,c,d){var e=d;c.replace(b,function(a,b,c,d,f){b=b||d,e&&(b in e&&(e=e[b]),typeof e=="function"&&f&&(e=e()))}),e=(e==null||e==d?a:e)+"";return e};return function(b,d){return String(b).replace(a,function(a,b){return c(a,b,d)})}}(),a.ninja=function(){i.was?h.win.Raphael=i.is:delete Raphael;return a},a.st=cH,function(b,c,d){function e(){/in/.test(b.readyState)?setTimeout(e,9):a.eve("raphael.DOMload")}b.readyState==null&&b.addEventListener&&(b.addEventListener(c,d=function(){b.removeEventListener(c,d,!1),b.readyState="complete"},!1),b.readyState="loading"),e()}(document,"DOMContentLoaded"),i.was?h.win.Raphael=a:Raphael=a,eve.on("raphael.DOMload",function(){b=!0})}(),window.Raphael.svg&&function(a){var b="hasOwnProperty",c=String,d=parseFloat,e=parseInt,f=Math,g=f.max,h=f.abs,i=f.pow,j=/[, ]+/,k=a.eve,l="",m=" ",n="http://www.w3.org/1999/xlink",o={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},p={};a.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var q=function(d,e){if(e){typeof d=="string"&&(d=q(d));for(var f in e)e[b](f)&&(f.substring(0,6)=="xlink:"?d.setAttributeNS(n,f.substring(6),c(e[f])):d.setAttribute(f,c(e[f])))}else d=a._g.doc.createElementNS("http://www.w3.org/2000/svg",d),d.style&&(d.style.webkitTapHighlightColor="rgba(0,0,0,0)");return d},r=function(b,e){var j="linear",k=b.id+e,m=.5,n=.5,o=b.node,p=b.paper,r=o.style,s=a._g.doc.getElementById(k);if(!s){e=c(e).replace(a._radial_gradient,function(a,b,c){j="radial";if(b&&c){m=d(b),n=d(c);var e=(n>.5)*2-1;i(m-.5,2)+i(n-.5,2)>.25&&(n=f.sqrt(.25-i(m-.5,2))*e+.5)&&n!=.5&&(n=n.toFixed(5)-1e-5*e)}return l}),e=e.split(/\s*\-\s*/);if(j=="linear"){var t=e.shift();t=-d(t);if(isNaN(t))return null;var u=[0,0,f.cos(a.rad(t)),f.sin(a.rad(t))],v=1/(g(h(u[2]),h(u[3]))||1);u[2]*=v,u[3]*=v,u[2]<0&&(u[0]=-u[2],u[2]=0),u[3]<0&&(u[1]=-u[3],u[3]=0)}var w=a._parseDots(e);if(!w)return null;k=k.replace(/[\(\)\s,\xb0#]/g,"_"),b.gradient&&k!=b.gradient.id&&(p.defs.removeChild(b.gradient),delete b.gradient);if(!b.gradient){s=q(j+"Gradient",{id:k}),b.gradient=s,q(s,j=="radial"?{fx:m,fy:n}:{x1:u[0],y1:u[1],x2:u[2],y2:u[3],gradientTransform:b.matrix.invert()}),p.defs.appendChild(s);for(var x=0,y=w.length;x<y;x++)s.appendChild(q("stop",{offset:w[x].offset?w[x].offset:x?"100%":"0%","stop-color":w[x].color||"#fff"}))}}q(o,{fill:"url(#"+k+")",opacity:1,"fill-opacity":1}),r.fill=l,r.opacity=1,r.fillOpacity=1;return 1},s=function(a){var b=a.getBBox(1);q(a.pattern,{patternTransform:a.matrix.invert()+" translate("+b.x+","+b.y+")"})},t=function(d,e,f){if(d.type=="path"){var g=c(e).toLowerCase().split("-"),h=d.paper,i=f?"end":"start",j=d.node,k=d.attrs,m=k["stroke-width"],n=g.length,r="classic",s,t,u,v,w,x=3,y=3,z=5;while(n--)switch(g[n]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":r=g[n];break;case"wide":y=5;break;case"narrow":y=2;break;case"long":x=5;break;case"short":x=2}r=="open"?(x+=2,y+=2,z+=2,u=1,v=f?4:1,w={fill:"none",stroke:k.stroke}):(v=u=x/2,w={fill:k.stroke,stroke:"none"}),d._.arrows?f?(d._.arrows.endPath&&p[d._.arrows.endPath]--,d._.arrows.endMarker&&p[d._.arrows.endMarker]--):(d._.arrows.startPath&&p[d._.arrows.startPath]--,d._.arrows.startMarker&&p[d._.arrows.startMarker]--):d._.arrows={};if(r!="none"){var A="raphael-marker-"+r,B="raphael-marker-"+i+r+x+y;a._g.doc.getElementById(A)?p[A]++:(h.defs.appendChild(q(q("path"),{"stroke-linecap":"round",d:o[r],id:A})),p[A]=1);var C=a._g.doc.getElementById(B),D;C?(p[B]++,D=C.getElementsByTagName("use")[0]):(C=q(q("marker"),{id:B,markerHeight:y,markerWidth:x,orient:"auto",refX:v,refY:y/2}),D=q(q("use"),{"xlink:href":"#"+A,transform:(f?"rotate(180 "+x/2+" "+y/2+") ":l)+"scale("+x/z+","+y/z+")","stroke-width":(1/((x/z+y/z)/2)).toFixed(4)}),C.appendChild(D),h.defs.appendChild(C),p[B]=1),q(D,w);var F=u*(r!="diamond"&&r!="oval");f?(s=d._.arrows.startdx*m||0,t=a.getTotalLength(k.path)-F*m):(s=F*m,t=a.getTotalLength(k.path)-(d._.arrows.enddx*m||0)),w={},w["marker-"+i]="url(#"+B+")";if(t||s)w.d=Raphael.getSubpath(k.path,s,t);q(j,w),d._.arrows[i+"Path"]=A,d._.arrows[i+"Marker"]=B,d._.arrows[i+"dx"]=F,d._.arrows[i+"Type"]=r,d._.arrows[i+"String"]=e}else f?(s=d._.arrows.startdx*m||0,t=a.getTotalLength(k.path)-s):(s=0,t=a.getTotalLength(k.path)-(d._.arrows.enddx*m||0)),d._.arrows[i+"Path"]&&q(j,{d:Raphael.getSubpath(k.path,s,t)}),delete d._.arrows[i+"Path"],delete d._.arrows[i+"Marker"],delete d._.arrows[i+"dx"],delete d._.arrows[i+"Type"],delete d._.arrows[i+"String"];for(w in p)if(p[b](w)&&!p[w]){var G=a._g.doc.getElementById(w);G&&G.parentNode.removeChild(G)}}},u={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},v=function(a,b,d){b=u[c(b).toLowerCase()];if(b){var e=a.attrs["stroke-width"]||"1",f={round:e,square:e,butt:0}[a.attrs["stroke-linecap"]||d["stroke-linecap"]]||0,g=[],h=b.length;while(h--)g[h]=b[h]*e+(h%2?1:-1)*f;q(a.node,{"stroke-dasharray":g.join(",")})}},w=function(d,f){var i=d.node,k=d.attrs,m=i.style.visibility;i.style.visibility="hidden";for(var o in f)if(f[b](o)){if(!a._availableAttrs[b](o))continue;var p=f[o];k[o]=p;switch(o){case"blur":d.blur(p);break;case"href":case"title":case"target":var u=i.parentNode;if(u.tagName.toLowerCase()!="a"){var w=q("a");u.insertBefore(w,i),w.appendChild(i),u=w}o=="target"?u.setAttributeNS(n,"show",p=="blank"?"new":p):u.setAttributeNS(n,o,p);break;case"cursor":i.style.cursor=p;break;case"transform":d.transform(p);break;case"arrow-start":t(d,p);break;case"arrow-end":t(d,p,1);break;case"clip-rect":var x=c(p).split(j);if(x.length==4){d.clip&&d.clip.parentNode.parentNode.removeChild(d.clip.parentNode);var z=q("clipPath"),A=q("rect");z.id=a.createUUID(),q(A,{x:x[0],y:x[1],width:x[2],height:x[3]}),z.appendChild(A),d.paper.defs.appendChild(z),q(i,{"clip-path":"url(#"+z.id+")"}),d.clip=A}if(!p){var B=i.getAttribute("clip-path");if(B){var C=a._g.doc.getElementById(B.replace(/(^url\(#|\)$)/g,l));C&&C.parentNode.removeChild(C),q(i,{"clip-path":l}),delete d.clip}}break;case"path":d.type=="path"&&(q(i,{d:p?k.path=a._pathToAbsolute(p):"M0,0"}),d._.dirty=1,d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1)));break;case"width":i.setAttribute(o,p),d._.dirty=1;if(k.fx)o="x",p=k.x;else break;case"x":k.fx&&(p=-k.x-(k.width||0));case"rx":if(o=="rx"&&d.type=="rect")break;case"cx":i.setAttribute(o,p),d.pattern&&s(d),d._.dirty=1;break;case"height":i.setAttribute(o,p),d._.dirty=1;if(k.fy)o="y",p=k.y;else break;case"y":k.fy&&(p=-k.y-(k.height||0));case"ry":if(o=="ry"&&d.type=="rect")break;case"cy":i.setAttribute(o,p),d.pattern&&s(d),d._.dirty=1;break;case"r":d.type=="rect"?q(i,{rx:p,ry:p}):i.setAttribute(o,p),d._.dirty=1;break;case"src":d.type=="image"&&i.setAttributeNS(n,"href",p);break;case"stroke-width":if(d._.sx!=1||d._.sy!=1)p/=g(h(d._.sx),h(d._.sy))||1;d.paper._vbSize&&(p*=d.paper._vbSize),i.setAttribute(o,p),k["stroke-dasharray"]&&v(d,k["stroke-dasharray"],f),d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1));break;case"stroke-dasharray":v(d,p,f);break;case"fill":var D=c(p).match(a._ISURL);if(D){z=q("pattern");var F=q("image");z.id=a.createUUID(),q(z,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),q(F,{x:0,y:0,"xlink:href":D[1]}),z.appendChild(F),function(b){a._preload(D[1],function(){var a=this.offsetWidth,c=this.offsetHeight;q(b,{width:a,height:c}),q(F,{width:a,height:c}),d.paper.safari()})}(z),d.paper.defs.appendChild(z),q(i,{fill:"url(#"+z.id+")"}),d.pattern=z,d.pattern&&s(d);break}var G=a.getRGB(p);if(!G.error)delete f.gradient,delete k.gradient,!a.is(k.opacity,"undefined")&&a.is(f.opacity,"undefined")&&q(i,{opacity:k.opacity}),!a.is(k["fill-opacity"],"undefined")&&a.is(f["fill-opacity"],"undefined")&&q(i,{"fill-opacity":k["fill-opacity"]});else if((d.type=="circle"||d.type=="ellipse"||c(p).charAt()!="r")&&r(d,p)){if("opacity"in k||"fill-opacity"in k){var H=a._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g,l));if(H){var I=H.getElementsByTagName("stop");q(I[I.length-1],{"stop-opacity":("opacity"in k?k.opacity:1)*("fill-opacity"in k?k["fill-opacity"]:1)})}}k.gradient=p,k.fill="none";break}G[b]("opacity")&&q(i,{"fill-opacity":G.opacity>1?G.opacity/100:G.opacity});case"stroke":G=a.getRGB(p),i.setAttribute(o,G.hex),o=="stroke"&&G[b]("opacity")&&q(i,{"stroke-opacity":G.opacity>1?G.opacity/100:G.opacity}),o=="stroke"&&d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1));break;case"gradient":(d.type=="circle"||d.type=="ellipse"||c(p).charAt()!="r")&&r(d,p);break;case"opacity":k.gradient&&!k[b]("stroke-opacity")&&q(i,{"stroke-opacity":p>1?p/100:p});case"fill-opacity":if(k.gradient){H=a._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g,l)),H&&(I=H.getElementsByTagName("stop"),q(I[I.length-1],{"stop-opacity":p}));break};default:o=="font-size"&&(p=e(p,10)+"px");var J=o.replace(/(\-.)/g,function(a){return a.substring(1).toUpperCase()});i.style[J]=p,d._.dirty=1,i.setAttribute(o,p)}}y(d,f),i.style.visibility=m},x=1.2,y=function(d,f){if(d.type=="text"&&!!(f[b]("text")||f[b]("font")||f[b]("font-size")||f[b]("x")||f[b]("y"))){var g=d.attrs,h=d.node,i=h.firstChild?e(a._g.doc.defaultView.getComputedStyle(h.firstChild,l).getPropertyValue("font-size"),10):10;if(f[b]("text")){g.text=f.text;while(h.firstChild)h.removeChild(h.firstChild);var j=c(f.text).split("\n"),k=[],m;for(var n=0,o=j.length;n<o;n++)m=q("tspan"),n&&q(m,{dy:i*x,x:g.x}),m.appendChild(a._g.doc.createTextNode(j[n])),h.appendChild(m),k[n]=m}else{k=h.getElementsByTagName("tspan");for(n=0,o=k.length;n<o;n++)n?q(k[n],{dy:i*x,x:g.x}):q(k[0],{dy:0})}q(h,{x:g.x,y:g.y}),d._.dirty=1;var p=d._getBBox(),r=g.y-(p.y+p.height/2);r&&a.is(r,"finite")&&q(k[0],{dy:r})}},z=function(b,c){var d=0,e=0;this[0]=this.node=b,b.raphael=!0,this.id=a._oid++,b.raphaelid=this.id,this.matrix=a.matrix(),this.realPath=null,this.paper=c,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!c.bottom&&(c.bottom=this),this.prev=c.top,c.top&&(c.top.next=this),c.top=this,this.next=null},A=a.el;z.prototype=A,A.constructor=z,a._engine.path=function(a,b){var c=q("path");b.canvas&&b.canvas.appendChild(c);var d=new z(c,b);d.type="path",w(d,{fill:"none",stroke:"#000",path:a});return d},A.rotate=function(a,b,e){if(this.removed)return this;a=c(a).split(j),a.length-1&&(b=d(a[1]),e=d(a[2])),a=d(a[0]),e==null&&(b=e);if(b==null||e==null){var f=this.getBBox(1);b=f.x+f.width/2,e=f.y+f.height/2}this.transform(this._.transform.concat([["r",a,b,e]]));return this},A.scale=function(a,b,e,f){if(this.removed)return this;a=c(a).split(j),a.length-1&&(b=d(a[1]),e=d(a[2]),f=d(a[3])),a=d(a[0]),b==null&&(b=a),f==null&&(e=f);if(e==null||f==null)var g=this.getBBox(1);e=e==null?g.x+g.width/2:e,f=f==null?g.y+g.height/2:f,this.transform(this._.transform.concat([["s",a,b,e,f]]));return this},A.translate=function(a,b){if(this.removed)return this;a=c(a).split(j),a.length-1&&(b=d(a[1])),a=d(a[0])||0,b=+b||0,this.transform(this._.transform.concat([["t",a,b]]));return this},A.transform=function(c){var d=this._;if(c==null)return d.transform;a._extractTransform(this,c),this.clip&&q(this.clip,{transform:this.matrix.invert()}),this.pattern&&s(this),this.node&&q(this.node,{transform:this.matrix});if(d.sx!=1||d.sy!=1){var e=this.attrs[b]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":e})}return this},A.hide=function(){!this.removed&&this.paper.safari(this.node.style.display="none");return this},A.show=function(){!this.removed&&this.paper.safari(this.node.style.display="");return this},A.remove=function(){if(!this.removed&&!!this.node.parentNode){var b=this.paper;b.__set__&&b.__set__.exclude(this),k.unbind("raphael.*.*."+this.id),this.gradient&&b.defs.removeChild(this.gradient),a._tear(this,b),this.node.parentNode.tagName.toLowerCase()=="a"?this.node.parentNode.parentNode.removeChild(this.node.parentNode):this.node.parentNode.removeChild(this.node);for(var c in this)this[c]=typeof this[c]=="function"?a._removedFactory(c):null;this.removed=!0}},A._getBBox=function(){if(this.node.style.display=="none"){this.show();var a=!0}var b={};try{b=this.node.getBBox()}catch(c){}finally{b=b||{}}a&&this.hide();return b},A.attr=function(c,d){if(this.removed)return this;if(c==null){var e={};for(var f in this.attrs)this.attrs[b](f)&&(e[f]=this.attrs[f]);e.gradient&&e.fill=="none"&&(e.fill=e.gradient)&&delete e.gradient,e.transform=this._.transform;return e}if(d==null&&a.is(c,"string")){if(c=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient)return this.attrs.gradient;if(c=="transform")return this._.transform;var g=c.split(j),h={};for(var i=0,l=g.length;i<l;i++)c=g[i],c in this.attrs?h[c]=this.attrs[c]:a.is(this.paper.customAttributes[c],"function")?h[c]=this.paper.customAttributes[c].def:h[c]=a._availableAttrs[c];return l-1?h:h[g[0]]}if(d==null&&a.is(c,"array")){h={};for(i=0,l=c.length;i<l;i++)h[c[i]]=this.attr(c[i]);return h}if(d!=null){var m={};m[c]=d}else c!=null&&a.is(c,"object")&&(m=c);for(var n in m)k("raphael.attr."+n+"."+this.id,this,m[n]);for(n in this.paper.customAttributes)if(this.paper.customAttributes[b](n)&&m[b](n)&&a.is(this.paper.customAttributes[n],"function")){var o=this.paper.customAttributes[n].apply(this,[].concat(m[n]));this.attrs[n]=m[n];for(var p in o)o[b](p)&&(m[p]=o[p])}w(this,m);return this},A.toFront=function(){if(this.removed)return this;this.node.parentNode.tagName.toLowerCase()=="a"?this.node.parentNode.parentNode.appendChild(this.node.parentNode):this.node.parentNode.appendChild(this.node);var b=this.paper;b.top!=this&&a._tofront(this,b);return this},A.toBack=function(){if(this.removed)return this;var b=this.node.parentNode;b.tagName.toLowerCase()=="a"?b.parentNode.insertBefore(this.node.parentNode,this.node.parentNode.parentNode.firstChild):b.firstChild!=this.node&&b.insertBefore(this.node,this.node.parentNode.firstChild),a._toback(this,this.paper);var c=this.paper;return this},A.insertAfter=function(b){if(this.removed)return this;var c=b.node||b[b.length-1].node;c.nextSibling?c.parentNode.insertBefore(this.node,c.nextSibling):c.parentNode.appendChild(this.node),a._insertafter(this,b,this.paper);return this},A.insertBefore=function(b){if(this.removed)return this;var c=b.node||b[0].node;c.parentNode.insertBefore(this.node,c),a._insertbefore(this,b,this.paper);return this},A.blur=function(b){var c=this;if(+b!==0){var d=q("filter"),e=q("feGaussianBlur");c.attrs.blur=b,d.id=a.createUUID(),q(e,{stdDeviation:+b||1.5}),d.appendChild(e),c.paper.defs.appendChild(d),c._blur=d,q(c.node,{filter:"url(#"+d.id+")"})}else c._blur&&(c._blur.parentNode.removeChild(c._blur),delete c._blur,delete c.attrs.blur),c.node.removeAttribute("filter")},a._engine.circle=function(a,b,c,d){var e=q("circle");a.canvas&&a.canvas.appendChild(e);var f=new z(e,a);f.attrs={cx:b,cy:c,r:d,fill:"none",stroke:"#000"},f.type="circle",q(e,f.attrs);return f},a._engine.rect=function(a,b,c,d,e,f){var g=q("rect");a.canvas&&a.canvas.appendChild(g);var h=new z(g,a);h.attrs={x:b,y:c,width:d,height:e,r:f||0,rx:f||0,ry:f||0,fill:"none",stroke:"#000"},h.type="rect",q(g,h.attrs);return h},a._engine.ellipse=function(a,b,c,d,e){var f=q("ellipse");a.canvas&&a.canvas.appendChild(f);var g=new z(f,a);g.attrs={cx:b,cy:c,rx:d,ry:e,fill:"none",stroke:"#000"},g.type="ellipse",q(f,g.attrs);return g},a._engine.image=function(a,b,c,d,e,f){var g=q("image");q(g,{x:c,y:d,width:e,height:f,preserveAspectRatio:"none"}),g.setAttributeNS(n,"href",b),a.canvas&&a.canvas.appendChild(g);var h=new z(g,a);h.attrs={x:c,y:d,width:e,height:f,src:b},h.type="image";return h},a._engine.text=function(b,c,d,e){var f=q("text");b.canvas&&b.canvas.appendChild(f);var g=new z(f,b);g.attrs={x:c,y:d,"text-anchor":"middle",text:e,font:a._availableAttrs.font,stroke:"none",fill:"#000"},g.type="text",w(g,g.attrs);return g},a._engine.setSize=function(a,b){this.width=a||this.width,this.height=b||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox);return this},a._engine.create=function(){var b=a._getContainer.apply(0,arguments),c=b&&b.container,d=b.x,e=b.y,f=b.width,g=b.height;if(!c)throw new Error("SVG container not found.");var h=q("svg"),i="overflow:hidden;",j;d=d||0,e=e||0,f=f||512,g=g||342,q(h,{height:g,version:1.1,width:f,xmlns:"http://www.w3.org/2000/svg"}),c==1?(h.style.cssText=i+"position:absolute;left:"+d+"px;top:"+e+"px",a._g.doc.body.appendChild(h),j=1):(h.style.cssText=i+"position:relative",c.firstChild?c.insertBefore(h,c.firstChild):c.appendChild(h)),c=new a._Paper,c.width=f,c.height=g,c.canvas=h,c.clear(),c._left=c._top=0,j&&(c.renderfix=function(){}),c.renderfix();return c},a._engine.setViewBox=function(a,b,c,d,e){k("raphael.setViewBox",this,this._viewBox,[a,b,c,d,e]);var f=g(c/this.width,d/this.height),h=this.top,i=e?"meet":"xMinYMin",j,l;a==null?(this._vbSize&&(f=1),delete this._vbSize,j="0 0 "+this.width+m+this.height):(this._vbSize=f,j=a+m+b+m+c+m+d),q(this.canvas,{viewBox:j,preserveAspectRatio:i});while(f&&h)l="stroke-width"in h.attrs?h.attrs["stroke-width"]:1,h.attr({"stroke-width":l}),h._.dirty=1,h._.dirtyT=1,h=h.prev;this._viewBox=[a,b,c,d,!!e];return this},a.prototype.renderfix=function(){var a=this.canvas,b=a.style,c;try{c=a.getScreenCTM()||a.createSVGMatrix()}catch(d){c=a.createSVGMatrix()}var e=-c.e%1,f=-c.f%1;if(e||f)e&&(this._left=(this._left+e)%1,b.left=this._left+"px"),f&&(this._top=(this._top+f)%1,b.top=this._top+"px")},a.prototype.clear=function(){a.eve("raphael.clear",this);var b=this.canvas;while(b.firstChild)b.removeChild(b.firstChild);this.bottom=this.top=null,(this.desc=q("desc")).appendChild(a._g.doc.createTextNode("Created with Raphaël "+a.version)),b.appendChild(this.desc),b.appendChild(this.defs=q("defs"))},a.prototype.remove=function(){k("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var b in this)this[b]=typeof this[b]=="function"?a._removedFactory(b):null};var B=a.st;for(var C in A)A[b](C)&&!B[b](C)&&(B[C]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a].apply(c,b)})}}(C))}(window.Raphael),window.Raphael.vml&&function(a){var b="hasOwnProperty",c=String,d=parseFloat,e=Math,f=e.round,g=e.max,h=e.min,i=e.abs,j="fill",k=/[, ]+/,l=a.eve,m=" progid:DXImageTransform.Microsoft",n=" ",o="",p={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},q=/([clmz]),?([^clmz]*)/gi,r=/ progid:\S+Blur\([^\)]+\)/g,s=/-?[^,\s-]+/g,t="position:absolute;left:0;top:0;width:1px;height:1px",u=21600,v={path:1,rect:1,image:1},w={circle:1,ellipse:1},x=function(b){var d=/[ahqstv]/ig,e=a._pathToAbsolute;c(b).match(d)&&(e=a._path2curve),d=/[clmz]/g;if(e==a._pathToAbsolute&&!c(b).match(d)){var g=c(b).replace(q,function(a,b,c){var d=[],e=b.toLowerCase()=="m",g=p[b];c.replace(s,function(a){e&&d.length==2&&(g+=d+p[b=="m"?"l":"L"],d=[]),d.push(f(a*u))});return g+d});return g}var h=e(b),i,j;g=[];for(var k=0,l=h.length;k<l;k++){i=h[k],j=h[k][0].toLowerCase(),j=="z"&&(j="x");for(var m=1,r=i.length;m<r;m++)j+=f(i[m]*u)+(m!=r-1?",":o);g.push(j)}return g.join(n)},y=function(b,c,d){var e=a.matrix();e.rotate(-b,.5,.5);return{dx:e.x(c,d),dy:e.y(c,d)}},z=function(a,b,c,d,e,f){var g=a._,h=a.matrix,k=g.fillpos,l=a.node,m=l.style,o=1,p="",q,r=u/b,s=u/c;m.visibility="hidden";if(!!b&&!!c){l.coordsize=i(r)+n+i(s),m.rotation=f*(b*c<0?-1:1);if(f){var t=y(f,d,e);d=t.dx,e=t.dy}b<0&&(p+="x"),c<0&&(p+=" y")&&(o=-1),m.flip=p,l.coordorigin=d*-r+n+e*-s;if(k||g.fillsize){var v=l.getElementsByTagName(j);v=v&&v[0],l.removeChild(v),k&&(t=y(f,h.x(k[0],k[1]),h.y(k[0],k[1])),v.position=t.dx*o+n+t.dy*o),g.fillsize&&(v.size=g.fillsize[0]*i(b)+n+g.fillsize[1]*i(c)),l.appendChild(v)}m.visibility="visible"}};a.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var A=function(a,b,d){var e=c(b).toLowerCase().split("-"),f=d?"end":"start",g=e.length,h="classic",i="medium",j="medium";while(g--)switch(e[g]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":h=e[g];break;case"wide":case"narrow":j=e[g];break;case"long":case"short":i=e[g]}var k=a.node.getElementsByTagName("stroke")[0];k[f+"arrow"]=h,k[f+"arrowlength"]=i,k[f+"arrowwidth"]=j},B=function(e,i){e.attrs=e.attrs||{};var l=e.node,m=e.attrs,p=l.style,q,r=v[e.type]&&(i.x!=m.x||i.y!=m.y||i.width!=m.width||i.height!=m.height||i.cx!=m.cx||i.cy!=m.cy||i.rx!=m.rx||i.ry!=m.ry||i.r!=m.r),s=w[e.type]&&(m.cx!=i.cx||m.cy!=i.cy||m.r!=i.r||m.rx!=i.rx||m.ry!=i.ry),t=e;for(var y in i)i[b](y)&&(m[y]=i[y]);r&&(m.path=a._getPath[e.type](e),e._.dirty=1),i.href&&(l.href=i.href),i.title&&(l.title=i.title),i.target&&(l.target=i.target),i.cursor&&(p.cursor=i.cursor),"blur"in i&&e.blur(i.blur);if(i.path&&e.type=="path"||r)l.path=x(~c(m.path).toLowerCase().indexOf("r")?a._pathToAbsolute(m.path):m.path),e.type=="image"&&(e._.fillpos=[m.x,m.y],e._.fillsize=[m.width,m.height],z(e,1,1,0,0,0));"transform"in i&&e.transform(i.transform);if(s){var B=+m.cx,D=+m.cy,E=+m.rx||+m.r||0,G=+m.ry||+m.r||0;l.path=a.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",f((B-E)*u),f((D-G)*u),f((B+E)*u),f((D+G)*u),f(B*u))}if("clip-rect"in i){var H=c(i["clip-rect"]).split(k);if(H.length==4){H[2]=+H[2]+ +H[0],H[3]=+H[3]+ +H[1];var I=l.clipRect||a._g.doc.createElement("div"),J=I.style;J.clip=a.format("rect({1}px {2}px {3}px {0}px)",H),l.clipRect||(J.position="absolute",J.top=0,J.left=0,J.width=e.paper.width+"px",J.height=e.paper.height+"px",l.parentNode.insertBefore(I,l),I.appendChild(l),l.clipRect=I)}i["clip-rect"]||l.clipRect&&(l.clipRect.style.clip="auto")}if(e.textpath){var K=e.textpath.style;i.font&&(K.font=i.font),i["font-family"]&&(K.fontFamily='"'+i["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,o)+'"'),i["font-size"]&&(K.fontSize=i["font-size"]),i["font-weight"]&&(K.fontWeight=i["font-weight"]),i["font-style"]&&(K.fontStyle=i["font-style"])}"arrow-start"in i&&A(t,i["arrow-start"]),"arrow-end"in i&&A(t,i["arrow-end"],1);if(i.opacity!=null||i["stroke-width"]!=null||i.fill!=null||i.src!=null||i.stroke!=null||i["stroke-width"]!=null||i["stroke-opacity"]!=null||i["fill-opacity"]!=null||i["stroke-dasharray"]!=null||i["stroke-miterlimit"]!=null||i["stroke-linejoin"]!=null||i["stroke-linecap"]!=null){var L=l.getElementsByTagName(j),M=!1;L=L&&L[0],!L&&(M=L=F(j)),e.type=="image"&&i.src&&(L.src=i.src),i.fill&&(L.on=!0);if(L.on==null||i.fill=="none"||i.fill===null)L.on=!1;if(L.on&&i.fill){var N=c(i.fill).match(a._ISURL);if(N){L.parentNode==l&&l.removeChild(L),L.rotate=!0,L.src=N[1],L.type="tile";var O=e.getBBox(1);L.position=O.x+n+O.y,e._.fillpos=[O.x,O.y],a._preload(N[1],function(){e._.fillsize=[this.offsetWidth,this.offsetHeight]})}else L.color=a.getRGB(i.fill).hex,L.src=o,L.type="solid",a.getRGB(i.fill).error&&(t.type in{circle:1,ellipse:1}||c(i.fill).charAt()!="r")&&C(t,i.fill,L)&&(m.fill="none",m.gradient=i.fill,L.rotate=!1)}if("fill-opacity"in i||"opacity"in i){var P=((+m["fill-opacity"]+1||2)-1)*((+m.opacity+1||2)-1)*((+a.getRGB(i.fill).o+1||2)-1);P=h(g(P,0),1),L.opacity=P,L.src&&(L.color="none")}l.appendChild(L);var Q=l.getElementsByTagName("stroke")&&l.getElementsByTagName("stroke")[0],T=!1;!Q&&(T=Q=F("stroke"));if(i.stroke&&i.stroke!="none"||i["stroke-width"]||i["stroke-opacity"]!=null||i["stroke-dasharray"]||i["stroke-miterlimit"]||i["stroke-linejoin"]||i["stroke-linecap"])Q.on=!0;(i.stroke=="none"||i.stroke===null||Q.on==null||i.stroke==0||i["stroke-width"]==0)&&(Q.on=!1);var U=a.getRGB(i.stroke);Q.on&&i.stroke&&(Q.color=U.hex),P=((+m["stroke-opacity"]+1||2)-1)*((+m.opacity+1||2)-1)*((+U.o+1||2)-1);var V=(d(i["stroke-width"])||1)*.75;P=h(g(P,0),1),i["stroke-width"]==null&&(V=m["stroke-width"]),i["stroke-width"]&&(Q.weight=V),V&&V<1&&(P*=V)&&(Q.weight=1),Q.opacity=P,i["stroke-linejoin"]&&(Q.joinstyle=i["stroke-linejoin"]||"miter"),Q.miterlimit=i["stroke-miterlimit"]||8,i["stroke-linecap"]&&(Q.endcap=i["stroke-linecap"]=="butt"?"flat":i["stroke-linecap"]=="square"?"square":"round");if(i["stroke-dasharray"]){var W={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};Q.dashstyle=W[b](i["stroke-dasharray"])?W[i["stroke-dasharray"]]:o}T&&l.appendChild(Q)}if(t.type=="text"){t.paper.canvas.style.display=o;var X=t.paper.span,Y=100,Z=m.font&&m.font.match(/\d+(?:\.\d*)?(?=px)/);p=X.style,m.font&&(p.font=m.font),m["font-family"]&&(p.fontFamily=m["font-family"]),m["font-weight"]&&(p.fontWeight=m["font-weight"]),m["font-style"]&&(p.fontStyle=m["font-style"]),Z=d(m["font-size"]||Z&&Z[0])||10,p.fontSize=Z*Y+"px",t.textpath.string&&(X.innerHTML=c(t.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var $=X.getBoundingClientRect();t.W=m.w=($.right-$.left)/Y,t.H=m.h=($.bottom-$.top)/Y,t.X=m.x,t.Y=m.y+t.H/2,("x"in i||"y"in i)&&(t.path.v=a.format("m{0},{1}l{2},{1}",f(m.x*u),f(m.y*u),f(m.x*u)+1));var _=["x","y","text","font","font-family","font-weight","font-style","font-size"];for(var ba=0,bb=_.length;ba<bb;ba++)if(_[ba]in i){t._.dirty=1;break}switch(m["text-anchor"]){case"start":t.textpath.style["v-text-align"]="left",t.bbx=t.W/2;break;case"end":t.textpath.style["v-text-align"]="right",t.bbx=-t.W/2;break;default:t.textpath.style["v-text-align"]="center",t.bbx=0}t.textpath.style["v-text-kern"]=!0}},C=function(b,f,g){b.attrs=b.attrs||{};var h=b.attrs,i=Math.pow,j,k,l="linear",m=".5 .5";b.attrs.gradient=f,f=c(f).replace(a._radial_gradient,function(a,b,c){l="radial",b&&c&&(b=d(b),c=d(c),i(b-.5,2)+i(c-.5,2)>.25&&(c=e.sqrt(.25-i(b-.5,2))*((c>.5)*2-1)+.5),m=b+n+c);return o}),f=f.split(/\s*\-\s*/);if(l=="linear"){var p=f.shift();p=-d(p);if(isNaN(p))return null}var q=a._parseDots(f);if(!q)return null;b=b.shape||b.node;if(q.length){b.removeChild(g),g.on=!0,g.method="none",g.color=q[0].color,g.color2=q[q.length-1].color;var r=[];for(var s=0,t=q.length;s<t;s++)q[s].offset&&r.push(q[s].offset+n+q[s].color);g.colors=r.length?r.join():"0% "+g.color,l=="radial"?(g.type="gradientTitle",g.focus="100%",g.focussize="0 0",g.focusposition=m,g.angle=0):(g.type="gradient",g.angle=(270-p)%360),b.appendChild(g)}return 1},D=function(b,c){this[0]=this.node=b,b.raphael=!0,this.id=a._oid++,b.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=c,this.matrix=a.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!c.bottom&&(c.bottom=this),this.prev=c.top,c.top&&(c.top.next=this),c.top=this,this.next=null},E=a.el;D.prototype=E,E.constructor=D,E.transform=function(b){if(b==null)return this._.transform;var d=this.paper._viewBoxShift,e=d?"s"+[d.scale,d.scale]+"-1-1t"+[d.dx,d.dy]:o,f;d&&(f=b=c(b).replace(/\.{3}|\u2026/g,this._.transform||o)),a._extractTransform(this,e+b);var g=this.matrix.clone(),h=this.skew,i=this.node,j,k=~c(this.attrs.fill).indexOf("-"),l=!c(this.attrs.fill).indexOf("url(");g.translate(-0.5,-0.5);if(l||k||this.type=="image"){h.matrix="1 0 0 1",h.offset="0 0",j=g.split();if(k&&j.noRotation||!j.isSimple){i.style.filter=g.toFilter();var m=this.getBBox(),p=this.getBBox(1),q=m.x-p.x,r=m.y-p.y;i.coordorigin=q*-u+n+r*-u,z(this,1,1,q,r,0)}else i.style.filter=o,z(this,j.scalex,j.scaley,j.dx,j.dy,j.rotate)}else i.style.filter=o,h.matrix=c(g),h.offset=g.offset();f&&(this._.transform=f);return this},E.rotate=function(a,b,e){if(this.removed)return this;if(a!=null){a=c(a).split(k),a.length-1&&(b=d(a[1]),e=d(a[2])),a=d(a[0]),e==null&&(b=e);if(b==null||e==null){var f=this.getBBox(1);b=f.x+f.width/2,e=f.y+f.height/2}this._.dirtyT=1,this.transform(this._.transform.concat([["r",a,b,e]]));return this}},E.translate=function(a,b){if(this.removed)return this;a=c(a).split(k),a.length-1&&(b=d(a[1])),a=d(a[0])||0,b=+b||0,this._.bbox&&(this._.bbox.x+=a,this._.bbox.y+=b),this.transform(this._.transform.concat([["t",a,b]]));return this},E.scale=function(a,b,e,f){if(this.removed)return this;a=c(a).split(k),a.length-1&&(b=d(a[1]),e=d(a[2]),f=d(a[3]),isNaN(e)&&(e=null),isNaN(f)&&(f=null)),a=d(a[0]),b==null&&(b=a),f==null&&(e=f);if(e==null||f==null)var g=this.getBBox(1);e=e==null?g.x+g.width/2:e,f=f==null?g.y+g.height/2:f,this.transform(this._.transform.concat([["s",a,b,e,f]])),this._.dirtyT=1;return this},E.hide=function(){!this.removed&&(this.node.style.display="none");return this},E.show=function(){!this.removed&&(this.node.style.display=o);return this},E._getBBox=function(){if(this.removed)return{};return{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},E.remove=function(){if(!this.removed&&!!this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),a.eve.unbind("raphael.*.*."+this.id),a._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var b in this)this[b]=typeof this[b]=="function"?a._removedFactory(b):null;this.removed=!0}},E.attr=function(c,d){if(this.removed)return this;if(c==null){var e={};for(var f in this.attrs)this.attrs[b](f)&&(e[f]=this.attrs[f]);e.gradient&&e.fill=="none"&&(e.fill=e.gradient)&&delete e.gradient,e.transform=this._.transform;return e}if(d==null&&a.is(c,"string")){if(c==j&&this.attrs.fill=="none"&&this.attrs.gradient)return this.attrs.gradient;var g=c.split(k),h={};for(var i=0,m=g.length;i<m;i++)c=g[i],c in this.attrs?h[c]=this.attrs[c]:a.is(this.paper.customAttributes[c],"function")?h[c]=this.paper.customAttributes[c].def:h[c]=a._availableAttrs[c];return m-1?h:h[g[0]]}if(this.attrs&&d==null&&a.is(c,"array")){h={};for(i=0,m=c.length;i<m;i++)h[c[i]]=this.attr(c[i]);return h}var n;d!=null&&(n={},n[c]=d),d==null&&a.is(c,"object")&&(n=c);for(var o in n)l("raphael.attr."+o+"."+this.id,this,n[o]);if(n){for(o in this.paper.customAttributes)if(this.paper.customAttributes[b](o)&&n[b](o)&&a.is(this.paper.customAttributes[o],"function")){var p=this.paper.customAttributes[o].apply(this,[].concat(n[o]));this.attrs[o]=n[o];for(var q in p)p[b](q)&&(n[q]=p[q])}n.text&&this.type=="text"&&(this.textpath.string=n.text),B(this,n)}return this},E.toFront=function(){!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&a._tofront(this,this.paper);return this},E.toBack=function(){if(this.removed)return this;this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),a._toback(this,this.paper));return this},E.insertAfter=function(b){if(this.removed)return this;b.constructor==a.st.constructor&&(b=b[b.length-1]),b.node.nextSibling?b.node.parentNode.insertBefore(this.node,b.node.nextSibling):b.node.parentNode.appendChild(this.node),a._insertafter(this,b,this.paper);return this},E.insertBefore=function(b){if(this.removed)return this;b.constructor==a.st.constructor&&(b=b[0]),b.node.parentNode.insertBefore(this.node,b.node),a._insertbefore(this,b,this.paper);return this},E.blur=function(b){var c=this.node.runtimeStyle,d=c.filter;d=d.replace(r,o),+b!==0?(this.attrs.blur=b,c.filter=d+n+m+".Blur(pixelradius="+(+b||1.5)+")",c.margin=a.format("-{0}px 0 0 -{0}px",f(+b||1.5))):(c.filter=d,c.margin=0,delete this.attrs.blur)},a._engine.path=function(a,b){var c=F("shape");c.style.cssText=t,c.coordsize=u+n+u,c.coordorigin=b.coordorigin;var d=new D(c,b),e={fill:"none",stroke:"#000"};a&&(e.path=a),d.type="path",d.path=[],d.Path=o,B(d,e),b.canvas.appendChild(c);var f=F("skew");f.on=!0,c.appendChild(f),d.skew=f,d.transform(o);return d},a._engine.rect=function(b,c,d,e,f,g){var h=a._rectPath(c,d,e,f,g),i=b.path(h),j=i.attrs;i.X=j.x=c,i.Y=j.y=d,i.W=j.width=e,i.H=j.height=f,j.r=g,j.path=h,i.type="rect";return i},a._engine.ellipse=function(a,b,c,d,e){var f=a.path(),g=f.attrs;f.X=b-d,f.Y=c-e,f.W=d*2,f.H=e*2,f.type="ellipse",B(f,{cx:b,cy:c,rx:d,ry:e});return f},a._engine.circle=function(a,b,c,d){var e=a.path(),f=e.attrs;e.X=b-d,e.Y=c-d,e.W=e.H=d*2,e.type="circle",B(e,{cx:b,cy:c,r:d});return e},a._engine.image=function(b,c,d,e,f,g){var h=a._rectPath(d,e,f,g),i=b.path(h).attr({stroke:"none"}),k=i.attrs,l=i.node,m=l.getElementsByTagName(j)[0];k.src=c,i.X=k.x=d,i.Y=k.y=e,i.W=k.width=f,i.H=k.height=g,k.path=h,i.type="image",m.parentNode==l&&l.removeChild(m),m.rotate=!0,m.src=c,m.type="tile",i._.fillpos=[d,e],i._.fillsize=[f,g],l.appendChild(m),z(i,1,1,0,0,0);return i},a._engine.text=function(b,d,e,g){var h=F("shape"),i=F("path"),j=F("textpath");d=d||0,e=e||0,g=g||"",i.v=a.format("m{0},{1}l{2},{1}",f(d*u),f(e*u),f(d*u)+1),i.textpathok=!0,j.string=c(g),j.on=!0,h.style.cssText=t,h.coordsize=u+n+u,h.coordorigin="0 0";var k=new D(h,b),l={fill:"#000",stroke:"none",font:a._availableAttrs.font,text:g};k.shape=h,k.path=i,k.textpath=j,k.type="text",k.attrs.text=c(g),k.attrs.x=d,k.attrs.y=e,k.attrs.w=1,k.attrs.h=1,B(k,l),h.appendChild(j),h.appendChild(i),b.canvas.appendChild(h);var m=F("skew");m.on=!0,h.appendChild(m),k.skew=m,k.transform(o);return k},a._engine.setSize=function(b,c){var d=this.canvas.style;this.width=b,this.height=c,b==+b&&(b+="px"),c==+c&&(c+="px"),d.width=b,d.height=c,d.clip="rect(0 "+b+" "+c+" 0)",this._viewBox&&a._engine.setViewBox.apply(this,this._viewBox);return this},a._engine.setViewBox=function(b,c,d,e,f){a.eve("raphael.setViewBox",this,this._viewBox,[b,c,d,e,f]);var h=this.width,i=this.height,j=1/g(d/h,e/i),k,l;f&&(k=i/e,l=h/d,d*k<h&&(b-=(h-d*k)/2/k),e*l<i&&(c-=(i-e*l)/2/l)),this._viewBox=[b,c,d,e,!!f],this._viewBoxShift={dx:-b,dy:-c,scale:j},this.forEach(function(a){a.transform("...")});return this};var F;a._engine.initWin=function(a){var b=a.document;b.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!b.namespaces.rvml&&b.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),F=function(a){return b.createElement("<rvml:"+a+' class="rvml">')}}catch(c){F=function(a){return b.createElement("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},a._engine.initWin(a._g.win),a._engine.create=function(){var b=a._getContainer.apply(0,arguments),c=b.container,d=b.height,e,f=b.width,g=b.x,h=b.y;if(!c)throw new Error("VML container not found.");var i=new a._Paper,j=i.canvas=a._g.doc.createElement("div"),k=j.style;g=g||0,h=h||0,f=f||512,d=d||342,i.width=f,i.height=d,f==+f&&(f+="px"),d==+d&&(d+="px"),i.coordsize=u*1e3+n+u*1e3,i.coordorigin="0 0",i.span=a._g.doc.createElement("span"),i.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",j.appendChild(i.span),k.cssText=a.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",f,d),c==1?(a._g.doc.body.appendChild(j),k.left=g+"px",k.top=h+"px",k.position="absolute"):c.firstChild?c.insertBefore(j,c.firstChild):c.appendChild(j),i.renderfix=function(){};return i},a.prototype.clear=function(){a.eve("raphael.clear",this),this.canvas.innerHTML=o,this.span=a._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},a.prototype.remove=function(){a.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var b in this)this[b]=typeof this[b]=="function"?a._removedFactory(b):null;return!0};var G=a.st;for(var H in E)E[b](H)&&!G[b](H)&&(G[H]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a].apply(c,b)})}}(H))}(window.Raphael)

;jQuery(document).ready(function(){var dN="thumbnails-small",dS=26,dC="#ffffff",dHC="#ffffff",dCCOH=false,dET="hover",dA=true,dL=true,dOP=true,mD=100,hD=200,aC="activeicon",aPC="active",dAC="#000000",lDI=JSON.stringify(
{
  "thumbnails-small":{"d":1200,"it":1,"sh":[{"i":{"a":{"p":"M9.4,10H2.6C2.269,10,2,9.731,2,9.4V2.6C2,2.269,2.269,2,2.6,2h6.8C9.731,2,10,2.269,10,2.6v6.8C10,9.731,9.731,10,9.4,10zM19.4,10h-6.8C12.269,10,12,9.731,12,9.4V2.6C12,2.269,12.269,2,12.6,2h6.8C19.731,2,20,2.269,20,2.6v6.8C20,9.731,19.731,10,19.4,10zM29.4,10H22.6C22.269,10,22,9.731,22,9.4V2.6C22,2.269,22.269,2,22.6,2H29.4C29.731,2,30,2.269,30,2.6v6.8C30,9.731,29.731,10,29.4,10z","t":"","o":1,"s":"none","fl":"#333"}},"f":{"0":{"o":0,"t":"t0,20"},"15":{"o":1},"30":{},"45":{"t":"t0,10"},"60":{},"75":{"t":""},"100":{}}},{"i":{"a":{"p":"M9.4,20H2.6C2.269,20,2,19.731,2,19.4v-6.8C2,12.269,2.269,12,2.6,12h6.8c0.332,0,0.6,0.269,0.6,0.6v6.8C10,19.731,9.731,20,9.4,20zM19.4,20h-6.8c-0.332,0-0.6-0.269-0.6-0.6v-6.8c0-0.332,0.269-0.6,0.6-0.6h6.8c0.331,0,0.6,0.269,0.6,0.6v6.8C20,19.731,19.731,20,19.4,20zM29.4,20H22.6c-0.331,0-0.6-0.269-0.6-0.6v-6.8c0-0.332,0.269-0.6,0.6-0.6H29.4c0.331,0,0.6,0.269,0.6,0.6v6.8C30,19.731,29.731,20,29.4,20z","t":"","o":1,"s":"none","fl":"#333"}},"f":{"0":{"o":0,"t":"t0,10"},"46":{},"60":{"o":1},"75":{"t":""},"100":{}}},{"i":{"a":{"p":"M9.4,30H2.6C2.269,30,2,29.731,2,29.4V22.6C2,22.269,2.269,22,2.6,22h6.8c0.332,0,0.6,0.269,0.6,0.6V29.4C10,29.731,9.731,30,9.4,30zM19.4,30h-6.8c-0.332,0-0.6-0.269-0.6-0.6V22.6c0-0.331,0.269-0.6,0.6-0.6h6.8c0.331,0,0.6,0.269,0.6,0.6V29.4C20,29.731,19.731,30,19.4,30zM29.4,30H22.6c-0.331,0-0.6-0.269-0.6-0.6V22.6c0-0.331,0.269-0.6,0.6-0.6H29.4c0.331,0,0.6,0.269,0.6,0.6V29.4C30,29.731,29.731,30,29.4,30z","o":1,"t":"","s":"none","fl":"#333"}},"f":{"0":{"o":0},"75":{},"90":{"o":1},"100":{}}}]},"download":{"d":400,"it":3,"sh":[{"i":{"a":{"p":"M15.125,21.658L6.27,12.848C5.801,12.379,5.958,12,6.622,12H12V5.2C12,4.538,12.537,4,13.2,4h5.601C19.463,4,20,4.538,20,5.2V12h5.379c0.664,0,0.82,0.379,0.352,0.848l-8.857,8.811C16.391,22.113,15.608,22.113,15.125,21.658z","s":"none","fl":"#333"}},"f":{"20":{"t":"t0,-2"},"70":{"t":"t0,1"},"100":{"t":""}}},{"i":{"a":{"p":"M30,26.8c0,0.663-0.537,1.2-1.2,1.2H3.2C2.537,28,2,27.463,2,26.8v-4.2C2,22.293,2.297,22,2.6,22h2.8C5.703,22,6,22.293,6,22.6V24h20v-1.4c0-0.307,0.299-0.6,0.601-0.6h2.8c0.302,0,0.6,0.293,0.6,0.6V26.8z","s":"none","fl":"#333"}},"f":{}}]},"fire":{"d":600,"it":2,"sh":[{"i":{"a":{"p":"M16,30c-5.083-1-10-5-10-11c0-6.018,6-14,12-17c2,8,8,10,8,19c0,4-3.084,8-9,9c4.625-7.25,2.084-11-2-14C14.583,23.333,10.792,24.208,16,30z","s":"none","fl":"#333"}},"f":{"25":{"t":"s0.6,0.6,16,30","p":"M16,30c-5.083-1-8-6-8-10c0-7,9-9,7-18c7,4,11,9,11,18c0,4-3.084,9-9,10c5-5-1-10,1-14C14,19,11,23,16,30z"},"50":{"t":"s0.9,1,16,30","p":"M16,30c-5.083-1-10-5-10-11c0-6.018,6-14,12-17c2,8,8,10,8,19c0,4-3.084,8-9,9c4.625-7.25,2.084-11-2-14C14.583,23.333,10.792,24.208,16,30z"},"75":{"t":"s0.5,0.6,16,30","p":"M16,30c-5.083-1-8-6-8-10c0-7,9-9,7-18c7,4,11,9,11,18c0,4-3.084,9-9,10c5-5-1-10,1-14C14,19,11,23,16,30z"},"100":{"t":"","p":"M16,30c-5.083-1-10-5-10-11c0-6.018,6-14,12-17c2,8,8,10,8,19c0,4-3.084,8-9,9c4.625-7.25,2.084-11-2-14C14.583,23.333,10.792,24.208,16,30z"}}}]},"rocket":{"d":1000,"it":1,"sh":[{"i":{"a":{"p":"M6.976,24.759l4.229-1.936c0.408,8.068-9.133,6.825-9.133,6.825s-1-10.085,6.926-9.027L6.976,24.759zM20.827,17.824c0,0,0.9,6.604-7.438,8.881l1.719-5.455c0,0-5.008,0.546-5.009,0.55l0.594-4.953l-5.476,1.709c2.287-8.311,8.907-7.414,8.907-7.414c3.024-4.156,7.568-6.864,10.69-8.08c0.996-0.388,3.289-0.969,4.136-1.039C30,1.938,30.1,2.038,29.995,3.065C29.9,3.993,29.33,6.183,28.927,7.163C27.658,10.258,24.993,14.809,20.827,17.824zM21.499,12.895c1.335,0.001,2.417-1.081,2.416-2.416c-0.003-1.336-1.088-2.421-2.423-2.422c-1.337-0.003-2.419,1.079-2.415,2.416C19.077,11.808,20.162,12.893,21.499,12.895z","s":"none","fl":"#333"}},"f":{"5":{"t":"r2,10,22"},"10":{"t":"r-2,10,22"},"20":{"p":"M6.976,24.759l4.229-1.936C11.614,30.892-6.7,38.6-6.7,38.6S1.073,19.563,8.999,20.621L6.976,24.759zM20.827,17.824c0,0,0.9,6.604-7.438,8.881l1.719-5.455c0,0-5.008,0.546-5.009,0.55l0.594-4.953l-5.476,1.709c2.287-8.311,8.907-7.414,8.907-7.414c3.024-4.156,7.568-6.864,10.69-8.08c0.996-0.388,3.289-0.969,4.136-1.039C30,1.938,30.1,2.038,29.995,3.065C29.9,3.993,29.33,6.183,28.927,7.163C27.658,10.258,24.993,14.809,20.827,17.824zM21.499,12.895c1.335,0.001,2.417-1.081,2.416-2.416c-0.003-1.336-1.088-2.421-2.423-2.422c-1.337-0.003-2.419,1.079-2.415,2.416C19.077,11.808,20.162,12.893,21.499,12.895z","t":"t15,-15"},"50":{"t":"t40,-40"},"51":{"t":"t40,40"},"52":{"p":"M6.976,24.759l4.229-1.936c0.408,8.068-9.133,6.825-9.133,6.825s-1-10.085,6.926-9.027L6.976,24.759zM20.827,17.824c0,0,0.9,6.604-7.438,8.881l1.719-5.455c0,0-5.008,0.546-5.009,0.55l0.594-4.953l-5.476,1.709c2.287-8.311,8.907-7.414,8.907-7.414c3.024-4.156,7.568-6.864,10.69-8.08c0.996-0.388,3.289-0.969,4.136-1.039C30,1.938,30.1,2.038,29.995,3.065C29.9,3.993,29.33,6.183,28.927,7.163C27.658,10.258,24.993,14.809,20.827,17.824zM21.499,12.895c1.335,0.001,2.417-1.081,2.416-2.416c-0.003-1.336-1.088-2.421-2.423-2.422c-1.337-0.003-2.419,1.079-2.415,2.416C19.077,11.808,20.162,12.893,21.499,12.895z","t":"t-32,32"},"80":{},"90":{"t":"","e":">"},"100":{},"2.5":{"t":"r-2,10,22"},"12.5":{"t":"r0,10,22"}}}]},"tags":{"d":1000,"it":1,"sh":[{"i":{"a":{"p":"M28.189,14.299c0.598,0.791,0.5,1.992,0,2.6l-9.489,9.98c0.602,0.697,1.5,0.395,2.281-0.387l8.208-8.602c1.098-1.1,1.098-3.301-0.102-4.5L18.9,3.549c-0.391-0.391-1.543-0.487-2.095-0.5L28.189,14.299z","o":1,"s":"none","fl":"#333"}},"f":{"0":{"o":0},"80":{},"81":{"o":1},"100":{}}},{"i":{"a":{"p":"M12.293,2H2.971C2.419,1.988,1.985,2.425,2,2.977v9.315C2.015,12.843,2.345,13.609,2.736,14l11.416,12C15.2,27.1,16,27,16.98,26L26,17.021c1.1-1.122,1.1-1.821,0-2.83L14,2.729C13.609,2.339,12.846,2.013,12.293,2zM8.188,8.255c-0.976,0.977-2.558,0.977-3.536,0c-0.977-0.977-0.977-2.559,0-3.536c0.977-0.976,2.56-0.977,3.536,0C9.165,5.697,9.164,7.279,8.188,8.255z","o":0,"s":"none","fl":"#333"}},"f":{"20":{"t":"r45,6.5,7.5"},"21":{"o":0.6},"30":{"t":"r-20,6.5,7.5"},"60":{},"70":{"t":"","o":0},"100":{}}},{"i":{"a":{"p":"M12.293,2H2.971C2.419,1.988,1.985,2.425,2,2.977v9.315C2.015,12.843,2.345,13.609,2.736,14l11.416,12C15.2,27.1,16,27,16.98,26L26,17.021c1.1-1.122,1.1-1.821,0-2.83L14,2.729C13.609,2.339,12.846,2.013,12.293,2zM8.188,8.255c-0.976,0.977-2.558,0.977-3.536,0c-0.977-0.977-0.977-2.559,0-3.536c0.977-0.976,2.56-0.977,3.536,0C9.165,5.697,9.164,7.279,8.188,8.255z","o":0,"s":"none","fl":"#333"}},"f":{"10":{"t":"r45,6.5,7.5"},"11":{"o":0.8},"20":{"t":"r0,6.5,7.5"},"60":{},"70":{"t":"","o":0},"100":{}}},{"i":{"a":{"p":"M12.293,2H2.971C2.419,1.988,1.985,2.425,2,2.977v9.315C2.015,12.843,2.345,13.609,2.736,14l11.416,12C15.2,27.1,16,27,16.98,26L26,17.021c1.1-1.122,1.1-1.821,0-2.83L14,2.729C13.609,2.339,12.846,2.013,12.293,2zM8.188,8.255c-0.976,0.977-2.558,0.977-3.536,0c-0.977-0.977-0.977-2.559,0-3.536c0.977-0.976,2.56-0.977,3.536,0C9.165,5.697,9.164,7.279,8.188,8.255z","s":"none","fl":"#333"}},"f":{"0":{"t":""},"10":{"t":"r20,6.5,7.5"},"60":{},"70":{"t":""},"100":{}}}]},"align-left":{"d":800,"it":1,"sh":[{"i":{"a":{"p":"M17.4,10H4.6C4.269,10,4,9.731,4,9.4V6.6C4,6.269,4.269,6,4.6,6h12.8C17.731,6,18,6.269,18,6.6 v2.8C18,9.731,17.731,10,17.4,10zM25.4,12H4.6C4.269,12,4,12.269,4,12.6v2.8C4,15.731,4.269,16,4.6,16h20.8 c0.331,0,0.6-0.269,0.6-0.6v-2.8C26,12.269,25.731,12,25.4,12zM21.4,18H4.6C4.269,18,4,18.269,4,18.6V21.4  C4,21.731,4.269,22,4.6,22h16.8c0.331,0,0.6-0.269,0.6-0.6V18.6C22,18.269,21.731,18,21.4,18zM27.4,24H4.6  C4.269,24,4,24.269,4,24.6V27.4C4,27.731,4.269,28,4.6,28h22.8c0.331,0,0.6-0.269,0.6-0.6V24.6C28,24.269,27.731,24,27.4,24z","s":"none","fl":"#333"}},"f":{"0":{"p":"M13.4,10H0.6C0.269,10,0,9.731,0,9.4V6.6C0,6.269,0.269,6,0.6,6h12.8C13.731,6,14,6.269,14,6.6 v2.8C14,9.731,13.731,10,13.4,10zM29.4,12H8.6C8.269,12,8,12.269,8,12.6v2.8C8,15.731,8.269,16,8.6,16h20.8 c0.331,0,0.6-0.269,0.6-0.6v-2.8C30,12.269,29.731,12,29.4,12zM29.4,18H12.6c-0.332,0-0.6,0.269-0.6,0.6V21.4 c0,0.331,0.269,0.6,0.6,0.6h16.8c0.331,0,0.6-0.269,0.6-0.6V18.6C30,18.269,29.731,18,29.4,18zM15.4,24H-7.4  C-7.731,24-8,24.269-8,24.6V27.4c0,0.331,0.269,0.6,0.6,0.6h22.8c0.332,0,0.6-0.269,0.6-0.6V24.6C16,24.269,15.731,24,15.4,24z"},"20":{},"60":{"p":"M17.4,10H4.6C4.269,10,4,9.731,4,9.4V6.6C4,6.269,4.269,6,4.6,6h12.8C17.731,6,18,6.269,18,6.6  v2.8C18,9.731,17.731,10,17.4,10zM25.4,12H4.6C4.269,12,4,12.269,4,12.6v2.8C4,15.731,4.269,16,4.6,16h20.8 c0.331,0,0.6-0.269,0.6-0.6v-2.8C26,12.269,25.731,12,25.4,12zM21.4,18H4.6C4.269,18,4,18.269,4,18.6V21.4  C4,21.731,4.269,22,4.6,22h16.8c0.331,0,0.6-0.269,0.6-0.6V18.6C22,18.269,21.731,18,21.4,18zM27.4,24H4.6  C4.269,24,4,24.269,4,24.6V27.4C4,27.731,4.269,28,4.6,28h22.8c0.331,0,0.6-0.269,0.6-0.6V24.6C28,24.269,27.731,24,27.4,24z","e":"elastic"},
	"100":{}}}]}
})
,lDI=lDI.replace(/\"d\":/g,'"duration":').replace(/\"i\":/g,'"init":').replace(/\"f\":/g,'"frames":').replace(/\"fIE\":/g,'"framesIE":').replace(/\"o\":/g,'"opacity":').replace(/\"t\":/g,'"transform":').replace(/\"it\":/g,'"iteration":').replace(/\"sh\":/g,'"shapes":').replace(/\"a\":/g,'"attr":').replace(/\"p\":/g,'"path":').replace(/\"fl\":/g,'"fill":').replace(/\"e\":/g,'"easing":').replace(/\"s\":/g,'"stroke-width":0,"stroke":'),liviconsdata=JSON.parse(lDI),sB=Raphael.svg,vB=Raphael.vml;
Raphael.fn.createLivicon=function(f,b,g,k,h,c,u,s,v,x,w,y,m){var e=[];g=clone(w);var d=g.shapes.length;s=s?s:g.iteration;var l=[],q=[],t=[],A="s"+y+","+y+",0,0";w=y=!1;if(b.match(/spinner/)){y=!0;var D=jQuery("#"+f),B=function(){if(D.is(":visible")){if(!z){for(var a=0;a< d;a++)e[a].animate(l[a].repeat(Infinity));z=!0}}else if(z){for(a=0;a< d;a++)e[a].stop();z=!1}}}b.match(/morph/)&&(w=!0);for(b=0;b< d;b++){var r=g.shapes[b].init,n;for(n in r)r[n].transform=A+r[n].transform}if(sB)for(b=0;b< d;b++)for(n in r=
g.shapes[b].frames,r)"transform"in r[n]&&(r[n].transform=A+r[n].transform);else for(b=0;b< d;b++)for(n in r=g.shapes[b].framesIE?g.shapes[b].framesIE:g.shapes[b].frames,r)"transform"in r[n]&&(r[n].transform=A+r[n].transform);for(b=0;b< d;b++)n=g.shapes[b].init.attr,"original"!=k&&(n.fill=k),t.push(n.fill),e[b]=this.path(n.path).attr(n);sB?jQuery("#"+f+" > svg").attr("id","canvas-for-"+f):jQuery("#"+f).children(":first-child").attr("id","canvas-for-"+f);f=jQuery("#"+f);m=m?m:f;if(!0==c){if(w){for(b=
0;b< d;b++)l.push(Raphael.animation(g.shapes[b].frames,mD)),q.push(g.shapes[b].init.attr);if(h){var C=clone(q);for(b=0;b< d;b++)C[b].fill=h}}else if(c=v?v:g.duration,!sB&&vB)for(b=0;b< d;b++)g.shapes[b].framesIE?l.push(Raphael.animation(g.shapes[b].framesIE,c)):l.push(Raphael.animation(g.shapes[b].frames,c)),q.push(g.shapes[b].init.attr);else for(b=0;b< d;b++)l.push(Raphael.animation(g.shapes[b].frames,c)),q.push(g.shapes[b].init.attr);if("click"==x)if(u&&!w)if(y){for(b=0;b<
d;b++)e[b].stop().animate(l[b].repeat(Infinity));var z=!0;setInterval(B,500)}else if(h){m.hover(function(){for(var a=0;a< d;a++)e[a].animate({fill:h},hD)},function(){for(var a=0;a< d;a++)e[a].animate({fill:t[a]},hD)});var p=!0;m.click(function(){for(var a=0;a< d;a++)e[a].stop().animate(p?l[a].repeat(u):q[a],0);p=!p})}else p=!0,m.click(function(){for(var a=0;a< d;a++)e[a].stop().animate(p?l[a].repeat(u):q[a],0);p=!p});else w?h?(m.hover(function(){for(var a=0;a< d;a++)e[a].animate({fill:h},
hD)},function(){for(var a=0;a< d;a++)e[a].animate({fill:t[a]},hD)}),p=!0,m.click(function(){for(var a=0;a< d;a++)e[a].stop().animate(p?l[a]:C[a],mD),p=!p})):(p=!0,m.click(function(){for(var a=0;a< d;a++)e[a].stop().animate(p?l[a]:q[a],mD),p=!p})):h?(m.hover(function(){for(var a=0;a< d;a++)e[a].animate({fill:h},hD)},function(){for(var a=0;a< d;a++)e[a].animate({fill:t[a]},hD)}),m.click(function(){for(var a=0;a< d;a++)e[a].stop().animate(l[a].repeat(s))})):
m.click(function(){for(var a=0;a< d;a++)e[a].stop().animate(l[a].repeat(s))});else if(u&&!w)if(y){for(x=0;x< d;x++)e[x].stop().animate(l[x].repeat(Infinity));z=!0;setInterval(B,500)}else h?m.hover(function(){for(var a=0;a< d;a++)e[a].stop().animate({fill:h},hD).animate(l[a].repeat(u))},function(){for(var a=0;a< d;a++)e[a].stop().animate(q[a],0)}):m.hover(function(){for(var a=0;a< d;a++)e[a].stop().animate(l[a].repeat(u))},function(){for(var a=0;a< d;a++)e[a].stop().animate(q[a],0)});else w?m.hover(function(){if(h)for(var a=
0;a< d;a++)e[a].stop().animate({fill:h},hD).animate(l[a]);else for(a=0;a< d;a++)e[a].stop().animate(l[a])},function(){for(var a=0;a< d;a++)e[a].stop().animate(q[a],mD)}):m.hover(function(){if(h)for(var a=0;a< d;a++)e[a].stop().animate(q[a],0).animate({fill:h},hD).animate(l[a].repeat(s));else for(a=0;a< d;a++)e[a].stop().animate(q[a],0).animate(l[a].repeat(s))},function(){for(var a=0;a< d;a++)e[a].animate({fill:t[a]},hD)})}else h&&m.hover(function(){for(var a=
0;a< d;a++)e[a].stop().animate({fill:h},hD)},function(){for(var a=0;a< d;a++)e[a].stop().animate({fill:t[a]},hD)});return!0};
(function(f){function b(){return b.counter++}b.counter=1;f.fn.extend({addLivicon:function(g){return this.each(function(){var k=f(this);if(!k.attr("id")){var h=b();k.attr("id","livicon-"+h)}var c=k.data();c.liviconRendered&&k.removeLivicon();c=fullNames(c);g&&(g=fullNames(g));var c=f.extend(c,g),h=k.attr("id"),u=k.parent(),s=c.name?c.name:dN,v=c.size?c.size:dS,x=c.eventtype?c.eventtype:dET,w=v/32;k[0].style.height?k.css("width",v):k.css({width:v,height:v});var y=s in liviconsdata?
liviconsdata[s]:liviconsdata[dN],m=k.hasClass(aC)||u.hasClass(aPC)?dAC:"original"==c.color?"original":c.color?c.color:dC,e=dA?!1==c.animate?c.animate:dA:!0==c.animate?c.animate:dA,d=dL?!1==c.loop?!1:Infinity:!0==c.loop?Infinity:!1,l=c.iteration?0< Math.round(c.iteration)?Math.round(c.iteration):!1:!1,q=c.duration?0< Math.round(c.duration)?Math.round(c.duration):!1:!1,t=dCCOH?dHC:!1;!1===c.hovercolor||
0===c.hovercolor?t=!1:!0===c.hovercolor||1===c.hovercolor?t=dHC:c.hovercolor&&(t=c.hovercolor);c=dOP?!1==c.onparent?!1:u:!0==c.onparent?u:!1;Raphael(h,v,v).createLivicon(h,s,v,m,t,e,d,l,q,x,y,w,c);k.data("liviconRendered",!0);return this})},removeLivicon:function(b){return this.each(function(){var k=f(this);k.data("liviconRendered",!1);if("total"===b)k.remove();else{var h=k.attr("id");f("#canvas-for-"+h).remove();return k}})},updateLivicon:function(b){return this.each(function(){var k=
f(this);k.removeLivicon().addLivicon(b);return k})}});f(".livicon").addLivicon()})(jQuery);function fullNames(f){f=JSON.stringify(f);f=f.replace(/\"n\":/g,'"name":').replace(/\"s\":/g,'"size":').replace(/\"c\":/g,'"color":').replace(/\"hc\":/g,'"hovercolor":').replace(/\"a\":/g,'"animate":').replace(/\"i\":/g,'"iteration":').replace(/\"d\":/g,'"duration":').replace(/\"l\":/g,'"loop":').replace(/\"et\":/g,'"eventtype":').replace(/\"op\":/g,'"onparent":');return f=JSON.parse(f)}
function clone(f){if(null==f||"object"!=typeof f)return f;var b=new f.constructor,g;for(g in f)b[g]=clone(f[g]);return b};});



/* GIFFER */
var Gifffer = function() {
    var images, d = document, ga = 'getAttribute', sa = 'setAttribute';
    images = d && d.querySelectorAll ? d.querySelectorAll('[data-gifffer]') : [];
    var createContainer = function(w, h, el) {
        
        var con = d.createElement('DIV'), cls = el[ga]('class'), id = el[ga]('id');
        cls ? con[sa]('class', el[ga]('class')) : null;
        id ? con[sa]('id', el[ga]('id')) : null;
        con[sa]('style', 'position:relative;cursor:pointer;width:' + w + 'px;height:' + h + 'px;');
        // creating play button
        /*
        var play = d.createElement('DIV');
        play[sa]('class','gifffer-play-button');
        play[sa]('style', 'width:60px;height:60px;border-radius:30px;background:rgba(0, 0, 0, 0.3);position:absolute;left:' + ((w/2)-30) + 'px;top:' + ((h/2)-30) + 'px;');
        var trngl = d.createElement('DIV');
        trngl[sa]('style', 'width:0;height: 0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-left:14px solid rgba(0, 0, 0, 0.5);position:absolute;left:26px;top:16px;')
        play.appendChild(trngl);
        // dom placement
        con.appendChild(play);
        */
        el.parentNode.replaceChild(con, el);
        var prevImg = jQuery(el);
        prevImg.addClass('proccessed-gif');
        prevImg.removeClass('image-thumb');
        prevImg.attr('data-gifffer-done', prevImg.attr('data-gifffer') );
        prevImg.removeAttr('data-gifffer')
        prevImg.hide();
        jQuery(con).append(prevImg);
        
        
        return {c: con};
        
    },
    i = 0,
    imglen = images.length,
    process = function(el) {
        var url, con, c, w, h, duration,play, gif, playing = false, cc, isC, durationTimeout;
        url = el[ga]('data-gifffer');
        w = el[ga]('data-gifffer-width');
        h = el[ga]('data-gifffer-height');
        duration = el[ga]('data-gifffer-duration');
        el.style.display = 'block';
        c = document.createElement('canvas');
        isC = !!(c.getContext && c.getContext('2d'));
        if(w && h && isC) cc = createContainer(w, h, el);
        el.onload = function() {
            if(isC) {
                w = w || el.width;
                h = h || el.height;
                // creating the container
                if(!cc) cc = createContainer(w, h, el);
                con = cc.c;
                //play = cc.p;
                /*
                con.addEventListener('click', function() {
                    clearTimeout(durationTimeout);
                    if(!playing) {
                        playing = true;
                        gif = d.createElement('IMG');
                        gif[sa]('style', 'width:' + w + 'px;height:' + h + 'px;');
                        gif[sa]('data-uri', Math.floor(Math.random()*100000) + 1);
                        setTimeout(function() {
                            gif.src = url;
                        }, 0);                        
                        con.removeChild(play);
                        con.removeChild(c);
                        con.appendChild(gif);
                        if(parseInt(duration) > 0) {
                            durationTimeout = setTimeout(function() {
                                playing = false;
                                con.appendChild(play);
                                con.removeChild(gif);
                                con.appendChild(c);
                                gif = null;
                            }, duration);
                        }
                    } else {
                        playing = false;
                        con.appendChild(play);
                        con.removeChild(gif);
                        con.appendChild(c);
                        gif = null;
                    }
                });
                */
                // canvas
                c.width = w;
                c.height = h;
                c.getContext('2d').drawImage(el, 0, 0, w, h);
                con.appendChild(c);
            }
        }
        el.src = url;
    },
    processDone = function(el) {
       
        for(var i = 0; i<el.parentNode.children.length; i++){
          var child = el.parentNode.children[i];
          if(child.tagName == 'CANVAS')
            return;
          
        } 
        
        var url, con, c, w, h, duration,play, gif, playing = false, cc, isC, durationTimeout;
        url = el[ga]('data-gifffer-done');
        w = el[ga]('data-gifffer-width');
        h = el[ga]('data-gifffer-height');
        /*el.style.display = 'block';*/
        c = document.createElement('canvas');
        isC = !!(c.getContext && c.getContext('2d'));
        c.width = w;
        c.height = h;
        c.getContext('2d').drawImage(el, 0, 0, w, h);
        el.parentNode.appendChild(c);
        
    }
    
    var doneImages = d && d.querySelectorAll ? d.querySelectorAll('[data-gifffer-done]') : [];
    var imgdonelen = doneImages.length;
    for(i = 0; i<imgdonelen; ++i) processDone(doneImages[i]);
    
    for(i = 0; i<imglen; ++i) process(images[i]);
    
    
    
    
}

function formatShareNumber(total){
  if(total >= 1000000 ){
    total = number_format(total / 1000000, 1, '.', ',') + 'M';
  }
  else if(total >= 1000){
    total = number_format(total / 1000, 1, '.', ',') + 'K';
  } 
  
  return total;
}



(function($) {
    $.fn.textfill2 = function(options) {
        var maxFontSize = options.maxFontPixels;
        var fontSize = 10;
        //var ourText = jQuery('div:visible:first', this);
        var el = jQuery(this);
        var ourText = el.find('div:first-child');
        var maxHeight = el.innerHeight() - parseInt(el.css('padding-top')) - parseInt(el.css('padding-bottom'));
        
        
        var maxWidth = jQuery(this).innerWidth();
        var textHeight;
        var textWidth;
        do {
            ourText.css('font-size', fontSize);
            textHeight = ourText.height();
            textWidth = ourText.width();
            fontSize = fontSize + 1;
            
        } while ((textHeight < maxHeight || textWidth < maxWidth) && fontSize < maxFontSize );
        return this;
    }
})(jQuery);



// POLL LOGIC
function checkPoll(){
  
  var pollId = jQuery('.widget-poll input[name=poll_id]').val();
  var cookieName =  'cwppoll' + pollId;
  if(pollId > 0 && WDD_Popup_Get_Cookie( cookieName) ){

     var form = jQuery('.widget-poll .show-form' + pollId);
     form.css('display', 'none');

     var results = jQuery('.widget-poll .poll-show-results');
     results.css('display', 'block');

  }
}

function vote_poll(pollid, answertype, maxnoanswers){
    
    if(answertype == 'multiple')
    {
        var answersCheckedCount = jQuery("#poll"+ pollid +" input[type=checkbox]:checked").length;
        if(answersCheckedCount < 1){
          //alert('Click on the different options to vote and view results');
          //swal("Click on the different options to vote and view results", null, "warning");
          swal({ title:"Click on the different options to vote and view results", text: null, type: "warning",  confirmButtonColor: null} );
          return false;
        }
        
        data = jQuery('#poll'+pollid).serialize();
        var n=data.match(/option/g);
        if(parseInt(n.length) <= parseInt(maxnoanswers))
            {
                jQuery('#show-form'+pollid).fadeOut(500);
                jQuery('#show-results'+pollid).css('display', 'none');
                jQuery.post(ajaxurl, data,  
                    function(response){
                        jQuery('#poll'+pollid).html(response);
                        jQuery('#pollsc'+pollid).html(response);
                    }
                );
            }
        else 
        //jAlert("Sorry! Maximum no of answers allowed is " + maxnoanswers, "Error message");
        //swal("Sorry! Maximum no of answers allowed is " + maxnoanswers, null, "warning");
        swal({ title:"Sorry! Maximum no of answers allowed is " + maxnoanswers, text: null, type: "warning",  confirmButtonColor: null} );
    }
    if(answertype == 'one')
    {
        var answersCheckedCount = jQuery("#poll"+ pollid +" input[type=radio]:checked").length;
        if(answersCheckedCount < 1){
          //alert('Click on the different options to vote and view results');
          //swal("Click on the different options to vote and view results", null, "warning");
          swal({ title:"Click on the different options to vote and view results", text: null, type: "warning",  confirmButtonColor: null} );
          return false;
        }
        
        data = jQuery('#poll'+pollid).serialize();
        jQuery('#show-form'+pollid).fadeOut(500);
        jQuery('#show-results'+pollid).css('display', 'none');
        jQuery.post(ajaxurl, data,  
            function(response){
                jQuery('#poll'+pollid).html(response);
                jQuery('#pollsc'+pollid).html(response);
            }
        ); 
    }
}


function vote_poll_sc(pollid, answertype, maxnoanswers){
  
    if(answertype == 'multiple')
    {
        data = jQuery('#pollsc'+pollid).serialize();
        var n=data.match(/option/g);
        if(parseInt(n.length) <= parseInt(maxnoanswers))
            {
                jQuery('#show-form'+pollid).fadeOut(500);
                jQuery('#show-results'+pollid).css('display', 'none');
                jQuery.post(ajaxurl, data,  
                    function(response){
                        jQuery('#poll'+pollid).html(response);
                        jQuery('#pollsc'+pollid).html(response);
                    }
                );
            }
        else 
          //swal("Sorry! Maximum no of answers allowed is " + maxnoanswers, null, "warning");
          swal({ title:"Sorry! Maximum no of answers allowed is " + maxnoanswers, text: null, type: "warning",  confirmButtonColor: null} );
        //jAlert("Sorry! Maximum no of answers allowed is " + maxnoanswers, "Error message");
        
    }
    if(answertype == 'one')
    {
        data = jQuery('#pollsc'+pollid).serialize();
        jQuery('#show-form'+pollid).fadeOut(500);
        jQuery('#show-results'+pollid).css('display', 'none');
        jQuery.post(ajaxurl, data,  
            function(response){
                jQuery('#poll'+pollid).html(response);
                jQuery('#pollsc'+pollid).html(response);
            }
        ); 
    }    
}


function commaSeparated(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function validateEmailForWdd(email){ 
 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
 return email.match(re) 
}


/**
 * @preserve  textfill
 * @name      jquery.textfill.js
 * @author    Russ Painter
 * @author    Yu-Jie Lin
 * @author    Alexandre Dantas
 * @version   0.6.0
 * @date      2014-08-19
 * @copyright (c) 2014 Alexandre Dantas
 * @copyright (c) 2012-2013 Yu-Jie Lin
 * @copyright (c) 2009 Russ Painter
 * @license   MIT License
 * @homepage  https://github.com/jquery-textfill/jquery-textfill
 * @example   http://jquery-textfill.github.io/jquery-textfill/index.html
 */
; (function($) {

	/**
	 * Resizes an inner element's font so that the
	 * inner element completely fills the outer element.
	 *
	 * @param {Object} options User options that take
	 *                         higher precedence when
	 *                         merging with the default ones.
	 *
	 * @return All outer elements processed
	 */
	$.fn.textfill = function(options) {

		// ______  _______ _______ _______ _     _        _______ _______
		// |     \ |______ |______ |_____| |     | |         |    |______
		// |_____/ |______ |       |     | |_____| |_____    |    ______|
        //
		// Merging user options with the default values

		var defaults = {
			debug            : false,
			maxFontPixels    : 40,
			minFontPixels    : 4,
			innerTag         : 'span',
			widthOnly        : false,
			success          : null, // callback when a resizing is done
			callback         : null, // callback when a resizing is done (deprecated, use success)
			fail             : null, // callback when a resizing is failed
			complete         : null, // callback when all is done
			explicitWidth    : null,
			explicitHeight   : null,
			changeLineHeight : false
		};

		var Opts = $.extend(defaults, options);

		// _______ _     _ __   _ _______ _______ _____  _____  __   _ _______
		// |______ |     | | \  | |          |      |   |     | | \  | |______
		// |       |_____| |  \_| |_____     |    __|__ |_____| |  \_| ______|
		//
		// Predefining the awesomeness

		// Output arguments to the Debug console
		// if "Debug Mode" is enabled
		function _debug() {
			if (!Opts.debug
				||  typeof console       == 'undefined'
				||  typeof console.debug == 'undefined') {
				return;
			}
			console.debug.apply(console, arguments);
		}

		// Output arguments to the Warning console
		function _warn() {
			if (typeof console      == 'undefined' ||
				typeof console.warn == 'undefined') {
				return;
			}
			console.warn.apply(console, arguments);
		}

		// Outputs all information on the current sizing
		// of the font.
		function _debug_sizing(prefix, ourText, maxHeight, maxWidth, minFontPixels, maxFontPixels) {

			function _m(v1, v2) {

				var marker = ' / ';

				if (v1 > v2)
					marker = ' > ';

				else if (v1 == v2)
					marker = ' = ';

				return marker;
			}

			_debug(
				'[TextFill] '  + prefix + ' { ' +
				'font-size: ' + ourText.css('font-size') + ',' +
				'Height: '    + ourText.height() + 'px ' + _m(ourText.height(), maxHeight) + maxHeight + 'px,' +
				'Width: '     + ourText.width()  + _m(ourText.width() , maxWidth)  + maxWidth + ',' +
				'minFontPixels: ' + minFontPixels + 'px, ' +
				'maxFontPixels: ' + maxFontPixels + 'px }'
			);
		}

		/**
		 * Calculates which size the font can get resized,
		 * according to constrains.
		 *
		 * @param {String} prefix Gets shown on the console before
		 *                        all the arguments, if debug mode is on.
		 * @param {Object} ourText The DOM element to resize,
		 *                         that contains the text.
		 * @param {function} func Function called on `ourText` that's
		 *                        used to compare with `max`.
		 * @param {number} max Maximum value, that gets compared with
		 *                     `func` called on `ourText`.
		 * @param {number} minFontPixels Minimum value the font can
		 *                               get resized to (in pixels).
		 * @param {number} maxFontPixels Maximum value the font can
		 *                               get resized to (in pixels).
		 *
		 * @return Size (in pixels) that the font can be resized.
		 */
		function _sizing(prefix, ourText, func, max, maxHeight, maxWidth, minFontPixels, maxFontPixels) {

			_debug_sizing(
				prefix, ourText,
				maxHeight, maxWidth,
				minFontPixels, maxFontPixels
			);

			// The kernel of the whole plugin, take most attention
			// on this part.
			//
			// This is a loop that keeps increasing the `font-size`
			// until it fits the parent element.
			//
			// - Start from the minimal allowed value (`minFontPixels`)
			// - Guesses an average font size (in pixels) for the font,
			// - Resizes the text and sees if its size is within the
			//   boundaries (`minFontPixels` and `maxFontPixels`).
			//   - If so, keep guessing until we break.
			//   - If not, return the last calculated size.
			//
			// I understand this is not optimized and we should
			// consider implementing something akin to
			// Daniel Hoffmann's answer here:
			//
			//     http://stackoverflow.com/a/17433451/1094964
			//

			while (minFontPixels < (maxFontPixels - 1)) {

				var fontSize = Math.floor((minFontPixels + maxFontPixels) / 2);
				ourText.css('font-size', fontSize);

				if (func.call(ourText) <= max) {
					minFontPixels = fontSize;

					if (func.call(ourText) == max)
						break;
				}
				else
					maxFontPixels = fontSize;

				_debug_sizing(
					prefix, ourText,
					maxHeight, maxWidth,
					minFontPixels, maxFontPixels
				);
			}

			ourText.css('font-size', maxFontPixels);

			if (func.call(ourText) <= max) {
				minFontPixels = maxFontPixels;

				_debug_sizing(
					prefix + '* ', ourText,
					maxHeight, maxWidth,
					minFontPixels, maxFontPixels
				);
			}
			return minFontPixels;
		}

		// _______ _______ _______  ______ _______
		// |______    |    |_____| |_____/    |
		// ______|    |    |     | |    \_    |
        //
		// Let's get it started (yeah)!

		_debug('[TextFill] Start Debug');

		this.each(function() {

			// Contains the child element we will resize.
			// $(this) means the parent container
			var ourText = $(Opts.innerTag + ':visible:first', this);

			// Will resize to this dimensions.
			// Use explicit dimensions when specified
			var maxHeight = Opts.explicitHeight || $(this).height();
			var maxWidth  = Opts.explicitWidth  || $(this).width();

			var oldFontSize = ourText.css('font-size');

			var lineHeight  = parseFloat(ourText.css('line-height')) / parseFloat(oldFontSize);

			_debug('[TextFill] Inner text: ' + ourText.text());
			_debug('[TextFill] All options: ', Opts);
			_debug('[TextFill] Maximum sizes: { ' +
				   'Height: ' + maxHeight + 'px, ' +
				   'Width: '  + maxWidth  + 'px' + ' }'
				  );

			var minFontPixels = Opts.minFontPixels;

			// Remember, if this `maxFontPixels` is negative,
			// the text will resize to as long as the container
			// can accomodate
			var maxFontPixels = (Opts.maxFontPixels <= 0 ?
								 maxHeight :
								 Opts.maxFontPixels);


			// Let's start it all!

			// 1. Calculate which `font-size` would
			//    be best for the Height
			var fontSizeHeight = undefined;

			if (! Opts.widthOnly)
				fontSizeHeight = _sizing(
					'Height', ourText,
					$.fn.height, maxHeight,
					maxHeight, maxWidth,
					minFontPixels, maxFontPixels
				);

			// 2. Calculate which `font-size` would
			//    be best for the Width
			var fontSizeWidth = undefined;

			fontSizeWidth = _sizing(
				'Width', ourText,
				$.fn.width, maxWidth,
				maxHeight, maxWidth,
				minFontPixels, maxFontPixels
			);

			// 3. Actually resize the text!

			if (Opts.widthOnly) {
				ourText.css({
					'font-size'  : fontSizeWidth,
					'white-space': 'nowrap'
				});

				if (Opts.changeLineHeight)
					ourText.parent().css(
						'line-height',
						(lineHeight * fontSizeWidth + 'px')
					);
			}
			else {
				var fontSizeFinal = Math.min(fontSizeHeight, fontSizeWidth);

				ourText.css('font-size', fontSizeFinal);

				if (Opts.changeLineHeight)
					ourText.parent().css(
						'line-height',
						(lineHeight * fontSizeFinal) + 'px'
					);
			}

			_debug(
				'[TextFill] Finished { ' +
				'Old font-size: ' + oldFontSize              + ', ' +
				'New font-size: ' + ourText.css('font-size') + ' }'
			);

			// Oops, something wrong happened!
			// We weren't supposed to exceed the original size
			if ((ourText.width()  > maxWidth) ||
				(ourText.height() > maxHeight && !Opts.widthOnly)) {

				ourText.css('font-size', oldFontSize);

				// Failure callback
				if (Opts.fail)
					Opts.fail(this);

				_debug(
					'[TextFill] Failure { ' +
					'Current Width: '  + ourText.width()  + ', ' +
					'Maximum Width: '  + maxWidth         + ', ' +
					'Current Height: ' + ourText.height() + ', ' +
					'Maximum Height: ' + maxHeight        + ' }'
				);
			}
			else if (Opts.success) {
				Opts.success(this);
			}
			else if (Opts.callback) {
				_warn('callback is deprecated, use success, instead');

				// Success callback
				Opts.callback(this);
			}
		});

		// Complete callback
		if (Opts.complete)
			Opts.complete(this);

		_debug('[TextFill] End Debug');
		return this;
	};

})(window.jQuery);




/**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.6
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,targ,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

(function ( $ ) {
  $.fn.goTextTyping = function( options ) {
    //this.css( "color", "green" );
    
    
    
    var text = options.text;
    var speed = 20;
    
    var lnkText = text;
      
    var lnkTextCurent = this.text();
    var lnkTextLength = lnkTextCurent.length;
    var lnkReplacingText = text;//icnLnk.attr('data-text');
    var lnkReplacingTextLength = lnkReplacingText.length;
      
    for(var i = 0; i < lnkReplacingTextLength - lnkTextLength; i++  ){
        lnkTextCurent += ' ';
    }
    
    var owner = this;  
 
      clearInterval(owner.interval);
      var writerIndex = 0;
      owner.interval = setInterval(function(){
         //lnkTextCurent[index] = lnkReplacingText[index];
         lnkTextCurent = lnkTextCurent.replaceAt(writerIndex, lnkReplacingText[writerIndex] );
         
         owner.text( lnkTextCurent );
         //console.log(index);
         writerIndex++;
         if( writerIndex >= lnkReplacingTextLength ){
           clearInterval(owner.interval);
           if(options.finish){
             options.finish();
           }
         }  
          
      }, speed );
    
    
    /*console.log(text);
    if(options.finish){
      options.finish();
    }
    */
    
    return this;
  };
}( jQuery ));

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) { return;}//throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};



String.prototype.replaceAt=function(index, character) {
    if(!character)
      return this;
    return this.substr(0, index) + character + this.substr(index+character.length);
}


function WDD_Popup_Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}


function WDD_Popup_Set_Cookie( name, value, expires, path, domain, secure ){
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );

}



function PopupCenter(url, title, w, h) {
    
    if(mobilecheck()){
      window.location = url;
      return false;
    }
       
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}


function mobilecheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}




// sweet alert
//!function(){function e(){var e='<div class="sweet-overlay"></div><div class="sweet-alert"><div class="icon error"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div><div class="icon warning"> <span class="body"></span> <span class="dot"></span> </div> <div class="icon info"></div> <div class="icon success"> <span class="line tip"></span> <span class="line long"></span> <div class="placeholder"></div> <div class="fix"></div> </div> <div class="icon custom"></div> <h2>Title</h2><p>Text</p><button class="cancel">Cancel</button><button class="confirm">OK</button></div>',t=document.createElement("div");t.innerHTML=e,document.body.appendChild(t)}function t(e){var t=l(),n=t.querySelector("h2"),a=t.querySelector("p"),r=t.querySelector("button.cancel"),o=t.querySelector("button.confirm");if(n.innerHTML=m(e.title),a.innerHTML=m(e.text||""),e.text&&y(a),f(t.querySelectorAll(".icon")),e.type){for(var i=!1,s=0;s<c.length;s++)if(e.type===c[s]){i=!0;break}if(!i)return window.console.error("Unknown alert type: "+e.type),!1;var d=t.querySelector(".icon."+e.type);switch(y(d),e.type){case"success":u(d,"animate"),u(d.querySelector(".tip"),"animateSuccessTip"),u(d.querySelector(".long"),"animateSuccessLong");break;case"error":u(d,"animateErrorIcon"),u(d.querySelector(".x-mark"),"animateXMark");break;case"warning":u(d,"pulseWarning"),u(d.querySelector(".body"),"pulseWarningIns"),u(d.querySelector(".dot"),"pulseWarningIns")}}if(e.imageUrl){var p=t.querySelector(".icon.custom");p.style.backgroundImage="url("+e.imageUrl+")",y(p);var g=80,v=80;if(e.imageSize){var w=e.imageSize.split("x")[0],S=e.imageSize.split("x")[1];w&&S?(g=w,v=S,p.css({width:w+"px",height:S+"px"})):window.console.error("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+g+"px; height:"+v+"px")}e.showCancelButton?r.style.display="inline-block":f(r),e.cancelButtonText&&(r.innerHTML=m(e.cancelButtonText)),e.confirmButtonText&&(o.innerHTML=m(e.confirmButtonText)),t.setAttribute("data-allow-ouside-click",e.allowOutsideClick);var x=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",x)}function n(){var e=l();S(document.querySelector(i),10),y(e),u(e,"showSweetAlert"),d(e,"hideSweetAlert"),setTimeout(function(){u(e,"visible")},500)}function a(){var e=l();x(document.querySelector(i),5),x(e,5),d(e,"showSweetAlert"),u(e,"hideSweetAlert"),d(e,"visible");var t=e.querySelector(".icon.success");d(t,"animate"),d(t.querySelector(".tip"),"animateSuccessTip"),d(t.querySelector(".long"),"animateSuccessLong");var n=e.querySelector(".icon.error");d(n,"animateErrorIcon"),d(n.querySelector(".x-mark"),"animateXMark");var a=e.querySelector(".icon.warning");d(a,"pulseWarning"),d(a.querySelector(".body"),"pulseWarningIns"),d(a.querySelector(".dot"),"pulseWarningIns")}function r(){var e=l();e.style.marginTop=w(l())}var o=".sweet-alert",i=".sweet-overlay",c=["error","warning","info","success"],l=function(){return document.querySelector(o)},s=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},u=function(e,t){s(e,t)||(e.className+=" "+t)},d=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(s(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},m=function(e){var t=document.createElement("div");return t.appendChild(document.createTextNode(e)),t.innerHTML},p=function(e){e.style.opacity="",e.style.display="block"},y=function(e){if(e&&!e.length)return p(e);for(var t=0;t<e.length;++t)p(e[t])},g=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return g(e);for(var t=0;t<e.length;++t)g(e[t])},v=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},w=function(e){e.style.left="-9999px",e.style.display="block";var t=e.clientHeight,n=parseInt(getComputedStyle(e).getPropertyValue("padding"),10);return e.style.left="",e.style.display="none","-"+parseInt(t/2+n)+"px"},S=function(e,t){var t=t||16;e.style.opacity=0,e.style.display="block";var n=+new Date,a=function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(a,t)};a()},x=function(e,t){var t=t||16;e.style.opacity=1;var n=+new Date,a=function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(a,t):e.style.display="none"};a()};window.sweetAlert=function(){var e={title:"",text:"",type:null,allowOutsideClick:!1,showCancelButton:!1,confirmButtonText:"OK",cancelButtonText:"Cancel",imageUrl:null,imageSize:null};if(void 0===arguments[0])return window.console.error("sweetAlert expects at least 1 attribute!"),!1;switch(typeof arguments[0]){case"string":e.title=arguments[0],e.text=arguments[1]||"",e.type=arguments[2]||"";break;case"object":if(void 0===arguments[0].title)return window.console.error('Missing "title" argument!'),!1;e.title=arguments[0].title,e.text=arguments[0].text||e.text,e.type=arguments[0].type||e.type,e.allowOutsideClick=arguments[0].allowOutsideClick||e.allowOutsideClick,e.showCancelButton=arguments[0].showCancelButton||e.showCancelButton,e.showCancelButton&&(e.confirmButtonText="Confirm"),e.confirmButtonText=arguments[0].confirmButtonText||e.confirmButtonText,e.cancelButtonText=arguments[0].cancelButtonText||e.cancelButtonText,e.imageUrl=arguments[0].imageUrl||e.imageUrl,e.imageSize=arguments[0].imageSize||e.imageSize,e.doneFunction=arguments[1]||null;break;default:return window.console.error('Unexpected type of argument! Expected "string" or "object", got '+typeof arguments[0]),!1}t(e),r(),n();for(var o=l(),i=function(t){var n=t.target||t.srcElement,r="confirm"===n.className,i=s(o,"visible"),c=e.doneFunction&&"true"===o.getAttribute("data-has-done-function");r&&c&&i&&e.doneFunction(),a()},c=o.querySelectorAll("button"),u=0;u<c.length;u++)c[u].onclick=i;document.onclick=function(e){var t=e.target||e.srcElement,n=o===t,r=v(o,e.target),i=s(o,"visible"),c="true"===o.getAttribute("data-allow-ouside-click");!n&&!r&&i&&c&&a()}},window.swal=window.sweetAlert,document.addEventListener?document.addEventListener("DOMContentLoaded",function h(){document.removeEventListener("DOMContentLoaded",arguments.callee,!1),e()},!1):document.attachEvent&&document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",arguments.callee),e())})}();
!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return i(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o,a,r){var s=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(r,"__esModule",{value:!0});var l,i,u,c,d=o("./modules/handle-dom"),f=o("./modules/utils"),p=o("./modules/handle-swal-dom"),m=o("./modules/handle-click"),v=o("./modules/handle-key"),y=s(v),h=o("./modules/default-params"),b=s(h),g=o("./modules/set-params"),w=s(g);r["default"]=u=c=function(){function o(e){var t=a;return t[e]===n?b["default"][e]:t[e]}var a=arguments[0];if(d.addClass(t.body,"stop-scrolling"),p.resetInput(),a===n)return f.logStr("SweetAlert expects at least 1 attribute!"),!1;var r=f.extend({},b["default"]);switch(typeof a){case"string":r.title=a,r.text=arguments[1]||"",r.type=arguments[2]||"";break;case"object":if(a.title===n)return f.logStr('Missing "title" argument!'),!1;r.title=a.title;for(var s in b["default"])r[s]=o(s);r.confirmButtonText=r.showCancelButton?"Confirm":b["default"].confirmButtonText,r.confirmButtonText=o("confirmButtonText"),r.doneFunction=arguments[1]||null;break;default:return f.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof a),!1}w["default"](r),p.fixVerticalPosition(),p.openModal(arguments[1]);for(var u=p.getModal(),v=u.querySelectorAll("button"),h=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],g=function(e){return m.handleButton(e,r,u)},C=0;C<v.length;C++)for(var S=0;S<h.length;S++){var x=h[S];v[C][x]=g}p.getOverlay().onclick=g,l=e.onkeydown;var k=function(e){return y["default"](e,r,u)};e.onkeydown=k,e.onfocus=function(){setTimeout(function(){i!==n&&(i.focus(),i=n)},0)},c.enableButtons()},u.setDefaults=c.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");f.extend(b["default"],e)},u.close=c.close=function(){var o=p.getModal();d.fadeOut(p.getOverlay(),5),d.fadeOut(o,5),d.removeClass(o,"showSweetAlert"),d.addClass(o,"hideSweetAlert"),d.removeClass(o,"visible");var a=o.querySelector(".sa-icon.sa-success");d.removeClass(a,"animate"),d.removeClass(a.querySelector(".sa-tip"),"animateSuccessTip"),d.removeClass(a.querySelector(".sa-long"),"animateSuccessLong");var r=o.querySelector(".sa-icon.sa-error");d.removeClass(r,"animateErrorIcon"),d.removeClass(r.querySelector(".sa-x-mark"),"animateXMark");var s=o.querySelector(".sa-icon.sa-warning");return d.removeClass(s,"pulseWarning"),d.removeClass(s.querySelector(".sa-body"),"pulseWarningIns"),d.removeClass(s.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");d.removeClass(o,e)},300),d.removeClass(t.body,"stop-scrolling"),e.onkeydown=l,e.previousActiveElement&&e.previousActiveElement.focus(),i=n,clearTimeout(o.timeout),!0},u.showInputError=c.showInputError=function(e){var t=p.getModal(),n=t.querySelector(".sa-input-error");d.addClass(n,"show");var o=t.querySelector(".sa-error-container");d.addClass(o,"show"),o.querySelector("p").innerHTML=e,setTimeout(function(){u.enableButtons()},1),t.querySelector("input").focus()},u.resetInputError=c.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=p.getModal(),n=t.querySelector(".sa-input-error");d.removeClass(n,"show");var o=t.querySelector(".sa-error-container");d.removeClass(o,"show")},u.disableButtons=c.disableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!0,n.disabled=!0},u.enableButtons=c.enableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!1,n.disabled=!1},"undefined"!=typeof e?e.sweetAlert=e.swal=u:f.logStr("SweetAlert is a frontend module!"),a.exports=r["default"]},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=r.hasClass(o,"visible"),h=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=a.colorLuminance(u,-.04),d=a.colorLuminance(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var b=o.querySelector("button.confirm"),g=o.querySelector("button.cancel");m?g.style.boxShadow="none":b.style.boxShadow="none";break;case"click":var w=o===p,C=r.isDescendant(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&h&&y?l(o,n):h&&y||v?i(o,n):r.isDescendant(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;r.hasClass(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)});o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"});o()},h=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},b=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=h,a.stopEventPropagation=b},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],r.stopEventPropagation(l),f.focus(),o.confirmButtonColor&&s.setFocusStyle(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,r.fireClick(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){var r=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=t.querySelector(f);return e||(m(),e=v()),e}),y=function(){var e=v();return e?e.querySelector("input"):void 0},h=function(){return t.querySelector(p)},b=function(e,t){var n=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},g=function(n){var o=v();l.fadeIn(h(),10),l.show(o),l.addClass(o,"showSweetAlert"),l.removeClass(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){l.addClass(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();l.removeClass(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");l.removeClass(n,"show");var o=t.querySelector(".sa-error-container");l.removeClass(o,"show")},S=function(){var e=v();e.style.marginTop=l.getTopMargin(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=h,a.getInput=y,a.setFocusStyle=b,a.openModal=g,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=r.getModal(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:s.escapeHtml(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:s.escapeHtml(e.text||"").split("\n").join("<br>"),e.text&&s.show(i),e.customClass)s.addClass(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");s.removeClass(t,d),t.setAttribute("data-custom-class","")}if(s.hide(t.querySelectorAll(".sa-icon")),e.type&&!a.isIE8()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),s.show(u));var c=r.getInput();switch(e.type){case"success":s.addClass(u,"animate"),s.addClass(u.querySelector(".sa-tip"),"animateSuccessTip"),s.addClass(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":s.addClass(u,"animateErrorIcon"),s.addClass(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":s.addClass(u,"pulseWarning"),s.addClass(u.querySelector(".sa-body"),"pulseWarningIns"),s.addClass(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),s.addClass(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",s.show(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),h=y[0],b=y[1];h&&b?(m=h,v=b):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":s.hide(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":s.hide(c),e.cancelButtonText&&(u.innerHTML=s.escapeHtml(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=s.escapeHtml(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,c.style.borderLeftColor=e.confirmLoadingButtonColor,c.style.borderRightColor=e.confirmLoadingButtonColor,r.setFocusStyle(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var g=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",g),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+css-extras+clike+javascript+php+scss&plugins=show-invisibles */
self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{};var Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=t.util.clone(e[r]));return a;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var a=t.util.clone(t.languages[e]);for(var r in n)a[r]=n[r];return a},insertBefore:function(e,n,a,r){r=r||t.languages;var i=r[e],l={};for(var o in i)if(i.hasOwnProperty(o)){if(o==n)for(var s in a)a.hasOwnProperty(s)&&(l[s]=a[s]);l[o]=i[o]}return r[e]=l},DFS:function(e,n,a){for(var r in e)e.hasOwnProperty(r)&&(n.call(e,r,e[r],a||r),"Object"===t.util.type(e[r])?t.languages.DFS(e[r],n):"Array"===t.util.type(e[r])&&t.languages.DFS(e[r],n,r))}},highlightAll:function(e,n){for(var a,r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),i=0;a=r[i++];)t.highlightElement(a,e===!0,n)},highlightElement:function(a,r,i){for(var l,o,s=a;s&&!e.test(s.className);)s=s.parentNode;if(s&&(l=(s.className.match(e)||[,""])[1],o=t.languages[l]),o){a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,s=a.parentNode,/pre/i.test(s.nodeName)&&(s.className=s.className.replace(e,"").replace(/\s+/g," ")+" language-"+l);var c=a.textContent;if(c){var g={element:a,language:l,grammar:o,code:c};if(t.hooks.run("before-highlight",g),r&&self.Worker){var u=new Worker(t.filename);u.onmessage=function(e){g.highlightedCode=n.stringify(JSON.parse(e.data),l),t.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,i&&i.call(g.element),t.hooks.run("after-highlight",g)},u.postMessage(JSON.stringify({language:g.language,code:g.code}))}else g.highlightedCode=t.highlight(g.code,g.grammar,g.language),t.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,i&&i.call(a),t.hooks.run("after-highlight",g)}}},highlight:function(e,a,r){var i=t.tokenize(e,a);return n.stringify(t.util.encode(i),r)},tokenize:function(e,n){var a=t.Token,r=[e],i=n.rest;if(i){for(var l in i)n[l]=i[l];delete n.rest}e:for(var l in n)if(n.hasOwnProperty(l)&&n[l]){var o=n[l];o="Array"===t.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var c=o[s],g=c.inside,u=!!c.lookbehind,f=0,h=c.alias;c=c.pattern||c;for(var p=0;p<r.length;p++){var d=r[p];if(r.length>e.length)break e;if(!(d instanceof a)){c.lastIndex=0;var m=c.exec(d);if(m){u&&(f=m[1].length);var y=m.index-1+f,m=m[0].slice(f),v=m.length,k=y+v,b=d.slice(0,y+1),w=d.slice(k+1),N=[p,1];b&&N.push(b);var O=new a(l,g?t.tokenize(m,g):m,h);N.push(O),w&&N.push(w),Array.prototype.splice.apply(r,N)}}}}}return r},hooks:{all:{},add:function(e,n){var a=t.hooks.all;a[e]=a[e]||[],a[e].push(n)},run:function(e,n){var a=t.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(n.stringify=function(e,a,r){if("string"==typeof e)return e;if("[object Array]"==Object.prototype.toString.call(e))return e.map(function(t){return n.stringify(t,a,e)}).join("");var i={type:e.type,content:n.stringify(e.content,a,r),tag:"span",classes:["token",e.type],attributes:{},language:a,parent:r};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var l="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}t.hooks.run("wrap",i);var o="";for(var s in i.attributes)o+=s+'="'+(i.attributes[s]||"")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'" '+o+">"+i.content+"</"+i.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(e){var n=JSON.parse(e.data),a=n.language,r=n.code;self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r,t.languages[a])))),self.close()},!1),self.Prism):self.Prism;var a=document.getElementsByTagName("script");return a=a[a.length-1],a&&(t.filename=a.src,document.addEventListener&&!a.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism);;
Prism.languages.markup={comment:/<!--[\w\W]*?-->/g,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/\&#?[\da-z]{1,8};/gi},Prism.hooks.add("wrap",function(t){"entity"===t.type&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/gi,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,punctuation:/[\{\};:]/g,"function":/[-a-z0-9]+(?=\()/gi},Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/gi,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}});;
Prism.languages.css.selector={pattern:/[^\{\}\s][^\{\}]*(?=\s*\{)/g,inside:{"pseudo-element":/:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,"pseudo-class":/:[-\w]+(?:\(.*\))?/g,"class":/\.[-:\.\w]+/g,id:/#[-:\.\w]+/g}},Prism.languages.insertBefore("css","ignore",{hexcode:/#[\da-f]{3,6}/gi,entity:/\\[\da-f]{1,8}/gi,number:/[\d%\.]+/g});;
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//g,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*?(\r?\n|$)/g,lookbehind:!0}],string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/gi,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};;
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/gi,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}});;
Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi,constant:/\b[A-Z0-9_]{2,}\b/g,comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,lookbehind:!0}}),Prism.languages.insertBefore("php","keyword",{delimiter:/(\?>|<\?php|<\?)/gi,variable:/(\$\w+)\b/gi,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/g,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/g,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&(e.tokenStack=[],e.backupCode=e.code,e.code=e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,function(n){return e.tokenStack.push(n),"{{{PHP"+e.tokenStack.length+"}}}"}))}),Prism.hooks.add("before-insert",function(e){"php"===e.language&&(e.code=e.backupCode,delete e.backupCode)}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language){for(var n,a=0;n=e.tokenStack[a];a++)e.highlightedCode=e.highlightedCode.replace("{{{PHP"+(a+1)+"}}}",Prism.highlight(n,e.grammar,"php"));e.element.innerHTML=e.highlightedCode}}),Prism.hooks.add("wrap",function(e){"php"===e.language&&"markup"===e.type&&(e.content=e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/<[^?]\/?(.*?)>/g,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/g}));;
Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},atrule:/@[\w-]+(?=\s+(\(|\{|;))/gi,url:/([-a-z]+-)*url(?=\()/gi,selector:/([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm}),Prism.languages.insertBefore("scss","atrule",{keyword:/@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i}),Prism.languages.insertBefore("scss","property",{variable:/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i}),Prism.languages.insertBefore("scss","ignore",{placeholder:/%[-_\w]+/i,statement:/\B!(default|optional)\b/gi,"boolean":/\b(true|false)\b/g,"null":/\b(null)\b/g,operator:/\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g});;
!function(){if(window.Prism)for(var r in Prism.languages){var a=Prism.languages[r];a.tab=/\t/g,a.lf=/\n/g,a.cr=/\r/g}}();;

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});