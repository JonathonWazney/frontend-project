// $("input").focus(function () {
//   $(this).css("background", "cyan")
// });
// $("input").blur(function () {
//   $(this).css("background", "white")
// });

var btn = $("button");

btn.on("click", (e) => {
    e.preventDefault()
  if (!$(".container")) {
    makelist()
  } else {
   $(".container").remove()
     makelist()
   
  }

});


function makelist() {
  var input = $("input").val()
  $.get(`https://api.openbrewerydb.org/breweries/search?query=${input}`,
    function (data) {
      console.log(data)
      data = data.sort((a, b) => {
        if (a.city.toLowerCase() < b.city.toLowerCase()) return -1
        if (a.city.toLowerCase() > b.city.toLowerCase()) return 1
        return 0
      })
      data.forEach((element) => {
        console.log(element)

        let container =  $(`<div class='container' id='${element.street}'></div>`)
        $(container).appendTo("body")

        let title = $(`<h2 class='title'>${element.name}</h2>`)
        $(title).appendTo(container)

        let state = $(`<div class="state">${element.state}</div>`)
        $(state).appendTo(container)

        let city = $(`<div class="city">${element.city}</div>`)
        $(city).appendTo(container)

        let zip = $(`<div class="zip">Postal code: ${element.postal_code}</div>`)
        $(zip).appendTo(container)

        let phone = $(`<div class="phone">Call Us #${element.phone}</div>`)
        $(phone).appendTo(container)

        let type = `<div class="type">Type of brew: <span>${element.brewery_type}</span</div>`
        $(type).appendTo(container)

        if (element.street !== null) {
          let street = `<div class="street">Address: ${element.street}</div>`
          $(street).appendTo(container)
        } else {
          $(`#${element.street}`).remove()
        }
        if (element.website_url !== null) {
          let link = `<a class='link' href=${element.website_url} target="_blank">Link</a>`
          $(link).appendTo(container)
        } else {
          let link = '<a class="link"> No link available.</a>'
          $(link).appendTo(container)
        }
      });
    }
  )
}
