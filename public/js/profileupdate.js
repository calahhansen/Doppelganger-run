/* eslint-disable no-undef */
$("#submitBtn").on("click", function() {
  var update = {};

  update.firstName = $("#firstName")
    .val()
    .trim();
  update.lastName = $("#lastName")
    .val()
    .trim();
  update.email = $("#inputEmail")
    .val()
    .trim();
  update.address = $("#inputAddress")
    .val()
    .trim();
  update.city = $("#inputCity")
    .val()
    .trim();
  update.state = $("#inputState")
    .val()
    .trim();
  update.skill = $("#inputSkill")
    .val()
    .trim();
  update.task = $("#inputTask")
    .val()
    .trim();

  $.ajax({
    url: "/api/profile",
    method: "POST",
    data: update
  }).then(function(response) {
    window.location.reload();
  });
});
