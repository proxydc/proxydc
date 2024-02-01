import urldc from "../_helpers/urllist.js";
import axios from "axios";

class FormData {
    /*static get(id) {

        return http.get(`/dc/${id}`);
    }

    static getDCURL(id) {
        return http + `dc/${id}`;
    }

    static getDC(dcid) {
        try {
            const url = `dc/${dcid}`;
            alert("url: " + url);
            http.get(url).then(res => {
                console.log(res.data)
                return res.data
            }).catch(function (err) {
                return err
            });
        }
        catch (err) {
            throw err;
        }
    }*/
    static save(id, dc, document, status) {
        try {
            alert("id: "+id+ " dc: "+dc)
            let generatedDocumentObj = this.getDocumentObject(dc, document);
            this.updateDC(id, generatedDocumentObj, status);
            alert("Updated document successfully!");
        }
        catch (err) {
            throw err;
        }

    }

    static async updateDC(id, generatedDoc, status) {
        try {
            const url = urldc.getDcUrl(id);//`dc/${id}`;
            let result = await axios.put(url, {
                dc_status: status,
                document: generatedDoc,
            });
            console.warn(result);
            if (result.status == 200) {
                alert(result.data);
            }
        }
        catch (err) {
            throw err;
        }
    }

    static getDocumentObject(dc, document) {

        /* Comp fonctionnelles */
       // alert("iam in functional");
        var domNodes = document.querySelectorAll("#fonct input");
        var nodes = [...domNodes];
        dc.functionalAbilities = nodes.map((x) => x.value).filter(function (i) { return i.trim() != ""; });
        console.log("functional: " + dc.functionalAbilities);

        /* Comp techniques */
        var domNodes = document.querySelectorAll("#techn input");
        var nodes = [...domNodes];
        dc.technicalAbilities = nodes.map((x) => x.value).filter(function (i) { return i.trim() != ""; });
        console.log("technical: " + dc.technicalAbilities);

        /* Diplomes */
        var certifications = [];
        var domNodes = document.querySelectorAll("#certs div.row");
        var nodes = [...domNodes];
        //alert("je suis la nodes length: "+ nodes.length);
        for (let i = 0; i < nodes.length; i++) {
            var year = nodes[i].childNodes[0].childNodes[0].value;
            var label = nodes[i].childNodes[1].childNodes[0].value;
            if (year.trim() != "" && label.trim() != "") {
                certifications.push({ year: year, title: label })
            }
        }
        dc.certifications = certifications;
        //console.log("certifications: " + dc.certifications[0].year);

        /* Langues */
        var domNodes = document.querySelectorAll("#langs input");
        var nodes = [...domNodes];
        dc.languages = nodes.map((x) => x.value).filter(function (i) { return i.trim() != ""; });

        console.log("languages: " + dc.languages);

        /* XP */
        var experiencesPro = [];
        var domNodes = document.querySelectorAll("#xps .xp");
        var allNodes = [...domNodes]; // converts a Node list to an array
        var nodes = allNodes.filter(function (i) { return i.id == "" }) // remove ghost template which have ID

        for (let i = 0; i < nodes.length; i++) {
            var startValue = nodes[i].childNodes[0].childNodes[0].childNodes[1].value;
            var endValue = nodes[i].childNodes[0].childNodes[1].childNodes[1].value;
            var titleValue = nodes[i].childNodes[0].childNodes[2].childNodes[1].value;
            var companyValue = nodes[i].childNodes[0].childNodes[3].childNodes[1].value;
            var contextValue = nodes[i].childNodes[1].childNodes[0].childNodes[1].value;
            var technicalenvValue = nodes[i].childNodes[2].childNodes[1].childNodes[1].value;

            var taskList = nodes[i].childNodes[2].childNodes[0].childNodes[1].childNodes;
            var taskValues = [];
            for (let t = 0; t < taskList.length; t++) {
                if (taskList[t].nodeName == "INPUT" && taskList[t].value) {
                    taskValues.push(taskList[t].value);
                }
            }

            var currentExperience = {
                start: startValue,
                end: endValue,
                title: titleValue,
                company: companyValue,
                context: contextValue,
                technical_env: technicalenvValue,
                tasks: taskValues
            };
            if(currentExperience.start!='')
            {
                experiencesPro.push(currentExperience)
            }
        }
        dc.experiences = experiencesPro;
        console.log("document experiences values: " + dc.experiences[0]?.start);
        alert("document experiences values: " + dc.experiences[0]?.end);
        /* Projects perso */
        var personalProjects = [];
        var domNodes = document.querySelectorAll("#projects .project");
        var allNodes = [...domNodes];
        var nodes = allNodes.filter(function (i) { return i.id == "" }) // remove ghost template which have ID

        for (let i = 0; i < nodes.length; i++) {
            var periodValue = nodes[i].childNodes[0].childNodes[0].childNodes[1].value;
            var titleValue = nodes[i].childNodes[0].childNodes[1].childNodes[1].value;
            var contextValue = nodes[i].childNodes[1].childNodes[0].childNodes[1].value;
            var technicalenvValue = nodes[i].childNodes[2].childNodes[1].childNodes[1].value;

            var taskList = nodes[i].childNodes[2].childNodes[0].childNodes[1].childNodes;
            var taskValues = [];
            for (let t = 0; t < taskList.length; t++) {
                if (taskList[t].nodeName == "INPUT" && taskList[t].value) {
                    taskValues.push(taskList[t].value);
                }
            }

            var currentProject = {
                period: periodValue,
                title: titleValue,
                context: contextValue,
                technical_env: technicalenvValue,
                tasks: taskValues
            };
            if(currentProject.period!='')
            {
                personalProjects.push(currentProject)
            }
            
            console.log("document curr projects values: " + currentProject.period);
        }

        dc.projects = personalProjects;
        console.log("document projects values: " + dc.projects[0]?.period);
        //alert("document projects values: " + dc.projects[0]?.title);
        return dc;
    }
}
export default FormData;
