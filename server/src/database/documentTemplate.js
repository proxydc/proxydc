
//const getDocumentTemplate = '{"technicalAbilities": [], "functionalAbilities": [], "languages": [], "certifications": [], "bref": "", "experiences": [], "projects": [], "skills": { "environments": "", "languages": "", "databases": "", "tools": "", "systems": "" }}'

function GetDocTemp(familyname, firstname, email){

    return '{"familyname": "'+familyname+'", "firstname": "'+firstname+'", "email": "'+email+'", "technicalAbilities": [], "functionalAbilities": [], "languages": [], "certifications": [], "bref": "", "experiences": [], "projects": [], "skills": { "environments": "", "languages": "", "databases": "", "tools": "", "systems": "" }}'
}

module.exports = {
    GetDocTemp,
}