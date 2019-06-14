package com.demo.join;

import com.jfinal.aop.Before;
import com.jfinal.aop.Inject;
import com.jfinal.core.Controller;
import com.jfinal.json.FastJson;
import com.jfinal.json.Jackson;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.JsonKit;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.demo.common.model.*;
import com.demo.message.MessageService;
import com.demo.task.TaskService;
import com.demo.user.UserService;

/**
 * 项目控制器
 */

public class JoinController extends Controller {
	
	@Inject
	JoinsService service;
	
	/**
	 * save 与 update 的业务逻辑在实际应用中也应该放在 serivce 之中，
	 * 并要对数据进正确性进行验证，在此仅为了偷懒
	 */
	public User getUserJson()
	{
		String json=getPara("User");
		return FastJson.getJson().parse(json, User.class);	
	}
	//用户加入某个项目。
	
    public void userJoinTasks() {
    	int userid = Integer.parseInt(String.valueOf(getPara("userid")));
    	int taskid =  Integer.parseInt(String.valueOf(getPara("taskid")));
    	UserService us= new UserService();
    	User user=us.findById(userid);
    	TaskService ts=new TaskService();
    	Task task = ts.findById(taskid);
    	int rootid=task.getCreatorId();
    	if(service.joinTaskBytaskid(taskid, userid)==true)
    	{
    		MessageService mservice = new MessageService();
    		String text="user: "+user.getName()+" "+" 加入了任务: "+task.getProjectContent();
    		System.out.println(text);
    		mservice.save(rootid, "新的加入",text,1,taskid,userid);
    	}
    	renderJson();
    	
	}
    public void setFinish()
    {
    	int taskId = Integer.parseInt(getPara("taskId"));
		int userId = Integer.parseInt(getPara("userId"));
		Joins join=service.findById(userId,taskId);
		TaskService ts=new TaskService();
		UserService us=new UserService();
		int rootid=ts.findById(taskId).getCreatorId();
		User user=us.findById(userId);
		Task task=ts.findById(taskId);
		if(join==null)
		{
			renderJson("fail");
			return;
		}
		service.setFinish(join);
		MessageService ms=new MessageService();
		ms.save(rootid, "项目进度通知", "成员：" +user.getName()+"完成了任务："+task.getProjectContent(),2,taskId,userId);
		renderJson("success");
    }
    public void delete()
    {
    	int taskId = Integer.parseInt(getPara("taskId"));
		int userId = Integer.parseInt(getPara("userId"));
		Joins join=service.findById(userId,taskId);
		if(join==null)
		{
			renderJson("fail");
			return;
		}
		service.delete(join);
		renderJson("success");
    }
	public void save() {
		String json=getPara("Join");
		
		Joins Join= FastJson.getJson().parse(json, Joins.class);
		Join.set("isEmpty", true);
		System.out.println(Join);
		renderJson("success");
	}
	
	public void edit() {
		setAttr("Join", service.findById(getParaToInt()));
	}
	
	public void update() {
		Joins a=getBean(Joins.class);
		a.update();
	}
	
}


