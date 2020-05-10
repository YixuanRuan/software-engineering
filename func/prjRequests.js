const app=getApp()
const Url ="http://106.13.42.89:8080"
// 成功
function getProjectByProjectIdAndUserId(userId,projectId){
  return new Promise((resolve, reject) => {
    wx.request({
      url: Url+'/task/isMyCreateTask', //仅为示例，并非真实的接口地址
      data: {
        userId:userId,
        taskId:projectId
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        res.data.project.createTime = res.data.project.createTime.split(" ")[0]
        res.data.project.overTime = res.data.project.overTime.split(" ")[0]
        resolve(res.data)
      }
    })
  })
}

// 获取所有项目 成功
function getAllProjects(userId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: Url +'/task/noRelationTask', //仅为示例，并非真实的接口地址
      data: {
        userid:userId
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        resolve(res.data)
      }
    })
    // resolve(projects)
  })
}

// 获取参加的项目 成功
function getJoinedProjects(userId) {
  return new Promise((resolve, reject) => { 
    wx.request({
      url: Url +'/task/userJoinTasks', //仅为示例，并非真实的接口地址
      data: {
        userid:userId,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        resolve(res.data.tasks)
      }
    })
  })
}

// 获取创建的项目 成功
function getLauchedProjects(userId) {
  return new Promise((resolve, reject) =>  { 
    wx.request({
      url: Url +'/task/userCreateTasks', //仅为示例，并非真实的接口地址
      data: {
        userid:userId,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        resolve(res.data.tasks)
      }
    })
  })
}

// 获取完成的项目 成功
function getFinishedProjects(userId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: Url +'/task/userFinishTasks', //仅为示例，并非真实的接口地址
      data: {
        userid: userId,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        resolve(res.data.tasks)
      }
    })
  })
}

// 创建项目 成功
function submitProjectInfo(projectInfo){
  return new Promise((resolve, reject)=> {
    wx.request({
      url: Url + '/task/CreateProject', //仅为示例，并非真实的接口地址
      data: {
        taskId:projectInfo.projectId,
        parentProjectId: projectInfo.parentProjectId,
        creatorId: projectInfo.creatorId,
        projectContent: projectInfo.projectContent,
        pjRequirement: projectInfo.pjRequirement,
        weight: projectInfo.weight,
        createTime: projectInfo.createTime,
        overTime: projectInfo.overTime,
        currentPeople: projectInfo.currentPeople,
        people: projectInfo.people,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        resolve(res.data)
      }
    })
  })
}

// 修改项目 成功
function changeProjectInfo(projectInfo) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: Url +'/task/CreateProject', //仅为示例，并非真实的接口地址
      data: {
        taskId: projectInfo.taskId,
        parentProjectId: projectInfo.parentProjectId,
        creatorId: projectInfo.creatorId,
        projectContent: projectInfo.projectContent,
        pjRequirement: projectInfo.pjRequirement,
        weight: projectInfo.weight,
        createTime: projectInfo.createTime,
        overTime: projectInfo.overTime,
        currentPeople: projectInfo.currentPeople,
        people: projectInfo.people,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        resolve(res.data)
      }
    })
  })
}

// 加入项目 成功
function joinProject(userId,projectId) {
  return new Promise((resolve, reject) =>  {
    wx.request({
      url: Url +'/join/userApplyTasks', //仅为示例，并非真实的接口地址
      data: {
        userid: userId,
        taskid: projectId,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        resolve(res.data)
      }
    })
  })
}

// 完成项目
function finishProject(userId, projectId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: Url +'/join/setFinish', //仅为示例，并非真实的接口地址
      data: {
        taskId: projectId,
        userId: userId
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        resolve(res.data)
      }
    })
    // resolve("Project Finished!")
  })
}

// 退出项目
function quitProject(userId, projectId) {
  return new Promise((resolve, reject) =>  { 
    wx.request({
      url: Url +'/join/delete', //仅为示例，并非真实的接口地址
      data: {
        userId: userId,
        taskId: projectId,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        resolve(res.data)
      }
    })
    // resolve("quit success!")
  })
}

// 删除项目
function deleteProject(userId, projectId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: Url +'/task/delete', //仅为示例，并非真实的接口地址
      data: {
        userId: userId,
        taskId: projectId,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        resolve(res.data)
      }
    })
    // resolve("delete success!")
  })
}

function getUserId(code){
  return new Promise((resolve, reject) => {
    wx.request({
      url: Url+'/login/auth', //仅为示例，并非真实的接口地址
      data: {
        js_code: code
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("成功获取userId")
        resolve(res.data)
      }
    })
  })
}

module.exports={
  getProjectByProjectIdAndUserId : getProjectByProjectIdAndUserId,
  getAllProjects : getAllProjects,
  getJoinedProjects : getJoinedProjects,
  getLauchedProjects : getLauchedProjects,
  getFinishedProjects: getFinishedProjects,
  submitProjectInfo: submitProjectInfo,
  changeProjectInfo: changeProjectInfo,
  joinProject : joinProject,
  finishProject: finishProject,
  quitProject : quitProject,
  deleteProject : deleteProject,
  getUserId : getUserId,
}
  


var project = {
  isJoined: true,
  isLaucher: true,
  parentProject: 0,
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
  subProjects: [{ projectId: 2, projectContent: "大计基" }, { projectId: 3, projectContent: "数据库" }, { projectId: 4, projectContent: "系统编程" }],
  members: [{ name: "马云" }, { name: "马化腾" }, { name: "周杰伦" }, { name: "陈忠智" }, { name: "袁昊" }, { name: "焦贤锋" },{ name: "马云" }, { name: "马化腾" }, { name: "周杰伦" }, { name: "陈忠智" }, { name: "袁昊" }, { name: "焦贤锋" }]
}
var subProjects = [
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

var joinedProjects= [{
  projectId: 10,
  projectContent: "美容",
  startDate: "2019-04-03",
  endDate: "2019-07-21",
  currentPeople: 10,
  people: 20
}, {
  projectId: 11,
  projectContent: "保健养生",
  startDate: "2019-04-03",
  endDate: "2019-07-21",
  currentPeople: 10,
  people: 20,
}, {
  projectId: 12,
  projectContent: "其他",
  startDate: "2019-04-03",
  endDate: "2019-07-21",
  currentPeople: 10,
  people: 20
}]

var lauchedProjects = [{
  projectId: 10,
  projectContent: "美容",
  startDate: "2019-04-03",
  endDate: "2019-07-21",
  currentPeople: 10,
  people: 20
}, {
  projectId: 11,
  projectContent: "保健养生",
  startDate: "2019-04-03",
  endDate: "2019-07-21",
  currentPeople: 10,
  people: 20,
}]

var projects = [{
  projectId: 10,
  projectContent: "美容",
  startDate: "2019-04-03",
  endDate: "2019-07-21",
  currentPeople: 10,
  people: 20
}, {
  projectId: 11,
  projectContent: "保健养生",
  startDate: "2019-04-03",
  endDate: "2019-07-21",
  currentPeople: 10,
  people: 20,
}, {
  projectId: 12,
  projectContent: "其他",
  startDate: "2019-04-03",
  endDate: "2019-07-21",
  currentPeople: 10,
  people: 20
}]