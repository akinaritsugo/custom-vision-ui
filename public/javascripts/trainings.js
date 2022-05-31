var createFormData = function (form) {
  var data = {};
  var inputs = $(form).find("input");
  for (let elm of inputs) {
    let $elm = $(elm);
    data[$elm.attr("name")] = $elm.val();
  }
  return data;
};

var frmIterationUnpublish_onsubmit = function (event) {
  var data = createFormData(this);
  $.ajax({
    method: "DELETE",
    url: `/api/predictions/${data.id}`,
    data,
    success: (data, textStatus, jqXHR) => {
      window.location.reload();
    },
    error: (jqXHR, textStatus, errorThrown) => {
    },
    complete: (jqXHR, textStatus) => {
      alert(textStatus);
    }
  });
};

var frmIterationPublish_onsubmit = function (event) {
  $.ajax({
    method: "POST",
    url: "/api/predictions",
    data: createFormData(this),
    success: (data, textStatus, jqXHR) => {
      window.location.reload();
    },
    error: (jqXHR, textStatus, errorThrown) => {
    },
    complete: (jqXHR, textStatus) => {
      alert(textStatus);
    }
  });
};

var frmIterationDelete_onclick = function (event) {
  var data = createFormData(this);
  $.ajax({
    method: "DELETE",
    url: `/api/iterations/${data.id}`,
    success: (data, textStatus, jqXHR) => {
      window.location.reload();
    },
    error: (jqXHR, textStatus, errorThrown) => {
    },
    complete: (jqXHR, textStatus) => {
      alert(textStatus);
    }
  });
};

var btnIterationExecute_onclick = function (event) {
  $.ajax({
    method: "POST",
    url: "/api/iterations/",
    // url: "//localhost:8080/api/iteration/",
    success: (data, textStatus, jqXHR) => {
      window.location.reload();
    },
    error: (jqXHR, textStatus, errorThrown) => {
    },
    complete: (jqXHR, textStatus) => {
      alert(textStatus);
    }
  });
};

var document_onready = function (event) {
  $("#btnIterationExecute").on("click", btnIterationExecute_onclick);
  $("form[name='frmIterationUnpublish']").on("submit", frmIterationUnpublish_onsubmit).on("submit", false);
  $("form[name='frmIterationPublish']").on("submit", frmIterationPublish_onsubmit).on("submit", false);
  $("form[name='frmIterationDelete']").on("submit", frmIterationDelete_onclick).on("submit", false);
};

$(document).ready(document_onready);
