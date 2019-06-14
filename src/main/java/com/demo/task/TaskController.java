package com.demo.task;

import com.jfinal.aop.Before;
import com.jfinal.aop.Inject;
import com.jfinal.core.Controller;
import com.jfinal.core.NotAction;
import com.jfinal.json.FastJson;
import com.jfinal.json.Jackson;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.JsonKit;
import com.jfinal.plugin.activerecord.Page;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.demo.common.model.*;
import com.demo.join.JoinsService;
import com.demo.message.MessageService;
import com.demo.user.UserService;

/**
 * 项目控制器
 */

public class TaskController extends Controller {
	
	@Inject
	TaskService service;
	@Inject
	MessageService mservice;
	
	public void add() {
		render("add.html");
	}
	
	/**
	 * save 与 update 的业务逻辑在实际应用中也应该放在 serivce 之中，
	 * 并要对数据进正确性进行验证，在此仅为了偷懒
	 */
	public User getUserJson()
	{
		String json=getPara("User");
		return FastJson.getJson().parse(json, User.class);	
	}
	//所有项目
	public void groundTasks() {
		List <Task> tasks=service.findByTime();
		setAttr("tasks",tasks);
		renderJson();
	}
	//用户创建的项目 √
	public void userCreateTasks() {
		String userId=getPara("userid");
		List<Task> tasks=service.findMycreateTasks(Integer.parseInt(userId));
		setAttr("tasks",tasks);
		renderJson();
	}
	//获取项目信息
	public void getTask()
	{
		String taskId=getPara("taskid");
		int taskid=Integer.parseInt(taskId);
		setAttr("task",service.findById(taskid));
		renderJson();
	}
	public void noRelationTask() {
		String userId=getPara("userid");
		int userid=Integer.parseInt(userId);
		renderJson(service.findAvailableTask(userid));
	}
	//用户加入的项目 √
	public void userJoinTasks() {
		int userid=Integer.parseInt(getPara("userid"));
		List<Task> tasks=service.findMyJoinTasks(userid);
		setAttr("tasks",tasks);
		renderJson();
	}
	//是不是我创建的项目 √
	public void isMyCreateTask() {
		int taskId=Integer.parseInt(getPara("taskId")),userId=Integer.parseInt(getPara("userId"));
		JoinsService joinservice=new JoinsService();
		TaskService ts=new TaskService();
		UserService us=new UserService();
		setAttr("isJoined",joinservice.isJoinTheTask(taskId,userId));
		setAttr("isLaucher",service.isMyCreateTasks(taskId,userId));
		setAttr("project",service.findById(taskId));
		setAttr("laucher",us.findById(ts.findById(taskId).getCreatorId()));
		int rootId=taskId;
		List<Task> subTask=service.getSubtasks(rootId);
		setAttr("subtask",subTask);
		setAttr("members",us.findJoiner(taskId));
		renderJson();
	}
	//加入项目 √
	public void CreateProject() {
		int taskid = Integer.parseInt(getPara("taskId"));
		
		int parentprojectid = Integer.parseInt(getPara("parentProjectId"));
		int creatorid = Integer.parseInt(getPara("creatorId"));
		String projectcontent = getPara("projectContent");
		String pjrequirement = getPara("pjRequirement");
		String weight = getPara("weight");
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		Date createtime = null;
		Date overtime = null;
		try {
			createtime = sf.parse(getPara("createTime"));
			overtime = sf.parse(getPara("overTime"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		int currentpeople = Integer.parseInt(getPara("currentPeople"));
		int people = Integer.parseInt(getPara("people"));
		
		Task task = new Task();
	
		if (taskid != 0)
			task.setTaskId(taskid);
		task.setCreatorId(creatorid);
		task.setProjectContent(projectcontent);
		task.setParentProjectId(parentprojectid);
		task.setPjRequirement(pjrequirement);
		task.setCreateTime(createtime);
		task.setOverTime(overtime);
		task.setIsEmpty(false);
		task.setWeight(weight);
		task.setProjectflag(111);
		task.setPeople(people);
		task.setCurrentPeople(currentpeople);
		task.setFinishFlag(false);
		
		if (taskid == 0) {
			task.save();
			renderJson("Success Create");
		} else {
			task.update();
			renderJson("Success Update");
		}
	}

	// 某个用户申请加入某个项目
	public void save() {
		int taskId = Integer.parseInt(getPara("taskId"));
		int userId = Integer.parseInt(getPara("userId"));
		Task task = service.findById(taskId);
		int people = 0;
		Integer temp = task.getPeople();
		if (temp == null) {
			people = 0;
		} else {
			people = temp.intValue();
		}
		int currentpeople = 0;
		temp = task.getCurrentPeople();
		if(temp == null) {
			currentpeople = 0;
		} else {
			currentpeople = temp.intValue();
		}
		if(currentpeople >= people) {
			renderJson("Too many people");
			return;
		} else
			task.setCurrentPeople(currentpeople + 1);
		task.update();
		Joins join = new Joins();
		join.setUserId(userId);
		join.setTaskId(taskId);
		join.setJoinTime(new Date());
		join.setIsFinish(false);
		//Task task= FastJson.getJson().parse(json, Task.class);
		//task.set("isEmpty", true);
		//System.out.println(task);
		join.save();
		renderJson("success");
	}
	
	public void edit() {
		setAttr("Task", service.findById(getParaToInt()));
	}
	
	/**
	 * save 与 update 的业务逻辑在实际应用中也应该放在 serivce 之中，
	 * 并要对数据进正确性进行验证，在此仅为了偷懒
	 */
	public void create() {
		String json=getRawData();
		System.out.println(json);
		Task task= FastJson.getJson().parse(json, Task.class);
		int userid=task.getCreatorId();
		Date date=new Date();
		date.getTime();
		task.setCreateTime(date);
		task.setCreatorId(userid);
		task.setCurrentPeople(1);
		task.setFinishFlag(false);
		task.save();
		renderJson("success");
	}
	public void update() {
		Task a=getBean(Task.class);
		a.update();
		renderJson();
	}
	
	public void delete() {
		int taskId = Integer.parseInt(getPara("taskId"));
		service.deleteById(taskId);
		renderJson("success");
	}
}


