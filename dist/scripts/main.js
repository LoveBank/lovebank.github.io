"use strict";console.log("'Hello 'Hello!");var apiDomainURL="";if(apiDomainURL="localhost"===window.location.hostname?"http://localhost:3000":"https://frank.treasury.love",$(function(){var e=localStorage.getItem("linked_profile_id");null===e?$("#partner_form").show():$("#partner_form").hide()}),localStorage.getItem("profile_firstname")){var profile_firstname=localStorage.getItem("profile_firstname");console.log("Found profile firstname from storage "+profile_firstname),$("#profile-name").text(profile_firstname),$("#profile").hide()}null===localStorage.getItem("profile_id")&&(console.log("No profile found. redireting to welcome"),window.location="welcome.html"),$("input[type=radio][name=received]").change(function(){"received"==this.value?$("#rating-element").show():"given"==this.value&&$("#rating-element").hide()}),$("#love-bank").submit(function(){var e=$("#rating").val(),t=JSON.stringify($(this).find("textarea").val()),o=localStorage.getItem("profile_id"),a=(localStorage.getItem("profile_firstname"),'{ "data":{ "type": "love-banks","relationships": {"profile":{ "data":{ "type": "profiles", "id": "'+o+'" }}},"attributes": {"note":'+t+', "rating":'+e+"}}}");console.log(a),$.ajax({type:"POST",url:apiDomainURL+$(this).attr("action"),data:a,headers:{Accept:"application/json","Content-Type":"application/vnd.api+json"},dataType:"JSON"}).success(function(e){console.log("JSON success response",e),toastr.success("Successfully saved entry"),$("#love-bank").trigger("reset")}).error(function(e){console.log(e),toastr.error("There was a problem.")}),event.preventDefault()}),$("#mood").submit(function(){var e=$("#rating").val(),t=JSON.stringify($(this).find("textarea").val()),o=localStorage.getItem("profile_id"),a=(localStorage.getItem("profile_firstname"),'{ "data":{ "type": "moods","relationships": {"profile":{ "data":{ "type": "profiles", "id": "'+o+'" }}},"attributes": {"note":'+t+', "rating":'+e+"}}}");console.log(a),$.ajax({type:$(this).attr("method"),url:apiDomainURL+$(this).attr("action"),data:a,headers:{Accept:"application/json","Content-Type":"application/vnd.api+json"},dataType:"JSON"}).success(function(e){console.log("JSON success response",e),toastr.success("Successfully saved entry"),$("#mood").trigger("reset")}).error(function(e){console.log(e),toastr.error("There was a problem.")}),event.preventDefault()}),$("#entry").submit(function(){var e=$("#rating").val(),t=JSON.stringify($(this).find("textarea").val()),o=localStorage.getItem("profile_id"),a=(localStorage.getItem("profile_firstname"),localStorage.getItem("linked_profile_id")),r='{ "data":{ "type": "entries","relationships": {"profile":{ "data":{ "type": "profiles", "id": "'+o+'" }}},"attributes": {"received":"true","private":"false","note":'+t+', "rating":'+e+',"linked-profile-id":'+a+"}}}";console.log(r),$.ajax({type:$(this).attr("method"),url:apiDomainURL+$(this).attr("action"),data:r,headers:{Accept:"application/json","Content-Type":"application/vnd.api+json"},dataType:"JSON"}).success(function(e){console.log("JSON success response",e),toastr.success("Successfully saved entry"),$("#entry").trigger("reset")}).error(function(e){console.log(e),toastr.error("There was a problem.")}),event.preventDefault()}),$("#linked-profile-form").submit(function(){var e=$(this).find('input[name="email"]').val();$.ajax({type:$(this).attr("method"),url:apiDomainURL+$(this).attr("action")+e,headers:{Accept:"application/json"},dataType:"JSON"}).success(function(t){if(console.log("JSON success response",t),1==t.data.length){var o=t.data[0].id,a=t.data[0].attributes.email;$("#partner_form").hide(),localStorage.setItem("linked_profile_id",o),localStorage.setItem("linked_profile_email",a),toastr.success("Profile linked to "+a,"Success!")}else invitePartner(e),$("#linked-profile-form").trigger("reset")}).error(function(e){console.log(e),toastr.error("There was a problem linking to the account.")}),event.preventDefault()});