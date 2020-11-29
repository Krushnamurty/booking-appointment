/*window.onload=initAll;

var saveBook;
var autoComplete_var;
function initAll(){
        saveBook=document.getElementById('butt1');
        saveBook.onclick=saveBookF;*/
   $(document).ready(function(){
        $("#searchBox").keyup(function(){
              autoComplete($(this).val());
        });

        $("#Go").click(function(){
             information($("#searchBox").val());
        });

        $("#Book_Appointment").click(function(){
             Book_Appointment();

        });

        $("#Health_Library").click(function(){
             Health_Library();

        });

        $("#Book_Health_Check").click(function(){
             Book_Health_Check();
        });

        /*$("#Book_Health_Check_submit").click(function(){
             var state_name=$("#State_Name").val();
             alert(state_name);
             var hospital_name=$("#Hospital_Name").val();
             alert(hospital_name);
             var enter_name=$("#Enter_Name").val();
             alert(enter_name);
             var phone_no=$("#Phone_No").val();
             alert(phone_no);
             var enter_email=$("#Enter_Email").val();
             alert(enter_email)
             /*Book_Health_Check_submit();
        });*/

   });








function saveBookF(){
         var x='ll';
         var y='name';
         var url='/save_book?no='+x+'&y='+y;
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
                 var a=xhttp.response;
                 var obj=JSON.parse(a)
                 var i;
                 var status=obj.status
                 var text=''
                 for(i=0;i<status.length;i++)
                 {
                    text +=status[i]+"<br>"
                 }
                 text1="<ul><li>tttt</li><li>hhhhhh</li><li>uuuu</li></ul>"
                 $('#lll').html(text1)

           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();
}
function autoComplete(data){
       if(data !='')
       {
         var letter=data;
         var url='/autocomplete?letter='+letter;
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
                 var a=xhttp.response;
                 var obj=JSON.parse(a)
                 var info=obj.text;
                 var text='<ul class="list-unstyle">';
                 for(var i=0;i<info.length;i++)
                 {
                    text +="<li>"+info[i]+"</li>"
                 }
                 text+="</ul>"
                 $('#info').fadeIn();
                 $('#info').html(text);

           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();
         $(document).on('click','li',function(){
             $("#searchBox").val($(this).text());
             $("#info").fadeOut();
         });

       }
       else
       {
           $("#info").empty();
       }
}

function information(data)
{
    if(data !='')
      {
         var letter=data;
         var url='/information?data='+letter;
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
                 var a=xhttp.response;
                 var obj=JSON.parse(a)
                 var info=obj.doctor;
                 $('#doctors').html(info);




           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();
         $(document).on('click','button.book',function(){
                var data=$(this).attr('id');
                DaysSeries(data);
         });
      }

    else
     {}
}


function DaysSeries(data)
{
     if(data !='')
      {
         var letter=data;
         var url='/days_series?data='+letter;
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
                 var a=xhttp.response;
                 var obj=JSON.parse(a)
                 var info=obj.id;
                 var text=obj.text;
                 var f="#days"+info
                  $().html(' ');
                 $(f).html(text);


           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();

         $(document).on('click','button.days',function(){
                var data=$(this).attr('id');
                TimesSeries(data)
         });
      }

    else
     {}
}


function TimesSeries(data)
{
         if(data !='')
      {
         var letter=data;
         var url='/times_series?data='+letter;
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
                 var a=xhttp.response;
                 var obj=JSON.parse(a)
                 var info=obj.id;
                 var text=obj.text;
                 var f="#time_series"+info;
                 $(f).html(text);


           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();

         $(document).on('click','button.hour',function(){
                var data=$(this).attr('id');
                UserForm(data);
         });
      }

    else
     {}
}

function UserForm(data)
{
         if(data !='')
      {
         var letter=data;
         var url='/user_form?data='+letter;
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
                 var a=xhttp.response;
                 var obj=JSON.parse(a)
                 var text=obj.text;
                 $("#information").html(' ');
                 $("#information").html(text);

           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();

         $(document).on('click','button.cancel',function(){
                Home();

         });
         $(document).on('click','button.book',function(){
              var Patient_Name= $('#Patient_Name').val();
              /*alert(Patient_Name);*/
              var Phone_No= $('#Phone_No').val();
              /* alert(Phone_No);*/
              var Doctor_Name= $('#Doctor_Name').val();
              /*alert(Doctor_Name);*/
              var Appointment_Date= $('#Appointment_Date').val();
              /*alert(Appointment_Date);*/
              var Appointment_Time=$('#Appointment_Time').val();
              /*alert(Appointment_Time);*/
              var Speciality= $('#Speciality').val();
              /*alert(Speciality);*/
             Book(Patient_Name,Phone_No,Doctor_Name,Appointment_Date,Appointment_Time,Speciality);

         });
      }

    else
     {}
}

function Home()
{
        var url='/home?';
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){


           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();
}

