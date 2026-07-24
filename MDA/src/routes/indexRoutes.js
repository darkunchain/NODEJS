const express = require("express");
const router = express.Router();
const readXlsxFile = require("read-excel-file/node");
const IMNuevo = require("../models/IMModel");
const IncidenteNuevo = require("../models/IncidenteModel");
const RequerimientoNuevo = require("../models/RequerimientoModel");
const url = require("url");

////////////// Index Route  //////////////////
router.get("/", async (req, res) => {  
  const listaIM = await IMNuevo.find().sort({ fecha: "desc" });
  const listaIncidente = await IncidenteNuevo.find().sort({ fecha: "desc" });
  const listaRequerimiento = await RequerimientoNuevo.find().sort({
    fecha: "desc"
  });
  var status = "";
  //console.log('nombrecarga: ', nombrecarga.1)
  res.render("index", {    
    listaIM,
    listaIncidente,
    listaRequerimiento,
    status
  });
});

router.post("/", (req, res) => {});

////////////// xlsxtojson Route  //////////////////
router.get("/xlsxtojson/", async (req, res, next) => {
  const { idCarga, fileName, file } = req.query;
  if (idCarga == 1) {
    var sheet = "Reporte IM";
  } else if (idCarga == 2) {
    sheet = "Modificado";
  } else {
    sheet = "Modificado";
  }
  try {
    const rows = await readXlsxFile("./src/archivos/" + file, { sheet });
    const headers = rows[0]
      .map(value => String(value || "").toLowerCase());
    const result = rows.slice(1).map(row => {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = row[index];
      });
      return record;
    });

    const categoria =
      idCarga == 1 ? "IM" : idCarga == 2 ? "Incidentes" : "Requerimientos";
    const Model =
      idCarga == 1
        ? IMNuevo
        : idCarga == 2
          ? IncidenteNuevo
          : RequerimientoNuevo;
    await new Model({ nombre: fileName, contenido: result, categoria }).save();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

////////////// upload index Route  //////////////////

router.get("/upload", function(req, res) {
  const nameCarga = ["IM", "Incidentes", "Requerimientos"];
  res.render("cargar", {
    nameCarga   
  });
});

////////////// upload Route  //////////////////



router.post("/upload", async function(req, res) {
  const sampleFile = req.files.file;
  const { idCarga, fileName } = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  sampleFile.mv("./src/archivos/" + sampleFile.name, function(err) {
    if (err) return res.status(500).send(err);
    console.log("File uploaded!");
    res.redirect(url.format({
        pathname: "/xlsxtojson/",
        query: {
          idCarga,
          fileName,
          file: sampleFile.name
        }})
    );
  });
});

module.exports = router;
