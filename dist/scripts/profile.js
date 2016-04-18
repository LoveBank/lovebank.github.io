"use strict";function handleExistingProfile(e){getProfile(e).then(function(e){1==e.data.length&&(console.log("Saving profile"),saveProfile(e))})["catch"](function(e){console.log("Promise failed "+e)})}function getEmailQueryParam(){return getParameterByName("email")}function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)","i"),i=a.exec(t);return i?i[2]?decodeURIComponent(i[2].replace(/\+/g," ")):"":null}function checkForUpgrade(){var e=localStorage.getItem("version");null==e?localStorage.setItem("version",1):e>version&&performUpgrade()}function performUpgrade(){var e=localStorage.getItem("profile_id");getProfileById(e).then(function(e){1==e.data.length&&(saveProfile(e),localStorage.setItem("version",1))})["catch"](function(e){console.log("Failed to retrieve profile by ID "+e)})}function setProfileLink(){var e=JSON.parse(localStorage.getItem("profile")).firstname;e&&$("#profile_link").text(e)}function createProfile(e){return new Promise(function(t,a){$.ajax({type:"post",url:apiDomainURL+"/profiles",data:e,headers:{Accept:"application/json","Content-Type":"application/vnd.api+json"},dataType:"JSON"}).success(function(e){t(e)}).error=a})}function saveProfile(e){console.log("Saving profile to local storage "+e),localStorage.setItem("profile",JSON.stringify(e.data[0].attributes)),localStorage.setItem("profile_id",JSON.stringify(e.data[0].id)),console.log("retrievedObject: ",JSON.parse(localStorage.getItem("profile"))),loadProfileToForm()}function loadProfileToForm(){var e=$("#profile"),t=JSON.parse(localStorage.getItem("profile")),a=JSON.parse(localStorage.getItem("linked_profile"));null!=t&&(e.find('input[name="firstname"]').val(t.firstname),e.find('input[name="lastname"]').val(t.lastname),e.find('input[name="email"]').val(t.email),setProfileLink()),null!=a&&e.find('input[name="partner_email"]').val(a.email)}function setupPartner(e){getProfile(e).then(function(t){1==t.data.length?(console.log("Partner email found "+t),localStorage.setItem("linked_profile",JSON.stringify(t.data[0].attributes)),localStorage.setItem("linked_profile_id",JSON.stringify(t.data[0].id))):(invitePartner(e),console.log("Invite sent to partner")),window.location="AccountSuccess.html"})["catch"](function(e){console.log("Promise failed "+e),window.location="AccountSuccess.html"})}function getProfile(e){return new Promise(function(t,a){$.ajax({type:"get",url:apiDomainURL+"/profiles?filter[email]="+e,headers:{Accept:"application/json"},dataType:"JSON"}).success(function(e){console.log("JSON success response"+e),t(e)}).error=a})}function getProfileById(e){return new Promise(function(t,a){$.ajax({type:"get",url:apiDomainURL+"/profiles/"+e,headers:{Accept:"application/json"},dataType:"JSON"}).success(function(e){console.log("JSON success response"+e),t(e)}).error=a})}function invitePartner(e){$.ajax({type:"post",url:mailDomainURL+"/invite_partner",data:{invite:{email:e,id:localStorage.getItem("profile_id")}},headers:{Accept:"application/json"},dataType:"JSON"}).success(function(t){console.log("JSON success response",t),toastr.info("Invitation successfully sent to "+e+". <br /> Make sure to revisit this page once your partner registers.","Sent!")}).error(function(e){console.log(e),toastr.error("There was a problem finding the account.")})}function validateFirstStep(){return $(".wizard-card form").validate({rules:{firstname:"required",lastname:"required",email:{required:!0,email:!0}},messages:{firstname:"Please enter your First Name",lastname:"Please enter your Last Name",email:"Please enter a valid email address"}}),$(".wizard-card form").valid()?!0:!1}function validateSecondStep(){return $(".wizard-card form").validate({rules:{},messages:{}}),$(".wizard-card form").valid()?!0:(console.log("invalid"),!1)}function validateThirdStep(){}function readURL(e){if(e.files&&e.files[0]){var t=new FileReader;t.onload=function(e){$("#wizardPicturePreview").attr("src",e.target.result).fadeIn("slow")},t.readAsDataURL(e.files[0])}}var version=1,apiDomainURL="";apiDomainURL="localhost"===window.location.hostname?"http://localhost:3000":"https://frank.treasury.love";var mailDomainURL="";mailDomainURL="localhost"===window.location.hostname?"http://localhost:3001":"https://frank-mail.treasury.love",$(document).ready(function(){loadProfileToForm(),checkForUpgrade();var e=getEmailQueryParam();null!=e&&(console.log("Found email query parameter "+e),getProfile(e).then(function(t){1==t.data.length?(console.log("Saving profile"),saveProfile(t),window.location="AccountSuccess.html"):$("#profile").find('input[name="email"]').val(e)})["catch"](function(e){console.log("Promise failed "+e)})),$("input[name=email]").focusout(function(){var e=$(this).val();null!=e&&handleExistingProfile(e)})}),$("#profile").submit(function(){var e=$(this).find('input[name="firstname"]').val(),t=$(this).find('input[name="lastname"]').val(),a=$(this).find('input[name="email"]').val(),i=$(this).find('input[name="partner_email"]').val(),o='{"data": {"type":"profiles", "attributes":{"firstname":"'+e+'", "lastname":"'+t+'", "email":"'+a+'"}}}';null==JSON.parse(localStorage.getItem("profile"))?createProfile(o).then(function(e){1==e.data.length&&(console.log("Saving profile"),saveProfile(e),setupPartner(i))})["catch"](function(e){console.log("Promise failed "+e)}):setupPartner(i),event.preventDefault()}),function(e){e("a.page-scroll").bind("click",function(t){var a=e(this);e("html, body").stop().animate({scrollTop:e(a.attr("href")).offset().top-50},1250,"easeInOutExpo"),t.preventDefault()}),e("body").scrollspy({target:".navbar-fixed-top",offset:51}),e(".navbar-collapse ul li a").click(function(){e(".navbar-toggle:visible").click()}),e("h1").fitText(1.2,{minFontSize:"35px",maxFontSize:"65px"}),e("#mainNav").affix({offset:{top:100}}),(new WOW).init()}(jQuery),searchVisible=0,transparent=!0,$(document).ready(function(){$('[rel="tooltip"]').tooltip(),$(".wizard-card").bootstrapWizard({tabClass:"nav nav-pills",nextSelector:".btn-next",previousSelector:".btn-previous",onInit:function(e,t,a){var i=t.find("li").length;$width=100/i,$display_width=$(document).width(),$display_width<600&&i>3&&($width=50),t.find("li").css("width",$width+"%")},onNext:function(e,t,a){return 1==a?validateFirstStep():2==a?validateSecondStep():3==a?validateThirdStep():void 0},onTabClick:function(e,t,a){return!1},onTabShow:function(e,t,a){var i=t.find("li").length,o=a+1,n=t.closest(".wizard-card");o>=i?($(n).find(".btn-next").hide(),$(n).find(".btn-finish").show()):($(n).find(".btn-next").show(),$(n).find(".btn-finish").hide())}}),$("#wizard-picture").change(function(){readURL(this)}),$('[data-toggle="wizard-radio"]').click(function(){wizard=$(this).closest(".wizard-card"),wizard.find('[data-toggle="wizard-radio"]').removeClass("active"),$(this).addClass("active"),$(wizard).find('[type="radio"]').removeAttr("checked"),$(this).find('[type="radio"]').attr("checked","true")}),$('[data-toggle="wizard-checkbox"]').click(function(){$(this).hasClass("active")?($(this).removeClass("active"),$(this).find('[type="checkbox"]').removeAttr("checked")):($(this).addClass("active"),$(this).find('[type="checkbox"]').attr("checked","true"))}),$height=$(document).height(),$(".set-full-height").css("height",$height)});