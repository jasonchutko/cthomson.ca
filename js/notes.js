$(document).ready(function() {
  $.ajax({
    url: 'http://noteface.cthomson.ca/documents.json',
    dataType: 'json',
    success: function(documents) {
      $("#loading").hide();
      for (doc_name in documents) {
        if (documents.hasOwnProperty(doc_name)) {
          var $tpl = $('li#template').clone().attr('id', null);
          var date = new Date(documents[doc_name].timestamp);
          $tpl.find('h2').text(documents[doc_name].course.code);
          $tpl.find('h3').text(documents[doc_name].course.name);
          $tpl.find('.time').text(moment(date).calendar());
          $tpl.find('a').attr('href', 'http://noteface.cthomson.ca/dl/latest/' + doc_name + '.pdf');

          if ($("#" + doc_name)) {
            $("#" + doc_name).append($tpl.children())
          } else {
            $tpl.attr('id', doc_name);
          }

          $("#" + doc_name).addClass("populated");
        }
      }

      if (document.location.hash) {
        $(document.location.hash).addClass('animate');
      }
    }
  })
});