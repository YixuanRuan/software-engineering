package com.demo.join;
import java.util.Date;
import java.util.List;

import com.demo.common.model.*;
import com.demo.task.TaskService;
import com.jfinal.plugin.activerecord.Page;
public class JoinsService {
private Joins dao = new Joins().dao();
	
    //用户加入的

	
	public Joins findById(int id) {
		return dao.findById(id);
	}
	public void deletejoinByUserId(int userId)
	{
		
		List<Joins> p=dao.find("select * from joins where userId=?",userId);
		for(Joins it :p)
			it.delete();
		
	}
	public void deletejoinByTaskId(int taskId)
	{
		List<Joins> p=dao.find("select * from joins where taskId=?",taskId);
		for(Joins it :p)
			it.delete();
	}
	
	public boolean joinTaskBytaskid(int taskid,int userid) {
		Task task=new TaskService().findById(taskid);
		if(task.getCurrentPeople()+1>task.getPeople())
		{
			return false;
		}
		task.setCurrentPeople(task.getCurrentPeople()+1);
		Joins join=new Joins();
		Date date=new Date();
		date.getTime();
		join.setJoinTime(date);
		join.setIsFinish(false);
		join.setTaskId(taskid);
		join.setUserId(userid);
		return join.save();
	}
	
	public boolean isJoinTheTask(int taskid,int userid) {
		Joins join=dao.findFirst("select * from joins where userId=? and taskId=?",userid,taskid);
		return join!=null;
	}
	public void deleteById(int id) {
		dao.deleteById(id);
	}

	public Joins findById(int userId, int taskId) {
		// TODO Auto-generated method stub
		
	return dao.findFirst("select * from joins where userId=? and taskId=?",userId,taskId);
	}

	public void setFinish(Joins join) {
		// TODO Auto-generated method stub
		join.setIsFinish(true);
		join.update();
	}

	public void delete(Joins join) {
		// TODO Auto-generated method stub
		join.delete();
	}
	public List<Joins> findByTaskId(int taskId) {
		// TODO Auto-generated method stub
		return dao.find("select * from joins ,user  where joins.taskId=? and joins.userId=user.userId",taskId);
	}
	

}
