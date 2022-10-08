const initialState = {
  dataRef: [
    { api_name: null, ref_name: null, field_name: "" }, //0
    {
      api_name: "frcusers/",
      ref_name: "frcdepartments/status/1",
      field_name: "frcdepartments",
    }, //1
    { api_name: "frcdepartments/", ref_name: null, field_name: "" }, //2
    { api_name: "orgtypes/", ref_name: null, field_name: "" }, //3
    {
      api_name: "organizations/",
      ref_name: "orgtypes/status/1",
      field_name: "orgtypes",
    }, //4
    { api_name: "permissions/1", ref_name: null, field_name: "" }, //5
    { api_name: "modules/1", ref_name: null, field_name: "" }, //6
    { api_name: "integrations/1", ref_name: null, field_name: "" }, //7
    {
      api_name: "amlclassifications/",
      ref_name: "orgtypes/status/1",
      field_name: "orgtypes",
    }, //8
    { api_name: "amlscales/", ref_name: null, field_name: "" }, //9
    {
      api_name: "amlquestions/",
      ref_name: "orgtypes/status/1",
      field_name: "orgtypes",
    }, //10
    {
      api_name: "amlmatrix/",
      ref_name: "orgtypes/status/1",
      field_name: "orgtypes",
    }, //11
    { api_name: "amlviolationtypes/", ref_name: null, field_name: "" }, //12
    { api_name: "amlperiods/", ref_name: null, field_name: "" }, //13
    {
      api_name: "organizations/",
      ref_name: "orgtypes/status/1",
      field_name: "orgtypes",
    }, //14
    {
      api_name: "amlprofilecompliances/",
      ref_name: "organizations/status/1",
      field_name: "organizations",
    }, //15
    {
      api_name: "amlcompliances/",
      ref_name: "organizations/status/1",
      field_name: "organizations",
    }, //16
    {}, //17
    {
      api_name: "amllogs/view",
      ref_name: null,
      field_name: null,
    }, //18
    {
      api_name: "amlceos/",
      ref_name: null,
      field_name: null,
    }, //19
    {
      api_name: "amlprograms/",
      ref_name: null,
      field_name: null,
    }, //20
    {
      api_name: "amlgrants/",
      ref_name: null,
      field_name: null,
    }, //21
    {
      api_name: "amlcompanies/",
      ref_name: null,
      field_name: null,
    }, //22
  ],
  metadatas: [
    [], //0
    [
      ["L_NAME", "Овог", "center", "15%"],
      ["F_NAME", "Нэр", "center", "15%"],
      ["EMAIL", "Имэйл", "center", "15%"],
      ["DEP_ID", "Харъяалах нэгж", "center", "5%"],
      ["POSITION", "Албан тушаал", "center", "15%"],
      ["DS_SN", "Гарын үсэг", "center", "12%"],
      ["STATUS", "Төлөв", "center", "10%"],
    ], //1
    [
      ["NAME", "Газар, нэгжийн нэр", "center", "50%"],
      ["STATUS", "Төлөв", "center", "30%"],
    ], //2
    [
      ["NAME", "Нэр", "center", "30%"],
      ["DESCRIPTION", "Тайлбар", "center", "45%"],
      ["STATUS", "Төлөв", "center", "15%"],
    ], //3
    [
      ["ORGTYPE_ID", "Салбар", "center", "15%"],
      ["REGISTER", "Регистр", "center", "10%"],
      ["NAME", "Нэр", "center", "20%"],
      ["EMAIL", "Имэйл", "center", "20%"],
      ["DS_SN", "Гарын үсэг", "center", "12%"],
      ["STATUS", "Төлөв", "center", "10%"],
    ], //4
    [
      ["CODE", "Эрхийн код", "center", "20%"],
      ["DESCRIPTION", "Тайлбар", "center", "55%"],
      ["STATUS", "Төлөв", "center", "15%"],
    ], //5
    [
      ["NAME", "Модулийн нэр", "center", "50%"],
      // ['LINK', 'Холбоос'],
      // ['IMG', 'Зураг'],
      ["STATUS", "Төлөв", "center", "30%"],
    ], //6
    [
      ["NAME", "Холболтын нэр", "center", "25%"],
      ["LINK", "Холболтын хаяг", "center", "45%"],
      ["STATUS", "Төлөв", "center", "20%"],
    ], //7
    [
      ["NAME", "Ангиллын нэр", "center", "30%"],
      ["SECTOR", "Салбар", "center", "30%"],
      ["PERCENT", "Жин", "center", "10%"],
      ["STATUS", "Төлөв", "center", "15%"],
    ], //8
    [
      ["RATE", "Түвшин", "center", "20%"],
      ["MINSCORE", "Доод оноо", "center", "15%"],
      ["MAXSCORE", "Дээд оноо", "center", "15%"],
      ["COLOR", "Дэвсгэр өнгө", "center", "15%"],
      ["TEXT_COLOR", "Текст өнгө", "center", "15%"],
    ], //9
    [
      ["MAINCLASS_ID", "Үндсэн ангилал", "center", "10%"],
      ["SUBCLASS_ID", "Дэд ангилал", "center", "10%"],
      ["NAME", "Асуулт / Хариулт", "center", "22%"],
      ["ANSWER_TYPE_ID", "Хариултын хэлбэр", "center", "8%"],
      ["IS_ASSESS", "Үнэлэх эсэх", "center", "5%"],
      ["SCORE", "Оноо", "center", "5%"],
      ["PERCENT", "Жин", "center", "5%"],
      ["IS_MANDAT", "Заавал эсэх", "center", "5%"],
      ["SECTOR", "Салбар", "center", "10%"],
      ["STATUS", "Төлөв", "center", "5%"],
    ], //10
    [
      ["SECTOR_NAME", "Салбар", "center", "20%"],
      ["QUESTION", "Асуулт / Хариулт", "center", "50%"],
      ["MIN_VALUE", "Доод утга", "right", "10%"],
      ["MAX_VALUE", "Дээд утга", "right", "10%"],
      ["SCORE", "Оноо", "center", "5%"],
    ], //11
    [
      ["NAME", "Ангиллын нэр", "center", "35%"],
      ["DESCRIPTION", "Тайлбар", "center", "35%"],
      ["STATUS", "Төлөв", "center", "15%"],
    ], //12
    [
      ["STARTDATE", "Эхлэх хугацаа", "center", "40%"],
      ["ENDDATE", "Дуусах хугацаа", "center", "40%"],
    ], //13
    [
      ["ORGTYPE_ID", "Салбар", "center", "15%"],
      ["REGISTER", "Регистр", "center", "10%"],
      ["NAME", "Нэр", "center", "20%"],
      ["EMAIL", "Имэйл", "center", "20%"],
      ["DS_SN", "Гарын үсэг", "center", "12%"],
    ], //14
    [
      ["USER_ID", "Байгууллага", "center", "15%"],
      ["LAST_NAME", "Овог", "center", "15%"],
      ["FIRST_NAME", "Нэр", "center", "15%"],
      ["EMAIL", "Имэйл", "center", "15%"],
      ["PHONE", "Утас", "center", "7%"],
      ["T_DATE", "Томилогдсон огноо", "center", "10%"],
      ["T_NO", "Тушаал", "center", "7%"],
      ["STATUS", "Төлөв", "center", "10%"],
    ], //15
    [
      ["LAST_NAME", "Овог", "center", "15%"],
      ["FIRST_NAME", "Нэр", "center", "15%"],
      ["EMAIL", "Имэйл", "center", "15%"],
      ["PHONE", "Утас", "center", "7%"],
      ["T_DATE", "Томилогдсон огноо", "center", "10%"],
      ["T_NO", "Тушаалын дугаар", "center", "7%"],
      ["STATUS", "Төлөв", "center", "10%"],
    ], //16
    [], //17
    [
      ["C_DATE", "Огноо", "center", "15%"],
      ["USER_ID", "Хэр.дугаар", "center", "10%"],
      ["IP_ADDR", "Хандсан хаяг", "center", "15%"],
      ["CONTENT", "Агуулга", "center", "55%"],
      ["METHOD", "Метод", "center", "5%"],
    ], //18
    [
      ["CITIZEN", "Иргэншил", "center", "10%"],
      ["REGNO", "Регистр", "center", "10%"],
      ["L_NAME", "Овог", "center", "10%"],
      ["F_NAME", "Нэр", "center", "10%"],
      ["MOBILE", "Гар утас", "center", "10%"],
      ["EMAIL", "Имэйл", "center", "10%"],
      ["ISSUED_DATE", "Томилогдсон", "center", "10%"],
      ["ORDERNO", "Тогтоол", "center", "10%"],
      ["STATUS", "Төлөв", "center", "10%"],
    ], //19
    [
      ["PROGRAM", "Хөтөлбөрийн файл", "center", "25%"],
      ["DESCRIPTION", "Өөрчлөлт / Тайлбар", "center", "25%"],
      ["APPROVED_DATE", "Батлагдсан огноо", "center", "25%"],
      ["STATUS", "Төлөв", "center", "10%"],
    ], //20
    [
      ["NAME", "Зөвшөөрлийн нэр", "center", "20%"],
      ["ISSUED_DATE", "Олгосон огноо", "center", "15%"],
      ["EXPIRED_DATE", "Дуусах огноо", "center", "15%"],
      ["NO", "Дугаар", "center", "15%"],
      ["STATUS", "Төлөв", "center", "10%"],
    ], //21
    [
      ["FOUNDED_DATE", "Байгуулагдсан огноо", "center", "10%"],
      ["PHONE", "Албан утас", "center", "10%"],
      ["ADDRESS", "Албан хаяг", "center", "50%"],
      ["NO_EMPS", "Ажилтны тоо", "center", "10%"],
      ["NO_BRANCHES", "Салбарын тоо", "center", "10%"],
      ["STATUS", "Төлөв", "center", "10%"],
    ], //22
  ],
  classRef: "amlclassifications/",
  answerTypeRef: "amlanswertypes/",
  mod_metadatas: [
    [
      ["SECTOR", "Салбар", "center", "13%"],
      ["REGISTER", "Регистр", "center", "12%"],
      ["LAST_NAME", "Овог", "center", "12%"],
      ["FIRST_NAME", "Нэр", "center", "12%"],
      ["IS_PERIOD", "Хугацаатай эсэх", "center", "10%"],
      ["STARTDATE", "Эхлэх хугацаа", "center", "10%"],
      ["ENDDATE", "Дуусах хугацаа", "center", "10%"],
      ["STATUS", "Төлөв", "center", "8%"],
    ], //7
    [
      ["SECTOR", "Салбар", "center", "15%"],
      ["USER_ID", "Байгууллага", "center", "15%"],
      ["REGISTER", "Регистр", "center", "10%"],
      ["TYPE_ID", "Төрөл", "center", "15%"],
      ["STARTDATE", "Эхлэх хугацаа", "center", "10%"],
      ["ENDDATE", "Дуусах хугацаа", "center", "10%"],
      ["STATUS", "Төлөв", "center", "10%"],
    ], //4
  ],
  mod_dataRef: [
    { api_name: "amlblacklists/", ref_name: null, field_name: null }, //7
    { api_name: "amlviolations/", ref_name: null, field_name: null }, //4
  ],
};

const MetaDataReducer = (state = initialState, action) => {
  return state;
};

export default MetaDataReducer;
