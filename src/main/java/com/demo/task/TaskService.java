package com.demo.task;
import java.util.List;

import com.demo.common.model.*;
import com.demo.join.JoinsService;
import com.jfinal.plugin.activerecord.Page;
public class TaskService {
public Task dao = new Task().dao();
	
	public Page<Task> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from task order by taskId asc");
	}
	
	public Task findById(int id) {
		return dao.findById(id);
	}
	
	public void deleteById(int id) {
		JoinsService jservice=new JoinsService();
		jservice.deletejoinByTaskId(id);
		dao.deleteById(id);
	}

	public Page<Task> findByTimePaginate(int pageNumber, int pageSize) {
		// TODO Auto-generated method stub
		return dao.paginate(pageNumber, pageSize, "select *", "from task order by createTime");
	}

	public Object findMytaskPage(Integer userId) {
		// TODO Auto-generated method stub
		return dao.find("select *", "from task order by createTime");
	}
	//所有项目
	public List<Task> findByTime() {
		// TODO Auto-generated method stub
		return dao.find("select * from task order by createTime");
	}
	//我创建的所有项目
	public List<Task> findMycreateTasks(int userId) {
		// TODO Auto-generated method stub
		return dao.find("select * from task where creatorId=? order by createTime",userId);
	}
	//我加入的所有项目

	public List<Task> findMyJoinTasks(Integer userId) {
		// TODO Auto-generated method stub
	    String sql="select t.* from task t inner join joins j on j.taskId=t.taskId and j.userId=?";
		return dao.find(sql, userId);
	}
	public List<Task> findAvailableTask(Integer userId)
	{
		 String sql="select * from task where not exists(select * from task ,joins where task.taskid=joins.taskid and joins.userId=? )and creatorId != ?";
			return dao.find(sql, userId,userId);
	}
	public boolean isMyCreateTasks(int taskId, int userId) {
		// TODO Auto-generated method stub
		
		return dao.findFirst("select * from task where creatorId=? and taskId=?", userId,taskId)!=null;
	}

	public List<Task> getSubtasks(int rootId) {
		// TODO Auto-generated method stub
		return dao.find("select * from task where parentProjectId=?",rootId);
	}
	

	
}
