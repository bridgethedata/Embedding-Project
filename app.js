console.log("Hey, I love B2S");

// let viz = new tableau.Viz(placeholderDiv, url, options);

let viz;

// Creating a variable to store the tableau viz
let placeholderDiv = document.getElementById("tableauViz");

//createvariable to store URL
let url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia?:language=en-US&:display_count=n&:origin=viz_share_link";

//Create variable to give viz options
let options = {
  device: "desktop",
  height: "400px",
  width: "1100px",
};

function initViz() {
  console.log("Viz is ready");
  viz = new tableau.Viz(placeholderDiv, url, options);
}

//listen to the content being loaded, when finished, load the viz

document.addEventListener("DOMContentLoaded", initViz);

// Find out buttons in the html file
let exportpdfbutton = document.getElementById("exportPDF");

// Listen for a click
exportpdfbutton.addEventListener("click", exportpdffunction);

// Function when a button is clicked
function exportpdffunction() {
  viz.showExportPDFDialog();
}

// Find out buttons in the html file
let exportpptbutton = document.getElementById("exportPPT");

let filterValuesButton = document.getElementById("FilterButton");

// Listen for a click
exportpptbutton.addEventListener("click", exportpptfunction);

filterValuesButton.addEventListener("click", getRangeValues);

// Function when a button is clicked
function exportpptfunction() {
  viz.showExportPowerPointDialog();
}

//Get range value
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  const workbook = viz.getWorkbook();
  console.log(workbook);

  let activesheet = workbook.getActiveSheet();
  let sheets = activesheet.getWorksheets();

  let sheetToFilter = sheets[0];
  console.log(sheetToFilter);

  //do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue }, { max: maxValue })
    .then(alert("viz filtered"));
}

//Create FilterValuesFunction
