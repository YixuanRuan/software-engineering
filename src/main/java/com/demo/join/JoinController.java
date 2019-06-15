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
    	if(service.isJoinTheTask(taskid,userid)==true)
    	{
    		renderJson("用户已加入该项目");
    		return;
    	}
    	if(task.getCurrentPeople()+1>task.getPeople())
    	{
    		renderJson("人数过多");
    		return;
    	}
    	task.setCurrentPeople(task.getCurrentPeople()+1);
    	int rootid=task.getCreatorId();
    	if(service.joinTaskBytaskid(taskid, userid)==true)
    	{
    		MessageService mservice = new MessageService();
    		String text="user: "+user.getName()+" "+" 加入了任务: "+task.getProjectContent();
    		System.out.println(text);
    		mservice.save(rootid, "用户加入通知",text,1,taskid,userid);
    		task.update();
    	}
    	renderJson();
    	
	}
    
    public void userApplyTasks() {
    	int userid = Integer.parseInt(String.valueOf(getPara("userid")));
    	int taskid =  Integer.parseInt(String.valueOf(getPara("taskid")));
    	UserService us= new UserService();
    	User user=us.findById(userid);
    	TaskService ts=new TaskService();
    	Task task = ts.findById(taskid);
    	if(service.isJoinTheTask(taskid,userid)==true)
    	{
    		renderJson("用户已加入该项目");
    		return;
    	}
    	if(task.getCurrentPeople()+1>task.getPeople())
    	{
    		renderJson("人数过多");
    		return;
    	}
    	
    	int rootid=task.getCreatorId();
    	MessageService mservice = new MessageService();
    	String text="user: "+user.getName()+" "+" 申请加入任务: "+task.getProjectContent();
    	mservice.save(rootid, "用户申请通知",text,1,taskid,userid);
    	renderJson();
    	
	}
    //同意时，判断能否加入，然后向申请者发送申请id
    public void accept()
    {
    	int userid = Integer.parseInt(String.valueOf(getPara("userid")));
    	int taskid =  Integer.parseInt(String.valueOf(getPara("taskid")));
    	int dealerid =  Integer.parseInt(String.valueOf(getPara("dealerid")));
    	UserService us= new UserService();
    	User user=us.findById(userid);
    	String name=new TaskService().findById(taskid).getProjectContent();
    	if(service.isJoinTheTask(taskid,userid)==true)
    	{
    		renderJson("失败，用户已加入该项目");
    		return;
    	}
    	
    	if(service.joinTaskBytaskid(taskid, userid)==false) {
    		MessageService ms=new MessageService();
        	ms.save(userid, "用户申请进度通知", "加入项目："+name+" 失败！", 3, 1, dealerid);
        	renderJson();
    	}
    	MessageService ms=new MessageService();
    	ms.save(userid, "用户申请进度通知", "你已被允许加入项目："+name, 3, 1, dealerid);
    	renderJson();
    }
    //拒绝一个人时，发送拒绝消息并且删除该信息
    public void refuse()
    {
    	int applyid = Integer.parseInt(String.valueOf(getPara("applyid")));
    	int dealerid = Integer.parseInt(String.valueOf(getPara("dealerid")));
    	int messageid = Integer.parseInt(String.valueOf(getPara("messageid")));
    	int taskid =  Integer.parseInt(String.valueOf(getPara("taskid")));
    	String name =  new TaskService().findById(taskid).getProjectContent();
    	MessageService ms=new MessageService();
    	ms.delete(messageid);
    	ms.save(applyid, "用户申请进度通知", "你申请加入的项目："+name+" 已被拒绝！", 3, 1, dealerid);
    	renderJson();
    }
    public void getJoin()
    {
    	int taskId = Integer.parseInt(getPara("taskId"));
    	List<Joins> list=service.findByTaskId(taskId);
    	set("joiner",list);
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


