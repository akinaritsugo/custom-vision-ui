var formatProbability = function (probability) {
  var num = probability * 100;
  return num.toFixed(2) + "%";
};

var drawResults = function (predictions) {
  var tr, th1, th2, td1, td2;
  var table = $("#results");

  // ヘッダー作成
  tr = document.createElement("tr");
  th1 = document.createElement("th");
  th1.appendChild(document.createTextNode("tag name"));
  th2 = document.createElement("th");
  th2.appendChild(document.createTextNode("tag name"));
  tr.appendChild(th1);
  tr.appendChild(th2);
  table.append(tr);

  // データ作成
  for (let item of predictions) {
    tr = document.createElement("tr");
    td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(item.tagName));
    td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(formatProbability(item.probability)));
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.append(tr);
  }
};

var frmPredictionsTest_onsubmit = function (event) {
  var i, formData;
  var iterationName = encodeURI($("#trainings").val() || "");
  var files = document.getElementById("file1").files;

  // アップロード用のデータを生成
  formData = new FormData();
  for (i = files.length; i--;) {
    formData.append('files', files[i]);
  }

  // ファイルアップロードの実行
  $.ajax({
    url: `/api/predictions/${iterationName}`,
    method: 'POST',
    processData: false,
    contentType: false,
    data: formData
  }).done(function (data, textStatus, jqXHR) {
    // $('#msg').append(JSON.stringify(data));
    drawResults(data);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    $('#msg').append(textStatus);
  });

  // 元の結果を削除
  $("#results").empty();
};

var document_onready = function (event) {
  $("#frmPredictionsTest").on("submit", frmPredictionsTest_onsubmit).on("submit", false);
};

$(document).ready(document_onready);