function Book(Patient_Name,Phone_No,Doctor_Name,Appointment_Date,Appointment_Time,Speciality)
{
         var n=Phone_No.toString();
         var url='/book?Patient_Name='+Patient_Name+'&Phone_No='+n+'&Doctor_Name='+Doctor_Name+'&Appointment_Date='+Appointment_Date+'&Appointment_Time='+Appointment_Time+'&Speciality='+Speciality;
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
                 var a=xhttp.response;
                 var obj=JSON.parse(a)
                 $('#doctors').html(' ');
                 if (obj.text=='success')
                 {
                      $('#success').html('<h>You registation is '+obj.text+'!!!</h>')
                 }
                 else
                 {
                      $('#unsuccess').html('<h>You registation is '+obj.text+'!!!</h>')
                 }





           }
         }
         xhttp.open("GET",url,false);
         xhttp.send();
}

function Book_Appointment()
{
        var url='/book_appointment?';
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){

               var a=xhttp.response;
               var obj=JSON.parse(a);
               $('#doctors').html(' ');

           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();
}

/*function Book_Appointment()
{
        var url='/home?';
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){


           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();

}*/


function Book_Health_Check()
{
        var url='/book_health_check?';
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
               var a=xhttp.response;
                 $('#doctors').html(' ');
                 var obj=JSON.parse(a);
                 $('#doctors').html(obj.text);

           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();

         $(document).on('focus','input.Cities',function(){
             var data=$(this).attr('id');
                  City_Name_List(data);
             });

         $(document).on('focus','input.Hospitals',function(){
             var data=$(this).attr('id');
             var city=$("#City_Name").val()
                  if (city !='')
                  {
                      Hospital_Name_List(data,city);
                  }
                  else
                  {

                  }
             });

             /*$(document).on('blur','input.Cities',function(){
                  $("#City_Name_List").fadeOut();
                  $('#City_Name_List').html('');
             });
             $(document).on('blur','input.Hospitals',function(){
                  $("#Hospital_Name_List").fadeOut();
                  $('#Hospital_Name_List').html('');
             });*/

         $(document).on('click','#Book_Health_Check_submit',function(){
             var city_name=$("#City_Name").val();
             var hospital_name=$("#Hospital_Name").val();
             var enter_name=$("#Enter_Name").val();
             var phone_no=$("#Phone_No").val();
             var enter_email=$("#Enter_Email").val();


             Book_Health_Check_Submit(state_name,hospital_name,enter_name,enter_email,phone_no);
         });


}


function City_Name_List(data){
       if(data !='')
       {
         var letter=data;
         var url='/city_name_list?letter='+letter;
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
                 var a=xhttp.response;
                 var obj=JSON.parse(a)
                 var info=obj.text
                 var text='<ul class="city_name_list">';
                 for(var i=0;i<info.length;i++)
                 {
                    text +="<li>"+info[i]+"</li>"
                 }
                 text+="</ul>"
                 $('#City_Name_List').fadeIn();
                 $('#City_Name_List').html(text);


           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();
         $(document).on('click','ul.city_name_list li',function(){
             $("#City_Name").val($(this).text());
             $("#City_Name_List").fadeOut();
         });

       }
       else
       {
           $("#City_Name_List").empty();
       }
}


function Hospital_Name_List(data,city){
       if(data !='')
       {
         var letter=data;
         var url='/hospital_name_list?letter='+letter+'&city='+city;
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
                 var a=xhttp.response;
                 var obj=JSON.parse(a)
                 var info=obj.text;
                 var text='<ul class="hospital_name_list">';
                 for(var i=0;i<info.length;i++)
                 {
                    text +="<li>"+info[i]+"</li>"
                 }
                 text+="</ul>"
                 $('#Hospital_Name_List').fadeIn();
                 $('#Hospital_Name_List').html(text);


           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();
        $(document).on('click','ul.hospital_name_list li',function(){
             $("#Hospital_Name").val($(this).text());
             $("#Hospital_Name_List").fadeOut();
         });

       }
       else
       {
           $("#Hospital_Name_List").empty();
       }
}


function Book_Health_Check_Submit(state_name,hospital_name,enter_name,enter_email,phone_no)
{
         var n=phone_no.toString();
         var url='/book_health_check_submit?state_name='+state_name+'&hospital_name='+hospital_name+'&enter_name='+enter_name+'&enter_email='+enter_email+'&phone_no='+n;
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
                 var a=xhttp.response;
                 $('doctors').html(' ');
                 var obj=JSON.parse(a)
                 if (obj.text=='success')
                 {
                      $('#success').html('<h>You registation is '+obj.text+'!!!</h>')
                 }
                 else
                 {
                      $('#unsuccess').html('<h>You registation is '+obj.text+'!!!</h>')
                 }

           }
         }
         xhttp.open("GET",url,false);
         xhttp.send();
}


function Health_Library()
{
        var url='/health_library?';
         var xhttp=new XMLHttpRequest();
         xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){

           var a=xhttp.response;
                 $('#doctors').html(' ');
                 var obj=JSON.parse(a)
                 $('#doctors').html(obj.text);


           }
         }
         xhttp.open("GET",url,true);
         xhttp.send();
}






