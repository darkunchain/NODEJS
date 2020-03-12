const express = require("express");
const router = express.Router();
const IMNuevo = require("../models/IMModel");
const departamentoNuevo = require("../models/depModel");
const IncidenteNuevo = require("../models/IncidenteModel");
const RequerimientoNuevo = require("../models/RequerimientoModel");
const fs  = require("fs");

var seleccion = [], elemento = {}

router.get("/nuevo", async (req, res) => {});

//////////////////  Borrar registro de base de datos  //////////////////
router.get("/borrar/:id/:categoria", async (req, res) => {
  const { id, categoria } = req.params;
  if (categoria == "IM") {
    await IMNuevo.deleteOne({ _id: id });
  } else if (categoria == "Incidentes") {
    await IncidenteNuevo.deleteOne({ _id: id });
  } else {
    await RequerimientoNuevo.deleteOne({ _id: id });
  }
  res.redirect("/");
});

//////////////////  Seleccionar y usar registro de base de datos  //////////////////
router.get("/usar/:id/:categoria", async (req, res) => {
  const { id, categoria } = req.params;
  if (categoria == "IM") {
    const datoIM = await IMNuevo.findById(id);
    datoIM.status = !datoIM.status;
    await datoIM.save();    
  } else if (categoria == "Incidentes") {
    const datoIncidente = await IncidenteNuevo.findById(id);
    datoIncidente.status = !datoIncidente.status;
	await datoIncidente.save();    
  } else {
    const datoRequerimiento = await RequerimientoNuevo.findById(id);
    datoRequerimiento.status = !datoRequerimiento.status;
    await datoRequerimiento.save();    
  }
  res.redirect('/')
});


router.get("/seleccionar", async (req, res) => {
	seleccion.length = 0
	await IMNuevo.find({ status: true }, function (err, Doc) {
		if (err) {
			res.json(err);
		} else if (Doc.length != 1) {
			console.log('debe seleccionar solo un archivo')			
		} else {
			seleccion[0] = Doc[0]._id			 		
		}
	})

	if(seleccion.length != 1){
		console.log('debe seleccionar solo un archivo')
	}else{
		await IncidenteNuevo.find({ status: true }, function (err, Doc) {
			if (err) {
				res.json(err);
			} else if (Doc.length != 1) {
				console.log('debe seleccionar solo un archivo')	
			} else {
				seleccion[1] = Doc[0]._id			
			}
		})
		if(seleccion.length != 2){
			console.log('debe seleccionar solo un archivo')

		}else{
			await RequerimientoNuevo.find({ status: true }, function (err, Doc) {
				if (err) {
					res.json(err);
				} else if (Doc.length != 1) {
					console.log('debe seleccionar solo un archivo')			
				} else {
					seleccion[2] = Doc[0]._id							
				}
			})
		}
	}	
	console.log('seleccion.lenght: ', seleccion.length)	
	elemento = {"idIM":seleccion[0],"idInc":seleccion[1],"idReq":seleccion[2]}	
	if(seleccion.length == 3){
		res.redirect('/graficar/?idIM='+ seleccion[0]+'&idInc='+seleccion[1]+'&idReq='+seleccion[2]);
	}else{
		res.redirect('/')
	}
	

});






/////////////////////////////////////////////////////////////////////
//////////////// Inclusion manual de archivos  //////////////////////
////////////////////////////////////////////////////////////////////
router.get("/manual", async (req, res) => {
  var ruta = "./src/archivos/deptos.json";
  var idCarga1 = 5;
  var fileName1 = "Departamentos";
  leeArchivo(ruta, idCarga1, fileName1);

  function leeArchivo(file, idCarga1, fileName1) {
    console.time("leeArchivo: ");
    fs.readFile(file, "utf8", async function(err, data) {
      if (err) throw err;
      try {
        obj = await JSON.parse(data);        
        var categoria = "";
        if (idCarga1 == 1) {          
          categoria = "IM";
          const IMNewFile = new IMNuevo({
            nombre: fileName1,
            contenido: obj,
            categoria
          });
          await IMNewFile.save();
        } else if (idCarga1 == 2) {          
          categoria = "Incidentes";
          const IncidenteNewFile = new IncidenteNuevo({
            nombre: fileName1,
            contenido: obj,
            categoria
          });
          await IncidenteNewFile.save();
        } else if(idCarga1 == 5){
          categoria = "otra";
          const otraNewFile = new departamentoNuevo({
           obj
          
          });
          await otraNewFile.save();
        } else {          
          categoria = "Requerimientos";
          const RequerimientoNewFile = new RequerimientoNuevo({
            nombre: fileName1,
            contenido: obj,
            categoria
          });
          await RequerimientoNewFile.save();
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
  res.redirect("/");
});

module.exports = router;
