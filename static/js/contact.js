function envoyer_message(event){

    alert('Your message has been sent! ❤');


    document.getElementById("myForm").addEventListener("submit", function(event) {
      event.preventDefault(); 

      var nom = document.getElementsByName("name")[0].value;
      var email = document.getElementsByName("email")[0].value;
      var message = document.getElementsByName("message")[0].value;

      document.getElementsByName("name")[0].value = "";
      document.getElementsByName("email")[0].value = "";
      document.getElementsByName("message")[0].value = "";

    });
}