$(".modal").on("shown.bs.modal", function()  {
   var urlReplace = "#" + $(this).attr('id'); 
   history.pushState(null, null, urlReplace); 
 });

 // This code gets executed when the back button is clicked, hide any/open modals.
 $(window).on('popstate', function() { 
   $(".modal").modal('hide');
 });
