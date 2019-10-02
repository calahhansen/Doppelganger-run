// Get the modal
const modal = document.getElementById("registerModal");

// Get the button that opens the modal
const btn = document.getElementById("registerBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

//login JavaScript
$(document).ready(function() {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailLoginInput = $("input#email-login-input");
  const passwordLoginInput = $("input#password-login-input");

  const registerForm = $("form.signup");
  const emailCreateInput = $("input#email-create-input");
  const passwordCreateInput = $("input#password-create-input");

  registerForm.on("submit", function(event) {
    console.log("registerform");
    event.preventDefault();
    var userData = {
      email: emailCreateInput.val().trim(),
      password: passwordCreateInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailCreateInput.val("");
    passwordCreateInput.val("");
  });

  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    const userData = {
      email: emailLoginInput.val().trim(),
      password: passwordLoginInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailLoginInput.val("");
    passwordLoginInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/home");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function handleLoginErr(err) {
    if (err) throw err;
  }
});
