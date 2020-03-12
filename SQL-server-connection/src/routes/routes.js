const express = require('express');
const router = express.Router();
const mssql = require('mssql');

const querysummary = 'SELECT Assets.AssetID,AssetGroupName As Grupo,IPAddressStr As "Direccion_IP",Assets.MACAddress As "Direccion_MAC",Assets.NBName As "Nombre_de_equipo",Assets.NBWorkGroup As Dominio,HighVulns As "Vuln_Altas",MediumVulns As "Vuln_Medias",LowVulns As "Vuln_Bajas",InfoVulns As "Vuln_Informativas",ScanConfigurationsSnapshot.ConfigurationName As "Nombre_del_analisis",Hosts.JobID FROM dbo.Assets INNER JOIN dbo.AssetGroups ON AssetGroups.AssetGroupID= Assets.AssetGroupID INNER JOIN dbo.Hosts ON Assets.HostID=Hosts.HostID INNER JOIN dbo.ScanConfigurationsSnapshot ON ScanConfigurationsSnapshot.JobID=Hosts.JobID WHERE Hosts.JobID IN (1,2) ORDER BY AssetGroupName ASC, IPAddressStr';

const queryespecifico = 'SELECT IPAddressStr As "Direccion_IP",Assets.NBName As "Nombre_de_Host",RiskLevelDescription As "Riesgo",VulnRiskMap.Risk,CVE,Name As "Nombre",Vuln.Description As "Descripcion_de_la_Vulnerabilidad",Recommendation As "Recomendacion",ScanConfigurationsSnapshot.ConfigurationName As "Nombre_del_Analisis",Hosts.JobID FROM dbo.Assets INNER JOIN dbo.Hosts ON Assets.HostID=Hosts.HostID INNER JOIN dbo.ScanConfigurationsSnapshot ON ScanConfigurationsSnapshot.JobID=Hosts.JobID INNER JOIN dbo.VulnsFound ON VulnsFound.HostID=Hosts.HostID INNER JOIN Content.Vuln ON Vuln.FaultlineID=VulnsFound.FaultlineID INNER JOIN Content.VulnRiskMap ON Vuln.Risk=VulnRiskMap.Risk WHERE Hosts.JobID IN (1,2) ORDER BY IPAddressStr,VulnRiskMap.Risk DESC ';

const queryjobs = 'SELECT dbo.Jobs.JobID,ScanConfigurationsSnapshot.ConfigurationName AS nombre_analisis FROM faultline.dbo.Jobs INNER JOIN faultline.dbo.ScanConfigurationsSnapshot ON dbo.ScanConfigurationsSnapshot.JobID = dbo.Jobs.JobID';

var resumen = {};
var especifico = {};
var jobs = {};
router.get('/', (req, res) => {
    var request = new mssql.Request();
    request.query(querysummary, function (err, result) {
        if (err) console.log(err);        
        resumen = result.recordset;                            
    });
    request.query(queryespecifico, function (err, result) {
        if (err) console.log(err); 
        especifico = result.recordset;
    });
    request.query(queryjobs, function (err, result) {
        if (err) console.log(err); 
        jobs = result.recordset;
    });
    res.render('index',{resumen,especifico,jobs})
    
});



router.get('/1', (req, res) => {
    var request = new mssql.Request();
    request.query(querysummary, function (err, result) {
        if (err) console.log(err);
        resumen = result.recordset;
        res.send(resumen)
    });
});

router.get('/2', (req, res) => {
    var request = new mssql.Request();
    request.query(queryespecifico, function (err, result) {
        if (err) console.log(err);
        especifico = result.recordset;
        res.send(especifico)
    });
});
    

module.exports = router;