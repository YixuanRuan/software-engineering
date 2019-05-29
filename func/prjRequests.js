var project= {
  isMyProject:true,
  isLaucher:false,
  parentProject:0,
  projectId: 1,
  projectContent: "软件工程",
  weight: "每人八小时志愿时长 ",
  createTime: "2019/04/05",
  overTime: "2019/07/05",
  name: "阮义轩",
  phone: "110",
  currentPeople: 10,
  people: 20,
  pjRequirement: "北京航空航天大学是新中国创建的第一所航空航天高等学府，是一所肩负神圣使命、承载宏伟愿景的大学，学校的理想和抱负、传承和发展始终与国家发展和民族振兴紧密相系。1952年10月，由当时的清华大学、北洋大学等八所中国著名高校的航空院系合并组建成立了北京航空学院（现北京航空航天大学）。建校66年以来，北航一直是国家重点建设的高校。现在的北航，拥有学院路和沙河两个校区，30000余名在校学生以及近4000名教职员工。学校第十六次党员代表大会确立了以“建设扎根中国大地的世界一流大学”为发展远景目标，2017年学校入选国家“双一流”建设高校名单（A类）。",
  subProjects: [{ projectId: 2, projectContent: "大计基" }, { projectId: 3, projectContent: "数据库" }, { projectId: 4, projectContent: "系统编程" }
  ]
}
var subProjects=[
  {
    parentProject: 1,
    projectId: 2,
    projectContent: "大计基",
    weight: "每人八小时志愿时长 ",
    createTime: "2019/04/05",
    overTime: "2019/07/05",
    name: "阮义轩",
    phone: "110",
    currentPeople: 10,
    people: 20,
    pjRequirement: "北京航空航天大学是新中国创建的第一所航空航天高等学府，是一所肩负神圣使命、承载宏伟愿景的大学，学校的理想和抱负、传承和发展始终与国家发展和民族振兴紧密相系。1952年10月，由当时的清华大学、北洋大学等八所中国著名高校的航空院系合并组建成立了北京航空学院（现北京航空航天大学）。建校66年以来，北航一直是国家重点建设的高校。现在的北航，拥有学院路和沙河两个校区，30000余名在校学生以及近4000名教职员工。学校第十六次党员代表大会确立了以“建设扎根中国大地的世界一流大学”为发展远景目标，2017年学校入选国家“双一流”建设高校名单（A类）。",
    subProjects: []
  }, {
    parentProject: 1,
    projectId: 3,
    projectContent: "数据库",
    weight: "每人八小时志愿时长 ",
    createTime: "2019/04/05",
    overTime: "2019/07/05",
    name: "阮义轩",
    phone: "110",
    currentPeople: 10,
    people: 20,
    pjRequirement: "北京航空航天大学是新中国创建的第一所航空航天高等学府，是一所肩负神圣使命、承载宏伟愿景的大学，学校的理想和抱负、传承和发展始终与国家发展和民族振兴紧密相系。1952年10月，由当时的清华大学、北洋大学等八所中国著名高校的航空院系合并组建成立了北京航空学院（现北京航空航天大学）。建校66年以来，北航一直是国家重点建设的高校。现在的北航，拥有学院路和沙河两个校区，30000余名在校学生以及近4000名教职员工。学校第十六次党员代表大会确立了以“建设扎根中国大地的世界一流大学”为发展远景目标，2017年学校入选国家“双一流”建设高校名单（A类）。",
    subProjects: []
  }, {
    parentProject: 1,
    projectId: 4,
    projectContent: "系统编程",
    weight: "每人八小时志愿时长 ",
    createTime: "2019/04/05",
    overTime: "2019/07/05",
    name: "阮义轩",
    phone: "110",
    currentPeople: 10,
    people: 20,
    pjRequirement: "北京航空航天大学是新中国创建的第一所航空航天高等学府，是一所肩负神圣使命、承载宏伟愿景的大学，学校的理想和抱负、传承和发展始终与国家发展和民族振兴紧密相系。1952年10月，由当时的清华大学、北洋大学等八所中国著名高校的航空院系合并组建成立了北京航空学院（现北京航空航天大学）。建校66年以来，北航一直是国家重点建设的高校。现在的北航，拥有学院路和沙河两个校区，30000余名在校学生以及近4000名教职员工。学校第十六次党员代表大会确立了以“建设扎根中国大地的世界一流大学”为发展远景目标，2017年学校入选国家“双一流”建设高校名单（A类）。",
    subProjects: []
  }
]

function getProjectByProjectIdAndUserId(args){
  return project;
}

function submitProjectInfo(projectInfo){
  // 'http://114.115.151.96:8080/task/save'
  // "https://www.getgetme.com/test.php"
  console.log(projectInfo)
  wx.request({
    url: 'http://114.115.151.96:8080/task/save', //仅为示例，并非真实的接口地址
    data: {
      task:projectInfo,
    },
    method:"POST",
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data)
    }
  })
}

function joinProject(userId,projectId) {
  wx.request({
    url: 'http://114.115.151.96:8080/task/save', //仅为示例，并非真实的接口地址
    data: {
      userId:userId,
      projectId:projectId,
    },
    method: "POST",
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data)
    }
  })
}

module.exports.getProjectByProjectIdAndUserId = getProjectByProjectIdAndUserId;
module.exports.submitProjectInfo = submitProjectInfo;