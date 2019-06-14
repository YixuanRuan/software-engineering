package com.demo.project;
import com.demo.common.model.*;
import com.jfinal.plugin.activerecord.Page;
public class ProjectService {
private Project dao = new Project().dao();
	
	public Page<Project> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from project order by projectId asc");
	}
	
	public Project findById(int id) {
		return dao.findById(id);
	}
	
	public void deleteById(int id) {
		dao.deleteById(id);
	}
}
